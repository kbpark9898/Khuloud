const express = require('express');
const router = express.Router();
const AWS = require("aws-sdk");
const moment = require("moment");
AWS.config.loadFromPath(__dirname + "/modules/awsconfig.json");

const BUCKET_NAME = "hong-s3-cloud";
let curPath = "";
let user_id = "";
let parentPath = "";

const s3 = new AWS.S3();

// router.get('/show', function(req, res, next) {
//     console.log(req.query);
//     user_id = req.query.id;
//     curPath = req.query.cur;
//     if (curPath == '/') {
//         parentPath = '/';
//     } else {
//         let pathSplit = curPath.split('/')
//         console.log(pathSplit);
//         parentPath = '/';
//         for (let i = 1; i < pathSplit.length - 2; i++) {
//             parentPath += pathSplit[i];
//             parentPath += '/';
//         }
//     }
//     let checkfolder = 'SELECT * FROM folders WHERE location = ? AND user_id = ?;';
//     connection.query(checkfolder, [curPath, user_id], function(err, rows, fields) {
//         if (err) {
//             console.log('select error');
//             res.status(400).send({ err: err });
//         } else {
//             res.status(200).send({
//                 folders: rows,
//                 cur: curPath,
//                 parentPath: parentPath
//             })
//         }
//     });
// });

