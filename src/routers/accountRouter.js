/**
 * 注册和登录的处理
 */

 const express = require('express')
 const path = require('path')

 //创建路由对象
 const accountRouter = express.Router()

 //导入控制器模块 自定义模块, 路径要写全  
    const accountController = require(path.join(__dirname,'../controllers/accountController'))

 //导入控制器模块 自定义模块, 路径要写全  
    accountRouter.get('/register',accountController.getRegisterPage)

//导出
    module.exports = accountRouter