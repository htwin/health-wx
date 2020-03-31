// pages/projectInfo/projectInfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    healthItemId:"",//健康项目id
    storeId:"",//门店id
    categoryId:"",//类别id
    healthItem:{},//健康项目实体
  },
  toTechnician:function(){
    wx.navigateTo({
      url: '/pages/toTechnician/toTechnician',
    })
  },
 
  onLoad: function (e) {

    //赋值 携带的参数
    this.setData({
      healthItemId: e.healthItemId,
      storeId: e.storeId,
      categoryId: e.categoryId
    })
    
    //获取项目详情信息
    this.getHelathItem();
  },
  
  /**
   * 根据id获取项目详情信息
   */
  getHelathItem:function(){
    var that = this;
    var healthItemId = this.data.healthItemId;//健康项目id
    var storeId = this.data.storeId;//门店id
    var categoryId = this.data.categoryId;//类别id
    var url = app.globalData.url + "/healthItem/" + categoryId + "/" + storeId+"/" + healthItemId;
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
            healthItem:res.data.data
          })
        }else{
          console.log("请求健康项目详情信息失败")
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