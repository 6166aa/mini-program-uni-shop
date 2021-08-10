export default {
  namespaced: true,
  state: {
    //实际项目中，购物车的数据应该是存储在数据库中的
    cartList: (uni.getStorageSync('cartList') ||[]).map(item => {
      item.show = false;
      item.status = false;
      return item;
    })
  },
  getters: {
    total: (state) => {
      return state.cartList.reduce((sum, item) => sum += item.num, 0) || 0
    }
  },
  mutations: {
    //清空购物车，
    clearCartList(state, payload) {
      state.cartList = [];
      uni.setStorageSync('cartList', );
    },
    //添加一项
    // addCartList(state, payload) {
    //   debugger
    //   payload.num ? payload.num += 1 : payload.num = 1;
    //   var index = state.cartList.findIndex(item => item.goods_id === payload.goods_id);
    //   if (index !== -1) {
    //     state.cartList.splice(index, 1, payload);
    //   } else {
    //     state.cartList.push(payload);
    //   }
    //   uni.setStorageSync('cartList', state.cartList);
    //   uni.showToast({
    //     title: '添加购物车成功'
    //   });
    // },
    addCartList(state, payload) {
      var item = state.cartList.find(item => item.goods_id === payload.goods_id);
      if (item) {
        item.num++;
      } else {
        state.cartList.push(payload);
      }
      uni.setStorageSync('cartList', state.cartList);
      uni.showToast({
        title: '添加购物车成功'
      });
    },
    // updateCartNum(state, payload) {
    //  var index = state.cartList.findIndex(item => item.goods_id === payload.goods_id);
    //  if (index) {
    //    var item = state.cartList[index];
    //    item.num = payload.num;
    //    state.cartList.splice(index,1,item)
    //     uni.setStorageSync('cartList', state.cartList);
    //   }
    // },
    updateCartNum(state, payload) {
      var item = state.cartList.find(item => item.goods_id === payload.goods_id);
      if (item) {
        item.num = payload.num;
        uni.setStorageSync('cartList', state.cartList);
      }
    },
    //删除一项
    removeCartList(state, payload) {
      payload.num -= 1;
      var index = state.cartList.findIndex(item => item.goods_id === payload.goods_id);
      if (index !== -1) {
        state.cartList.splice(index, 1);
        uni.setStorageSync('cartList', state.cartList);
      }
    },
  },
  actions: {

  },
}
