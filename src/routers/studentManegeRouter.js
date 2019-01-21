/**
 * 注册和登录的处理
 */

const express = require('express')
const path = require('path')

//创建路由对象
const studentManegeRouter = express.Router()

//导入控制器模块
const studentManegeController = require(path.join(__dirname, '../controllers/studentManegeController'))

//获取注册页面的请求
studentManegeRouter.get('/list', studentManegeController.getStudentListPage)

//导出路由对象 
module.exports = studentManegeRouter