// pages/user/chageusername/index.js
const app = getApp();
const config = require('../../../utils/config.js');
const pack = require('../../../utils/util.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		username: "",
		birthday:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this;
		that.setData({
			username: options.username,
			birthday:options.birthday
		})
	},
	empty: function() {
		var that = this;
		that.setData({
			username: ''
		})
	},
	acquire: function(e) {
		this.setData({
			username: e.detail.value
		})
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
			'nick': that.data.username
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