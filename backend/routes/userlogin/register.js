var express = require('express');
var request = require('request');
var async = require('async');

var cryptoM = require('./../../routes/modules/cryptoM.js');

var router = express.Router();

router.get('/', function(req, res, next) {
    // res.render('userlogin/register',{
    //     msg: "register"
    // });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    var user_id=req.body.user_id;
    var user_pw=req.body.user_pw;
    var user_email=req.body.user_email;
    var user_name=req.body.user_name;
    var user_phone=req.body.user_phone;

    var sqlquery = "SELECT  * FROM users WHERE user_id = ?";
        connection.query(sqlquery, [user_id], function (err, result) {
            if (rows.length == 0) {
                user_pw=cryptoM.encrypt(user_pw);
                console.log(user_pw);
                var sql = 'INSERT INTO users(user_id,user_pw, user_email, user_phone, user_name) values (?,?,?,?,?)';
                var values = [user_id, user_pw, user_email, user_phone,user_name];
                connection.query(sql, values, function (err) {
                    if (err) {
                        console.log("inserting user failed");
                        throw err;
                    } else {
                        res.redirect('/login');

                    }
                });
            } else {
                res.redirect("/login");
                throw err;
            }
        });
});

module.exports = router;
