// pages/catalog/catalog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cat_list: [],
    activeIndex: 0,
    height: '',
    titleList: [{
        id: 5,
        name: '深海鱼'
      },
      {
        id: 43,
        name: '贝类'
      },
      {
        id: 50,
        name: '虾蟹'
      },
      {
        id: 44,
        name: '鱼丸'
      },
    ],
    goods_list: [{
      goods_num: 73,
      id: "62",
      introduce: "肉质厚实 饱满紧致",
      name: "大鲈鱼",
      num: "27",
      original_price: "56.00",
      pic_url: "https://mini.maxcc.com.cn/web/uploads/image/48/485b3ad856ff5e8d9b56e440012a1019.jpg",
      price: "55.00",
      sales: "127条",
      unit: "条",
      virtual_sales: "100",
      weight: "0g"
    }],
    cat_id: '',
    page: 1,
    limit: 6,
    totalPage: 1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // that.loadData();
    wx.getSystemInfo({
      success(res) {
        that.setData({
          height: res.windowHeight 
        })

      }
    })

  },
  loadData: function(e) {
    var s = this;
    a.request({
      url: t.default.cat_list,
      success: function(res) {
        console.log(res)
        if (res.code == 0) {
          let cat_list = res.data.list;
          let titleList = [];
          let itemList = [];
          let cat_id = '';
          for (var i in cat_list) {
            let arr = {};
            arr.id = cat_list[i].id;
            arr.name = cat_list[i].name;
            titleList.push(arr);
            cat_id = cat_list[0].id;

          }
          s.setData({
            cat_list: cat_list,
            titleList: titleList,
            itemList: itemList,
            cat_id: cat_id
          }, function() {
            s.loadGoodList();
          })


        }

      },
      complete: function() {

      }
    });
  },
  loadGoodList: function() {
    let i = this;
    let cat_id = i.data.cat_id;
    let limit = i.data.limit;
    a.request({
      url: t.default.goods_list,
      data: {
        page: 1,
        limit: limit,
        cat_id: cat_id
      },
      success: function(res) {
        console.log(res)

        if (res.code == 0 && 0 !== res.data.list.length) {
          var list = res.data.list;

          i.setData({
            goods_list: list,
            totalPage: res.data.page_count,

          });
        }


      },
      complete: function() {

      }
    });
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