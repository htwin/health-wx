// pages/technicianDetail/technicianDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    technicianId: "",//技师id
    technician: {},//技师实体
    healthItemId: "",//健康项目id
    storeId: "",//门店id
    startTime: "",//服务开始时间
    price: 0,//价格
    serviceTime:0,//服务时间 分钟
    imgUrl: app.globalData.imgUrl//图片地址
  },
  toPay:function(){
    var that = this;
    //首先判断用户是否登录
    //判断是否登录
    var loginUser = wx.getStorageSync("loginUser");
    if (loginUser != undefined && loginUser != null) {
      //登录 保存订单
      //去支付界面之前，生成订单，保存到数据库
      var order = {};
      order.totalPay = this.data.price;//总的金额
      order.storeId = this.data.storeId;//门店id
      order.healthCareProviderId = this.data.technicianId;//技师id
      order.healthItemId = this.data.healthItemId;//健康项目id
      order.userId = loginUser.id;//用户id
      console.log("订单id"+order.userId)
      //时间处理
      var starttime = new Date(this.data.startTime)//订单开始时间
      var serviceTime = this.data.serviceTime;//服务时间  分钟
      var endtime = new Date(this.data.startTime)//订单截止时间
      endtime.setMinutes(endtime.getMinutes() + parseInt(serviceTime))

      order.starttime = starttime;//服务开始时间
      order.endtime = endtime
      console.log("服务时间："+this.data.serviceTime)
      console.log("时间字符串:" + this.data.startTime)
      console.log("订单开始时间：" + order.starttime)
      console.log("订单截止时间：" + order.endtime)
      var url = app.globalData.url + "/order/save"
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: url,
        method: "post",
        data: order,
        success: function (res) {
          wx.hideLoading();
          if (res.data.success && res.data.data != undefined) {
            var orderId = res.data.data;//获取返回的订单id
            console.log("订单id:" + orderId)
            wx.navigateTo({
              url: '/pages/pay/pay?orderId=' + orderId,
            })
          } else {
            console.log("保存订单失败")
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    
    this.setData({
      technicianId:e.technicianId,
      price: e.price,
      healthItemId: e.healthItemId,
      storeId: e.storeId,
      startTime: e.startTime,
      serviceTime: e.serviceTime
    })
    
    //根据id获取技师信息
    this.getTechnicianById();
  },

  /**
   * 根据id获取技师信息
   */
  getTechnicianById:function(){
    var that = this;
    var technicianId = this.data.technicianId;
    var url = app.globalData.url + "/healthCareProvider/" + technicianId;
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
              technician:res.data.data
            })
        }else{
          console.log("获取技师详情信息失败")
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