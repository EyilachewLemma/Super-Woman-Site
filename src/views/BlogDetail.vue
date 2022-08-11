<template>
<div class="wraper">
  <div class="d-flex">
    <div class="sideContent text-white d-none d-md-block me-3 px-3 pt-3 pt-lg-5">
       <div class="d-flex flex-column">
        <p class="mt-3 fs-5 text-center">
          <router-link :to="{name:'HomePage'}" class="text-white"><i class="fa-solid fa-house"></i></router-link>
          <span class="p-1 homeTip">Home</span>
          </p>
         <div class="mt-3 fs-5 text-center d-flex">
          <span class="p-1 likeTip text-white">{{blogDetail.like}}</span>
          <span v-if="blogDetail.is_liked" class="text-primary"><i class="fas fa-thumbs-up"></i></span>
          <button v-else @click="likeBlog()" class="likeBtn fs-4 text-white"><i class="fas fa-thumbs-up"></i></button>
         </div>
          <p class="mt-3 fs-5 text-center">
             <a href="#giveComment" class="ms-4 fs-5 text-white text-decoration-none">{{blogDetail?.comment+' '}}<i class="fas fa-comment-dots"></i></a>
            </p>
       </div>
    </div>
    <div class="mainContent px-3 px-lg-5 pt-3 pt-lg-5">
   <div class="fs-1 fw-bold pt-3">
    <span class="text-white">{{blogDetail.blog_title}}</span>
</div>
<div class="mt-2">
  <span class="fieldBox text-white fw-bold p-2 rounded me-2" v-for="field in blogDetail.fields" :key="field.id">{{field.title}}</span>
  <span class="issue ms-3">7 min Read</span>
</div>
<div class="d-flex mt-2">
  <div class="issue"> may 2022</div>
  <div class="d-flex ms-auto">
     <button class="text-white fs-4 me-3 bgnone"><i class="fab fa-facebook-square"></i></button>
  <button class="text-white fs-4 me-3 bgnone"><i class="fab fa-instagram-square"></i></button>
  <button class="text-white fs-4 me-3 bgnone"><i class="fab fa-twitter-square"></i></button>
  <button class="text-white fs-4 me-3 bgnone"><i class="fab fa-linkedin"></i></button>
  <button class="text-white fs-4 bgnone"></button>
  </div>
</div>
  <div class="mt-3 blogImg">
   <img :src="blogDetail.image?.path" alt=" blog poster" class="img-fluid">
   </div>
<p class="content text-white mt-3">{{blogDetail.blog_intro}}</p>
<div class="content text-white fs-5 mt-3" v-html="blogDetail.blog_content"></div>
<div class="mt-3 d-flex">
   <span class="text-white me-2">{{blogDetail.like}}</span>
   <span v-if="blogDetail.is_liked === 1" class="fs-4 text-primary"><i class="fas fa-thumbs-up"></i></span>
    <button v-else @click="likeBlog()" class="likeBtn fs-4 text-white"><i class="fas fa-thumbs-up"></i></button>
   <a href="#giveComment" class="ms-4 fs-5 text-white text-decoration-none">{{blogDetail?.comment}}<i class="fas fa-comment-dots ms-2"></i></a>
  <div class="d-flex ms-auto">
     <button class="text-white fs-4 me-3 bgnone"><i class="fab fa-facebook-square"></i></button>
  <button class="text-white fs-4 me-3 bgnone"><i class="fab fa-instagram-square"></i></button>
  <button class="text-white fs-4 me-3 bgnone"><i class="fab fa-twitter-square"></i></button>
  <button class="text-white fs-4 me-3 bgnone"><i class="fab fa-linkedin"></i></button>
  <button class="text-white fs-4 bgnone"></button>
  </div>
</div>

  <div class="p-3"> 
      <p class="text-white fw-bold">Comments({{comments?.length}})</p>
      <div class="d-flex mt-3 mt-3">
        <p class="align-self-center text-white fs-3 me-2"><i class="fas fa-user"></i></p>
     <div class="w-100" :class="{warning:v$.comment.$error}">
      <input @keyup.enter.prevent="sendComment()" id="giveComment" class="form-control form-control-lg border comentInput" type="text" placeholder="write your comment here" aria-label=".form-control-lg example" v-model="comment">
     <span class="error-msg mt-1">{{v$.comment.$errors[0]?.$message}}
      </span>
     </div>
      </div>
      <div class="mt-2 text-white">
          <div class="d-flex mt-3" v-for="blogComent in comments" :key="blogComent.id">
          <div  class="profileCircle rounded-circle text-white me-3">
            <img v-if="blogComent.profile_image" :src="blogComent.profile_image" alt="mentor profile" class="img-fluid rounded-circle">
            <p v-else class="rounded-circle fs-3 px-3 text-center"><i class="fas fa-user"></i></p>
           </div> 
           <div class="text-white">{{blogComent.content}}</div>
           </div>
      </div>
      </div>
      <!-- related blogs displayed only in md and lessthan screen -->
        <div class="p-4">
          <p class="text-white">Related Role Models</p>
        <div v-for="relatedBlog in relatedBlogs" :key="relatedBlog.id" class="mt-4">
        <div @click="fetchRelatedBlogDetail(relatedBlog.id)" class="row relatedBlog">
          <div class="col-md-4 col-lg-3">
             <img :src="relatedBlog.image.path" alt="related role model" class="img-fluid relatedBlogs" /> 
          </div>
          <div class="col-md-8 col-lg-9">
            <p class="text-white">{{relatedBlog.intro}}</p>
          </div>
        </div>                
        </div>
        </div>
        </div>
        <!-- related blogs displayed only in lg screen -->
         <div class="relatedBlog ms-auto  d-none d-lg-block px-3 pt-3 pt-lg-5">
          <!-- <p class="text-white">Related Blogs</p>
        <div v-for="relatedBlog in relatedBlogs" :key="relatedBlog.id" class="mt-4">
        <div @click="fetchRelatedBlogDetail(relatedBlog.id)" class="row relatedBlog">
          <div class="col-md-4 col-lg-3">
             <img :src="relatedBlog.image.path" alt="related role model" class="img-fluid relatedBlogs" /> 
          </div>
          <div class="col-md-8 col-lg-9">
            <p class="text-white">{{relatedBlog.intro}}</p>
          </div>
        </div>                
        </div> -->
        <div class="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet officia aliquam minus impedit. Sit itaque praesentium, tempora numquam reiciendis maxime veritatis nisi incidunt illum quae odio repellendus, dolore commodi sequi officia, laudantium molestiae modi minus nostrum nobis eveniet ipsum? Facere.</div>
        </div>
        </div>
        </div>
