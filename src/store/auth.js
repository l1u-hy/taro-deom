import Taro from '@tarojs/taro';
import { observable } from 'mobx'
import common from './common'

import authApi from '../service/api/auth'
import CommonFnc from "../utils/commonFnc";

const CACHE_USER = 'cacheUser';
const expireLoginTime = 30 * 1000;

const auth = observable({
  user: initUser()
});

/**
 * 获取用户信息
 */
auth.check = function(param = {block: false, redirect: false}) {
  console.log(param.block);
  console.log(param.redirect);
  // 检查
  if (this.user) {
    return true
  } else {
    // 从未登录
    if (param.block) {
      CommonFnc.goView('/pages/index/login/index', {}, param.redirect)
    }
    return false
  }
};

/**
 * 重新拉取用户信息
 * @returns {Promise<*>}
 */
auth.reload = async function() {
  const res = await authApi.userInfo();
  if(res.code === '200'){
    Taro.setStorageSync(CACHE_USER, res.data)
    this.user =  res.data
  }

  return res.data;
}

/**
 * 联系我们电话号码
 * @returns {Promise<*>}
 */
auth.contact = async function() {
  const res = await authApi.phone();
  return res.data;
}



auth.appLogin = async function(param) {
  const res = await authApi.appLogin(param);
  if(res.code === '200'){
    this.saveUser(res.user);
  }
  return res.user;
}


auth.mppLogin = async function(param) {
  const res = await authApi.wxLogin(param);
  console.log(res);
  if(res.code === '200'){
    this.saveUser(res.user, param.code);
  }
  return res.user;
};

auth.logout = function() {
  this.user = null;
  common.token = null;
  Taro.removeStorageSync(CACHE_USER)
}

auth.saveUser = function(user, code) {
  user.validTime = getTimestamp()
  this.user = user
  common.setToken(user.token)
  code&&common.setWxCode(code)
  Taro.setStorageSync(CACHE_USER, user)
};

auth.certify = function(customer) {
  const user = authApi.certify(customer);
  this.saveUser(user);
};


function initUser() {
  const user = Taro.getStorageSync(CACHE_USER)
  common.setToken(user.token);
  return user
}

function getTimestamp() {
  let timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  console.log("当前时间戳为：" + timestamp);
  return timestamp
}

function expired(data) {
  const now = getTimestamp();
  return (now - data.validTime > expireLoginTime)
}

export default auth
