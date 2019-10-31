import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import Good from '../../comps/shopping/good'
import Settle from '../../comps/shopping/settle'
import './index.scss'

@inject('auth', 'shopping')
@observer
export default class Shopping extends Taro.Component {

  config = {
    navigationBarTitleText: '购物车'
  }

  componentWillMount() {

  }

  componentDidShow() {
    this.props.shopping.init()
  }

  componentDidMount() {

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

  render() {
    const { shopping } = this.props
    return (
      <View className='index'>
        {/* 购物车商品列表 */}
        {shopping.goods.map(good => (
          <Good
            isSelect={good.isSelect}
            key={good.id}
            imgUrl={good.imgUrl}
            name={good.name}
            price={good.price}
            count={good.count}
            onCountChange={this.onCountChange.bind(this, good.id)}
            onCheckChange={this.onCheckChange.bind(this, good.id)}
          />
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
