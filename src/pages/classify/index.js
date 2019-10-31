import Taro from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import KtSearchBar from '../../comps/layout/searchBar'

import './index.scss'

@inject('home')
@observer
export default class User extends Taro.Component {
  config = {
    navigationBarTitleText: '分类',
  }

  state = {
    current: 0,
    tabList: [
      { title: '全部' },
      { title: '食品' },
      { title: '保健品' },
    ],

  }

  handleClick(value) {
    this.setState({ current: value })
  }

  render() {
    const { current, tabList } = this.state
    const { home: { drugs } } = this.props;
    return (
      <View className='pd20'>
        <View className='pb20'>
          <KtSearchBar
            comp={{
              type: 'self',
              placeholder: '请输入商品名关键词'
            }}
          />
        </View>

        <AtTabs
          current={current}
          scroll
          height='350px'
          tabDirection='vertical'
          tabList={tabList}
          onClick={this.handleClick.bind(this)}
        >
          <View className='content'>
            {tabList.map((item, index) => (
              <AtTabsPane tabDirection='vertical' current={current} index={index} key={index}>
                <View className='at-row at-row--wrap text-center pb20'>
                  <View className='at-col at-col-5 at-col__offset-1'>
                    <Image className='drug-img pd20' src='http://img2.imgtn.bdimg.com/it/u=1669904876,2411010804&fm=26&gp=0.jpg' />
                    <View className='sm c66 ellipsis'>诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯</View>
                  </View>
                  <View className='at-col at-col-5 at-col__offset-1'>
                    <Image className='drug-img pd20' src='http://img2.imgtn.bdimg.com/it/u=1669904876,2411010804&fm=26&gp=0.jpg' />
                    <View className='sm c66 ellipsis'>诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯</View>
                  </View>
                </View>
                <View className='at-row at-row--wrap text-center pb20'>
                  <View className='at-col at-col-5 at-col__offset-1'>
                    <Image className='drug-img pd20' src='http://img2.imgtn.bdimg.com/it/u=1669904876,2411010804&fm=26&gp=0.jpg' />
                    <View className='sm c66 ellipsis'>诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯</View>
                  </View>
                  <View className='at-col at-col-5 at-col__offset-1'>
                    <Image className='drug-img pd20' src='http://img2.imgtn.bdimg.com/it/u=1669904876,2411010804&fm=26&gp=0.jpg' />
                    <View className='sm c66 ellipsis'>诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯</View>
                  </View>
                </View>
                <View className='at-row at-row--wrap text-center pb20'>
                  <View className='at-col at-col-5 at-col__offset-1'>
                    <Image className='drug-img pd20' src='http://img2.imgtn.bdimg.com/it/u=1669904876,2411010804&fm=26&gp=0.jpg' />
                    <View className='sm c66 ellipsis'>诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯</View>
                  </View>
                  <View className='at-col at-col-5 at-col__offset-1'>
                    <Image className='drug-img pd20' src='http://img2.imgtn.bdimg.com/it/u=1669904876,2411010804&fm=26&gp=0.jpg' />
                    <View className='sm c66 ellipsis'>诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯</View>
                  </View>
                </View>
              </AtTabsPane>
            ))}
          </View>
        </AtTabs>
      </View>
    )
  }
}