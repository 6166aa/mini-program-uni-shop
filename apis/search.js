import http from '@/utils/http.js';
const optionDefault = {
  loading: true,
  custom: {
    loading: true
  }
};
export async function getSuggestion(val,options = optionDefault) {
  options.custom.loading = options.loading;
  options.params = {query:val};
  return http.get('goods/qsearch', options);
}
