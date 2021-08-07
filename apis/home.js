import http from '@/utils/http.js';
const optionDefault = {
  loading: true,
  custom: {
    loading: true
  }
};
export async function getSwiperData(options) {
  options = {
    ...optionDefault,
    ...options
  };
  options.custom.loading = options.loading;
  return http.get('home/swiperdata', options);
}
export async function getActionData(options) {
  options = {
    ...optionDefault,
    ...options
  };
  options.custom.loading = options.loading;
  return http.get('home/catitems', options);
}
export async function getFloorData(options) {
  options = {
    ...optionDefault,
    ...options
  };
  options.custom.loading = options.loading;
  return http.get('home/floordata', options);
}
