import Taro from '@tarojs/taro'
import '@tarojs/async-await'

const PAGE_LEVEL_LIMIT = 10;

export default class CommonFnc {

  static goView(url, params={}, redirect=false) {
    return this.gotoPage(url, params, redirect?{method:'redirectTo'}:{})
  }
  //去跳转
  static gotoPage(url, params={}, options={}) {
    const pages = Taro.getCurrentPages();
    let method = options.method || 'navigateTo';
    if (url && typeof url === 'string') {
      if (method === 'navigateTo' && pages.length >= PAGE_LEVEL_LIMIT - 3) {
        method = 'redirectTo'
      }

      if (method === 'navigateToByForce') {
        method = 'navigateTo'
      }

      if (method === 'navigateTo' && pages.length === PAGE_LEVEL_LIMIT) {
        method = 'redirectTo'
      }

      let extend = '';
      for (let key in params) {
        extend += '&'+key+'='+params[key];
      }
      if (extend.length) {
        url += '?'+extend.substr(1, extend.length-1)
      }

      Taro[method]({url})
    }
  }

  //取得屏幕的尺寸
  static getScreenSize() {
    let res = Taro.getSystemInfoSync();
    let _Size = {
      width:res.windowWidth,
      height:res.windowHeight
    }
    return _Size;
  }
  //字符串转数组
  static stringToArr(str) {
    if(str) {
      let arr = [];
      arr = str.split('，');
      if(arr.length === 1) {
        arr = str.split(',');
      }
      let _arr = [];
      for(let i= 0; i< arr.length; i++) {
        let _value = arr[i];
        _arr.push(_value);
      }
      return  _arr;
    }else {
      return '';
    }
  }
  //数组转字符串
  static arrToString(arr) {
    let _str = '';
    for(let i= 0; i< arr.length;i++) {
      if(i == arr.length - 1){
        _str += arr[i]
      }else {
        _str += arr[i] + ','
      }
    }
    return _str;
  }
  /*将价格从元转成分*/
  static yuanToCent(yuan) {
    return yuan * 100;
  }
  /*将价格从分转成元*/
  static centToYuan(cent) {
    let res = parseInt(cent)/100;
    res = res.toFixed(2);
    return res;
  }
  /*米转换千米*/
  static mToKm(m) {
    let km = m/1000
    let _km = km.toFixed(1)
    return _km;
  }


  /**
   * 调用时不用把参数补全; getValue(array, key) 一样可以调用
   * @param array 数组
   * @param key 指定的数值
   * @returns {string|string|string}
   */
  static getConstantValue(array, key, strKey, strValue) {
    let result = 0;
    let _strKey = 'id';
    let _strValue = 'value';
    if(strKey) {
      _strKey = strKey;
    }
    if(strValue) {
      _strValue = strValue;
    }
    if (array) {
      for (let item of array) {
        if (key == item[_strKey]) {
          result = item[_strValue];
        }
      }
    }
    return result;
  }

  static compIs(c, ...types) {
    if (c && c.is) {
      let i = parseInt(c.is)
      if (types && types.length) {
        for (let j = 0; j < types.length; j++) {
          if (!(types[j]&i)) {
            return false
          }
        }
        return true
      }
    }
  }

  static compType(c, type) {
    if (c) {
      return parseInt(c.type) === type
    }
  }
  /**
   * @param {String|Number} value 要验证的字符串或数值
   * @param {*} validList 用来验证的列表
   */
  static oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value.url === validList[i].url) {
        return true
      }
    }
    return false
  }

  static dateFormat(fmt,date) {
    var o = {
      "M+" : date.getMonth()+1,                 //月份
      "d+" : date.getDate(),                    //日
      "h+" : date.getHours(),                   //小时
      "m+" : date.getMinutes(),                 //分
      "s+" : date.getSeconds(),                 //秒
      "q+" : Math.floor((date.getMonth()+3)/3), //季度
      "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
      fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
      if(new RegExp("("+ k +")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
  };

  /*找到数组中某个值的下标*/
  static findArrIndex(value,arr) {
    for(let i = 0;i < arr.length;i++) {
      if(arr[i].id === value) {
        return i;
      }
    }
    return -1
  }

  static findArrIndex2(value,arr) {
    for(let i = 0;i < arr.length;i++) {
      if(arr[i] === value) {
        return i;
      }
    }
    return -1
  }


  static getImgFromRichText = function(str){
    let data = '';
    str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, (match, capture) => {
      data =  capture;
    });
    return data
  }

  static removeTAG(str) {
    let content = str&&str.replace(/<[^>]+>/g, "");
    content = content.length > 20 ? content.substring(0,20) + '...' : content;
    return content
  }

  static showTimeByDate(dateTime){
    let show_day=new Array('星期一','星期二','星期三','星期四','星期五','星期六','星期日');
    let time=new Date(dateTime);
    let month=time.getMonth();
    let date=time.getDate();
    let day=time.getDay();

    month=parseInt(month)+1;
    month<10 ? month= '0'+ month : month;
    date<10 ? date= '0'+ date : date;

    let now_time=month+'.'+date+' '+show_day[day-1];
    return now_time
  }

  static showTime(){
    let show_day=new Array('星期一','星期二','星期三','星期四','星期五','星期六','星期日');
    let time=new Date();
    let month=time.getMonth();
    let date=time.getDate();
    let day=time.getDay();

    month=parseInt(month)+1;
    month<10 ? month= '0'+ month : month;
    date<10 ? date= '0'+ date : date;

    let now_time=month+'.'+date+' '+show_day[day-1];
    return now_time
  }

  static showTimeBig(){
    let time=new Date();
    let month=time.getMonth();
    let date=time.getDate();
    let day=time.getDay();

    month=parseInt(month)+1;
    month<10 ? month= '0'+ month : month;
    date<10 ? date= '0'+ date : date;

    let now_time=month+'月'+date+'日';
    return now_time
  }


  static getTabs(str) {
    let tabs = str.replace(',',' · ');
    return tabs
  }

  static accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1= arg1.toString().split(".")[1].length;}catch(e){r1=0}

    try{r2= arg2.toString().split(".")[1].length;}catch(e){r2=0}
    m = Math.pow(10,Math.max(r1,r2));
    return(arg1*m+arg2*m)/m;
  }

  static accMul(arg1,arg2) {
    var r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];
    m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0);
    resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);
    return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
  }

  static accDiv(arg1,arg2){
    var r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];
    m = (r2.split(".")[1] ? r2.split(".")[1].length : 0) - (r1.split(".")[1] ? r1.split(".")[1].length : 0);
    resultVal = Number(r1.replace(".", "")) / Number(r2.replace(".", "")) * Math.pow(10, m);
    return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));

  }
}
