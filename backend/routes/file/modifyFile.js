var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/../modules/awsconfig.json");
var S3 = require('../modules/s3/s3');

var fs = require('fs');
var moment = require('moment');


// /file/modify/:name
router.post('/:name', function(req, res){
    var user_id = req.body.user_id;
    var curPath = req.body.cur;     // /folder1/folder2/
    var file_name = req.params.name;
    var modified_content = req.body.content;

    var targetPath;
    if (curPath == '/') {
        targetPath = '';
    } else {
        targetPath = curPath.substring(1, curPaht.length-1);  // folder1/folder2
    }

    var tempDownloadDir = __dirname + '/../modules/s3/download/' + user_id + curPath + file_name;
    fs.writeFileSync(tempDownloadDir, modified_content);

    S3.coverFile(S3.BUCKET_NAME, user_id, file_name, targetPath, tempDownloadDir, function(result){
        fs.unlink(tempDownloadDir, function(err){
            if (result){
                var sql = 'UPDATE files SET updated=(?) WHERE user_id=(?) AND location=(?) AND file_name=(?)';
                connection.query(sql, [moment().format(), user_id, curPath, file_name], function(err){
                    if (err){
                        console.log(err);
                        res.send({error: 'update error'});
                    }else{
                        res.send('modify file success');
                    }
                })
            }else{
                res.send({error: 'modify file failed'});
            }
        })
    })
});


module.exports = router;