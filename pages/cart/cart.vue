<template>
  <view class="cart" :style="{ height: $windowHeight + 'px' }">
    <nav-bar left-icon="none" left-text="购物车"></nav-bar>
    <view class="content" v-if="cartList.length">
      <view class="address"><view class="select-address">请选择收货地址</view></view>
      <view class="address-border"><u-image src="/static/images/cart_border@2x.png" width="750rpx" height="12rpx" mode="scaleToFill"></u-image></view>
      <view class="title-section">
        <u-icon name="bag" class="icon"></u-icon>
        <view class="title">购物车</view>
      </view>
      <scroll-view scroll-y="true" class="cart-list">
        <view class="cart-list">
          <u-swipe-action :show="item.show" :index="index" v-for="(item, index) in _cartList" :key="item.goods_id" :options="options" @click="click" @open="open">
            <view class="cart-item">
              <u-checkbox v-model="item.status" shape="circle" active-color="#c00000"></u-checkbox>
              <u-image :src="item.goods_small_logo" mode="scaleToFill" height="200rpx" width="200rpx" class="cover"></u-image>
              <view class="info">
                <view class="title">{{ item.goods_name }}</view>
                <view class="row">
                  <view class="price">{{ item.goods_price | toPrice }}</view>
                  <view class="count">
                    <number-step :value="item.num" :min="1" :max="99" @change="changeNumber" @error="errorHandle" :index="item.goods_id" @minus="minus" @plus="plus"></number-step>
                  </view>
                </view>
              </view>
            </view>
          </u-swipe-action>
        </view>
      </scroll-view>
      <view class="actions">
        <u-checkbox class="select-all" v-model="checkedAll" shape="circle" active-color="#c00000">全选</u-checkbox>
        <view class="total">
          总计：
          <text>{{ selectPrice | toPrice }}</text>
        </view>
        <view class="checkout">结算（{{ selectCount }}）</view>
      </view>
    </view>
    <view class="content" v-else><u-empty text="空空如也 >_<" mode="car"></u-empty></view>
  </view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import numberStep from '@/components/numberStep/numberStep.vue';
export default {
  components: {
    numberStep
  },
  created() {
    console.log(this.cartList);
  },
  onShow() {
    if (this.total) {
      uni.setTabBarBadge({
        index: 2,
        text: this.total + ''
      });
    }
  },
  data() {
    return {
      checkedAll: false,
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }
      ]
    };
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['total']),
    selectCount() {
      return this.selectList.reduce((total, item) => (total += item.num), 0);
    },
    selectPrice() {
      return this.selectList.reduce((total, item) => (total += item.num * item.goods_price), 0);
    },
    selectList() {
      return this._cartList.filter(_ => _.status);
    },
    _cartList(){
      let t = [];
      this.cartList.forEach(item=>{
        let obj = {...item};
        obj.status =false;
        obj.show =false;
        t.push(obj);
      });
      console.log(t);
      return t;
    }
  },
  methods: {
    ...mapMutations('cart', ['updateCartNum', 'removeCartList']),
    // 如果打开一个的时候，不需要关闭其他，则无需实现本方法
    open(index) {
      // 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
      // 原本为'false'，再次设置为'false'会无效
      this.cartList[index].show = true;
      this.cartList.map((val, idx) => {
        if (index != idx) this.cartList[idx].show = false;
      });
    },
    click(index, index1) {
      if (index1 == 1) {
        this.list.splice(index, 1);
        this.$u.toast(`删除了第${index}个cell`);
      } else {
        this.list[index].show = false;
        this.$u.toast(`收藏成功`);
      }
    },
    plus({ value, index }) {
      this.updateCartNum({ goods_id: index, num: +value });
    },
    minus({ value, index }) {
      if (value === 0) {
        var that = this;
        uni.showModal({
          content: '是否从购物车移除该商品?',
          success(res) {
            if (res.confirm) {
              that.removeCartList({ goods_id: index });
            } else {
              that.updateCartNum({ goods_id: index, num: 1 });
            }
          }
        });
      } else {
        this.updateCartNum({ goods_id: index, num: +value });
      }
    },
    errorHandle({ type }) {
      console.log(type);
      if (type === 'lessMin') {
        uni.showToast({
          title: '最少一件商品哟',
          icon: 'none'
        });
      } else if (type === 'moreMax') {
        uni.showToast({
          title: '最多九十九件商品哟',
          icon: 'none'
        });
      }
    },
    changeNumber({ value, index }) {
      console.log(value);
      if (value == 0) {
        var that = this;
        uni.showModal({
          content: '是否从购物车移除该商品?',
          success(res) {
            if (res.confirm) {
              that.removeCartList({ goods_id: index });
            }
          }
        });
      } else {
        this.updateCartNum({ goods_id: index, num: +value });
      }
    }
  },
  watch: {
    checkedAll(nv, v) {
      Object.values(this._cartList).forEach(_ => (_.status = nv));
    },
    total(nv) {
      uni.setTabBarBadge({
        index: 2,
        text: this.total + ''
      });
    }
  }
};
</script>

<style lang="scss">
.cart {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  .address {
    width: 100%;
    height: 180rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .select-address {
      width: 275rpx;
      height: 62rpx;
      background-color: #1aad19;
      color: #fff;
      border-radius: 8rpx;
      line-height: 62rpx;
      text-align: center;
    }
  }
  .address-border {
    height: 30rpx;
    width: 100%;
  }
}
.title-section {
  display: flex;
  padding: 22rpx 10rpx;
  .title {
    margin-left: 17rpx;
  }
}
.cart-list {
  flex: 1;
  .cart-item {
    padding: 20rpx 10rpx;
    display: flex;
    align-items: center;
    border-top: 1px solid #eee;
    &:last-child {
      border-bottom: 1px solid #eee;
    }
    .info {
      display: flex;
      height: 200rpx;
      flex-direction: column;
      justify-content: space-around;
      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .count {
          margin-right: 14rpx;
        }
      }
    }
  }
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding-left: 10rpx;
  .select-all {
    width: 227rpx;
  }
  .total {
    flex: 1;
    > text {
      color: #c00000;
    }
  }
  .checkout {
    background-color: #c00000;
    height: 100rpx;
    width: 225rpx;
    text-align: center;
    line-height: 100rpx;
    color: #fff;
    border-radius: 0;
  }
}
</style>
