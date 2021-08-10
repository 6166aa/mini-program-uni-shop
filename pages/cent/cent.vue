<template>
  <view class="cent" :style="{ height: windowHeight + 'px' }">
    <nav-bar left-text="我的" left-icon="none"></nav-bar>
    <scroll-view scroll-y="true" class="content" :style="{ height: windowHeight - customBar - 5 + 'px' }">
      <block v-if="isLogin">
        <view class="state-logined">
          <view class="avatar-section">
            <open-data type="userAvatarUrl" class="avatar"></open-data>
            <open-data type="userNickName" class="username"></open-data>
          </view>
          <view class="total-info">
            <view class="info-item">
              <view class="num">1</view>
              <view class="name">收藏的店铺</view>
            </view>
            <view class="info-item">
              <view class="num">1</view>
              <view class="name">收藏的商品</view>
            </view>
            <view class="info-item">
              <view class="num">1</view>
              <view class="name">关注的商品</view>
            </view>
            <view class="info-item">
              <view class="num">1</view>
              <view class="name">足迹</view>
            </view>
          </view>
          <u-card title="我的订单" class="order" :border="false" margin="0" padding="20">
            <view class="tabs" slot="body">
              <view class="tab">
                <u-image src="" width="65rpx" height="65rpx" class="icon"></u-image>
                <view>待付款</view>
              </view>
              <view class="tab">
                <u-image scr="/static/images/cent/icon1.png" width="65rpx" height="65rpx" mode="scaleToFill" class="icon"></u-image>
                <view>待收货</view>
              </view>
              <view class="tab">
                <u-image scr="/static/images/cent/icon1.png" width="65rpx" height="65rpx" class="icon"></u-image>
                <view>退款/退货</view>
              </view>
              <view class="tab">
                <u-image scr="/static/images/cent/icon1.png" width="65rpx" height="65rpx" class="icon"></u-image>
                <view>全部订单</view>
              </view>
            </view>
          </u-card>
          <view class="cell-list">
            <u-cell-group>
              <u-cell-item icon="edit-pen-fill" title="收货地址"></u-cell-item>
              <u-cell-item icon="server-man" title="联系客服"></u-cell-item>
              <u-cell-item icon="person-delete-fill" title="退出登录"></u-cell-item>
            </u-cell-group>
          </view>
        </view>
      </block>
      <view v-else class="state-no-login">
        <open-data type="userAvatarUrl" class="avatar"></open-data>
        <view class="login">一键登录</view>
        <view class="tip">登录享受更多权益</view>
        <view v-for="(item, index) in cartList" :key="index">
          <u-checkbox v-model="item.status">{{ item.status }}</u-checkbox>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
// import { mapGetters } from 'vuex';
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      windowHeight: this.$windowHeight,
      customBar: this.$customBar,
      list: [
        {
          state: true
        },
        { state: true }
      ],
      _cartList: []
    };
  },
  computed: {
    ...mapGetters('user', ['isLogin']),
    ...mapState('cart', ['cartList'])
  },
  methods: {},
  watch: {
    cartList: {
      deep: true,
      immediate: true,
      handler(nv, v) {
        this._cartList = [];
        this.cartList.forEach(item => {
          let obj = Object.assign({}, item);
          obj.status = true;
          obj.show = false;
          this._cartList.push(obj);
        });
      }
    }
  }
};
</script>

<style lang="scss">
.cent {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .content {
    flex: 1;
    .state-logined {
      flex: 1;
      display: flex;
      height: 100%;
      flex-direction: column;
      background-color: #f4f4f4;
      .avatar-section {
        height: 400rpx;
        background-color: $navbar-background-color;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .avatar {
          width: 194rpx;
          height: 194rpx;
          margin-bottom: 23rpx;
          border: 2px solid #fff;
          box-shadow: 0 0 20rpx 10rpx rgba(0, 0, 0, 0.3);
          border-radius: 100%;
          overflow: hidden;
        }
        .username {
          color: #fff;
        }
      }
      .total-info {
        margin: 0 20rpx;
        padding: 20rpx 0;
        margin-top: -14rpx;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #fff;
        border-radius: 8rpx;
        .info-item {
          text-align: center;
          .name {
            margin-top: 5rpx;
          }
        }
      }
      .order {
        margin: 0 20rpx !important;
        margin-top: 15rpx !important;
        background-color: #fff;
        .tabs {
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        .tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .icon {
            font-size: 1.5em;
            width: 65rpx;
            height: 65rpx;
          }
        }
      }
      .cell-list {
        margin: 0 20rpx;
        margin-top: 15rpx;
      }
    }
    .state-no-login {
      flex: 1;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .avatar {
        width: 168rpx;
        height: 168rpx;
        border-radius: 100%;
        overflow: hidden;
      }
      .login {
        width: 670rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        background-color: #d81e06;
        color: #fff;
        margin-top: 40rpx;
        border-radius: 50rpx;
      }
      .tip {
        color: #808080;
        margin-top: 30rpx;
      }
    }
  }
}
</style>
