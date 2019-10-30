import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import Good from '../../comps/shopping/good'
import Settle from '../../comps/shopping/settle'
import './index.scss'

@inject('auth')
@observer
export default class Shopping extends Taro.Component {

  config = {
    navigationBarTitleText: '购物车'
  }

  state = {
    goods: [],
    sumPrice: 0,
    isAllSelect: false,
    drugs: [],
  }

  componentWillMount() {

  }

  componentDidShow() {
    // 读取drugs --> goods
    this.handleDrugsStorageToGoods()
  }

  componentDidMount() {

  }

  // 读取drugs --> goods
  handleDrugsStorageToGoods() {
    const that = this
    Taro.getStorageInfo({
      success({ keys }) {
        if (keys.indexOf('drugs') !== -1) {
          Taro.getStorage({
            key: 'drugs',
            success({ data }) {
              const goods = data.filter(drug => drug.count)
              // 保存 drugs 和 goods
              that.setState({ drugs: data, goods })
            }
          })
        }
      }
    })
  }

  // 选择商品
  handleOnCheckChange = (id, isSelect) => {
    const { goods } = this.state
    const currentGood = goods.filter(good => good.id === id)[0]
    currentGood.isSelect = isSelect
    // 计算总价
    const sumPrice = this.getSumPrice(goods)
    this.setState({
      goods,
      isAllSelect: goods.every(good => good.isSelect),
      sumPrice,
    })
  }

  // 全选
  handleSelectAllGoods = (isAllSelect) => {
    const { goods } = this.state
    goods.forEach(good => good.isSelect = isAllSelect)
    // 计算总价
    const sumPrice = this.getSumPrice(goods)
    this.setState({ goods, isAllSelect, sumPrice })
  }

  // 数量加减
  handleOnCountChange = (id, value) => {
    // 形参 typeof value  string
    value = parseInt(value)
    let { goods, drugs } = this.state

    // 处理 goods
    const currentGood = goods.filter(good => good.id === id)[0]
    currentGood.count = value
    this.setState({ goods })
    // 如果当前商品已选，计算总价
    if (currentGood.isSelect) {
      this.setState({ sumPrice: this.getSumPrice(goods) })
    }

    // 处理 drugs
    drugs.forEach(drug => {
      if (drug.id === id) {
        drug.count = value
      }
    })
    Taro.setStorage({
      key: 'drugs',
      data: drugs,
    })
  }

  // 计算总价
  getSumPrice = (goods) => {
    return goods.filter(good => good.isSelect).reduce((prev, cur) => prev + cur.price * cur.count, 0)
  }

  // 结算
  onSettle = () => {
    const { goods, sumPrice } = this.state;
    const puchaseGoods = goods.filter(good => good.isSelect)
    if (sumPrice) {
      const puchaseGoodData = encodeURIComponent(JSON.stringify(puchaseGoods))
      Taro.navigateTo({
        url: `/pages/shopping/order/index?puchaseGoodData=${puchaseGoodData}&sumPrice=${sumPrice}`
      })
    }
  }

  render() {
    const { goods, sumPrice, isAllSelect } = this.state
    return (
      <View className='index'>
        {/* 购物车商品列表 */}
        {goods.map(good => (
          <Good
            isSelect={good.isSelect}
            key={good.id}
            imgUrl={good.imgUrl}
            name={good.name}
            price={good.price}
            count={good.count}
            onCountChange={this.handleOnCountChange.bind(this, good.id)}
            onCheckChange={this.handleOnCheckChange.bind(this, good.id)}
          />
        ))}

        {/* 结算 */}
        <Settle
          sumPrice={sumPrice}
          isAllSelect={isAllSelect}
          onCheckChange={this.handleSelectAllGoods}
          onSettle={this.onSettle}
        />
      </View>
    )
  }
}
