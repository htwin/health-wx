// pages/gift/gift.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList:[]
  },
  toPayGift:function(){
      wx.navigateTo({
        url: '/pages/payGift/payGift',
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getActivityAllList();
  },

  /**
   * 获取所有活动列表
   */
  getActivityAllList:function(){
    var that = this;
    var url = app.globalData.url + "/activity/activityAllList";
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      method: "get",
      success: function (res) {
        wx.hideLoading();
        if (res.data.success) {
          that.setData({
            activityList: res.data.data
          })
        } else {
          wx.showModal({
            showCancel: false,
            content: '加载活动失败',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})