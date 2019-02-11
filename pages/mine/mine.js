// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationShow: false,
    city:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取定位
  selectArea: function () {
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
                success: function (res) {
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
                fail: function () {

                },
                complete: function () {

                }
              })
            },
            fail: function (res2) {
              console.log(res2)
              wx.showModal({
                title: '温馨提示',
                content: '您拒绝授权后，将无法获取定位',
                cancelText: '去授权',
                success: function (res) {
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
            success: function (res) {
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
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })

        }
      }
    })




  },
  openLoation: function () {
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
          success: function (res) {
            // success    
            console.log(res);
            var city = res.data.result.addressComponent.city;
            that.setData({ city: city });
          },
          fail: function () {
            // that.setData({ city: "获取定位失败" });
          },

        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})