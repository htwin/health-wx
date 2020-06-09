// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      telephone:"",//电话号码
      code:"",
      isSend:false//是否发送了验证码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 手机号绑定输入
   */
  getTelephoneInpt:function(e){
      this.setData({
        telephone:e.detail.value
      })
  },
/**
 * 验证码绑定输入
 */
  getCodeInpt: function (e) {
    this.setData({
      code: e.detail.value
    })
  },

  /**
   * 获取验证码
   */
  getCode:function(){
    var that = this;
    var isSend = this.data.isSend;

    if(isSend){
      wx.showModal({
        showCancel: false,
        content: "您已发送验证码。。",
      })
      return;
    }

    var tel = this.data.telephone;
    if(tel==""||tel==undefined){
      wx.showModal({
        showCancel:false,
        content: '请输入手机号',
      })
    }else{
      var url = app.globalData.url + "/sms/" + tel;
      wx.showLoading({
        title: '正在发送',
      })
      wx.request({
        url: url,
        method:"get",
        success:function(res){
          if(res.data.success){
            wx.hideLoading();
              wx.showToast({
                title: '发送成功',
              })
            that.setData({
              isSend: true
            })

          }else{
              console.log("发送验证码失败")
          }
        }
      })
    }
  },
  /**
   * 登录注册
   */
  loginOrRegister:function(){
    var that = this;
    var tel = that.data.telephone;
    var code = that.data.code;
    var isSend = that.data.isSend;

    if(tel==""||tel==undefined||(tel+"").length<11){
      wx.showModal({
        showCancel: false,
        content: "请输入正确的手机号",
      })
      return;
    }
    if(code==""||code==undefined){
      wx.showModal({
        showCancel: false,
        content: "请输入验证码",
      })
      return;
    }
   
    //服务端 登录url
    var url = app.globalData.url + "/user/loginOrRegister?code="+that.data.code;
    var user = {};
    user.telephone = +that.data.telephone;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      method:"post",
      data: user,
      success:function(res){
        
        wx.hideLoading();
        if(res.data.success){//登录成功
          var loginUser = res.data.data;
            wx.setStorage({//将登录的用户信息存入本地缓存
              key: 'loginUser',
              data: loginUser,
            })
          wx.reLaunch({
              url: '/pages/index/index',
            })
        }else{
          wx.showModal({
           showCancel:false,
            content: res.data.message,
          })
          that.setData({
            isSend :false
          })
          console.log("登录失败！！！")
        }
      }
    })
  },
  
})