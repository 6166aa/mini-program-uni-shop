<template>
  <view class="detail" :style="{ height: screenHeight + 'px' }">
    <nav-bar leftText="商品详情" :disableLeftAction="false"></nav-bar>
    <scroll-view scroll-y="true" class="content-scroll" :style="scrollStyle">
      <view class="content">
        <u-swiper :list="info.pics" name="pics_mid_url" height="750" autoplay @click="showBigImage"></u-swiper>
        <view class="base-info">
          <view class="price">{{ info.goods_price | toPrice }}</view>
          <view class="title-row">
            <view class="title">{{ info.goods_name }}</view>
            <view class="collect tab">
              <u-icon name="star" class="icon"></u-icon>
              <view>收藏</view>
            </view>
          </view>
          <view class="delivery">快递：免运费</view>
        </view>
        <view class="detail"><u-parse :html="info.goods_introduce"></u-parse></view>
      </view>
    </scroll-view>
    <view class="footer-bar">
      <view class="tab">
        <u-icon name="bag" class="icon"></u-icon>
        <view>店铺</view>
      </view>
      <navigator url="/pages/cart/cart" open-type="switchTab">
        <view class="tab">
          <u-badge type="error" :count="total" size="mini" :offset="[-10, 5]"></u-badge>
          <u-icon name="shopping-cart" class="icon"></u-icon>
          <view>购物车</view>
        </view>
      </navigator>
      <view class="btn-group">
        <view class="btn add-cart" @click="addCart">加入购物车</view>
        <view class="btn buy">购买</view>
      </view>
    </view>
  </view>
</template>

<script>
import { getGoodsDetail } from '@/apis/goodsDetail.js';
import { mapGetters, mapMutations } from 'vuex';
export default {
  async onLoad(options) {
    if (options) {
      await this.getGoodsDetail(options.goodsId);
      this.info.goods_introduce = this.info.goods_introduce.replace(/(<img)/g, '$1 style="display:block"');
    }
  },
  data() {
    return {
      screenHeight: this.$screenHeight,
      customBar: this.$customBar,
      query: {},
      info: {}
    };
  },
  computed: {
    ...mapGetters('cart',['total']),
    scrollStyle() {
      return `height:calc( ${this.screenHeight - this.customBar + 'px'} - 100rpx );`;
    }
  },
  methods: {
    ...mapMutations('cart',['addCartList']),
    async getGoodsDetail(id) {
      this.info = await getGoodsDetail(id);
    },
    showBigImage(index) {
      uni.previewImage({
        urls: this.info.pics.map(_ => _.pics_big_url),
        current: index
      });
    },
    addCart(){
      this.addCartList({
        goods_id:this.info.goods_id,
        goods_name:this.info.goods_name,
        num:1,
        goods_price:this.info.goods_price,
        goods_small_logo:this.info.goods_small_logo
      });
    }
  }
};
</script>

<style lang="scss">
.detail {
  display: flex;
  flex-direction: column;
  .tab {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon {
      font-size: 1.5em;
    }
  }
  .content-scroll {
    flex: 1;
    .content {
      display: flex;
      flex-direction: column;
      .base-info {
        padding: 25rpx;
      }
      .price {
        color: #c00000;
        font-size: 1.8em;
      }
      .delivery {
        color: #878787;
        padding: 20rpx 0;
      }
      .title-row {
        display: flex;
        .title {
          flex: 1;
          padding: 20rpx 0;
          font-weight: bold;
        }
        .collect {
          border-left: 1px solid #eee;
          width: 125rpx;
          margin-left: 17rpx;
        }
      }
      .detail {
        padding-top: 20rpx;
        flex: 1;
      }
    }
  }
  .footer-bar {
    display: flex;
    justify-content: space-evenly;
    padding: 10rpx 0;

    .btn-group {
      display: flex;
      width: 510rpx;
      height: 80rpx;
      .add-cart {
        background-color: #ff0000;
        color: #fff;
        height: 100%;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top-left-radius: 50rpx;
        border-bottom-left-radius: 50rpx;
      }
      .buy {
        background-color: #ffa200;
        color: #fff;
        height: 100%;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top-right-radius: 50rpx;
        border-bottom-right-radius: 50rpx;
      }
    }
  }
}
</style>
