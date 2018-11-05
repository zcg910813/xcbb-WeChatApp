const app = getApp()

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
	//连接
	connecWS: function(host, method, data, cb){
		wx.connectSocket({
		  url: host,
		  data:data,
		  method:method,
		  success: function(res) {
		  	console.log('数据提交成功')
		  	cb(res);
		  },
		  fail:function(err){
		  	console.log(err);
		  	cb(false);
		  }
		})
	},
	//打开
	openWS: function(cb) {
		wx.onSocketOpen(function(res) {
			console.log(res + 'WebSocket连接已打开！');
			cb(res);
		})
	},
	//监听
	socketWS: function(cb){
		wx.onSocketMessage(function(res) {
			console.log('收到服务器内容：' + res);
			cb(res);
		})
	},
	//发送
	sendWS: function(data, cb){
		wx.sendSocketMessage({
			data: data,
			success: function(res) {
				console.log('数据提交成功');
				cb(res);
			},
			fail: function(err) {
				console.log('数据提交错误');
				cb(false);
			}
		});
	},
	//Socket集合
	autoWS: function(host, method, data, message, cb){
		var that = this;
		that.connecWS(host, method, data, function(res){
			console.log('connecWS:', res);
			that.openWS(function(res){
				console.log('openWS:', res);	
				that.sendWS(message, function(res){
					console.log('sendWS:', res);
					that.socketWS(function(res){
						console.log('socketWS:', res);
						cb(res);
					})
				});
			});
		});
	},

	onShow: function() {
		var that = this;
		that.common();
		wx.request({
			url: 'http://www.xiuktv.com/xcbb_web/weixin/miniProgram/liveRoomAddreeInfo',
			data: ({
				token: app.globalData.anonymousToken,
				uid: app.globalData.anonymousUid
			}),
			success: function(data) {
				var data = data.data;
				console.log(data)
				var hostdata=data.hall.split(":");
				data.hall.split(":");

				var arraybuffer;

	 		 	var headfz = that.send_head();
				var version_agreement = that.stringzharr().StringToUint32Array(200811040);
				var version_client = that.stringzharr().StringToUint32Array(529539164);
				var isp = that.stringzharr().StringToUint16Array(4);
				for(var i = 0; i < version_agreement.length; i++) {
					headfz.push(version_agreement[i])
				}
				for(var i = 0; i < version_client.length; i++) {
					headfz.push(version_client[i])
				}
				for(var i = 0; i < isp.length; i++) {
					headfz.push(isp[i])
				}
				let message = new Uint8Array(headfz);
			
      	 		var host = 'wss://'+data.websocket+'/ws?host='+hostdata[0]+'&port='+hostdata[1];
      	 		var method = 'GET';
      	 		var data = {};
      	 		that.autoWS(host, method, data, message, function(res){
      	 			console.log('autoWS:', res);
      	 		});


				// wx.connectSocket({
				// 	url: 'wss://'+data.websocket+'/ws?host='+hostdata[0]+'&port='+hostdata[1]+'',
				// 	method: "GET",
				// })

				// wx.onSocketOpen(function() {
				// 	var headfz = that.send_head();
				// 	var version_agreement = that.stringzharr().StringToUint32Array(200811040);
				// 	var version_client = that.stringzharr().StringToUint32Array(529539164);
				// 	var isp = that.stringzharr().StringToUint16Array(4);
				// 	for(var i = 0; i < version_agreement.length; i++) {
				// 		headfz.push(version_agreement[i])
				// 	}
				// 	for(var i = 0; i < version_client.length; i++) {
				// 		headfz.push(version_client[i])
				// 	}
				// 	for(var i = 0; i < isp.length; i++) {
				// 		headfz.push(isp[i])
				// 	}

				// 	let data = new Uint8Array(headfz);
				// 	console.log(data)
				// 	wx.sendSocketMessage({
				// 		data: data,
				// 		success: function(res) {
				// 			console.log('数据提交成功')
				// 		}
				// 	});

				// })

// 				var arraybuffer;
// 				wx.onSocketMessage(function(res) {
// 					var t = new Uint8Array(res.data, res.data.length);
// 					that.Parsinghead(res.data);
// 					that.parsingbody(res.data);
// 					wx.closeSocket({
// 						success:function(res){
// 							console.log(res)
// 						}
// 					});
					
// 					wx.connectSocket({
// 						url: 'wss://mq.xiuktv.com:10443/ws?host=59.110.125.134&port=30101',
// 						method:"get"
// 					})
// 					wx.onSocketOpen(function(res) {
// //					  console.log('WebSocket连接已打开！')
// //						var headfz = that.send_head();
// //						console.log(headfz);
// 						var num = (206 << 8) | 4; // 1

// 						var arr = [];
// 						arr = arr.concat(that.stringzharr().StringToUint32Array(138));
// 						arr = arr.concat(that.stringzharr().StringToUint32Array(num));
// 						arr = arr.concat(that.stringzharr().StringToUint16Array(0));
// 						arr = arr.concat(that.stringzharr().StringToUint16Array(200));
// 						arr = arr.concat(that.stringzharr().StringToUint8Array(0));
// 						arr = arr.concat(that.stringzharr().StringToUint8Array(0));						
// 						arr = arr.concat(that.stringzharr().zhstring(''));
// 						arr = arr.concat(that.stringzharr().StringToUint32Array(100));
// 						arr = arr.concat(that.stringzharr().zhstring('123'));
// 						arr = arr.concat(that.stringzharr().zhstring(''));
// 						arr = arr.concat(that.stringzharr().StringToUint32Array(3));
// 						arr = arr.concat(that.stringzharr().StringToUint32Array(2037845291));
// 						arr = arr.concat(that.stringzharr().zhstring(''));
// 						arr = arr.concat(that.stringzharr().zhstring('token'));
// 						arr = arr.concat(that.stringzharr().zhstring('TWpBd056QTJNRG5DcDJGMVpuUmlhMmRoTlRBeE5UQTVOamcxTmpBM09USTJ3cWN4TlRJME16QXhPVEl3TlRVMw%3D%3D'));
						

// 						let data = new Uint8Array(arr);
// 						console.log('data=>',data)
// 						wx.sendSocketMessage({
// 						data: data,
// 						success: function(res) {
// 							console.log('数据提交成功')
// 						}
// 					});
											

// 					})
					
// 				})
				
// 				wx.onSocketMessage(function(res) {
// 						var t = new Uint8Array(res.data, res.data.length);
// //						console.log(t)
// 						console.log(1)
// 				})				
				
				
				


			}
		})

	},

	send_head: function() {
		var that = this;
		var arr = [];
		var length = that.stringzharr().StringToUint32Array(23);
		var uri = that.stringzharr().StringToUint32Array(1);
		var sid = that.stringzharr().StringToUint16Array(0);
		var resCode = that.stringzharr().StringToUint16Array(200);
		var tag = that.stringzharr().StringToUint8Array(0);

		for(var i = 0; i < length.length; i++) {
			arr.push(length[i])
		}
		for(var i = 0; i < uri.length; i++) {
			arr.push(uri[i])
		}
		for(var i = 0; i < sid.length; i++) {
			arr.push(sid[i])
		}
		for(var i = 0; i < resCode.length; i++) {
			arr.push(resCode[i])
		}
		for(var i = 0; i < tag.length; i++) {
			arr.push(tag[i])
		}
		return arr;
	},

	Parsinghead: function(arrayBuffe) {
		var that = this;
		var length = that.zhuanhuas(arrayBuffe).u32(0, 4);
		var uri = that.zhuanhuas(arrayBuffe).u32(4, 8);
		var sid = that.zhuanhuas(arrayBuffe).u16(8, 4);
		var rescode = that.zhuanhuas(arrayBuffe).u16(8, 4, 2);
		var tag = that.zhuanhuas(arrayBuffe).u8(9);
		var ip_length = that.zhuanhuas(arrayBuffe).u16(13, 4);
	},
	parsingbody: function(arrayBuffe) {
		var that = this;
		var byte_boday = new Uint8Array(arrayBuffe, 13)
		var array_boday = new ArrayBuffer(byte_boday.length)
		var k = new Uint8Array(array_boday)
		for(var i = 0; i < byte_boday.length; ++i) {
			k[i] = byte_boday[i]
		}
		var ip_length = that.zhuanhuas(array_boday).u16(0, 2)
		var ip = new Uint8Array(array_boday, 2, ip_length)
		console.log(ip_length)
		console.log('ip地址=>', that.zhuanhuas(arrayBuffe).Uint8ArrayToString(ip))

		var dk_length = that.zhuanhuas(array_boday).u32(2+ip_length,4);
		var dkarry = that.zhuanhuas(array_boday).u16(2+ip_length, 2);
		var dkys = that.zhuanhuas(array_boday).u16(2+ip_length+4, 2)
		
		console.log('dkys',dkys)
		
		
		console.log('dk_length',dk_length)

	},

	zhuanhuas: function(arrayBuffe) {
		var res_data = arrayBuffe;
		if(res_data.length < 4) {
			return;
		}
		var Method = {
			u32: function(offset, length, nums) {
				var dv = new DataView(res_data, offset, length)
				var msgid = dv.getUint32(nums, true)
				return msgid;
			},
			u16: function(offset, length, nums) {
				var dv = new DataView(res_data, offset, length)
				var msgid = dv.getUint16(nums, true)
				return msgid;
			},
			u8: function(offset, length, nums) {
				var dv = new DataView(res_data, offset, length)
				var msgid = dv.getUint8(nums, true)
				return msgid;
			},
			Uint8ArrayToString: function(fileData) {
				var dataString = "";
				for(var i = 0; i < fileData.length; i++) {
					dataString += String.fromCharCode(fileData[i]);
				}
				return dataString
			}
			

		}
		return Method;

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
			zhstring:function(str){
			
				var ch,st,re = [];
				
				re = re.concat(that.stringzharr().StringToUint16Array(str.length))				
				
				for(var i=0;i<str.length;i++){
					ch = str.charCodeAt(i);
					st = [];
					
					do{
						st.push(ch&0XFF);
						ch = ch >> 8;
					}
					
					while(ch);
					
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
