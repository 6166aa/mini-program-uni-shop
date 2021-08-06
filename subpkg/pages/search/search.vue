<template>
  <view class="container" :style="{ height: screenHeight + 'px' }">
    <nav-bar left-text="搜索" :disableLeftAction="false"></nav-bar>
    <view class="search">
      <u-search
        placeholder="搜点什么吧"
        v-model="keyword"
        :focus="true"
        @change="getSuggestion"
        @search="searchClick"
        @custom="searchClick"
        :action-style="{ color: '#fff' }"
      ></u-search>
    </view>
    <view class="search-suggest" v-if="suggestionList.length > 0">
      <u-cell-group>
        <u-cell-item
          @click="suggestItemClick(item.goods_id)"
          :title="item.goods_name"
          v-for="(item, index) in suggestionList"
          :key="index"
          :title-style="{ 'white-space': 'nowrap', 'text-overflow': 'ellipsis', overflow: 'hidden' }"
        ></u-cell-item>
      </u-cell-group>
    </view>
    <view class="history" v-else>
      <view class="top-action">
        <view class="title">搜索历史</view>
        <u-icon class="delet" name="trash" @tap="clearLog"></u-icon>
      </view>
      <view class="log-list">
        <u-tag
          class="log-item"
          v-for="(item, index) in histories"
          @click="historyItemClick(item)"
          :key="index"
          mode="dark"
          type="info"
          :text="item"
          color="#646764"
          bg-color="#f4f7f3"
        ></u-tag>
      </view>
    </view>
  </view>
</template>

<script>
import { navbarBackgroundColor } from '@/uni.scss';
import { getSuggestion } from '@/apis/search.js';
export default {
  onLoad() {
    this.searchLogList = uni.getStorageSync('searchLogList')||[];
  },
  data() {
    return {
      keyword: '',
      navbarBackgroundColor: navbarBackgroundColor,
      searchLogList: [],
      suggestionList: [],
      timer: '',
      screenHeight: this.$screenHeight
    };
  },
  computed:{
    histories(){
      return [...this.searchLogList].reverse();
    }
  },
  methods: {
    searchClick() {
      this.searchLogList.push(this.keyword);
      this.searchLogList= [...new Set(this.searchLogList)];
      uni.setStorage({
        key: 'searchLogList',
        data: this.searchLogList
      });
      uni.navigateTo({
        url:'/subpkg/pages/goodsList/goodsList?query='+this.keyword
      });
    },
    getSuggestion(val) {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        this.suggestionList = await getSuggestion(val);
        this.suggestionList = Array.isArray(this.suggestionList) ? this.suggestionList : [];
        console.log(this.suggestionList);
      }, 500);
    },
    suggestItemClick(goodsId) {
      this.searchClick();
      uni.navigateTo({
        url: '/subpkg/pages/goodsDetail/goodsDetail?goodsid=' + goodsId
      });
    },
    historyItemClick(kw) {
      this.keyword = kw;
      this.searchClick();
    },
    clearLog() {
      this.searchLogList = [];
      uni.setStorage({
        key: 'searchLogList',
        data: this.searchLogList
      });
    }
  }
};
</script>

<style lang="scss">
.container {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.search {
  background-color: $navbar-background-color;
  padding: 10rpx 20rpx;
}
.search-suggest {
  flex: 1;
  overflow-y: auto;
}
.history {
  padding: 0 20rpx;
  .top-action {
    display: flex;
    justify-content: space-between;
    line-height: 3;
    border-bottom: 2rpx solid #eee;
  }
  .log-list {
    display: flex;
    flex-wrap: wrap;
    margin-left: -0.8em;
    align-content: flex-start;
    .log-item {
      margin-top: 0.7em;
      font-size: 1.1em;
      margin-left: 0.8em;
    }
  }
}
</style>
