/* 小程序配置文件
 */
var host = "https://www.xiuktv.com";
// var host = "https://www.xcbobo.com";
var config = {
	//个人资料卡片
	queryOtherInfo: `${host}/xcbb_web/business/mobile/api/queryOtherInfo`,
	//查询用户信息接口
	user_info: `${host}/xcbb_web/mobile/user/info`,
	//获取礼物
	gift_s: `${host}/xcbb_web/common/room/tools`,
	//获取阳光礼物
	sun_gift: `${host}/xcbb_web/business/mobile/dig/getBackPackItemList`,
	//获取直播间在线用户列表
	user_list: `${host}/xcbb_web/business/mobile/guard/userOnline`,
	//修改用户信息
	change_info: `${host}/xcbb_web/business/mobile/api/modifyinfo`,
	//关注的人
	attention: `${host}/xcbb_web/mobileFollow/addFollowme`,
	//首页banner
	index_banner: `${host}/xcbb_web/mobile/api/headlines/findStartupOrBanner`,
	//守护列表
	guard_list: `${host}/xcbb_web/business/mobile/guard/userAnchorGuard`,
	//守护小列表
	user_list_few: `${host}/xcbb_web/business/mobile/guard/liveUserOnline`,
	//根据coide获取用户uid和token
	code_userinfo: `${host}/xcbb_web/weixin/miniProgram/loadSessionIdByCode`,
	//首页用户列表
	index_list: `${host}/xcbb_web/mobileLive/searchRecentUserLiveResult`,
	//soket接口
	liveRoomAddreeInfo: `${host}/xcbb_web/weixin/miniProgram/liveRoomAddreeInfo`,
	//充值列表
	recharge_list: `${host}/xcbb_web/businsess/mobile/billing/list/goods`,
	//请求后台充值列表数据
	goods: `${host}/xcbb_web/business/mobile/billing/list/goods`,
	//支付
	getprepayid: `${host}/xcbb_open/rcpay/weixin/mobile/getprepayid`,
	//获取个人信息
	getinfo_simple: `${host}/xcbb_web/business/mobile/api/getinfo_baidu`,
	//编辑个人信息
	upload: `${host}/xcbb_web/business/mobile/api/upload`,

	//host
	host:'https://www.xiuktv.com/'
};

module.exports = config

	