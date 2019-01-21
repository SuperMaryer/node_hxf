//使用mongodb的系列代价
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'szhmqd27';

//封装数据库增删改查函数

/**
 * 暴露一个方法, 插入一条数据
 * @param {*} collectionName  要查询的集合
 * @param {*} method          增删改查 方式的选择: find另外写: insertOne  insert  findOne  updateOne update  deleteOne delete
 * @param {*} data            查询条件的数据
 * @param {*} callback        回调函数, 返回req,res
 */
function collection_zsgc(collectionName, method, data, callback) {

    // Use connect method to connect to the server
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {

        //拿到要操作的数据库
        const db = client.db(dbName);

        //拿到要操作的集合
        // Get the documents collection
        const collection = db.collection(collectionName);

        //查找一条
        collection.method(data, (err, result1) => {
            //关闭数据库
            client.close();
            //执行回调函数, 返回查找的res, req  用于返回数据后的操作使用
            callback(err, result1)
        })
    })

}

//封装数据库查找多条的函数
/**
 * 暴露一个方法, 插入一条数据
 * @param {*} collectionName  要查询的集合
 * @param {*} data            查询条件的数据
 * @param {*} callback        回调函数, 返回req,res
 */
function findMany(collectionName, data, callback) {

    // Use connect method to connect to the server
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {

        //拿到要操作的数据库
        const db = client.db(dbName);

        //拿到要操作的集合
        // Get the documents collection
        const collection = db.collection(collectionName);

        //查找一条
        collection.find(data).toArray((err, result3) => {
            //关闭数据库
            client.close();
            //执行回调函数, 返回查找的res, req  用于返回数据后的操作使用
            callback(err, result3)
        })
    })

}


//封装数据库新增一条的函数
/**
 * 暴露一个方法, 插入一条数据
 * @param {*} collectionName  要查询的集合
 * @param {*} data            查询条件的数据
 * @param {*} callback        回调函数, 返回req,res
 */
function insertYige(collectionName, data, callback) {

    // Use connect method to connect to the server
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {

        //拿到要操作的数据库
        const db = client.db(dbName);

        //拿到要操作的集合
        // Get the documents collection
        const collection = db.collection(collectionName);

        //查找一条
        collection.insertOne(data, (err, result2) => {
            //关闭数据库
            client.close();
            //执行回调函数, 返回查找的res, req  用于返回数据后的操作使用
            callback(err, result2)
        })
    })

}




//导出方法
module.exports = {
    findYige,
    findMany,
    insertYige
}