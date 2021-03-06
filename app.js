
var express=require('express');
var app=new express();  /*实例化*/
var path=require('path')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//保存用户信息
// var ejs = require('ejs')
var session = require("express-session");
//配置中间件  固定格式
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge:1000*60*30
    },
    rolling:true
}))



//引入模块
var admin =require('./routes/admin.js');
var users = require('./routes/users');
var goods = require('./routes/goods')

var index =require('./routes/index.js')



//使用ejs模板引擎   默认找views这个目录
app.set('view engine','ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.engine('.html',ejs.__express);
// app.set('view engine', 'html');

//配置public目录为我们的静态资源目录
app.use(express.static('public'));

app.use('/uplod',express.static('uplod'));

app.use('/',index);

app.use('/admin',admin);
app.use('/users', users);
app.use('/goods', goods);
app.listen(3005,'127.0.0.1');

