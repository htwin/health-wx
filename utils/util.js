function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 转换地址数据
 * */
function replacePhone(arr, isreplace) {
  var newAddr = []
  for (let i = 0; i < arr.length; i++) {
    if (isreplace) {
      let phone = arr[i].phone
      arr[i].phone = phone.replace(phone.substring(3, 7), '****')
    }
    newAddr[i] = arr[i].name + ' ' + arr[i].phone + '\n' + arr[i].province + arr[i].city + arr[i].addr
  }

  return newAddr
}
function distance(la1, lo1, la2, lo2) {

  var La1 = la1 * Math.PI / 180.0;

  var La2 = la2 * Math.PI / 180.0;

  var La3 = La1 - La2;

  var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;

  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));

  s = s * 6378.137;//地球半径

  s = Math.round(s * 10000) / 10000;

  // console.log("计算结果", s)

  return s

}
module.exports = {
  formatTime: formatTime,
  replacePhone: replacePhone,
  distance: distance
}
