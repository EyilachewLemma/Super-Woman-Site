<template>
  <TheHeader />
  <router-view />
  <TheFooter />
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
  },
  methods: {}
};
</script>
<style scoped>
</style>