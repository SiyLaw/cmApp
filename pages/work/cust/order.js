// pages/work/cust/order.js
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
    show_module: false,
    SID: "",
    order: [],
    addr: [],
    pay: [],
    img_src: '',
    imgSize: {
      imageWidth: 320,
      imageHeight: 100
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.setData({
      SID: options.id || "",
      hideclass: "hideLoad"
    })
    if (options.id && options.id != "") {
      var jsPost = new util.jsonRow()
      jsPost.AddCell("SID", options.id)
      util.Post(that, "LOAD", jsPost, function(that, data, mod) {
        that.setData({
          SID: options.id,
          Itemidx: 0,
          order: data.order || [],
          addr: data.addr || [],
          pay: data.pay || [],
          img_src: app.globalData.bseurl + data.order[0].PROD_GUIDE_IMG_URL
        })
      });
    }
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
    var jsPost = new util.jsonRow()
    jsPost.AddCell("SID", that.data.SID)
    util.Post(that, "LOAD", jsPost, function(that, data, mod) {
      that.setData({
        order: data.order || [],
        addr: data.addr || [],
        pay: data.pay || [],
        img_src: app.globalData.bseurl + data.order[0].PROD_GUIDE_IMG_URL
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