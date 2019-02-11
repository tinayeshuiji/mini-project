const app = getApp();
const api = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationShow: false,
    city: '',
    region: ['福建省', '福州市', '鼓楼区'],
    phone: '',
    codeShow: 0,
    refund_data_1: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 获取定位
  selectArea: function() {
    var that = this;

    wx.getSetting({
      success(res) {
        console.log(res.authSetting['scope.userLocation'])
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success(res1) {
              console.log(res1)
              wx.chooseLocation({
                success: function(res) {
                  // success
                  console.log(res, "location")

                  let latitude = res.latitude;
                  let longitude = res.longitude;
                  // let Pages = getCurrentPages();
                  // let PrevPage = Pages[Pages.length - 2];
                  // let locationArea = res.name
                  // wx.setStorageSync('locationArea', locationArea);
                  // wx.setStorageSync('latitude', latitude);
                  // wx.setStorageSync('longitude', longitude);
                  // PrevPage.setData({
                  //   locationArea: locationArea,

                  // });
                  // wx.navigateBack({
                  //   delta: 1
                  // });



                },
                fail: function() {

                },
                complete: function() {

                }
              })
            },
            fail: function(res2) {
              console.log(res2)
              wx.showModal({
                title: '温馨提示',
                content: '您拒绝授权后，将无法获取定位',
                cancelText: '去授权',
                success: function(res) {
                  if (res.confirm) {

                  } else if (res.cancel) {
                    that.setData({
                      locationShow: true

                    })
                  }
                }
              })
            }
          })
        } else {
          wx.chooseLocation({
            success: function(res) {
              // success
              console.log(res, "location")
              let latitude = res.latitude;
              let longitude = res.longitude;
              // let Pages = getCurrentPages();
              // let PrevPage = Pages[Pages.length - 2];
              // let locationArea = res.name;
              // wx.setStorageSync('locationArea', locationArea);
              // wx.setStorageSync('latitude', latitude);
              // wx.setStorageSync('longitude', longitude);
              // PrevPage.setData({
              //   locationArea: locationArea,

              // });
              // wx.navigateBack({
              //   delta: 1
              // });





            },
            fail: function() {
              // fail
            },
            complete: function() {
              // complete
            }
          })

        }
      }
    })




  },
  openLoation: function() {
    this.setData({
      locationShow: false,

    })

  },
  getCurrentCity() {

    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/?ak=c7QlcIklxGgxgLm4YXVo0GNUWFu8gueU&location=' + latitude + ',' + longitude + '&output=json',
          data: {},
          header: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            // success    
            console.log(res);
            var city = res.data.result.addressComponent.city;
            that.setData({
              city: city
            });
          },
          fail: function() {
            // that.setData({ city: "获取定位失败" });
          },

        })

      }
    })
  },
  changePhone: function(e) {
    // console.log(e)
    this.setData({
      phone: e.detail.value
    })
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  getCode: function() {
    var that = this;
    that.setData({
      codeShow: 1
    }, function() {
      app.http(api.regCaptchaUrl, {
        modeType: 1,
        mobile: that.data.phone
      }, 'POST').then((res) => {
        console.log(res)
        if (res.data.errno == 0) {



        } else if (res.data.errno == 501) {

        } else {
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


    })





  },
  wxPay: function() {
    var t = this;
    app.http(api.orderSubmitUrl, {
      addressId: t.data.addressId,
      message: t.data.message

    }, 'POST').then((res) => {
      console.log(res)
      if (res.data.errno == 0) {
        app.http(api.orderPrepayUrl, {
          orderId: res.data.data,
        }, 'POST').then((rs) => {
          console.log(rs)
          if (rs.data.errno == 0) {
            let pay = rs.data.data;
            wx.requestPayment({
              timeStamp: pay.timeStamp,
              nonceStr: pay.nonceStr,
              package: pay.packageValue,
              signType: pay.signType,
              paySign: pay.paySign,
              complete(res0) {
                console.log(res0)
                if (res0.errMsg == 'requestPayment:ok') {


                } else {


                }
              }
            })





          }
        })





      } else {
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

  },
  upLoad: function() {
    var t = this;
    var i = t.data.refund_data_1,
      d = 0;
    i.pic_list && (d = i.pic_list.length || 0);
    var s = 6 - d;
    wx.chooseImage({
      count: s,
      success: function(res) {
        let picUrls = res.tempFilePaths;
        for (var j = 0; j < picUrls.length; j++) {
          wx.uploadFile({
            url: api.uploadUrl,
            filePath: picUrls[j].toString(),
            name: 'file',
            success: function(res) {
              console.log(res)
              var a = JSON.parse(res.data);

              let p = t.data.refund_data_1;
              if (p.pic_list == undefined) {
                p.pic_list = []
              }

              p.pic_list.push(a.data.url)

              t.setData({
                refund_data_1: p
              })
              console.log(t.data.refund_data_1)



            },
            fail: function(err) {
              console.log(err)
            },
            complete: function(res0) {



            }
          })

        }

      }
    });
  },
  deleteImage: function(e) {
    console.log(e)
    var t = this,
      i = e.currentTarget.dataset.index;
    var d = t.data.refund_data_1;
    d.pic_list.splice(i, 1);
    t.setData({
      refund_data_1: d
    });
  },
  backPrepage: function() {
    let Pages = getCurrentPages();
    let PrevPage = Pages[Pages.length - 2];
    let locationArea = res.name;
    PrevPage.setData({
      locationArea: locationArea,

    });
    wx.navigateBack({
      delta: 1
    });
    // 本地存储
    wx.setStorageSync('locationArea', locationArea);
    wx.setStorageSync('latitude', latitude);
    wx.setStorageSync('longitude', longitude);
   


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
     // 获取本地存储
    var locationArea = wx.getStorageSync('locationArea');

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