import request from '@/utils/request'

// 查询预警任务管理列表
export function listPlace(query) {
  return request({
    url: '/alert/alertsys/list',
    method: 'get',
    params: query
  })
}

// 查询
export function getPlace(id) {
  return request({
    url: `/alert/alertsys/${id}`,
    method: 'get'
  })
}

// 查询预警数据详情
export function getPlaceDetails(id) {
  return request({
    url: `/alert/alertsys/detail/${id}`,
    method: 'get'
  })
}


// 修改预警任务管理
export function updatePlace(data) {
  return request({
    url: `/alert/alertsys/process`,
    method: 'put',
    data: data
  })
}


// 上传文件
export function uploadCannotMeetFiles() {
  return request({
    url: `/alert/alertsys/uploadCannotMeetFile`,
    method: 'post'
  })
}

// 新增预警任务管理
export function addPlace(msisdn) {
  return request({
    url: '/alert/task' + msisdn,
    method: 'post',
    data: data
  })
}
