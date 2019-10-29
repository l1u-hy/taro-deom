import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtAvatar } from 'taro-ui'
import { inject, observer } from "@tarojs/mobx"

import './index.scss';
import avatar from '../../../public/imgs/user/user.png'
import isSure from '../../../public/imgs/user/wait-sure.png'
import {goView} from "../../../utils/commonFnc";


@inject('auth')
@observer
class KtUserCard extends Taro.Component {


  getTitle = (u) => {
    if (u) {
      return u.name
    }
    return '登陆/注册'
  }

  routerToNext = (user) => {
    if (!user) {
      // 前往登陆页
      goView('/pages/user/auth/index', {}, false)
    }
  };

  render() {
    const { auth } = this.props;
    const { user } = auth;
    return (
      <View className='userCard' onClick={this.routerToNext.bind(this, user)}>
        <View className='card-self shadow-warp'>
          <View className='pd20'>
            <View className='at-row at-row--wrap at-row__align--center'>
              <View className='at-col-12 text-center'>
                <View>
                  <Image className='avatar-large' mode='widthFix' src={user.avatar || avatar} />
                </View>
                {/*<AtAvatar size='large' circle image={user.avatar || avatar} />*/}
              </View>
              <View className='at-col-12 text-center'>
                <View>
                  <Text className='xl white'>{this.getTitle(user)}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default KtUserCard


