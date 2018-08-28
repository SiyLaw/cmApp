// pages/news/news.js
const app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PAGE: "NEWS",
    hideclass: "",
    realhide: false,
    SID: "",
    msg: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var sid = options.id || ""
    var jsPost = new util.jsonRow()
    jsPost.AddCell("SID", sid)
    util.Post(that, "NEWITEM", jsPost, function(that, data, mod) {
      that.setData({
        hideclass: "hideLoad",
        SID: sid,
        msg: data.msg || []
      })
    });
    setTimeout(function() {
      that.setData({
        realhide: true
      });
    }, 200);
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
    jsPost.AddCell("SID", this.data.SID)
    util.Post(that, "NeWITEM", jsPost, function (that, data, mod) {
      that.setData({
        msg: data.msg || []
      })
    });
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

  }
})