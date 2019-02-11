const app = getApp();
// const api = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeShow: 0,
    phone: '',
    agree: 0,
    time: 60,
    codeMa: '',
    wxCode: ''




  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var that = this;
    that.setData({
      wxCode: options.code
    })


  },


  handleCode(e) {
    this.setData({
      codeMa: e.detail.value
    })
  },

  handleChangePhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getCode: function() {
    var that = this;
    if (that.data.phone == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
      return;

    } else if (!(/^1[34578]\d{9}$/.test(that.data.phone))) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 2000
      })
      return;

    } else {
      that.setData({
        time: 60,
        codeShow: 1

      });
      that.setTime();
      app.http(api.regCaptchaUrl, {
        modeType: 1,
        mobile: that.data.phone
      }, 'POST').then((res) => {
        console.log(res)
        if (res.data.errno == 0) {



        } else if (res.data.errno == 501) {

        }else{
          wx.showModal({
            title: '温馨提示',
            content: res.data.errmsg,
            showCancel: false,
            success(res) {
              if (res.confirm) {

              }
            }
          })
        }
      })


    }



  },
  setTime: function() {
    var that = this;

    var time = that.data.time;

    var timer = setInterval(fun1, 1000);

    function fun1() {
      that.setData({
        time: time--
      })
      if (time < 0) {
        clearTimeout(timer); //清除定时器      
        that.setData({
          time: 60,
          codeShow: 2
        })
      }
    }
  },
  checkAgree: function(e) {
    var t = this;
    var agree = t.data.agree;
    if (agree == 0) {
      t.setData({
        agree: 1
      })
    } else if (agree == 1) {
      t.setData({
        agree: 0
      })
    }
  },
  agreement: function() {
    wx.showModal({
      title: "注册协议",
      content: '注册协议',
      showCancel: !1,
      confirmText: "我已阅读",
      confirmColor: "#ff4544",
      success: function(e) {
        e.confirm && console.log("用户点击确定");
      }
    });
  },
  registeSubmit: function() {
    var that = this;
    let userId = wx.getStorageSync('userId');
    var phone = that.data.phone;
    var codeMa = that.data.codeMa;
    var agree = that.data.agree;
    if (phone == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
      return;

    } else if (!(/^1[34578]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 2000
      })
      return;

    } else if (codeMa == '') {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (agree == 0) {
      wx.showToast({
        title: '您需同意注册协议',
        icon: 'none',
        duration: 2000
      })
      return;
    } else {
      app.http(api.registerUrl, {
        code: codeMa,
        mobile: phone,
        wxCode: that.data.wxCode,
        userId: userId
      }, 'POST').then((res) => {
        console.log(res)
        if (res.data.errno == 0) {
          app.globalData.userInfo = res.data.data.userInfo;
          app.globalData.hasUserInfo = true;
          wx.setStorageSync('mobile', phone);
          wx.setStorageSync('token', res.data.data.token);
          wx.setStorageSync('userInfo', res.data.data.userInfo);
          let t = wx.getStorageSync('PrevPage');
          console.log(t)
          app.checkUserInfo();
          wx.showModal({
            title: '提示',
            content: '注册成功，可在优惠券中心查看新人优惠券',
            showCancel: false,
            success(res0) {
              if (res0.confirm) {
                if (app.globalData.hasUserInfo) {
                  if (t !== undefined && t !== '') {
                    let root = t.route;
                    if (root.indexOf("index") !== -1 || root.indexOf("catalog") !== -1 || root.indexOf("cart") !== -1 || root.indexOf("mine") !== -1) {
                      console.log("11111")
                      wx.switchTab({
                        url: '/' + t.route
                      })
                    } else {
                      wx.redirectTo({
                        url: '/' + t.route + "?" + that.objectToUrlParams(t.options)
                      })
                    }


                  } else {
                    wx.switchTab({
                      url: '/pages/index/index',
                    })

                  }

                }
              }
            }
          })




        } else if (res.data.errno == 501) {

        }else{
          wx.showModal({
            title: '温馨提示',
            content: res.data.errmsg,
            showCancel: false,
            success(res) {
              if (res.confirm) {

              }
            }
          })
        }
      })

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})