var express = require('express');
var router = express.Router();


var files = require('./files');
var uploadFile = require('./uploadFile');
var downloadFile = require('./downloadFile');
var deleteFile = require('./deleteFile');


router.use('/', files);
router.use('/upload', uploadFile);
router.use('/download', downloadFile);
router.use('/delete', deleteFile);


module.exports = router;