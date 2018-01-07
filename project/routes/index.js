const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const credentials = require('../lib/credentials.js');
const token = require('../lib/token.js');
const web3 = require('../lib/web3.js')

var connection = mysql.createConnection({
  host     : credentials.sql.host,
  user     : credentials.sql.user,
  password : credentials.sql.password,
  database : credentials.sql.database
});
var owner;
var project_owner;
web3.eth.getAccounts().then(function(result){
  owner = result[0];
  project_owner = result[1];
})

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.name)
  res.render('index',{pass : true, name : req.session.name});
});
//登入頁面
router.get('/login', function(req, res, next) {
  if(req.session.name){
    res.redirect('/');
  }
  res.render('login',{name : req.session.name , data: ""});
});
//註冊頁面
router.get('/signup', function(req, res, next) {
  if(req.session.name){
    res.redirect('/');
  }
  res.render('signup',{name : req.session.name});
});
//登出
router.get('/signout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/')
});
//捐款頁面
router.get('/fund_donating', function(req, res, next) {
  res.render('fund_donating',{name : req.session.name});
});
//發起計畫頁面
router.get('/fund_raising', function(req, res, next) {
  res.render('fund_raising',{name : req.session.name});
});
//計畫頁面
router.get('/project_information1', function(req, res, next) {
  res.render('project_information1',{name : req.session.name});
});
router.get('/project_information2', function(req, res, next) {
  res.render('project_information2',{name : req.session.name});
});
router.get('/project_information3', function(req, res, next) {
  res.render('project_information3',{name : req.session.name});
});
//追蹤頁面
router.get('/tracking', function(req, res, next) {
  res.render('tracking',{name : req.session.name});
});
//登入
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
//註冊
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
router.post('/create',function(req,res,next){
  token.issueToken(owner);
  token.createProject(project_owner, 測試計畫, 100000);
})


module.exports = router;
