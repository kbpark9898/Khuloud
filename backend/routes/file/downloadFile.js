var express = require('express');
var router = express.Router();

var fs = require('fs');

var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/../modules/awsconfig.json");
var S3 = require('../modules/s3/s3');



// /file/download/:name
router.get('/:name', function (req, res) {
    var file_name = req.params.name;    // test.txt
    var user_id = req.query.id;
    var curPath = req.query.cur;    // /folder1/folder2/

    var targetFile = (curPath + file_name).substring(1);  // folder1/folder2/test.txt

    S3.downloadFile2(S3.BUCKET_NAME, user_id, targetFile, function (result, downloadDir) {
        if (result){
            res.download(downloadDir, function (err) {
                fs.unlink(downloadDir, function (err) {
                    console.log('download success');
                });
            });
        }else{
            res.status(404).send({error: 'download error'});
        }
    });
});

module.exports = router;