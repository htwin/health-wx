// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginUser:{}//登录的用户信息
  },
  toPay:function(){
    wx.navigateTo({
      url: '/pages/toPay/toPay',
    })
  },
  toShare:function(){
    wx.navigateTo({
      url: '/pages/share/share',
    })
  },
  toMyGift:function(){
    wx.navigateTo({
      url: '/pages/myFift/myGift',
    })
  },
  toConsumeRecord:function(){
    wx.navigateTo({
      url: '/pages/consumeRecord/consumeRecord',
    })
  },
  toVipIntro:function(){
      wx.navigateTo({
        url: '/pages/vipIntro/vipIntro',
      })
  },
  toContact:function(){
      wx.navigateTo({
        url: '/pages/contact/contact',
      })
  },
  toMessage:function(){
    wx.navigateTo({
      url: '/pages/message/message',
    })
  },
  toUserInfo:function(){
   
    wx.navigateTo({
      url: '/pages/userDetail/userDetail?userId=1',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //获取登录用户信息
      this.getUserInfo();
  },
  /**
   * 获取登录用户信息
   */
  getUserInfo:function(){
    var that = this;
    var isLogin = wx.getStorageSync("loginUser");//判断用户是否登录
    if(isLogin){
      //从缓存中获取
      wx.getStorage({
        key: 'loginUser',
        success: function (res) { 
            that.setData({
              loginUser:res.data
            })
        },
      })
    }else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
      
  }
  ,

  to:function(){
    console.log(1111);
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