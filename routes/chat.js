var express = require('express');
var router = express.Router();

//Check if user exists
router.get('/', function(req, res, next) {
    res.render('chat');
});
  
module.exports = router;
