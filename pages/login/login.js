const app = getApp();
const api = require("../../utils/config.js");



Page({
  
  data: {
   
  },

  onLoad: function(options) {
    console.log(options)
    
    
  },
 
  goHome:function(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  
  },
  getUser: function (res) {
    console.log(res)
    var that=this;

    if (res.detail.errMsg === "getUserInfo:fail auth deny") {
      app.showTips("您拒绝了授权，没有授权您将无法使用该小程序");
      return false;
    } else {
      var enData = {};
      enData.encryptedData = res.detail.encryptedData;
      enData.iv = res.detail.iv;
     
      that.handleUserInfo(res.detail.userInfo);
    }


  },
  objectToUrlParams: function (t) {
    var e = "";
    for (var r in t) e += "&" + r + "=" + t[r];
    return e.substr(1);
  },
  handleUserInfo: function (input) {
    let that = this;
    app.showLoad();
    wx.login({
      success: function (res) {
        let code = res.code;
        if (res.code) {
          wx.request({
            url: api.login_by_weixin,
            data: {
              code: res.code,
              userInfo: input

            },
            method: 'POST',
            header: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            dataType: 'json',
            success: function (c) {
              console.log(c)
              if (c.data.errno === 0) {
                if (c.data.data.isRegist == -1) {
                  wx.setStorageSync('userId', c.data.data.userId);
                  wx.redirectTo({
                    url: '/pages/registe/registe?code=' + code,
                  })

                } else {
                  app.globalData.userInfo = c.data.data.userInfo;
                  app.globalData.hasUserInfo = true;
                  wx.setStorageSync('token', c.data.data.token);
                  wx.setStorageSync('isshowAd', c.data.data.isshowAd);
                  wx.setStorageSync('userId', c.data.data.userId);
                  wx.setStorageSync('userInfo', c.data.data.userInfo);
                  let t = wx.getStorageSync('PrevPage');
                  console.log(t)
                  if (app.globalData.hasUserInfo) {
                    that.checkUserInfo();
                    if (t !== undefined && t !== '') {
                      that.getCartList();
                      let root = t.route;
                      if (root.indexOf("index") !== -1 || root.indexOf("catalog") !== -1 || root.indexOf("cart") !== -1 || root.indexOf("mine") !== -1) {
                        console.log("11111")
                        wx.switchTab({
                          url: '/' + t.route
                        })
                        typeof callback === "function" ? callback() : "";
                      } else {
                        // that.getCartList();
                        wx.redirectTo({
                          url: '/' + t.route + "?" + that.objectToUrlParams(t.options)
                        })
                      }
                      // typeof callback === "function" ? callback() : "";

                    } else {
                      wx.switchTab({
                        url: '/pages/index/index',
                      })
                      // typeof callback === "function" ? callback() : "";

                    }



                  }



                }


              } else {
                wx.showModal({
                  title: "提示",
                  content: "登录失败，请重新点击",
                  showCancel: false
                });

              }
            },
            complete: function () {
              app.hideLoad();
            }
          });
        } else {
          wx.showModal({
            title: "提示",
            content: "授权失败，请重试！",
            showCancel: false
          });
          app.hideLoad();
        }
      },
      fail: function () {
        wx.showModal({
          title: "提示",
          content: "授权失败，请重试！",
          showCancel: false
        });
        that.hideLoad();
      }
    });
  },
  checkUserInfo: function () {
    var t = this;
    let openIdPre = wx.getStorageSync('openIdPre');
    let scUserId = wx.getStorageSync('userId');

    app.http(api.fetchCouponByShareUrl, {
      qrUserId: openIdPre,
      scUserId: scUserId
    }, 'POST').then((res) => {
      console.log("bind-share")
      console.log(res)

      if (res.data.errno == 0) {


      } else if (res.data.errno == 501) {
        app.errFun();
      }
    })




  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});