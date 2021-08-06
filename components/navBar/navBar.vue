<template>
  <view>
    <view class="navbar" :style="[{ height: customBar + 'px' }]">
      <view class="navbar--fixed" :style="style">
        <view class="navbar__left" v-if="leftText || leftIcon !== 'none'" @tap="backPage">
          <u-icon class="navbar__left-icon" v-if="leftIcon !== 'none'" :name="leftIcon"></u-icon>
          <text class="navbar__left-text">{{ leftText }}</text>
        </view>
        <view class="navbar__title" :style="[{ top: statusBar + 'px' }]">
          <slot name="default">{{ title }}</slot>
        </view>
        <view class="navbar__right"><slot name="right"></slot></view>
      </view>
    </view>
  </view>
</template>

<script>
import navBarConfig from '@/configs/navbar.js';
export default {
  data() {
    return {
      statusBar: this.$statusBar,
      customBar: this.$customBar
    };
  },
  name: 'navbar',
  computed: {
    style() {
      var statusBar = this.statusBar;
      var customBar = this.customBar;
      var style = `height:${customBar}px;padding-top:${statusBar}px;background-color:${this.background};color:${this.color}`;
      return style;
    }
  },
  props: {
    background: {
      type: String,
      default: navBarConfig ? navBarConfig.backgroundColor : '#fff'
    },
    color: {
      type: String,
      default: navBarConfig ? navBarConfig.color : '#000'
    },
    leftText: {
      type: String,
      default: ''
    },
    disableLeftAction: {
      type: Boolean,
      default: true
    },
    leftIcon: {
      type: String,
      default: 'arrow-left'
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    backPage() {
      this.$emit('leftAction');
      if (this.disableLeftAction) {
        return;
      }
      uni.navigateBack({
        delta: 1
      });
    }
  }
};
</script>

<style lang="scss">
.navbar {
  position: relative;
  display: flex;
  &--fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99999;
  }
  &__left {
    float: left;
    display: flex;
    height: 100%;
    padding-left: 20rpx;
    align-items: center;
    justify-content: center;
    font-size: 30rpx;

    &-icon {
      font-size: 36rpx;
      margin-right: 12rpx;
    }
  }
  &__title {
    position: absolute;
    width: calc(100% - 440rpx);
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 64rpx;
    margin: auto;
  }
  &__right {
    float: right;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding-right: 20rpx;
    /* #ifdef MP-WEIXIN */
    padding-right: 220rpx;
    /* #endif */
    /* #ifdef MP-ALIPAY */
    padding-right: 150rpx;
    /* #endif */
  }
}
</style>
