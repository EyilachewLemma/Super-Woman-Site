<template>
  <router-view />
</template>
<script>
import apiClient from './url/index';
import fileApiClient from './url/fileApi'
export default {
   created() {
    var token = localStorage.getItem("tokenu")
         this.$store.commit('setLang',localStorage.getItem('language') || 'en')         
    console.log('loged in user = ',JSON.parse(localStorage.getItem('supUser')))
      this.$store.commit("setUser", JSON.parse(localStorage.getItem('supUser')) || null);
     apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`; 
      fileApiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`; 
      this.$store.commit("setIsAuthenticated", localStorage.getItem('isLegalUser') || false); 
   
   
  },
  // unmounted() {
  //   if(!localStorage.getItem("remember")){
  //       this.logout()
  //   }
  // },
  methods: {
    async logout(){
        try{
      var response = await apiClient.post('api/logout')
      console.log('response status',response.status)
      if(response.status === 200){
            this.$store.commit('setUser', null)
      this.$store.commit('setIsAuthenticated', false)
       localStorage.removeItem("tokenu");
            localStorage.removeItem("supUser");
            localStorage.removeItem("isLegalUser");
      }
    }
    catch(err){
      console.log("errors from logout path = ")
    }
    }
  },
}
</script>
<style>
#app {
  font-family: 'Mulish', sans-serif;
  /* font-family: 'Poppins', sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  box-sizing: border-box;
}
</style>
