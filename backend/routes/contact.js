var express = require('express');
var router = express.Router();

// 연락처 백업, 삭제, 검색
/*
contact_upload : 연락처 파일 업로드 모듈
input : 사용자가 연락처를 저장해놓은 csv 혹은 xlsx 파일
output : 연락처 저장 성공 여부
*/
router.get('/contact_upload', function(req, res, next) {
  console.log("login");
});

/*
contact_download : 연락처 파일 다운로드 모듈
input : 사용자의 연락처 다운로드 요청
output : 연락처 다운로드 성공 여부 및 csv, xlsx 파일
*/
router.get('/contact_download', function(req, res, next) {
});

/*
contact_create : 연락처 생성 모듈
input : 사용자의 연락처 생성 요청
output : 연락처 생성 성공 여부
사용자한테 연락처 정보 받아오기
*/
router.get('/contact_create', function(req, res, next) {
  //insert into contact(name) value ("daso")
});

/*
contact_delete : 연락처 삭제 모듈
input : 사용자의 연락처 삭제 요청
output : 연락처 삭제 성공 여부
*/
router.get('/contact_delete', function(req, res, next) {
});

/*
contact_search : 연락처 검색 모듈
input : 사용자가 이름, 전화번호, 이메일 중 하나를 검색
output : 검색을 요청한 데이터에 부합하는 연락처를 찾았다면 출력
*/
router.post('/contact_search', function(req, res, next) {
    console.log("req.query",req.query);
    var user_id = req.query.id;
    var type = req.query.type;
    var info = "";
    if(type == "name")
    {
      info = req.query.name;
      var sqlquery = "SELECT  * FROM contact WHERE user_id = ? and name = ?";
    }
    else if(type == "phone")
    {
      info = req.query.phone;
      var sqlquery = "SELECT  * FROM contact WHERE user_id = ? and phone = ?";
    }
    else if(type == "email")
    {
      info = req.query.email;
      var sqlquery = "SELECT  * FROM contact WHERE user_id = ? and email = ?";
    }
    console.log(sqlquery);
    connection.query(sqlquery, [user_id,info], function (err, rows) {
      if (err) {
          console.log("search contact failed");
          throw err;
      } else {
          console.log(rows);
           res.status(200).send({contact_list : rows});
      }

    });
});

/*
contact_list : 연락처 출력 모듈
input : 사용자의 연락처 출력 요청
output : 저장된 연락처 목록 출력
*/
router.post('/contact_list', function(req, res, next) {
  console.log("req.query",req.query);
  var user_id = req.query.id;
  var sqlquery = "SELECT  * FROM contact WHERE user_id = ?";
      connection.query(sqlquery, [user_id], function (err, rows) {
        if (err) {
            console.log("select contact failed");
            throw err;
        } else {
            console.log(rows);
             res.status(200).send({contact_list : rows});
        }

      });
});


module.exports = router;
