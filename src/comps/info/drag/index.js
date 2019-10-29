import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.scss'

class KtDrag extends Taro.Component {
  render() {
    const { imgUrl, size, name, price, num } = this.props;
    return (
      <View className={`drag ${size === 'small' ? 'drag-small' : 'drag-normal'}`} >
        <Image 
          className={`drag-image ${size === 'small' ? 'drag-image-small' : 'drag-image-normal'}`} 
          src={imgUrl} 
        />
        <View className='drag-info'>
          <View className='drag-name ellipsis'>{name}</View>
          <View className='drag-desc'>
            <View className='drag-desc-price'>￥{price}</View>
            <View className='drag-desc-num'>{num}人付款</View>
          </View>
        </View>
      </View>
    )
  }
}
export default KtDrag
