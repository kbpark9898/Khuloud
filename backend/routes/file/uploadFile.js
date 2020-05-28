var express = require('express');
var router = express.Router();

var formidable = require('formidable');

var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/../modules/awsconfig.json");
var S3 = require('../modules/s3/s3');



// /file/upload
router.post('/', function (req, res) {
    var user_id = req.session.user_id;

    var sourceFiles = [];
    var errFiles = [];
    var targetPath = '';
    var bodies = [];


    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, function (err, fields, files) {
        if(!files.file[0]){
            sourceFiles.push(files.file.name);
            bodies.push(files.file.path);
        }else{
            for (var file of files.file) {
                sourceFiles.push(file.name);
                bodies.push(file.path);
            }
        }

        S3.uploadFiles(0, errFiles, S3.BUCKET_NAME, user_id, sourceFiles, targetPath, bodies, function (result, errFiles) {
            var newSourceFiles = [];
            if (!result) {   // 에러 파일이 있는 경우
                for (var sourceFile of sourceFiles) {
                    if (!(sourceFile in errFiles)) {
                        newSourceFiles.push(sourceFile);
                    }
                }
            }
            for (var sourceFile of sourceFiles) {
                var sql = 'INSERT INTO files (file_name, user_id, location) VALUES (?, ?, ?)';
                connection.query(sql, [file_name, user_id, targetPath], function (err, result) {
                    if (err) {
                        console.log('insert file {', sourceFile, '} in db failed');
                    }
                })
            }
            res.send({Errfiles: errFiles});
        })
    })
})

/*
// /file/upload
router.post('/', function (req, res) {
    //var user_id = req.session.user_id;
    var user_id = 'shlee';

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
                S3.uploadFile(S3.BUCKET_NAME, user_id, sourceFile, targetPath, files.file.path, function (result) {
                    if (result) {
                        console.log("Upload Success");
                        res.send(result);
                    } else {
                        console.log("Upload Fail: Check FIle Duplication");
                    }
                })
            }
        });
    })
});
*/


module.exports = router;