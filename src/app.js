//导包
const express = require('express')
const path = require('path')

//创建app
const app = express()

//处理请求  测试
// app.get('/',(err,res)=>{
//     res.send('hello world!')
// })


//设置静态资源路径, 所有的第三方包, 最好都写在路由对象导入之前
app.use(express.static(path.join(__dirname,'public')))


//导入路由对象
const accountRouter = require(path.join(__dirname,'./routers/accountRouter.js'))
app.use('/account',accountRouter)


//启动
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err);
    }
    console.log('start ok');
})


