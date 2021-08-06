<script>
import Vue from 'vue';
export default {
  onLaunch: function() {
    uni.getSystemInfo({
      success: function(e) {
        // #ifndef MP
        Vue.prototype.$statusBar = e.statusBarHeight;
        if (e.platform == 'android') {
          Vue.prototype.$customBar = e.statusBarHeight + 50;
        } else {
          Vue.prototype.$customBar = e.statusBarHeight + 45;
        }
        // #endif
        Vue.prototype.$windowHeight = e.windowHeight;//可用屏幕高度(=设备屏幕高度 - 非自定义navbarH - 非自定义tabbarH)
        Vue.prototype.$screenHeight = e.screenHeight;//设备屏幕高度
        // #ifdef MP-WEIXIN
        Vue.prototype.$statusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        Vue.prototype.$menuButton = custom;
        Vue.prototype.$customBar = custom.bottom + custom.top - e.statusBarHeight;
        // #endif

        // #ifdef MP-ALIPAY
        Vue.prototype.$statusBar = e.statusBarHeight;
        Vue.prototype.$customBar = e.statusBarHeight + e.titleBarHeight;
        // #endif
      }
    });
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  }
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
</style>
