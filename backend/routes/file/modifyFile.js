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
    var modified_name = req.body.name;
    var modified_content = req.body.content;

    var targetPath;
    if (curPath == '/') {
        targetPath = '';
    } else {
        targetPath = curPath.substring(1, curPaht.length-1);  // folder1/folder2
    }

    var originalDir = __dirname + '/../modules/s3/download/' + user_id + curPath + file_name;
    var tempDownloadDir;

    // 파일 이름 변경
    S3.renameFile(S3.BUCKET_NAME, user_id, file_name, modified_name, targetPath, function(result, r_modified_name){
        if (result){
            modified_name = r_modified_name;
            tempDownloadDir = __dirname + '/../modules/s3/download/' + user_id + curPath + modified_name;
            fs.unlink(originalDir, function(err){
                if (err){
                    console.log(err);
                    res.send({error: 'original file not exists in server'});
                }else{
                    // 파일 내용 변경
                    fs.writeFileSync(tempDownloadDir, modified_content);

                    S3.coverFile(S3.BUCKET_NAME, user_id, modified_name, targetPath, tempDownloadDir, function (result) {
                        if (result) {
                            var sql = 'UPDATE files SET file_name=(?), updated=(?), recent_access=(?) WHERE user_id=(?) AND location=(?) AND file_name=(?)';
                            connection.query(sql, [modified_name, moment().format(), moment().format(), user_id, curPath, file_name], function (err) {
                                if (err) {
                                    console.log(err);
                                    res.send({ error: 'update error' });
                                } else {
                                    fs.unlinkSync(tempDownloadDir);
                                    res.send('modify file success');
                                }
                            })
                        } else {
                            res.send({ error: 'modify file failed' });
                        }
                    })
                }
            });
        }else{
            res.send({error: 'rename error'});
        }
    })
});


module.exports = router;