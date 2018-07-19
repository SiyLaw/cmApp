// pages/work/wItems/truck.js
const app = getApp()
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PAGE: "TRUCK",
    COLOR: ['#6699cc', '#778899', '#99cc66', '#5F9EA0', '#8FBC8F', '#BDB76B'],
    fdate: null,
    tab_scan: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var SysInfo = wx.getSystemInfoSync()
    var datenow = new Date()
    var fdate = util.formatTime(datenow, "fulldate");
    this.setData({
      height: SysInfo.windowHeight,
      width: SysInfo.screenWidth,
      rpxrate: Math.floor(SysInfo.screenWidth / 750 * 100) / 100,
      fdate: fdate
    })
    // util.Post(this, "LOAD", null, function(that, data) {
    //   if (data) {
    //     var quickmenu = that.data.quickmenu
    //     for (var i = 0; i < data.menu.length; i++) {
    //       if (quickmenu.indexOf(data.menu[i].txt) == -1) {
    //         quickmenu.push(data.menu[i].txt)
    //       }
    //     }
    //     that.setData({
    //       height: SysInfo.windowHeight,
    //       width: SysInfo.screenWidth,
    //       rpxrate: Math.floor(SysInfo.screenWidth / 750 * 100) / 100,
    //       menu: data.menu,
    //       quickmenu: quickmenu
    //     })
    //   } else {
    //     // console.log('error')
    //   }
    // })
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
    var tab_scan = true
    if (e.currentTarget.dataset.type == "NS") {
      tab_scan = false
    }
    this.setData({
      tab_scan: tab_scan
    })
  },
  bindDateChange: function(e) {
    this.setData({
      fdate: e.detail.value
    })
  }
})