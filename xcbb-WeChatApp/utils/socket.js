module.exports = {
    //连接
    connecWS(host, method, data, cb) {
        wx.connectSocket({
            url: host,
            data: data,
            method: method,
            header:{ 
            	'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
		  	},
            success(res) {
//              console.log('connecWS:' + res);
                typeof cb == "function" && cb(res);
            },
            fail(err) {
                console.log('connecWS err:' + err);
                typeof cb == "function" && cb(false);
            }
        })
    },
    //打开
    openWS(cb) {
        wx.onSocketOpen(function(res) {
//          console.log('openWS:' + res);
            typeof cb == "function" && cb(res);
        })
        wx.onSocketError(function(res) {
            console.log('WebSocket出错了：', res)
        })
    },
    //监听
    socketWS(cb) {
        wx.onSocketMessage(function(res) {
//          console.log('socketWS:' + res);
            typeof cb == "function" && cb(res);
        })
    },
    //发送
    sendWS(data, cb) {
        wx.sendSocketMessage({
            data: data,
            success(res) {
//              console.log('sendWS:' + res);
                typeof cb == "function" && cb(res);
            },
            fail(err) {
                console.log('sendWS err:' + err);
                typeof cb == "function" && cb(false);
            }
        });
    },
    //关闭
    closeWS(cb) {
        wx.closeSocket({
            success(res) {
                wx.onSocketClose(function(res) {
//                  console.log('closeWS:' + res);
                    typeof cb == "function" && cb(res);
                })
            },
            fail(err) {
//              console.log('closeWS:' + err);
                typeof cb == "function" && cb(false);
            }
        });
    },
    //Socket集合
    packWS(host, method, data, message, cb) {
//      console.log('socketHost:', host);
//      console.log('socketMethod:', method);
//      console.log('socketData:', data);
//      console.log('socketMessage:', message);
        var that = this;
        that.connecWS(host, method, data, function(res) {
            if (!res) {
                console.log('connecWS:err');
                cb(false);
            } else {
                that.openWS(function(res) {
                    if (!res) {
                        console.log('openWS:err');
                        cb(false);
                    } else {
                        that.socketWS(function(res) {
                            if (!res) {
                                console.log('socketWS:err');
                                // cb(false);
                            } else {
//                              console.log('socketWS:', res);
                                cb(res);
                            }
                        })
                        that.sendWS(message, function(res) {
                            // if (!res) {
//                          console.log('sendWS:err',res);
                            //     cb(false);
                            // } else {

                            // }
                        });
                    }
                });
            }
        });
    },
};