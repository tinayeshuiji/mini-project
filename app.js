let isLoading = false;
const api = require("utils/config.js");
App({
  onLaunch: function () {

  },
  http: require("utils/request.js").http,
  globalData: {
    userInfo: null
  },
  showLoad(title) {
    if (!isLoading) {
      wx.showLoading({
        title: title === undefined ? "加载中" : title,
        mask: true
      });
      isLoading = true
    }
  },
  hideLoad() {
    wx.hideLoading();
    isLoading = false
  },
  errModal(msg) {
    wx.showModal({
      title: '温馨提示',
      content: msg,
      showCancel: false,
      confirmText: '知道了',
      success(res) {
        console.log(res)
      }
    })
  },
  tipModal(msg) {
    wx.showModal({
      title: '温馨提示',
      content: msg,
      success(res) {
        if (res.confirm) {
          return 1
        } else if (res.cancel) {
          return 0
        }
      }
    })
  },
  pageOnLoad: function (options) {
    console.log("options:");
    console.log(options)
    let that = this;
    let Pages = getCurrentPages();
    let PrevPage = Pages[Pages.length - 1];
    console.log(PrevPage)
    wx.setStorageSync("PrevPage", PrevPage);
    let openIdPre = '';
    if (options.scene !== undefined) {

      openIdPre = decodeURIComponent(options.scene);
      wx.setStorageSync('openIdPre', openIdPre);
    }



  },
  errFun: function () {
    wx.showModal({
      title: '提示',
      content: '您还未登录，请先登录',
      success(res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/login/login',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
})