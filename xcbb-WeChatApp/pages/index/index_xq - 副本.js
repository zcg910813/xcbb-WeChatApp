const app = getApp();
var page = undefined;
const __ = require('../../utils/base.js');
const config = require('../../utils/config.js');

Page({

	/**
	 * 页面的初始数据
	 */

	getstatement: function(e) {
		var val = e.detail.value;
		this.setData({
			statement: val
		});
	},

	bindbt: function() {
		var thiz = this;

		if(thiz.data.is_screen == false) {
			var statement = {
				"cmd": "PTextChat",
				"uid": 10006393,
				"sid": 131696,
				"singerid": 1006373,
				"context": thiz.data.statement
			};
			wx.sendSocketMessage({
				data: thiz.business_package(statement),
				success() {
					console.log("发言成功")
				}
			});
		} else {
			var bullet = {
				"cmd": "PSendBarrage",
				"uid": 10006393,
				"sid": 131696,
				"singerid": 1006373,
				"nickname": 'xiaoqi',
				"context": thiz.data.statement
			};
			wx.sendSocketMessage({
				data: thiz.business_package(bullet),
				success() {
					console.log("弹幕发送成功")
				}
			});
		}

	},
	data: {

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
		present: false, //赠送礼物显示
		liansong: 0, //连送是否显示hi
		sunisshow: true, //太阳显示
		newsisopcity: 1, //隐藏新人
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
			type: "17", //礼物类型
			num: "1", //礼物数量
			flag: "0", //连送标识
			buy: "1", //是否小号金币
			serialNum: "1", //连送序号
			cid: "1", //固定1
			sendTime: "", //赠送时间
			sender: "十年一梦", //赠送这昵称
			receiver: "用户1006371" //主播昵称
		},
		scrollsarry: [{
				id: '0',
				content: '你好'
			},
			{
				id: '1',
				content: '床前明夜光'
			},
			{
				id: '2',
				content: '白日依山尽'
			},
			{
				id: '3',
				content: '锄禾日当午'
			},
			{
				id: '4',
				content: '慈母手中线'
			},
		],
		randomyuj: ['啦啦啦啦啦', '主播好漂亮', '新的一天又开始啦', '大家好', '我叫小七', '马上要下机啦', '没有阳光啦', '几点睡觉啊', '忙死啦，一天忙的', '刷个大飞机'],
		new_approachcs: false,
		chooseSize: true,
		res: {},
		res: {
			isLive: 1
		},
		nickName: '',
		username: '',
		userimg: '',
		animationData: {},
		sunfooterdata: {}, //太阳礼物下啦动画
		zid: '',
		uid: '',
		topss: 900,
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
		sendgift:[
			{
				'one':'none'
			},
			{
				'one':'none'
			},
			{
				'one':'none'
			}
		]
	},

	//阳光礼物底部
	sunfooter: function() {

		var animation = wx.createAnimation({
			timingFunction: 'ease',
		})

		this.animation = animation

		this.setData({
			sunfooterdata: animation.export(),
			chooseSize: false

		})

		animation.bottom(0).step()
		this.setData({
			sunfooterdata: animation.export(),
			videoheght: true
		})
	},

	//礼物标题选中效果
	gifttabxzs: function(e) {
		this.setData({
			gifttabxz: e.currentTarget.dataset.id
		})
	},

	//赠送礼物
	present: function() {
		var thiz = this;
		/*var that = this;
		that.data.liansong++;
		console.log(that.data.liansong)
		that.setData({
			liansong: that.data.liansong
		})
		that.setData({
			present: true
		})*/
		var timestamp = (new Date()).valueOf();
		thiz.data.live_gift.sendTime = timestamp;
		console.log(thiz.data.live_gift)
		thiz.setData({
	
		})

		console.log('shijiancuo', thiz.data.live_gift)
		wx.sendSocketMessage({
			data: thiz.business_package(thiz.data.live_gift),
			success() {
				console.log("赠送礼物");
			},
			fail(res) {
				console.log(res)
			}
		});

	},
	
	
	livehide: function() {
		var that = this;
		that.setData({
			chooseSize: true
		})
		that.closez();
		console.log(that.data.chooseSize)
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

		page = this;

		var that = this;
		var zjygs = [];

		app.getUserInfo(function(userInfo) {
			wx.request({
				url: 'http://www.xiuktv.com/xcbb_web/common/room/tools',
				data: ({
					uid: userInfo.uid,
					token: userInfo.token,
					category1: 1,
					category2: 17
				}),
				success: function(data) {
					var data = data.data;
					if(data.success == true) {
						//			   		console.log(data.body)
						var gift_arr = data.body;
						var message = [];
						var message1 = [];
						var message2 = [];
						var message3 = [];
						var message4 = [];

						for(var i = 0; i < gift_arr.length; i++) {
							gift_arr[i].icon = config.baseUrl + '/live/images' + gift_arr[i].icon
							if(i <= 7) {
								message.push(gift_arr[i])
							} else if(i <= 15) {
								message1.push(gift_arr[i])
							} else if(i <= 23) {
								message2.push(gift_arr[i])
							} else if(i <= 31) {
								message3.push(gift_arr[i])
							} else if(i <= 39) {
								message4.push(gift_arr[i])
							}
						}

						that.data.zjsz.push(message);
						that.data.zjsz.push(message1);
						that.data.zjsz.push(message2);
						that.data.zjsz.push(message3);
						that.data.zjsz.push(message4);

						that.setData({
							zjszL: that.data.zjsz
						})

					}
				}
			})
		})

		//阳光掉落
		/*				setTimeout(function() {
							var inerval = setInterval(function() {
								var speed = 15;
								that.data.topss--
									if(that.data.topss <= 230) {
										clearInterval(inerval)
									} else {
										that.setData({
											topss: that.data.topss - speed,
										})
									}
							}, 30)
						}, 1000)*/

		var nums = 3;
		setInterval(function() {
			nums++;
			that.setData({
				scrollsarry: that.data.scrollsarry.concat({
					'id': nums,
					'content': that.data.randomyuj[Math.floor(Math.random() * 10)]
				}),
				scrolls: 'a' + that.data.scrollsarry.pop().id
			})
		}, 3000)

		var nickName = app.globalData.localUserInfo.nickName;

		that.setData({
			nickName: nickName,
			username: options.username,
			userimg: options.userimg,
			uid: options.uid,
			zid: options.zid,
			new_approachcs: true,
		})

		setTimeout(function() {
			that.setData({
				scrolls: 'a6'
			})
		}, 2000)

		wx.setNavigationBarTitle({
			title: that.data.username
		})
		//循环更新主播数据
		setInterval(function() {

			wx.request({
				url: 'https://www.xcbobo.com/xcbb_web/h5Activity/getSharePageInfo',
				data: {
					uid: that.data.uid,
					zid: that.data.zid,
					type: 2
				},
				success: function(res) {
					wx.hideLoading();
					var ret = res.data;

					//res.rtmburl = res.rtmburl.replace('http', 'https');
					that.setData({
						res: ret
					})
				}
			})

		}, 3000)
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
			live_gift: that.data.live_gift
		})

	},

	// //从左到右动画
	// leftinright: function (target, obj, zhi, objycz){
	//   var that = this;
	//   //新人进场
	//   setTimeout(function () {
	//     var newtimer = setInterval(function () {
	//       var speed = parseInt((10 - obj) / 8);
	//       obj = obj + speed;
	//       if (parseInt(obj) < 3) {
	//         if (zhi == 'newleft') {
	//           that.setData({
	//             newleft: obj + speed
	//           })
	//         }else{
	//           that.setData({
	//             gift_left: obj + speed+6
	//           })
	//         }
	//       } else {
	//         clearInterval(newtimer)
	//         that.jianyin(objycz);
	//       }
	//     }, 50)
	//   }, 2000)
	// },

	//渐隐
	jianyin: function(objycz) {
		var that = this;
		setTimeout(function() {
			var nums = 100;
			var timerss = setInterval(function() {
				nums = nums - 5;
				if(nums <= 0) {
					clearInterval(timerss)
					that.setData({
						newleft: -400,
						gift_left: -400,
						newsisopcity: 1,
						gift3img: 1,
						gift2img: 1,
						gift1img: 1,
					})
				} else {
					that.setData({
						newsisopcity: nums / 100
					})
					console.log(that.data.newsisopcity)
				}
			}, 30)

		}, 4000)
	},
	kuxiao: function() {
		var thiz = this;
		thiz.setData({
			showss: 1
		})
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
	onShow: function() {
		var thiz = this;

		//创建websoket  链接返回的房间地址服务器	
		wx.connectSocket({
			// url: 'wss://mq.xiuktv.com:10443/ws?host=59.110.125.134&port=30000',
			url: 'wss://mq.xiuktv.com:10443/ws?host=59.110.125.134&port=30302',
			success(res) {
				console.log("链接成功！")
			},
			fail() {
				console.log("连接失败！")
			}
		});

		wx.onSocketOpen(function() {
			var entrance = [];
			//用户入场请求

			var evtrance_uri = (32 << 8) | 2;
			console.log('evtrance_uri', evtrance_uri)

			//头部
			entrance = entrance.concat(__.strToArray().StringToUint32Array(33))
			entrance = entrance.concat(__.strToArray().StringToUint32Array(evtrance_uri));
			entrance = entrance.concat(__.strToArray().StringToUint16Array(0));
			entrance = entrance.concat(__.strToArray().StringToUint16Array(200));
			entrance = entrance.concat(__.strToArray().StringToUint8Array(0));

			//主体
			entrance = entrance.concat(__.strToArray().StringToUint32Array(10006371)); //用户id
			entrance = entrance.concat(__.strToArray().StringToUint16Array(' ')); //固定值""
			entrance = entrance.concat(__.strToArray().StringToUint32Array(131696)); //房间id
			entrance = entrance.concat(__.strToArray().StringToUint32Array(1)); //固定值1
			entrance = entrance.concat(__.strToArray().StringToUint16Array('')); //固定值""
			entrance = entrance.concat(__.strToArray().StringToUint32Array(100)); //固定值100
			var entrance_data = new Uint8Array(entrance);

			// console.log(entrance_data)

			wx.sendSocketMessage({
				data: entrance_data,
				success() {
					console.log("用户请求入场")
					console.log(entrance_data)

					var jsonss = {
						"cmd": "PEnterChannel",
						"uid": 10006371,
						"sender": "hgjhkj",
						"uid_onmic": 10006373,
						"sid": 131696,
					}

					wx.sendSocketMessage({
						data: thiz.business_package(jsonss),
						success() {
							console.log("入场申请")
						}
					});

				}
			});

		});

		var live_data = [];
		wx.onSocketMessage(function(res) {
			var uri = __.typeConvert(res.data).u32(4, 4, 0, false);
			console.log('uri', uri)

			//cmd回复包
			if(uri == 65026) {
				var plug_to_client = thiz.cmdrply(res.data);
l			}

			//请求入场答复
			if(uri == 62210) {
				var join_channel_rs = thiz.join_channel_rs(res.data);
				var online_user = join_channel_rs.users;
				console.log('online_user', join_channel_rs)
				thiz.setData({
					online_users: online_user
				})
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

		var voide = wx.createVideoContext('myVideo');
		voide.play();

	},
	cmdrply: function(data) {
		var that = this;
		var cmdrply = [];

		console.log('length', __.typeConvert(data).u32(0))
		console.log('uri', __.typeConvert(data).u32(4))
		console.log('sid', __.typeConvert(data).u16(8))
		console.log('code', __.typeConvert(data).u16(10))
		console.log('tag', __.typeConvert(data).u8(12))

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

		//data数据
		var sess_info_length = __.typeConvert(body).u32(5);
		var sess_info_data = that.zidianfor(9, 11, body, sess_info_length);
		join_chjannel['sess_info'] = {
			'sess_info_length': sess_info_length,
			'sess_info_data': sess_info_data
		}

		//base_info数据
		var base_info = sess_info_data.newbuffare;
		var base_info_length = __.typeConvert(base_info).u32(0);
		var base_info_data = that.base_info_analysis(4, base_info, base_info_length);
		join_chjannel['base_info'] = {
			'base_info_length': base_info_length,
			'sess_info_data': base_info_data
		}

		//disable_voice数据
		var disable_voice = base_info_data.newbuffare;
		var disable_voice_length = __.typeConvert(disable_voice).u32(0);
		join_chjannel['disable_voice'] = {
			'disable_voice_length': disable_voice_length,
			'disable_voice_data': ''
		}

		//disable_text
		var disable_text_length = __.typeConvert(disable_voice).u32(4);
		join_chjannel['disable_text'] = {
			'disable_text_length': disable_voice_length,
			'disable_text_data': ''
		}

		//直播在线列表
		var online_list = that.transform_u8(disable_voice, 8)

		//解析数组
		var arr_length = that.analysis_u32(online_list);
		var arr_lengths = that.transform_u8(arr_length.newbuffer, 8)
		var users = [];
		join_chjannel['online_list_length'] = arr_length.result;
		for(var i = 0; i < join_chjannel; i++) {
			if(i > 0) {
				var usermessage = that.analysis_u32(photo.newbuffer); //用户id
			} else {
				var usermessage = that.analysis_u32(arr_lengths); //用户id
			}
			var username = that.analysis_string(usermessage.newbuffer);
			var user_signature = that.analysis_string(username.newbuffer);
			var pid = that.analysis_u32(user_signature.newbuffer);
			var user_integral = that.analysis_u32(pid.newbuffer);
			var user_live_integral = that.analysis_u32(user_integral.newbuffer);
			var client_info = that.analysis_string(user_live_integral.newbuffer);
			var user_gender = that.analysis_u8(client_info.newbuffer);
			var consume_lvl = that.analysis_u16(user_gender.newbuffer);
			var guarder_type = that.analysis_u16(consume_lvl.newbuffer);
			var b_another_anchor = that.analysis_u8(guarder_type.newbuffer);
			var birthday = that.analysis_u32(b_another_anchor.newbuffer);
			var active_lvl = that.analysis_u16(birthday.newbuffer);
			var photo = that.analysis_string(active_lvl.newbuffer)

			//join_chjannel=//[
			//['online_list_length'] = arr_length.result;

			users[i] = {
				'userid': usermessage.result, //用户id
				'username': username.result, //用户昵称
				'user_signature': user_signature.result, //用户签名
				'pid': pid.result, //pid
				'user_integral': user_integral.result, //用户积分
				'user_live_integral': user_live_integral.result, //用户直播间积分
				'client_info': client_info.result, //客户端信息
				'user_gender': user_gender.result, //用户性别
				'consume_lvl': consume_lvl.result, //用户消费等级
				'guarder_type': guarder_type.result, //守护类型
				'b_another_anchor': b_another_anchor.result, //用户是否主播
				'birthday': birthday.result, //用户生日
				'active_lvl': active_lvl.result, //用户活跃等级
				'photo': photo.result
			};

			//];

		}
		join_chjannel['users'] = users;

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

		return conformityu8;

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
		/*		if(datalength == 0){
						var zhuts = new Uint8Array(data,4)
						var bodybuffer = new ArrayBuffer(zhuts.length);
						var o = new Uint8Array(bodybuffer);
						for (var i = 0; i < zhuts.length; ++i) {
							o[i] = zhuts[i]
						}
						x_live_json['newbuffare'] = bodybuffer;

				}*/
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
			console.log('直播间属性第' + i + '个key', __.typeConvert(bodybuffer).u16(o_key)); //入场答复字符串
			console.log('直播间属性第' + i + '个value长度', __.typeConvert(bodybuffer).u16(length1)); //入场答复字符串
			console.log('直播间属性第' + i + '个value=>', __.typeConvert(bodybuffer).Uint8ArrayToString(new Uint8Array(bodybuffer,
				offset, offset_lat)));

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

	//弹幕选择
	switch1Change: function(e) {

		this.setData({
			chooseSize: false,
			isinput: true,
			is_screen: e.detail.value
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
	showfooter: function() {
		var thiz = this;

		wx.request({
			url: 'http://www.xiuktv.com/xcbb_web/common/room/tools',
			method: 'post',
			success: function(res) {
				// thiz.setData({
				//   gift_liwu:res.data
				// })
				// console.log(thiz.data.gift_liwu)
			}
		})
		this.setData({
			chooseSize: false,
			videoheght: true
		})
		var animation = wx.createAnimation({
			timingFunction: 'ease',
		})

		this.animation = animation

		animation.bottom(0).step()
		this.setData({
			animationData: animation.export()
		})
	},
	recharge: function() {
		wx.navigateTo({
			url: '/pages/pay/pay'
		})
	},

	//隐藏礼物列表
	closez: function() {

		this.setData({
			chooseSize: true,
			videotop: 0,
			videoheght: false,
			binouytbottom: 0,
			inputhidden: false
		})

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
	backan: function() {
		wx.navigateBack({

		})
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {
		var that = this;
		return {
			title: '我是' + that.data.username + '欢迎观看我的直播',
			path: 'pages/index/index_xq?uid=' + that.data.uid + '&zid=' + that.data.zid + '&username=' + that.data.username +
				'&userimg=' + that.data.userimg,
			imageUrl: that.data.userimg
		}
	}
})

var doommList = [];
var i = 0;
class Doomm {
	constructor(text, top, time, color) {
		this.text = text + i;
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