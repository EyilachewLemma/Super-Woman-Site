<template>
  <div class="blogs pb-5">
    <div class="text-center text-white fs-4 fw-bold pt-5 pb-2">READ OUR BLOGS</div>
    <div class="mt-2 d-flex  interestSection w-100 pb-3">
            <button class="border interestBtn  me-2 text-white p-1" v-for="field in fields" :key="field.id"  @click="filterBlogsByFields(field.id)">{{field.title}}</button>
        </div>
    <div class="row mx-2 mx-lg-3">
      <div class="col-sm-6 col-md-4 col-lg-3 mt-5" v-for="blog in blogs.data" :key="blog.id">
      <div class="row">
        <div class="col-6 col-sm-12 blogImg">
       <router-link :to="{name:'BlogDetail',params:{blogId:blog.id}}">
        <img :src="blog.image?.path" alt="role model image" class="img-fluid rounded w-100" /></router-link>
        </div>
        <div class="col-6 col-sm-12 text-white">
            <div class="my-1 fs-4 fw-bold">{{blog.blog_title}}</div>
        <div class="d-flex justify-content-between mt-md-3 align-items-center">
            <div class="issue">{{blog.time_take_to_read}} min read</div>
          <div class="issue">ISSUE Date {{formatDate(blog.created_at)}}</div>
        </div>
        <div class="mt-md-2 text-white detailContent  fw-bold d-none d-md-block">{{blog.blog_intro}}</div>
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
      queryObject:{
        perPage:12,
        searchBy:'',
        filterBy:''
      },
      blogScrollHandler:null,
    }
  },
created() {  
  this.queryObject.lang = this.$store.getters.lang ||'en'
   this.fetchBlogs(this.queryObject)
},
 mounted() {
       this.blogScrollHandler = window.addEventListener('scroll',()=>{
            let scrollTop = document.documentElement.scrollTop
            let scrollHeight = document.documentElement.scrollHeight
            let clientHeight = document.documentElement.clientHeight
            if(scrollTop+clientHeight >= scrollHeight){
                this.pageCounter++
                this.queryObject.perPage = this.queryObject.perPage*this.pageCounter
                this.fetchBlogs(this.queryObject)
            }
        })
    },
     unmounted() {
        window.removeEventListener('scroll', this.blogScrollHandler,true)
    },
computed:{
  blogs() {
      return this.$store.getters.blogs;
    },
    lang(){
    return this.$store.getters.lang
  },
  fields() {
      return this.$store.getters.fields;
    },

},
methods: {
  fetchBlogs(queryObject){
     this.$store.dispatch('fetchBlogs',queryObject)
  },
    formatDate(createdAt){
     var date = new Date(createdAt)
     var year = date.getFullYear()
     var month = date.getMonth()
     var day = date.getDate()
     return month*1+1+'/'+day+'/'+year
    },
  searchBlog(id){
    this.fetchBlogs(this.queryObject)
         console.log('fieldId = ',id)
  },
  filterBlogsByFields(id){
            this.queryObject.filterBy = id
            this.fetchBlogs(this.queryObject)
        }
}
};
</script>
<style scoped>
.blogs {
  background-color: #0f0e1c;
}
.interestSection{
    overflow: auto;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.interestSection::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.interestSection {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.interestBtn{    
    width: 40%;
    border-radius: 3rem;
    background-color: #1d213a;
    border: none;
}
.interestBtn:focus{
    background-color: #002f5d;
    border: none;
}
    .blogImg{
  overflow: hidden;
}
.blogImg img{
  width: 100%;
  transition: all 1s;
}
.blogImg img:hover{
  transform: scale(1.2);
}
.issue {
  color: #f69f83;
}
.detailContent{
  text-align: left;
}
@media(max-width: 576px){
    .interestBtn{
        min-width: 45%;
    }
}
@media(min-width: 576px){
    .interestBtn{
        min-width: 35%;
    }
}
@media(min-width: 768px){
    .interestBtn{
        min-width: 25%;
    }
}
@media(min-width: 992px){
    .interestBtn{
       min-width: 20%;
    }
}
@media(min-width: 1200px){
    .interestBtn{
        min-width: 15%;
    }
}
</style>