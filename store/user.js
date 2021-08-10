export default{
  namespaced:true,
  state:{
    addressInfo:uni.getStorageSync('addressInfo')||''
  },
  getters:{
    isLogin:(state)=>false,
    address:({addressInfo})=>addressInfo.provinceName?addressInfo.provinceName + addressInfo.cityName + addressInfo.countyName + addressInfo.detailInfo:''
  },
  mutations:{
    updateAddressInfo(state,payload){
      state.addressInfo = payload;
      uni.setStorageSync('addressInfo',payload);
    }
  }
}