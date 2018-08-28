//app.js
var util = require('/utils/util.js');
App({
  onLaunch: function() {
    wx.hideTabBar({})
    wx.checkSession({
      success: function(e) { //登录态未过期
      },
      fail: function() { //登录态过期了
        wx.setStorageSync('openkey', null);
        wx.setStorageSync('code', '');
      }
    })
  },
  getOpenInfo: function(doAfter) {
    var that = this
    var openkey = wx.getStorageSync('openkey') || {};
    var rescode = wx.getStorageSync('code') || '';
    if (!openkey.OPEN_KEY && rescode != '') {
      util.getOpenId(that.globalData.url, rescode, function(res) {
        that.globalData.openData = res.data
        wx.setStorageSync('openkey', res.data); //存储openid
        typeof doAfter == "function" && doAfter()
      })
    } else if (rescode == '') {
      that.getUserInfo(function() {
        that.getOpenInfo(doAfter)
      })
    }
    if (openkey && openkey.OPEN_KEY) {
      if (!that.globalData.openData || openkey.OPEN_KEY != that.globalData.openData.OPEN_KEY) {
        that.globalData.openData = openkey
      }
    }
    if (openkey.OPEN_KEY && rescode != '') {
      typeof doAfter == "function" && doAfter()
    }
  },
  getUserInfo: function(doAfter, doGetUser) {
    var that = this
    var user = wx.getStorageSync('user') || {};
    var code = wx.getStorageSync('code') || '';
    if (user.nickName == undefined || user.nickName == '' || code == '') {
      //调用登录接口
      wx.login({
        success: function(res) {
          if (res.code) {
            that.globalData.code = res.code;
            wx.setStorageSync('code', res.code); //userInfo
            typeof doAfter == "function" && doAfter()
            wx.getUserInfo({
              success: function(res2) {
                that.globalData.userInfo = res2.userInfo;
                wx.setStorageSync('user', res2.userInfo); //userInfo
                typeof doGetUser == "function" && doGetUser(res2.userInfo)
              }
            })
          } else {
            wx.showModal({
              title: '错误',
              content: '获取用户登录态失败！',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  wx.reLaunch({
                    url: '/pages/index/index',
                  })
                }
              }
            })
          }
        },
        fail: function(res) {
          wx.showModal({
            title: '错误',
            content: '获取用户登录态失败！',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '/pages/index/index',
                })
              }
            }
          })
        }
      })
    } else {
      that.globalData.userInfo = user;
      that.globalData.code = code;
      typeof doAfter == "function" && doAfter()
      typeof doGetUser == "function" && doGetUser(user)
    }
  },
  globalData: {
    AppUser: null,
    userInfo: null,
    openData: null,
    code: '',
    urid: '', //推荐码
    url: 'https://www.cqcaimei.cn/wxget.axd',
    uploadurl: 'https://www.cqcaimei.cn/wxupload.axd',
    bseurl: 'https://www.cqcaimei.cn/'
    // url: 'http://localhost/stlcms/wxget.axd',
    // uploadurl: 'http://localhost/stlcms/wxupload.axd',
    // bseurl: 'http://localhost/stlcms/'
  }
})