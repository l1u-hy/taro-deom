import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class Order extends Taro.Component {
  config = {
    navigationBarTitleText: '购物车'
  }

  componentWillMount() {
    // console.log(this.$router.params)
    const { puchaseGoodData, sumPrice } = this.$router.params
    const puchaseGoods = JSON.parse(this.$router.params.puchaseGoodData)
    console.log(puchaseGoods)
    console.log(this.$router.params.puchaseGoodData)
  }

  render() {
    return (
      <View>
        下单
      </View>
    )
  }
}