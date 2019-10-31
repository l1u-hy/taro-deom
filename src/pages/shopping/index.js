import Taro from '@tarojs/taro'
import { View} from '@tarojs/components'
import { AtSwipeAction } from "taro-ui"
import { observer, inject } from '@tarojs/mobx'
import Good from '../../comps/shopping/good'
import Settle from '../../comps/shopping/settle'
import './index.scss'

const OPTIONS = [
  {
    text: '取消',
    style: {
      color: '#333',
      backgroundColor: '#F7F7F7',
      height: '50px'
    }
  },
  {
    text: '删除',
    style: {
      backgroundColor: '#E93B3D',
      height: '50px'
    }
  }
]

@inject('auth', 'shopping')
@observer
export default class Shopping extends Taro.Component {

  config = {
    navigationBarTitleText: '购物车'
  }

  componentDidShow() {
    this.props.shopping.init()
  }

  // 选择商品
  onCheckChange = (id, isSelect) => {
    this.props.shopping.handleOnCheckChange(id, isSelect)
  }

  // 全选
  onSelectAllGoods = (isAllSelect) => {
    this.props.shopping.handleSelectAllGoods(isAllSelect)
  }

  // 数量加减
  onCountChange = (id, value) => {
    this.props.shopping.handleOnCountChange(id, value)
  }

  // 结算
  onSettleGoods = () => {
    this.props.shopping.handleSettleGoods()
  }

  // 删除购物车--点击滑块
  onClickSwpieAction = (id, item, key) => {
    this.props.shopping.handleDeteleSingleGood(key, id)
  }

  // 删除购物车--打开滑块
  onOpenedSwpieAction = (id) => {
    this.props.shopping.handleOpenSwipeAction(id)
  }

  render() {
    const { shopping } = this.props
    return (
      <View className='index'>
        {/* 购物车商品列表 */}
        {shopping.goods.map(good => (
          <AtSwipeAction
            key={good.id}
            options={OPTIONS}
            isOpened={good.isOpened}
            onClick={this.onClickSwpieAction.bind(this, good.id)}
            onOpened={this.onOpenedSwpieAction.bind(this, good.id)}
          >
            <Good
              isSelect={good.isSelect}
              imgUrl={good.imgUrl}
              name={good.name}
              price={good.price}
              count={good.count}
              onCountChange={this.onCountChange.bind(this, good.id)}
              onCheckChange={this.onCheckChange.bind(this, good.id)}
            />
          </AtSwipeAction>
        ))}

        {/* 结算 */}
        <Settle
          sumPrice={shopping.sumPrice}
          isAllSelect={shopping.isAllSelect}
          onCheckChange={this.onSelectAllGoods.bind(this)}
          onSettle={this.onSettleGoods.bind(this)}
        />
      </View>
    )
  }
}
