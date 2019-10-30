import Taro from '@tarojs/taro'

export default class Storage {
  /**
   * 读取、存储drugs
   */
  static handleStorageDrugs({ key, data, readCallback, writeCallback }) {
    // this._isStoraged({
    //   key, 
    //   callback: function (isStoraged) {
    //     console.log('+++++++', isStoraged)
    //   }
    // })
    Taro.getStorageInfo({
      success({ keys }) {
        console.log('+++++++', keys)
        // 是否有对应缓存 ? 读 : 存
        if (keys.indexOf(key) !== -1) {
          Taro.getStorage({
            key,
            success(res) {
              readCallback && readCallback(res.data)
            }
          })
        } else {
          Taro.setStorage({
            key,
            data,
            success() {
              writeCallback && writeCallback()
            }
          })
        }
      }
    })
  }

  /**
   * 读取、存储count
   */
  static handleStorageDrugCount({ key, data, isWrite, readCallback, writeCallback }) {
    Taro.getStorageInfo({
      success({ keys }) {
        console.log('+++++++', keys)
        // 是否有对应缓存 && 写 ? 写 : 读
        if (keys.indexOf(key) !== -1 && isWrite) {
          Taro.setStorage({
            key,
            data,
            success() {
              writeCallback && writeCallback()
            }
          })
        } else {
          Taro.getStorage({
            key,
            success(res) {
              readCallback && readCallback(res.data)
            }
          })
        }
      }
    })
  }

  /**
   * 判断缓存中是否已有当前key
   */
  // _isStoraged({key, callback}) {
  //   Taro.getStorageInfo({
  //     success({ keys }) {
  //       callback(keys.indexOf(key) !== -1)
  //     }
  //   })
  // }

}