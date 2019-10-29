import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import infoApi from '../../../service/api/info'
import './index.scss'
import KtInfoDetail from "../../../comps/info/detail";



class InfoDetail extends Taro.Component {
  config = {
    navigationBarTitleText: '详情'
  };

  constructor() {
    super(...arguments);
    this.state = {
      info:{}
    };
  }

  componentDidMount () {
    this.getInfo(this.$router.params.id);
  }
  //查看消息详情
  getInfo = async (id) => {
    let res = await infoApi.info(id);
    console.log('查看消息详情');
    console.log(res);
    this.setState({
      info:res.data
    })
  };



  render () {
    const {info} = this.state;

    return (
      <View className='InfoDetail'>
        <KtInfoDetail comp={info} />
      </View>
    )
  }
}
export default InfoDetail

