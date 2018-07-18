// pages/work/items.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PAGE: "FUNLIST",
    hideclass: "",
    realhide: false,
    showItems: [{
      img: "../../image/print.png",
      txt: "印刷作业",
      url: "/pages/work/wItems/scanSettings?tp=YS&nme=印刷岗"
    }, {
      img: "../../image/cut.png",
      txt: "截切作业",
      url: "/pages/work/wItems/scanSettings?tp=CQ&nme=截切岗"
    }, {
      img: "../../image/die.png",
      txt: "模切作业",
      url: "/pages/work/wItems/scanSettings?tp=MQ&nme=模切岗"
    }, {
      img: "../../image/fold.png",
      txt: "折页作业",
      url: "/pages/work/wItems/scanSettings?tp=ZY&nme=折页岗"
    }, {
      img: "../../image/bind.png",
      txt: "装订作业",
      url: "/pages/work/wItems/scanSettings?tp=ZD&nme=装订岗"
    }, {
      img: "../../image/package.png",
      txt: "打包作业",
      url: "/pages/work/wItems/package"
    },{
      img: "../../image/truck.png",
      txt: "发货作业",
      url: "/pages/work/wItems/truck"
    }, {
      img: "../../image/service.png",
      txt: "外包服务",
      url: "/pages/work/wItems/scanSettings?tp=OS&nme=外包商"
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  }
})