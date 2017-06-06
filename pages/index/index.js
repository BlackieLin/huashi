var root_path = "../../";
var Util = require(root_path + 'utils/util.js');
var API = require(root_path + 'api/xiaohei.js');
const config = require(root_path + 'config.js');
var app = getApp()
Page({
  data: {
    pois_address:'你要送货到哪？',
    history_shop:{},
    nearby_shop:{}
  },
  onLoad: function (options) {
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        Util.AJAX(API.getCityInfo({ jd: res.longitude, wd: res.latitude}), function (re) {
          var pois_address = re.data.result.addressComponent.street + re.data.result.addressComponent.street_number;
          var lat = re.data.result.location.lat;
          var lng = re.data.result.location.lng;
          that.setData({
            pois_address: pois_address
          })
          wx.setStorageSync('pois_address', { 'address': re.data.result.formatted_address, 'name': pois_address, 'latitude': lat, 'longitude': lng })
          //查询附近的店铺
          Util.AJAX(API.getNearbySeller({ jd: lng, wd: lat }), function (e) {
            that.setData({
              nearby_shop: e.data.result
            })
          }, "POST", {}, false, { ak: config.AK });
        }, "POST", {}, false, { ak: config.AK });
      }
    });
  },
  onShow: function (option) {
    var sellerArr = wx.getStorageSync('seller');
    if (sellerArr.length>0){
      this.setData({
        history_shop: sellerArr
      })
    }
  },
  showPois:function(op){
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.chooseLocation({
          success: function(re) {
            that.setData({
              pois_address: re.name
            })
            wx.setStorageSync('pois_address', { 'address': re.address, 'name': re.name, 'latitude': re.latitude, 'longitude': re.longitude})
          },
        })
      }
    })
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
