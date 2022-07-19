<template>
<div class="wraper px-3 pt-3 px-lg-5 pt-lg-5">
    <div id="rolemodelImage" class="carousel slide" data-bs-ride="carousel">
  <!-- <div class="carousel-indicators">
    <button type="button" data-bs-target="#rolemodelImage" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#rolemodelImage" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#rolemodelImage" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div> -->
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="../assets/rolemodel4.jpg" class="d-block" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../assets/rolemodel2.jpg" class="d-block" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../assets/rolemodel3.jpg" class="d-block" alt="...">
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
<div class="d-flex mt-4 py-2">
   <div class="fs-5 fw-bold text-white">Role model totle here</div>
   <div class="ms-5 text-white d-none d-md-block">
    <span>Issue Date:</span>
    <span> 7/17/2022</span>
   </div>
   <div class="d-flex ms-auto">
    <span class="fs-5 text-white"><i class="fas fa-thumbs-up"></i></span>
     <span class="ms-4 fs-5 text-white"><i class="fas fa-comment"></i></span>
   </div>
</div>
<div class="d-flex py-3">
    <button @click="listenAudio()" class="btn listenAudio text-white py-0 me-5"><span class="me-1"><i class="fas fa-play"></i></span> Listen Audio</button>
    <button class="rounded-circle px-1 downloadBtn fw-bold"><i class="fas fa-download"></i></button>
</div>
<p class="content text-white mt-3" v-for="n in 4" :key="n">
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima voluptatum, sint earum repellendus architecto, magnam dicta eveniet laboriosam nulla error aut at iure tempore dolore quidem hic veniam temporibus, voluptatem distinctio culpa totam corporis quasi est? Placeat culpa beatae quas eaque possimus dignissimos quaerat. Quia quisquam quas porro, a deserunt cum illum officia dolore nesciunt dolorem, labore atque tenetur perspiciatis? Maiores, saepe ratione error, maxime minima dignissimos exercitationem architecto magni voluptatem iure fugit quasi possimus eveniet quaerat omnis voluptas, cumque aliquam deleniti tenetur nemo. Sed porro dolorum exercitationem iste labore necessitatibus quasi amet asperiores quam nobis similique architecto at omnis eos, fugit pariatur hic maxime vero possimus cupiditate quibusdam id repudiandae. Modi iure voluptatum fugit minima hic at laudantium expedita ex quaerat. Sint dignissimos odio mollitia quos dolorum, ipsam distinctio accusamus exercitationem corrupti quod in eaque ducimus suscipit saepe vel amet adipisci esse minus facilis, dolorem rerum tempora? Perferendis, quaerat ut tempore reprehenderit unde optio, earum modi officiis impedit, autem atque mollitia? Quia reiciendis earum corporis, voluptas tempora aperiam voluptatum ea veniam debitis perspiciatis atque inventore quaerat minus minima esse eveniet eius nobis sit illo cumque voluptatibus temporibus velit vitae animi? Nihil sapiente nostrum facilis, alias dolore quas voluptatum cum!
</p>
<div class="mt-3 d-flex">
  <button class="text-white fs-4 me-3"><i class="fas fa-thumbs-up"></i></button>
  <button class="text-white fs-4"><i class="fas fa-comment"></i></button>
  <div class="d-flex ms-auto">
     <button class="text-white fs-4 me-3"><i class="fab fa-facebook-square"></i></button>
  <button class="text-white fs-4 me-3"><i class="fab fa-instagram-square"></i></button>
  <button class="text-white fs-4 me-3"><i class="fab fa-twitter-square"></i></button>
  <button class="text-white fs-4 me-3"><i class="fab fa-linkedin"></i></button>
  <button class="text-white fs-4"></button>
  </div>
</div>
</div>
<div class="borderBottom"></div>
<div class="comentSection px-3 py-3 px-lg-5 py-lg-5">
  <div class="row pt-3"> 
    <div class="col-md-7 me-lg-5">
      <p class="text-white fw-bold">Comments(6)</p>
      <div class="d-flex mt-3 mt-3">
        <p class="text-white fs-4 me-2"><i class="fas fa-user"></i></p>
     <div class="w-100" :class="{warning:v$.comment.$error}">
      <input @keyup.enter="sendComment()" class="form-control form-control-lg border comentInput" type="text" placeholder="write your comment here" aria-label=".form-control-lg example" v-model="comment">
     <span class="error-msg mt-1">{{v$.comment.$errors[0]?.$message}}
            </span>
     </div>
      </div>
      <div class="mt-2 text-white"> there is no comment yet</div>
      </div>
      <div class="col-md-4 d-none d-md-block">
        <p class="text-white">Related Role Models</p>
        <div v-for="n in 5" :key="n" class="mt-2">
        <div class="row">
          <div class="col-6">
             <img src="../assets/rolemodel1.jpg" alt="related role model" class="img-fluid relatedRoleModels" /> 
          </div>
          <div class="col-6">
            <p class="text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque, deleniti.</p>
          </div>
        </div>                
        </div>
      </div>
      </div>
  </div>
</template>
<script>
import apiClient from '@/url/index'
import useValidate from "@vuelidate/core";
import { required, helpers} from "@vuelidate/validators";
export default {
  props:['rolemodelId'],
  data() {
    return {
      v$:useValidate(),
      comment:'',
      roleModelDetails:{}
    }
  },
  validations() {
    return {
    comment:{
      required:helpers.withMessage('empty comment can not be submited',required)
    }
    }
    },
  methods: {
   async fetchRoleModelDetail(){
      this.$store.commit('setIsLoading',true)
      try{
        var response = await apiClient.get(`api/role_model_detail/${this.roleModelId}`)
        if(response.status === 200){
           this.roleModelDetails = response.data
        }
      }
      finally{
        this.$store.commit('setIsLoading',false)
      }
    },
    async sendComment(){
      this.v$.comment.$validate()
      if(!this.v$.comment.$error){
          try{
        var response = await apiClient.post(`api/role_model_comment/${this.roleModelId}`,this.comment)
        if(response.status === 200){
           this.roleModelDetails = response.data
        }
      }
      finally{
        this.$store.commit('setIsLoading',false)
      }
      }
    },
    async listenAudio(){
  //     let sound = await import('../../recordings/sound.mp4');
  // const audio = new Audio(sound);
  // audio.play();
    }

  },
}
</script>
<style scoped>
.wraper,.comentSection{
    background-color: #0f0e1c;
}
img{
    min-width: 100%;
    max-width:100%;
    height: 60vh;
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
.borderBottom{
  border-bottom: 0.1rem solid #f69f83;
}
.comentInput{
  background-color: #0f0e1c;
  color: #fff;
}
.comentSection{
  text-align: left;
}
.relatedRoleModels{
  width: 20vw;
  height: 20vh;
} 
.warning input {
  border: 1px red solid;
}
.warning span {
  display: inline;
  color: red;
}
</style>