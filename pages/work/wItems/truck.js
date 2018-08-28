// pages/work/wItems/truck.js
const app = getApp()
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PAGE: "TRUCK",
    hideclass: "",
    realhide: false,
    COLOR: ['#6699cc', '#778899', '#99cc66', '#5F9EA0', '#8FBC8F', '#BDB76B'],
    fdate: null,
    tab_scan: false,
    cate_show: true,
    show_module: false,
    order: [],
    packages: [],
    delivery: [],
    deliItems: [],
    PID: "", //订单ID，用于接收页面参数
    SID: "", //扫码ID
    DELIVERY_LIST: "" //发货ID列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var SysInfo = wx.getSystemInfoSync()
    var datenow = new Date()
    var fdate = util.formatTime(datenow, "fulldate");
    var jsPost = new util.jsonRow()
    var PID = options.id || ""
    jsPost.AddCell("PID", PID)
    jsPost.AddCell("FDATE", fdate)
    util.Post(this, "FIND", jsPost, function(that, data) {
      if (data) {
        var order = data.order || []
        var packages = data.packages || []
        var delivery = data.delivery || []
        var deliItems = data.deliItems || []
        that.setData({
          height: SysInfo.windowHeight,
          width: SysInfo.screenWidth,
          rpxrate: Math.floor(SysInfo.screenWidth / 750 * 100) / 100,
          fdate: fdate,
          order: order,
          packages: packages,
          delivery: delivery,
          deliItems: deliItems,
          hideclass: "hideLoad",
          PID: PID
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
    var tab_scan = true
    if (e.currentTarget.dataset.type == "NS") {
      tab_scan = false
    }
    this.setData({
      tab_scan: tab_scan
    })
  },
  bindChangeStyle: function(e) {
    var cate_show = !this.data.cate_show
    this.setData({
      cate_show: cate_show
    })
  },
  bindDateChange: function(e) {
    this.setData({
      fdate: e.detail.value
    })
  },
  bindRefresh: function(e) {
    var jsPost = new util.jsonRow()
    jsPost.AddCell("PID", this.data.PID)
    jsPost.AddCell("FDATE", this.data.fdate)
    util.Post(this, "FIND", jsPost, function(that, data) {
      if (data) {
        var order = data.order || []
        var packages = data.packages || []
        var delivery = data.delivery || []
        var deliItems = data.deliItems || []
        that.setData({
          order: order,
          packages: packages,
          delivery: delivery,
          deliItems: deliItems
        })
      } else {
        // console.log('error')
      }
    })
  },
  scan: function(e) {
    var that = this
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        var jsPost = new util.jsonRow()
        jsPost.AddCell("SID", res.result)
        jsPost.AddCell("PID", that.data.PID)
        jsPost.AddCell("FDATE", that.data.fdate)
        util.Post(that, "PG_SCAN", jsPost, function(that, data, mod) {
          var order = data.order || []
          var packages = data.packages || []
          var delivery = data.delivery || []
          var deliItems = data.deliItems || []
          that.setData({
            order: order,
            packages: packages,
            delivery: delivery,
            deliItems: deliItems,
            SID: res.result
          })
          // wx.showToast({
          //   title: '扫码成功！',
          // })
        });
      }
    })
  },
  bindOrderShowDetail: function(e) {
    var oid = e.currentTarget.dataset.id;
    var order = this.data.order;
    for (var i = 0; i < order.length; i++) {
      if (order[i].PROD_BASIC_ID == oid) {
        order[i].show = !(order[i].show || false)
      } else {
        order[i].show = false
      }
    }
    this.setData({
      order: order
    })
  },
  selected: function(e) {
    var packages = this.data.packages
    for (var i = 0; i < packages.length; i++) {
      if (packages[i].PACKAGING_ID == e.currentTarget.dataset.id && packages[i].IS_SCAN == "1") {
        packages[i].CONFIRM = packages[i].CONFIRM == "1" ? "0" : "1"
      }
    }
    this.setData({
      packages: packages
    })
  },
  showModel: function(e) {
    var show_module = !this.data.show_module
    if (show_module) {
      var packages = this.data.packages
      var order = this.data.order
      var iCount = 0;
      var ids = "";
      var checkDetail = "";
      for (var i = 0; i < packages.length; i++) {
        if (packages[i].IS_SCAN == "1" && packages[i].CONFIRM == "1") {
          iCount++;
          ids += ids == "" ? packages[i].PACKAGING_ID : "," + packages[i].PACKAGING_ID
        }
      }
      for (var j = 0; j < order.length; j++) {
        if (order[j].HS == "2") {
          checkDetail += (checkDetail == "" ? order[j].ORDER_NO : "\n\r" + order[j].ORDER_NO) + " 扫码不全"
        }
      }

      this.setData({
        show_module: show_module,
        iCount: iCount,
        checkDetail: checkDetail,
        ids: ids
      })
    } else {
      this.setData({
        show_module: show_module
      })
    }
  },
  CloseModel: function(e) {
    this.setData({
      show_module: false
    })
  },
  Submit: function(e) {
    var that = this
    that.setData({
      isUsed: true
    })
    var jsPost = new util.jsonRow()
    jsPost.AddCell("IDS", that.data.ids)
    jsPost.AddCell("PID", this.data.PID)
    jsPost.AddCell("FDATE", this.data.fdate)
    util.Post(that, "CONFIRM_TRUCK", jsPost, function(that, data, mod) {
      that.setData({
        isUsed: false,
        show_module: false,
        order: data.order || [],
        packages: data.packages || [],
        delivery: data.delivery || [],
        deliItems: data.deliItems || []
      })
    })
  }
})