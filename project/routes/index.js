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
  res.render('index.html');
});

router.route('/user')
//取得帳戶資料
.get(function(req, res){
  connection.query('SELECT * FROM user where id = ?',[req.query.id], function (error, results, fields) {
    if (error) return 'error';
    return results;
  });
})
//新增帳戶資料
.post(function(req, res){
  connection.query('INSERT INTO user SET ?',{
    id : req.body.id,
    password : req.body.password,
    name : req.body.name,
    account: req.body.account
  }, function (error, results, fields) {
    if (error) return 'error';
    return results;
  });
})


module.exports = router;
