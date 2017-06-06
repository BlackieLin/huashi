var root_path = "../../";
var Util = require(root_path + 'utils/util.js');
var API = require(root_path + 'api/xiaohei.js');
const config = require(root_path + 'config.js');
var app = getApp()
Page({
  data: {
      company:'',
      logo: '',
      address: '',
      tel: '',
      goods_list:{}
  },
  onLoad: function (options) {
    var seller_id = options.seller_id
    var that = this;
    //查询附近的店铺
    Util.AJAX(API.getList({ seller_id: seller_id }), function (e) {
      that.setData({
        company: options.company,
        logo: options.logo,
        address: options.address,
        tel: options.tel,
        goods_list: e.data.result
      })
    }, "POST", {}, false, { ak: config.AK });
    //保存访问记录
    var sellerArr, sellerArrOld;
    sellerArrOld=wx.getStorageSync('seller');
    var exist=false;
    if (sellerArrOld.length>0){
      for (var i = 0; i < sellerArrOld.length;i++){
        if (sellerArrOld[i].id == seller_id){
          exist =true;
        }
      }
      if (exist == false) {
        sellerArrOld.push({
          id: seller_id,
          company: options.company,
          logo: options.logo,
          address: options.address,
          tel: options.tel
        });
      }
      sellerArr = sellerArrOld;
    }else{
      sellerArr=[{
        id: seller_id,
        company: options.company,
        logo: options.logo,
        address: options.address,
        tel: options.tel
      }]
    }
    wx.setStorageSync('seller', sellerArr)
  },
  //call phone 
  callPhone: function (re) {
    wx.makePhoneCall({
      phoneNumber: re.currentTarget.dataset.tel,
      success: function (res) {
        console.log('call ok');
      }
    })
  }
})