const app = getApp()

const __ = require('../../utils/base.js');

Page({

	data: {
		notice: ['/pages/image/notice1.jpg', '/pages/image/notice2.jpg', '/pages/image/notice3.png'],
		text: '我是一个粉刷匠粉刷本领强',
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
		userInfo: {}
	},

	onShow: function() {
		var that = this;
		that.common();
		wx.request({
			url: __.config.liveRoomAddreeInfo,
			data: ({
				token: app.globalData.anonymousToken,
				uid: app.globalData.anonymousUid
			}),
			success: function(data) {
				var socket = data.data;
				console.log('socket:', socket)
				var hostdata = socket.hall.split(":");
				socket.hall.split(":");
				var headData = that.send_head();
				console.log('headData:', headData);
				var version_agreement = that.stringzharr().StringToUint32Array(200811040);
				var version_client = that.stringzharr().StringToUint32Array(529539164);
				var isp = that.stringzharr().StringToUint16Array(4);
				var bodyData = [];
				bodyData = bodyData.concat(version_agreement);
				bodyData = bodyData.concat(version_client);
				bodyData = bodyData.concat(isp);
				console.log('bodyData:', bodyData);
				let message = new Uint8Array(headData.concat(bodyData));
				console.log('message:', message);
				var host = 'wss://' + socket.websocket + '/ws?host=' + hostdata[0] + '&port=' + hostdata[1];
				var method = 'GET';
				var data = {};
				__.socket.packWS(host, method, data, message, function(res) {
					console.log('packWS:', res);
					if(!res) {
						console.log('packWS err');
					} else {
						console.log('packWS success');
						__.untieHead(res.data, function(res) {
							console.log('head:', res);
						});
						that.analysisBody(res.data, function(body) {
							console.log('body:', body);
							if(!body.host) {
								console.log('解析错误！');
							} else {
								__.socket.closeWS();
								//重新创建连接
								var host = 'wss://' + socket.websocket + '/ws?host=' + body.host + '&port=' + body.port;

								//return false;
								var num = (206 << 8) | 4; // 1
								var arr = [];
								//头
								arr = arr.concat(that.stringzharr().StringToUint32Array(138));
								arr = arr.concat(that.stringzharr().StringToUint32Array(num));
								arr = arr.concat(that.stringzharr().StringToUint16Array(0));
								arr = arr.concat(that.stringzharr().StringToUint16Array(200));
								arr = arr.concat(that.stringzharr().StringToUint8Array(0));
								//主体
								arr = arr.concat(that.stringzharr().StringToUint8Array(0)); //anonymous 是否匿名登录
								arr = arr.concat(that.stringzharr().zhstring('')); //sha1Pass
								arr = arr.concat(that.stringzharr().StringToUint32Array(100)); //client_version
								arr = arr.concat(that.stringzharr().zhstring('123')); //client_info
								arr = arr.concat(that.stringzharr().zhstring('')); //vid
								arr = arr.concat(that.stringzharr().StringToUint32Array(3)); //login_type 0：pc 1：web 2：mobile	3：微信小程序
								arr = arr.concat(that.stringzharr().StringToUint32Array(10005139)); //uid 用户id
								arr = arr.concat(that.stringzharr().zhstring('')); //account用户账号
								arr = arr.concat(that.stringzharr().zhstring('token')); //kind 登录类型
								arr = arr.concat(that.stringzharr().zhstring('TVRBd01EVXhNem5DcDI5MFluQXlOMm80T1hReE5URTFNRFUzTlRReU5qUTB3cWN4TlRNME9ERTNOemMzT1RNMw%3D%3D')); //token 登录web获取到的令牌

								let message = new Uint8Array(arr);
								console.log('arr:', arr);
								console.log('message:', message);
								var ret = [];

								console.log('yuanur:', 206 << 8 | 4);

								__.socket.packWS(host, 'GET', {}, message, function(res) {
									ret = ret.concat(res.data);



									/*//入场
									var ruchang = [];
									var ruchang_uri = (32 << 8) | 2;
									//头部
									ruchang = ruchang.concat(that.stringzharr().StringToUint32Array(33))
									ruchang = ruchang.concat(that.stringzharr().StringToUint32Array(ruchang_uri));
									ruchang = ruchang.concat(that.stringzharr().StringToUint16Array(0));
									ruchang = ruchang.concat(that.stringzharr().StringToUint16Array(200));
									ruchang = ruchang.concat(that.stringzharr().StringToUint8Array(0));

									//主体
									ruchang = ruchang.concat(that.stringzharr().StringToUint32Array(10005139)); //用户id
									ruchang = ruchang.concat(that.stringzharr().StringToUint16Array('')); // 固定值“”
									ruchang = ruchang.concat(that.stringzharr().StringToUint32Array(2)); //房间id
									ruchang = ruchang.concat(that.stringzharr().StringToUint32Array(1)); //固定值1
									ruchang = ruchang.concat(that.stringzharr().StringToUint16Array('')); // 固定值“”
									ruchang = ruchang.concat(that.stringzharr().StringToUint32Array(100)); //固定值1
									
	
									var ruchang_aurrbufer = new Uint8Array(ruchang);
									__.socket.sendWS(ruchang_aurrbufer, function(res) {
										console.log('发送成功1', res)
									})*/






									var zhibos = [];
									var svid_live = (35 << 8) | 4;
									//									console.log(svid_live)
									//头部
									zhibos = zhibos.concat(that.stringzharr().StringToUint32Array(33))
									zhibos = zhibos.concat(that.stringzharr().StringToUint32Array(svid_live));
									zhibos = zhibos.concat(that.stringzharr().StringToUint16Array(0));
									zhibos = zhibos.concat(that.stringzharr().StringToUint16Array(200));
									zhibos = zhibos.concat(that.stringzharr().StringToUint8Array(0));

									//主体
									zhibos = zhibos.concat(that.stringzharr().StringToUint32Array(2)); //房间id
									zhibos = zhibos.concat(that.stringzharr().StringToUint16Array(4)); //

									var live_entry = new Uint8Array(zhibos);

									console.log(live_entry)
									__.socket.sendWS(live_entry, function(res) {
										console.log('发送成功2', res)
									})
							
									
									
									
									
									

									for(var i = 0; i < ret.length; i++) {
										var uri = __.typeConvert(ret[i]).u32(4, 4, 0, false);
										console.log('uri', uri)
										if(uri == 51204) {
											continue;
										} else if(uri == 516) {
											console.log('登录验证答复=>长度' + i + '=>', __.typeConvert(ret[i]).u32(0, 4, 0, false)) //length
											console.log('登录验证答复=>uri' + i + '=>', __.typeConvert(ret[i]).u32(4, 4, 0, false)) //uri
											console.log('登录验证答复=>sid' + i + '=>', __.typeConvert(ret[i]).u16(8, 2, 0, false)) //sid
											console.log('登录验证答复=>rescode' + i + '=>', __.typeConvert(ret[i]).u16(10, 2, 0, false)) //rescode
											console.log('登录验证答复=>tag' + i + '=>', __.typeConvert(ret[i]).u8(11, 1, 0, false)) //tag

											console.log('登录验证答复=>错误码', __.typeConvert(ret[i]).u32(13))
											console.log('登录验证答复=>用户id', __.typeConvert(ret[i]).u32(17))
											console.log('登录验证答复=>用户帐号长度', __.typeConvert(ret[i]).u16(21, 23, 0, false));
											var username_length = __.typeConvert(ret[i]).u16(21);
											var username_arr = new Uint8Array(ret[i], 23, username_length)
											console.log('登录验证答复=>', __.typeConvert(ret[i]).Uint8ArrayToString(username_arr))

										} else if(uri == 102404) {

											console.log('大厅广播包=>长度' + i + '=>', __.typeConvert(ret[i]).u32(0, 4, 0, false)) //length
											console.log('大厅广播包=>uri' + i + '=>', __.typeConvert(ret[i]).u32(4, 4, 0, false)) //uri
											console.log('大厅广播包=>sid' + i + '=>', __.typeConvert(ret[i]).u16(8, 2, 0, false)) //sid
											console.log('大厅广播包=>rescode' + i + '=>', __.typeConvert(ret[i]).u16(10, 2, 0, false)) //rescode
											console.log('大厅广播包=>tag' + i + '=>', __.typeConvert(ret[i]).u8(11, 1, 0, false)) //tag

											console.log('大厅广播包=>插件类型' + i + '=>', __.typeConvert(ret[i]).u32(13, 4, 0, false))
											console.log('大厅广播包=>字符串长度' + i + '=>', __.typeConvert(ret[i]).u32(17, 4, 0, false))
											var broadcast_length = __.typeConvert(ret[i]).u32(17, 4, 0, false);
											var broadcast_data = new Uint8Array(ret[i], 21, broadcast_length);
											console.log('大厅广播字符串=>', __.typeConvert(ret[i]).Uint8ArrayToString(broadcast_data))
											console.log('大厅广播包=>to_uids' + i + '=>', __.typeConvert(ret[i]).u32(broadcast_length, 4, 0, false))

										} else if(uri == 9220) {
											console.log('房间服务地址=>长度' + i + '=>', __.typeConvert(ret[i]).u32(0, 4, 0, false)) //length
											console.log('房间服务地址=>uri' + i + '=>', __.typeConvert(ret[i]).u32(4, 4, 0, false)) //uri
											console.log('房间服务地址=>sid' + i + '=>', __.typeConvert(ret[i]).u16(8, 2, 0, false)) //sid
											console.log('房间服务地址=>rescode' + i + '=>', __.typeConvert(ret[i]).u16(10, 2, 0, false)) //rescode
											console.log('房间服务地址=>tag' + i + '=>', __.typeConvert(ret[i]).u8(11, 1, 0, false)) //tag

											console.log('房间服务地址=>房间id', __.typeConvert(ret[i]).u32(13));
											console.log('房间服务地址=>固定值', __.typeConvert(ret[i]).u32(17));
											console.log('房间服务地址ip长度',__.typeConvert(ret[i]).u16(21));
											var room_length = __.typeConvert(ret[i]).u16(21);
											var room_arr = new Uint8Array(ret[i],23,room_length);											
											console.log('房间服务地址=>', __.typeConvert(ret[i]).Uint8ArrayToString(room_arr))
											console.log('房间服务地址=>固定值2',__.typeConvert(ret[i]).u16(room_length));
											console.log('房间服务端口=>',__.typeConvert(ret[i]).u16(1000, 1000, 10))
							
							
							
											
										}
									}

								});
							}
						});
					}
				});

			}
		})

	},
	//发送头
	send_head: function() {
		var that = this;
		var arr = [];
		var length = that.stringzharr().StringToUint32Array(23);
		var uri = that.stringzharr().StringToUint32Array(1);
		var sid = that.stringzharr().StringToUint16Array(0);
		var resCode = that.stringzharr().StringToUint16Array(200);
		var tag = that.stringzharr().StringToUint8Array(0);
		arr = arr.concat(length);
		arr = arr.concat(uri);
		arr = arr.concat(sid);
		arr = arr.concat(resCode);
		arr = arr.concat(tag);
		return arr;
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
		var ip_length = null;
		var ip = null;
		var host = null;
		var port = null;
		__.typeConvert(array_boday).u16(0, 2, 0, function(res) {
			ip_length = res;
			ip = new Uint8Array(array_boday, 2, ip_length);
			__.typeConvert(data).Uint8ArrayToString(ip, function(res) {
				host = res;
			});
			__.typeConvert(array_boday).u16(2 + ip_length + 4, 2, 0, function(res) {
				port = res;
			})
		});
		var res = {
			'host': host,
			'port': port,
		};
		cb(res);
	},

	stringzharr: function() {
		var that = this;
		var Method = {
			StringToUint32Array: function(str) {
				var arr = [];
				var arrbuf = new ArrayBuffer(4);
				var arrbufDaview = new Uint32Array(arrbuf, 0);
				arrbufDaview[0] = str;
				var zhhss = new Uint8Array(arrbuf);
				for(var i = 0; i < zhhss.length; i++) {
					arr.push(zhhss[i]);
				}
				return arr;
			},
			StringToUint16Array: function(str) {
				var arr = [];
				var arrbuf = new ArrayBuffer(2);
				var arrbufDaview = new Uint16Array(arrbuf, 0);
				arrbufDaview[0] = str;
				var zhhss = new Uint8Array(arrbuf);
				for(var i = 0; i < zhhss.length; i++) {
					arr.push(zhhss[i]);
				}
				return arr;
			},
			StringToUint8Array: function(str) {
				var arr = [];
				var arrbuf = new ArrayBuffer(1);
				var arrbufDaview = new Uint8Array(arrbuf, 0);
				arrbufDaview[0] = str;
				var zhhss = new Uint8Array(arrbuf);
				for(var i = 0; i < zhhss.length; i++) {
					arr.push(zhhss[i]);
				}
				return arr;
			},
			zhstring: function(str) {

				var ch, st, re = [];

				re = re.concat(that.stringzharr().StringToUint16Array(str.length))

				for(var i = 0; i < str.length; i++) {
					ch = str.charCodeAt(i);
					st = [];

					do {
						st.push(ch & 0XFF);
						ch = ch >> 8;
					}

					while (ch);

					re = re.concat(st.reverse());
				}

				return re;

			}
		}
		return Method;
	},

	common: function() {
		var that = this;
		app.getUserInfo(function(userInfo) {
			//更新数据
			that.setData({
				userInfo: userInfo
			})
			that.getApi(userInfo.uid, userInfo.token, 1, function(res) {
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
				} else {
					that.common();
				}
			})
		})
	},

	onLoad: function() {
		this.common();
	},

	getApi: function(uid, token, page, cb) {
		var that = this;
		// wx.showLoading({
		//   title: 'loading...',
		// })
		wx.request({
			url: 'https://www.xcbobo.com/xcbb_web/mobileLive/searchRecentUserLiveResult',
			method: 'post',
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: {
				sex: 2,
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
			},
			success: function(res) {
				//console.log(res);
				//wx.hideLoading();
				typeof cb == "function" && cb(res)
			},
			fail: function() {
				//wx.hideLoading();
				console.log('request error');
			}
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

	onShareAppMessage: function() {
		var that = this;
		return {
			title: '小草直播',
			path: '/pages/index/getuser'
		}
	}

})