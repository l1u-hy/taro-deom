import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

export default class Empty extends Taro.Component {

  render() {
    return (
      <View className='index'>
        <AtIcon value='shopping-cart' color='#999' size='60' />
        <View className=''>购物车为空</View>
      </View>
    )
  }
}
