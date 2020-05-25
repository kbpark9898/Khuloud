var express = require('express');
var request = require('request');
var async = require('async');
var router = express.Router();
var CryptoJS = require("crypto-js");

function get_my_info(id,cb){
  console.log("get_my_info");
  console.log(id);
  var sqlquery = "SELECT  * FROM users WHERE user_id = ?";
  var myinfo= new Array();
  connection.query(sqlquery,id,function(err,rows){
    if(!err){
      myinfo=rows;
      console.log(myinfo);
      cb(myinfo);
    } else {
      console.log("내 정보를 가져오는데 실패했습니다!");
		res.send({result: false});
      //throw err;
    }
  });
}

router.get('/', function(req, res, next) {
	 console.log(req.session.user_id);
    async.series(
        [
          function (callback) {
            get_my_info(req.session.user_id, function (myinfo_list) {
              callback(null, myinfo_list);
            });
          }
        ],
        function (err, results) {
          res.render('dropbox/user', {
            myinfo: results[0]
          });
        }
    );
  //}
});


router.post('/update', function(req, res, next) {
  var user_id=req.body.user_id;
  var user_pw=req.body.user_pw;
  var user_pw2=req.body.user_pw2;
  var user_email=req.body.user_email;
  // var user_phone=req.body.user_phone;

  if(user_pw===user_pw2) {
    console.log(user_pw2);
       // user_pw=CryptoJS.AES.encrypt(user_pw, 'secret key 123');
	   	user_pw=cryptoM.encrypt(user_pw);
        var sql='UPDATE users SET user_pw = ?, user_email= ? WHERE user_id = ?';
        var values=[user_pw, user_email, user_id];
        connection.query(sql, values , function (err) {
          if (err) {
            console.log("updating user failed");
            //res.send({result:false});
			  //throw err;
          } else {
            console.log("user updated successfully");
			      res.redirect('back');
          }
        });
  }
  else
  {
    console.log("비밀번호가 일치하지 않습니다.");
	res.send({result:false});
    res.redirect('back');
  }
});




module.exports = router;
