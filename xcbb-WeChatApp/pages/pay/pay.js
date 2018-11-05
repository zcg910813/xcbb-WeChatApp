// pages/pay/pay.js
const app = getApp();
const __ = require('../../utils/base.js');
const config = require('../../utils/config.js');
const pack = require('../../utils/util.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		chongzhiList: null, //充值列表数据
		xuanzhongId: "", //选中项id
		productid: "", //选中商品id
		jiage: "", //选中商品价格
		userinfo: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let that = this;
		var userinfos = app.usermessage;
		var prames = ({
			uid: userinfos.x_uid,
			token: userinfos.x_token
		});
		pack.request(config.user_info, 'post', prames, function(res) {
			var res = res.data;
			res.userInfo.photo = 'http://www.xiuktv.com/PubImgSour/' + res.userInfo.photo + '.png'
			that.setData({
				userinfo: res.userInfo
			})
		})

		//请求后台充值列表数据
		pack.request(config.goods, 'get', {
				uid: userinfos.x_uid,
				token: userinfos.x_token,
				platform: "1"
			},
			function(res) {
				console.log(res.data.goodsList);
				that.setData({
					chongzhiList: res.data.goodsList
				})
			}
		)

	},

	xuanzhong(e) { // 选中价格套餐的方法
		// console.log(e.currentTarget.dataset.id);
		console.log(e)
		let that = this;
		let id = e.currentTarget.dataset.id;
		let chongzhiList = that.data.chongzhiList
		for(let i = 0; i < chongzhiList.length; i++) {
			if(id == chongzhiList[i].id) {
				that.setData({ //设置选中商品id、价格
					productid: chongzhiList[i].goods_id,
					jiage: Math.round(chongzhiList[i].price * 100, 0)
				})
				console.log(that.data.jiage)
			}
		}
		this.setData({
			xuanzhongId: id
		})
	},

	pay() { //点击支付功能方法
		//获取相应支付数据
		let that = this;
		if(that.data.xuanzhongId == "") {
			wx.showModal({
				title: '尊敬的用户',
				content: '您还未选择秀币套餐！',
			})
		}
		//请求后台支付接口

		pack.request(config.getprepayid, 'post', {
				uid: app.usermessage.x_uid, //主播id  20264733   
				token: app.usermessage.x_token, //令牌
				//TWpBeU5qUTNNelBDcHpOamF6aDJjWFF5TUdveE5UTXpOVE0yTXpJNE5qQXp3cWN4TlRNek5UTTJNekk0TmpZNA==
				productid: that.data.productid, //商品id
				amount: that.data.jiage, //商品金额  
				// orderid:"WXPHONE081615455911857",     //订单类型  后台设定为 非 必填项
				clientip: "0.0.0.0", //客户端ip
				clientType: 1 //  客户端类型   c参数为固定值：1
			},
			function(res) {
				console.log(res);
				let data = res.data.data;
				that.orderBuy(data.timeStamp, data.nonceStr, data.package, data.sign);
			}
		)


	},

	orderBuy(timeStamp, nonceStr, prepayId, paySign) { //微信支付方法   参数为api发送请求数据
		let that = this;
		wx.requestPayment({ //小程序微信支付api
			timeStamp: timeStamp,
			nonceStr: nonceStr,
			package: prepayId,
			signType: "MD5", //固定值 MD5                           
			paySign: paySign,
			success: function(res) {
				wx.showModal({
					title: '支付提示',
					content: '您已支付成功！',
					success:function(){
						that.onLoad();
					}
				})
			},
			fail: function(res) {
				console.log(res)
				wx.showModal({
					title: '支付提示',
					content: '您放弃了支付!'
				})
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

	},

})