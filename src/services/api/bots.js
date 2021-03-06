import request from '@/services/request'

export default {
  getAllBots(accountId) {
    return request({
      url: `${process.env.VUE_APP_THREEC_URL_VERSION}/bots?account_id=${accountId}`,
      method: 'get'
    })
  }
}
