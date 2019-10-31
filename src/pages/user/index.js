import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import KtUserCard from '../../comps/user/card'
import KtOrderBar from '../../comps/user/order'
import KtToolBar from '../../comps/user/tool'
import './index.scss'

export default class User extends Taro.Component {
  config = {
    navigationBarTitleText: '个人中心',
  }

  render() {
    return (
      <View className='pd20'>
        <View className='user-wrap card-min'>
          <AtAvatar circle image='http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg' />
          <View className='f4 pt20'>1235897981</View>
        </View>

        {/* <KtUserCard /> */}

        <View className='mt20 mb20'>
          <KtOrderBar
            comp={{
              title: { name: '我的订单', action: '查看全部订单' },
              content: [
                { name: '待付款', icon: 'wait-pay', badge: 1 },
                { name: '待发货', icon: 'company-confirm', badge: 1 },
                { name: '待收货', icon: 'wait-confirm', badge: 1 },
                { name: '待评价', icon: 'wait-comment', badge: 1 },
              ]
            }}
          />
        </View>

        <KtToolBar
          comp={[
            { name: '购物车', icon: 'my-order' },
            { name: '我的收藏', icon: 'my-collect' },
            { name: '收获地址', icon: 'my-agent' },
            { name: '我的分享记录', icon: 'my-comment' },
            { name: '我的优惠券', icon: 'my-wallet' },
          ]}
        />
      </View>
    )
  }
}