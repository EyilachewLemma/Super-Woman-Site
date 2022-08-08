<template>
  <div class="wraperContainer">
    <TheHeader />
  <router-view />
  <TheFooter />
  </div>
  <div v-if="isLoading" class="loading loading-screen route-loading p-0 position-fixed top-0 start-0 bottom-0 end-0 w-100 h-100 bg-white">
          <div class="loading-spinner d-flex justify-content-center mt-5 position-relative">
            <img src="../assets/logo.png" alt="slow connection" class="img-fluid spiner" />
            <img src="../assets/spiner.gif" alt="slow connection" class="spinerIcon position-absolute top-50 start-50">
          </div>
        </div>
</template>
<script>
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";
export default {
  components: {
    TheHeader,
    TheFooter
  },
  created() {
    let selectedLang = localStorage.getItem('language')
    this.$store.dispatch("fetchFields");
     this.$store.dispatch('fetchLanguages') 
     this.$store.dispatch("fetchEducationLebles");
    this.$store.dispatch("fetchRoleModels",{lang:selectedLang ||'en',perPage:12});
    this.$store.dispatch("fetchBlogs",{lang:selectedLang ||'en',perPage:12});
    
    
  },
  computed:{
    isLoading(){
      return this.$store.getters.isLoading
    },
    lang(){
      return this.$store.getters.lang
    }
  },
  watch:{
    lang(value){
    this.$store.dispatch("fetchBlogs",{lang:value ||'en',perPage:12});
    this.$store.dispatch("fetchRoleModels",{lang:value ||'en',perPage:12});
    }
  },
  methods: {}
};
</script>
<style scoped>
.wraperContainer{
  background-color: #0f0e1c;
}
.loading{
    min-width: 100%;
    min-height: 100vh;
     position: absolute;
     top: 0%;
     right: 0;
     bottom: 0;
     left: 0;
     background-color: #fff;
     z-index: 1;
}
.spiner{
  width: 25%;
  margin: auto;
}
</style>