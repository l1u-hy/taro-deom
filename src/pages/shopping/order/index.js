import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class Order extends Taro.Component {
  config = {
    navigationBarTitleText: '购物车'
  }

  state = {
    puchaseGoods: [],
    sumPrice: 0,
  }

  componentWillMount() {
    // 解压参数
    const { puchaseGoodData, sumPrice } = this.$router.params
    const puchaseGoods = JSON.parse(decodeURIComponent(puchaseGoodData))
    this.setState({puchaseGoods, sumPrice})
  }

  render() {
    const { puchaseGoods, sumPrice } = this.state;
    return (
      <View>
        下单
      </View>
    )
  }
}