</template>
<script>
import apiClient from '@/url/index'
import useValidate from "@vuelidate/core";
import { required, helpers} from "@vuelidate/validators";
export default {
  props:['blogId'],
  data() {
    return {
      v$:useValidate(),
      comment:'',
      blogDetail:{},
      relatedBlogs:[],
      images:[],
      comments:[]
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
      this.fetchBlogDetail(this.blogId,this.$store.getters.lang || 'en')
      // this.fetchRelatedBlogs(this.$store.getters.lang || 'en')
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
        this.fetchBlogDetail(this.blogId,value)
        this.fetchRelatedBlogs(value)
      },

    },
  methods: {
   async fetchBlogDetail(id,value){
      this.$store.commit('setIsLoading',true)
      try{
        var response = await apiClient.get(`user/get_detail_blog/${id}?lang=${value || 'en'}&isLegal=${this.user?this.user?.id:0}`)
        if(response.status === 200){
           this.blogDetail = response.data
           this.images = response.data.image
           this.comments = response.data.comments
           console.log('blog Details=',response.data)
        }
      }
      finally{
        this.$store.commit('setIsLoading',false)
      }
    },
      async fetchRelatedBlogs(value){
      this.$store.commit('setIsLoading',true)
      try{
        var response = await apiClient.get(`user/get_related_blogs/${this.blogId}?lang=${value || 'en'}`)
        if(response.status === 200){
           this.relatedBlogs = response.data
           console.log('related roleModels =',response.data)
        }
      }
      finally{
        this.$store.commit('setIsLoading',false)
      }
    },
    fetchRelatedBlogDetail(id){
      this.$router.push({name:'BlogDetail',params:{blogId:id}})
      this.fetchBlogDetail(id,this.lang)
      this.fetchRelatedBlogs(this.lang)
    },
    async sendComment(){
      if(this.user){
      this.v$.comment.$validate()
      if(!this.v$.comment.$error){
        var response = await apiClient.post(`user/add_comment/${this.blogId}`,{comment:this.comment})
        if(response.status === 200){
           this.comments.push(response.data)
           this.blogDetail.comment+=1
        }
      
      }
      }
      else{
        this.$router.push({name:'SignUp'})
      }
    },
     formatDate(createdAt){
     var date = new Date(createdAt)
     var year = date.getFullYear()
     var month = date.getMonth()
     var day = date.getDate()
     console.log('date = ',day,month,year)
     return month*1+1+'/'+day+'/'+year
    },
    async likeBlog(){
      if(this.user){
       var response = await apiClient.post(`user/add_like/${this.blogId}`)
        if(response.status === 200){
           this.blogDetail.is_liked = 1
            this.blogDetail.like = this.blogDetail.like*1+ 1
          console.log(response.data)
        }
      }
      else{
        this.$router.push({name:'SignUp'})
      }
    },

  },
}
</script>
<style scoped>
.wraper,.comentSection{
    background-color: #0f0e1c;
}
.sideContent{
  width: 10%;
  border-right: 0.5px solid rgb(145, 142, 142);
}
.homeTip,.likeTip,.commentTip{
  display: none;
}
.homeIcon:hover .homeTip{
display: block;
}

.sideIcon:hover .toolTip{
   display: block;
}
.fieldBox{
   background-color: #1d213a;
}
.mainContent{
  width: 100%;
  /* overflow-y: scroll; */
}
.blogImg img{
  width: 100%;
  max-width: 100%;
}
.content{
  text-align: start;
}
.issue{
  color: #f69f83;
}
.bgnone{
  background: none;
  border: none;
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
.commentBtn,.likeBtn{
  background: none;
  border: none;
}
.warning input {
  border: 1px red solid;
}
.warning span {
  display: inline;
  color: red;
}
.relatedBlog{
  width: 20%;
   border-left: 0.5px solid rgb(145, 142, 142);
}
.relatedBlog{
  cursor: pointer;
}
@media(min-width:768px){
  .mainContent{
    width: 90%;
  }
}
@media(min-width:992px){
  .mainContent{
    width: 70%;
  }
}
</style>