const app = getApp()
const date = new Date()
const years = []
const months = []
const days = []
const hs = []
const ms = []

console.log("当前时间：："+date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日");
for (let i = date.getFullYear(); i <= date.getFullYear()+1; i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= new Date(date.getFullYear(), date.getMonth() + 1,0).getDate(); i++) {
  days.push(i)
}
for(let i=10;i<=23;i++){
  hs.push(i);
}
for(let i=0;i<=59;i++){
  ms.push(i);
}

Page({
  data: {
    storeList:[],
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth()+1,
    days: days,
    day: date.getDate(),
    hs:hs,
    h:10,
    ms:ms,
    m:0,
    value: [0,date.getMonth(),date.getDate()-1,0,0],
    store:{}
  },

  onLoad:function(e){
     
      //获取传过来的id
      var storeId = e.storeId;
     
      if(storeId!=undefined){
        //根据id查询门店信息
        this.getStoreById(storeId);
      }else{
        wx.showToast({
          title: '异常id.undefined',
        })
      }
    
      
  },

  /**
   * 根据id查询门店
   */
  getStoreById: function(storeId){
      var that = this;
      var url = app.globalData.url+"/store/"+storeId;
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: url,
        method:"get",
        success:function(res){
          if(res.data.success){
            wx.hideLoading();
            that.setData({
              
              store:res.data.data
            })
          }else{
            wx.hideLoading()
            wx.showToast({
              title: '系统错误！！',
              icon:"loading"
            })
          }
        }
      })
  },

  toProject:function(){
      var year = this.data.year;
      var month = this.data.month;
      var day = this.data.day;
      var h = this.data.h;
      var m = this.data.m;
      var startTime = year+"-"+month+"-"+day+"-"+h+":"+(m>9?m:"0"+m);//服务开始时间
      wx.navigateTo({
        url: '/pages/toProject/toProject?storeId=' + this.data.store.id + "&startTime=" + startTime,
      })
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      h:this.data.hs[val[3]],
      m:this.data.ms[val[4]]
    })
  }
})