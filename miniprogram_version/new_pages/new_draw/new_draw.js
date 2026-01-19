// 新抽签页面JS
Page({
  data: {
    resultText: '点击开始抽签',
    isDrawing: false,
    remainingNames: [],
    remainingNamesCount: 0,
    drawnNames: [],
    drawInterval: null
  },
  
  onLoad() {
    this.initDraw()
  },
  
  // 初始化抽签
  initDraw() {
    const allNames = wx.getStorageSync('new_drawingNames') || []
    const whitelist = wx.getStorageSync('new_drawingWhitelist') || []
    
    // 排除白名单中的名字
    const remainingNames = allNames.filter(name => !whitelist.includes(name))
    
    this.setData({
      remainingNames,
      remainingNamesCount: remainingNames.length,
      drawnNames: [],
      resultText: '点击开始抽签',
      isDrawing: false
    })
  },
  
  // 开始/停止抽签
  startDraw() {
    if (this.data.remainingNamesCount === 0) {
      wx.showToast({ title: '没有可抽的教练了！', icon: 'none' })
      return
    }
    
    if (this.data.isDrawing) {
      // 停止抽签
      this.stopDraw()
    } else {
      // 开始抽签
      this.startDrawing()
    }
  },
  
  // 开始抽签动画
  startDrawing() {
    this.setData({ isDrawing: true })
    
    const remainingNames = this.data.remainingNames
    let count = 0
    const totalCount = 100 // 动画持续次数
    const intervalTime = 50 // 每帧间隔时间
    
    // 快速切换名字实现抽签动画
    const drawInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * remainingNames.length)
      this.setData({ resultText: remainingNames[randomIndex] })
      count++
      
      if (count >= totalCount) {
        this.stopDraw()
      }
    }, intervalTime)
    
    this.setData({ drawInterval })
  },
  
  // 停止抽签
  stopDraw() {
    clearInterval(this.data.drawInterval)
    
    const remainingNames = this.data.remainingNames
    const drawnNames = this.data.drawnNames
    
    // 随机选择一个结果
    const randomIndex = Math.floor(Math.random() * remainingNames.length)
    const drawnName = remainingNames[randomIndex]
    
    // 更新已抽中和剩余列表
    const newDrawnNames = [...drawnNames, drawnName]
    const newRemainingNames = remainingNames.filter((_, index) => index !== randomIndex)
    
    this.setData({
      isDrawing: false,
      resultText: drawnName,
      drawnNames: newDrawnNames,
      remainingNames: newRemainingNames,
      remainingNamesCount: newRemainingNames.length
    })
    
    wx.showToast({ title: '抽签完成！', icon: 'success' })
  },
  
  // 重置抽签
  resetDraw() {
    wx.showModal({
      title: '确认重置',
      content: '确定要重置抽签吗？已抽中的结果将被清空。',
      success: (res) => {
        if (res.confirm) {
          this.initDraw()
          wx.showToast({ title: '抽签已重置！', icon: 'success' })
        }
      }
    })
  },
  
  // 返回首页
  goBack() {
    wx.navigateBack()
  }
})