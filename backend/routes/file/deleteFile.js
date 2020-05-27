var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/../modules/awsconfig.json");
var S3 = require('../modules/s3/s3');


// /file/delete/:name
router.get('/:name', function (req, res) {
    var file_name = req.params.name;
    //var user_id = req.session.user_id;
    var user_id = 'shlee';

    var sourceFile = file_name;
    var targetPath = 'trashcan';

    var sql1 = 'DELETE FROM files WHERE file_name = (?) AND user_Id = (?)';
    var sql2 = 'INSERT INTO trashcan (trash_name, user_Id) VALUES (?, ?)';


    connection.query(sql1, [file_name, user_id], function (err) {
        if (err) {
            console.log('delete db error');
            throw err;
        }
        else {
            connection.query(sql2, [file_name, user_id], function (err) {
                if (err) {
                    console.log('insert in trashcan db error');
                    throw err;
                }
                else {
                    // /drive/user_id/sourceFile --> /drive/user_id/trashcan/sourceFile
                    S3.moveFile(S3.BUCKET_NAME, user_id, sourceFile, targetPath, function (result) {
                        if (result) {
                            console.log("file move to trashcan success");
                            res.send(result);
                        }
                    })
                }
            })
        }
    })
});


module.exports = router;