import Taro from '@tarojs/taro';
import { observable } from 'mobx'
import Tips from '../utils/tips'

const DRUGS = 'drugs'

const shopping = observable({
  goods: [],
  drugs: [],
  sumPrice: 0,
  isAllSelect: false,
  puchaseGoods: [],
})

/**
 * 初始化
 */
shopping.init = async function () {
  this.drugs = await getDrugsStorage()
  this.goods = this.drugs.filter(drug => drug.count)
  this.sumPrice = getSumPrice(this.goods)
  this.isAllSelect = this.goods.every(good => good.isSelect)

}

/**
 * 选择商品
 */
shopping.handleOnCheckChange = function (id, isSelect) {
  // goods
  this.goods.forEach(good => {
    if (good.id === id) {
      good.isSelect = isSelect
    }
  })
  // isAllSelect
  this.isAllSelect = this.goods.every(good => good.isSelect)
  // sumPrice
  this.sumPrice = getSumPrice(this.goods)
  // drugs
  this.drugs.forEach(drug => {
    if (drug.id === id) {
      drug.isSelect = isSelect
    }
  })
  setDrugsStorage(this.drugs)
}

/**
 * 全选
 */
shopping.handleSelectAllGoods = function (isAllSelect) {
  // isAllSelect
  this.isAllSelect = isAllSelect
  // goods
  this.goods.forEach(good => good.isSelect = isAllSelect)
  // sumPrice
  this.sumPrice = getSumPrice(this.goods)
  // drugs
  if (isAllSelect) {
    this.goods.forEach(good => {
      this.drugs.forEach(drug => {
        if (drug.id === good.id) {
          drug.isSelect = true;
        }
      })
    })
    setDrugsStorage(this.drugs)
  }
}

/**
 * 数量加减
 */
shopping.handleOnCountChange = function (id, value) {
  // 形参 typeof value string
  value = parseInt(value)

  // 处理 goods
  const currentGood = this.goods.filter(good => good.id === id)[0]
  currentGood.count = value

  // 如果当前商品已选，计算总价
  if (currentGood.isSelect) {
    this.sumPrice = getSumPrice(this.goods)
  }

  // 处理 drugs
  this.drugs.forEach(drug => {
    if (drug.id === id) {
      drug.count = value
    }
  })
  setDrugsStorage(this.drugs)
}

/**
 * 结算--跳转到结算页面
 */
shopping.handleSettleGoods = function () {
  this.puchaseGoods = this.goods.filter(good => good.isSelect)
  if (this.sumPrice) {
    Taro.navigateTo({
      url: '/pages/shopping/order/index'
    })
  }
}

/**
 * 删除单个
 */
shopping.handleDeteleSingleGood = async function (key, id) {
  // key === 0 ? '取消' : '删除'
  if (key === 0) {
    this.goods.forEach(good => {
      if (good.id === id) {
        good.isOpened = false
      }
    })
    this.drugs.forEach(drug => {
      if (drug.id === id) {
        drug.isOpened = false
      }
    })
  } else {
    await Tips.confirm("确认从购物车中删除该商品吗？")
    this.goods = this.goods.filter(good => good.id !== id)
    this.drugs.forEach(drug => {
      if (drug.id === id) {
        drug.count = 0
        drug.isOpened = false
      }
    })
    // 此处如果不设置isAllSelect，删除一个未选择商品时，全选状态不会改变
    this.isAllSelect = this.goods.every(good => good.isSelect)
    Tips.success('删除成功')
  }
  setDrugsStorage(this.drugs)
}

/**
 * 打开滑块
 */
shopping.handleOpenSwipeAction = function (id) {
  // 打开一个，其他关闭
  this.goods.forEach(good => good.isOpened = good.id === id)
  // 此处如果不设置缓存，打开滑块关闭后，切换到其他页面，再切回来时，滑块会自动弹出
  this.drugs.forEach(drug => drug.isOpened = drug.id === id)
  setDrugsStorage(this.drugs)
}

// 计算总价
function getSumPrice(goods) {
  return goods.filter(good => good.isSelect).reduce((prev, cur) => prev + cur.price * cur.count, 0)
}

/**
 * 读drugs缓存
 */
function getDrugsStorage() {
  return new Promise((resolve, reject) => {
    Taro.getStorageInfo().then(({ keys }) => {
      if (keys.indexOf(DRUGS) !== -1) {
        Taro.getStorage({ key: DRUGS }).then(res => resolve(res.data))
      }
    })
  })
}

/**
 * 写drugs缓存
 */
function setDrugsStorage(drugs) {
  Taro.setStorage({
    key: DRUGS,
    data: drugs,
  })
}

export default shopping