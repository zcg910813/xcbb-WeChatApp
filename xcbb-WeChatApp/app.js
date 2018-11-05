const app = getApp()
const pack = require('utils/util.js'); //封装的所有方法
const config = require('utils/config.js'); //封装的所有方法
App({

	/**
	 * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
	 */
	onLaunch: function() {

	},
	//用户信息
	usermessage: '',
	//默认信息
	userinfo: {
		x_uid: 10005139,
		x_token: 'TVRBd01EVXhNem5DcDI5MFluQXlOMm80T1hReE5URTFNRFUzTlRReU5qUTB3cWN4TlRNME9ERTNOemMzT1RNMw%3D%3D'
	},

	//获取用户信息判断
	getUserInfo: function(user, cb) {
		var that = this;
		console.log(user)
		if(user.detail.userInfo) {
			var openids = user.detail;
			var user = user.detail.userInfo;
			user.encryptedData = openids.encryptedData;
			user.iv = openids.iv;
			//获取code
			wx.login({
				success: function(res) {
					var code = res.code; //code
					that.getLineUserInfo(code, user, function(res) {
						user.x_uid = res.uid;
						user.x_token = res.token;
						typeof cb == "function" && cb(user)
					})

				},
				fail: function() {
					pack.tipsIframe('用户登录失败');
				}
			})
		} else {
			typeof cb == "function" && cb(user);
		}
	},

	//根据code获取用户信息
	getLineUserInfo: function(code, userinfo, cb) {
		if(code) {
			var data = {
				username: userinfo.nickName,
				image_url: userinfo.avatarUrl,
				code: code,
				encryptedData: userinfo.encryptedData,
				iv: userinfo.iv
			};
			pack.request(config.code_userinfo, 'post', data, function(res) {
				typeof cb == "function" && cb(res.data)
			})
		}
	},

	/**
	 * 当小程序启动，或从后台进入前台显示，会触发 onShow
	 */
	onShow: function(options) {

	},

	/**
	 * 当小程序从前台进入后台，会触发 onHide 
	 */
	onHide: function() {

	},

	/**
	 * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
	 */
	onError: function(msg) {

	}
})