var express = require('express');
var request = require('request');
var async = require('async');
var router = express.Router();
var cryptoM = require('./../../routes/modules/cryptoM.js');

router.get('/', function(req, res, next) {
    //
});

router.post('/', function(req, res, next) {
    var user_id=req.body.user_id;
    var user_pw=req.body.user_pw;
    var sqlquery = "SELECT  * FROM users WHERE user_id = ?";
    connection.query(sqlquery, user_id,function (err, result) {
            if (err) {
                console.log("no match");
            } else {
                var bytes =cryptoM.decrypt(result[0].user_pw);
                if(bytes===user_pw) {
                    console.log("user login successfully");
                    req.session.user_id=result[0].user_id;
                    res.redirect('/main');
                }else{
                    console.log("wrong password!");
                }

            }
        });
});



module.exports = router;
