<template>
  <div class="recentRoleModels pb-5">
    <div class="text-center text-white pt-5 pb-2">ALL PUBLISHED ROLE MODELS</div>
    <div class="row mx-2 mx-lg-3">
      <div class="col-sm-6 col-md-4 col-lg-3 mt-4" v-for="roleModel in roleModels.data" :key="roleModel.id">
      <div class="row">
        <div class="col-6 col-sm-12 roleModeImg">
       <router-link :to="{name:'RoleModelDetail',params:{rolemodelId:roleModel.id}}">
        <img :src="roleModel.image?.path" alt="role model image" class="img-fluid rounded w-100" /></router-link>
        </div>
        <div class="col-6 col-sm-12">
        <div class="d-flex justify-content-between mt-md-3 align-items-center">
          <div class="issue d-none d-md-block">ISSUE Date {{formatDate(roleModel.created_at)}}</div>
          <div class="d-flex">
            <p class="text-white me-3">{{roleModel.like}}
              <span class="review fs-5">
                <i class="fas fa-thumbs-up"></i>
              </span>
            </p>
            <p class="text-white">
              {{roleModel.comment}}
              <span class="review fs-5">
                <i class="fas fa-comment-dots"></i>
              </span>
            </p>
          </div>
        </div>
        <div class="mt-md-2 text-white detailContent">{{roleModel.intro}}</div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      perPage:12,
      pageCounter:1,
    }
  },
created() {  
  this.$store.dispatch('fetchRoleModels',{lang:this.$store.getters.lang,perPage:this.perPage})
},
 mounted() {
        window.addEventListener('scroll',()=>{
            let scrollTop = document.documentElement.scrollTop
            let scrollHeight = document.documentElement.scrollHeight
            let clientHeight = document.documentElement.clientHeight
            if(scrollTop+clientHeight >= scrollHeight){
                this.pageCounter++
                this.perPage = this.perPage*this.pageCounter
                this.$store.dispatch('fetchRoleModels',{lang:this.lang,perPage:this.perPage})
            }
        })
    },
     unmounted() {
        window.removeEventListener('scroll', this.handleScroll)
    },
computed:{
  roleModels(){
    return this.$store.getters.roleModels
  },
    lang(){
    return this.$store.getters.lang
  },

},
methods: {
    formatDate(createdAt){
     var date = new Date(createdAt)
     var year = date.getFullYear()
     var month = date.getMonth()
     var day = date.getDate()
     return month*1+1+'/'+day+'/'+year
    },
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