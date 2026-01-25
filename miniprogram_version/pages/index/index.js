// 新首页JS
Page({
  data: {
  },
  
  // 跳转到更新教练页面
  goToUpdateCoach() {
    wx.navigateTo({
      url: '/pages/updateCoach/updateCoach'
    })
  },
  
  // 跳转到抽签页面
  goToDraw() {
    wx.navigateTo({
      url: '/pages/draw/draw'
    })
  }
})