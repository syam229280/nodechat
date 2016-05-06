var express = require('express');
var router = express.Router();

//Check if user exists
router.post('/login', function(req, res, next) {
  //res.send('respond with a resource');
  req.getConnection(function (err, connection){
    var user = req.body;
    connection.query("select * from users where email='"+user.username+"' and password='"+user.password+"'",function(err,rows){
      if(err)
      {
        console.log(err);
        res.render('login',{'err':'Sorry an error occurred'});
      }
      else 
      {
       if(rows.length > 0)
       {
         req.session.user = rows.name;
         res.redirect('/users/dashboard'); 
       }
       else
       {
         res.redirect('/?err=1'); 
       }
      }
    });
  
  });
  
  
  
});

//Display dashboard if user is autheticated
router.get('/dashboard',function(req,res,next) {
    
    res.render('dashboard',{'name':req.session.user});
});
   
module.exports = router;
