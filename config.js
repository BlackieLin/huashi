var root_path = "./";
var Util = require(root_path+'utils/util.js');
var app = getApp();
var AK = 'f23c5f227c10f10abe9724cf58a121ea';

module.exports = {

    // API 接口
    API_HOST: "https://api.test.com/bus",
    AK: AK,
    //默认title设置
    NavigationBarTitle:"花市",
    //默认城市配置
    cityName:"",
    //分享配置
    share_title:"花市",
    share_desc:"花市为您服务",
    share_path:"/pages/index/index"
}