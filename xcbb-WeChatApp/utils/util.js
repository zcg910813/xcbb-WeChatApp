const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

//时间戳转换年份
function timestampToTime(timestamp) {
	var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear();
	return Y
}

//获取当前时间年份
function years() {
	var date = new Date;
	var year = date.getFullYear();
	return year;
}

//提示框封装
function tipsIframe(title) {
	wx.showToast({
		title: title,
		icon: 'none',
		duration: 1000,
		success: function() {

		},
		fail: function() {
			console.log('失败')
		}
	})
}

function request(url, moth, params, cablack) {
	wx.showLoading({});
	wx.request({
		url: url,
		method: moth,
		data: params,
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		success: function(res) {
			wx.hideLoading();
			cablack(res);
		},
		fail: function(err) {
			tipsIframe('服务器故障')
		}
	})
}

module.exports = {
	formatTime: formatTime,
	tipsIframe: tipsIframe,
	request: request,
	timestampToTime: timestampToTime,
	years:years
}