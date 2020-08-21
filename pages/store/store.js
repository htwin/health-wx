// pages/store/store.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store: {},//门店实体
    imgDetail:[],
    imgUrl: app.globalData.imgUrl//图片地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    
    // console.log("size::" + this.imgDetail.length);
    //获取传过来的id
    var storeId = e.storeId;
    if (storeId != undefined) {
      //根据id查询门店信息
      this.getStoreById(storeId);
    
      // this.setData({
      //   imgDetail : this.store.imgDetail.split(",")
      // })
      // console.log(this.imgDetail)
     
    } else {
      wx.showToast({
        title: '异常id.undefined',
      })
    }
  },
  /**
  * 根据id查询门店
  */
  getStoreById: function (storeId) {
    var that = this;
    var url = app.globalData.url + "/store/" + storeId;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      method: "get",
      success: function (res) {
        if (res.data.success) {
          wx.hideLoading();
          if (res.data.data.imgDetail!=null){
            that.setData({
              store: res.data.data,
              imgDetail: res.data.data.imgDetail.split(",")
            })
          }else{
            that.setData({
              store: res.data.data,
              
            })
          }
         
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '系统错误！！',
            icon: "loading"
          })
        }
      }
    })
  },
  /**
   * 拨打电话
   */
  CallPhone:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.store.telephone,
    })
  }
  ,
  /**
   * 跳转到选择服务项目界面
   */
  toService: function (e) {

    wx.navigateTo({
      url: '/pages/toService/toService?storeId=' + this.data.store.id,
    })
  },

  /**
   * 打开地图
   */
  openMap:function(){
    
        wx.openLocation({
          latitude: this.data.store.latitude,
          longitude: this.data.store.longitude,
          scale: 18,
          name: this.data.store.address
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