router.get('/show', function(req, res, next) {
    console.log(req.query);
    user_id = req.query.id;
    folder_id = req.query.folder_id;
    if (folder_id == -1) {
        let location = '/';
        let gerFolder = 'SELECT * FROM folders WHERE location = ? AND user_id = ? AND folder_name != ?;';
        connection.query(gerFolder, [location, user_id, 'trashcan'], function(err, folder) {
            if (err) {
                console.log('select2 error');
                res.status(400).send({ err: err });
            } else {
                let gerFile = 'SELECT * FROM files WHERE location = ? AND user_id = ?;';
                connection.query(gerFile, [location, user_id], function(err, file) {
                    if (err) {
                        console.log('select3 error');
                        res.status(400).send({ err: err });
                    } else {
                        res.status(200).send({
                            folders: folder,
                            files: file,
                            cur: location
                        });
                    }
                });
            }
        });
    } else {
        let checkfolder = 'SELECT * FROM folders WHERE folder_id = ? AND user_id = ?;';
        connection.query(checkfolder, [folder_id, user_id], function(err, rows) {
            if (err) {
                console.log('select1 error');
                res.status(400).send({ err: err });
            } else {
                if (rows.length == 0) {
                    console.log('does not exist');
                    res.status(400).send({ err: 'does not exist' });
                } else {
                    let location = rows[0].location + rows[0].folder_name + '/';
                    let gerFolder = 'SELECT * FROM folders WHERE location = ? AND user_id = ? AND folder_name != ?;';
                    connection.query(gerFolder, [location, user_id, 'trashcan'], function(err, folder) {
                        if (err) {
                            console.log('select2 error');
                            res.status(400).send({ err: err });
                        } else {
                            let gerFile = 'SELECT * FROM files WHERE location = ? AND user_id = ?;';
                            connection.query(gerFile, [location, user_id], function(err, file) {
                                if (err) {
                                    console.log('select3 error');
                                    res.status(400).send({ err: err });
                                } else {
                                    res.status(200).send({
                                        folders: folder,
                                        files: file,
                                        cur: location
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    }
});

router.post('/makefolder', function(req, res, next) {

    user_id = req.body.user_id;
    let cur = req.body.cur;
    curPath = user_id + cur;
    let folder_name = req.body.folder_name;
    let date = moment().format();
    let params = {
        Bucket: BUCKET_NAME,
        Key: 'drive/' + curPath + folder_name + '/',
        Body: "",
        ACL: "public-read-write"
    };
    let checksql = 'SELECT * FROM folders WHERE location = ? AND folder_name = ?;';
    console.log(req.body)
    connection.query(checksql, [cur, folder_name], function(err, rows, fields) {
        if (err) {
            res.status(400).send({ err: err });
        } else {
            if (rows.length == 0) {
                s3.putObject(params, function(err, data) {
                    if (err) {
                        console.log('s3 error');
                        res.status(400).send({ err: err });
                    } else {
                        console.log(data);
                        let sql = 'INSERT INTO folders (folder_name,location,user_id,created) values (?,?,?,?);';
                        let values = [folder_name, cur, user_id, date];
                        connection.query(sql, values, function(err, result, field) {
                            if (err) {
                                console.log('insert error');
                                res.status(400).send({ err: err });
                            } else {
                                let checkfolder = 'SELECT * FROM folders WHERE location = ? AND user_id = ? AND folder_name != ?;';
                                connection.query(checkfolder, [cur, user_id, 'trashcan'], function(err, rows, fields) {
                                    console.log(rows);
                                    res.status(200).send({
                                        folders: rows
                                    })
                                });
                            }
                        });
                    }
                });
            } else {
                res.status(404).send({ error: "same name error" });
            }
        }
    });
});


router.post('/delfolder', function(req, res, next) {
    console.log(req.body);
    user_id = req.body.id;
    let cur = req.body.cur;
    curPath = user_id + cur;
    let name = req.body.folder_name;
    let newPath = user_id + '/trashcan/';
    let checkfolder = 'SELECT * FROM folders WHERE location = ? AND folder_name = ? AND user_id = ?;';
    connection.query(checkfolder, [cur, name, user_id], function(err1, rows, fields) {
        console.log(rows);
        if (rows.length != 0) {
            let copy_params = {
                Bucket: BUCKET_NAME,
                CopySource: BUCKET_NAME + '/drive/' + curPath + name + '/',
                Key: 'drive/' + newPath + name + '/'
            };
            let del_params = {
                Bucket: BUCKET_NAME,
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
                            let values = ['/trashcan/', cur, name, user_id];
                            let updatesql = 'UPDATE folders SET location = ? WHERE location = ? AND folder_name = ? AND user_id = ?;';
                            connection.query(updatesql, values, function(err3, result, field) {
                                if (err3) {
                                    console.log("updatesql error");
                                    res.status(304).send({ error: "updatesql error" });
                                } else {
                                    let resultsql = 'SELECT * FROM folders WHERE location = ? AND user_id = ? AND folder_name != ?;';
                                    connection.query(resultsql, [cur, user_id, 'trashcan'], function(err, rows, fields) {
                                        res.status(200).send({
                                            folders: rows
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
});


router.post('/move', function(req, res, next) {
    console.log(req.body);
    user_id = req.body.id;
    let cur = req.body.cur;
    curPath = user_id + cur;
    let name = req.body.name;
    let newPath = user_id + req.body.newPath;
    if (req.body.isfolder) {
        let infolderpath = cur + name + '/';
        let checkinfolder = 'SELECT location FROM folders WHERE location = ? AND user_id = ? UNION ALL SELECT location FROM files  WHERE location = ? AND user_id = ?;';
        connection.query(checkinfolder, [infolderpath, user_id, infolderpath, user_id], function(err, infolder) {
            if (err) {
                console.log("copy error");
                res.status(304).send({ error: "checkinfolder error" });
            } else {
                if (infolder.length != 0) {
                    res.status(204).send({ error: "infolder exist!" })
                } else {
                    let checkfolder = 'SELECT * FROM folders WHERE location = ? AND folder_name = ? AND user_id = ?;';
                    connection.query(checkfolder, [cur, name, user_id], function(err1, rows, fields) {
                        console.log(rows);
                        if (rows.length != 0) {
                            let copy_params = {
                                Bucket: BUCKET_NAME,
                                CopySource: BUCKET_NAME + '/drive/' + curPath + name + '/',
                                Key: 'drive/' + newPath + name + '/'
                            };
                            let del_params = {
                                Bucket: BUCKET_NAME,
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
                                            let values = [req.body.newPath, cur, name, user_id];
                                            let updatesql = 'UPDATE folders SET location = ? WHERE location = ? AND folder_name = ? AND user_id = ?;';
                                            connection.query(updatesql, values, function(err3, result, field) {
                                                if (err3) {
                                                    console.log("updatesql error");
                                                    res.status(304).send({ error: "updatesql error" });
                                                } else {
                                                    let resultsql = 'SELECT * FROM folders WHERE location = ? AND user_id = ? AND folder_name != ?;';
                                                    connection.query(resultsql, [cur, user_id, 'trashcan'], function(err, rows, fields) {
                                                        res.status(200).send({
                                                            folders: rows
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
                }
            }
        });
    } else {
        let checkfile = 'SELECT * FROM files WHERE location = ? AND file_name = ? AND user_id = ?;';
        connection.query(checkfile, [cur, name, user_id], function(err1, rows, fields) {
            if (rows.length != 0) {
                let copy_params = {
                    Bucket: BUCKET_NAME,
                    CopySource: BUCKET_NAME + '/drive/' + curPath + name,
                    Key: 'drive/' + newPath + name
                };
                let del_params = {
                    Bucket: BUCKET_NAME,
                    Key: 'drive/' + curPath + name
                };
                s3.copyObject(copy_params, function(err, data) {
                    if (err) {
                        console.log(err, data);
                        res.status(304).send({ error: "copy error" });
                    } else {
                        s3.deleteObject(del_params, function(err, data) {
                            if (err) {
                                console.log(err, data);
                                res.status(304).send({ error: "delete error" });
                            } else {
                                let values = [req.body.newPath, cur, name, user_id];
                                let updatesql = 'UPDATE files SET location = ? WHERE location = ? AND file_name = ? AND user_id = ?;';
                                connection.query(updatesql, values, function(err3, result, field) {
                                    if (err3) {
                                        res.status(304).send({ error: "updatesql error" });
                                    } else {
                                        let resultsql = 'SELECT * FROM files WHERE location = ? AND user_id = ?;';
                                        connection.query(resultsql, [cur, user_id], function(err, rows, fields) {
                                            res.status(200).send({
                                                files: rows
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


// router.post('/modify', function(req, res, next) {
//     console.log(req.body);
//     user_id = req.body.id;
//     let cur = req.body.cur;
//     curPath = user_id + cur;
//     let name = req.body.folder_name;
//     let newName = req.body.newName;

//     let checkfolder = 'SELECT * FROM folders WHERE location = ? AND folder_name = ? AND user_id = ?;';
//     connection.query(checkfolder, [cur, name, user_id], function(err1, rows, fields) {
//         console.log(rows);
//         if (rows.length != 0) {
//             let copy_params = {
//                 Bucket: BUCKET_NAME,
//                 CopySource: BUCKET_NAME + '/drive/' + curPath + name + '/',
//                 Key: 'drive/' + curPath + newName + '/'
//             };
//             let del_params = {
//                 Bucket: BUCKET_NAME,
//                 Key: 'drive/' + curPath + name + '/'
//             };
//             s3.copyObject(copy_params, function(err, data) {
//                 if (err) {
//                     console.log(err, data);
//                     console.log("copy error");
//                     res.status(304).send({ error: "copy error" });
//                 } else {
//                     s3.deleteObject(del_params, function(err, data) {
//                         if (err) {
//                             console.log(err, data);
//                             console.log("delete error");
//                             res.status(304).send({ error: "delete error" });
//                         } else {
//                             let date = moment().format();
//                             let values = [newName, date, cur, name, user_id];
//                             let updatesql = 'UPDATE folders SET folder_name = ? AND modify = ? WHERE location = ? AND folder_name = ? AND user_id = ?;';
//                             connection.query(updatesql, values, function(err3, result, field) {
//                                 if (err3) {
//                                     console.log("updatesql error");
//                                     res.status(304).send({ error: "updatesql error" });
//                                 } else {
//                                     let resultsql = 'SELECT * FROM folders WHERE location = ? AND user_id = ?;';
//                                     connection.query(resultsql, [cur, user_id], function(err, rows, fields) {
//                                         res.status(200).send({
//                                             folders: rows
//                                         });
//                                     });
//                                 }
//                             });
//                         }
//                     });
//                 }
//             });
//         } else {
//             console.log("Does not exist");
//             res.status(304).send({ error: "Does not exist" });
//         }
//     });

// });

router.get('/search', function(req, res, next) {
    console.log(req.query);
    user_id = req.query.id;
    let target = connection.escape('%' + req.query.target + '%');
    console.log(target);
    let folders = []
    let files = []
    let checkfolder = 'SELECT * FROM folders WHERE folder_name LIKE ' + target + ' AND user_id = ? AND folder_name != ?;';
    connection.query(checkfolder, [user_id, 'trashcan'], function(err, folder, fields) {
        console.log(folder);
        folders.push(folder)
        let checkfile = 'SELECT * FROM files WHERE file_name LIKE ' + target + ' AND user_id = ?;';
        connection.query(checkfile, [user_id], function(err, file, fields) {
            console.log(file);
            files.push(file)
            res.status(200).send({
                folders: folders,
                files: files
            })
        });
    });

});

module.exports = router;