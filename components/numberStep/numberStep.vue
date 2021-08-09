<template>
  <view class="number-step">
    <view
      class="number-step__minus number-step__btn"
      @tap="$emit('minus', { value: inputValue - 1, index: index })"
      :style="{ width: inputHeight }"
      :class="{ 'number-step__btn--disabled': inputValue <= min }"
    >
      <u-icon name="minus"></u-icon>
    </view>
    <input class="number-step__value" type="number" v-model="inputValue" @blur="handleBlur" :style="{ width: inputWidth, height: inputHeight }" />
    <view
      class="number-step__plus number-step__btn"
      @tap="$emit('plus', { value: inputValue + 1, index: index })"
      :style="{ width: inputHeight }"
      :class="{ 'number-step__btn--disabled': inputValue >= max }"
    >
      <u-icon name="plus"></u-icon>
    </view>
  </view>
</template>

<script>
export default {
  name: 'numberStep',
  props: {
    value: {
      type: Number,
      default: 1
    },
    inputWidth: {
      type: String,
      default: '100rpx'
    },
    inputHeight: {
      type: String,
      default: '60rpx'
    },
    index: {
      type: [Number, String]
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 999
    }
  },
  computed: {
    // inputValue: {
    //   get() {
    //     return this.value;
    //   },
    //   set(v) {
    //     if (v.toString().trim().length === 0) {
    //       return;
    //     }
    //     if (/[^\d]/g.test(v)) {
    //       v = v && +v.toString().replace(/[^\d]/g, '');
    //     }
    //     this.$emit('change', { value: +v, index: this.index });
    //   }
    // }
  },
  data() {
    return {
      timer: '',
      inputValue: 1
    };
  },
  methods: {
    handleBlur({ target: { value } }) {
      value = +value.replace(/[^\d]/g, '') || 1;
      this.inputValue = value;
    }
    // handleInput({ target: { value } }) {
    //   console.log('替换前的value:',value);
    //   value = +value.toString().replace(/[^\d]/g, '') || 1;
    //   console.log('替换后的value:',value);
    //   this.$nextTick(() => {
    //     this.inputValue = +value;
    //   });
    // }
  },
  watch: {
    inputValue(nv, v) {
      if(nv.toString().trim().length===0){
        return;
      }
      if (nv !== v && !/[^\d]/g.test(nv)) {
        if(nv<this.min){
          nv = this.min;
          this.$emit('error',{type:'lessMin',message:`小于最小值${this.min}`})
        }
        if(nv>this.max){
          nv = this.max;
          this.$emit('error',{type:'moreMax',message:`大于最大值${this.max}`})
        }
        this.$emit('change', { value: +nv, index: this.index });
      }
    },
    value(n) {
      if(n!==this.inputValue){
        this.inputValue = n;
      }
    }
  }
};
</script>

<style lang="scss">
.number-step {
  display: flex;
  &__btn {
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    &--disabled {
      color: #d2d3d6;
    }
  }
  &__minus {
    margin-right: 4rpx;
  }
  &__value {
    flex: 1;
    text-align: center;
    background-color: #eee;
  }
  &__plus {
    margin-left: 4rpx;
  }
}
</style>
