// pages/toTechnician/toTechnician.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    healthItemId: "",//健康项目id
    storeId: "",//门店id
    technicianList:[],//技师列表
    startTime:"",//服务开始时间
    serviceTime:0,//服务时间 分钟
    baseImgUrl:"http://localhost"//图片地址
  }, 
  onLoad:function(e){
    //赋值 携带的参数
    this.setData({
      healthItemId: e.healthItemId,
      storeId: e.storeId,
      startTime:e.startTime,
      serviceTime:e.serviceTime
    })

    //获取技师列表
    this.getTechniciansByStoreIdAndHealthItemId()
  },

  /**
   * 根据门店id和健康项目item id查询技师列表  （技师属于一个门店 ，会多个健康项目）
   */
  getTechniciansByStoreIdAndHealthItemId:function(){

    var that = this;
    var healthItemId = this.data.healthItemId;//健康项目id
    var storeId = this.data.storeId;//门店id
    var url = app.globalData.url + "/healthCareProvider/list/" + storeId + "/" + healthItemId;

    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      method:"get",
      success: function (res){
        wx.hideLoading();
        if(res.data.success){
          that.setData({
            technicianList:res.data.data
          })
        }else{
          console.log("请求技师列表失败！！")
        }
      }
    })

  }
  ,
  toTechnicianDetail:function(e){
    var technicianId = e.currentTarget.dataset.id;//技师id
    var price = e.currentTarget.dataset.price;
   
    var healthItemId = this.data.healthItemId;//健康项目id
    var storeId = this.data.storeId;//门店id
    var startTime = this.data.startTime;//服务开始时间
    var serviceTime = this.data.serviceTime;//服务时间 分钟


    wx.navigateTo({
      url: '/pages/technicianDetail/technicianDetail?technicianId=' + technicianId + "&healthItemId=" + healthItemId + "&storeId=" + storeId + "&startTime=" + startTime + "&price=" + price + "&serviceTime=" + serviceTime,
    })
  }

})