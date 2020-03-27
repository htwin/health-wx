//index.js
//获取应用实例
const app = getApp()
var fileData = require('../../utils/data.js')
var util = require('../../utils/util')
Page({
  data: {
    title: 'picker',
    casArray: ['美发', '美容', '美甲', '美睫'],
    index: 0,
   
    skillData: fileData.getSkilledData(),
  },

  onLoad: function () {
    var that = this
    that.setData({
      list: that.data.skillData
    })
   
  },
  toMessage:function(){
    wx.navigateTo({
      url: '/pages/message/message',
    })
  },
  toService:function(){
      wx.navigateTo({
        url: '/pages/toService/toService',
      })
  },
  toStoreDetail:function(){
    wx.navigateTo({
      url: '/pages/store/store',
    })
  },
  tapSearch:function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 加载更多
  loadMore: function (e) {
    console.log('加载更多')
    if (this.data.skillData.length === 0) return
    var that = this
    // 由于是模拟数据，加载更多时候，数据重复加载
    that.data.skillData = that.data.skillData.concat(that.data.skillData)
    that.setData({
      list: that.data.skillData,
    })
  }
 
})
