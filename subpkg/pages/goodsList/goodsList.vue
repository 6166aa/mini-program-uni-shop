<template>
  <view>
    <nav-bar leftText="商品列表" :disableLeftAction="false"></nav-bar>
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" @down="downCallback" :down="downOption">
      <view class="goods-list">
        <view class="goods-item" v-for="item in goodsList" :key="item.goods_id" @tap="goodsItemClick(item.goods_id)">
          <image class="cover" :src="item.goods_small_logo" mode="aspectFill"></image>
          <view class="info">
            <view class="title">{{ item.goods_name }}</view>
            <view class="price">{{ item.goods_price | toPrice }}</view>
          </view>
        </view>
      </view>
    </mescroll-body>
  </view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import { getGoodsList } from '@/apis/goodsList.js';
export default {
  mixins: [MescrollMixin],
  async onLoad(options) {
    if (options) {
      this.cid = options.cateId;
      this.query = options.query;
      // await this.getGoodsList();
    }
  },
  data() {
    return {
      goodsList: [],
      query: '',
      cid: '',
      downOption: {
        bgColor: '#d81e06',
        color: '#fff'
      }
    };
  },
  methods: {
    goodsItemClick(goodsId) {
      uni.navigateTo({
        url: '/subpkg/pages/goodsDetail/goodsDetail?goodsId=' + goodsId
      });
    },
    async upCallback(page) {
      let { goods, pagenum, total } = await getGoodsList(
        {
          query: this.query,
          cid: this.cid,
          pageNum: page.num,
          pageSize: page.size
        },
        { loading: false }
      );
      if (page.num === 1) {
        this.goodsList = [];
      }
      this.goodsList.push(...goods);
      this.mescroll.endBySize(goods.length, total);
    }
  }
};
</script>

<style lang="scss">
.goods-list {
  .goods-item {
    display: flex;
    padding: 20rpx;
    border-bottom: 1px solid #eee;
    .cover {
      width: 199rpx;
      height: 201rpx;
      margin-right: 10rpx;
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: #c00000;
      }
    }
  }
}
</style>
