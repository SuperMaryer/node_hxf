
/**
 * module.exports = {
 *  getRegisterPage:箭头函数
 * }
 * 导出的一个方法，该方法获取注册页面
 */
//导包
 const path = require('path')

 //处理请求
exports.getRegisterPage = (req,res)=>{
    // res.send('我是注册页')
    //res.sendFile() 是对fs.readFile 和res.send()的封装
    res.sendFile(path.join(__dirname,'../public/views/register.html'))
}