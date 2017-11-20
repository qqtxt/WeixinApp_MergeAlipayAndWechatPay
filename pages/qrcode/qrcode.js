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
    QR.qrApi.draw(this.data.content, 'mycanvas', 300, 300)

    if (options['logo'] != '') {
      const ctx = wx.createCanvasContext('mylogo')
      ctx.drawImage(options['logo'], 0, 0, 30, 30)
      ctx.draw()
    }
    
  },

  previewImg: function (e) {
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = encodeURI(res.tempFilePath)
        console.log(res)
        wx.previewImage({
          current: tempFilePath, // 当前显示图片的http链接
          urls: [tempFilePath], // 需要预览的图片http链接列表
          success: function (res) {
            console.log(res);
          },
          fail: function (res) {
            console.log(res);
          }
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });

  },

  

})