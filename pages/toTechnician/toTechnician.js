// pages/toTechnician/toTechnician.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toTechnicianDetail:function(){
    wx.navigateTo({
      url: '/pages/technicianDetail/technicianDetail',
    })
  }

})