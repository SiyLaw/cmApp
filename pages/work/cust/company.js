// pages/work/cust/company.js
const app = getApp()
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PAGE: "COMPANY",
    hideclass: "",
    realhide: false,
    show_module: false,
    company: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    util.Post(that, "LOAD", null, function(that, data, mod) {
      that.setData({
        hideclass: "hideLoad",
        company: data.company || []
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
    var that = this
    util.Post(that, "LOAD", null, function(that, data, mod) {
      that.setData({
        company: data.company || []
      })
      wx.stopPullDownRefresh()
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},
  showModel: function(e) {
    this.setData({
      show_module: true
    })
  },
  CloseModel: function(e) {
    this.setData({
      show_module: false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  previewImg: function(e) {
    var that = this
    wx.previewImage({
      urls: [this.data.img_src],
    })
  },
  close: function(e) {
    wx.navigateBack({

    })
  }
})