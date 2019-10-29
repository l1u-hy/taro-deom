import Taro from '@tarojs/taro'
import CommonFnc from "./commonFnc";


export default class Routes {

  /**
   * 登陆注册页面
   * @param params
   * @param options
   */
  static toLogin(params={}, options={}){
    CommonFnc.gotoPage('/pages/index/login/index',params, options)
  }

  /**
   * 信息详情
   * @param params
   * @param options
   */
  static toInfoDetail(params={}, options={}){
    CommonFnc.gotoPage('/pages/info/detail/index',params, options)
  }

  /**
   * 商品列表
   * @param params
   * @param options
   */
  static toGoodsList(params={}, options={}){
    CommonFnc.gotoPage('/pages/goods/list/index',params, options)
  }

  /**
   * 商品详情
   * @param params
   * @param options
   */
  static toGoodsDetail(params={}, options={}){
    CommonFnc.gotoPage('/pages/goods/detail/index',params, options)
  }

  /**
   * 商品检索
   * @param params
   * @param options
   */
  static toGoodsSearch(params={}, options={}){
    CommonFnc.gotoPage('/pages/goods/search/index',params, options)
  }

  /**
   * 确认订单
   * @param params
   * @param options
   */
  static toOrderConfirm(params={}, options={}){
    CommonFnc.gotoPage('/pages/order/confirm/index',params, options)
  }

  /**
   * 订单列表
   * @param params
   * @param options
   */
  static toOrderList(params={}, options={}){
    CommonFnc.gotoPage('/pages/order/list/index',params, options)
  }

  /**
   * 订单详情
   * @param params
   * @param options
   */
  static toOrderDetail(params={}, options={}){
    CommonFnc.gotoPage('/pages/order/detail/index',params, options)
  }

  /**
   * 订单退款
   * @param params
   * @param options
   */
  static toOrderRefund(params={}, options={}){
    CommonFnc.gotoPage('/pages/order/refund/index',params, options)
  }

  /**
   * 订单退款
   * @param params
   * @param options
   */
  static toOrderComment(params={}, options={}){
    CommonFnc.gotoPage('/pages/order/comment/index',params, options)
  }




  /**
   * 优惠券列表
   * @param params
   * @param options
   */
  static toCouponList(params={}, options={}){
    CommonFnc.gotoPage('/pages/coupon/list/index',params, options)
  }

  /**
   * 优惠券列表
   * @param params
   * @param options
   */
  static toMyCoupon(params={}, options={}){
    CommonFnc.gotoPage('/pages/coupon/my/index',params, options)
  }

  /**
   * 我的
   * @param params
   * @param options
   */
  static toUser(){
    Taro.switchTab({
      url:'/pages/user/index'
    })
  }

  /**
   * 购物车
   * @param params
   * @param options
   */
  static toCart(params={}, options={}){
    Taro.switchTab({
      url:'/pages/cart/index'
    })
  }

  /**
   * 首页
   * @param params
   * @param options
   */
  static toIndex(params={}, options={}){
    Taro.switchTab({
      url:'/pages/index/index'
    })
  }

  /**
   * 申请
   * @param params
   * @param options
   */
  static toGoodsApply(params={}, options={}){
    CommonFnc.gotoPage('/pages/goods/apply/index',params, options)
  }

  /**
   * 节日管家
   * @param params
   * @param options
   */
  static toHolidayApply(params={}, options={}){
    CommonFnc.gotoPage('/pages/holiday/apply/index',params, options)
  }

  /**
   * 地址列表
   * @param params
   * @param options
   */
  static toAddress(params={}, options={}) {
    CommonFnc.gotoPage('/pages/address/index',params, options)
  }


  /**
   * 新增地址
   * @param params
   * @param options
   */
  static toPlusAddress(params={}, options={}) {
    CommonFnc.gotoPage('/pages/address/edit/index',params, options)
  }

}

