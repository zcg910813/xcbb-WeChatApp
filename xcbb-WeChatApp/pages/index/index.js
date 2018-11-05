const app = getApp()
const __ = require('../../utils/base.js');
const config = require('../../utils/config.js');
const pack = require('../../utils/util.js');
Page({
	data: {
		footerNav: [{
				navName: '直播',
				urll: '/pages/index/index',
			},
			{
				navName: '我的',
				urll: '/pages/user/userindex'
			}
		],
		marquee: [],
		marquees:false,
		marqueetxt: '',
		indicatorDots: true,
		vertical: false,
		autoplay: false,
		circular: false,
		interval: 2000,
		duration: 500,
		previousMargin: 0,
		nextMargin: 0,
		shujlist: [],
		off: true,
		page: 1,
		userInfo: {},
		animationData: {},
		banner_list:[]
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
	onShow: function() {
		var that = this;
		that.setData({
			userInfo: app.usermessage
		})
		that.common();
		that.websocket();

	},
	tiaozhuan: function() {
		__.socket.closeWS(function(res) {
			console.log('关闭');
			return false
		})
	},
	marquee: function() {
		var that = this;
		that.setData({
			marqueetxt: that.data.marquee[0],
		})
		console.log(that.data.marquee)
		var animation = wx.createAnimation({
			duration: 6000,
		})

		that.animation = animation

		that.animation.right(100 + '%').step()
		that.animation.right(-100 + '%').step({
			duration: 0
		})

		that.setData({
			animationData: animation.export()
		})

		setTimeout(function() {
			that.data.marquee.shift()
			
			if(that.data.marquee.length != 0) {
				setTimeout(function() {
					that.marquee();
				}, 500)
			}else{
				that.setData({
					marquees:false
				})
			}
		}, 6000)

	},

	websocket: function() {
		var that = this;
		var userInfo = that.data.userInfo;
		__.socket.closeWS(function(res) {
			console.log('关闭');
			return false
		})

		var sokect_parames = ({
			token: userInfo.x_token,
			uid: userInfo.x_uid
		});
		pack.request(config.liveRoomAddreeInfo, 'post', sokect_parames, function(data) {
			var socket = data.data;
//			console.log('socket:', socket)
			var hostdata = socket.hall.split(":");
			socket.hall.split(":");
			var headData = __.headPacking();
//			console.log('headData:', headData);
			var version_agreement = __.strToArray().StringToUint32Array(200811040);
			var version_client = __.strToArray().StringToUint32Array(529539164);
			var isp = __.strToArray().StringToUint16Array(4);
			var bodyData = [];
			bodyData = bodyData.concat(version_agreement);
			bodyData = bodyData.concat(version_client);
			bodyData = bodyData.concat(isp);
			let message = new Uint8Array(headData.concat(bodyData));
			message = that.u8zhuanayyay(message);

			let host = 'wss://' + socket.websocket + '/ws?host=' + hostdata[0] + '&port=' + hostdata[1];
			let method = 'GET';
//			console.log('第一次长连接！');
			__.socket.packWS(host, method, {}, message, function(res) {
//				console.log('packWS:', res);
				if(!res) {
					console.log('packWS err');
				} else {
//					console.log('packWS success');
					__.untieHead(res.data, function(res) {
//						console.log('head:', res);
					});
					that.analysisBody(res.data, function(body) {
//						console.log('body:', body);
						if(!body.host) {
							console.log('解析错误！');
						} else {

							//重新创建连接
							var host = 'wss://' + socket.websocket + '/ws?host=' + body.host + '&port=' + body.port;

							//return false;
							var num = (206 << 8) | 4; // 1
							var arr = [];
							//头
							arr = arr.concat(__.strToArray().StringToUint32Array(138));
							arr = arr.concat(__.strToArray().StringToUint32Array(num));
							arr = arr.concat(__.strToArray().StringToUint16Array(0));
							arr = arr.concat(__.strToArray().StringToUint16Array(200));
							arr = arr.concat(__.strToArray().StringToUint8Array(0));
							//主体
							arr = arr.concat(__.strToArray().StringToUint8Array(0)); //anonymous 是否匿名登录
							arr = arr.concat(__.strToArray().str2array('')); //sha1Pass
							arr = arr.concat(__.strToArray().StringToUint32Array(100)); //client_version
							arr = arr.concat(__.strToArray().str2array('123')); //client_info
							arr = arr.concat(__.strToArray().str2array('')); //vid
							arr = arr.concat(__.strToArray().StringToUint32Array(3)); //login_type 0：pc 1：web 2：mobile	3：微信小程序
							arr = arr.concat(__.strToArray().StringToUint32Array(10005139)); //uid 用户id
							arr = arr.concat(__.strToArray().str2array('')); //account用户账号
							arr = arr.concat(__.strToArray().str2array('token')); //kind 登录类型
							arr = arr.concat(__.strToArray().str2array('TVRBd01EVXhNem5DcDI5MFluQXlOMm80T1hReE5URTFNRFUzTlRReU5qUTB3cWN4TlRNME9ERTNOemMzT1RNMw%3D%3D')); //token 登录web获取到的令牌

							var ret = [];
							__.socket.closeWS(function(res) {
								if(res) {
//									console.log('第二次长连接！');
									__.socket.connecWS(host, 'GET', {}, function(res) {
										if(res) {
											__.socket.openWS(function(res) {
												if(res) {
													let message = new Uint8Array(arr);
													message = that.u8zhuanayyay(message);

													__.socket.sendWS(message, false);
													__.socket.socketWS(function(res) {
														if(res) {
															ret.push(res.data);
//															console.log('第' + ret.length + '次连接：', res);
//															console.log('ret:', ret);

															//房间申请服务器地址答复
															var zhibos = [];
															var svid_live = (35 << 8) | 4;
															//									console.log(svid_live)
															//头部
															zhibos = zhibos.concat(__.strToArray().StringToUint32Array(33))
															zhibos = zhibos.concat(__.strToArray().StringToUint32Array(svid_live));
															zhibos = zhibos.concat(__.strToArray().StringToUint16Array(0));
															zhibos = zhibos.concat(__.strToArray().StringToUint16Array(200));
															zhibos = zhibos.concat(__.strToArray().StringToUint8Array(0));

															//主体
															zhibos = zhibos.concat(__.strToArray().StringToUint32Array(466298)); //房间id
															zhibos = zhibos.concat(__.strToArray().StringToUint16Array(4)); //

															var live_entry = new Uint8Array(zhibos);
															live_entry = that.u8zhuanayyay(live_entry);
															__.socket.sendWS(live_entry, function(res) {
//																console.log('发送成功2', res)
															})

															for(var i = 0; i < ret.length; i++) {
																var uri = __.typeConvert(ret[i]).u32(4, 4, 0, false);
//																console.log('uri===:', uri);
																if(uri == 51204) {
																	continue;
																} else if(uri == 516) {

																	var username_length = __.typeConvert(ret[i]).u16(21);
																	var username_arr = new Uint8Array(ret[i], 23, username_length);

																} else if(uri == 102404) {

																	var broadcast_length = __.typeConvert(ret[i]).u32(17, 4, 0, false);
																	var broadcast_data = new Uint8Array(ret[i], 21, broadcast_length);

																	
																	var broadcastn_str = __.typeConvert(ret[i]).Uint8ArrayToString(broadcast_data);
																	var broadcastn_cmd = JSON.parse(broadcastn_str);
//																	console.log(broadcastn_cmd)
																	if(broadcastn_cmd.cmd == 'BBroadcast') {
																		switch(broadcastn_cmd.type) {
																			case 1:
																				var notice_arr = broadcastn_cmd.gift.senderNick + '送给' + broadcastn_cmd.gift.receiverNick + num + '个' + broadcastn_cmd.gift.gift_name;
																				that.data.marquee.push(notice_arr);
																				if(that.data.marquee.length == 1) {
																					that.marquee();
																					that.setData({
																						marquee:true
																					})
																				}
																				//																			  执行代码块 1
																				break;
																			case 2:
																				console.log('系统弹窗')
																				//																			  执行代码块 2
																				break;
																			default:
																				//																			  n 与 case 1 和 case 2 不同时执行的代码
																		}
																		//that.data.notice.push()
																	}


																} else if(uri == 9220) {

																	var room_length = __.typeConvert(ret[i]).u16(21);
																	var room_arr = new Uint8Array(ret[i], 23, room_length);
																	var root_guding_length = __.typeConvert(ret[i]).u16(room_length + 23);
																	var root_guding_arr = new Uint32Array(ret[i], root_guding_length, root_guding_length);

																}
															}
														}
													});
												}
											});
										}
									});
								}
							});

						}
					});
				}
			});
		})
	},

	//解析主体
	analysisBody: function(data, cb) {
		var that = this;
		var byte_boday = new Uint8Array(data, 13);
		var array_boday = new ArrayBuffer(byte_boday.length);
		var k = new Uint8Array(array_boday);
		for(var i = 0; i < byte_boday.length; ++i) {
			k[i] = byte_boday[i]
		}
		var ip_length, ip, host, port = null;
		__.typeConvert(array_boday).u16(0, 2, 0, function(res) {
			ip_length = res;
			ip = new Uint8Array(array_boday, 2, ip_length);
			__.typeConvert(data).Uint8ArrayToString(ip, function(res) {
				host = res;
			});
			__.typeConvert(array_boday).u16(2 + ip_length + 4, 2, 0, function(res) {
				port = res;
//				console.log('res', res)
			})
		});
		var res = {
			'host': host,
			'port': port,
		};
		cb(res);
	},
	common: function() {
		var that = this;
		var userut = app.usermessage;
		console.log('app.usermessage',app.usermessage)

		var banner_paramete = {
			flag: 2,
			uid: userut.x_uid,
			token: userut.x_token
		};

		pack.request(config.index_banner, 'post', banner_paramete, function(res) {
			console.log(res)
			var data = res.data.data;
			for(var i=0;i<data.length;i++){
				data[i].imgurl = config.host+'/PubImgSour'+data[i].imgurl;
			}
			that.setData({
				banner_list:data
			})
		})

		that.getApi(userut.x_uid, userut.x_token, 1, function(res) {
			if(res.data) {
				var res = res.data;
				if(res.list.length < 20) {
					var off = false;
				} else {
					var off = true;
				}
				that.setData({
					shujlist: res.list,
					off: off
				})
//				console.log('ress', res)
			} else {
				that.common();
			}
		})
	},
	getApi: function(uid, token, page, cb) {
		var userList_params = {
			sex: 1,
			province: '北京',
			type: 3,
			page: page,
			pageSize: 20,
			token: token,
			packageName: 'pc',
			version: 'pc',
			channel: 'pc',
			clientType: '3',
			uid: uid
		};
		pack.request(config.index_list, 'post', userList_params, function(res) {
			typeof cb == "function" && cb(res)
		})
	},
	loaddata: function() {
		console.log('loaddata');
		this.onPullDownRefresh();
	},
	onPullDownRefresh: function() {
		this.setData({
			page: 1
		})
		wx.stopPullDownRefresh()
		this.common();
	},
	onReachBottom: function() {
		var that = this;
		if(that.data.off == true) {
			var pages = ++that.data.page;
			that.getApi(that.data.userInfo.uid, that.data.userInfo.token, pages, function(res) {
				var ret = res.data;
				that.setData({
					shujlist: that.data.shujlist.concat(ret.list)
				});
				if(ret.list.length < 20) {
					that.setData({
						off: false
					});
				} else {
					pages++;
					that.setData({
						page: pages
					});
				}
			})
		} else {
			wx.showToast({
				title: '没有更多啦',
				icon: 'none',
				duration: 2000
			})
		}
	},
	u8zhuanayyay: function(data) {
		var bufferss = new ArrayBuffer(data.length);
		var o = new Uint8Array(bufferss);
		for(var i = 0; i < data.length; ++i) {
			o[i] = data[i]
		}
		return bufferss;
	},
	onShareAppMessage: function() {
		var that = this;
		return {
			title: '小草直播',
			path: '/pages/index/getuser'
		}
	}
})