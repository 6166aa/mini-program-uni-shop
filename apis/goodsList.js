import http from '@/utils/http.js';
const optionDefault = {
  loading: true,
  custom: {
    loading: true
  }
};


export async function getGoodsList(queryParam, options) {
  options = {...optionDefault,...options};
  options.custom.loading = options.loading;
  options.params = {
    query: queryParam.query,
    pagenum: queryParam.pageNum || 1,
    pagesize: queryParam.pageSize || 10
  };
  queryParam.cid && (options.params.cid = queryParam.cid);
  return http.get('goods/search', options);
}
