var root_path = "../../";
var Util = require(root_path + 'utils/util.js');
var API = require(root_path + 'api/xiaohei.js');
const config = require(root_path + 'config.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    history_order:{},
    order: {},
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      //获取订单列表
      Util.AJAX(API.getOrder({ openid: userInfo.nickName}), function (re) {
        var goods = [{}];
        //商品详情
        if (re.data.result.length>0){
          var goods_id = re.data.result[0].goods_id;
          Util.AJAX(API.getShow({ id: goods_id }), function (e) {
            that.setData({
              history_order: [e.data.result]
            })
          }, "POST", {}, false, { ak: config.AK });
        }else{
          that.setData({
            history_order: goods
          })
        }
      }, "POST", {}, false, { ak: config.AK });
    });
  }
})
