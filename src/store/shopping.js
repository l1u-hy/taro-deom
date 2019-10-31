import Taro from '@tarojs/taro';
import { observable } from 'mobx'

const DRUGS = 'drugs'

const shopping = observable({
  goods: [],
  drugs: [],
  sumPrice: 0,
  isAllSelect: false,
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
 * 结算
 */
shopping.handleSettleGoods = function () {
  const puchaseGoods = this.goods.filter(good => good.isSelect)
  if (this.sumPrice) {
    const puchaseGoodData = encodeURIComponent(JSON.stringify(puchaseGoods))
    Taro.navigateTo({
      url: `/pages/shopping/order/index?puchaseGoodData=${puchaseGoodData}&sumPrice=${this.sumPrice}`
    })
  }
}

// 处理 isSelect
function handleIsSelect(type, id, isSelect) {
  console.log("------", this, type)
  this[type].forEach(item => {
    if (item.id === id) {
      item.isSelect = isSelect
    }
  })
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