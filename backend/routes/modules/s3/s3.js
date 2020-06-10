// 사용자 폴더: /drive/userId/
// 휴지통 폴더: /drive/userId/trashcan

// /drive/userId/folder1/file.txt를 /drive/userId/trashcan/folder1/file.txt로 옮길 때
// (휴지통의 경우 폴더까지 휴지통으로 그대로 복사)
// sourceFile: folder1/file.txt
// targetPath: trashcan
// targetFile: trashcan/folder1/file.txt

// /drive/userId/folder1/file.txt를 /drive/userId/folder2/file.txt로 옮길 때
// sourceFile: folder1/file.txt
// targetPath: folder2
// targetFile: folder2/file.txt


var AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-northeast-2' });

var BUCKET_NAME = 'khuloud';

var s3 = new AWS.S3();
var fs = require('fs');
var path = require('path');


var S3 = {
    BUCKET_NAME: BUCKET_NAME,

    copyFile: function (bucketName, userId, sourceFile, targetPath, callback) {
        if (targetPath != '') {
            targetPath = targetPath + '/';
        }

        var copyParams = {
            Bucket: bucketName,
            CopySource: bucketName + '/drive/' + userId + '/' + sourceFile,
            Key: 'drive/' + userId + '/' + targetPath + sourceFile       // drive/userId/trashcan/file.txt
        }

        s3.copyObject(copyParams, function (err, data) {
            if (err) {
                console.log("Copy Error", err);
                callback(false);
            } else {
                if (data) {
                    console.log("Copy Success");
                    callback(true);
                }
            }
        })
    },

    copyFile2: function (bucketName, userId, sourceFile, targetFile, callback) {
        // sourceFile => folder1/folder2/test.txt
        // targetFile => trashcan/folder1/folder2/test.txt
        var copyParams = {
            Bucket: bucketName,
            CopySource: bucketName + '/drive/' + userId + '/' + sourceFile,
            Key: 'drive/' + userId + '/' + targetFile
        }

        s3.copyObject(copyParams, function (err, data) {
            if (err) {
                console.log("Copy Error", err);
                callback(false);
            } else {
                if (data) {
                    console.log("Copy Success");
                    callback(true);
                }
            }
        })
    },

    // 파일 덮어쓰기
    coverFile: function(bucketName, userId, sourceFile, targetPath, body, callback) {
        var pathbody = fs.createReadStream(body);

        if (targetPath != '' && targetPath[targetPath.length - 1] != '/') {
            targetPath = targetPath + '/';
        }
        var targetFile = targetPath + sourceFile;

        var coverParams = {
            Bucket: bucketName,
            Key: 'drive/' + userId + '/' + targetFile,
            Body: pathbody
        };

        s3.upload(coverParams, function (err, data) {
            if (err) {
                console.log("Cover Error" + err);
                callback(false);
            } else {
                console.log("Cover Success");
                callback(true);
            }
        })
    },

    deleteFile: function (bucketName, userId, targetFile, callback) {
        // targetFile => folder1/folder2/test.txt
        var deleteParams = {
            Bucket: bucketName,
            Key: 'drive/' + userId + '/' + targetFile
        };

        s3.deleteObject(deleteParams, function (err, data) {
            if (err) {
                console.log("Delete Error", err);
                callback(false);
            } else {
                if (data) {
                    console.log("DeleteSuccess");
                    callback(true);
                }
            }
        })
    },

    downloadFile: function (bucketName, userId, targetFile, callback) {
        var downloadParams = {
            Bucket: bucketName,
            Key: 'drive/' + userId + '/' + targetFile
        };
        console.log('drive/' + userId + '/' + targetFile);
        s3.getObject(downloadParams, function (err, data) {
            if (err) {
                console.log("Download File Error", err);
                callback(false);
            } else {
                console.log("Get File Success");
                callback(true, data.Body.toString());
            }
        })
    },

    // /routes/modules/s3/download에 저장
    downloadFile2: function(bucketName, userId, targetFile, callback){
        tempDownloadDir = __dirname + '/download/' + userId + '/' + targetFile;
        S3.downloadFile(bucketName, userId, targetFile, function(result, data){
            if (result) {
                makeFolder(tempDownloadDir, function(result){
                    if (result) {
                        fs.writeFileSync(tempDownloadDir, data);
                        callback(true, tempDownloadDir);
                    }
                })
            }else{
                console.log('Download File Error');
                callback(false);
            }
        })
    },

    // 최종
    downloadFile3: function(bucketName, userId, targetFile, callback){
        // targetFile 예1 => test.txt
        // targetFile 예2 => folder1/folder2/test.txt
        var tempDownloadDir = __dirname + '/download/' + userId + '/' + targetFile;
        makeFolder(tempDownloadDir, function(result){
            if (result){
                var file = fs.createWriteStream(tempDownloadDir);
                var params = {
                    Bucket: bucketName,
                    Key: 'drive/' + userId + '/' + targetFile
                };
                try {
                    var stream = s3.getObject(params).createReadStream().pipe(file);
                    stream.on('end', function(){
                        console.log('end!');
                        callback(true, tempDownloadDir);
                    });
                }catch(err){
                    console.log('no such file', err);
                    callback(false);
                }
            }else{
                callback(false);
            }
        })
    },

    getFileList: function (bucketName, userId, targetPath, callback) {
        var prefix;

        if (targetPath == '') {
            prefix = 'drive/' + userId + '/';
        } else {
            prefix = 'drive/' + userId + '/' + targetPath + '/';
        }

        var bucketParams = {
            Bucket: bucketName,
            Prefix: prefix
        };

        s3.listObjects(bucketParams, function (err, data) {
            if (err) {
                console.log("getList Error", err);
                callback(false, data);
            } else {
                if (data) {
                    console.log("getList Success");
                    console.log("data : ", data);
                    callback(true, data);
                }
            }
        })
    },

    isFileOverlapped: function (bucketName, userId, targetFile, callback) {
        var paths = targetFile.split('/');
        var index = targetFile.length - (paths[paths.length - 1].length + 1);
        var targetPath = targetFile.substring(0, index);

        S3.getFileList(bucketName, userId, targetPath, function (res, data) {
            var answer = false;
            var lvNum;

            if (!res) {
                console.log("Overlap Check Error on Get List");
                callback(false, answer, lvNum);
            } else {
                if (data) {
                    for (var i = 0; i < data.Contents.length; i++) {
                        var fullpath = data.Contents[i].Key;
                        var paths = fullpath.split('/');
                        var index = paths[0].length + paths[1].length + 2;
                        if (fullpath.substring(index) == targetFile) {
                            answer = true;
                            var splited = targetFile.split('(').join(',').split(')').join(',').split(',');
                            if (splited.length != 3){
                                lvNum = 0;
                            }else{
                                lvNum = parseInt(splited[1]);
                                console.log('isNum', lvNum);
                            }
                            break;
                        }
                    }
                    console.log("Overlap Check Success");
                    callback(true, answer, lvNum);
                }
            }
        })
    },

    // 중복된 파일 버전 만들기(test.txt -> text(1).txt)
    makeVersion: function (bucketName, userId, sourceFile, lvNum, callback) {
        var sourceFile;
        var splited = sourceFile.split('(').join(',').split(')').join(',').split(',');
        if (splited.length != 3) {
            sourceFile = sourceFile.split('.')[0] + '(' + lvNum.toString() + ').' + sourceFile.split('.')[1];
        } else {
            sourceFile = sourceFile.split('(')[0] + '(' + lvNum.toString() + ')' + sourceFile.split(')')[1];
        }
        console.log('makeVersion ', sourceFile);

        callback(true, sourceFile);
    },

    // sourceFile이 단순히 filename과 같은 경우
    moveFile: function (bucketName, userId, sourceFile, targetPath, callback) {
        S3.copyFile(bucketName, userId, sourceFile, targetPath, function (res) {
            if (!res) {
                console.log("Move Error on Copying File");
                callback(false);
            } else {
                S3.deleteFile(bucketName, userId, sourceFile, function (res) {
                    if (!res) {
                        console.log("Move Error on Deleting File");
                        callback(false);
                    } else {
                        console.log("Move Success");
                        callback(true);
                    }
                })
            }
        })
    },

    // sourceFile에 임의의 경로가 포함된 경우
    moveFile2: function (bucketName, userId, sourceFile, targetPath, callback) {
        // sourceFile => folder1/folder2/test.txt
        var targetFile = targetPath + '/' + sourceFile;

        S3.copyFile2(bucketName, userId, sourceFile, targetFile, function (res) {
            if (!res) {
                console.log("Move Error on Copying File2");
                callback(false);
            } else {
                S3.deleteFile(bucketName, userId, sourceFile, function (res) {
                    if (!res) {
                        console.log("Move Error on Deleting File");
                        callback(false);
                    } else {
                        console.log("Move Success");
                        callback(true);
                    }
                })
            }
        })
    },

    // 파일 이름이 달라지는 경우
    moveFile3: function (bucketName, userId, oldFile, newFile, targetPath, callback) {
        if (targetPath != ''){
            targetPath = targetPath + '/';
        }
        sourceFile = targetPath + oldFile;      // test.txt or folder1/test.txt
        var targetFile = targetPath + newFile;

        S3.copyFile2(bucketName, userId, sourceFile, targetFile, function(result){
            if (!result){
                console.log("Move Error on Copying File3");
                callback(false);
            }else{
                S3.deleteFile(bucketName, userId, sourceFile, function (res) {
                    if (!res) {
                        console.log("Move Error on Deleting File");
                        callback(false);
                    } else {
                        console.log("Move Success");
                        callback(true);
                    }
                })
            }
        })
    },

    renameFile: function(bucketName, userId, sourceFile, modiFile, targetPath, callback){
        // sourceFile = test.txt
        // modiFile = test2.txt
        // targetPath = '' or 'folder1/folder2'

        if (sourceFile == modiFile){    // 이름 변경되지 않은 경우
            callback(true, sourceFile);
        }else{
            if (targetPath != '') {
                targetPath = targetpath + '/';
            }
            var targetFile = targetPath + modiFile;

            S3.isFileOverlapped(bucketName, userId, targetFile, function (res, ans, lvNum) {
                if (!res) {
                    console.log("Overlap Check failed");
                    callback(false, sourceFile);
                } else {
                    if (ans) {
                        console.log("File Duplication");
                        S3.makeVersion(bucketName, userId, targetFile, lvNum + 1, function (res, versionedSourceFile) {
                            if (!res) {
                                console.log("Make version failed");
                                callback(false, sourceFile);
                            } else {
                                S3.renameFile(bucketName, userId, sourceFile, versionedSourceFile, targetPath, callback);
                            }
                        })
                    } else {
                        S3.moveFile3(bucketName, userId, sourceFile, modiFile, targetPath, function (result) {
                            if (result) {
                                callback(true, modiFile);
                            } else {
                                console.log('File Rename failed');
                                callback(false);
                            }
                        })
                    }
                }
            });
        }
    },

    uploadFile: function (bucketName, userId, sourceFile, targetPath, body, callback) {
        var pathbody = fs.createReadStream(body);

        if (targetPath!='' && targetPath[targetPath.length-1]!='/') {
            targetPath = targetPath + '/';
        }
        var targetFile = targetPath + sourceFile;
        console.log('targetFile', targetFile);

        var uploadParams = {
            Bucket: bucketName,
            Key: 'drive/' + userId + '/' + targetFile,
            Body: pathbody
        };
        S3.isFileOverlapped(bucketName, userId, targetFile, function (res, ans, lvNum) {
            if (!res) {
                console.log("Overlap Check failed");
                callback(false, sourceFile);
            } else {
                if (ans) {
                    console.log("File Duplication");
                    S3.makeVersion(bucketName, userId, sourceFile, lvNum+1, function(res, versionedSourceFile){
                        if (!res){
                            console.log("Make version failed");
                            callback(false, sourceFile);
                        }else{
                            S3.uploadFile(bucketName, userId, versionedSourceFile, targetPath, body, callback);
                        }
                    })
                } else {
                    s3.upload(uploadParams, function (err, data) {
                        if (err) {
                            console.log("Upload Error" + err);
                            callback(false, sourceFile);
                        } else {
                            console.log("Upload Success");
                            callback(true, sourceFile);
                        }
                    })
                }
            }
        })

    },

    uploadFiles: function (iter, errFiles, bucketName, userId, sourceFiles, targetPath, bodies, callback) {
        if (iter < sourceFiles.length) {
            S3.uploadFile(bucketName, userId, sourceFiles[iter], targetPath, bodies[iter], function (res, resSourceFile) {
                if (!res) {
                    errFiles.push(sourceFiles[iter]);
                }
                if (sourceFiles[iter] != resSourceFile){    // 파일 중복으로 다른 버전이 생긴 경우
                    sourceFiles[iter] = resSourceFile;
                }
                S3.uploadFiles(iter + 1, errFiles, bucketName, userId, sourceFiles, targetPath, bodies, callback);
            })
        } else {
            if (errFiles.length != 0) {
                console.log("Upload Files Error on Uploading Some Files");
                callback(false, errFiles);
            } else {
                console.log("Upload Files Success");
                callback(true, errFiles);
            }
        }
    },
}

var makeFolder = function(dir, callback){
    var paths = dir.substring(__dirname.length+1);     // download/userId/folder1/folder2/test.txt
    paths = paths.split('/');

    var folders = __dirname;
    for(var i=0; i<paths.length-1; i++){
        folders += '/'+paths[i];
        if(!fs.existsSync(folders)){
            fs.mkdirSync(folders)
        }
    }

    if (fs.existsSync(folders)){
        callback(true);
    }else{
        callback(false);
    }
}

module.exports = S3;
