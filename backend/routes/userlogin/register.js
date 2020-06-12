var express = require('express');
var request = require('request');
var async = require('async');
const AWS = require("aws-sdk");
AWS.config.loadFromPath(__dirname + "/../modules/awsconfig.json");
var cryptoM = require('./../../routes/modules/cryptoM.js');
const moment = require("moment");

const BUCKET_NAME = "khuloud";
const s3 = new AWS.S3();

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
                    res.status(400).send({ err: err });
                } else {
                    let params = {
                        Bucket: BUCKET_NAME,
                        Key: 'drive/' + user_id + '/',
                        Body: "",
                        ACL: "public-read-write"
                    };
                    s3.putObject(params, function(err, data) {
                        if (err) {
                            console.log('s3 error');
                            res.status(400).send({ err: err });
                        } else {
                            let params2 = {
                                Bucket: BUCKET_NAME,
                                Key: 'drive/' + user_id + '/share/',
                                Body: "",
                                ACL: "public-read-write"
                            };
                            s3.putObject(params2, function(err, data) {
                                if (err) {
                                    console.log('s3 error');
                                    res.status(400).send({ err: err });
                                } else {
                                    let params3 = {
                                        Bucket: BUCKET_NAME,
                                        Key: 'drive/' + user_id + '/trashcan/',
                                        Body: "",
                                        ACL: "public-read-write"
                                    };
                                    s3.putObject(params3, function(err, data) {
                                        if (err) {
                                            console.log('s3 error');
                                            res.status(400).send({ err: err });
                                        } else {
                                            let date = moment().format();
                                            let root = '/';
                                            let sql = "INSERT INTO folders (folder_name,location,user_id,created) values (?,?,?,?);";
                                            connection.query(sql, ['share', root, user_id, date], function(err, result, field) {
                                                if (err) {
                                                    console.log('insert1 error');
                                                    res.status(400).send({ err: err });
                                                } else {
                                                    let sql = "INSERT INTO folders (folder_name,location,user_id,created) values (?,?,?,?);";
                                                    connection.query(sql, ['trashcan', root, user_id, date], function(err, result, field) {
                                                        if (err) {
                                                            console.log('insert2 error');
                                                            res.status(400).send({ err: err });
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
