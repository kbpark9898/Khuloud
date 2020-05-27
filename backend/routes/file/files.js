var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/../modules/awsconfig.json");
var S3 = require('../modules/s3/s3');


router.get('/', function (req, res) {
    //var userId = req.session.user_id;
    var userId = 'shlee';

    var sql = 'SELECT * FROM files WHERE user_id = (?) ORDER BY date DESC';
    connection.query(sql, [userId], function (err, result) {
        if (err){
            console.log('bringing fileList failed');
        }
        else {
            console.log('bringing fileList success');
            res.send(result);
            //res.render('file/files');
        }
    })
});

// /file/:name
router.get('/:name', function (req, res) {
    var file_name = req.params.name;
    //var user_id = req.session.user_id;
    var user_id = 'shlee';

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