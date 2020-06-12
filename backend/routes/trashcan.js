const express = require('express');
const router = express.Router();
const AWS = require("aws-sdk");
const moment = require("moment");
AWS.config.loadFromPath(__dirname + "/modules/awsconfig.json");
var S3 = require(__dirname + '/modules/s3/s3_new');

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

router.post('/restore', function(req, res, next) {
    console.log(req.body);
    let user_id = req.body.user_id;
    let id = req.body.id;
    if (req.body.isfolder) {
        let checkfolder = 'SELECT * FROM folders WHERE folder_id = ? AND user_id = ?;';
        connection.query(checkfolder, [id, user_id], function(err1, rows, fields) {
            console.log(rows);
            if (rows.length != 0) {
                let curPath = user_id + '/trashcan/'
                let name = rows[0].folder_name
                let copy_params = {
                    Bucket: S3.BUCKET_NAM,
                    CopySource: S3.BUCKET_NAM + '/drive/' + curPath + name + '/',
                    Key: 'drive/' + user_id + '/' + name + '/'
                };
                let del_params = {
                    Bucket: S3.BUCKET_NAM,
                    Key: 'drive/' + curPath + name + '/'
                };
                s3.copyObject(copy_params, function(err, data) {
                    if (err) {
                        console.log(err, data);
                        console.log("copy error");
                        res.status(304).send({ error: "copy error" });
                    } else {
                        s3.deleteObject(del_params, function(err, data) {
                            if (err) {
                                console.log(err, data);
                                console.log("delete error");
                                res.status(304).send({ error: "delete error" });
                            } else {
                                let values = ['/', '/trashcan/', name, user_id];
                                let updatesql = 'UPDATE folders SET location = ? WHERE location = ? AND folder_name = ? AND user_id = ?;';
                                connection.query(updatesql, values, function(err3, result, field) {
                                    if (err3) {
                                        console.log("updatesql error");
                                        res.status(304).send({ error: "updatesql error" });
                                    } else {
                                        let resultsql = 'SELECT * FROM folders WHERE location = ? AND user_id = ?;';
                                        connection.query(resultsql, ['/trashcan/', user_id], function(err, folder, fields) {
                                            res.status(200).send({
                                                folders: folder
                                            });
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                console.log("Does not exist folder");
                res.status(304).send({ error: "Does not exist" });
            }
        });
    } else {
        let checkfile = 'SELECT * FROM files WHERE file_id = ? AND user_id = ?;';
        connection.query(checkfile, [id, user_id], function(err1, rows, fields) {
            console.log(rows);
            if (rows.length != 0) {
                let curPath = user_id + '/trashcan/'
                let name = rows[0].file_name
                let copy_params = {
                    Bucket: S3.BUCKET_NAME,
                    CopySource: S3.BUCKET_NAME + '/drive/' + curPath + name,
                    Key: 'drive/' + user_id + '/' + name
                };
                let del_params = {
                    Bucket: S3.BUCKET_NAME,
                    Key: 'drive/' + curPath + name
                };
                s3.copyObject(copy_params, function(err, data) {
                    if (err) {
                        console.log(err, data);
                        console.log("copy error");
                        res.status(304).send({ error: "copy error" });
                    } else {
                        s3.deleteObject(del_params, function(err, data) {
                            if (err) {
                                console.log(err, data);
                                console.log("delete error");
                                res.status(304).send({ error: "delete error" });
                            } else {
                                let values = ['/', '/trashcan/', name, user_id];
                                let updatesql = 'UPDATE files SET location = ? WHERE location = ? AND folder_name = ? AND user_id = ?;';
                                connection.query(updatesql, values, function(err3, result, field) {
                                    if (err3) {
                                        console.log("updatesql error");
                                        res.status(304).send({ error: "updatesql error" });
                                    } else {
                                        let resultsql = 'SELECT * FROM files WHERE location = ? AND user_id = ?;';
                                        connection.query(resultsql, ['/trashcan/', user_id], function(err, file, fields) {
                                            res.status(200).send({
                                                files: file
                                            });
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                console.log("Does not exist file");
                res.status(304).send({ error: "Does not exist" });
            }
        });

    }
});

module.exports = router;
