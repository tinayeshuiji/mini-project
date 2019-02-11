Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [{
        img: '/images/banner1.jpg',
        id: 1
      },
      {
        img: '/images/banner2.jpg',
        id: 2
      },
      {
        img: '/images/banner1.jpg',
        id: 3
      }
    ],
    information: [
      {
      content: "12-12恭喜林总推荐王总抵押贷放款140万！",
      created_at: 1544603680,
      id: 12,
      listorder: 1,
      status: 1,
      updated_at: 1544604212
    },
      {
        content: "12-13恭喜林总推荐王总抵押贷放款100万！",
        created_at: 1544603680,
        id: 12,
        listorder: 1,
        status: 1,
        updated_at: 1544604212
      },
    ]



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this;
    // 获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      }
    })

  },
  // 拨打电话
  call: function () {
    wx.makePhoneCall({
      phoneNumber: '13696882665'
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