// pages/work/more.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PAGE: "work",
    hideclass: "",
    realhide: false,
    logs: [],
    iStart: 0,
    iEnd: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var jsPost = new util.jsonRow()
    let iStart = that.data.iStart
    jsPost.AddCell("SNO", that.data.iStart)
    jsPost.AddCell("ENO", that.data.iEnd)
    util.Post(that, "MORE", jsPost, function(that, data, mod) {
      iStart = iStart + data.logs.length
      that.setData({
        hideclass: "hideLoad",
        logs: that.data.logs.concat(data.logs),
        iStart: iStart
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
    wx.stopPullDownRefresh();
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
  navtoWork: function (e) {
    let id = e.target.dataset.id
    let sc = e.target.dataset.sc
    let sn = e.target.dataset.sn
    let surl = "/pages/work/wItems/scanSettings?id=" + id + "&tp=" + sc + "&nme=" + sn
    switch (sc) {
      case "DB"://打包岗
        surl = "/pages/work/wItems/package?id=" + id + "&tp=" + sc + "&nme=" + sn
        break;
      case "FH"://发货岗
        surl = "/pages/work/wItems/package?id=" + id + "&tp=" + sc + "&nme=" + sn
        break;
      case "PS"://配送岗
        surl = "/pages/work/wItems/package?id=" + id + "&tp=" + sc + "&nme=" + sn
        break;
    }
    wx.navigateTo({
      url: surl
    })
  }
})