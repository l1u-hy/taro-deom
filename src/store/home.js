import Taro from '@tarojs/taro';
import { observable } from 'mobx'
import homeApi from '../service/api/home'

const ROUTE_PARAM = 'routeParam';
const TAB_BAR_PARAM = 'tabBarParam';
const SHARE_ID = 'shareId';

const home = observable({
  routeParam:Taro.getStorageSync(ROUTE_PARAM) || {},
  tabBarParam:Taro.getStorageSync(TAB_BAR_PARAM) || 0,
  shareId:Taro.getStorageSync(SHARE_ID) || 0,
});

home.init = function() {

};

/**
 * 获取布局信息
 */
home.getLayout = async function() {
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
    layout:'MINI',
    data:star
  }

  //在线预约
  let serve = await homeApi.serveList({});
  layout.serve = {
    layout:'ROW',
    title:'在线预约',
    data:serve
  };

  return layout;
};

/**
 * 保存路由跳转的参数信息
 */
home.setParam  = function (contactId,param) {
  this.routeParam[contactId] = param;
  Taro.setStorageSync(ROUTE_PARAM,this.routeParam);
};

/**
 * 跳转到tabbar页面参数信息
 */
home.setTabBarParam  = function (idx) {
  this.tabBarParam = {current:idx};
  Taro.setStorageSync(TAB_BAR_PARAM,this.tabBarParam);
};


/**
 * 保存分享的ShareId
 */
home.saveShareId = function (shareId) {
  this.shareId = shareId;
  Taro.setStorageSync(SHARE_ID,shareId)
};

/**
 * 删除分享的ShareId
 */
home.clearShareId = function () {
  this.shareId = 0;
  Taro.setStorageSync(SHARE_ID,0)
};


export default home
