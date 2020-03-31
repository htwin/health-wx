// pages/toProject/toProject.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toProjectInfo:function(){
      wx.navigateTo({
        url: '/pages/projectInfo/projectInfo',
      })
  },
  toTechnician:function(){
    wx.navigateTo({
      url: '/pages/toTechnician/toTechnician',
    })
  }
  
})