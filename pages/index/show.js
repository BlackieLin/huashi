var root_path = "../../";
var Util = require(root_path + 'utils/util.js');
var API = require(root_path + 'api/xiaohei.js');
const config = require(root_path + 'config.js');
var app = getApp()
Page({
  data: {
    goods:{}
  },
  onLoad: function (options) {
     var that=this;
     //商品详情
     Util.AJAX(API.getShow({ id: options.id }), function (e) {
       that.setData({
         goods: e.data.result
       })
     }, "POST", {}, false, { ak: config.AK });
  }
})