// var host = "http://192.168.1.183:8082";
var host = "https://llgc.net.cn";


var config = {
  host: host,
  login_by_weixin: `${host}/wx/auth/login_by_weixin`,
  registerUrl: `${host}/wx/auth/register`,
  regCaptchaUrl: `${host}/wx/auth/regCaptcha`,
  bindPhoneUrl: `${host}/wx/auth/bindPhone`,
  setPayPwdUrl: `${host}/wx/auth/setPayPwd`,
  indexUrl: `${host}/wx/home/index`,
  addressLIstUrl: `${host}/wx/address/list`,
  saveAddressUrl: `${host}/wx/address/save`,
  deleteAddressUrl: `${host}/wx/address/delete`,
  saveAddressUrl: `${host}/wx/address/save`,
  catalogCurrentUrl: `${host}/wx/catalog/current`,
  catalogIndexUrl: `${host}/wx/catalog/index`,
  footListUrl: `${host}/wx/footprint/list`,
  deleteFootUrl: `${host}/wx/footprint/delete`,
  goodsListUrl: `${host}/wx/goods/list`,
  goodsBanerUrl: `${host}/wx/goods/goodsBaner`,
  cartListUrl: `${host}/wx/cart/index`,
  addCartUrl: `${host}/wx/cart/add`,
  checkoutUrl: `${host}/wx/cart/checkout`,
  checkedCartUrl: `${host}/wx/cart/checked`,
  cartdeleteUrl: `${host}/wx/cart/delete`,
  goodsDetailUrl: `${host}/wx/goods/detail`,
  seckillListUrl: `${host}/wx/seckill/list`,
  sinceTheLiftUrl: `${host}/wx/sinceTheLift/list`,
  consumptionDetailsUrl: `${host}/wx/consumptionDetails/listbyMonth`,
  integralAllUrl: `${host}/wx/integral/listAll`,
  listbyIntegralTypeUrl: `${host}/wx/integral/listbyIntegralType`,
  addmemberUrl: `${host}/wx/member/addmember`,
  mycouponUrl: `${host}/wx/coupon/mylist`,
  couponListUrl: `${host}/wx/coupon/list`,
  receiveCouponUrl: `${host}/wx/coupon/receive`,
  orderSubmitUrl: `${host}/wx/order/submit`,
  orderPrepayUrl: `${host}/wx/order/prepay`,
  orderListUrl: `${host}/wx/order/list`,
  orderDetailUrl: `${host}/wx/order/detail`,
  orderCancelUrl: `${host}/wx/order/cancel`,
  orderConfirmUrl: `${host}/wx/order/confirm`,
  orderDeleteUrl: `${host}/wx/order/delete`,
  orderRefundUrl: `${host}/wx/order/refund`,
  orderCommentUrl: `${host}/wx/order/comment`,
  orderGoodsUrl: `${host}/wx/order/goods`,
  applyForAfterSaleUrl: `${host}/wx/order/applyForAfterSale`,
  userIndexUrl: `${host}/wx/user/index`,
  balanceListDetailUrl: `${host}/wx/recharge/balanceListDetail`,
  balanceRechargeSubmitUrl: `${host}/wx/recharge/balanceRechargeSubmit`,
  prepayForBalanceUrl: `${host}/wx/recharge/prepayForBalance`,
  moneyUrl: `${host}/wx/recharge/money`,
  searchSinceTheLiftUrl: `${host}/wx/sinceTheLift/searchSinceTheLift`,
  addTicketUrl: `${host}/wx/ticket/addTicket`,
  helpAndFeedBackUrl: `${host}/wx/user/helpAndFeedBack`,
  helperUrl: `${host}/wx/search/helper`,
  searchIndexUrl: `${host}/wx/search/index`,
  makeQrForBalanceUrl: `${host}/wx/order/makeQrForBalance`,
  judgeUrl: `${host}/wx/order/judge`,
  regionListUrl: `${host}/wx/region/list`,
  balancePayUrl: `${host}/wx/recharge/balancePay`,
  shareHappyUrl: `${host}/wx/user/shareHappy`,
  shareHappyForQrCode: `${host}/wx/user/shareHappyForQrCode`,
  fetchCouponByShareUrl: `${host}/wx/coupon/fetchCouponByShare`,
  adListUrl: `${host}/wx/ad/list`,
  rechargeManageUrl: `${host}/wx/rechargeManage/list`,
 clearhistoryUrl: `${host}/wx/search/clearhistory`,
 uploadUrl: `${host}/wx/storage/upload`,
  membershipInterestsUrl: `${host}/wx/user/membershipInterests`,





}
module.exports = config;