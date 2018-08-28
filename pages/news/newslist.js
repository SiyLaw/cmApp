// pages/news/newslist.js
const app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    width: 0,
    bseurl: '',
    rpxrate: 0.0, //rpx-px比率
    PAGE: "NEWS",
    hideclass: "",
    realhide: false,
    RCNT: 10, //每次请求数量
    msg: [],
    moreLoading: false,
    moreLoadingComplete: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var height = 0;
    var width = 0;
    var SysInfo = wx.getSystemInfoSync()

    var jsPost = new util.jsonRow()
    jsPost.AddCell("RCNT", that.data.RCNT)
    jsPost.AddCell("CCNT", that.data.msg.length)
    util.Post(this, "LOAD", jsPost, function(that, data) {
      that.setData({
        height: SysInfo.windowHeight,
        width: SysInfo.windowWidth,
        rpxrate: Math.floor(SysInfo.windowWidth / 750 * 100) / 100,
        msg: data.msg || [],
        bseurl: app.globalData.bseurl,
        hideclass: "hideLoad"
      })
      setTimeout(function() {
        that.setData({
          realhide: true
        });
      }, 200);
    });
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
    var jsPost = new util.jsonRow()
    jsPost.AddCell("RCNT", (this.data.msg.length < this.data.RCNT ? this.data.RCNT : this.data.msg.length))
    jsPost.AddCell("CCNT", 0)
    util.Post(this, "LOAD", jsPost, function(that, data) {
      that.setData({
        msg: data.msg,
        moreLoadingComplete: false
      })
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.moreLoadingComplete) {
      this.setData({
        moreLoading: true
      })
      var jsPost = new util.jsonRow()
      jsPost.AddCell("RCNT", this.data.RCNT)
      jsPost.AddCell("CCNT", this.data.msg.length)
      util.Post(this, "LOAD", jsPost, function(that, data) {
        let loadComplete = false;
        if (data.msg.length < 1)
          loadComplete = true;
        that.setData({
          msg: that.data.msg.concat(data.msg),
          moreLoading: false,
          moreLoadingComplete: loadComplete
        })
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})