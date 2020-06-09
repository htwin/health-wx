// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    userId:"",//登录用户id
    orderList:[]//订单列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //判断用户是否登录
    //判断是否登录
    var loginUser = wx.getStorageSync("loginUser");
    if (loginUser!=undefined&&loginUser!=null) {
        this.setData({
          userId:loginUser.id
        })
        //根据用户 id 获取该用户的订单列表信息
      this.getOrderInfoByUserId();
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },


/**
 * 根据用户 id 获取该用户的订单列表信息
 */
getOrderInfoByUserId:function(){
  var that = this;
  var userId = this.data.userId;
  var url = app.globalData.url +"/order/userOrderVo/"+userId
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: url,
    method:"get",
    success:function(res){
      wx.hideLoading();
      if(res.data.success){
          that.setData({
            orderList:res.data.data
          })
      }else{
        wx.showModal({
          showCancel: false,
          content: '加载订单失败',
        })
      }
    }
  })
}
  ,

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