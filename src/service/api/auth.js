import base from './base'

export default class authApi extends base {

  /**
   * 微信授权登录
   */
  static wxLogin(param) {
    return this.post('/appLogin/app/login/wx', param);
  }

  /**
   * 手机验证码登陆
   */
  static appLogin(param) {
    return this.post('/appLogin/login', param);
  }

  /**
   * 发送验证码
   */
  static sms(param){

    return this.post('/appLogin/login/getSMSCode', param);
  }


  /**
   * 用户信息
   */
  static userInfo() {
    return this.get(`/user/read/current`,{});
  }


  /**
   * 获取电话号码
   */
  static phone() {
    return this.put('/contact/read/getPage', {});
  }


}
