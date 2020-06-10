const express = require('express');
const router = express.Router();

router.get('/show', function(req, res, next) {
    console.log(req.query);
    user_id = req.query.id;
    let checkfolder = 'SELECT * FROM folders WHERE user_id = ? AND favorite = 1;';
    let checkfiles = 'SELECT * FROM files WHERE user_id = ? AND favorite = 1;';
    connection.query(checkfolder, [user_id], function(err, folder, fields) {
        if (err) {
            console.log('select error');
            res.status(404).send();
        } else {
            connection.query(checkfiles, [user_id], function(err, file, fields) {
                if (err) {
                    console.log('select error');
                    res.status(404).send();
                } else {
                    res.status(200).send({
                        folders: folder,
                        files: file
                    });
                }
            });
        }
    });
});

router.post('/addfolder', function(req, res, next) {
    let user_id = req.body.id;
    let folder_name = req.body.name;
    let cur = req.body.cur;
    console.log(req.body);
    let checkfolder = 'SELECT * FROM folders WHERE location = ? AND user_id = ? AND folder_name = ? AND favorite = 1;';
    connection.query(checkfolder, [cur, user_id, folder_name], function(err, rows, fields) {
        if (err) {
            console.log('select error');
            res.status(400).send({ error: err });
        } else {
            if (rows.length == 0) {
                let sql = 'UPDATE folders SET favorite = 1 WHERE location = ? AND folder_name = ? AND user_id = ?;';
                connection.query(sql, [cur, folder_name, user_id], function(err, result, fields) {
                    if (err) {
                        console.log('update error');
                        res.status(400).send({ error: err });
                    } else {
                        let getfolder = 'SELECT * FROM folders WHERE location = ? AND user_id = ? AND folder_name != ?;';
                        connection.query(getfolder, [cur, user_id, 'trashcan'], function(err, folders, fields) {
                            res.status(200).send({
                                folders: folders
                            })
                        });
                    }
                });
            } else {
                console.log('already exist error');
                res.status(400).send({ error: err });
            }
        }
    });
});

router.post('/addfile', function(req, res, next) {
    let user_id = req.body.id;
    let file_name = req.body.name;
    let cur = req.body.cur;
    console.log(req.body);
    let checkfolder = 'SELECT * FROM files WHERE location = ? AND user_id = ? AND file_name = ? AND favorite = 1;';
    connection.query(checkfolder, [cur, user_id, file_name], function(err, rows, fields) {
        if (err) {
            console.log('select error');
            res.status(400).send({ error: err });
        } else {
            if (rows.length == 0) {
                let sql = 'UPDATE files SET favorite = 1 WHERE location = ? AND file_name = ? AND user_id = ?;';
                connection.query(sql, [cur, file_name, user_id], function(err, result, fields) {
                    if (err) {
                        console.log('update error');
                        res.status(400).send({ error: err });
                    } else {
                        let getfolder = 'SELECT * FROM files WHERE location = ? AND user_id = ?;';
                        connection.query(getfolder, [cur, user_id], function(err, files, fields) {
                            res.status(200).send({
                                files: files
                            })
                        });
                    }
                });
            } else {
                console.log('already exist error');
                res.status(400).send({ error: err });
            }
        }
    });
});

router.post('/delfolder', function(req, res, next) {
    let user_id = req.body.id;
    let folder_name = req.body.name;
    let cur = req.body.cur;
    let checkfolder = 'SELECT * FROM folders WHERE location = ? AND user_id = ? AND folder_name = ? AND favorite = 1;';

    connection.query(checkfolder, [cur, user_id, folder_name], function(err, rows, fields) {
        if (err) {
            console.log('select error');
            res.status(400).send({ error: err });
        } else {
            if (rows.length != 0) {
                let sql = 'UPDATE folders SET favorite = 0 WHERE location = ? AND folder_name = ? AND user_id = ?;';
                connection.query(sql, [cur, folder_name, user_id], function(err, result, fields) {
                    if (err) {
                        console.log('update error');
                        res.status(400).send({ error: err });
                    } else {
                        let getfolder = 'SELECT * FROM folders WHERE location = ? AND user_id = ? AND folder_name != ?;';
                        connection.query(getfolder, [cur, user_id, 'trashcan'], function(err, folders, fields) {
                            res.status(200).send({
                                folders: folders
                            })
                        });
                    }
                });
            } else {
                console.log('dont exist error');
                res.status(400).send({ error: err });
            }
        }
    });
});

router.post('/delfile', function(req, res, next) {
    let user_id = req.body.id;
    let file_name = req.body.name;
    let cur = req.body.cur;
    let checkfile = 'SELECT * FROM files WHERE location = ? AND user_id = ? AND file_name = ? AND favorite = 1;';

    connection.query(checkfile, [cur, user_id, file_name], function(err, rows, fields) {
        if (err) {
            console.log('select error');
            res.status(400).send({ error: err });
        } else {
            if (rows.length != 0) {
                let sql = 'UPDATE files SET favorite = 0 WHERE location = ? AND file_name = ? AND user_id = ?;';
                connection.query(sql, [cur, file_name, user_id], function(err, result, fields) {
                    if (err) {
                        console.log('update error');
                        res.status(400).send({ error: err });
                    } else {
                        let getfile = 'SELECT * FROM files WHERE location = ? AND user_id = ?;';
                        connection.query(getfile, [cur, user_id], function(err, files, fields) {
                            res.status(200).send({
                                files: files
                            })
                        });
                    }
                });
            } else {
                console.log('dont exist error');
                res.status(400).send({ error: err });
            }
        }
    });
});



module.exports = router;