//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
var md5 = require('../../utils/md5.js')
Page({
  data: {
    PAGE: "index",
    hideclass: "",
    realhide: false,
    userInfo: {
      avatarUrl: '/image/logo.png',
      nickName: ''
    },
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isAuth: false,
    user: [],
    work: [],
    isUsed: false
  },
  bindGetUserInfo: function(e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      app.globalData.userInfo = e.detail.userInfo;
      wx.setStorageSync('user', e.detail.userInfo); //userInfo
      util.Post(this, "LOAD", null, function(that, data, mod) {
        that.setData({
          user: data.user,
          work: data.work || [],
          userInfo: e.detail.userInfo,
          isAuth: true
        })
        if (data.user[0].IS_BIND == "1") {
          wx.showTabBar({})
        }
      })
    }
  },
  //事件处理函数
  onLoad: function() {
    var that = this
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          app.getUserInfo(null, function(user) {
            that.setData({
              userInfo: user,
              isAuth: true
            })
            util.Post(that, "LOAD", null, function(that, data, mod) {
              app.globalData.AppUser = data.user[0]
              that.setData({
                hideclass: "hideLoad",
                user: data.user,
                work: data.work || []
              })
              if (data.user[0].IS_BIND == "1") {
                wx.showTabBar({})
              }
              setTimeout(function() {
                that.setData({
                  realhide: true
                });
              }, 200);
            })
          })
        } else {
          that.setData({
            realhide: true
          });
        }
      }
    })
  },
  getMd5: function(e) {
    this.setData({
      psd: md5.hexMD5(e.detail.value)
    })
  },
  binduser: function(e) {
    var that = this
    that.setData({
      isUsed: true
    })
    var jsPost = new util.jsonRow()
    jsPost.AddCell("USER_CDE", e.detail.value.USER_CDE)
    jsPost.AddCell("USER_PSD", md5.hexMD5(e.detail.value.USER_PSD))
    util.Post(that, "BIND", jsPost, function(that, data, mod) {
      if (data.msg) {
        wx.showToast({
          title: data.msg
        })
      }
      var status = data.status || "0"
      if (status == "1") {
        var user = data.pjson.user || []
        var work = data.pjson.work || []
        that.setData({
          isUsed: false,
          user: user,
          work: work
        })
        app.globalData.AppUser = user[0]
        if (user[0].IS_BIND == "1") {
          wx.showTabBar({})
        }
      } else {
        that.setData({
          isUsed: false
        })
      }
    })
  },
  navtoOrder: function(e) {
    let id = e.target.dataset.id
    wx.navigateTo({
      url: "/pages/work/cust/order?id=" + id
    })
  },
  navtoOrderMore: function(e) {
    wx.navigateTo({
      url: "/pages/work/cust/orderlist"
    })
  },
  navtoWork: function(e) {
    let id = e.target.dataset.id
    let sc = e.target.dataset.sc
    let sn = e.target.dataset.sn
    let surl = "/pages/work/wItems/scanSettings?id=" + id + "&tp=" + sc + "&nme=" + sn
    switch (sc) {
      case "DB": //打包岗
        surl = "/pages/work/wItems/package?id=" + id + "&tp=" + sc + "&nme=" + sn
        break;
      case "FH": //发货岗
        surl = "/pages/work/wItems/package?id=" + id + "&tp=" + sc + "&nme=" + sn
        break;
      case "PS": //配送岗
        surl = "/pages/work/wItems/package?id=" + id + "&tp=" + sc + "&nme=" + sn
        break;
    }
    wx.navigateTo({
      url: surl
    })
  },
  navtoMore: function(e) {
    wx.navigateTo({
      url: "/pages/work/more"
    })
  },
  onPullDownRefresh: function() {
    util.Post(this, "LOAD", null, function (that, data, mod) {
      that.setData({
        user: data.user,
        work: data.work || []
      })
      if (data.user[0].IS_BIND == "1") {
        wx.showTabBar({})
      }
      wx.stopPullDownRefresh()
    })
  }
})