var express = require('express');
var router = express.Router();
const XLSX = require('xlsx');
var multer = require('multer');
var fs = require('fs');
var xl = require('excel4node');
const path = require('path');
// var pool = require('./../routes/modules/database');

//파일 저장위치와 파일이름 설정
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload');
    },
    //파일이름 설정
    filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

//파일 업로드 모듈
var upload = multer({ storage: storage })

// 연락처 백업, 삭제, 검색
/*
contact_upload : 연락처 파일 업로드 모듈
input : 사용자가 연락처를 저장해놓은 csv 혹은 xlsx 파일
output : 연락처 저장 성공 여부
*/
router.post('/contact_upload', upload.single('file'), function(req, res, next) {
    // console.log(req);
    var user_id = req.query.id;
    var file = req.file;
    var workbook = XLSX.readFile('public/upload/contact.xlsx');
    var firstWSheetName = workbook.SheetNames[0];
    var firstWSheet = workbook.Sheets[firstWSheetName];
    var name = [];
    var phone = [];
    var email = [];
    var added_date = [];
    var length = firstWSheet['!ref'][4];
    var temp ="";

    var sqlquery = "insert into contact(user_id,name,phone,email,added_date) values ";
    for(var i=1;i<length;i++)
    {
      for(var j=0;j<4;j++)
      {
        if(j==0){
          temp = "A" + (i+1);
          name.push(firstWSheet[temp].v);
          sqlquery += ' ("' + user_id + '","'+name[i-1];
          }
        else if(j==1){
          temp = "B" + (i+1);
          phone.push(firstWSheet[temp].v);
          sqlquery += '","' + phone[i-1];
          }
        else if(j==2){
          temp = "C" + (i+1);
          email.push(firstWSheet[temp].v);
          sqlquery += '","' + email[i-1];
          }
        else if(j==3){
          temp = "D" + (i+1);
          added_date.push(firstWSheet[temp].v);
          sqlquery += '",STR_TO_DATE("' + added_date[i-1] + '",' + "'%Y.%m.%d')),";
        }

      }
    }
    sqlquery = sqlquery.substring(0,sqlquery.length-1);
      connection.query(sqlquery, function (err, rows) {
        if (err) {
            console.log("upload contact failed");
            throw err;
        } else {
            console.log(rows);
            var filename = 'public/upload/contact.xlsx';
            fs.unlink(filename, function (err) {
                  if (err) throw err;
                  console.log('file deleted');
                })
              res.status(200).send('upload');
        }
      });
});

/*
contact_download : 연락처 파일 다운로드 모듈
input : 사용자의 연락처 다운로드 요청
output : 연락처 다운로드 성공 여부 및 csv, xlsx 파일
*/
router.post('/contact_download', function(req, res, next) {

  var filename = 'public/upload/contactdownload.xlsx';
  fs.exists(filename, function (exists) {
    if(exists == true)
    {
      fs.unlink(filename, function (err) {
            if (err) throw err;
        });
    }
  });
  // Create a new instance of a Workbook class
  var wb = new xl.Workbook();

  // Add Worksheets to the workbook
  var ws = wb.addWorksheet('Sheet 1');

  ws.cell(1, 1)
    .string('name');
  ws.cell(1, 2)
    .string('phone');
  ws.cell(1, 3)
    .string('email');
  ws.cell(1, 4)
    .string('added_date');

  var user_id = req.query.id;
  var sqlquery = "SELECT  * FROM contact WHERE user_id = ?";
      connection.query(sqlquery, [user_id], function (err, rows) {
        if (err) {
            console.log("download contact failed");
            throw err;
        } else {
          if(rows.length != 0)
          {
            for(var i=0;i<rows.length;i++)
            {
              ws.cell(i+2, 1).string(rows[i].name);
              ws.cell(i+2, 2).string(rows[i].phone);
              ws.cell(i+2, 3).string(rows[i].email);
              ws.cell(i+2, 4).string(rows[i].added_date);
            }
          }
          wb.write('public/upload/contactdownload.xlsx', (err, stats)=> {
              if (err){
                throw err;
              }
              else {
                res.sendFile(path.join(__dirname, '../public/upload/contactdownload.xlsx'));
              }
            });
        }

      });
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
router.post('/contact_delete', function(req, res, next) {
  // console.log("req.query",req.query);
  var user_id = req.query.id;
  var sqlquery = "DELETE FROM contact WHERE user_id = ?";
      connection.query(sqlquery, [user_id], function (err, rows) {
        if (err) {
            console.log("delete contact failed");
            throw err;
        } else {
            // console.log(rows);s
             res.status(200).send("delete");
        }

      });
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
