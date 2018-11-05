// pages/compile/compile.js
const app = getApp();
const config = require('../../utils/config.js');
const pack = require('../../utils/util.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		headimg: '../image/list1.jpg',
		region: ['家乡'],
		animationData: {},
		sex: ['男', '女'],
		issex: '男',
		chooseSize: false,
		userinfo: '',
		birthday: ''
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

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		var that = this;
		var userinfos = app.usermessage;
		that.setData({
			userinfo: userinfos
		})
		var prames = ({
			uid: userinfos.x_uid,
			token: userinfos.x_token
		});

		pack.request(config.getinfo_simple, 'post', prames, function(res) {
			var data = res.data;

			that.data.birthday = data.userMap.birthday;
			var thistime = pack.years();
			var htime = pack.timestampToTime(data.userMap.birthday);
			var age = thistime - htime;
			data.userMap.birthday = age
			data.userMap.photo = 'http://www.xiuktv.com/PubImgSour/' + data.userMap.photo + '.png';
			console.log(data.userMap)
			that.setData({
				userinfo: data,
				birthday: that.data.birthday,
				issex: data.userMap.sex == 1 ? '女' : '男',
			})
		})

	},
	ismax: function(e) {
		var that = this;
		var userinfos = app.usermessage;
		this.colsoes();
		console.log(that.data.birthday)
		var pramates = {
			'uid': userinfos.x_uid,
			'token': userinfos.x_token,
			'birthday': that.data.birthday,
			'uuid': userinfos.x_uid,
			'isPublicBirth': 1,
			'sex': e.currentTarget.dataset.index
		}
		pack.request(config.change_info, 'post', pramates, function(res) {
			that.data.userinfo.userMap.sex = res.data.user[0].sex;
			that.data.birthday = res.data.user[0].birthday;
			that.setData({
				userinfo: that.data.userinfo,
				issex: that.data.userinfo.userMap.sex == 1 ? '女' : '男',
				birthday:that.data.birthday
			})
		})

	},

	selseisman: function() {

		var animation = wx.createAnimation({
			timingFunction: 'ease',
		})

		this.animation = animation

		this.setData({
			animationData: animation.export(),
			chooseSize: true

		})

		animation.translate(0, -188).step()
		this.setData({
			animationData: animation.export()
		})
	},
	colsoes: function() {
		var animation = wx.createAnimation({
			timingFunction: 'ease',
		})

		this.animation = animation

		this.setData({
			animationData: animation.export()
		})

		animation.translate(0, 0).step()
		this.setData({
			animationData: animation.export(),
			chooseSize: false
		})
	},
	changeheadimg: function() {
		var that = this;
		var userinfos = app.usermessage;
		wx.chooseImage({
			count: 1, // 一次最多可以选择2张图片一起上传
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function(res) {
				wx.getFileSystemManager().readFile({
					filePath: res.tempFilePaths[0], //选择图片返回的相对路径
					encoding: 'base64', //编码格式
					success: res => { //成功的回调
						var prames = {
							uid: userinfos.x_uid,
							token: userinfos.x_token,
							photo: res.data
						}
						pack.request(config.upload, 'post', prames, function(res) {
							if(res.statusCode == 200) {
								var headimg = res.data.img;
								that.data.userinfo.userMap.photo = headimg
								that.setData({
									userinfo: that.data.userinfo
								})
							} else {
								wx.showToast({
									title: '修改失败',
									icon: 'none',
									duration: 2000
								})
							}

						})
					}
				})

			}
		})
	},
	bindRegionChange: function(e) {
		var userinfos = app.usermessage;
		var that = this;
		that.setData({
			region: e.detail.value
		})
		var province = e.detail.value[0];
		var city = e.detail.value[1];
		var areas = e.detail.value[2];
		
		console.log(that.data.birthday)
		
		var praramte = {
			'uid': userinfos.x_uid,
			'token': userinfos.x_token,
			'uuid': userinfos.x_uid,
			'birthday': that.data.birthday,
			'isPublicBirth': 1,
			'province': province,
			'city': city,
			'area': areas
		}
		pack.request(config.change_info, 'post', praramte, function(res) {
			if(res.statusCode == 200) {
				that.data.userinfo.userMap.province = res.data.user[0].province;
				that.data.userinfo.userMap.area = res.data.user[0].area;
				that.data.userinfo.userMap.city = res.data.user[0].city;
				that.data.birthday = that.data.userinfo.userMap.birthday;
				that.setData({
					userinfo: that.data.userinfo,
					birthday:that.data.birthday
				})
			}
		})
	},
	changeDate: function(e) {
		var that = this;
		var data = new Date(e.detail.value);
		var userinfos = app.usermessage;
		var timesc = '';
		timesc = Math.round(data.getTime() / 1000).toString();

		var tiemss = pack.timestampToTime(timesc);
		var thistime = pack.years();

		if(tiemss > thistime) {
			wx.showToast({
				title: '选择的年份不能大于当前的年份',
				icon: 'none',
				duration: 2000
			})
			return;
		}

		var pramate = {
			'uid': userinfos.x_uid,
			'token': userinfos.x_token,
			'birthday': timesc,
			'uuid': userinfos.x_uid,
			'isPublicBirth': 1
		}
		pack.request(config.change_info, 'post', pramate, function(res) {
			pack.years()
			if(res.statusCode == 200) {
				var data = res.data.user[0];
				var birthday = data.birthday;
				var thistime = pack.years();
				var htime = pack.timestampToTime(birthday);
				var age = thistime - htime;
				that.data.userinfo.userMap.birthday = age;
				that.data.birthday = that.data.userinfo.userMap.birthday;
				that.setData({
					userinfo: that.data.userinfo,
					birthday:that.data.birthday
				})
			}
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