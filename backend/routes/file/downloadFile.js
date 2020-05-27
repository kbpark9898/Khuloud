var express = require('express');
var router = express.Router();

var fs = require('fs');

var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/../modules/awsconfig.json");
var S3 = require('../modules/s3/s3');


// /file/download/:name
router.get('/:name', function (req, res) {
    var file_name = req.params.name;
    //var user_id = req.session.user_id;
    var user_id = 'shlee';

    var sourceFile = file_name;
    var tempDownloadDir = __dirname + '/../modules/s3/download/' + user_id + '/' + file_name;

    S3.downloadFile(S3.BUCKET_NAME, user_id, sourceFile, function (result, data) {
        !fs.existsSync(tempDownloadDir + '/../') && fs.mkdirSync(tempDownloadDir + '/../');
        fs.writeFileSync(tempDownloadDir, data);
        res.download(tempDownloadDir, function (err) {
            fs.unlink(tempDownloadDir, function (err) {
                console.log("Download Success");
            });
        });
    });
});

module.exports = router;