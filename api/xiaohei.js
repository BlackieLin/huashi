var root_path = "../";
// 加载配置文件
const config = require(root_path + 'config.js');

var HOST_URI = config.API_HOST;

//获取位置名称
var GET_CITY_INFO = '/other.php?mod=getcity';
//获取附近的店铺
var GET_SELLER = '/other.php?mod=nearby';
//获取商品
var GET_LIST = '/other.php?mod=list';
//获取商品详情
var GET_SHOW = '/other.php?mod=show';
//创建订单
var CREATE_ORDER = '/other.php?mod=cOrder';
//获取订单
var GET_ORDER = '/other.php?mod=order';

function obj2uri(obj) {
  return Object.keys(obj).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
  }).join('&');
}

module.exports = {
  //根据经纬度获取城市
  getCityInfo: function (obj = {}) {
    return HOST_URI + GET_CITY_INFO + '&' + obj2uri(obj);
  },
  //附近的店铺接口地址
  getNearbySeller: function (obj = {}) {
    return HOST_URI + GET_SELLER + '&' + obj2uri(obj);
  },
  //获取商品地址
  getList: function (obj = {}) {
    return HOST_URI + GET_LIST + '&' + obj2uri(obj);
  },
  //获取商品详情地址
  getShow: function (obj = {}) {
    return HOST_URI + GET_SHOW + '&' + obj2uri(obj);
  },
  //创建订单地址
  createOrder: function (obj = {}) {
    return HOST_URI + CREATE_ORDER + '&' + obj2uri(obj);
  },
  //获取订单地址
  getOrder: function (obj = {}) {
    return HOST_URI + GET_ORDER + '&' + obj2uri(obj);
  }
}