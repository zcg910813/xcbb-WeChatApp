// pages/openGuardians/openguardians.js
Page({
  data: {
    userInfo:null,                             //用户信息
    guardPriceLis:[],                     //身份列表数据
    xuanzhongId:"1",                       //选中身份id
    xuanzhongTime:"1",                     //选中时间
    tiemList:null,                        //守护时长列表 
    isShow:true,                           //控制守护时长显示
    date:"",                               //当前时间
    youxiaoDate:""                         //有效时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({                           //请求获取身份列表数据
      url: 'https://www.xiuktv.com/xcbb_web/business/mobile/guard/userAnchorGuard?uid=20264733&zid=10000106&token=TWpBeU5qUTNNelBDcHpOamF6aDJjWFF5TUdveE5UTXpOVE0yTXpJNE5qQXp3cWN4TlRNek5UTTJNekk0TmpZNA==',
      method:"post",
      data:{},
      success(res){
        console.log(res)
        let date = res.data.userInfo.nowDate;   //后台获取当前时间
        console.log(date)
        that.setData({
          date:date,
          userInfo: res.data.userInfo,
          guardPriceLis: res.data.guardPriceLis
        })
        if (that.data.xuanzhongTime=="1"){
          let today = new Date();
          if (today.getMonth() < 12){
            today.setMonth(today.getMonth() + 1);
          }else{
            today.setYear(today.getYear() + 1);
          }
          console.log(today) 
        }
        for (let i = 0; i < res.data.guardPriceLis.length; i++){
          if (that.data.xuanzhongId == that.data.guardPriceLis[i].guard_id) {
            that.setData({
              tiemList:{
                time1: that.data.guardPriceLis[i].time1,
                time1_jinbi: that.data.guardPriceLis[i].time1_jinbi,
                time2: that.data.guardPriceLis[i].time2,
                time2_jinbi: that.data.guardPriceLis[i].time2_jinbi,
                time3: that.data.guardPriceLis[i].time3,
                time3_jinbi: that.data.guardPriceLis[i].time3_jinbi,
              }
            })
          }
        }
        
        
        console.log(that.data.guardPriceLis)
      }
    })
  },
  xuanzhongShenfen(e) {                     // 选中身份套餐的方法
    // console.log(e.currentTarget.dataset.id);
    let that = this;
    let id = e.currentTarget.dataset.id;
    let guardPriceLis = that.data.guardPriceLis
    for (let i = 0; i < guardPriceLis.length; i++) {
      if (id == guardPriceLis[i].guard_id) {
        
        that.setData({                            //设置选中商品id、价格
          tiemList:{
            time1: guardPriceLis[i].time1,
            time1_jinbi: guardPriceLis[i].time1_jinbi,
            time2: guardPriceLis[i].time2,
            time2_jinbi: guardPriceLis[i].time2_jinbi,
            time3: guardPriceLis[i].time3,
            time3_jinbi: guardPriceLis[i].time3_jinbi,
          }
        })
      }
      if (id==4){
        that.setData({
          isShow:false
        })
      }else{
        that.setData({
          isShow: true
        })
      }
    }
    this.setData({
      xuanzhongId: id,
      xuanzhongTime:"1"
    })
  },
  xuanzhongTime(e){                         // 选中各身份对应的有效时间
    let that = this;
    let id = e.currentTarget.dataset.id;
    that.setData({
      xuanzhongTime: id
    })
    console.log(that.data.xuanzhongTime)
  },
  openGuardian(){                           //开启守护的方法
    wx.request({
      url: 'https://www.xiuktv.com/xcbb_web/business/mobile/guard/openOrRenewGuard?uid=20264733&token=TWpBeU5qUTNNelBDcHpOamF6aDJjWFF5TUdveE5UTXpOVE0yTXpJNE5qQXp3cWN4TlRNek5UTTJNekk0TmpZNA==&zid=10002311&validTime=1&flag=2&guardToolId=2&type=1&flag=2',
      method:"post",
      data:{
        uid:"",
        token:"",
        zid:"",
        validTime:"",
        guardToolId:"",
        type:"",
        flag:"",
        sid:""
      },
      success(res){
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})