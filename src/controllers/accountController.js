const path = require("path");

//数据库使用: 导入数据库//导入封装好的tool 的 databasetool
const databasetool = require(path.join(__dirname, '../tools/databasetool'))

//导入获取验证码图片的第三方包
const captchapng = require('captchapng')


//导出一个方法, 该方法获取注册页面
module.exports.getRegisterPage = (req, res) => {
    // res.sendFile() 内部就是对 fs.readFile 的封装
    res.sendFile(path.join(__dirname, '../public/views/register.html'))
}

//导出一个方法, 完成注册
exports.register = (req, res) => {

    //1.设置默认返回数据
    const result = {
        status: 0,
        message: '成功'
    }
    //通过post请求方式获取参数 body-parser   
    const {
        username
    } = req.body

    //判断, 用户名存在: 提示用户, 用户名不存在: 插入一条, 注册成功  操作数据库, mongodb

    //利用封装的查找一条函数: 查找是否存在 
    databasetool.findYige('accountInfo', {
        username
    }, (err, result1) => {
        if (result1) {
            //查询到有数据
            result.status = 1,
                result.message = "用户名已存在"
            //返回数据
            res.json(result)
        } else {
            //不存在, 新增一条 result2有值: 新增成功, 返回null:失败
            databasetool.insertYige('accountInfo', req.body, (err, result2) => {
                if (!result2) {
                    //失败
                    result.status = 2,
                    result.message = "注册失败"
                }
                //返回数据
                res.json(result)
            })
        }
    })

    // Use connect method to connect to the server
    /*
    MongoClient.connect(url, function (err, client) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        // Get the documents collection 链接到要操作的集合
        const collection = db.collection('accountInfo');

        //查询. 判断是否已被注册  没有查到就会返回null
        collection.findOne({
            username
        }, (err, result1) => {
            if (result1) {
                //查询到有数据
                result.status = 1,
                    result.message = "用户名已存在"

                //关闭数据库
                client.close();
                //返回数据
                res.json(result)
            } else {
                //不存在, 新增一条 result2有值: 新增成功, 返回null:失败
                collection.insertOne(req.body, (err, result2) => {
                    if (!result2) {
                        //失败
                        result.status = 2,
                            result.message = "注册失败"
                    }
                    //关闭数据库
                    client.close();
                    //返回数据
                    res.json(result)
                })
            }

        })
    })
    */
}

//获取登录页面
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/login.html'))
}

//获取验证码图片
exports.getVcodeImage = (req, res) => {

    const vcode = parseInt(Math.random() * 9000 + 1000)
    //把vcode保存在session中去
    console.log(vcode);
    req.session.vcode = vcode
    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

// 导出登录的方法
exports.login = (req, res) => {
    //定义默认返回json数据
    const result = {
        status: 0,
        message: "登录成功"
    }

    // 把浏览器传递过来的验证码 和 req.session.vcode 中的验证码对比
    const {
        vcode,
        password,
        username
    } = req.body

    if (vcode != req.session.vcode) {
        //表示验证码正确, 链接数据库, 查询是否有这样的账号和密码的数据
        console.log('111111');
        result.status = 1,
            result.message = "验证码失败"
        res.json(result)
        return
    }

    //来到这里说明验证码正确, 判断账号密码是否正确
    //查询一个数据 , 没有数据返回null 
    //使用封装好的方法
    databasetool.findYige('accountInfo', {
        username,
        password
    }, (err, result1) => {
        if (!result1) {
            //没有查到: 登录失败
            result.status = 2
            result.message = '账号或者密码错误'
        }
        //返回数据
        res.json(result);
    })


    // Use connect method to connect to the server
    /*
     MongoClient.connect(url, function (err, client) {

        console.log("Connected successfully to server");

        const db = client.db(dbName);

        // Get the documents collection //链接到要操作的集合
        const collection = db.collection('accountInfo');

        //查询一个
        collection.findOne({
            username,
            password
        }, (err, result1) => {
            console.log(result1);

            if (!result1) {
                //没有查到: 登录失败
                result.status = 2
                result.message = '账号或者密码错误'
            }
            //关闭数据库
            client.close();
            //返回数据
            res.json(result);
        })

    })
    */

}