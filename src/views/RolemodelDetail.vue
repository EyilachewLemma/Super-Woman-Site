<template>
<div class="wraper px-3 pt-3 px-lg-5 pt-lg-5">
    <div id="rolemodelImage" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img :src="images[0]?.path" class="carouselImg" alt="role model image">
    </div>
    <div class="carousel-item" v-for="image in images.slice(1)" :key="image.id">
      <img :src="image?.path" class="carouselImg" alt="role model image">
    </div>
  </div>
  <button class="carousel-control-prev text-white" type="button" data-bs-target="#rolemodelImage" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next text-white" type="button" data-bs-target="#rolemodelImage" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
<!-- end of carousel section -->
<div class="mt-4 py-2">
   <div class="fs-5 fw-bold text-white">{{roleModelDetails.title}}</div>
   </div>
   <div class="d-flex align-items-center">
    <div class="text-white fw-bold">
    <span>Issue Date:</span>
    <span>{{formatDate(roleModelDetails.created_at)}}</span>
   </div>
    <p class="text-white me-2 ms-auto">{{roleModelDetails.like}}</p>
     <p v-if="roleModelDetails.is_liked === 1" class="fs-4 text-primary"><i class="fas fa-thumbs-up"></i></p>    
    <button v-else @click="likeRoleModel()" class="likeBtn fs-4 text-white"><i class="fas fa-thumbs-up"></i></button>
    <a href="#giveComment" class="ms-4 fs-5 text-white">{{roleModelDetails?.comment}}<i class="fas fa-comment-dots ms-2"></i></a>
   </div>
<div class="d-flex py-3">
    <!-- <button @click="listenAudio()" class="btn listenAudio text-white py-0 me-5"><span class="me-1"><i class="fas fa-play"></i></span> Listen Audio</button>
    <button class="rounded-circle px-1 downloadBtn fw-bold"><i class="fas fa-download"></i></button> -->
    <audio controls v-if="roleModelDetails.audio_path">
  <source :src="roleModelDetails.audio_path" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
</div>
<p class="content text-white mt-3">{{roleModelDetails.intro}}</p>
<div class="content text-white fs-5 mt-3" v-html="roleModelDetails.content"></div>
<div class="mt-3 d-flex">
   <span class="text-white me-2">{{roleModelDetails.like}}</span>
   <span v-if="roleModelDetails.is_liked === 1" class="fs-4 text-primary"><i class="fas fa-thumbs-up"></i></span>
    <button v-else @click="likeRoleModel()" class="likeBtn fs-4 text-white"><i class="fas fa-thumbs-up"></i></button>
   <a href="#giveComment" class="ms-4 fs-5 text-white">{{roleModelDetails?.comment}}<i class="fas fa-comment-dots ms-2"></i></a>
  <div class="d-flex ms-auto">
     <button class="text-white fs-4 me-3 socialLink"><i class="fab fa-facebook-square"></i></button>
  <button class="text-white fs-4 me-3 socialLink"><i class="fab fa-instagram-square"></i></button>
  <button class="text-white fs-4 me-3 socialLink"><i class="fab fa-twitter-square"></i></button>
  <button class="text-white fs-4 me-3 socialLink"><i class="fab fa-linkedin"></i></button>
  <button class="text-white fs-4 socialLink"></button>
   <div class="position-relative">
              <button @click="shareControl()" class="likeBtn text-white fs-4"><i class="fa-solid fa-share-nodes"></i></button>
              <div v-if="isShare" class="socialMedia d-flex flex-column border rounded p-2">
                  <button @click="shareOnFaceBook()" class="likeBtn bg-white mt-2">Share on Facebook</button>    
                  <button @click="shareOnTwitter()" class="likeBtn bg-white mt-2">Share on Twitter</button> 
              </div>
            </div>
  </div>
