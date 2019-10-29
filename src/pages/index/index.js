import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtGrid } from "taro-ui"
import { observer, inject } from '@tarojs/mobx'
import KtSearchBar from '../../comps/layout/searchBar'
import KtSwipeBar from '../../comps/layout/swipeBar'
import KtDrag from '../../comps/info/drag'
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
    newDrag: {
      imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2308532487,3045423790&fm=26&gp=0.jpg',
      size: 'normal',
      name: '诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯',
      price: '128',
      num: '1234',
    },
    reCommendDrags: [
      {
        id: 1,
        imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2308532487,3045423790&fm=26&gp=0.jpg',
        size: 'small',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA',
        price: '128',
        num: '1234',
      },
      {
        id: 2,
        imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2308532487,3045423790&fm=26&gp=0.jpg',
        size: 'small',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA',
        price: '128',
        num: '1234',
      },
      {
        id: 3,
        imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2308532487,3045423790&fm=26&gp=0.jpg',
        size: 'small',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯',
        price: '128',
        num: '1234',
      },
      {
        id: 4,
        imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2308532487,3045423790&fm=26&gp=0.jpg',
        size: 'small',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯',
        price: '128',
        num: '1234',
      },
      {
        id: 5,
        imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2308532487,3045423790&fm=26&gp=0.jpg',
        size: 'small',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯',
        price: '128',
        num: '1234',
      },
      {
        id: 6,
        imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2308532487,3045423790&fm=26&gp=0.jpg',
        size: 'small',
        name: '诺祯DHA藻油小袋熊牌诺祯DHA藻油小袋诺祯',
        price: '128',
        num: '1234',
      }
    ]
  }

  componentWillMount() { }

  componentDidMount() {
    // const {auth} = this.props;
    // if(!auth.check({block: true}))return;
  }

  render() {
    const { newDrag, reCommendDrags } = this.state;
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
                { url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2308532487,3045423790&fm=26&gp=0.jpg' },
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
                { url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2308532487,3045423790&fm=26&gp=0.jpg' },
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
          <KtDrag
            imgUrl={newDrag.imgUrl}
            size={newDrag.size}
            name={newDrag.name}
            price={newDrag.price}
            num={newDrag.num}
          />
        </View>

        {/* 人气推荐 */}
        <View className='medicine'>
          <View className='medicine-head'>
            <View className='medicine-headline'>· 人气推荐 ·</View>
            <View className='medicine-title'>RECOMMEND</View>
          </View>
          <View className='at-row at-row--wrap'>
            {reCommendDrags.map(drag => (
              <View className='at-col at-col-6' key={drag.id}>
                <KtDrag
                  imgUrl={drag.imgUrl}
                  size={drag.size}
                  name={drag.name}
                  price={drag.price}
                  num={drag.num}
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
