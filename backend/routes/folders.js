const express = require('express');
const router = express.Router();
const AWS = require("aws-sdk");
const moment = require("moment");

const BUCKET_NAME = "hong-s3-cloud";
let curPath = "";
let user_id = "";

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-northeast-2"
});

router.get('/show', function(req, res, next) {
    console.log(req.query);
    user_id = req.query.id;
    curPath = req.query.cur;
    folders = {}
    let checkfolder = 'SELECT * FROM folders WHERE location = ? AND user_id = ?;';
    connection.query(checkfolder, [curPath, user_id], function(err, rows, fields) {
        if (rows.length != 0) {
            res.status(200).send({
                folders: rows,
                cur: curPath
            })
        } else {
            res.send({ error: "Does not exist" });
        }
    });
});


router.post('/makefolder', function(req, res, next) {

    user_id = req.body.user_id;
    let cur = req.body.cur;
    curPath = user_id + cur;
    let folder_name = req.body.folder_name;
    let date = moment().format();
    let params = {
        Bucket: BUCKET_NAME,
        Key: curPath + folder_name + '/',
        Body: "",
        ACL: "public-read-write"
    };
    let checksql = 'SELECT * FROM folders WHERE location = ? AND folder_name = ?;';
    console.log(req.body)
    connection.query(checksql, [cur, folder_name], function(err, rows, fields) {
        if (rows.length == 0) {
            s3.putObject(params, function(err, data) {
                if (err) {
                    console.log('s3 error');
                    throw err;
                } else {
                    console.log(data);
                }
            });
            let sql = 'INSERT INTO folders (folder_name,location,user_id,created) values (?,?,?,?);';
            let values = [folder_name, cur, user_id, date];
            connection.query(sql, values, function(err, result, field) {
                if (err) {
                    console.log('insert error');
                    throw err;
                } else {
                    folders = {}
                    let checkfolder = 'SELECT * FROM folders WHERE location = ? AND user_id = ?;';
                    connection.query(checkfolder, [cur, user_id], function(err, rows, fields) {
                        if (rows.length != 0) {
                            res.status(200).send({
                                folders: rows,
                                cur: curPath
                            })
                        } else {
                            res.send({ error: "Does not exist" });
                        }
                    });
                }
            });


        } else {
            res.status(404).send({ error: "same name error" });
        }
    });
});


router.post('/delfolder', function(req, res, next) {

    user_id = req.body.user_id;
    curPath = user_id + req.body.cur;
    let folder_name = req.body.folder_name;
    let params = {
        Bucket: BUCKET_NAME + curPath,
        Key: folder_name + '/'
    };
    let checksql = 'SELECT * FROM folders WHERE location = ? AND folder_name = ?;';
    let values = [curPath, folder_name];

    connection.query(checksql, values, function(err, rows, fields) {
        if (rows.length != 0) {
            s3.deleteObject(params, function(err, data) {
                if (err) {
                    //throw err;
                } else {
                    let sql = 'DELETE FROM folders WHERE location = ? AND folder_name = ?;';
                    connection.query(sql, values, function(err, result, field) {
                        if (err) {
                            //throw err;
                        } else {
                            folders = {}
                            let checkfolder = 'SELECT * FROM folders WHERE location = ? AND user_id = ?;';
                            connection.query(checkfolder, [cur, user_id], function(err, rows, fields) {
                                if (rows.length != 0) {
                                    res.status(200).send({
                                        folders: rows,
                                        cur: curPath
                                    })
                                } else {
                                    res.send({ error: "Does not exist" });
                                }
                            });

                        }
                    });
                }
            });


        } else {
            res.send({ error: "Does not exist" });
        }
    });
});


router.post('/move', function(req, res, next) {

    user_id = req.body.user_id;
    curPath = user_id + req.body.cur;
    let name = req.body.mfile;
    let newPath = req.body.newPath;
    let checkfolder = 'SELECT * FROM folders WHERE location = ? AND folder_name = ?;';
    if (req.body.isfolder) {
        connection.query(checkfolder, [curPath, name], function(err1, rows, fields) {
            if (rows.length != 0) {
                let copy_params = {
                    Bucket: BUCKET_NAME + curPath,
                    CopySource: BUCKET_NAME + curPath + file + '/',
                    Key: newPath + file + '/'
                };

                let del_params = {
                    Bucket: BUCKET_NAME + curPath,
                    Key: file + '/'
                };
                s3.copyObject(copy_params, function(err, data) {
                    console.log(err, data);
                });
                s3.deleteObject(del_params, function(err, data) {
                    console.log(err, data);
                });
                let values = [newPath, curPath, name];
                let updatesql = 'UPDATE folders SET location = ? WHERE location = ? AND folder_name = ?;';
                connection.query(updatesql, values, function(err3, result, field) {
                    if (err3) {
                        throw err;
                    } else {
                        folders = {}
                        connection.query(checkfolder, [cur, user_id], function(err, rows, fields) {
                            if (rows.length != 0) {
                                res.status(200).send({
                                    folders: rows,
                                    cur: curPath
                                })
                            } else {
                                res.send({ error: "Does not exist" });
                            }
                        });
                    }
                });


            } else {
                res.send({ error: "Does not exist" });
            }
        });
    } else {
        let checkfile = 'SELECT * FROM files WHERE location = ? AND file_name = ?';

        connection.query(checkfile, [curPath, name], function(err1, rows, fields) {
            if (rows.length != 0) {
                let copy_params = {
                    Bucket: BUCKET_NAME + curPath,
                    CopySource: BUCKET_NAME + curPath + file,
                    Key: newPath + file
                };

                let del_params = {
                    Bucket: BUCKET_NAME + curPath,
                    Key: file
                };
                s3.copyObject(copy_params, function(err, data) {
                    console.log(err, data);
                });
                s3.deleteObject(del_params, function(err, data) {
                    console.log(err, data);
                });
                let values = [newPath, curPath, name];
                let updatesql = 'UPDATE files SET location = ? WHERE location = ? AND file_name = ?;';
                connection.query(updatesql, values, function(err3, result, field) {
                    if (err3) {
                        throw err;
                    } else {
                        folders = {}
                        connection.query(checkfolder, [cur, user_id], function(err, rows, fields) {
                            if (rows.length != 0) {
                                res.status(200).send({
                                    folders: rows,
                                    cur: curPath
                                })
                            } else {
                                res.send({ error: "Does not exist" });
                            }
                        });
                    }
                });


            } else {
                res.send({ error: "Does not exist" });
            }
        });

    }
});


router.post('/search/:target', function(req, res, next) {
    user_id = req.params.id;
    let cur = req.params.cur;
    folders = {}
    let checkfolder = 'SELECT * FROM folders WHERE location = ? AND user_id = ?;';
    connection.query(checkfolder, [cur, user_id], function(err, rows, fields) {
        if (rows.length != 0) {
            res.status(200).send({
                folders: folders
            })
        } else {
            res.send({ error: "Does not exist" });
        }
    });
});

module.exports = router;