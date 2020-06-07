var express = require('express');
var request = require('request');
var async = require('async');
const AWS = require("aws-sdk");

var cryptoM = require('./../../routes/modules/cryptoM.js');

const BUCKET_NAME = "hong-s3-cloud";

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-northeast-2"
});

var router = express.Router();

router.get('/', function(req, res, next) {
    // res.render('userlogin/register',{
    //     msg: "register"
    // });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    var user_id = req.body.user_id;
    var user_pw = req.body.user_pw;
    var user_email = req.body.user_email;
    var user_name = req.body.user_name;
    var user_phone = req.body.user_phone;

    var sqlquery = "SELECT  * FROM users WHERE user_id = ?";
    connection.query(sqlquery, [user_id], function(err, rows) {
        if (rows.length == 0) {
            user_pw = cryptoM.encrypt(user_pw);
            console.log(user_pw);
            var sql = 'INSERT INTO users(user_id,user_pw, user_email, user_phone, user_name) values (?,?,?,?,?)';
            var values = [user_id, user_pw, user_email, user_phone, user_name];
            connection.query(sql, values, function(err) {
                if (err) {
                    console.log("inserting user failed");
                    throw err;
                } else {
                    let params = {
                        Bucket: BUCKET_NAME,
                        Key: user_id + '/',
                        Body: "",
                        ACL: "public-read-write"
                    };
                    s3.putObject(params, function(err, data) {
                        if (err) {
                            console.log('s3 error');
                        } else {
                            let params2 = {
                                Bucket: BUCKET_NAME,
                                Key: user_id + '/share/',
                                Body: "",
                                ACL: "public-read-write"
                            };
                            s3.putObject(params2, function(err, data) {
                                if (err) {
                                    console.log('s3 error');
                                } else {
                                    let params3 = {
                                        Bucket: BUCKET_NAME,
                                        Key: user_id + '/trashcan/',
                                        Body: "",
                                        ACL: "public-read-write"
                                    };
                                    s3.putObject(params3, function(err, data) {
                                        if (err) {
                                            console.log('s3 error');
                                        } else {
                                            res.status(200).send('saved');
                                        }
                                    });
                                }
                            });
                        }
                    });


                }
            });
        } else {
            res.status(404).send(err);
        }
    });
});

module.exports = router;