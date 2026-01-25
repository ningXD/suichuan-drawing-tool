// 新填写名字页面JS
Page({
  data: {
    name: '',
    submitted: false
  },
  
  // 名字输入变化
  onNameInputChange(e) {
    this.setData({
      name: e.detail.value
    })
  },
  
  // 生成唯一名字
  generateUniqueName(name) {
    const existingNames = wx.getStorageSync('new_drawingNames') || []
    if (!existingNames.includes(name)) {
      return name
    }
    
    let counter = 1
    let uniqueName = `${name}(${counter})`
    while (existingNames.includes(uniqueName)) {
      counter++
      uniqueName = `${name}(${counter})`
    }
    return uniqueName
  },
  
  // 提交名字
  submitName() {
    const name = this.data.name.trim()
    if (!name) {
      wx.showToast({ title: '请输入你的名字！', icon: 'none' })
      return
    }
    
    // 生成唯一名字并保存到本地存储
    const uniqueName = this.generateUniqueName(name)
    const existingNames = wx.getStorageSync('new_drawingNames') || []
    existingNames.push(uniqueName)
    wx.setStorageSync('new_drawingNames', existingNames)
    
    this.setData({
      submitted: true,
      name: ''
    })
    
    wx.showToast({ title: '名字提交成功！', icon: 'success' })
    
    // 3秒后重置表单
    setTimeout(() => {
      this.setData({
        submitted: false
      })
    }, 3000)
  }
})