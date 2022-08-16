<template>
    <div class="bottomNav d-flex p-3 justify-content-between">
        <router-link :to="{name:'HomePage'}" class="fs-4 text-decoration-none"><i class="fas fa-home"></i></router-link>
        <router-link :to="{name:'RoleModels'}" class="fs-4 text-decoration-none"><i class="fas fa-border-all"></i></router-link>
         <router-link :to="{name:'Blogs'}" class="fs-4 text-decoration-none"><i class="fas fa-newspaper"></i></router-link>
         <div v-if="user?.mentor_id">
    <button @click="gotoChatRoom()" class="notificationIcon text-white position-relative">
      <span class="fs-5">  <i class="fas fa-comment-alt"></i></span>
      <p v-if="user?.message_no" class="position-absolute top-0 text-primary px-1">{{user?.message_no}}</p>
    </button>
    </div>
     <router-link :to="{name:'Account'}" class="fs-4 text-decoration-none"><i class="fas fa-user"></i></router-link>
    </div>
</template>
<script>
import apiClient from '@/url/index.js'
export default {
    methods: {
        async gotoChatRoom(){
      await apiClient.get('user/set_messages_seen')
      this.$router.push({name:'Chat'})
      var user = this.user
      user.message_no = 0
      this.$store.commit('setUser',user)
     
    },
    },
    computed:{
       user(){
       return this.$store.getters.user
       } 
    },
}
</script>
<style scoped>
.bottomNav{
background-color: #0d0d0d;
}
.active{
    color: #e7453a;
}
a{color: #fff;}
.notificationIcon{
  background: none;
  border: none;
}
</style>