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

var BUCKET_NAME = 'dkhuloud';

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

    deleteFile: function (bucketName, userId, targetFile, callback) {
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

        s3.getObject(downloadParams, function (err, data) {
            if (err) {
                console.log("Download File Error", err);
                callback(false);
            } else {
                if (data) {
                    console.log("Get File Success");
                    callback(1, data.Body);
                }
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

    makeVersion: function(bucketName, userId, sourceFile, lvNum, callback){
        var sourceFile;
        var splited = sourceFile.split('(').join(',').split(')').join(',').split(',');
        if (splited.length != 3){
            sourceFile = sourceFile.split('.')[0] + '(' + lvNum.toString() + ')' + sourceFile.split('.')[1];
        }else{
            sourceFile = sourceFile.split('(')[0] + '(' + lvNum.toString() + ')' + sourceFile.split(')')[1];
        }
        console.log('makeVersion ', sourceFile);
        callback(true, sourceFile);
    },

    // sourceFile에 임의의 경로가 포함된 경우
    moveFile2: function (bucketName, userId, sourceFile, targetPath, callback) {
        var paths = sourceFile.split('/');
        var filename = paths[paths.length - 1];
        console.log('paths = ' + paths);
        console.log('filename = ' + filename);
        var targetFile = targetPath + filename;

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

    uploadFile: function (bucketName, userId, sourceFile, targetPath, body, callback) {
        var pathbody = fs.createReadStream(body);

        if (targetPath != '') {
            targetPath = targetPath + '/';
        }
        var targetFile = targetPath + sourceFile;

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

module.exports = S3;