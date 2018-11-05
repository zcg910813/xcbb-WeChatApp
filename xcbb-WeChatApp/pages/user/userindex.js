// pages/user/userindex.js
const app = getApp();
const config = require('../../utils/config.js');
const pack = require('../../utils/util.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: '',
		width: 0,
		footerNav: [{
				navName: '直播',
				urll: '/pages/index/index',
			},
			{
				navName: '我的',
				urll: '/pages/user/userindex'
			}
		],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
		
	},
	clickNav: function(e) {
		var index = e.currentTarget.dataset.index;
		if(index == 0) {
			wx.redirectTo({
				'url': '/pages/index/index'
			})
		} else {
			wx.redirectTo({
				'url': '/pages/user/userindex'
			})
		}
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		var that = this;
		var userinfos = app.usermessage;
		var prames = ({
			uid:userinfos.x_uid,
			token:userinfos.x_token
		});
		
		
		
		pack.request(config.getinfo_simple, 'post', prames, function(res) {
			var data = res.data;
			data.userMap.photo = 'http://www.xiuktv.com/PubImgSour/'+data.userMap.photo+'.png';
			console.log(data.userMap)
			that.setData({
				userInfo:data,
				width: parseInt( data.userMap.consume_level / data.userMap.consume_exp * 100)
			})
		})


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