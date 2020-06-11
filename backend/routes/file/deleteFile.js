var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/../modules/awsconfig.json");
var S3 = require('../modules/s3/s3_new');


// /file/delete/:name
router.get('/:name', function (req, res) {
    var file_name = req.params.name;
    var user_id = req.query.id;
    var curPath = req.query.cur;

    var targetPath = 'trashcan';
    var sourceFile = curPath.substring(1) + file_name;

    var sql1 = 'UPDATE files SET location = ?, recent_access=NULL WHERE location = ? AND file_name = ? AND user_id = ?;';
    connection.query(sql1, ['/trashcan/', curPath, file_name, user_id], function (err) {
        if (err) {
            console.log('update db error');
            res.send({ erorr: 'db update error' });
        } else {
            S3.moveFile4(S3.BUCKET_NAME, user_id, sourceFile, targetPath, function (result) {
                if (result) {
                    res.send("move to trashcan success");
                } else {
                    res.send({ err: "no such file" })
                }
            })
        }
    })
});


// /file/delete/:name
// router.get('/:name', function (req, res) {
//     console.log(req.query);
//     console.log(req.params);
//     var file_name = req.params.name;
//     var user_id = req.query.id;
//     var curPath = req.query.cur;

//     var targetPath = 'trashcan';
//     var sourceFile = curPath.substring(1) + file_name;

//     var sql1 = 'UPDATE files SET location = ? WHERE location = ? AND file_name = ? AND user_id = ?;';
//     connection.query(sql1, ['/trashcan/', curPath, file_name, user_id], function (err) {
//         if (err) {
//             console.log('update db error');
//             res.send({ erorr: 'db update error' });
//         } else {
//             S3.moveFile2(S3.BUCKET_NAME, user_id, sourceFile, file_name, targetPath, function (result) {
//                 if (result) {
//                     res.send("move to trashcan success");
//                 }
//             })
//         }
//     })
// });

// // /file/delete/:name
// router.get('/:name', function (req, res) {
//     var file_name = req.params.name;
//     var user_id = req.query.id;
//     var curPath = req.query.cur;

//     var targetPath = 'trashcan';
//     var sourceFile = curPath.substring(1) + file_name;

//     var sql1 = 'DELETE FROM files WHERE file_name = (?) AND location=(?) AND user_Id = (?)';
//     var sql2 = 'INSERT INTO trashcan (trash_name, location, user_Id) VALUES (?, ?, ?)';

//     connection.query(sql1, [file_name, curPath, user_id], function (err) {
//         if (err) {
//             console.log('delete db error');
//             res.send({erorr: 'db delete error'});
//         }
//         else {
//             connection.query(sql2, [file_name, '/trashcan'+curPath, user_id], function (err) {
//                 if (err) {
//                     console.log('insert in trashcan db error');
//                     res.send({error: 'db insert error'});
//                 }
//                 else {
//                     // /drive/user_id/sourceFile --> /drive/user_id/trashcan/sourceFile
//                     S3.moveFile2(S3.BUCKET_NAME, user_id, sourceFile, targetPath, function (result) {
//                         if (result) {
//                             res.send("move to trashcan success");
//                         }
//                     })
//                 }
//             })
//         }
//     })
// });


module.exports = router;