// pages/toPay/toPay.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      saveActivityList:[],//储值活动列表
      chooseActivity:{},//当前选择的储值活动对象
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      //获取储值活动列表
      this.getSaveActivityList();
  },

  /**
   * 点击选择 活动 触发事件
   */
  chooseActivity:function(e){
     var index = e.currentTarget.dataset.index;
    var chooseActivity = this.data.saveActivityList[index]
     this.setData({
       chooseActivity: chooseActivity,//当前选择的活动对学校
     
     })
   
     
  }
  ,

  /**
   * 获取储值活动列表
   */
  getSaveActivityList:function(){
      var that = this;
      var url = app.globalData.url +"/saveActivity/list";
      wx.showLoading({
        title: '加载中',
      })

      wx.request({
        url: url,
        method:'get',
        success:function(res){
          wx.hideLoading();
          if(res.data.success){
              that.setData({
                saveActivityList:res.data.data
              })
          }else{
            console.log("加载储值活动列表失败")
          }
        }
      })


  }
  ,
  /**
   *支付 
   */
  doPay:function(){
    
      wx.showModal({
      
        content: '暂缓开放...',
        showCancel:false
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