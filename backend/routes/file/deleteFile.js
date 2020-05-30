var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/../modules/awsconfig.json");
var S3 = require('../modules/s3/s3');


// /file/delete/:name
router.get('/:name', function (req, res) {
    var user_id = req.session.user_id;

    var sourceFile = req.params.name;
    var targetPath = 'trashcan';

    var paths = sourceFile.split('/');
    var index = sourceFile.length - (paths[paths.length - 1].length + 1);
    var file_name = paths[paths.length - 1];
    var location = sourceFile.substring(6 + user_id.length, index);

    var sql1 = 'DELETE FROM files WHERE file_name = (?) AND location=(?) AND user_Id = (?)';
    var sql2 = 'INSERT INTO trashcan (trash_name, location, user_Id) VALUES (?, ?, ?)';


    connection.query(sql1, [file_name, location, user_id], function (err) {
        if (err) {
            console.log('delete db error');
            throw err;
        }
        else {
            connection.query(sql2, [file_name, location, user_id], function (err) {
                if (err) {
                    console.log('insert in trashcan db error');
                    throw err;
                }
                else {
                    // /drive/user_id/sourceFile --> /drive/user_id/trashcan/sourceFile
                    S3.moveFile(S3.BUCKET_NAME, user_id, sourceFile, targetPath, function (result) {
                        if (result) {
                            console.log("file move to trashcan success");
                            res.send("Upload Success");
                        }
                    })
                }
            })
        }
    })
});


module.exports = router;