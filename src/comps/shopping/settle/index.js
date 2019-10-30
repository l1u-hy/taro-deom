import Taro from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import { AtButton  } from 'taro-ui'
import KtCheckBox from '../../layout/checkBox'

import './index.scss'

export default class Settle extends Taro.Component {
  render() {
    const { isAllSelect, sumPrice, onCheckChange, onSettle } = this.props
    return (
      <View className='index at-row at-row__align--center'>
        <View className='at-col at-col-3'>
          <View className='at-row at-row__align--center select'>
            <View className='at-col-4'>
              <KtCheckBox isSelect={isAllSelect} onCallback={onCheckChange} />
            </View>
            <View className='at-col-3'>全选</View>
          </View>          
        </View>
        <View className='at-col at-col-6'>
          <View className='at-row at-row__align--center at-row__justify--end'>
            <View className='at-col-4 desc'>不含运费</View>
            <View className='at-col-5 price-info'>
              总计:
              <Text className='price'>￥{sumPrice || 0}</Text>
            </View>
          </View>
        </View>
        <View className='at-col at-col-3 btn'>
          <AtButton type='primary' circle onClick={onSettle} className='custom-button'>结算</AtButton>
        </View>
      </View>
    )
  }
}
