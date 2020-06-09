// pages/toProject/toProject.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //默认为休闲放松
      categoryId:"1",
      categoryList:[],//类别列表
      storeId:"1243881972120555520",//门店id
      healthItemList:[],//健康项目列表
      startTime:"",//服务开始时间
  },
  onLoad:function(e){

      //获取所有健康项目 类别
      this.getHealthCategoryList();
      //获取传过来的门店id  
      this.setData({
        //storeId: e.storeId,
        startTime: e.startTime
      })

      //根据门店id和类别id查询项目列表  
      this.getByCategoryIdAndStoreId(this.data.categoryId, this.data.storeId);
      
      
  },
  /**
   * 获取所有健康项目类别
   */
  getHealthCategoryList:function(){
    var that = this;
    var url = app.globalData.url + "/healthCategory/list/";
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
              categoryList:res.data.data
            })
        }else{
          console.log("获取类别失败")
        }
      }
    })
  }
  ,
  
  /**
   * 根据门店id和类别id查询项目列表
   */
  getByCategoryIdAndStoreId(categoryId,storeId){  
    var that = this;
    var url = app.globalData.url + "/healthItem/list/" + categoryId + "/" + storeId;
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
              healthItemList:res.data.data
            })
        }
      }
    })
  },
  /**
   * 触发选择类别事件
   */
  changeCategory:function(e){
    var selectId = e.currentTarget.dataset.id;
    this.setData({
      categoryId: selectId
    })
    this.getByCategoryIdAndStoreId(this.data.categoryId, this.data.storeId)
  }
  ,
  /**
   * 跳转到项目详情页面
   */
  toProjectInfo:function(e){
    var healthItemId = e.currentTarget.dataset.id;//健康项目id
    var storeId = this.data.storeId;//门店id
    var categoryId = this.data.categoryId;//类别id
      wx.navigateTo({
        url: '/pages/projectInfo/projectInfo?healthItemId=' + healthItemId + "&storeId=" + storeId + "&categoryId=" + categoryId,
      })
  },
  toTechnician:function(e){
    var healthItemId = e.currentTarget.dataset.id;//健康项目id
    var storeId = this.data.storeId;//门店id
    var startTime = this.data.startTime;//服务开始时间
    var serviceTime = e.currentTarget.dataset.servicetime;//服务时间  分钟
    wx.navigateTo({
      url: '/pages/toTechnician/toTechnician?storeId=' + storeId + "&healthItemId=" + healthItemId + "&startTime=" + startTime + "&serviceTime=" + serviceTime,
    })
  }
  
})