<template>
  <div class="blogs pb-5">
    <div class="text-center text-white fs-5 fw-bold pt-5 pb-2">READ OUR BLOGS</div>
    <div class="fieldsContainer p-3 text-white ">
        <button v-for="field in fields" :key="field.id" class="fieldBox border rounded-pill me-2 p-2" @click="searchBlog(field.id)">{{field.title}}</button>
    </div>
    <div class="row mx-2 mx-lg-3">
      <div class="col-sm-6 col-md-4 col-lg-3 mt-4" v-for="blog in blogs.data" :key="blog.id">
      <div class="row">
        <div class="col-6 col-sm-12 roleModeImg">
       <router-link :to="{name:'BlogDetail',params:{blogId:blog.id}}">
        <img :src="blog.image?.path" alt="role model image" class="img-fluid rounded w-100" /></router-link>
        </div>
        <div class="col-6 col-sm-12 text-white">
            <div class="my-1 fs-5 fw-bold">{{blog.blog_title}}</div>
        <div class="d-flex justify-content-between mt-md-3 align-items-center">
            <div class="issue">{{blog.time_take_to_read}} min read</div>
          <div class="issue">ISSUE Date {{formatDate(blog.created_at)}}</div>
        </div>
        <div class="mt-md-2 text-white detailContent">{{blog.blog_intro}}</div>
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
  this.$store.dispatch('fetchBlogs',{lang:this.$store.getters.lang||'en',perPage:this.perPage})
},
 mounted() {
        window.addEventListener('scroll',()=>{
            let scrollTop = document.documentElement.scrollTop
            let scrollHeight = document.documentElement.scrollHeight
            let clientHeight = document.documentElement.clientHeight
            if(scrollTop+clientHeight >= scrollHeight){
                this.pageCounter++
                this.perPage = this.perPage*this.pageCounter
                this.$store.dispatch('fetchBlogs',{lang:this.lang,perPage:this.perPage})
            }
        })
    },
     unmounted() {
        window.removeEventListener('scroll', this.handleScroll)
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
    formatDate(createdAt){
     var date = new Date(createdAt)
     var year = date.getFullYear()
     var month = date.getMonth()
     var day = date.getDate()
     return month*1+1+'/'+day+'/'+year
    },
  searchBlog(id){
         console.log('fieldId = ',id)
  }
}
};
</script>
<style scoped>
.blogs {
  background-color: #0f0e1c;
}
.fieldsContainer{
    overflow-x: scroll;
}
.fieldsContainer::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.fieldsContainer {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.fieldBox:focus{
    background-color: #002f5d;
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