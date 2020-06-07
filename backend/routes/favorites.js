const express = require('express');
const router = express.Router();

router.get('/show', function(req, res, next) {
    console.log(req.query);
    user_id = req.query.id;
    folders = [];
    files = [];

    let checkfolder = 'SELECT * FROM Folder_Favorites WHERE user_id = ?;';
    let checkfiles = 'SELECT * FROM File_Favorites WHERE user_id = ?;';
    connection.query(checkfolder, [user_id], function(err, rows, fields) {
        if (err) {
            console.log('select error');
            res.status(404).send();
        } else {
            folders.push(rows);
        }
    });
    connection.query(checkfiles, [user_id], function(err, rows, fields) {
        if (err) {
            console.log('select error');
            res.status(404).send();
        } else {
            files.push(rows);
        }
    });
    res.status(200).send({
        folders: folders,
        files: files
    });
});

router.post('/addfolder', function(req, res, next) {
    let user_id = req.body.id;
    let folder_name = req.body.name;
    console.log(req.body);
    let getid = 'SELECT folder_id FROM folders WHERE user_id = ? AND folder_name = ?;';
    connection.query(getid, [user_id, folder_name], function(err, folder, fields) {
        if (err) {
            console.log('getid error');
            res.status(400).send({ error: err });
        } else {
            if (folder.length == 0) {
                console.log('dont exist error');
                res.status(400).send({ error: err });
            } else {
                let folder_id = folder[0].folder_id;
                console.log(folder_id);
                let checkfolder = 'SELECT * FROM Folder_Favorites WHERE user_id = ? AND folder_id = ?;';
                connection.query(checkfolder, [user_id, folder_id], function(err, rows, fields) {
                    if (err) {
                        console.log('select error');
                        res.status(400).send({ error: err });
                    } else {
                        if (rows.length == 0) {
                            let sql = 'INSERT INTO Folder_Favorites (folder_id,user_id) values (?,?);';
                            connection.query(sql, [folder_id, user_id], function(err, result, fields) {
                                if (err) {
                                    console.log('insert error');
                                    res.status(400).send({ error: err });
                                } else {
                                    res.status(200).send({
                                        success: 'success',
                                        error: ''
                                    });
                                }
                            });
                        } else {
                            console.log('already exist error');
                            res.status(400).send({ error: err });
                        }
                    }
                });
            }
        }
    });
});

router.post('/addfile', function(req, res, next) {
    let user_id = req.body.id;
    let file_name = req.body.name;

    let getid = 'SELECT file_id FROM files WHERE user_id = ? AND file_name = ?;';
    connection.query(getid, [user_id, file_name], function(err, file, fields) {
        if (err) {
            console.log('getid error');
            res.status(400).send({ error: err });
        } else {
            let file_id = file[0].file_id;
            let checkfile = 'SELECT * FROM File_Favorites WHERE user_id = ? AND file_id = ?;';
            connection.query(checkfile, [user_id, file_id], function(err, rows, fields) {
                if (err) {
                    console.log('select error');
                    res.status(400).send({ error: err });
                } else {
                    if (rows.length == 0) {
                        let sql = 'INSERT INTO File_Favorites (file_id,user_id) values (?,?);';
                        connection.query(sql, [file_id, user_id], function(err, result, fields) {
                            if (err) {
                                console.log('insert error');
                                res.status(400).send({ error: err });
                            } else {
                                res.status(200).send({
                                    success: 'success',
                                    error: ''
                                });
                            }
                        });
                    } else {
                        console.log('already exist error');
                        res.status(400).send({ error: err });
                    }
                }
            });
        }
    });
});

router.post('/delfolder', function(req, res, next) {
    let user_id = req.body.id;
    let folder_name = req.body.name;
    let checkfolder = 'SELECT * FROM Folder_Favorites JOIN folders ON (Folder_Favorites.folder_id = folders.folder_id AND Folder_Favorites.user_id = ? AND folders.folder_name = ?);';

    connection.query(checkfolder, [user_id, folder_name], function(err, rows, fields) {
        if (err) {
            console.log('select error');
            res.status(400).send({ error: err });
        } else {
            if (rows.length != 0) {
                let folder_id = rows[0].folder_id;
                let sql = 'DELETE Folder_Favorites WHERE folder_id = ? AND user_id = ?;';
                connection.query(sql, [folder_id, user_id], function(err, result, fields) {
                    if (err) {
                        console.log('delete error');
                        res.status(400).send({ error: err });
                    } else {
                        res.status(200).send({
                            success: 'success',
                            error: ''
                        });
                    }
                })
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
    let checkfile = 'SELECT * FROM File_Favorites JOIN files ON (File_Favorites.file_id = files.file_id AND File_Favorites.user_id = ? AND files.file_name = ?);';

    connection.query(checkfile, [user_id, file_name], function(err, rows, fields) {
        if (err) {
            console.log('select error');
            res.status(400).send({ error: err });
        } else {
            if (rows.length != 0) {
                let file_id = rows[0].file_id;
                let sql = 'DELETE File_Favorites WHERE file_id = ? AND user_id = ?;';
                connection.query(sql, [file_id, user_id], function(err, result, fields) {
                    if (err) {
                        console.log('insert error');
                        res.status(400).send({ error: err });
                    } else {
                        res.status(200).send({
                            success: 'success',
                            error: ''
                        });
                    }
                })
            } else {
                console.log('dont exist error');
                res.status(400).send({ error: err });
            }
        }
    });
});



module.exports = router;