<template>
  <view class="cate" :style="{ height: windowHeight + 'px' }">
    <nav-bar statusBar background="#d81e06" color="#fff" left-text="分类" left-icon="none">
      <view class="search">
        <uni-icons type="search"></uni-icons>
        <view class="placeholder">输入搜索内容</view>
      </view>
    </nav-bar>
    <view class="cate-section">
      <scroll-view class="main-cate" :style="{ height: windowHeight - customBar + 'px' }" scroll-y>
        <view class="main-cate-item" @tap="mainCateClick(index)" :class="{ active: index === currentCateIndex }" v-for="(item, index) in cateData" :key="item.cat_id">
          {{ item.cat_name }}
        </view>
      </scroll-view>
      <scroll-view class="sub-cate" :scroll-top="subCateScrollTop" :style="{ height: windowHeight - customBar + 'px' }" scroll-y>
        <view class="section" v-for="(item, index) in cateData[currentCateIndex].children" :key="index">
          <view class="title">/{{ item.cat_name }}/</view>
          <view class="list">
            <view class="sub-cate-item" v-for="subItem in item.children" @tap="subCateClick(subItem.cat_id)">
              <image :src="subItem.cat_icon" mode=""></image>
              <view class="name">{{ subItem.cat_name }}</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { getCategories } from '@/apis/cate.js';
export default {
  async onLoad() {
    const { windowHeight } = uni.getSystemInfoSync();
    this.windowHeight = windowHeight;
    await this.getCategories();
  },
  data() {
    return {
      windowHeight: '',
      currentCateIndex: 0,
      customBar: this.$customBar,
      subCateScrollTop: 0,
      cateData: [
        {
          children: []
        }
      ]
    };
  },
  methods: {
    async getCategories() {
      this.cateData = await getCategories();
    },
    mainCateClick(index) {
      this.currentCateIndex = index;
      this.subCateScrollTop = Math.random();
    },
    subCateClick(cateId) {
      uni.navigateTo({
        url: '/subpkg/pages/goodsList/goodsList?cateId=' + cateId
      });
    }
  }
};
</script>

<style lang="scss">
.cate {
  display: flex;
  flex-direction: column;
  .title-slot {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
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
  .cate-section {
    flex: 1;
    display: flex;
    .main-cate {
      height: 100%;
      width: 180rpx;
      &-item {
        position: relative;
        height: 120rpx;
        box-sizing: border-box;
        line-height: 120rpx;
        text-align: center;
        background-color: #f7f7f7;
        &.active {
          background-color: #fff;
          &::before {
            content: '';
            display: block;
            position: absolute;
            width: 8rpx;
            background-color: #d81e06;
            left: 1rpx;
            top: 20%;
            bottom: 20%;
          }
        }
      }
    }
    .sub-cate {
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      .title {
        text-align: center;
        height: 100rpx;
        line-height: 100rpx;
        font-weight: bold;
      }
      .list {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
      }
      &-item {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        image {
          width: 120rpx;
          height: 120rpx;
        }
        .name {
          line-height: 2;
          margin-bottom: 0.5em;
        }
      }
    }
  }
}
</style>
