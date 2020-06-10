var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/../modules/awsconfig.json");
var S3 = require('../modules/s3/s3');

var fs = require('fs');


// /file
router.get('/', function(req, res) {
    console.log(req.query);
    var user_id = req.query.id;
    var curPath = req.query.cur; // /folder1/folder2/

    var sql = 'SELECT * FROM files WHERE user_id=(?) AND location=(?) ORDER BY date DESC';
    connection.query(sql, [user_id, curPath], function(err, result) {
        if (err) {
            res.send({ error: 'select error' });
        } else {

            res.status(200).send({ files: result });
        }
    })
});



router.get('/:name', function(req, res) {
    var file_name = req.params.name;
    var curPath = req.query.cur; // /folder1/folder2/
    var user_id = req.query.id;

    var targetFile = curPath.substring(1) + file_name; // folder1/folder2/test.txt
    var extension = targetFile.split('.')[1].toLowerCase();


    S3.downloadFile2(S3.BUCKET_NAME, user_id, targetFile, function(result, downloadDir) {
        if (result) {
            var content;
            content = fs.readFileSync(downloadDir, 'utf8');
            res.send({ file_name: file_name, content: content });

            //if (extension == 'jpg' || extension == 'jpeg' || extension == 'png') {
            //    res.send({ type: 'image', src: downloadDir})
            //}else{
            //    var content;
            //    content = fs.readFileSync(downloadDir, 'utf8');
            //    res.send({file_name: file_name, content: content});
            //    //res.status(200).send({type: 'text', src: downloadDir})
            //}
        }
    })
});


module.exports = router;