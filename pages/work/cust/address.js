// pages/work/cust/address.js// pages/work/cust/orderlist.js
const app = getApp()
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PAGE: "ADDRESS",
    hideclass: "",
    realhide: false,
    COLOR: ['#6699cc', '#778899', '#99cc66', '#5F9EA0', '#8FBC8F', '#BDB76B'],
    fdate: null,
    show_module: false,
    address: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var SysInfo = wx.getSystemInfoSync()
    util.Post(this, "LOAD", null, function(that, data) {
      if (data) {
        var address = data.addr || []
        that.setData({
          height: SysInfo.windowHeight,
          width: SysInfo.screenWidth,
          rpxrate: Math.floor(SysInfo.screenWidth / 750 * 100) / 100,
          address: address,
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
  bindEditItem: function(e) {

  }
})