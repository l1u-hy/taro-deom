import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtGrid } from "taro-ui"
import { observer, inject } from '@tarojs/mobx'
import KtSearchBar from '../../comps/layout/searchBar'
import KtSwipeBar from '../../comps/layout/swipeBar'
import KtDrug from '../../comps/info/drug'
import './index.scss'

@inject('auth', 'home')
@observer
class Index extends Taro.Component {

  config = {
    navigationBarTitleText: '首页',
    backgroundColor: '#ccc'
  }

  // constructor (props){
  //   super(props)
  //   this.state = {}
  // }

  state = {
    newDrug: {
      id: '0',
      imgUrl: 'http://img2.imgtn.bdimg.com/it/u=1669904876,2411010804&fm=26&gp=0.jpg',
      size: 'normal',
      name: '诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯',
      price: '128',
      num: '1234',
    },
    reCommendDrugs: [
      {
        id: '1',
        imgUrl: 'http://img4.imgtn.bdimg.com/it/u=1027220203,1794872175&fm=26&gp=0.jpg',
        size: 'small',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA',
        price: '128',
        num: '1234',
      },
      {
        id: '2',
        imgUrl: 'http://img0.imgtn.bdimg.com/it/u=2054288585,3297966539&fm=26&gp=0.jpg',
        size: 'small',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA',
        price: '128',
        num: '1234',
      },
      {
        id: '3',
        imgUrl: 'http://img5.imgtn.bdimg.com/it/u=2172777853,3262388300&fm=26&gp=0.jpg',
        size: 'small',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯',
        price: '128',
        num: '1234',
      },
      {
        id: '4',
        imgUrl: 'http://img4.imgtn.bdimg.com/it/u=1901455908,1974132964&fm=26&gp=0.jpg',
        size: 'small',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯',
        price: '128',
        num: '1234',
      },
      {
        id: '5',
        imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2308532487,3045423790&fm=26&gp=0.jpg',
        size: 'small',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯',
        price: '128',
        num: '1234',
      },
      {
        id: '6',
        imgUrl: 'http://img0.imgtn.bdimg.com/it/u=3273464959,3880466769&fm=26&gp=0.jpg',
        size: 'small',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯',
        price: '128',
        num: '1234',
      }
    ],
    drugs: [],
  }

  componentWillMount() {
    // 将drugs写入缓存
    const { newDrug, reCommendDrugs } = this.state
    const drugs = [newDrug, ...reCommendDrugs].map(drug => ({
      ...drug,
      count: 0,
      isSelect: false,
    }))
    Taro.setStorage({
      key: 'drugs',
      data: drugs,
      success: () => {
        this.setState({ drugs })
      }
    })
  }

  componentDidMount() {
    
  }

  componentDidShow() {
    // onShow时重新读缓存
    const that = this
    Taro.getStorageInfo({
      success({ keys }) {
        if (keys.indexOf('drugs') !== -1) {
          Taro.getStorage({
            key: 'drugs',
            success({ data }) {
              that.setState({ drugs: data })
            }
          })
        }
      }
    })
  }

  // 点击商品，添加到购物车
  handleAddToShoppingCart(id) {
    const { drugs } = this.state
    // 修改drugs缓存
    drugs.forEach(drug => {
      if (drug.id === id) {
        drug.count = drug.count + 1;
      }
    })
    Taro.setStorage({
      key: 'drugs',
      data: drugs,
      success() {
        Taro.showToast({
          title: '添加到购物车',
          icon: 'success',
          duration: 1000
        })
      }
    })
  }

  render() {
    const { newDrug, reCommendDrugs } = this.state;
    return (
      <View className='index'>
        {/* 搜索栏 */}
        <KtSearchBar
          comp={{
            type: 'self',
            placeholder: '请输入商品名关键词'
          }}
        />

        {/* 轮播图1 */}
        <View className='swiperBar-wrap'>
          <KtSwipeBar
            comp={{
              data: [
                { url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1588724423,1791597531&fm=26&gp=0.jpg' },
                { url: 'http://img2.imgtn.bdimg.com/it/u=1669904876,2411010804&fm=26&gp=0.jpg' },
                { url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=785764038,243614380&fm=26&gp=0.jpg' },
              ]
            }}
          />
        </View>

        {/* grid */}
        <View className=''>
          <AtGrid
            columnNum={4}
            hasBorder={false}
            data={[
              {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                value: '食品类'
              },
              {
                image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                value: '保健类'
              },
              {
                image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                value: '福利卡券'
              },
              {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                value: '活动规则'
              },
            ]}
          />
        </View>

        {/* 轮播图2 */}
        <View className='swiperBar-wrap'>
          <KtSwipeBar
            comp={{
              cls: 'swiperBar-ad',
              data: [
                { url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1588724423,1791597531&fm=26&gp=0.jpg' },
                { url: 'http://img2.imgtn.bdimg.com/it/u=1669904876,2411010804&fm=26&gp=0.jpg' },
                { url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=785764038,243614380&fm=26&gp=0.jpg' },
              ]
            }}
          />
        </View>

        {/* 新品上市 */}
        <View className='medicine'>
          <View className='medicine-head'>
            <View className='medicine-headline'>· 新品上市 ·</View>
            <View className='medicine-title'>NEW PRODUCTS</View>
          </View>
          <KtDrug
            imgUrl={newDrug.imgUrl}
            size={newDrug.size}
            name={newDrug.name}
            price={newDrug.price}
            num={newDrug.num}
            onClick={this.handleAddToShoppingCart.bind(this, newDrug.id)}
          />
        </View>

        {/* 人气推荐 */}
        <View className='medicine'>
          <View className='medicine-head'>
            <View className='medicine-headline'>· 人气推荐 ·</View>
            <View className='medicine-title'>RECOMMEND</View>
          </View>
          <View className='at-row at-row--wrap'>
            {reCommendDrugs.map(drug => (
              <View className='at-col at-col-6' key={drug.id}>
                <KtDrug
                  imgUrl={drug.imgUrl}
                  size={drug.size}
                  name={drug.name}
                  price={drug.price}
                  num={drug.num}
                  onClick={this.handleAddToShoppingCart.bind(this, drug.id)}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    )
  }
}

export default Index