</div>
</div>
<div class="borderBottom"></div>
<div class="comentSection ms-3 ms-lg-5 py-3 py-lg-5">
  <div class="row pt-3"> 
    <div class="col-md-7 me-lg-5">
      <!-- write comment -->
     <div v-if="!user" class="border rounded p-3 mt-3 d-flex justify-content-between">
        <p class="text-white fw-bold">Comments({{comments?.length}})</p>
        <button @click="displayCommentInput()" class="addCommentBtn border rounded p-2 text-white">
          <span class="fs-5"><i class="fas fa-plus"></i></span>
          <span class="ms-2">Write Comment</span>
        </button>
      </div>    
       <p v-if="user" class="text-white fw-bold">Comments({{comments?.length}})</p>
      <div v-if="user" class="d-flex mt-3 mt-3">
        <p class="align-self-center text-white fs-3 me-2"><i class="fas fa-user"></i></p>
     <div class="w-100" :class="{warning:v$.comment.$error}">
      <input @keyup.enter.prevent="sendComment()" id="giveComment" class="form-control form-control-lg border comentInput" type="text" placeholder="write your comment here" aria-label=".form-control-lg example" v-model="comment">
     <span class="error-msg mt-1">{{v$.comment.$errors[0]?.$message}}
            </span>
     </div>
      </div>
      <div class="mt-2 text-white">
          <div class="d-flex mt-3" v-for="roleModelComent in comments" :key="roleModelComent.id">
          <div  class="profileCircle rounded-circle text-white me-3">
            <img v-if="roleModelComent.profile_image" :src="roleModelComent.profile_image" alt="mentor profile" class="img-fluid rounded-circle">
            <p v-else class="rounded-circle fs-3 px-3 text-center"><i class="fas fa-user"></i></p>
           </div> 
           <div class="text-white">{{roleModelComent.content}}</div>
           </div>
      </div>
      </div>
      <div class="col-md-4 d-none d-md-block">
        <p class="text-white">Related Role Models</p>
        <div v-for="relatedRoleModel in relatedRoleModels" :key="relatedRoleModel.id" class="mt-4">
        <div @click="fetchRelatedRoleModelDetail(relatedRoleModel.id)" class="row relatedRoleModel">
          <div class="col-md-4 col-lg-3">
             <img :src="relatedRoleModel.image.path" alt="related role model" class="img-fluid relatedRoleModels" /> 
          </div>
          <div class="col-md-8 col-lg-9">
            <p class="text-white">{{relatedRoleModel.intro}}</p>
          </div>
        </div>                
        </div>
      </div>
      </div>
  </div>
      <base-modal id="firstVerifyModal">
      <template #modalBody>
        <div class="mt-4 text-center text-white p-4">
          <p class="fs-2 fw-bold">Hey Dear User 👋</p>
          <p class="fs-4 fw-bold">In order to react with the blog</p>
          <p class="fs-4 fw-bold">Content First you have to Login</p>
          <p class="fs-4 fw-bold"> or if yuo didn't have Account creat Account</p>
          <div class="d-flex justify-content-center fs-3">
            <button @click="gotoLoginFirst()" class="me-3 loginorSignUp text-primary">Login</button>
            <span class="me-3">Or</span>
            <button @click="createAccountFirst()" class="text-primary loginorSignUp">Create Account</button>
          </div>
          <div class="mt-5 d-flex">
            <button @click="firstVerifyModal.hide()" class="btn closeBtn text-white ms-auto">Close</button>
          </div>
        </div>
      </template>
    </base-modal>
