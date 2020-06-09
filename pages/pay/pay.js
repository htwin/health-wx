// pages/pay/pay.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:"",//订单id
    payOrder:{},//支付订单数据
    minute:1,//分钟
    second:20,//秒
    timer:'',//定时器名字
    starttime:"",//服务开始时间  存入数据库的 未处理的
    isPay:false//是否支付
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e.orderId)
    //获取订单id
      this.setData({
        orderId:e.orderId
      })
      //加载支付订单数据 门店、开始时间、技师、价格等。
    this.getOrderData()
  },

  /**
   * 获取订单数据
   * 
   */
  getOrderData:function(){
    var that = this;
      var orderId = this.data.orderId;
    var url = app.globalData.url + "/order/payOrderData/" + orderId
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: url,
        method:"get",
        success:function(res){
          wx.hideLoading();
          if(res.data.success){
            var payOrder = res.data.data;
            //处理后端传来的时间  先存入到临时变量
           that.setData({
             starttime: payOrder.starttime
           })
            //payOrder.starttime = payOrder.starttime.substring(0, payOrder.starttime.lastIndexOf(":"))
            that.setData({
              payOrder: payOrder
            })
           
          }else{
            console.log("加载订单数据失败")
          }
        }
      })
  },
  /**
     *支付 
     */
  doPay: function () {
    var that = this;
    var order={};
    order.id = this.data.payOrder.id;
    order.actualPay = this.data.payOrder.price;
    // //将开始时间赋给 需要存入数据库的订单对象
    // order.starttime = this.data.starttime;
    console.log(order)
    var url = app.globalData.url + "/order/doPay"
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      method:"post",
      data:order,
      success:function(res){
        wx.hideLoading();
        if(res.data.success){
          clearInterval(that.data.timer);//清除倒计时
          //状态为已支付
          that.setData({
            isPay:true
          })
            wx.showModal({
              showCancel:false,
              content: '支付成功',
              success(res) {
                if (res.confirm) {
                  wx.reLaunch({
                    url: '/pages/order/order',
                  })
                } 
              }
            })
           
        }else{
          wx.showModal({
            showCancel: false,
            content: '系统错误！！',
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
    //订单开始倒计时
      this.countDown();
  },

  /**
   * 订单倒计时
   */
  countDown:function(){
      var that = this;
      var minute = this.data.minute;//分钟
      var second = this.data.second;//秒
      that.setData({
        timer: setInterval(function () {
          second--;

          if (second == 0 && minute != 0) {
            minute--;
            second = 10;
          }
          if (second == 0 && minute == 0) {
            clearInterval(that.data.timer);
            wx.showModal({
              title: '提示',
              content: '支付超时了，快快重新下单吧！',
              showCancel:false,
              success(res){
                if(res.confirm){
                  that.deleteOrder();//删除订单
                 
                }
              }
            })
          }
          that.setData({
            second: second,
            minute: minute
          })
        }, 1000)
      })
     
  },

  /**
   * 删除未支付的订单
   */
  deleteOrder:function(){
    var that = this;
    var url = app.globalData.url + "/order/deleteNoPay/" + this.data.orderId
    wx.showLoading({
      title: '取消订单中',
    })
    wx.request({
      url: url,
      method:"delete",
      success:function(res){
        wx.hideLoading();
        if(res.data.success){
            wx.showToast({
              title: '订单取消成功',
            })
          wx.switchTab({
            url: '/pages/index/index',
          })
        }else{
            console.log("订单删除失败")
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      console.log("页面隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this;
    var isPay = this.data.isPay
    if (!isPay){
      clearInterval(that.data.timer);//清除倒计时

      this.deleteOrder();//删除订单
    }
    
   
        
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
      console.log("分享")
  }
})