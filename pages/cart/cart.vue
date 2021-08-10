<template>
  <view class="cart" :style="{ height: windowHeight + 'px' }">
    <nav-bar left-icon="none" left-text="购物车"></nav-bar>
    <view class="content" v-if="cartList.length">
      <view class="address">
        <view v-if="addressInfo" @click="selectAddress">
          <view class="base-info">
            <view>收货人：{{ addressInfo.userName }}</view>
            <view>
              电话：{{ addressInfo.telNumber }}
              <u-icon name="arrow-right"></u-icon>
            </view>
          </view>
          <view class="address-info">地址：{{ address }}</view>
        </view>
        <view v-else class="select-address" @click="selectAddress">请选择收货地址</view>
      </view>
      <image src="/static/images/cart_border@2x.png" class="address-border" mode="scaleToFill"></image>
      <view class="title-section">
        <u-icon name="bag" class="icon"></u-icon>
        <view class="title">购物车</view>
      </view>
      <scroll-view scroll-y="true" class="cart-list">
        <view class="cart-list">
          <u-swipe-action :show="item.show" :index="index" v-for="(item, index) in cartList" :key="item.goods_id" @click="swiperActionClick" :options="options" @open="open">
            <view class="cart-item">
              <u-checkbox :value="item.status" :name="index" shape="circle" active-color="#c00000" @change="checkboxHandle"></u-checkbox>
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
    <view class="no-content" v-else><u-empty text="空空如也 >_<" mode="car"></u-empty></view>
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
    console.log(this.$store);
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
      windowHeight: this.$windowHeight,
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
    ...mapState('user', ['addressInfo']),
    ...mapGetters('cart', ['total']),
    ...mapGetters('user', ['address']),
    selectCount() {
      return this.selectList.reduce((total, item) => (total += item.num), 0);
    },
    selectPrice() {
      return this.selectList.reduce((total, item) => (total += item.num * item.goods_price), 0);
    },
    selectList() {
      return this.cartList.filter(_ => _.status);
    },
    checkedAll: {
      get() {
        return this.cartList.every(_ => _.status);
      },
      set(v) {
        return this.cartList.forEach(_ => (_.status = v));
      }
    }
  },
  methods: {
    ...mapMutations('cart', ['updateCartNum', 'removeCartList']),
    ...mapMutations('user', ['updateAddressInfo']),
    async selectAddress() {
      console.log('更换地址');
      var [err,res] = await uni.getSetting();
      if (!res.authSetting['scope.address']) {
        await uni.authorize({
          scope: 'scope.address'
        });
      }
      var [err, addressInfo] = await uni.chooseAddress();
      if (!err && addressInfo.errMsg === 'chooseAddress:ok') {
        this.updateAddressInfo(addressInfo);
      }
    },
    // 如果打开一个的时候，不需要关闭其他，则无需实现本方法
    swiperActionClick(index) {
      var goods_id = this.cartList[index].goods_id;
      this.removeCartList({ goods_id: goods_id });
    },
    open(index) {
      // 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
      // 原本为'false'，再次设置为'false'会无效
      this.cartList.map(val => {
        val.show = false;
      });
      this.cartList[index].show = true;
    },
    checkboxHandle({ value, name }) {
      this.cartList[name].status = value;
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
    // checkedAll(nv, v) {
    //   this.cartList.forEach(_ => (_.status = nv));
    // },
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
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: 0 8rpx;
    .base-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 27rpx;
    }
    .select-address {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
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
    display: block;
    width: 750rpx;
    height: 12rpx;
  }
}
.no-content {
  @extend .content;
  justify-content: center;
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
