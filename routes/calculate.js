var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   var sum = parseInt(req.query.num1) + parseInt(req.query.num2);
  // can only send string, object or array as response
   res.send(sum.toString());
});

module.exports = router;    