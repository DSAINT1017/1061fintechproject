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
//假資料
web3.eth.getAccounts().then(function (result) {
  owner = result[0];
  project_owner = result[1];
  other1 = result[2];
  other2 = result[3];
  other3 = result[4];
}).then(function () {
  token.issueToken(owner).then(function () {
    token.createProject(project_owner, '巡診車募資計劃', 3000000).then(function () {
      token.contribute(other1, 50000);
      token.contribute(other2, 100000);
      token.contribute(other1, 10000);
      token.contribute(other3, 10000);
      token.contribute(other2, 200000);
      token.contribute(other1, 10000);
      token.contribute(other3, 50000);
      token.contribute(other2, 100000);
      token.contribute(other1, 10000);
      token.contribute(other1, 50000);
      token.contribute(other3, 100000);
      token.contribute(other2, 10000);
      token.contribute(other1, 100000);
      token.contribute(other2, 50000);
      token.contribute(other3, 100000);
      token.contribute(other1, 50000);
      token.contribute(other1, 50000);
      token.contribute(other2, 100000);
      token.contribute(other1, 10000);
      token.contribute(other3, 10000);
      token.contribute(other2, 200000);
      token.contribute(other1, 10000);
      token.contribute(other3, 50000);
      token.contribute(other2, 100000);
      token.contribute(other1, 10000);
      token.contribute(other1, 50000);
      token.contribute(other3, 100000);
      token.contribute(other2, 10000);
      token.contribute(other1, 100000);
      token.contribute(other2, 50000);
      token.contribute(other3, 100000);
      token.contribute(other1, 50000);
      token.contribute(other1, 50000);
      token.contribute(other2, 100000);
      token.contribute(other1, 10000);
      token.contribute(other3, 10000);
      token.contribute(other2, 200000);
      token.contribute(other1, 10000);
      token.contribute(other3, 50000);
      token.contribute(other2, 100000);
      token.contribute(other1, 10000);
      token.contribute(other1, 50000);
      token.contribute(other3, 100000);
      token.contribute(other2, 10000);
      token.contribute(other1, 100000);
      token.contribute(other2, 50000);
      token.contribute(other3, 100000);
      token.contribute(other1, 50000);
    }).then(function () {
      token.expense(2000000, '購車');
      token.expense(1000000, '交通輔助');
    })
  });
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
//追蹤頁面
router.get('/watch', function(req, res, next) {
  res.render('watch',{name : req.session.name});
});
//追蹤頁面
router.get('/tracking_project01', function(req, res, next) {
  res.render('tracking_project01',{name : req.session.name});
});
//追蹤頁面
router.get('/tracking_project02', function(req, res, next) {
  res.render('tracking_project02',{name : req.session.name});
});
//追蹤頁面
router.get('/tracking_project03', function(req, res, next) {
  res.render('tracking_project03',{name : req.session.name});
});
//階段性放款
router.get('/step', function(req, res, next) {
  res.render('step',{name : req.session.name});
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
/*router.post('/create',function(req,res,next){
  token.issueToken(owner).then(function(){
    token.createProject(project_owner, '測試計畫', 100000);
  });
  res.send('success');
})*/
/*router.post('/donate',async function(req,res,next){
  await token.contribute(other,5000);
  res.send('success');
})*/
/*router.post('/expense',async function(req,res,next){
  await token.expense(1000,'支出');
  res.send('success');
})*/
router.post('/update',async function(req,res,next){
  var t = []
  var c = [];
  var e = [];
  await token.watchEventsContribute().then(function(events){
    var cc = [];
    events.forEach(element=>{
      cc.push(element.transactionHash);//hash
      cc.push(element.returnValues['0']);//name
      cc.push(element.returnValues['1']);//from
      cc.push(element.returnValues['2']);//amount
      c.push(cc);
      cc = [];
    });
  });
  await token.watchEventsExpense().then(function(events){
    var ee = [];
    events.forEach(element=>{
      ee.push(element.transactionHash);//hash
      ee.push(element.returnValues['0']);//name
      ee.push(element.returnValues['1']);//from
      ee.push(element.returnValues['3']);//title
      ee.push(element.returnValues['4']);//amount
      ee.push(element.returnValues['2']);//to
      e.push(ee);
      ee = [];
    });
  });
  t.push(c);
  t.push(e);
  res.send(t);
})
//查看交易receipt
router.get('/watch/:hash',async function(req,res,next){
  web3.eth.getTransactionReceipt(req.params.hash).then(function(receipt){
    res.json(receipt);
    //res.render('detail',{detail : receipt})
  })
})


module.exports = router;
