var express = require('express');
var router = express.Router();

var formidable = require('formidable');

var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/../modules/awsconfig.json");
var S3 = require('../modules/s3/s3');


// /file/upload
router.post('/', function (req, res) {
    var user_id = req.session.user_id;

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var file_name = files.file.name;
        var sourceFile = file_name;
        var targetPath = '';

        var sql = 'INSERT INTO files (file_name, user_id) VALUES (?)';
        connection.query(sql, [[file_name, user_id]], function (err) {
            if (err) {
                console.log("Upload db error");
                throw err;
            } else {
                S3.uploadFile(S3.BUCKET_NAME, userId, sourceFile, targetPath, files.image.path, function (result) {
                    if (result) {
                        console.log("Upload Success");
                    } else {
                        console.log("Upload Fail: Check FIle Duplication");
                    }
                })
            }
        });
    })
});


module.exports = router;