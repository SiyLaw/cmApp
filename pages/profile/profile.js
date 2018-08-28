// pages/profile/profile.js
const app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PAGE: "profile",
    hideclass: "",
    realhide: false,
    userInfo: {
      avatarUrl: '/image/logo.png',
      nickName: ''
    },
    items: [{
      id: "profile",
      txt: "个人资料",
      color: "#3CB371",
      img: "/image/user.png",
      ty: "url",
      url: "/pages/services/profile",
      spilted: true
    }, {
      id: "account",
      txt: "购买记录",
      color: "#cd853f",
      img: "/image/doller.png",
      ty: "url",
      url: "/pages/services/profile",
      spilted: true
    }, {
      id: "command",
      txt: "推荐给朋友",
      color: "#008B8B",
      img: "/image/share.png",
      ty: "url",
      url: "/pages/services/recommend",
      val: "RECOMM",
      spilted: true
    }, {
      id: "clearstorage",
      txt: "清理缓存",
      color: "#A52A2A",
      img: "/image/clear.png",
      ty: "fun",
      bindfun: "bindcleartap",
      val: "STORAGE",
      spilted: true
    }],
    info: [{
      RATE: '-',
      DT: '-',
      US: '-'
    }],
    week: 0,
    COLOR: ['#6699cc', '#BC8F8F', '#778899', '#5F9EA0', '#51AD8F', '#81B281', '#A8A35D']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    app.getUserInfo(null, function(user) {
      let StorageInfo = wx.getStorageInfoSync()
      let info = that.data.info
      info[0].STORAGE = StorageInfo.currentSize + "KB"
      that.setData({
        userInfo: user,
        isAuth: true,
        info: info,
      })

      setTimeout(function() {
        that.setData({
          realhide: true
        });
      }, 200);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindcleartap: function (e) {
    let that = this
    wx.getStorageInfo({
      success: function (res) {
        for (let i = 0; i < res.keys.length; i++) {
          if (res.keys[i] != "code" && res.keys[i] != "openkey" && res.keys[i] != "user") {
            try {
              wx.removeStorageSync(res.keys[i])
            } catch (e) {
              console.log(e)
            }
          }
        }
        let info = that.data.info
        let StorageInfo = wx.getStorageInfoSync()
        info[0].STORAGE = (StorageInfo.currentSize / 1024).toFixed(2) + "M"
        that.setData({
          info: info
        })
      }
    })
  }
})