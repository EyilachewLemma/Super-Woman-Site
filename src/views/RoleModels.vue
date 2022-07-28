<template>
  <div class="recentRoleModels pb-5">
    <div class="text-center text-white pt-5 pb-2">ALL PUBLISHED ROLE MODELS</div>
    <div class="row mx-2 mx-lg-3">
      <div class="col-sm-6 col-md-4 col-lg-3 mt-3" v-for="n in 12" :key="n">
      <div class="row">
        <div class="col-6 col-sm-12 roleModeImg">
       <router-link :to="{name:'RoleModelDetail',params:{rolemodelId:1}}"> <img src="../assets/rolemodel4.jpg" alt="role model image" class="img-fluid rounded w-100" /></router-link>
        </div>
        <div class="col-6 col-sm-12">
        <div class="d-flex justify-content-between mt-md-3 align-items-center">
          <div class="issue d-none d-md-block">ISSUE 2022</div>
          <div class="d-flex">
            <p @click="likeRoleModel()" class="text-white me-3">
              1.2k
              <span class="review fs-5">
                <i class="fas fa-thumbs-up"></i>
              </span>
            </p>
            <p class="text-white">
              345
              <span class="review fs-5">
                <i class="fas fa-comment-dots"></i>
              </span>
            </p>
          </div>
        </div>
        <div class="mt-md-2 text-white detailContent">Lorem ipsum dolor sitsimilique possimus asperiores dolorem labore rem ipsum at ad veniam natus distinctio culpa quas.
        </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
created() {  
  this.$store.dispatch('fetchRoleModels')
},
computed:{
  roleModels(){
    return this.$store.getters.roleModels
  },
  user(){
    return this.$store.getters.user
  }
},
methods: {
    likeRoleModel() {}
  }
};
</script>
<style scoped>
.recentRoleModels {
  background-color: #0f0e1c;
}
.roleModeImg{
  overflow: hidden;
}
.roleModeImg img{
  width: 100%;
  transition: all 1s;
}
.roleModeImg img:hover{
  transform: scale(1.5);
}
.issue {
  color: #f69f83;
}
.detailContent{
  text-align: left;
}
</style>