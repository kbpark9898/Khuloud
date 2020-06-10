const express = require('express');
const router = express.Router();
const AWS = require("aws-sdk");
const moment = require("moment");
AWS.config.loadFromPath(__dirname + "/modules/awsconfig.json");
var S3 = require(__dirname + '/modules/s3/s3');

const s3 = new AWS.S3();

router.get('/show', function(req, res, next) {
    console.log(req.query);
    user_id = req.query.id;

    let checkfolder = 'SELECT * FROM folders WHERE location = ? AND user_id = ?;';
    connection.query(checkfolder, ['/trashcan/', user_id], function(err, folder) {
        if (err) {
            console.log('select error');
            res.status(400).send({ err: err });
        } else {
            let checkfile = 'SELECT * FROM files WHERE location = ? AND user_id = ?;';
            connection.query(checkfile, ['/trashcan/', user_id], function(err, file) {
                if (err) {
                    console.log('select error');
                    res.status(400).send({ err: err });
                } else {
                    res.status(200).send({
                        folders: folder,
                        files: file
                    })
                }
            });
        }
    });
});

router.get('/delfile', function(req, res, next) {
    var file_id = req.query.file_id;
    var user_id = req.query.id;


    var getsql = 'SELECT * FROM files WHERE file_id = (?)';
    connection.query(getsql, [file_id], function(err, rows) {
        if (err) {
            console.log('select db error');
            res.send({ erorr: 'db select error' });
        } else {
            if (rows.length == 0) {
                console.log('exist error');
                res.send({ erorr: 'exist error' });
            } else {
                var curPath = '/trashcan/';
                var file_name = rows[0].file_name;
                var sourceFile = curPath.substring(1) + file_name;

                var sql1 = 'DELETE FROM files WHERE file_name = (?) AND location=(?) AND user_Id = (?)';
                connection.query(sql1, [file_name, curPath, user_id], function(err) {
                    if (err) {
                        console.log('delete db error');
                        res.send({ erorr: 'db delete error' });
                    } else {
                        S3.deleteFile(S3.BUCKET_NAME, user_id, sourceFile, function(result) {
                            if (result) {
                                let checkfile = 'SELECT * FROM files WHERE location = ? AND user_id = ?;';
                                connection.query(checkfile, ['/trashcan/', user_id], function(err, file) {
                                    res.status(200).send({
                                        files: file
                                    })
                                });
                            }
                        })
                    }
                })
            }
        }
    })
});


router.get('/delfolder', function(req, res, next) {
    var folder_id = req.query.folder_id;
    var user_id = req.query.id;


    var getsql = 'SELECT * FROM folders WHERE folder_id = (?)';
    connection.query(getsql, [folder_id], function(err, rows) {
        if (err) {
            console.log('select db error');
            res.send({ erorr: 'db select error' });
        } else {
            if (rows.length == 0) {
                console.log('exist error');
                res.send({ erorr: 'exist error' });
            } else {
                var curPath = '/trashcan/'
                var folder_name = rows[0].folder_name;

                var sql1 = 'DELETE FROM folders WHERE folder_name = (?) AND location=(?) AND user_Id = (?)';
                connection.query(sql1, [folder_name, curPath, user_id], function(err) {
                    if (err) {
                        console.log('delete db error');
                        res.send({ erorr: 'db delete error' });
                    } else {
                        var params = {
                            Bucket: S3.BUCKET_NAME,
                            Key: 'drive/' + user_id + curPath + folder_name + '/'
                        };
                        s3.deleteObject(params, function(err, data) {
                            if (err) {
                                res.status(400).send({ err: err });
                            } else {
                                let checkfolder = 'SELECT * FROM folders WHERE location = ? AND user_id = ?;';
                                connection.query(checkfolder, [curPath, user_id], function(err, rows) {
                                    res.status(200).send({
                                        folders: rows
                                    })
                                });

                            }
                        })
                    }
                })
            }
        }
    })
});

router.get('/all', function(req, res, next) {
    var user_id = req.query.id;

    var getfolder = "SELECT * FROM folders WHERE user_id = ? AND location = ?;";
    connection.query(getfolder, [user_id, '/trashcan/'], function(err, folders) {
        if (err) {
            console.log('select db error');
            res.send({ erorr: 'db select error' });
        } else {
            var getfile = "SELECT * FROM files WHERE user_id = ? AND location = ?;";
            connection.query(getfile, [user_id, '/trashcan/'], function(err, files) {
                if (err) {
                    console.log('select db error');
                    res.send({ erorr: 'db select error' });
                } else {
                    for (let i of files) {
                        var sql1 = 'DELETE FROM files WHERE file_id = ?;';
                        var sourceFile = 'trashcan/' + i.file_name;
                        connection.query(sql1, [i.file_id], function(err) {
                            if (err) {
                                console.log('delete db error');
                                res.send({ erorr: 'db delete error' });
                            } else {
                                S3.deleteFile(S3.BUCKET_NAME, user_id, sourceFile, function(result) {})
                            }
                        })
                    }
                    for (let j of folders) {
                        var curPath = '/trashcan/';

                        var sql1 = 'DELETE FROM folders WHERE folder_name = (?) AND location=(?) AND user_Id = (?)';
                        connection.query(sql1, [j.folder_name, curPath, user_id], function(err) {
                            if (err) {
                                console.log('delete db error');
                                res.send({ erorr: 'db delete error' });
                            } else {
                                var params = {
                                    Bucket: S3.BUCKET_NAME,
                                    Key: 'drive/' + user_id + curPath + j.folder_name + '/'
                                };
                                s3.deleteObject(params, function(err, data) {
                                    if (err) {
                                        res.status(400).send({ err: err });
                                    }
                                });
                            }
                        });
                    }
                    res.send({ success: "success" });
                }
            });
        }
    });
});

module.exports = router;