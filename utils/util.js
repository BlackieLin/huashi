//格式化日期函数
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}
//时间戳转日期格式
function formatDate(str, f = "Y-m-d H:i:s") {
  var date = new Date(parseInt(str) * 1000);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return f.replace(/Y/, year).replace(/m/, month).replace(/d/, day).replace(/H/, hour).replace(/i/, minute).replace(/s/, second);
}
//日期转时间戳
function formatTimeStr(endTime) {
  var date = new Date();
  date.setFullYear(endTime.substring(0, 4));
  date.setMonth(endTime.substring(5, 7) - 1);
  date.setDate(endTime.substring(8, 10));
  date.setHours(endTime.substring(11, 13));
  date.setMinutes(endTime.substring(14, 16));
  date.setSeconds(endTime.substring(17, 19));
  return Date.parse(date) / 1000;
}
//格式化数字函数
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//倒计时
function countdown(that, orgSecond, first = true) {
  var second = that.data.second
  if (second == 0) {
    that.setData({
      second: orgSecond,
      sendCodeValue: "重新发送",
      sendNo: false
    });
    return;
  }
  if (first) {
    that.setData({
      second: second - 1,
      sendCodeValue: "获取验证码 " + second,
      sendNo: true
    });
    countdown(that, orgSecond, false);
  } else {
    var time = setTimeout(function () {
      that.setData({
        second: second - 1,
        sendCodeValue: "获取验证码 " + second,
        sendNo: true
      });
      countdown(that, orgSecond, false);
    }, 1000)
  }
}

module.exports = {
  haveRequst: false,
  formatTime: formatTime,
  formatDate: formatDate,
  formatTimeStr: formatTimeStr,
  countdown: countdown,
  AJAX: function (url = '', fn, method = "GET", header = {}, ajaxAsync = true, data = {}) {
    //"Content-Type": "application/x-www-form-urlencoded" // POST header
    if (ajaxAsync == false) {//设置为同步
      this.haveRequst = false;
    }
    if (this.haveRequst === false) {//进程守护
      this.haveRequst = true;
      var that = this;
      wx.request({
        url: url,
        method: method ? method : 'GET',
        data: data,
        header: header ? header : { "Content-Type": "application/json" },
        success: function (res) {
          if (res.statusCode == 200) {
            fn(res);
          } else {
            wx.showModal({
              title: '网络错误代码:' + res.statusCode,
              showCancel: false
            })
          }
          that.haveRequst = false;
        },
        fail: function (res) {
          wx.showModal({
            title: "网络错误，请稍后再试！",
            content: res.errMsg,
            showCancel: false
          })
          that.haveRequst = false;
        }
      });
    }
  }
}