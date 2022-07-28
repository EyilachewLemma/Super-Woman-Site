<template>
  <div>
    <TheHeader />
  <router-view />
  <TheFooter />
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
    this.$store.dispatch("fetchFields");
     this.$store.dispatch('fetchLanguages') 
     this.$store.dispatch("fetchEducationLebles");
    this.$store.dispatch("fetchRoleModels");
    this.$store.dispatch("fetchBlogs");
    this.$store.dispatch("fetchMyInterests");
    
  },
  
  methods: {}
};
</script>
<style scoped>
div{
  background-color: #0f0e1c;
}
</style>