//1. 导包
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
var session = require('express-session')

//2.创建app
const app = express()


//body-parser的两句话
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())

// Use the session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}))

//测试
// app.get('/',(err,res)=>{
//     res.send('hello world')
// })


//设置静态资源根目录
app.use(express.static(path.join(__dirname, 'public')))


//导入登录注册路由对象
const accountRouter = require(path.join(__dirname, './routers/accountRouter.js'))
app.use('/account', accountRouter)

//导入学生管理路由对象
const studentManegeRouter = require(path.join(__dirname, './routers/studentManegeRouter.js'))
app.use('/studentmanege', studentManegeRouter)




//启动
app.listen(3000, '127.0.0.1', err => {
    if (err) {
        console.log(err);
    }
    console.log('start ok!');
})