var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var credentials = require('../lib/credentials.js');

var connection = mysql.createConnection({
  host     : credentials.sql.host,
  user     : credentials.sql.user,
  password : credentials.sql.password,
  database : credentials.sql.database
});
/* SQL Example */
/*connection.query('SELECT * FROM user where id = ?',['autumn'], function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
connection.query('INSERT INTO user SET ?',{
  id : 'test',
  password : 'test123',
  name : '測試',
  account: '024920f65e4cfd4819564ed3529738216ec0b7ee'
}, function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});*/


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.name)
  res.render('index',{pass : true, name : req.session.name});
});

router.get('/login', function(req, res, next) {
  if(req.session.name){
    res.redirect('/');
  }
  res.render('login',{name : req.session.name , data: ""});
});

router.get('/signup', function(req, res, next) {
  if(req.session.name){
    res.redirect('/');
  }
  res.render('signup',{name : req.session.name});
});

router.get('/signout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/')
});

router.get('/fund_donating', function(req, res, next) {
  res.render('fund_donating',{name : req.session.name});
});

router.get('/fund_raising', function(req, res, next) {
  res.render('fund_raising',{name : req.session.name});
});

router.post('/login', function(req, res ,next){
  console.log(req.body);
  connection.query('SELECT * FROM user where id = ?',[req.body.uid], function (error, results, fields) {
    if(!results[0]){
      res.render('login',{data : "查無此帳號"})
    }
    else{
      console.log(results);
      if(results[0].password == req.body.psw){
        req.session.name = results[0].name;
        console.log(req.session.name)
        res.redirect('/')
      }
      else{
        res.render('login',{data : "密碼錯誤"})
      }
    }
  });
})
//新增帳戶資料
router.post('/signup',function(req, res, next){
  console.log(req.body)
  connection.query('INSERT INTO user SET ?',{
    id : req.body.uid,
    password : req.body.psw,
    name : req.body.name,
    account : req.body.Ethereum
  }, function (error, results, fields) {
    req.session.name = req.body.name;
    if (error) res.redirect('signup');
    res.redirect('/')
  });
})


module.exports = router;
