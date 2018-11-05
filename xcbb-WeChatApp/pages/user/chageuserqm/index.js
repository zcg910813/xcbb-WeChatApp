const app = getApp();
const config = require('../../../utils/config.js');
const pack = require('../../../utils/util.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		signature: '还没有填写个性签名哦',
		num: '40',
		birthday:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this;
			that.setData({
				birthday:options.birthday
			})
	},
	acquire: function(e) {
		this.setData({
			username: e.detail.value
		})
	},
	bindinput: function(e) {
		var that = this;
		that.setData({
			num: 40 - parseInt(e.detail.value.length),
			signature: e.detail.value
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},
	saves: function() {
		var that = this;
		var userinfos = app.usermessage;
		var parameter = ({
			'uid': userinfos.x_uid,
			'token': userinfos.x_token,
			'birthday': that.data.birthday,
			'uuid': userinfos.x_uid,
			'isPublicBirth': 1,
			'usersign': that.data.signature
		})
		pack.request(config.change_info, 'post', parameter, function(res) {
			if(res.data.success == true) {
				pack.tipsIframe('修改成功');
				setTimeout(function() {
					wx.navigateBack({})
				}, 1000)
			} else {
				pack.tipsIframe(res.data.error_code_desc);
			}
		})
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