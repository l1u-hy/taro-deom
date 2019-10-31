import Taro from '@tarojs/taro';
import { observable } from 'mobx'
import homeApi from '../service/api/home'
import Tips from '../utils/tips'

const ROUTE_PARAM = 'routeParam';
const TAB_BAR_PARAM = 'tabBarParam';
const SHARE_ID = 'shareId';

const DRUGS = 'drugs'
const newDrug = {
  id: '0',
  imgUrl: 'http://img2.imgtn.bdimg.com/it/u=1669904876,2411010804&fm=26&gp=0.jpg',
  size: 'normal',
  name: '诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯',
  price: '128',
  num: '1234',
}
const reCommendDrugs = [
  {
    id: '1',
    imgUrl: 'http://img4.imgtn.bdimg.com/it/u=1027220203,1794872175&fm=26&gp=0.jpg',
    size: 'small',
    name: '诺祯DHA藻油小袋熊牌诺祯DHA',
    price: '128',
    num: '1234',
  },
  {
    id: '2',
    imgUrl: 'http://img0.imgtn.bdimg.com/it/u=2054288585,3297966539&fm=26&gp=0.jpg',
    size: 'small',
    name: '诺祯DHA藻油小袋熊牌诺祯DHA',
    price: '128',
    num: '1234',
  },
  {
    id: '3',
    imgUrl: 'http://img5.imgtn.bdimg.com/it/u=2172777853,3262388300&fm=26&gp=0.jpg',
    size: 'small',
    name: '诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯',
    price: '128',
    num: '1234',
  },
  {
    id: '4',
    imgUrl: 'http://img4.imgtn.bdimg.com/it/u=1901455908,1974132964&fm=26&gp=0.jpg',
    size: 'small',
    name: '诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯',
    price: '128',
    num: '1234',
  },
  {
    id: '5',
    imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2308532487,3045423790&fm=26&gp=0.jpg',
    size: 'small',
    name: '诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯',
    price: '128',
    num: '1234',
  },
  {
    id: '6',
    imgUrl: 'http://img0.imgtn.bdimg.com/it/u=3273464959,3880466769&fm=26&gp=0.jpg',
    size: 'small',
    name: '诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯',
    price: '128',
    num: '1234',
  }
]
const drugList = [newDrug, ...reCommendDrugs].map(drug => ({
  ...drug,
  count: 0,
  isSelect: false,
  isOpened: false,
}))

const home = observable({
  routeParam: Taro.getStorageSync(ROUTE_PARAM) || {},
  tabBarParam: Taro.getStorageSync(TAB_BAR_PARAM) || 0,
  shareId: Taro.getStorageSync(SHARE_ID) || 0,
  drugs: Taro.getStorageSync(DRUGS) || [],
  newDrug,
  reCommendDrugs,
});

home.init = function () {
  
};

/**
 * 获取布局信息
 */
home.getLayout = async function () {
  let layout = {};
  //banner
  let banner = await homeApi.banner();
  banner.type = 'card';
  layout.banner = banner;


  //banner
  let adBanner = await homeApi.adBanner();
  adBanner.cls = 'addSwipe';
  layout.adBanner = adBanner;


  //导航栏
  let _lay = await homeApi.layout();
  layout.navigate = _lay.navigate;

  //推荐明星
  let star = await homeApi.star();
  layout.star = {
    layout: 'MINI',
    data: star
  }

  //在线预约
  let serve = await homeApi.serveList({});
  layout.serve = {
    layout: 'ROW',
    title: '在线预约',
    data: serve
  };

  return layout;
};

/**
 * 保存路由跳转的参数信息
 */
home.setParam = function (contactId, param) {
  this.routeParam[contactId] = param;
  Taro.setStorageSync(ROUTE_PARAM, this.routeParam);
};

/**
 * 跳转到tabbar页面参数信息
 */
home.setTabBarParam = function (idx) {
  this.tabBarParam = { current: idx };
  Taro.setStorageSync(TAB_BAR_PARAM, this.tabBarParam);
};


/**
 * 保存分享的ShareId
 */
home.saveShareId = function (shareId) {
  this.shareId = shareId;
  Taro.setStorageSync(SHARE_ID, shareId)
};

/**
 * 删除分享的ShareId
 */
home.clearShareId = function () {
  this.shareId = 0;
  Taro.setStorageSync(SHARE_ID, 0)
};

/**
 * 写入drugs缓存
 */
home.setDrugsStorage = function (drugs = drugList) {
  Taro.setStorage({
    key: DRUGS,
    data: drugs,
  })
}

/**
 * 读入drugs缓存
 */
home.getDrugsStorage = function () {
  this.drugs = Taro.getStorageSync(DRUGS)
}

/**
 * 点击商品，添加到购物车
 */
home.handleAddToShoppingCart = async function (id) {
  await Tips.confirm("确认加入购物车")
  // 修改drugs缓存
  this.drugs.forEach(drug => {
    if (drug.id === id) {
      drug.count = drug.count + 1;
    }
  })
  this.setDrugsStorage(this.drugs)
  Tips.success('添加到购物车')
}



export default home
