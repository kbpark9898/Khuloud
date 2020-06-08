const express = require('express');
const router = express.Router();
const AWS = require("aws-sdk");
const moment = require("moment");

const BUCKET_NAME = "hong-s3-cloud";

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-northeast-2"
});


router.post('/', function(req, res, next) {
    console.log(req.body);
    let user_id = req.body.id;
    let cur = req.body.cur;
    let curPath = user_id + cur;
    let name = req.body.file_name;
    let target_id = req.body.target_id;

    let checkfile = 'SELECT * FROM files WHERE location = ? AND file_name = ? AND user_id = ?';
    connection.query(checkfile, [curPath, name, user_id], function(err1, rows, fields) {
        if (rows.length != 0) {
            let copy_params = {
                Bucket: BUCKET_NAME,
                CopySource: BUCKET_NAME + '/' + curPath + name,
                Key: target_id + '/share/' + name
            };
            s3.copyObject(copy_params, function(err, data) {
                if (err) {
                    console.log(err, data);
                    res.status(304).send({ error: "copy error" });
                } else {
                    let values = [name, cur, target_id];
                    let sharesql = 'INSERT INTO files (file_name,location,user_id) values (?,?,?);';
                    connection.query(sharesql, values, function(err3, result, field) {
                        if (err3) {
                            console.log("sharesql error");
                            res.status(304).send({ error: "sharesql error" });
                        } else {
                            res.status(200).send({});
                        }
                    });
                }
            });
        } else {
            res.status(304).send({ error: "Does not exist" });
        }
    });

});

module.exports = router;