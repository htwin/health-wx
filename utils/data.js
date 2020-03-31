/**
 * 城市列表
 */
function getCityList() {
  var cityList = [{
    id: "11",
    name: "成都市",
    province_id: "1",

  }, {
    id: "1121",
    name: "德阳市",
    province_id: "1",

  },
    {
      id: "21",
      name: "绵阳市",
      province_id: "1",

    }]
  return cityList;
}

/**
 * 门店数据
 */
function getStoreData() {
  var arr = [{
      "id": "111",
      "name": "国际店(NO.24)",
      "address": "成都市金牛区沙湾东二路6号",
      "telephone": "18283879881",
      "img": "../../images/store1.png",
      "businessHours": "10:00-23:59",
      "cityId": "1",
      "countyId": "1",
      "cityName": "成都市",
      "countyName": "金牛区",
      "longitude": "104.0529300000",
      "latitude": "30.6901500000"
    },
    {
      "id": "222",
      "name": "武侯店(NO.24)",
      "address": "四川省成都市武侯区天府大道北段1700号",
      "telephone": "18283879881",
      "img": "../../images/store1.png",
      "businessHours": "10:00-23:59",
      "cityId": "1",
      "countyId": "1",
      "cityName": "成都市",
      "countyName": "武侯区",
      "longitude": "104.0647600000",
      "latitude": "30.5702000000"
    },
    {
      "id": "333",
      "name": "金堂店(NO.4)",
      "address": "四川省成都市金堂县河坝街",
      "telephone": "18283879881",
      "img": "../../images/store1.png",
      "businessHours": "10:00-23:59",
      "cityId": "1",
      "countyId": "1",
      "cityName": "成都市",
      "countyName": "金牛区",
      "longitude": "104.4415283200",
      "latitude": "30.8480054700"
    },
  ]
  return arr;
}



/*
 * 对外暴露接口
 */
module.exports = {


  getStoreData: getStoreData,
  getCityList: getCityList
}