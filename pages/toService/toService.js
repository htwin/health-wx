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
  },
  toProject:function(){
      wx.navigateTo({
        url: '/pages/toProject/toProject',
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