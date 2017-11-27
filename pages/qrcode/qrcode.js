// qrcode.js
var QR = require('../../utils/qrcode.js')

Page({

  data: {
    content: "",
    logo: ''
  },

  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    // FKX05639AEMUOSN0TE016F
    // f2f0JV5T664Amfb_JDHLXtMBTrL2_8PvU68O
    console.log(options)
    this.setData({
      content: 'https://heyfox.herokuapp.com/pay?ali=' + options['alipay'] + '&wx=' + options['wechat'],
      logo: options['logo']
    })
    
    // 绘图
    const ctx = wx.createCanvasContext('mycanvas')
    QR.qrApi.draw(this.data.content, ctx, 300, 300)
    if (options['logo'] != '') {
      console.log(options['logo'])
      ctx.clearRect(129, 129, 42, 42)
      ctx.drawImage(options['logo'], 130, 130, 40, 40)
      
    }
    ctx.draw()
    
  },

  previewImg: function (e) {
    wx.showActionSheet({
      itemList: ['保存收款码'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          console.log('保存收款码')
          wx.canvasToTempFilePath({
            canvasId: 'mycanvas',
            success: function (res) {
              var tempFilePath = encodeURI(res.tempFilePath)
              console.log(res)
              wx.saveFile({
                tempFilePath: res.tempFilePath,
                success: function success(res) {
                  console.log('saved::' + res.savedFilePath);
                  wx.showToast({
                    title: '保存成功',
                  })
                },
                complete: function fail(e) {
                  console.log(e.errMsg);
                  wx.showToast({
                    title: '保存失败',
                    icon: 'loading'
                  }),
                    setTimeout(function () {
                      wx.hideLoading()
                    }, 2000)
                }
              });
            },
            fail: function (res) {
              console.log(res);
              wx.showToast({
                title: '保存失败',
                icon: 'loading'
              }),
                setTimeout(function () {
                  wx.hideLoading()
                }, 2000)
            }
          });
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
    
  },

  

})