</template>
<script>
import apiClient from '@/url/index'
import useValidate from "@vuelidate/core";
import { required, helpers} from "@vuelidate/validators";
import {Modal} from 'bootstrap'
export default {
  props:['rolemodelId'],
  data() {
    return {
      v$:useValidate(),
      comment:'',
      roleModelDetails:{},
      relatedRoleModels:[],
      images:[],
      comments:[],
      isLegalUser:false,
      firstVerifyModal:null,
      isShare:false,
    }
  },
  validations() {
    return {
    comment:{
      required:helpers.withMessage('empty comment can not be submited',required)
    }
    }
    },
    created() {
      this.fetchRoleModelDetail(this.$route.params.rolemodelId,this.$store.getters.lang || 'en')
      this.fetchRelatedRoleModels(this.$store.getters.lang || 'en')
    },
      mounted() {
    this.firstVerifyModal = new Modal(document.getElementById("firstVerifyModal"));
  },
    computed:{
      lang(){
      return this.$store.getters.lang
    },
     user(){
      return this.$store.getters.user
    }
    },
    watch:{
      lang(value){
        this.fetchRoleModelDetail(this.$route.params.rolemodelId,value)
        this.fetchRelatedRoleModels(value)
      },

    },
  methods: {
   async fetchRoleModelDetail(id,value){
      this.$store.commit('setIsLoading',true)
      try{
        var response = await apiClient.get(`user/get_detail_role_models/${id}?lang=${value || 'en'}&isLegal=${this.user?this.user?.id:0}`)
        if(response.status === 200){
           this.roleModelDetails = response.data
           this.images = response.data.image
           this.comments = response.data.comments
           console.log('roleModel Details=',response.data)
        }
      }
      finally{
        this.$store.commit('setIsLoading',false)
      }
    },
      async fetchRelatedRoleModels(value){
      this.$store.commit('setIsLoading',true)
      try{
        var response = await apiClient.get(`user/get_related_role_models/${this.$route.params.rolemodelId}?lang=${value || 'en'}`)
        if(response.status === 200){
           this.relatedRoleModels = response.data
           console.log('related roleModels =',response.data)
        }
      }
      finally{
        this.$store.commit('setIsLoading',false)
      }
    },
    fetchRelatedRoleModelDetail(id){
      this.$router.push({name:'RoleModelDetail',params:{rolemodelId:id}})
      this.fetchRoleModelDetail(id,this.lang)
      this.fetchRelatedRoleModels(this.lang)
    },
    displayCommentInput(){
         this.firstVerifyModal.show()
    },
    async sendComment(){
      this.v$.comment.$validate()
      if(!this.v$.comment.$error){
        var response = await apiClient.post(`user/add_comment/${this.$route.params.rolemodelId}`,{comment:this.comment})
        if(response.status === 200){
          this.comment = ''
           this.comments.unshift(response.data)
           this.roleModelDetails.comment+=1

        }
      
      }
     
    },
     formatDate(createdAt){
     var date = new Date(createdAt)
     var year = date.getFullYear()
     var month = date.getMonth()
     var day = date.getDate()
     return month*1+1+'/'+day+'/'+year
    },
    async likeRoleModel(){
      if(this.user){
       var response = await apiClient.post(`user/add_like/${this.$route.params.rolemodelId}`)
        if(response.status === 200){
           this.roleModelDetails.is_liked = 1
            this.roleModelDetails.like = this.roleModelDetails.like*1+ 1
          console.log(response.data)
        }
      }
      else{
        this.firstVerifyModal.show()
      }
    },
     gotoLoginFirst(){
      this.notifyModal.hide()
      this.$router.push({name:'Login'})
    },
    createAccountFirst(){
      this.notifyModal.hide()
      this.$router.push({name:'SignUp'})
    },
    shareControl(){
      this.isShare = !this.isShare
    },
     shareOnFaceBook(){
      const navUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href;
         window.open(navUrl , '_blank');
         this.isShare = false
    },
    shareOnTwitter(){
       const navUrl =
    'https://twitter.com/intent/tweet?text=' + window.location.href;
  window.open(navUrl, '_blank');
  this.isShare = false
    },

  },
}
</script>
<style scoped>
.wraper,.comentSection{
    background-color: #0f0e1c;
}
.carouselImg{
    min-width: 100%;
    max-width:100%;
    height: 70vh;
}
.listenAudio{
    background-color: #e7453a;
}
.downloadBtn{
  background-color: #f69f83;
  color: #0f0e1c;
}
.content{
  text-align: start;
}
a{text-decoration: none;}
.borderBottom{
  border-bottom: 0.1rem solid #f69f83;
}
.addCommentBtn{
  border: none;
  background: none;
}
.comentInput{
  background-color: #0f0e1c;
  color: #fff;
}
.comentSection{
  text-align: left;
}
.smProfileCircle{
    background-color: #e7453a;
}
.profileCircle{
    max-width: 4rem;
    min-height: 4rem;
    max-height: 4rem;
    background-color: #e7453a;
    overflow: hidden;
}
.profileCircle img{
    min-width: 100%;
    height: 100%;
}
.socialLink{
  background: none;
  border: none;
}
.commentBtn,.likeBtn{
  background: none;
  border: none;
}
.socialMedia{
  position: absolute;
  right: 2%;
}
/* .relatedRoleModels{
  width: 20vw;
  height: 20vh;
}  */
.warning input {
  border: 1px red solid;
}
.warning span {
  display: inline;
  color: red;
}
.relatedRoleModel{
  cursor: pointer;
}
.closeBtn{
  background-color: #e7453a;
}
</style>