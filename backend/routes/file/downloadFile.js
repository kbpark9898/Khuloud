var express = require('express');
var router = express.Router();

var fs = require('fs');
var moment = require('moment');

var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/../modules/awsconfig.json");
var S3 = require('../modules/s3/s3_new');



router.get('/:name', function (req, res) {
    var file_name = req.params.name;
    var curPath = req.query.cur;    // /folder1/folder2/
    var user_id = req.query.id;

    var targetFile = curPath.substring(1) + file_name;  // folder1/folder2/test.txt
    console.log(targetFile);


    S3.downloadFile3(S3.BUCKET_NAME, user_id, targetFile, function (result, downloadDir) {
        if (result) {
            var sql = 'UPDATE files SET recent_access=(?) WHERE user_id=(?) AND location=(?) AND file_name=(?)';
            connection.query(sql, [moment().format(), user_id, curPath, file_name], function(err){
                if (err){
                    res.send({err: 'update error'});
                }else{
                    res.send({ src: downloadDir })
                }
            })
        }else{
            res.send({ err: 'no such file'})
        }
    })
}); 

/*
router.get('/:name', function (req, res, next) {
    var file_name = req.params.name;    // test.txt
    var user_id = req.query.id;
    var curPath = req.query.cur;    // /folder1/folder2/

    var targetFile = (curPath + file_name).substring(1);  // folder1/folder2/test.txt

    var s3 = new AWS.S3();
    var params = {
        Bucket: S3.BUCKET_NAME,
        Key: 'drive/' + user_id + '/' + targetFile,
    };

    res.attachment(file_name);
    var fileStream = s3.getObject(params).createReadStream();
    fileStream.pipe(res);
});
*/

/*
// /file/download/:name
router.get('/:name', function (req, res) {
    var file_name = req.params.name;    // test.txt
    var user_id = req.query.id;
    var curPath = req.query.cur;    // /folder1/folder2/

    var targetFile = (curPath + file_name).substring(1);  // folder1/folder2/test.txt

    S3.downloadFile2(S3.BUCKET_NAME, user_id, targetFile, function (result, downloadDir) {
        if (result){
            res.download(downloadDir, function (err) {
                if (err){
                    console.log(err);
                }else{
                    console.log('download success');
                }
            });
        }else{
            res.send({error: 'download error'});
        }
    });
});
*/


module.exports = router;