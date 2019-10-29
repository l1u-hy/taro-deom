import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import Good from '../../comps/shopping/good'
import Settle from '../../comps/shopping/settle'
import './index.scss'


@inject('auth')
@observer
class Index extends Taro.Component {

  config = {
    navigationBarTitleText: '购物车'
  }

  state = {
    goods: [
      {
        id: 1,
        imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2308532487,3045423790&fm=26&gp=0.jpg',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA',
        price: '100',
        count: 0,
        isSelect: false,
      },
      {
        id: 2,
        imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2308532487,3045423790&fm=26&gp=0.jpg',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA',
        price: '100',
        count: 0,
        isSelect: false,
      },
      {
        id: 3,
        imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2308532487,3045423790&fm=26&gp=0.jpg',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA',
        price: '100',
        count: 0,
        isSelect: false,
      },
      {
        id: 4,
        imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2308532487,3045423790&fm=26&gp=0.jpg',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA',
        price: '100',
        count: 0,
        isSelect: false,
      },
      {
        id: 5,
        imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2308532487,3045423790&fm=26&gp=0.jpg',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA',
        price: '100',
        count: 0,
        isSelect: false,
      },
      {
        id: 6,
        imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2308532487,3045423790&fm=26&gp=0.jpg',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA',
        price: '100',
        count: 0,
        isSelect: false,
      },
    ],
    sumPrice: 0,
    isAllSelect: false,
  }

  componentWillMount() { }

  componentDidMount() {

  }

  // 选择商品
  handleOnCheckChange = (id, isSelect) => {
    const { goods } = this.state
    const currentGood = goods.filter(good => good.id === id)[0]
    currentGood.isSelect = isSelect
    // 计算总价
    const sumPrice = this.getSumPrice(goods)
    this.setState({
      goods,
      isAllSelect: goods.every(good => good.isSelect),
      sumPrice,
    })
  }

  // 全选
  handleSelectAllGoods = (isAllSelect) => {
    const { goods } = this.state
    goods.forEach(good => good.isSelect = isAllSelect)
    // 计算总价
    const sumPrice = this.getSumPrice(goods)
    this.setState({ goods, isAllSelect, sumPrice })
  }

  // 数量加减
  handleOnCountChange = (id, value) => {
    const { goods } = this.state
    const currentGood = goods.filter(good => good.id === id)[0]
    currentGood.count = value
    // 如果当前商品已选，计算总价
    if (currentGood.isSelect) {
      this.setState({ sumPrice: this.getSumPrice(goods) })
    }
    this.setState({ goods })
  }

  // 计算总价
  getSumPrice = (goods) => {
    return goods.filter(good => good.isSelect).reduce((prev, cur) => prev + cur.price * cur.count, 0)
  }

  // 结算
  onSettle = () => {
    const { goods, sumPrice } = this.state;
    const puchaseGoods = goods.filter(good => good.isSelect)
    if (sumPrice) {
      const puchaseGoodData = JSON.stringify(puchaseGoods)
      Taro.navigateTo({
        url: `/pages/shopping/order/index?puchaseGoodData=${puchaseGoodData}&sumPrice=${sumPrice}`
      })
    }
  }

  render() {
    const { goods, sumPrice, isAllSelect } = this.state
    return (
      <View className='index'>
        {/* 购物车商品列表 */}
        {goods.map(good => (
          <Good
            isSelect={good.isSelect}
            key={good.id}
            imgUrl={good.imgUrl}
            name={good.name}
            price={good.price}
            count={good.count}
            onCountChange={(value) => this.handleOnCountChange(good.id, value)}
            onCheckChange={(isSelect) => this.handleOnCheckChange(good.id, isSelect)}
          />
        ))}

        {/* 结算 */}
        <Settle
          sumPrice={sumPrice}
          isAllSelect={isAllSelect}
          onCheckChange={this.handleSelectAllGoods}
          onSettle={this.onSettle}
        />
      </View>
    )
  }
}

export default Index
