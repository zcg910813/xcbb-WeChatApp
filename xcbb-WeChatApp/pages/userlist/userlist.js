// pages/userlist/userlist.js
const app = getApp();
const __ = require('../../utils/base.js');
const config = require('../../utils/config.js');
const pack = require('../../utils/util.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userlist: '',
		usernav: ['在线', '新人'],
		statics: 0
	},
	usernavs: function(e) {
		var that = this;
		that.setData({
			statics: e.target.dataset.index
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this;
		var pratems = {
			'uid': '10006371',
			'token': 'TVRBd01EVXhNem5DcDI5MFluQXlOMm80T1hReE5URTFNRFUzTlRReU5qUTB3cWN4TlRNME9ERTNOemMzT1RNMw%253D%253D',
			'roomid': '131696',
			'zid': '10006373'
		};
		pack.request(config.user_list, 'post', pratems, function(res) {
			if(res.statusCode == 200) {
				var user_list = res.data.onLineDatas;

				for(var i = 0; i < user_list.length; i++) {
					user_list[i].photo = config.host + 'PubImgSour/' + user_list[i].photo + '.png'
				}

				that.setData({
					userlist: user_list
				})

				console.log(that.data.userlist)

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