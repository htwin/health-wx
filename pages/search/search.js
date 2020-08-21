// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationSuccess:false,
    searchValue:"",
    cityName:"",//城市名
    page:1,//当前页
    size:5,//分页 每页数量
    storeList:[],//门店列表
    store:{},//门店实体
    //用户所在地的经纬度
    userLongitude: "0",
    userLatitude: "0",
    clickIndex: -1,//点击的门店索引
    imgUrl: app.globalData.imgUrl//图片地址
  },

  getInputValue:function(e){
    this.setData({
      searchValue: e.detail.value
    })
    this.doSearch();//搜索  输入一个字 就搜索
    
  },

  /**
   * 搜索
   */
  doSearch:function(){
    var that = this;
    var latitude = this.data.userLatitude;
    var longitude = this.data.userLongitude;
    var page = this.data.page;//当前页
    var size = this.data.size;//每页大小
    var cityName = this.data.cityName;
    var store = this.data.store;
    store.name = this.data.searchValue;//关键词
    var url = app.globalData.url+"/store/search/"+cityName+"/"+page+"/"+size;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      method:"post",
      data:store,
      success:function(res){
        wx.hideLoading()
        if(res.data.success){
          that.setData({
            storeList: res.data.data
          })
            
        }else{
          wx.showModal({
            showCancel: false,
            content: '系统错误',
          })
        }
      }
    })
    console.log(this.data.searchValue);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    //获取用户所在地的经纬度
    wx.getStorage({
      key: 'userLocation',
      success: function(res) {
        that.setData({
          userLongitude: res.data.userLongitude,
          userLatitude: res.data.userLatitude,
          locationSuccess:true
        })
      },
      fail:function(){
        wx.showModal({
          showCancel: false,
          content: '定位失败，请检查网络或GPS',
        })
        that.setData({
          locationSuccess:false
        })
      }
    })
    
    //获取当前选择的城市名字
    this.setData({
      cityName: e.cityName
    })
    console.log("获取到的城市："+e.cityName)

    this.doSearch();//搜索
     
  },

  /**
   * 跳转到选择服务项目界面
   */
  toService: function (e) {
    this.setData({
      clickIndex: e.currentTarget.dataset.index
    })
    wx.navigateTo({
      url: '/pages/toService/toService?storeId=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 跳转到门店详情界面
   */
  toStoreDetail: function (e) {
    wx.navigateTo({
      url: '/pages/store/store?storeId=' + e.currentTarget.dataset.id,
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
    this.setData({
      clickIndex: -1
    })
    console.log("页面隐藏")
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