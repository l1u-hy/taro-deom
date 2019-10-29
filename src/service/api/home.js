import base from './base'
import Page from "../../utils/pagination";
import * as commonFnc from '../../utils/commonFnc'


export default class homeApi extends base {

  /**
   * banner数据
   */
  static banner() {
    let param = {type:0};
    return this.put('/layout/app/read/getList', param).then(res =>{
      return this._processBannerData(res);
    });
  }

  /**
   * banner数据
   */
  static adBanner() {
    let param = {type:4};
    return this.put('/layout/app/read/getList', param).then(res =>{
      return this._processBannerData(res);
    });
  }

  /**
   * 首页展示信息数据
   */
  static layout() {
    let param = {type:2};
    return this.put('/layout/app/read/getList', param).then(res =>{
      return this._processLayoutData(res);
    });
  }


  /**
   * 首页展示在线预约
   */
  static serveList(param) {
    return this.put('/serve/read/getPage', param).then(res =>{
      return this._processGoodsData(res);
    });
  }



  /**
   * 首页展示 推荐明星
   */
  static star() {
    return this.put('/member/read/getList', {}).then(res =>{
      return this._processMemberStarData(res);
    });
  }

  /**
   * 首页提现动态
   */
  static cashList() {
    return this.put('/userCash/read/getList', {}).then(res =>{
      return this._processCashListData(res);
    });
  }


  /**
   * 我的经纪人
   */
  static myAgent() {
    return this.get(`/userAgent/my`,{})
  }



  /**
   * 我的门店
   */
  static store() {
    return this.put(`/stores/read/getList`,{}).then(res => {
      return this._processStoreData(res);
    });
  }

  /**
   * 我的奖励
   */
  static balance() {
    return this.get(`/user/balance`,{});
  }

  /**
   * 我的提现记录
   */
  static  balanceList() {
    return this.get(`/user/balanceRecord`,{}).then(res => {
      return this._processBalanceListData(res);
    });
  };
  /**
   * 提现
   */
  static cash(money) {
    return this.put(`/userCash/update`,{money:money});
  }






  /**==============================格式化数据=============================*/


  /**
   * 处理banner信息
   */
  static _processBannerData(res) {
    let _res = {};
    let _data = [];
    for (let i = 0; i < res.data.length; i++) {
      let __res = {
        id: res.data[i].id,
        title: res.data[i].title,
        url: res.data[i].accessoryList[0] && res.data[i].accessoryList[0].url,
        action:{
          type:'route',
          id:res.data[i].infoId&&res.data[i].infoId,
        }
      };
      _data.push(__res);
    }
    _res.data = _data;

    return _res
  }

  /**
   * 处理navigate信息
   */
  static _processLayoutData(res) {
    let layout = {};
    //导航
    let navigate = {};
    let _navigateData = [];
    //列表
    let list = [];
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].showMenu === 1) {
        let __res = {
          id: res.data[i].id,
          contactId: res.data[i].cateId,
          title: res.data[i].title,
          url:  res.data[i].accessoryList[0] && res.data[i].accessoryList[0].url,
          route:res.data[i].url,
        };
        _navigateData.push(__res);
      } else if (res.data[i].showGrid) {
        let __res = {
          id: res.data[i].id,
          isSecond: res.data[i].cateId ? true : false,
          contactId: res.data[i].cateId || res.data[i].infoId,
          title: res.data[i].title,
          route:res.data[i].url,
        };
        list.push(__res);
      }
    }
    navigate.data = _navigateData;
    layout.navigate = navigate;
    layout.list = list;
    return layout
  }

  static _processGoodsData (res) {
    let list = [];
    if(res.data){
      for (let i= 0; i< res.data.length; i++) {
        let obj = goodsApi._processGoodsData(res.data[i]);
        list.push(obj);
      }
    }
    return list
  }

  static _processCashListData(res) {
    console.log('首页提现动态');
    console.log(res);
    let list = [];
    for (let i= 0; i< res.data.length; i++) {
      let _arr = [];
      if(i === 0 || i%2 ===0 || (res.data.length%2 !==0 &&i === res.data.length - 1)) {
        let _money1 = commonFnc.centToYuan(res.data[i].money);
        let _obj1 = {
          name:res.data[i].user.name.substring(0,1) + '**' +
                res.data[i].user.name.substring(res.data[i].user.name.length - 1,res.data[i].user.name.length),
          money:_money1.toFixed(2),
          time:res.data[i].createTime.substring(5,16)
        };
        _arr.push(_obj1);
        if((i+1) < res.data.length) {
          let _money2 = commonFnc.centToYuan(res.data[i+1].money);
          let _obj2 = {
            name:res.data[i].user.name.substring(0,1) + '**' +
                  res.data[i].user.name.substring(res.data[i].user.name.length - 1,res.data[i].user.name.length),
            money:_money2.toFixed(2),
            time:res.data[i+1].createTime.substring(5,16)
          };
          _arr.push(_obj2)
        }
        list.push(_arr);
      }
    }

    return list
  }

  static _processStoreData(res) {
    let list = [];
    for (let i= 0; i< res.data.length; i++) {
      let _images=[];
      for (let j= 0; j< res.data[i].accessoryList.length; j++) {
        let _image = {
          url:res.data[i].accessoryList[j].url
        };
        _images.push(_image);
      }

      let obj = {
        images:_images,
        name: res.data[i].name,
        address:res.data[i].address,
      };

      list.push(obj);
    }
    return list
  }

  static _processBalanceListData(res) {
    let list = [];
    for (let i= 0; i< res.data.length; i++) {
      let money = res.data[i].type===1 ? `+${commonFnc.centToYuan(res.data[i].money)}` : `-${commonFnc.centToYuan(res.data[i].money)}`;
      let obj = {
        avatar:res.data[i].user.avatar,
        name:res.data[i].user.name,
        createTime:res.data[i].createTime.substring(0,10),
        action:res.data[i].remark,
        money:money,
      }
      list.push(obj);
    }
    return list;
  }

  static _processMemberStarData(res) {
    let list = [];
    for (let i= 0; i< res.data.length; i++) {
      let obj = {
        id:res.data[i].id,
        name:res.data[i].name,
        url:res.data[i].accessoryList[0] && res.data[i].accessoryList[0].url,
        area:res.data[i].area,
        age:res.data[i].age + '岁',
        experience:commonFnc.getConstantValue(SERVE.EXPERIENCE,res.data[i].experience),
        sex:commonFnc.getConstantValue(SERVE.SEX,res.data[i].sex),
        workType:commonFnc.getConstantValue(SERVE.WORK_TYPE,res.data[i].type),
      };
      list.push(obj);
    }
    return list
  }


}
