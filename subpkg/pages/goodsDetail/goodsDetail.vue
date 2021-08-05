<template>
  <view>goodsDetail</view>
</template>

<script>
export default {
  onLoad(options) {
    if (options) {
      this.query = options;
    }
  },
  data() {
    return {
      query: {}
    };
  }
};
</script>

<style lang="scss"></style>
