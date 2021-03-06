
Page({
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true    // 全选状态，默认全选
  },
  onShow() {
    this.setData({
      hasList: true,
      carts: [
        { id: 1, title: '新鲜芹菜 半斤', image: 'http://123.56.228.112:35678/722582f0-cf62-4788-8f64-49a41d8a3307.png', num: 4, price: 0.01, selected: true },
        { id: 2, title: '素米 500g', image: 'http://123.56.228.112:35678/312519d0-0d72-4432-8843-ef62ee8b1709.png', num: 1, price: 0.03, selected: true },
        { id: 2, title: '素米 500g', image: 'http://123.56.228.112:35678/312519d0-0d72-4432-8843-ef62ee8b1709.png', num: 1, price: 0.03, selected: true }
      ]
    });
    this.getTotalPrice();
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;   
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
   
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);
    this.setData({
      carts: carts
    });
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },


  //request请求
  ajaxs(){
    wx.request({
      url: 'http://app.yidab.com/user/getAllMedicineList.do', //仅为示例，并非真实的接口地址
      data: {
        clinicCode: '815a2e98-9ac2-4c95-b5b4-de17ceffddef'       
      },
     
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
      }
    })

  }


})