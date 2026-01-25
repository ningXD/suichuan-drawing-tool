// 新首页JS
Page({
  data: {
  },
  
  // 跳转到更新教练页面
  goToUpdateCoach() {
    wx.navigateTo({
      url: '/new_pages/new_updateCoach/new_updateCoach'
    })
  },
  
  // 跳转到抽签页面
  goToDraw() {
    wx.navigateTo({
      url: '/new_pages/new_draw/new_draw'
    })
  }
})