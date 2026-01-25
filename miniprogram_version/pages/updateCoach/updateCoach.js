// 新更新教练页面JS
Page({
  data: {
    names: [],
    selectedNames: [],
    selectAll: false,
    importText: '',
    showQRModal: false,
    qrCodePath: '',
    showPasswordModal: false,
    passwordInput: '',
    deletePassword: '123456' // 更改删除权限密码
  },
  
  onLoad() {
    this.loadNames()
  },
  
  // 加载名字列表
  loadNames() {
    const names = wx.getStorageSync('new_drawingNames') || []
    this.setData({
      names,
      selectedNames: [],
      selectAll: false
    })
  },
  
  // 切换全选
  toggleSelectAll() {
    const selectAll = !this.data.selectAll
    const names = this.data.names
    const selectedNames = selectAll ? names.map((_, index) => index) : []
    this.setData({
      selectAll,
      selectedNames
    })
  },
  
  // 切换单个选择
  toggleSelectName(e) {
    const index = parseInt(e.currentTarget.dataset.value)
    const selectedNames = this.data.selectedNames
    const idx = selectedNames.indexOf(index)
    if (idx > -1) {
      selectedNames.splice(idx, 1)
    } else {
      selectedNames.push(index)
    }
    this.setData({
      selectedNames,
      selectAll: selectedNames.length === this.data.names.length
    })
  },
  
  // 批量删除名字
  batchDeleteNames() {
    const selectedNames = this.data.selectedNames
    if (selectedNames.length === 0) {
      wx.showToast({ title: '请选择要删除的教练！', icon: 'none' })
      return
    }
    
    // 检查是否全选删除所有
    if (selectedNames.length === this.data.names.length) {
      this.setData({
        showPasswordModal: true,
        passwordInput: ''
      })
    } else {
      this.performDelete()
    }
  },
  
  // 执行删除操作
  performDelete() {
    const names = this.data.names
    const selectedNames = this.data.selectedNames
    const newNames = names.filter((_, index) => selectedNames.indexOf(index) === -1)
    wx.setStorageSync('new_drawingNames', newNames)
    this.loadNames()
    wx.showToast({ title: '删除成功！', icon: 'success' })
  },
  
  // 密码输入变化
  onPasswordInputChange(e) {
    this.setData({
      passwordInput: e.detail.value
    })
  },
  
  // 确认密码
  confirmPassword() {
    const password = this.data.passwordInput
    if (password === this.data.deletePassword) {
      this.performDelete()
      this.setData({
        showPasswordModal: false,
        passwordInput: ''
      })
    } else {
      wx.showToast({ title: '密码错误！', icon: 'none' })
    }
  },
  
  // 取消密码输入
  cancelPassword() {
    this.setData({
      showPasswordModal: false,
      passwordInput: ''
    })
  },
  
  // 导入文本变化
  onImportTextChange(e) {
    this.setData({
      importText: e.detail.value
    })
  },
  
  // 导入教练
  importNames() {
    const importText = this.data.importText.trim()
    if (!importText) {
      wx.showToast({ title: '请输入要导入的教练名字！', icon: 'none' })
      return
    }
    
    // 解析导入的名字
    const newNames = importText.split(/[\n,，]/).filter(name => name.trim()).map(name => name.trim())
    if (newNames.length === 0) {
      wx.showToast({ title: '请输入有效的教练名字！', icon: 'none' })
      return
    }
    
    // 检查重复
    const existingNames = wx.getStorageSync('new_drawingNames') || []
    const duplicateNames = newNames.filter(name => existingNames.includes(name))
    
    if (duplicateNames.length > 0) {
      wx.showModal({
        title: '提示',
        content: `发现重复名字：${duplicateNames.join('、')}，是否继续添加？`,
        success: (res) => {
          if (res.confirm) {
            this.addNames(newNames)
          }
        }
      })
    } else {
      this.addNames(newNames)
    }
  },
  
  // 添加名字
  addNames(newNames) {
    const existingNames = wx.getStorageSync('new_drawingNames') || []
    const allNames = [...existingNames, ...newNames]
    wx.setStorageSync('new_drawingNames', allNames)
    this.loadNames()
    this.setData({ importText: '' })
    wx.showToast({ title: '导入成功！', icon: 'success' })
  },
  
  // 生成二维码
  generateQRCode() {
    // 获取当前页面路径生成二维码
    const pagePath = '/pages/fillName/fillName'
    
    // 使用微信API生成二维码
    wx.showLoading({ title: '生成二维码中...' })
    
    // 模拟生成二维码，实际项目中使用 wx.createQRCode
    setTimeout(() => {
      wx.hideLoading()
      this.setData({
        showQRModal: true,
        qrCodePath: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(pagePath)
      })
    }, 1000)
  },
  
  // 关闭二维码弹窗
  closeQRModal() {
    this.setData({ showQRModal: false })
  }
})