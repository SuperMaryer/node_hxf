const path = require("path");
const template = require('art-template')
const databasetool = require(path.join(__dirname, '../tools/databasetool'))



//返回list页面列表
const getStudentListPage = (req, res) => {

    //拿到搜索的关键字
    const keyword = req.query.keyword || '';

    databasetool.findMany('studentInfo', {name:{$regex:keyword}}, (err, result3) => {
        const html = template(path.join(__dirname, '../public/views/list.html'), {
            students: result3,
            keyword
        });
        res.send(html)
    })
}



//导出
module.exports = {
    getStudentListPage
};