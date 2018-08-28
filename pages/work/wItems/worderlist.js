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
    orders: [],
    printList: [{
      PID: "",
      PNME: "全部"
    }],
    funList: [{
      cde: "CQ",
      nme: "裁切",
      url: "/pages/work/wItems/scanSettings"
    }, {
      cde: "YS",
      nme: "印刷",
      url: "/pages/work/wItems/scanSettings"
    }, {
      cde: "ZD",
      nme: "装订",
      url: "/pages/work/wItems/scanSettings"
    }, {
      cde: "MQ",
      nme: "模切",
      url: "/pages/work/wItems/scanSettings"
    }, {
      cde: "ZY",
      nme: "折页",
      url: "/pages/work/wItems/scanSettings"
    }, {
      cde: "DB",
      nme: "打包",
      url: "/pages/work/wItems/package"
    }],
    printIdx: 0,
    tab_txt: "作业",
    tab_url: "",
    tab_val_cde: "IS_PICKING_PAPER",
    order_no: "",
    fun_type: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var SysInfo = wx.getSystemInfoSync()
    var datenow = new Date()
    datenow.setDate(datenow.getDate() + 7);
    var fdate = util.formatTime(datenow, "fulldate");
    var fun_type = options.val.toUpperCase() || "";
    var tab_txt = "作业";
    var tab_val_cde = "IS_PICKING_PAPER";
    var tab_url = "/pages/work/wItems/scanSettings";
    switch (fun_type) {
      case "LZ":
        tab_txt = "领纸";
        tab_val_cde = "IS_PICKING_PAPER";
        break;
      case "LB":
        tab_txt = "领版";
        tab_val_cde = "IS_PICKING_PLATE";
        break;
      default:
        for (var i = 0; i < this.data.funList.length; i++) {
          var item = this.data.funList[i]
          if (item.cde == fun_type) {
            tab_txt = item.nme;
            tab_val_cde = fun_type;
            tab_url = item.url
            break;
          }
        }
        break;
    }

    util.Post(this, "GETPRINT", null, function(that, data) {
      if (data) {
        var printList = [{
          PID: "",
          PNME: "全部"
        }].concat(data.Printer || [])
        that.setData({
          printList: printList,
          height: SysInfo.windowHeight,
          width: SysInfo.screenWidth,
          rpxrate: Math.floor(SysInfo.screenWidth / 750 * 100) / 100,
          fdate: fdate,
          hideclass: "hideLoad",
          tab_txt: tab_txt,
          tab_val_cde: tab_val_cde,
          tab_url: tab_url,
          fun_type: fun_type
        })

        var jsPost = new util.jsonRow()
        jsPost.AddCell("FDATE", fdate)
        jsPost.AddCell("FPRINT", that.data.printList[that.data.printIdx].PID)
        jsPost.AddCell("FORDER", that.data.order_no)
        util.Post(that, "ORRDERFIND", jsPost, function(that, data) {
          if (data) {
            var orders = data.orders || []
            that.setData({
              orders: orders
            })
          }
          setTimeout(function() {
            that.setData({
              realhide: true
            });
          }, 200);
        })
      }
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
    jsPost.AddCell("FPRINT", this.data.printList[this.data.printIdx].PID)
    jsPost.AddCell("FORDER", this.data.order_no)
    util.Post(this, "ORRDERFIND", jsPost, function(that, data) {
      if (data) {
        var orders = data.orders || []
        that.setData({
          fdate: e.detail.value,
          orders: orders
        })
      }
    })
  },
  bindOrderInputBlur: function(e) {
    var jsPost = new util.jsonRow()
    jsPost.AddCell("FDATE", this.data.fdate)
    jsPost.AddCell("FPRINT", this.data.printList[this.data.printIdx].PID)
    jsPost.AddCell("FORDER", e.detail.value)
    util.Post(this, "ORRDERFIND", jsPost, function(that, data) {
      if (data) {
        var orders = data.orders || []
        that.setData({
          order_no: e.detail.value,
          orders: orders
        })
      }
    })
  },
  bindPrintChange: function(e) {
    var jsPost = new util.jsonRow()
    jsPost.AddCell("FDATE", this.data.fdate)
    jsPost.AddCell("FPRINT", this.data.printList[e.detail.value].PID)
    jsPost.AddCell("FORDER", this.data.order_no)
    util.Post(this, "ORRDERFIND", jsPost, function(that, data) {
      if (data) {
        var orders = data.orders || []
        that.setData({
          printIdx: e.detail.value,
          orders: orders
        })
      }
    })
  },
  bindRefresh: function(e) {
    var jsPost = new util.jsonRow()
    jsPost.AddCell("FDATE", this.data.fdate)
    jsPost.AddCell("FPRINT", this.data.printList[this.data.printIdx].PID)
    jsPost.AddCell("FORDER", this.data.order_no)
    util.Post(this, "ORRDERFIND", jsPost, function(that, data) {
      if (data) {
        var orders = data.orders || []
        that.setData({
          orders: orders
        })
      }
    })
  },
  bindOrderShowDetail: function(e) {
    var tab_url = this.data.tab_url
    var fun_type = this.data.fun_type
    var tab_txt = this.data.tab_txt
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: tab_url + '?id=' + id + '&tp=' + fun_type + '&nme=' + tab_txt
    })
  }
})