var express = require('express');
var request = require('request');
var async = require('async');
var router = express.Router();
var CryptoJS = require("crypto-js");

router.post('/update', function(req, res, next) {
  var user_id=req.body.user_id;
  var user_pw=req.body.user_pw;
  var user_pw2=req.body.user_pw2;
  var user_email=req.body.user_email;
  var user_phone=req.body.user_phone;

  if(user_pw===user_pw2) {
	   	user_pw=cryptoM.encrypt(user_pw);
        var sql='UPDATE users SET user_pw = ?, user_email= ?,user_phone = ? WHERE user_id = ?';
        var values=[user_pw, user_email,user_phone, user_id];
        connection.query(sql, values, function (err) {
          if (err) {
            console.log("updating user failed");
            next(err);
          } else {
            res.status(200).send('update');
          }
        });
  }
  else
  {
    res.status(404).send(err);
  }
});




module.exports = router;
