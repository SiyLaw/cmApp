// pages/work/db/db_main.js
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
    show_print_module: false,
    scanTxt: "",
    work: [],
    items: [],
    Itemidx: 0,
    spiltCnt: 1,
    spiltNum: 1,
    PPTS: "",
    DB_TP: [],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var DB_TP = wx.getStorageSync('_DB_TP') || [];
    if (DB_TP.length <= 0) {
      util.Post(that, "DB_TP", null, function (that, data, mod) {
        let DB_TP = []
        for (var i = 0; i < data.dict.length; i++) {
          DB_TP.push(data.dict[i].VL)
        }
        that.setData({
          DB_TP: DB_TP,
          hideclass: "hideLoad"
        })
        setTimeout(function () {
          that.setData({
            realhide: true
          });
        }, 200);
        wx.setStorageSync('_DB_TP', DB_TP)
        // wx.showActionSheet({
        //   itemList: DB_TP,
        //   success: function (res) {
        //     that.setData({
        //       DB_TP: DB_TP,
        //       PPTS: DB_TP[res.tapIndex]
        //     })
        //   },
        //   fail: function (res) {
        //     that.setData({
        //       DB_TP: DB_TP,
        //       PPTS: DB_TP[0]
        //     })
        //   }
        // })
      });
    } else {
      that.setData({
        DB_TP: DB_TP,
        hideclass: "hideLoad"
      })
      setTimeout(function () {
        that.setData({
          realhide: true
        });
      }, 200);
      // that.setData({
      //   realhide: true
      // });
      // wx.showActionSheet({
      //   itemList: DB_TP,
      //   success: function (res) {
      //     that.setData({
      //       PPTS: DB_TP[res.tapIndex]
      //     })
      //   },
      //   fail: function (res) {
      //     that.setData({
      //       DB_TP: DB_TP,
      //       PPTS: DB_TP[0]
      //     })
      //   }
      // })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  scan: function (e) {
    var that = this
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        var jsPost = new util.jsonRow()
        jsPost.AddCell("SID", res.result)
        util.Post(that, "DB_SCAN", jsPost, function (that, data, mod) {
          that.setData({
            scanTxt: res.result,
            Itemidx: 0,
            work: data.work || [],
            items: data.items || []
          })
        });
      }
    })
  },
  showPackageModel: function (e) {
    var that = this
    var Itemidx = e.currentTarget.dataset.idx;
    var ttl = this.data.items[Itemidx].DELIVERY_CNT
    this.setData({
      Itemidx: Itemidx,
      spiltNum: ttl,
      show_print_module: true
    })
  },
  onInputSuccess: function (e) {
    var Itemidx = this.data.Itemidx
    var ttl = this.data.items[Itemidx].DELIVERY_CNT
    var value = parseInt(e.detail.value);
    var spiltCnt = value > 0 ? value : 1
    var spiltNum = Math.ceil(ttl / spiltCnt)
    this.setData({
      spiltCnt: spiltCnt,
      spiltNum: spiltNum
    })
  },
  SubmitPrint: function (e) {
    wx.showLoading({
      title: '请求数据中...',
    })
    var that = this
    var Itemidx = this.data.Itemidx;
    var jsPost = new util.jsonRow()
    jsPost.AddCell("AID", this.data.items[Itemidx].ADDRESS_ID)
    jsPost.AddCell("PID", this.data.items[Itemidx].PROD_BASIC_ID)
    jsPost.AddCell("CNT", this.data.spiltCnt)
    jsPost.AddCell("NUM", this.data.spiltNum)
    jsPost.AddCell("SID", this.data.scanTxt)
    jsPost.AddCell("TP", this.data.DB_TP[this.data.index] || "1号打包机")
    util.Post(that, "DB_PRINT", jsPost, function (that, data, mod) {
      that.setData({
        work: data.work || [],
        items: data.items || [],
        show_print_module: false
      })
      wx.hideLoading();
    });
  },
  ClosePrint: function (e) {
    //关闭评论
    this.setData({
      show_print_module: false
    })
  },
  bindClassChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  }
})