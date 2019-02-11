// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    footList: [{
        addTime: "2019-01-31 15:29:58",
        brief: "精致钢材，美容清洁",
        carCount: 1,
        goodsId: 1110017,
        id: 981,
        name: "耐用材料猫咪护理清洁套装",
        picUrl: "http://yanxuan.nosdn.127.net/534231583f82572398ec84bad425cdaf.png",
        retailPrice: 79
      },
      {
        addTime: "2019-01-31 15:30:02",
        brief: "精致钢材，耐咬美容",
        carCount: 0,
        goodsId: 1110018,
        id: 982,
        name: "耐用狗狗清洁美容护理套装",
        picUrl: "http://yanxuan.nosdn.127.net/d93aa5d6e7a296101cf4cb72613aeda6.png",
        retailPrice: 79
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  getFootList: function () {
    var t = this;
    let page = t.data.page;
    let size = t.data.size;
    app.http(api.footListUrl, {
      page: page,
      size: size
    }, 'get').then((res) => {
      console.log(res)
      if (res.data.errno == 0) {
        let footList = t.data.footList.concat(res.data.data.footprintList)
        t.setData({
          footList: footList,
          totalPage: res.data.data.totalPages
        })

      } else if (res.data.errno == 501) {
        app.errFun();

      }
    })
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
    let that = this;
    that.setData({
      pageIndex:1,
      footList: []
    })
    that.getFootList();

    wx.stopPullDownRefresh();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this;
    let page = that.data.page + 1;
    let size = that.data.size;
    let totalPage = that.data.totalPage;
    console.log(totalPage)
    if (page <= totalPage) {
      that.setData({
        page: page
      }, function () {
        that.getFootList();
      })

    } else {
      wx.stopPullDownRefresh();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})