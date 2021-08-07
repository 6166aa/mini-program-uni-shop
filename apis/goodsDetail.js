import http from '@/utils/http.js';
const optionDefault = {
  loading: true,
  custom: {
    loading: true
  }
};


export async function getGoodsDetail(id, options) {
  options = {
    ...optionDefault,
    ...options
  };
  options.custom.loading = options.loading;
  options.params = {
    goods_id: id
  };
  return http.get('goods/detail', options);
}
