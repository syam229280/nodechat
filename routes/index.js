var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var error_message ='';
  if(req.query.err == 1){
    error_message = 'Invalid username or password';
  }
  res.render('login',{'err':error_message});
});

module.exports = router;