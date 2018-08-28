// pages/work/cust/orderlist.js
const app = getApp()
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PAGE: "ORDER",
    hideclass: "",
    realhide: false,
    COLOR: ['#6699cc', '#778899', '#99cc66', '#5F9EA0', '#8FBC8F', '#BDB76B'],
    fdate: null,
    tab_status: '0',
    show_module: false,
    orders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var SysInfo = wx.getSystemInfoSync()
    var datenow = new Date()
    var fdate = util.formatTime(datenow, "fulldate");
    var jsPost = new util.jsonRow()
    jsPost.AddCell("FDATE", fdate)
    util.Post(this, "FIND", jsPost, function(that, data) {
      if (data) {
        var orders = data.orders || []
        that.setData({
          height: SysInfo.windowHeight,
          width: SysInfo.screenWidth,
          rpxrate: Math.floor(SysInfo.screenWidth / 750 * 100) / 100,
          fdate: fdate,
          orders: orders,
          hideclass: "hideLoad"
        })
      } else {
        // console.log('error')
      }
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
  changeTab: function(e) {
    var tab_status = e.currentTarget.dataset.type
    this.setData({
      tab_status: tab_status
    })
  },
  bindDateChange: function(e) {
    var jsPost = new util.jsonRow()
    jsPost.AddCell("FDATE", e.detail.value)
    util.Post(this, "FIND", jsPost, function(that, data) {
      if (data) {
        var orders = data.orders || []
        that.setData({
          fdate: e.detail.value,
          orders: orders
        })
      } else {
        // console.log('error')
      }
    })
  },
  bindRefresh: function(e) {
    var jsPost = new util.jsonRow()
    jsPost.AddCell("FDATE", this.data.fdate)
    util.Post(this, "FIND", jsPost, function(that, data) {
      if (data) {
        var orders = data.orders || []
        that.setData({
          orders: orders
        })
      } else {
        // console.log('error')
      }
    })
  },
  bindOrderShowDetail: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/work/cust/order?id=' + id,
    })
  }
})