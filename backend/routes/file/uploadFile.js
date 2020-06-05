var express = require('express');
var router = express.Router();

var formidable = require('formidable');

var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/../modules/awsconfig.json");
var S3 = require('../modules/s3/s3');



// /file/upload
router.post('/', function (req, res) {
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, function (err, fields, files) {
        console.log(files);
        
        /* form-data로 받아야 함 */
        var user_id = fields.user_id;
        var curPath = fields.cur // /folder1/folder2/
        console.log(user_id);
        console.log(curPath);

        var sourceFiles = [];
        var errFiles = [];
        var targetPath;       // 'folder1/folder2'
        var bodies = [];
        var errMessage = 'upload error';

        if (curPath == '/') {
            targetPath = '';
        } else {
            targetPath = curPath.substring(1, curPath.length-1);
        }

        if(!files.file[0]){ // 파일 하나일 때
            var checkFileName = files.file.name;
            checkFileName = checkFileName.split('(').join(',').split(')').join(',').split(',');
            if (checkFileName.length > 1) {
                errFiles.push(files.file.name);
                errMessage = 'check your file name(\'(\', \')\' x!)'
            }else{
                sourceFiles.push(files.file.name);
                bodies.push(files.file.path);
                console.log('bodies', bodies);
            }
        }else{
            for (var file of files.file) {  // 파일 여러개일 때
                var checkFileName = file.name;
                checkFileName = checkFileName.split('(').join(',').split(')').join(',').split(',');
                if (checkFileName.length > 1){
                    errFiles.push(file.name);
                } else {
                    sourceFiles.push(file.name);
                    bodies.push(file.path);
                }
            }
        }

        S3.uploadFiles(0, errFiles, S3.BUCKET_NAME, user_id, sourceFiles, targetPath, bodies, function (result, errFiles) {
            var noErrSourceFiles = [];
            for (var sourceFile of sourceFiles) {
                if (!(sourceFile in errFiles)) {
                    noErrSourceFiles.push(sourceFile);
                }
            }
            for (var sourceFile of noErrSourceFiles) {
                var sql = 'INSERT INTO files (file_name, user_id, location) VALUES (?, ?, ?)';
                connection.query(sql, [sourceFile, user_id, curPath], function (err, result) {
                    if (err) {
                        console.log('insert error');
                        res.send({error: 'insert error'});
                    }
                })
            }
            if (errFiles.length){
                res.send({err: errMessage,
                          errFiles: errFiles})
            } else {
                res.send({message: 'Upload Success',
                          finalFiles: sourceFiles});
            }
        })
    })
})



module.exports = router;