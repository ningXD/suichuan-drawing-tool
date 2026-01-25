// 新的小程序入口文件
App({
  onLaunch() {
    // 初始化数据
    if (!wx.getStorageSync('new_drawingNames')) {
      wx.setStorageSync('new_drawingNames', [])
    }
    if (!wx.getStorageSync('new_drawingWhitelist')) {
      wx.setStorageSync('new_drawingWhitelist', [])
    }
    // 初始化白名单默认值
    this.initWhitelist()
  },
  
  initWhitelist() {
    // 白名单功能配置区 - 更改删除权限密码
    const DELETE_PASSWORD = '123456'; // 更改删除权限密码
    
    // 白名单功能配置区 - 快速设置默认白名单
    const WHITELIST_DEFAULT = []; // 直接在这里设置默认白名单，如 ['王昊宁', '江旭峰']
    
    // 检查并设置默认白名单
    const currentWhitelist = wx.getStorageSync('new_drawingWhitelist') || [];
    if (currentWhitelist.length === 0 && WHITELIST_DEFAULT.length > 0) {
      wx.setStorageSync('new_drawingWhitelist', WHITELIST_DEFAULT);
    }
  },
  
  globalData: {
    // 全局数据
    deletePassword: '123456' // 更改删除权限密码
  }
})