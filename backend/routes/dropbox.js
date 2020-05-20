var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("login");
  // res.render('userlogin/main/dropbox');
});

router.get('/:user_id', function(req, res, next) {
  console.log(req.params.user_id);
  console.log("loginuser");
  // res.render('userlogin/main/dropbox',{user_id : req.params.user_id});
});

module.exports = router;
