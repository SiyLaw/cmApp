// pages/work/wItems/scanSettings.js
const app = getApp()
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PAGE: "work",
    hideclass: "",
    realhide: false,
    show_module: false,
    SID: "",
    order: [],
    work: [],
    items: [],
    logs: [],
    Itemidx: 0,
    TYPE_CDE: '',
    TYPE_NME: '',
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
      TYPE_CDE: options.tp || "",
      TYPE_NME: options.nme || "",
      SID: options.id || "",
      hideclass: "hideLoad"
    })
    if (options.id && options.id != "") {
      var jsPost = new util.jsonRow()
      jsPost.AddCell("SID", options.id)
      util.Post(that, "COMM_SCAN", jsPost, function(that, data, mod) {
        that.setData({
          SID: options.id,
          Itemidx: 0,
          order: data.order || [],
          work: data.work || [],
          items: data.items || [],
          logs: data.logs || [],
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
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},
  scan: function(e) {
    var that = this
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        var jsPost = new util.jsonRow()
        jsPost.AddCell("SID", res.result)
        util.Post(that, "COMM_SCAN", jsPost, function(that, data, mod) {
          that.setData({
            SID: res.result,
            Itemidx: 0,
            order: data.order || [],
            work: data.work || [],
            items: data.items || [],
            logs: data.logs || [],
            img_src: app.globalData.bseurl + data.order[0].PROD_GUIDE_IMG_URL
          })
        });
      }
    })
  },
  showModel: function(e) {
    switch (this.data.TYPE_CDE) {
      case "lz":
        var jsPost = new util.jsonRow()
        jsPost.AddCell("SID", this.data.SID)
        util.Post(this, "CONFIRM_LZ", jsPost, function (that, data, mod) {
          wx.showToast({
            title: '领纸成功！',
          })
        });
        break;
      case "lb":
        var jsPost = new util.jsonRow()
        jsPost.AddCell("SID", this.data.SID)
        util.Post(this, "CONFIRM_LB", jsPost, function (that, data, mod) {
          wx.showToast({
            title: '领版成功！',
          })
        });
        break;
      default:
        this.setData({
          show_module: true
        })
    }
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
  Submit: function(e) {
    var that = this
    that.setData({
      isUsed: true
    })
    var jsPost = new util.jsonRow()
    jsPost.arrjson = e.detail.value
    jsPost.AddCell("SID", that.data.SID)
    jsPost.AddCell("STATION_CDE", that.data.TYPE_CDE)
    util.Post(that, "WLOG", jsPost, function(that, data, mod) {
      that.setData({
        isUsed: false,
        show_module: false,
        order: data.order || [],
        work: data.work || [],
        items: data.items || [],
        logs: data.logs || [],
        img_src: app.globalData.bseurl + data.order[0].PROD_GUIDE_IMG_URL
      })
    })
  },
  resizeImg: function(e) {
    var imgSize = util.imageUtil(e);
    this.setData({
      imgSize: imgSize
    })
  },
  previewImg: function(e) {
    var that = this
    wx.previewImage({
      urls: [this.data.img_src],
    })
  }
})