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


module.exports = router;
