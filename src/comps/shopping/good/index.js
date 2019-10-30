import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtInputNumber } from 'taro-ui'
import KtCheckBox from '../../layout/checkBox'

import './index.scss'

export default class Good extends Taro.Component {
  render() {
    const { onCheckChange, isSelect, imgUrl, name, price, count, onCountChange } = this.props
    return (
      <View className='index at-row at-row__align--center'>
        <View className='at-col at-col-1'>
          <KtCheckBox isSelect={isSelect} onCallback={onCheckChange} />
        </View>
        <View className='at-col at-col-3 img-wrap'>
          <Image src={imgUrl} className='good-img' />
        </View>
        <View className='at-col at-col-7'>
          <View className='good-info'>
            <View className='good-name'>{name}</View>
            <View className='good-price-count'>
              <View className='good-price'>￥{price}</View>
              <View className='good-count'>
                <AtInputNumber
                  min={1}
                  step={1}
                  width={60}
                  value={count}
                  onChange={onCountChange}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
