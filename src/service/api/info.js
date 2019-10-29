import base from './base'


export default class infoApi extends base {

  /**
   * 消息详情
   */
  static info(id) {
    return this.put('/infoData/read/detail', {id:id});
  }




}
