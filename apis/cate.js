import http from '@/utils/http.js';
const optionDefault = {
  loading: true,
  custom: {
    loading: true
  }
};
export async function getCategories(options) {
  options = {
    ...optionDefault,
    ...options
  };
  options.custom.loading = options.loading;
  return http.get('categories', options);
}
