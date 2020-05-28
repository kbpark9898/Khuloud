var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/../modules/awsconfig.json");
var S3 = require('../modules/s3/s3');


router.get('/', function (req, res) {
    var user_id = req.query.user_id;

    var sql = 'SELECT * FROM files WHERE user_id = (?) ORDER BY date DESC';
    connection.query(sql, user_id, function (err, result) {
        if (result.length == 0){
            res.send({error: 'Exist Nothing'});
        }else{
            res.status(200).send({files: result});
        }
    })
});

// /file/:name
router.get('/:name', function (req, res) {
    var file_name = req.params.name;
    var user_id = req.query.user_id;

    var s3 = new AWS.S3();

    var sourceFile = 'drive/' + user_id + '/' + file_name;
    var params = { Bucket: S3.BUCKET_NAME, Key: sourceFile };
    var stream = s3.getObject(params).createReadStream();
    stream.pipe(res, function (err) {
        if (err) {
            throw err;
        }
    })
});


module.exports = router;