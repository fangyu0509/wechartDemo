App({
  onLaunch: function () {
    wx.checkSession({
      
      success () {
        //session_key 未过期，并且在本生命周期一直有效
        console.log('code:session_key')
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        console.log('session_key已经失效，需要重新执行登录流程')
        wx.getSetting({
          success (res) {
            if(!res.authSetting['scope.userInfo']){
              console.log('没有授权做引导处理')
                // 没有授权做引导处理
            }else{
              console.log('授权过，重新登陆'),
              wx.login({//重新登录
                success (res) {
                  if (res.code) {
                    //发起网络请求
                    wx.request({
                      url: 'https://test.com/onLogin',
                      data: {
                        code: res.code
                      }
                    })
                  } else {
                    
                  }
                  console.log('code:' + res.code)
                }
              })
            }
          }
        })
      }
    })
  },
  onShow (options) {
    // Do something when show.
  },
  globalData:{
    userInfo:{},
    openId:""
  }
})

