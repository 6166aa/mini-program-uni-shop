<template>
  <view class="nav-wrap">
    <view class="header" :style="{ background: background, 'padding-top': navBar.top + 'px', 'padding-bottom': navBar.paddingBottom + 'rpx', height: navBar.height + 'px', 'line-height': navBar.height + 'px' }">
      <view class="left" :style="{ color: color }" v-if="leftText" @click="back">
        <uni-icons type="arrowleft" size="14" v-if="leftArrow" :color="color"></uni-icons>
        <view class="title">{{ leftText }}</view>
      </view>
      <view class="flex1" :style="{ color: color }">
        <slot>{{ title }}</slot>
      </view>
    </view>
    <view class="nav-placeholder" :style="{'padding-top': navBar.top + 'px', height: navBar.height + 'px'}"></view>
    
  </view>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      navBar: {
        top: 0,
        height: 40,
        paddingBottom:0
      }
    };
  },
  props: {
    background: {
      type: String,
      default: '#fff'
    },
    color: {
      type: String,
      default: '#333'
    },
    title: {
      type: String,
      default: ''
    },
    leftArrow: {
      type: Boolean,
      default: false
    },
    leftText: {
      type: String,
      default: ''
    }
  },
  mounted() {
    console.log('mounted');
    //#ifdef APP-PLUS
    this.navBar.top = uni.getSystemInfoSync()['statusBarHeight'];
    this.navBar.height = 40;
    console.log('app');
    // #endif
    //#ifdef MP-WEIXIN
    console.log('mp');
    this.navBar = uni.getMenuButtonBoundingClientRect();
    this.navBar.paddingBottom = 16;
    // #endif
  },
  methods: {
    back: function() {
      uni.navigateBack({
        delta: 1
      });
    }
  }
};
</script>
<style lang="scss">
.header {
  padding-right: 190rpx;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  .left {
    padding-left: 20rpx;
    width: 190rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .title {
      margin-left: 20rpx;
    }
  }
}
.flex1 {
  text-align: center;
  flex: 1;
}
</style>
