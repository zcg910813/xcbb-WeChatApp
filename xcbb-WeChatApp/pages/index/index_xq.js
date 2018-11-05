const app = getApp();
var page = undefined;
const __ = require('../../utils/base.js');
const config = require('../../utils/config.js');
const pack = require('../../utils/util.js');
Page({

	/**
	 * 页面的初始数据
	 */

	getstatement: function(e) {
		var that = this;
		var val = e.detail.value;
		this.setData({
			statement: val
		});
	},
	//@用户
	pesionse: function() {
		var that = this;
		var username = that.data.queryOtherInfo.userInfo.nick;
		var userid = that.data.queryOtherInfo.userInfo.uid;
		that.setData({
			inputs: username + ':',
			'callWho.username': username,
			'callWho.userid': userid,
			card: false,
			inputhidden: true,
			chooseSize: false,
			isinput: true,
			inputhidden: true
		})
	},

	confirmTap: function(e) {
		var that = this;
		that.sendbtn();
	},

	sendbtn: function() {
		var thiz = this;
		var userinfo = app.usermessage;
		if(thiz.data.statement.indexOf(thiz.data.callWho.username) != -1) {
			var reg = /[^:]*:([^:]*)/;
			thiz.data.statement = thiz.data.statement.replace(reg, "$1");
			console.log(thiz.data.statement)
			var PAtMessage = {
				cmd: 'PAtMessage',
				fromUid: userinfo.x_uid,
				toUid: thiz.data.callWho.userid,
				sid: thiz.data.sid,
				singeridv: thiz.data.zid,
				fromNickname: userinfo.nickName,
				toNickname: thiz.data.callWho.username,
				context: thiz.data.statement
			}
			wx.sendSocketMessage({
				data: thiz.business_package(PAtMessage),
				success() {
					console.log('@成功')
					thiz.setData({
						inputs: '',
						inputhidden: false,
						chooseSize: true
					})
				},
				fail(res) {
					console.log(res)
				}
			});
			return;
		}

		var statement = {
			"cmd": "PTextChat",
			"uid": userinfo.x_uid,
			"sid": thiz.data.sid,
			"singerid": thiz.data.zid,
			"context": thiz.data.statement
		};
		wx.sendSocketMessage({
			data: thiz.business_package(statement),
			success() {
				thiz.setData({
					inputs: '',
					inputhidden: false,
					chooseSize: true
				})
			},
			fail(res) {
				console.log(res)
			}
		});

	},

	bindbt: function() {
		var that = this;
		that.sendbtn();
	},

	//显示个人资料卡片
	iscard: function(event) {
		var that = this;
		var id = event.currentTarget.id;
		var userinfo = app.usermessage;
		that.setData({
			card: true
		})

		var parameter = ({
			uid: userinfo.x_uid,
			token: userinfo.x_token,
			fid: id
		});

		pack.request(config.user_info, 'post', parameter, function(res) {
			if(res.statusCode == 200) {
				var data = res.data;
				data.userInfo.photo = config.host + '/PubImgSour/' + data.userInfo.photo + '.png'
				that.setData({
					queryOtherInfo: data
				})
			}
		})

	},

	data: {
		host: '',
		callWho: {
			'username': '',
			'userid': ''
		}, //@谁
		headimg: '', //主播头像
		callWho: '',
		bottom_attention: '+关注',
		isgrop: false, //是否显示守护框
		inputs: '',
		new_person: '', //新人进场的数据
		sun_num_shows: false,
		sun_num: {},
		moneyFinal: '', //金币
		lightFinal: '', //阳光
		show_chat: true, //显示聊天框
		user_list: [],
		queryOtherInfo: '', //个人资料卡
		card: false,
		sun_tips: false,
		is_screen: false,
		statement: '', //发芽
		online_number: 0, //直播间在线人数
		online_users: [],
		inputhidden: false,
		videoheght: false, //直播高度
		videotop: 0,
		binouytbottom: 0,
		isinput: false, //设置弹出小键盘
		doommData: [],
		heart33: "",
		sunisshow: false, //太阳显示
		newsisopcity: false, //隐藏新人
		showss: 0, //点击太阳后的动画
		gifttabxz: 0, //礼物标题选中效果
		scrolls: "", //scrolls聊天滚动
		lwoneimg: "",
		live_gift: {
			cmd: "PSendGift",
			uid: "10006393", //用户id
			sid: "131696", //房间id
			uid_onmic: "10006373", //主播id
			id: "", //礼物id
			type: "1", //礼物类型
			num: "1", //礼物数量
			flag: "0", //连送标识
			buy: "1", //是否小号金币
			serialNum: "1", //连送序号
			cid: "1", //固定1
			sendTime: "", //赠送时间
			sender: "十年一梦", //赠送这昵称
			receiver: "用户1006371" //主播昵称
		},
		new_approachcs: false,
		chooseSize: true,
		res: {},
		res: {
			isLive: 1
		},
		nickName: '',
		username: '',
		live_url: '',
		animationData: {},
		sunfooterdata: {}, //太阳礼物下啦动画
		zid: '',
		uid: '',
		nums: '01',
		zjdj: [],
		gift_liwu: {},
		clickzs: 2,
		indicatorDots: true,
		autoplay: false,
		interval: 5000,
		duration: 1000,
		userInfo: {},
		zjsz: [],
		zjyg: [],
		jiaodus: "1",
		newleft: -400, //新人进场left初始值
		gift_left: -400, //送礼物下一的left值
		gift1img: 1,
		gift2img: 1,
		gift3img: 1,
		isgifts: [{

			},
			{

			},
			{

			},
			{

			}
		],
		cljas: {
			data: [

			]
		},
		duslanimate: {
			data: [{
					'id': '1',
					'left': -400,
					'opacity': 1,
					'show': false,
					'flage': ''
				},
				{
					'id': '3',
					'left': -400,
					'opacity': 1,
					'show': false,
					'flage': ''
				}, {
					'id': '2',
					'left': -400,
					'opacity': 1,
					'show': false,
					'flage': ''
				}
			]
		},
		discuss: [

		],
		videoheight: '', //视频高度
		userinfo: '',
		attention: "关注",
		sid: '', //房间id
		sun_time: '',
		guiard_message: '', //守护列表的人数 
		timer0: null,
		timer1: null,
		timer2: null,
		prents: false //阳光赠送按钮是否高亮
	},

	//显示阳光说明谈层
	show_sun_monolayer: function() {
		var that = this;
		that.setData({
			sun_tips: true
		})
	},
	//跳转主页
	skip_index: function() {
		wx.reLaunch({
			url: '/pages/index/index'
		})
	},

	livehide: function() {
		var that = this;
		that.setData({
			chooseSize: true,
			inputhidden: false,
			card: false
		})
		that.closez();
	},

	//赠送礼物
	present: function() {
		var thiz = this;
		var userinfo = app.usermessage;
		var timestamp = (new Date()).valueOf();
		thiz.data.live_gift.sendTime = timestamp;

		thiz.data.live_gift.uid = userinfo.x_uid;
		thiz.data.live_gift.sid = thiz.data.sid;
		thiz.data.live_gift.uid_onmic = thiz.data.zid;
		thiz.data.live_gift.sender = userinfo.nickName;
		thiz.data.live_gift.receiver = thiz.data.username
		console.log(thiz.data.live_gift)

		wx.sendSocketMessage({
			data: thiz.business_package(thiz.data.live_gift),
			success() {
				thiz.setData({
					inputs: '',
					inputhidden: false,
					chooseSize: true
				})
				thiz.closez();
			},
			fail(res) {
				console.log(res)
			}
		});

	},

	//关注主播
	attention: function() {
		var that = this;
		var userinfo = app.usermessage;
		var paramete = ({
			'uid': userinfo.x_uid,
			'fid': that.data.zid,
			'token': userinfo.x_token,
			'type': 1
		})
		pack.request(config.attention, 'post', paramete, function(res) {
			if(res.statusCode == '200') {
				console.log(res)
				that.setData({
					attention: '已关注'
				})
			}
		})
	},
	//关注下主播
	attentionbottom: function() {
		var that = this;
		var userinfo = app.usermessage;
		var userid = that.data.queryOtherInfo.userInfo.id;
		var parameter = {
			'uid': userinfo.x_uid,
			'fid': userid,
			'token': userinfo.x_token,
			'type': 1
		}
		pack.request(config.attention, 'post', parameter, function(res) {
			that.data.queryOtherInfo.userInfo.follFlag = 1
			that.setData({
				queryOtherInfo: that.data.queryOtherInfo
			})
		})
	},

	//守护弹框控制
	guardshow: function() {
		var thiz = this;
		this.setData({
			chooseSize: false,
			show_chat: false,
			isgrop: true
		})
		thiz.videos();
	},

	clipboards: function() {
		wx.showModal({
			title: '复制成功',
			content: '复制下载地址成功，请打开您的手机浏览器点击地址栏去下载',
			success: function(res) {
				wx.setClipboardData({
					data: 'http://www.xcbobo.com',
					success: function(res) {

					},
					fail: function(res) {
						console.log(res)
					}
				})
			}

		})

	},

	//跳转用户列表
	skip_userlist: function() {
		wx.navigateTo({
			url: '/pages/userlist/userlist'
		})
	},
	onLoad: function(options) {

		page = this;
		var that = this;
		var socketOpen = false
		var userinfos = app.usermessage;

		//获取阳光礼物
		var sun_paraetme = ({
			uid: userinfos.x_uid,
			token: userinfos.x_token,
		});
		pack.request(config.sun_gift, 'post', sun_paraetme, function(data) {
			var itemllist = data.data.itemList;
			for(var i = 0; i < itemllist.length; i++) {
				itemllist[i].icon = config.host + itemllist[i].icon
			}
			that.setData({
				zjyg: itemllist
			})
		})

		var userprame = ({
			'uid': userinfos.x_uid,
			'token': userinfos.x_token
		})
		pack.request(config.user_info, 'post', userprame, function(res) {
			if(res.statusCode == 200) {
				var data = res.data;
				data.userInfo.photo = config.host + '/PubImgSour/' + data.userInfo.photo + '.png'
				that.setData({
					queryOtherInfo: data
				})
			}
		})
		that.websoket();

		that.setData({
			nickName: nickName,
			username: options.username,
			live_url: options.live_url,
			uid: options.uid,
			zid: options.zid,

			new_approachcs: true,
			sid: options.sid,
			headimg: options.headimg,
			host: config.host
		})

		var zjygs = [];
		var userinfo = app.usermessage;
		that.setData({
			userinfo: userinfo
		})

		wx.request({
			url: config.host + '/xcbb_web/business/mobile/dig/getBackPackItemList',
			data: {
				uid: userinfo.x_uid,
				token: userinfo.x_token,
			},
			success: function(res) {
				wx.hideLoading();
				var ret = res.data;
				var suncountodwn = parseInt(ret.sunCountdown / 60)
				that.setData({
					sun_time: suncountodwn
				})
			}
		})

		//在线用户列表右上角
		var userinlist = {
			'uid': userinfo.x_uid,
			'token': userinfo.x_token,
			'roomid': '131696',
			'zid': that.data.zid
		}
		pack.request(config.user_list, 'post', userinlist, function(res) {
			if(res.statusCode == 200) {
				var user_list = res.data.onLineDatas;
				for(var i = 0; i < user_list.length; i++) {
					user_list[i].photo = config.host + 'PubImgSour/' + user_list[i].photo + '.png'
				}
				that.setData({
					user_list: user_list
				})
			}
		})

		var nickName = userinfo.nick;

		wx.setNavigationBarTitle({
			title: that.data.username
		})

		var paremete = ({
			uid: userinfo.x_uid,
			token: userinfo.x_token,
			zid: that.data.zid,
		})

		//守护信息的接口
		pack.request(config.guard_list, 'post', paremete, function(res) {
			that.setData({
				guiard_message: res.data
			})
		})

	},

	//阳光礼物底部
	sunfooter: function() {
		var that = this;
		var animation = wx.createAnimation({
			timingFunction: 'ease',
		})

		that.animation = animation

		that.setData({
			sunfooterdata: animation.export(),
			chooseSize: false

		})

		animation.bottom(0).step()
		that.setData({
			sunfooterdata: animation.export(),
			show_chat: false
		})
		that.videos();
	},

	//隐藏礼物列表
	closez: function() {

		this.setData({
			chooseSize: true,
			videotop: 0,
			videoheght: false,
			binouytbottom: 0,
			inputhidden: false,
			card: false,
			show_chat: true,
			isgrop: false
		})

		this.videos('big');

		var animation = wx.createAnimation({
			timingFunction: 'ease',
		})

		this.animation = animation

		animation.bottom(-477).step()
		this.setData({
			sunfooterdata: animation.export()
		})

		animation.bottom(-477).step()
		this.setData({
			animationData: animation.export()
		})
	},

	videos: function(isbig) {
		var that = this;
		wx.getSystemInfo({
			success: function(rest) {
				var query = wx.createSelectorQuery();
				query.select('#mjltest').boundingClientRect()
				query.select('#bigkuaiers').boundingClientRect()
				query.exec(function(res) {
					for(var i = 0; i < res.length; i++) {
						let windowHeight = (res[i].height * (750 / rest.windowWidth)); //将高度乘以换算后的该设备的rpx与px的比例
						res[i].height = windowHeight;
					}
					if(isbig != 'big') {
						that.setData({
							videoheight: res[1].height - res[0].height
						})
					} else {
						that.setData({
							videoheight: res[1].height
						})
					}
				})

			}
		})
	},

	//礼物选中效果
	clickresult: function(e) {
		var that = this;
		this.setData({
			clickzs: e.currentTarget.dataset.id
		})
		this.setData({
			lwoneimg: e.currentTarget.dataset.src
		})
		that.data.live_gift.id = e.currentTarget.dataset.id;
		that.setData({
			live_gift: that.data.live_gift,
			prents: true
		})

	},
	kuxiao: function() {
		var thiz = this;
		var userinfos = app.usermessage;
		thiz.setData({
			showss: 1
		})

		var statement = {
			"cmd": "PGetSunValue",
			"uid": userinfos.x_uid,
		};
		wx.sendSocketMessage({
			data: thiz.business_package(statement),
			success() {
				//				console.log("阳光领取")
			},
			fail(res) {
				console.log(res)
			}
		});

		var timer = setInterval(function() {
			thiz.data.nums++
				if(thiz.data.nums > 13) {
					thiz.setData({
						nums: '01',
						sunisshow: false,
						showss: 0
					})
					clearInterval(timer)
					setTimeout(function() {
						thiz.setData({
							sunisshow: true
						})
					}, 900000)
				} else {
					if(thiz.data.nums < 10) {
						thiz.setData({
							nums: '0' + thiz.data.nums
						})
					} else {
						thiz.setData({
							nums: thiz.data.nums
						})
					}

				}
		}, 60)
	},

	tipss: function() {
		var that = this;
		wx.showModal({
			title: '提示',
			content: '该功能需要下载APP才能使用，是否前往下载？',
			success: function(res) {
				that.setData({
					sun_tips: false
				})
				if(res.confirm) {} else if(res.cancel) {}
			}
		})
	},
	paidui: function(flags) {
		var thiz = this;
		var datas = thiz.data.cljas['data'];
		var offss = true;

		for(var i = 0; i < thiz.data.isgifts.length; i++) {
			if(thiz.data.isgifts[i].flag == undefined) {
				for(var j = 0; j < thiz.data.isgifts.length; j++) {
					console.log('卧槽', thiz.data.isgifts)
					if(thiz.data.isgifts[j].username == datas[0].username && datas[0].flag == 1 && datas[0].name == thiz.data.isgifts[j].name) {
						offss = true;

						if(j == 0) {
							clearInterval(thiz.data.timer0);
							thiz.shows(j);
						} else if(j == 0) {
							clearInterval(thiz.data.timer0);
							thiz.shows(j);
						} else if(j == 1) {
							clearInterval(thiz.data.timer0);
							thiz.shows(j);
						}

						console.log('第' + j, '有连送啦');
						var datasj = thiz.data.cljas.data.shift();
						console.log(datasj)
						thiz.data.isgifts[j] = datasj;
						var datariguai = thiz.data.isgifts;
						thiz.setData({
							isgifts: datariguai,
							cljas: thiz.data.cljas
						})
					} else {
						offss = false;
					}
				}

				if(offss == false) {
					var datasj = thiz.data.cljas.data.shift();
					thiz.data.isgifts[i] = datasj;
					var datariguai = thiz.data.isgifts;
					thiz.setData({
						isgifts: datariguai,
						cljas: thiz.data.cljas
					})
					console.log(thiz.data.isgifts)
					thiz.shows(i);
					break;
				}

			}
		}
	},
	//广告位1

	shows: function(num) {
		var thiz = this;
		console.log('谁送', thiz.data.isgifts[i].username + '送给主播' + thiz.data.isgifts[i].num+thiz.data.isgifts[i].name)

		if(num == 0) {
			thiz.shows1();
		}

		if(num == 1) {
			thiz.shows2();
		}

		if(num == 2) {
			thiz.shows3();
		}

	},

	shows1: function() {
		var thiz = this;
		thiz.data.duslanimate.data[0].show = true;
		thiz.setData({
			duslanimate: thiz.data.duslanimate
		})

		thiz.data.timer0 = setTimeout(function() {
			thiz.data.duslanimate.data[0].show = false;
			thiz.data.isgifts[0] = {};
			thiz.setData({
				isgifts: thiz.data.isgifts,
				duslanimate: thiz.data.duslanimate
			})
		}, 3000)

	},
	//广告位2
	shows2: function() {
		var thiz = this;
		thiz.data.duslanimate.data[1].show = true;
		thiz.setData({
			duslanimate: thiz.data.duslanimate
		})

		thiz.data.timer1 = setTimeout(function() {
			thiz.data.duslanimate.data[1].show = false;
			thiz.data.isgifts[1] = {};
			thiz.setData({
				isgifts: thiz.data.isgifts,
				duslanimate: thiz.data.duslanimate
			})
		}, 3000)

	},
	//广告位3
	shows3: function() {
		var thiz = this;
		thiz.data.duslanimate.data[2].show = true;
		thiz.setData({
			duslanimate: thiz.data.duslanimate
		})
		thiz.data.timer2 = setTimeout(function() {
			thiz.data.duslanimate.data[2].show = false;
			thiz.data.isgifts[2] = {};
			thiz.setData({
				isgifts: thiz.data.isgifts,
				duslanimate: thiz.data.duslanimate
			})
		}, 3000)
	},
	xintiao: function(data) {
		var that = this;
		wx.sendSocketMessage({
			data: data,
			success(res) {
				setTimeout(function() {
					console.log('发送心跳')
					that.xintiao(data);
				}, 15000)
			},
			fail: function() {
				wx.closeSocket({});
				console.log('断线重连');
				that.websoket();

			}
		})
	},
	cmdrply: function(data) {
		var that = this;
		var cmdrply = [];
		//解析头部
		cmdrply['head'] = that.analysis_head(data);

		//开始解析主体
		var body = that.analysis_head(data).newbuffare;

		//插件类型
		var pi_type = that.analysis_u32(body);
		cmdrply['pi_type'] = pi_type;

		//data长度
		var data_length = that.analysis_u32(pi_type.newbuffer);
		cmdrply['data_length'] = data_length;

		//data第一个内容
		var split_content = that.transform_u8(data_length.newbuffer, 0);
		var towhead = that.analysis_head(split_content);
		cmdrply['towhead'] = towhead;

		var pi_type2 = that.analysis_u32(towhead.newbuffare);
		cmdrply['pi_type2'] = pi_type2;

		var tow_data_length = that.analysis_u32(pi_type2.newbuffer);
		cmdrply['tow_data_length'] = tow_data_length;

		var cmd_data = new Uint8Array(tow_data_length.newbuffer);
		var cmd_datas = JSON.parse(__.strToArray().byteToString(cmd_data));
		cmdrply['cmd_datas'] = cmd_datas;
		return cmdrply;

	},

	join_channel_rs: function(data) {

		var that = this;
		var join_chjannel = [];

		//解析头部
		join_chjannel['head'] = that.analysis_head(data);

		//开始解析主体
		var body = that.analysis_head(data).newbuffare;

		//是否压缩
		var data_zip = __.typeConvert(body).u8(0);
		join_chjannel['data_zip'] = data_zip;

		//data数据长度
		var data_length = __.typeConvert(body).u32(1);
		join_chjannel['data_length'] = data_length;

		return join_chjannel;
	},
	business_package: function(jsons) {
		var that = this;
		var head = [];
		var statement = JSON.stringify(jsons);
		var jsonu8s = __.strToArray().strarry(statement);

		head = head.concat(__.strToArray().StringToUint32Array(297));
		head = head.concat(__.strToArray().StringToUint16Array(0))
		head = head.concat(__.strToArray().StringToUint16Array(200))
		head = head.concat(__.strToArray().StringToUint8Array(0))
		var full_head = __.strToArray().StringToUint32Array(13 + jsonu8s.length);
		full_head = full_head.concat(head);
		full_head = full_head.concat(jsonu8s);

		var tow_head = [];
		tow_head = tow_head.concat(__.strToArray().StringToUint32Array(64770));
		tow_head = tow_head.concat(__.strToArray().StringToUint16Array(0));
		tow_head = tow_head.concat(__.strToArray().StringToUint16Array(200));
		tow_head = tow_head.concat(__.strToArray().StringToUint8Array(0));
		tow_head = tow_head.concat(__.strToArray().StringToUint32Array(6));
		tow_head = tow_head.concat(__.strToArray().StringToUint32Array(full_head.length));
		tow_head = tow_head.concat(full_head);

		var conformity = __.strToArray().StringToUint32Array(tow_head.length + 4);
		conformity = conformity.concat(tow_head);
		var conformityu8 = new Uint8Array(conformity);

		var buffer = new ArrayBuffer(conformityu8.length);
		var o = new Uint8Array(buffer);
		for(var i = 0; i < conformityu8.length; ++i) {
			o[i] = conformityu8[i]
		}
		return buffer;

	},
	sync_popularity: function(data) {
		var that = this;
		var join_chjannel = [];

		//解析头部
		join_chjannel['head'] = that.analysis_head(data);

		//解析主体
		var body = that.analysis_head(data).newbuffare;
		var online_number = that.analysis_u32(body);
		join_chjannel['online_number'] = online_number
		return join_chjannel;
	},
	//解析字符串
	analysis_string: function(data) {
		var that = this;
		var result = {};
		var string_length = __.typeConvert(data).u16(0);
		result['result'] = __.typeConvert(data).Uint8ArrayToString(new Uint8Array(data, 2, string_length))
		result['newbuffer'] = that.transform_u8(data, 2 + string_length)
		return result;
	},
	//解析8位
	analysis_u16: function(data) {
		var that = this;
		var result = {}
		result['result'] = __.typeConvert(data).u16(0);
		result['newbuffer'] = that.transform_u8(data, 2)
		return result;
	},
	//解析8位
	analysis_u8: function(data) {
		var that = this;
		var result = {}
		result['result'] = __.typeConvert(data).u8(0);
		result['newbuffer'] = that.transform_u8(data, 1)
		return result;
	},
	//解析32位 
	analysis_u32: function(data) {
		var that = this;
		var result = {}
		result['result'] = __.typeConvert(data).u32(0);
		result['newbuffer'] = that.transform_u8(data, 4)
		return result;
	},
	//截取转换arraybuffer
	transform_u8: function(data, offset) {
		var zhuts = new Uint8Array(data, offset)
		var bodybuffer = new ArrayBuffer(zhuts.length);
		var o = new Uint8Array(bodybuffer);
		for(var i = 0; i < zhuts.length; ++i) {
			o[i] = zhuts[i]
		}
		return bodybuffer;
	},
	//解析字典
	base_info_analysis: function(numssss, data, data_length) {
		var thiz = this;
		var base_info = {};
		for(var i = 0; i < data_length; i++) {
			//							var keylength =  __.typeConvert(data).u32(numssss);
			var item_key = __.typeConvert(data).u32(numssss);
			var item_length = __.typeConvert(data).u32(numssss + 4);
			if(item_length == 0) {
				var zhuts = new Uint8Array(data, 4)
				var bodybuffer = new ArrayBuffer(zhuts.length);
				var o = new Uint8Array(bodybuffer);
				for(var i = 0; i < zhuts.length; ++i) {
					o[i] = zhuts[i]
				}
				base_info['newbuffare'] = bodybuffer;
			}
			var content = thiz.zidianfor(numssss + 4 + 4, numssss + 4 + 4 + 2, data, item_length);
			base_info[item_key] = content

			data = thiz.zidianfor(numssss + 4 + 4, numssss + 4 + 4 + 2, data, item_length).newbuffare;

		}
		return base_info;
	},
	//解析头部
	analysis_head: function(aray_buffer) {
		var analysis_heda = {};

		analysis_heda['head_length'] = __.typeConvert(aray_buffer).u32(0);
		analysis_heda['head_uri'] = __.typeConvert(aray_buffer).u32(4);
		analysis_heda['head_sid'] = __.typeConvert(aray_buffer).u16(8);
		analysis_heda['head_code'] = __.typeConvert(aray_buffer).u16(10);
		analysis_heda['head_tag'] = __.typeConvert(aray_buffer).u8(12);

		var zhuts = new Uint8Array(aray_buffer, 13)
		var bodybuffer = new ArrayBuffer(zhuts.length);
		var o = new Uint8Array(bodybuffer);
		for(var i = 0; i < zhuts.length; ++i) {
			o[i] = zhuts[i]
		}

		analysis_heda['newbuffare'] = bodybuffer;

		return analysis_heda;
	},

	zidianfor: function(keysnum, stringnum, data, datalength) {
		var that = this;
		var x_live_json = {};
		for(var i = 0; i < datalength; i++) {
			var keys = __.typeConvert(data).u16(keysnum);
			var stringlength = __.typeConvert(data).u16(stringnum);

			if(i == datalength - 1) {
				var zhuts = new Uint8Array(data, stringnum + 2 + stringlength)

				var bodybuffer = new ArrayBuffer(zhuts.length);
				var o = new Uint8Array(bodybuffer);
				for(var i = 0; i < zhuts.length; ++i) {
					o[i] = zhuts[i]
				}

				x_live_json['newbuffare'] = bodybuffer;

			}

			var strringvalue = __.typeConvert(data).Uint8ArrayToString(new Uint8Array(data, stringnum + 2, stringlength));

			x_live_json[keys] = strringvalue;

			keysnum = stringnum + 2 + stringlength;

			stringnum = keysnum + 2;

		}
		return x_live_json;
	},

	dictionaries: function(o_key, length1, offset, offset_lat, lenths, wholength, bodybuffer) {
		var thiz = this;
		for(var i = 0; i < wholength; i++) {
			o_key = offset + offset_lat
			length1 = o_key + 2
			lenths = __.typeConvert(bodybuffer).u16(length1)
			offset = length1 + 2
			offset_lat = lenths

		}
	},
	selseisman: function() {

		var animation = wx.createAnimation({
			timingFunction: 'ease',
		})

		this.animation = animation

		this.setData({
			animationData: animation.export(),
			chooseSize: true,

		})

		animation.translate(0, -188).step()
		this.setData({
			animationData: animation.export()
		})
	},

	//获取焦点
	show_chat: function() {
		this.setData({
			chooseSize: false,
			isinput: true,
			inputhidden: true
		})

	},

	//键盘弹起时触发
	bindfocus: function(event) {
		var that = this;
		that.setData({
			videotop: -55,
			binouytbottom: 20
		})
	},
	recharge: function() {
		wx.navigateTo({
			url: '/pages/pay/pay'
		})
	},
	//用户离场
	backan: function() {
		var that = this;
		var userinfo = app.usermessage;
		var data = {
			"cmd": "PLeaveChannel",
			"uid": userinfo.x_uid,
			"sid": that.data.sid,
			"singerid": that.data.zid
		};
		wx.sendSocketMessage({
			data: that.business_package(data),
			success() {
				console.log("离场请求");
				wx.navigateBack({

				});
			},
			fail(res) {
				console.log(res)
			}
		});

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {
		var that = this;
		return {
			title: '我是' + that.data.username + '欢迎观看我的直播',
			path: 'pages/index/index_xq?uid=' + that.data.uid + '&zid=' + that.data.zid + '&username=' + that.data.username +
				'&userimg=' + that.data.live_url,
			imageUrl: that.data.userimg
		}
	},

	websoket: function() {
		var thiz = this;
		var userinfos = app.usermessage;
		//创建websoket  链接返回的房间地址服务器	
		wx.connectSocket({
			// url: 'wss://mq.xiuktv.com:10443/ws?host=59.110.125.134&port=30000',
			url: 'wss://mq.xiuktv.com:10443/ws?host=59.110.125.134&port=30302',
			success(res) {
				console.log("链接成功！")
			},
			fail(res) {
				console.log("连接失败！")
			}
		});

		wx.onSocketOpen(function(res) {
			var entrance = [];
			//用户入场请求

			var evtrance_uri = (32 << 8) | 2;

			//头部
			entrance = entrance.concat(__.strToArray().StringToUint32Array(33))
			entrance = entrance.concat(__.strToArray().StringToUint32Array(evtrance_uri));
			entrance = entrance.concat(__.strToArray().StringToUint16Array(0));
			entrance = entrance.concat(__.strToArray().StringToUint16Array(200));
			entrance = entrance.concat(__.strToArray().StringToUint8Array(0));

			//主体
			entrance = entrance.concat(__.strToArray().StringToUint32Array(userinfos.x_uid)); //用户id
			entrance = entrance.concat(__.strToArray().StringToUint16Array(' ')); //固定值""
			entrance = entrance.concat(__.strToArray().StringToUint32Array(thiz.data.sid)); //房间id
			entrance = entrance.concat(__.strToArray().StringToUint32Array(1)); //固定值1
			entrance = entrance.concat(__.strToArray().StringToUint16Array('')); //固定值""
			entrance = entrance.concat(__.strToArray().StringToUint32Array(100)); //固定值100
			var entrance_data = new Uint8Array(entrance);
			var bufferss = new ArrayBuffer(entrance_data.length);
			var o = new Uint8Array(bufferss);
			for(var i = 0; i < entrance_data.length; ++i) {
				o[i] = entrance_data[i]
			}
			wx.sendSocketMessage({
				data: bufferss,
				success() {
					var jsonss = {
						"cmd": "PEnterChannel",
						"uid": userinfos.x_uid,
						"sender": userinfos.nickName,
						"uid_onmic": thiz.data.zid,
						"sid": thiz.data.sid,
					}

					wx.sendSocketMessage({
						data: thiz.business_package(jsonss),
						success() {
							var timestamp = (new Date()).valueOf();
							var heartbeat = [];
							var heartbeat_rq_uri = (12 << 8) | 4;
							heartbeat = heartbeat.concat(__.strToArray().StringToUint32Array(29))
							heartbeat = heartbeat.concat(__.strToArray().StringToUint32Array(heartbeat_rq_uri));
							heartbeat = heartbeat.concat(__.strToArray().StringToUint16Array(0));
							heartbeat = heartbeat.concat(__.strToArray().StringToUint16Array(200));
							heartbeat = heartbeat.concat(__.strToArray().StringToUint8Array(0));

							//主体
							heartbeat = heartbeat.concat(__.strToArray().StringToUint32Array(userinfos.x_uid)); //用户id
							heartbeat = heartbeat.concat(__.strToArray().StringToUint32Array(thiz.data.sid)); //房间id
							heartbeat = heartbeat.concat(__.strToArray().StringToUint32Array(timestamp)); //房间id
							heartbeat = heartbeat.concat(__.strToArray().StringToUint32Array(timestamp)); //房间id
							var heartbeat_data = new Uint8Array(heartbeat);
							var hearbuffer_data = thiz.transform_u8(heartbeat_data, 0);
							//发送心跳
							thiz.xintiao(hearbuffer_data);

						}
					});

				}
			});

		});
		wx.onSocketError(function(res) {
			console.log('WebSocket连接打开失败，请检查！', res)
		})
		var live_data = [];
		wx.onSocketMessage(function(res) {
			var uri = __.typeConvert(res.data).u32(4, 4, 0, false);
			//cmd回复包
			if(uri == 65026) {
				var plug_to_client = thiz.cmdrply(res.data);
				var cmd_data = plug_to_client['cmd_datas'].cmd;

				if(cmd_data == 'RGetSunValue') {
					var data = plug_to_client.cmd_datas;
					console.log(data)
				}

				//阳光掉落
				if(cmd_data == 'BCreateSunshune') {
					var data = plug_to_client.cmd_datas;
					console.log(data)
					thiz.setData({
						sunisshow: true
					})
				}

				if(cmd_data == 'RSendGift') {
					var data = plug_to_client.cmd_datas;
					if(data.result == 301) {
						wx.showToast({
							title: '阳光不足',
							icon: 'none'
						})
					}
				}
				//用户入场   新人进场通知
				if(cmd_data == 'BEnterChannel') {
					var data = plug_to_client.cmd_datas;
					console.log(data)
					thiz.setData({
						new_person: data,
						newsisopcity: true
					})
					console.log(thiz.data.newsisopcity)
					if(thiz.data.newsisopcity == true) {
						setTimeout(function() {
							thiz.setData({
								newsisopcity: false
							})
						}, 5000)
					}
				}

				//用户离场
				if(cmd_data == 'BUserLeaveChannel') {
					var data = plug_to_client.cmd_datas;
					console.log(data)
					/*if(data != null) {
						wx.navigateBack({

						});
					}*/
				}

				//@广播包
				if(cmd_data == 'BAtMessage') {
					var data = plug_to_client.cmd_datas;
					if(thiz.data.discuss.length >= 5) {
						thiz.data.discuss.shift()
					}
					thiz.data.discuss.push(data);
					thiz.setData({
						discuss: thiz.data.discuss
					})
					console.log('@广播包', data)

				}

				if(cmd_data == 'BSingerAttrMoneyUpdate') {
					var data = plug_to_client.cmd_datas;
					thiz.setData({
						moneyFinal: data.moneyFinal,
					})
				}

				if(cmd_data == 'BSingerAttrLightUpdate') {
					var data = plug_to_client.cmd_datas;
					thiz.setData({
						lightFinal: data.lightFinal,
					})
				}

				//获取阳光金币
				if(cmd_data == 'RGetAnchorSun') {
					var data = plug_to_client.cmd_datas;
					thiz.setData({
						moneyFinal: data.moneyFinal,
						lightFinal: data.lightFinal
					})
				}

				//送礼物
				if(cmd_data == 'BSendGift') {
					var data = plug_to_client.cmd_datas;
					var gift_id = data.id;
					var userinfo = app.usermessage;
					var paramete = ({
						'uid': userinfo.x_uid,
						'token': userinfo.x_token,
						'fid': data.uid,
					})
					console.log(data)
					var giftmess = {};
					giftmess.headimg = config.host + 'PubImgSour/' + data.list[0].photo + '.png';
					giftmess.username = data.list[0].nick;
					giftmess.name = data.list[0].giftName;
					giftmess.giftimg = config.host + 'live/images/' + data.list[0].imgUrl;
					giftmess.serialNum = data.list[0].serialNum;
					giftmess.flag = data.list[0].flag;
					giftmess.num = data.list[0].num;
					thiz.data.cljas['data'].push(giftmess)
					thiz.setData({
						cljas: thiz.data.cljas
					})
					
					thiz.paidui();

				}
				//发言
				if(cmd_data == 'BTextChat') {
					var texts = plug_to_client.cmd_datas;
					if(thiz.data.discuss.length >= 5) {
						thiz.data.discuss.shift()
					}
					thiz.data.discuss.push(texts);
					thiz.setData({
						discuss: thiz.data.discuss
					})
					console.log(texts)
				}

			}

			//请求入场答复
			if(uri == 62210) {
				var userinfo = app.usermessage;
				var join_channel_rs = thiz.join_channel_rs(res.data);
				var online_user = join_channel_rs.users;
				thiz.setData({
					online_users: online_user
				})

				//获取阳光金币
				var sun_parameter = {
					"cmd": "PGetAnchorSun",
					"singerid": thiz.data.zid
				};
				wx.sendSocketMessage({
					data: thiz.business_package(sun_parameter),
					success() {
						console.log("获取用户阳光信息成功")
					},
					fail(res) {
						console.log('获取用户信息失败')
					}
				});

			}

			//直播间在线人数
			if(uri == 80386) {
				var data = thiz.sync_popularity(res.data);
				var online_number = data.online_number.result;

				thiz.setData({
					online_number: online_number
				})
			}

		})
	}

})

var doommList = [];
var i = 0;
class Doomm {
	constructor(text, top, time, color, image, user) {
		this.text = text;
		this.image = image;
		this.user = user;
		this.top = top;
		this.time = time;
		this.color = color;
		this.display = true;
		let that = this;
		this.id = i++;
		setTimeout(function() {
			doommList.splice(doommList.indexOf(that), 1);
			page.setData({
				doommData: doommList
			})
		}, this.time * 1000)
	}
}

function getRandomColor() {
	let rgb = []
	for(let i = 0; i < 3; ++i) {
		let color = Math.floor(Math.random() * 256).toString(16)
		color = color.length == 1 ? '0' + color : color
		rgb.push(color)
	}
	return '#' + rgb.join('')
}