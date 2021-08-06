<template>
  <view>
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :down="downOption" :up="upOption">
      <!-- 自定义导航条 -->
      <nav-bar left-text="黑马精选" left-icon="none" background="#d81e06" color="#fff">
        <view class="search">
          <uni-icons type="search"></uni-icons>
          <view class="placeholder">输入搜索内容</view>
        </view>
      </nav-bar>
      <!-- swiper -->
      <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :circular="true" :duration="1000">
        <swiper-item class="swiper-item" v-for="item in swiperData" :key="item.goods_id">
          <navigator :url="`/subpkg/pages/goodsDetail/goodsDetail?id=${item.goods_id}`" open-type="navigate"><image :src="item.image_src" mode="scaleToFill"></image></navigator>
        </swiper-item>
      </swiper>
      <!-- 功能区 -->
      <view class="actions">
        <view class="action" v-for="(item, index) in actionData" @click="actionClick(item)" :key="index"><image class="icon" :src="item.image_src" mode="widthFix"></image></view>
      </view>
      <!-- 其他分类入口 -->
      <view class="sections">
        <view class="section" v-for="(item, index) in floorData" :key="index" @click="sectionClick">
          <image :src="item.floor_title.image_src" mode="heightFix" class="title"></image>
          <view class="content">
            <view class="left">
              <image
                :data-query="item.product_list[0].navigator_url.split('?')[1]"
                :src="item.product_list[0].image_src"
                :style="{ width: `${item.product_list[0].image_width}rpx` }"
                mode="widthFix"
              ></image>
            </view>
            <view class="right">
              <view class="nv" v-for="(product, index2) in item.product_list.slice(1)" :key="index2">
                <image :data-query="product.navigator_url.split('?')[1]" :src="product.image_src" :style="{ width: `${product.image_width}rpx` }" mode="widthFix"></image>
              </view>
            </view>
          </view>
        </view>
      </view>
    </mescroll-body>
  </view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import { getSwiperData, getActionData, getFloorData } from '@/apis/home.js';
export default {
  mixins: [MescrollMixin],
  async onLoad() {
    await this.getSwiperData();
    await this.getActionData();
    await this.getFloorData();
  },
  data() {
    return {
      swiperData: [],
      actionData: [],
      floorData: {},
      upOption: {
        use: false
      },
      downOption: {
        bgColor: '#d81e06',
        color: '#fff'
      }
    };
  },
  methods: {
    async getSwiperData() {
      this.swiperData = await getSwiperData();
    },
    async getActionData() {
      this.actionData = await getActionData();
    },
    async getFloorData() {
      this.floorData = await getFloorData();
    },
    async downCallback() {
      console.log('test');
      await this.getSwiperData();
      await this.getActionData();
      await this.getFloorData();
      this.mescroll.endSuccess();
    },
    actionClick(item) {
      if (item.name === '分类') {
        uni.switchTab({
          url: '/pages/cate/cate'
        });
      }
    },
    sectionClick(e) {
      console.log(e.target);
      uni.navigateTo({
        url: '/subpkg/pages/goodsList/goodsList?' + e.target.dataset.query
      });
    }
  }
};
</script>

<style lang="scss">
.slot-wrap {
  flex: 1;
  display: flex;
  padding-left: 30rpx;
  .title {
    display: flex;
    align-items: center;
    color: #fff;
    margin-right: 10rpx;
  }
}

.search {
  display: flex;
  width: 100%;
  align-items: center;
  background-color: #fefefe;
  height: 1.8em;
  padding: 0 0.7em;
  border-radius: 35rpx;
  color: #000;
  margin-left: -80rpx;
  .placeholder {
    margin-left: 0.2em;
  }
}
.swiper {
  width: 100%;
  height: 330rpx;
  &-item {
    navigator {
      width: 100%;
      height: 100%;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.actions {
  display: flex;
  width: 100%;
  margin: 0.5em 0;
  .action {
    flex: 1;
    .nav {
      width: 100%;
      height: 100%;
    }
    .icon {
      width: 100%;
      height: 100%;
    }
  }
}
.section {
  .title {
    height: 65rpx;
    margin-top: 15rpx;
  }
  .content {
    display: flex;
    justify-content: space-around;
    .left {
      margin-left: 13rpx;
    }
    .right {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
}
</style>
