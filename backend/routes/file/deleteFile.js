var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/../modules/awsconfig.json");
var S3 = require('../modules/s3/s3');


// /file/delete/:name
router.get('/:name', function (req, res) {
    var file_name = req.params.name;
    var user_id = req.query.id;
    var curPath = req.query.cur;

    var targetPath = 'trashcan';
    var sourceFile = curPath.substring(1) + file_name;

    var sql1 = 'DELETE FROM files WHERE file_name = (?) AND location=(?) AND user_Id = (?)';
    var sql2 = 'INSERT INTO trashcan (trash_name, location, user_Id) VALUES (?, ?, ?)';

    connection.query(sql1, [file_name, curPath, user_id], function (err) {
        if (err) {
            console.log('delete db error');
            res.status(404).send({erorr: 'db delete error'});
        }
        else {
            connection.query(sql2, [file_name, '/trashcan'+curPath, user_id], function (err) {
                if (err) {
                    console.log('insert in trashcan db error');
                    res.status(404).send({error: 'db insert error'});
                }
                else {
                    // /drive/user_id/sourceFile --> /drive/user_id/trashcan/sourceFile
                    S3.moveFile2(S3.BUCKET_NAME, user_id, sourceFile, targetPath, function (result) {
                        if (result) {
                            res.satus(200).send("move to trashcan success");
                        }
                    })
                }
            })
        }
    })
});


module.exports = router;