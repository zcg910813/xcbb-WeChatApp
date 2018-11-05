// pages/index/getuser.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		btton_show: true
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this;
		wx.getSetting({
			success: function(res) {
				if(res.authSetting['scope.userInfo']) {
					console.log('用户已授权')
					app.usermessage = wx.getStorageSync('userinfo');
					wx.redirectTo({
						url: '/pages/index/index'
					});
				} else {
					console.log('游客模式')
				}
				console.log(res.authSetting)
			}
		})

	},
	onGotUserInfo: function(e) {
		app.getUserInfo(e, function(user) {
			if(user.x_uid) {
				console.log('获取到啦', user.x_uid)
				wx.setStorageSync('userinfo', user);;
				app.usermessage = wx.getStorageSync('userinfo');
				wx.redirectTo({
					url: '/pages/index/index'
				});
			} else {
				app.usermessage = app.userinfo;
				console.log('没获取到', app.usermessage)
				wx.showToast({
					title: '您未授权,将以游客身份观看！',
					icon: 'none',
					duration: 1000,
					success: function() {
						setTimeout(function() {
							wx.redirectTo({
								url: '/pages/index/index'
							});
						}, 1000)
						//						typeof cb == "function" && cb(user);
					}
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

	}
})