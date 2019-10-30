import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.scss'

export default class KtDrug extends Taro.Component {
  render() {
    const { imgUrl, size, name, price, num, onClick } = this.props;
    return (
      <View className={`drug ${size === 'small' ? 'drug-small' : 'drug-normal'}`} onClick={onClick}>
        <Image 
          className={`drug-image ${size === 'small' ? 'drug-image-small' : 'drug-image-normal'}`} 
          src={imgUrl} 
        />
        <View className='drug-info'>
          <View className='drug-name ellipsis'>{name}</View>
          <View className='drug-desc'>
            <View className='drug-desc-price'>￥{price}</View>
            <View className='drug-desc-num'>{num}人付款</View>
          </View>
        </View>
      </View>
    )
  }
}