var express = require('express');

var router = express.Router();

var dao = require("../controllers/dao");
// var bodyParser = require('body-parser');
// var app = express();
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('home', { page: 'home' });
});
/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { page: 'about' });
});
/* GET contact us page. */
router.get('/contactus', function(req, res, next) {
  dao.getAllUsers().then(function(data){
      res.render('contact', { page: 'contact',users:data });
  });


});


router.post('/contactus', function(req, res, next) {
  console.log("Request Recieved!");
  // console.log(`Name: ${req.body.name}
  //   Age: ${req.body.age}
  //   Role: ${req.body.role}`);
  // console.log(req.body);
  var users = [];
  users.push({"name":req.body.name,"age":req.body.age,"role":req.body.role})
  var result = dao.addUsers(users);
    res.setHeader('Content-Type', 'application/json');
 dao.getAllUsers().then(function(data) {
  if(parseInt(req.body.age)>25){

     res.send(JSON.stringify({ "message": "You are too old for this shit!", "status": 201, "users":  data}));
      //  res.render('contact', {  page: 'contact',users: users });
  }else{

     res.send(JSON.stringify({ "message": "Cool, you have been added to our database", "status": 200,"users":  data }));
      //  res.render('contact', { page: 'contact', users: users });
  }
  });


  // res.render('contact', { title: 'Contact us' });
});

router.delete('/contactus',function(req, res, next) {
  console.log("Delete Request Recieved!");
  console.log(req.body);
  res.setHeader('Content-Type', 'application/json');
  dao.deleteUser(req.body.id).then(function(data) {
      res.send(JSON.stringify({ "message": "Deleted Successfully!", "status": 200}));
  });
});
module.exports = router;
