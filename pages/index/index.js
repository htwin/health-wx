//index.js
//获取应用实例
const app = getApp()
var fileData = require('../../utils/data.js')
var util = require('../../utils/util')

Page({
  data: {
    page:1,
    size:10,
    locationSuccess:false,//是否定位成功
    provinceNameArr:[],//省名列表
    cityNameArr: [],//城市名字 列表
    provinceList:[],//省列表json数据 数据库获取
    cityList1:[],//城市列表json数据  数据库获取
    multiArray:[[],[]],//省市-》 [[省名字],[市名字]]
    multiIndex: [0,0],//省市索引 -》[[省索引],[市索引]]
    title: 'picker',
    index: 0,
    storeList: fileData.getStoreData(),
    cityList:[],
    cityName:"成都市",
    isOpenCity:false,
    //用户所在地的经纬度
    userLongitude:"0",
    userLatitude:"0",
    userCity:"成都市",
    clickIndex:-1,//点击的门店索引
    imgUrl:app.globalData.imgUrl//图片地址
  },
 
  
  onLoad: function () {

    // //判断是否登录
    // var isLogin = wx.getStorageSync("loginUser");
  
    // if (isLogin){
    //   //获取用户地理位置
    //   this.getAddressDetail();
    //   this.getProvinceList();//加载省份 城市 二级联动


    //   //加载城市列表
    //   this.getCityList();

      


      
    // }else{
    //   wx.navigateTo({
    //     url: '/pages/login/login',
    //   })
    // }
    
    
    
  },


  

  /**
   * 获取 省
   */
  getProvinceList(){
    var that = this;
    var url = app.globalData.url + "/province/list";
    wx.request({
      url: url,
      method:"get",
      success:function(res){
        if(res.data.success){
        
          var provinceList = res.data.data;//省列表
          var provinceNameArr = provinceList.map(item=>{//将省名 放入数组中
            return item.name;
          });
          console.log("省份名字列表：" + (provinceNameArr))
          that.setData({
            multiArray: [provinceNameArr,[]],//将省名 数组 存入data
            provinceList: provinceList,//省列表
            provinceNameArr: provinceNameArr//省名数组
          })
          var default_province_id = provinceList[0].id;//默认省id
          if (default_province_id){
            that.getCityListByProvince(default_province_id);//根据省id获取城市列表
          }
        }else{
          console.log("加载省份失败")
        }
      }
    })
  },
  /**
   * 根据 省份 获取 城市列表
   */
  getCityListByProvince(provinceId){
      var that = this;
      var url = app.globalData.url + "/city/list/" + provinceId;
      wx.request({
        url: url,
        method:"get",
        success:function(res){
          if(res.data.success){
           
              var cityList1 = res.data.data;//城市列表
              var cityNameArr = cityList1.map(item=>{// 封装 城市名 数组
                return item.name;
              })
            console.log("城市名字列表：" + (cityNameArr))
              var provinceNameArr = that.data.provinceNameArr;
              that.setData({
                multiArray: [provinceNameArr, cityNameArr],
                cityList1: cityList1,
                cityNameArr: cityNameArr
              })
          }else{
            console.log("根据省份加载城市失败")
          }
        }
      })
  }
  ,

  /**
   * 选择 省份 城市 时改变
   */
  bindMultiPickerColumnChange:function(e){
    this.setData({
      page:1
    })
      console.log("点击的列为:"+e.detail.column+",值为："+e.detail.value);//省份列0 城市列1   值为数组索引
      var data={
        multiArray: this.data.multiArray, 
        multiIndex: this.data.multiIndex
      };
    data.multiIndex[e.detail.column] = e.detail.value;//改变  城市 或者省份 索引 
    var provinceId_session = this.data.provinceId;//获取之前省份id  如果点击了省份列 则id会改变 然后重新加载城市
    switch (e.detail.column){
      case 0://如果选择的省份列
        var provinceList =  this.data.provinceList;
        var provinceId = provinceList[e.detail.value].id//获取点击省份的id
        if (provinceId_session!=provinceId ){
          this.getCityListByProvince(provinceId);//如果换了省份 则重新加载城市
        }
        data.multiIndex[1] = 0;
        break;
      }
    this.setData(data);
  },
  /**
   * 省市联动 点击确定  赋值
   */
  bindMultiPickerChange:function(e){
    //multiArray[1][multiIndex[1]]
   
    this.setData({
      multiIndex: e.detail.value,
      cityName:this.data.multiArray[1][this.data.multiIndex[1]]
    })
   // this.getStoreListByCityName(this.data.cityName);//根据城市名称 获取门店列表
   this.getByCityNameAndLocationPage();
  },
 /**
  * 获取城市列表
  */
  getCityList:function(){
    var that = this;
    var url = app.globalData.url+"/city/list"
      wx.request({
        url: url,
        method:"get",
        success:function(res){
          console.log(res.data)
           if(res.data.success){
             that.setData({
               cityList:res.data.data
             })
           }else{

           }
        }
      })
  },

  /**
     * 获取地理位置信息详情
     */
  getAddressDetail: function () {
    let that = this;
    wx.getLocation({ 
      type: 'wgs84',// 参考系
      success: function (res) {
        that.setData({
          userLatitude:res.latitude,
          userLongitude:res.longitude,
        })

        //将用户经纬度坐标放到 缓存
        var userLocation ={};
        userLocation.userLatitude = res.latitude;
        userLocation.userLongitude = res.longitude;
        wx.setStorage({
          key: 'userLocation',
          data: userLocation,
        })
  
        //获取城市名字
        var qqMapApi = 'https://apis.map.qq.com/ws/geocoder/v1/' + "?location=" + res.latitude + ',' +
          res.longitude + "&key=" + 'WVYBZ-4M33I-ZAFGU-5H3YJ-5PICS-6MFMJ' + "&get_poi=1";

        that.sendRequest(qqMapApi);
       
      },
      fail:function(res){
        wx.showModal({
          showCancel: false,
          content: '定位失败，请检查网络或打开GPS',
        })
      }
      
    })
  },
  /**
 * 发送请求获取地图接口的返回值
 */
  sendRequest: function (qqMapApi) {
    let that = this;
    // 调用请求
    wx.request({
      url: qqMapApi,
      data: {},
      method: 'GET',
      success: (res) => {
        console.log("定位的城市"+res.data.result.address_component.city)
        if (res.statusCode == 200 && res.data.status == 0) {
          that.setData({
            locationSuccess:true
          })
          //根据城市名字获取门店列表
          //this.getStoreListByCityName(res.data.result.address_component.city)

          
          that.setData({
            userCity: res.data.result.address_component.city,
            cityName: res.data.result.address_component.city
          })

          //根据城市名称   用户当前位置 获取门店列表 按照距离排序
          this.getByCityNameAndLocationPage();
          
          // 从返回值中提取需要的业务地理信息数据
          // that.setData({ nation: res.data.result.address_component.nation });
          // that.setData({ province: res.data.result.address_component.province });
          // that.setData({ city: res.data.result.address_component.city });
          // that.setData({ district: res.data.result.address_component.district });
          // that.setData({ street: res.data.result.address_component.street });
        }else{
          wx.showModal({
            showCancel: false,
            content: '定位失败，请检查网络或打开GPS',
          })
        }
      },
      fail:function(){
        wx.showModal({
          showCancel: false,
          content: '定位失败，请检查网络或打开GPS',
        })
      }
    })
  },
  
  /**
   * 根据城市名称   用户当前位置 获取门店列表 按照距离排序
   */
  getByCityNameAndLocationPage:function(){
    var that = this;
    var cityName = this.data.cityName;
    var latitude = this.data.userLatitude;
    var longitude = this.data.userLongitude;
    var page = this.data.page;
    var size = this.data.size;
    var url = app.globalData.url + "/store/storeListByCityNamePage/"+cityName+"/"+latitude+"/"+longitude+"/"+page+"/"+size;

    //打开加载中提示
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: url,
      method: "get",
      success: function (res) {

        wx.hideLoading();//关闭加载中
        if (res.data.success) {
          //如果是第一页
          if(page==1){
            that.setData({
              storeList: res.data.data
            })
          }else{
            var storeList = that.data.storeList;
            that.setData({
              storeList: storeList.concat(res.data.data)
            })
          }
         
        } else {

        }
      }
    })

  }
  ,
  /**
   * 根据城市名字获取门店列表
   */
  getStoreListByCityName:function(cityName){
    var url = app.globalData.url + "/store/storeListByCityName?cityName=" + cityName;
    var that = this;
    //打开加载中提示
    wx.showLoading({
      title: '加载中',
    })
    
    wx.request({
      url: url,
      method: "get",
      success: function (res) {
        
        wx.hideLoading();//关闭加载中
        if (res.data.success) {
          that.setData({
            storeList: res.data.data
          })
        } else {

        }
      }
    })
  },

  /**
   * 根据城市id查询门店列表
   */
  getStoreListByCityId:function(cityId){
    var url = app.globalData.url +"/store/storeListByCityId?cityId="+cityId;
    var that = this;
      wx.request({
        url: url,
        method:"get",
        success:function(res){
          if(res.data.success){
            that.setData({
              storeList:res.data.data
            })
          }else{

          }
        }
      })
  },
  /**
   * 跳转到我的消息界面
   */
  toMessage:function(){
    wx.navigateTo({
      url: '/pages/message/message',
    })
  },
  /**
   * 跳转到选择服务项目界面
   */
  toService:function(e){
    console.log(e.currentTarget.dataset.index)
    this.setData({
      clickIndex:e.currentTarget.dataset.index
    })
      wx.navigateTo({
        url: '/pages/toService/toService?storeId=' + e.currentTarget.dataset.id,
      })
  },
  /**
   * 跳转到门店详情界面
   */
  toStoreDetail:function(e){
    wx.navigateTo({
      url: '/pages/store/store?storeId=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 跳转到搜索界面
   */
  tapSearch:function(){
    wx.navigateTo({
      url: '/pages/search/search?cityName='+this.data.cityName,
    })
  },
  // 加载更多
  loadMore: function (e) {
    this.setData({
      page:this.data.page+1
    })
    this.getByCityNameAndLocationPage();//加载新的门店列表
    console.log('加载更多')
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      clickIndex:-1
    })
      console.log("页面隐藏")
  },
  onShow:function(){
    //判断是否登录
    var isLogin = wx.getStorageSync("loginUser");

    if (isLogin) {
      //获取用户地理位置
      this.getAddressDetail();
      this.getProvinceList();//加载省份 城市 二级联动

      //加载城市列表
      this.getCityList();

    } else {

      wx.showModal({
        title: '提示',
        content: '请登录，点击确定跳转到登录界面',
        
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })


      
    }
  }
 
})
