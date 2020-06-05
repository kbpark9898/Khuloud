var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
    var user_id = req.query.id;
    
    var sql = 'SELECT * FROM files WHERE updated>date_sub(now(), interval 3 day) AND user_id=(?) ORDER BY updated DESC';
    connection.query(sql, user_id, function(err, result){
        if (err){
            console.log('select error');
            res.send({error: 'quick error'})
        }else{
            res.send(result);
        }
    })
})


module.exports = router;