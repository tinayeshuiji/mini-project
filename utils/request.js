const app = getApp();

var http = function (url, data, method) {
  let title = '加载中';
  let that=this;

  that.showLoad(title);

  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    var header = { 'Content-Type': 'application/json; charset=UTF-8' };
    var token = wx.getStorageSync('token');
    header.token=token;
    // console.log(header)
    wx.request({
      url: url,
      data: data,
      method: method,
      header: header,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      },
      complete:function(){
        that.hideLoad();
      }
    });
  });
 

 
}


module.exports.http = http

