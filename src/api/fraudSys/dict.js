import request from '@/utils/request'

//字典接口
export function getAlertTaskDict() {
    return request({
      url: '/alert/alertsys/dict/data',
      method: 'get'
    })
  }
