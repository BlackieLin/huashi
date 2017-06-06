var root_path = "../../";
var Util = require(root_path + 'utils/util.js');
var API = require(root_path + 'api/xiaohei.js');
const config = require(root_path + 'config.js');
var app = getApp()
Page({
  data: {
    userInfo:{},
    goods:{}
  },
  onLoad: function (options) {
    var that = this;
    //商品详情
    Util.AJAX(API.getShow({ id: options.id }), function (e) {
      that.setData({
        goods: e.data.result
      })
    }, "POST", {}, false, { ak: config.AK });
    //获取用户信息
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  submitForm:function(option){
    var name = option.detail.value.name;
    var tel = option.detail.value.tel;
    var address = option.detail.value.address;
    var beizhu = option.detail.value.beizhu;
    var goods_id = option.detail.value.goods_id;
    var pay_money = option.detail.value.pay_money;
    var reg = new RegExp("^[0-9]*$"); 
    var errmsg = "";
    var ischeck = true;
    if (name == "" || tel == "" || address == "") {
      ischeck = false;
      errmsg = '姓名，电话，地址必填';
    }
    if (tel.length != 11 || !reg.test(tel) || tel.substr(0, 1) != 1) {
      ischeck = false;
      errmsg = '请输入正确的手机号码';
    }
    if (ischeck) {
      //绑定
      var data = {
        openid: this.data.userInfo.nickName,
        goods_id: goods_id,
        pay_money: pay_money,
        name: name,
        tel: tel,
        address: address,
        beizhu: beizhu,
        ak: config.AK
      };
      Util.AJAX(API.createOrder({}), function (e) {
        wx.redirectTo({
          url: '/pages/order/success',
        })
      }, "POST", {}, false, data);
    } else {
      wx.showModal({
        title: errmsg,
        showCancel: false
      })
    }
  }
})