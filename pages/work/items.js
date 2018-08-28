// pages/work/items.js
const app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PAGE: "FUNLIST",
    hideclass: "",
    realhide: false,
    TP: '',
    showItems: [{
        tp: "INNER",
        img: "../../image/paper.png",
        txt: "领纸",
        url: "/pages/work/wItems/worderlist?val=lz",
        color: "#FF8C00"
      }, {
        tp: "INNER",
        img: "../../image/plate.png",
        txt: "领版",
        url: "/pages/work/wItems/worderlist?val=lb",
        color: "#6B8E23"
      }, {
        tp: "INNER",
        img: "../../image/print.png",
        txt: "印刷作业",
        url: "/pages/work/wItems/scanSettings?tp=YS&nme=印刷岗",
        color: "#4682B4"
      }, {
        tp: "INNER",
        img: "../../image/cut.png",
        txt: "截切作业",
        url: "/pages/work/wItems/scanSettings?tp=CQ&nme=截切岗",
        color: "#708090"
      }, {
        tp: "INNER",
        img: "../../image/die.png",
        txt: "模切作业",
        url: "/pages/work/wItems/scanSettings?tp=MQ&nme=模切岗",
        color: "#2E8B57"
      }, {
        tp: "INNER",
        img: "../../image/fold.png",
        txt: "折页作业",
        url: "/pages/work/wItems/scanSettings?tp=ZY&nme=折页岗",
        color: "#A0522D"
      }, {
        tp: "INNER",
        img: "../../image/bind.png",
        txt: "装订作业",
        url: "/pages/work/wItems/scanSettings?tp=ZD&nme=装订岗",
        color: "#20B2AA"
      }, {
        tp: "INNER",
        img: "../../image/package.png",
        txt: "打包作业",
        url: "/pages/work/wItems/package",
        color: "#7B68EE"
      }, {
        tp: "INNER",
        img: "../../image/truck.png",
        txt: "发货作业",
        url: "/pages/work/wItems/truck",
        color: "#FF6347"
      }, {
        tp: "OUTTER",
        img: "../../image/service.png",
        txt: "外包服务",
        url: "/pages/work/wItems/scanSettings?tp=OS&nme=外包商",
        color: "#FF8C00"
      }, {
        tp: "CUST",
        img: "../../image/bill.png",
        txt: "订单管理",
        url: "/pages/work/cust/orderlist",
        color: "#FF8C00"
      }, {
        tp: "CUST",
        img: "../../image/address.png",
        txt: "地址维护",
        url: "/pages/work/cust/address",
        color: "#CD853F"
      }, {
        tp: "CUST",
        img: "../../image/company.png",
        txt: "公司信息",
        url: "/pages/work/cust/company",
        color: "#1E90FF"
      }
      // , {
      //   tp: "CUST",
      //   img: "../../image/account.png",
      //   txt: "帐户信息",
      //   url: "/pages/work/cust/order",
      //   color: "#4682B4"
      // }, {
      //   tp: "CUST",
      //   img: "../../image/msg.png",
      //   txt: "消息通知",
      //   url: "/pages/work/cust/order",
      //   color: "#3CB371"
      // }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.AppUser == null) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    util.Post(this, "LOAD", null, function(that, data, mod) {
      that.setData({
        hideclass: "hideLoad",
        showItems: data.fl
      })
      setTimeout(function() {
        that.setData({
          realhide: true
        });
      }, 200);
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    // var user = app.globalData.AppUser || {}
    // var TP = ""
    // if (user.UTP == "OUTSIDE_OPERATOR") {
    //   TP = "OUTTER"
    // } else if (user.UTP == "CUST") {
    //   TP = "CUST"
    // } else if (user.UTP != "" && user.UTP != undefined) {
    //   TP = "INNER"
    // }
    // this.setData({
    //   TP: TP
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    util.Post(this, "LOAD", null, function (that, data, mod) {
      that.setData({
        showItems: data.fl
      })
      wx.stopPullDownRefresh()
    })
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