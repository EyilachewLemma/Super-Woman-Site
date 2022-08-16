<template>
  <div class="d-none d-md-block">
    <!-- home page section -->
    <div class="position-relative">
      <img
        src="../assets/Background.png"
        alt="home page background image"
        class="backgrounImg img-fluid"
      />
      <div class="d-flex justify-content-between bodyContainer">
        <div class="px-lg-5 textContainer">
          <div class="text-white mx-2 me-lg-5">
            <div class="fw-bold fs-1">WHERE YOU</div>
            <div class="fw-bold fs-1">GET YOUR</div>
            <div class="fw-bold fs-1">SUPER POWER</div>
            <div class="mt-lg-5 fs-5">
              Empowering Women through
              <br />role modeling and mentoring.
            </div>
            <div class="d-flex mt-5">
              <button class="btn fromGoogleBtn text-white me-2 px-3 mt-lg-5 me-lg-4">
                <div class="d-flex align-items-center py-0">
                  <p class="me-2 my-0">
                    <i class="fa-brands fa-google-play"></i>
                  </p>
                  <button @click="getAppFromPlayStor()" class="my-0 downloadApp">
                    Get Apps On
                    <br />google Play
                  </button>
                </div>
              </button>
              <button class="btn fromAppStorBtn text-white px-3 mt-lg-5 border">
                <div class="d-flex align-items-center">
                  <p class="me-2 my-0">
                    <i class="fa-brands fa-app-store"></i>
                  </p>
                  <button @click="getAppFromAppStor()" class="my-0 downloadApp">
                    Get Apps On
                    <br />App Store
                  </button>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div class="flex-fill animatedImgContainer">
          <div
            class="leftImgContainer"
            @mouseenter="decreaseHeight()"
            @mouseleave="increaseHeight()"
          >
             <router-link to="#" class="leftBtn border rounded shadow-sm p-2">See More</router-link>
            <img src="../assets/bety2.jpg" alt="sample image" class="img-fluid leftImg" />
          </div>
          <div class="rightImageContainer" :class="{ onHover:isHover}">
            <router-link to="#" class="rightBtn border rounded shadow-sm p-2">See More</router-link>
            <img src="../assets/bety.jpg" alt="sample image" class="img-fluid rightImg" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- background for small device -->
  <div class="bgForSmallDevice d-md-none">
    <div class="text-center">
      <div
        class="leftImgContainer smallScreen pt-3 pt-sm-5"
        @mouseenter="decreaseHeight()"
        @mouseleave="increaseHeight()"
      >
        <router-link to="#" class="leftBtn border rounded shadow-sm p-2">See More</router-link>
        <img src="../assets/bety2.jpg" alt="sample image" class="img-fluid leftImg" />
      </div>
      <div class="rightImageContainer smallScreen" :class="{ onHover:isHover}">
        <router-link to="#" class="rightBtn border rounded shadow-sm p-2">See More</router-link>
        <img src="../assets/bety.jpg" alt="sample image" class="img-fluid rightImg" />
      </div>
    </div>
  </div>
  <div class="text-center d-md-none homeBgText p-4">
    <div class="text-white mx-2 me-lg-5">
      <div class="fw-bold fs-1">WHERE YOU</div>
      <div class="fw-bold fs-1">GET YOUR</div>
      <div class="fw-bold fs-1">SUPER POWER</div>
      <div class="mt-lg-5 fs-5">
        Empowering Women through
        <br />role modeling and mentoring.
      </div>
      <div class="d-flex mt-5 justify-content-center">
        <button class="btn fromGoogleBtn text-white me-2 px-3 mt-lg-5 me-lg-4">
          <div class="d-flex align-items-center py-0">
            <p class="me-2 my-0">
              <i class="fa-brands fa-google-play"></i>
            </p>
            <button @click="getAppFromPlayStor()" class="my-0 downloadApp">
              Get Apps On
              <br />google Play
            </button>
          </div>
        </button>
        <button class="btn fromAppStorBtn text-white px-3 mt-lg-5 border">
          <div class="d-flex align-items-center">
            <p class="me-2 my-0">
              <i class="fa-brands fa-app-store"></i>
            </p>
            <button @click="getAppFromAppStor()" class="my-0 downloadApp">
              Get Apps On
              <br />App Store
            </button>
          </div>
        </button>
      </div>
    </div>
  </div>
  <!-- rolemodel started -->
  <div class="recentRoleModels pb-5">
    <div class="text-center text-white py-5">RECENT PUBLISHED ROLE MODELS</div>
    <div class="row mx-2 rolemodelRow">
      <div
        class="col-md-6 col-lg-4 mt-3 px-4"
        v-for="roleModel in roleModels.data"
        :key="roleModel.id"
      >
        <div class="imgContainer">
          <router-link :to="{name:'RoleModelDetail',params:{rolemodelId:roleModel?.id}}">
            <img
              :src="roleModel.card_image"
              alt="role model image"
              class="img-fluid rounded"
            />
          </router-link>
        </div>
        <div class="mt-md-2 text-white detailContent">{{roleModel.intro}}</div>
        <div class="d-flex justify-content-between mt-1">
          <div class="issue d-none d-md-block fw-bold">ISSUE Date {{formatDate(roleModel.created_at)}}</div>
          <div class="d-flex">
            <p class="text-white me-3">
              {{roleModel.like}}
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
      </div>
    </div>
    <div class="mt-5 text-center">
      <button @click="$router.push({name:'RoleModels'})" class="btn border rounded text-white">
        VIEW MORE ROLE MODELS
        <span class="fs-5 ms-5">
          <i class="fas fa-arrow-right"></i>
        </span>
      </button>
    </div>
  </div>
  <!-- rolemodel end -->
  <div class="blogSection">
    <div class="recentBlogs">
      <div class="text-center text-white py-5">RECENT PUBLISHED BLOGS</div>
    </div>
    <div class="slightDark">
      <div class="row mx-2 mx-lg-3">
        <div class="col-6 col-md-4 col-lg-3 blogImage" v-for="blog in blogs.data" :key="blog.id">
          <div class="imgContainer">
            <router-link :to="{name:'BlogDetail',params:{blogId:blog.id}}">
              <img :src="blog.image?.path" alt="blog image" class="img-fluid rounded w-100" />
            </router-link>
          </div>
          <div class="mt-3">
            <div class="fw-bold fs-5 text-white blog">{{blog?.blog_title}}</div>
            <div class="text-white blog">{{blog?.blog_intro}}</div>
            <div class="d-flex justify-content-between mt-3">
              <div class="issue">{{blog.time_take_to_read}} minute read</div>
              <div class="d-flex">
                <p class="text-white me-3">
                  {{blog.like}}
                  <span class="review fs-5">
                    <i class="fas fa-thumbs-up"></i>
                  </span>
                </p>
                <p class="text-white">
                  {{blog.comment}}
                  <span class="review fs-5">
                    <i class="fas fa-comment-dots"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center py-5">
        <button class="btn border rounded text-white">
          VIEW MORE BLOGS
          <span class="fs-5 ms-5">
            <i class="fas fa-arrow-right"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
  <div class="subscription d-md-flex px-3 py-4 p-lg-5 w-100">
    <div class="col-md-6 pt-5">
      <div class="fs-2 fw-bold issue mt-4">SUBSCRIBE</div>
      <div class="text-white mt-3 fs-4 fw-bold">
        Subscribe to get new articls and role model in
        <br />your inbox
      </div>
    </div>
    <div class="col-md-6 subscribtionInput p-4 mt-3">
      <form @submit.prevent>
        <div class="mb-3 mt-3 mt-lg-4" :class="{ warning: v$.userInfo.first_name.$error }">
          <input type="text" class="form-control text-white" id="fname" placeholder="First Name" v-model="userInfo.first_name" />
          <span class="error-msg mt-1">
              {{v$.userInfo.first_name.$errors[0]?.$message}}
            </span>
        </div>
        <div class="mb-3" :class="{ warning: v$.userInfo.last_name.$error }">
          <input type="text" class="form-control text-white" id="lname" placeholder="Last Name" v-model="userInfo.last_name"/>
          <span class="error-msg mt-1">{{v$.userInfo.last_name.$errors[0]?.$message}}</span>
        </div>
        <div class="mb-3" :class="{ warning: v$.userInfo.email.$error }">
          <input type="email" class="form-control text-white" id="email" placeholder="Email" v-model="userInfo.email" />
           <span class="error-msg mt-1">{{v$.userInfo.email.$errors[0]?.$message}}</span>
        </div>
        <div class="mb-4 mt-5">
          <button @click="subscribe()" class="btn sbscribeBtn text-white px-3">SUBSCRIBE</button>
        </div>
      </form>
    </div>
  </div>
  <div class="findMentor px-3 py-4 p-lg-5">
    <div class="findMentorBox px-2 py-5 px-lg-5">
      <div
        class="text-center text-white pt-lg-3 fw-bold"
      >ARE YOU LOOKING A MENTOR WHO HELP YOU ON YOUR DREAM</div>
      <div class="mt-3 mt-lg-5 text-center">
        <button @click="$router.push({name:'Mentors'})" class="btn findMentorBtn text-black">
          FIND MENTOR
          <span class="fs-5 ms-5">
            <i class="fas fa-arrow-right"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
  <!-- bottom nav for small device -->
  <!-- <BottomNav class="d-md-none" /> -->
</template>
<script>
// import BottomNav from '../components/BottomNav.vue'
import useValidate from "@vuelidate/core";
import { required, helpers,email } from "@vuelidate/validators";
import apiClient from '@/url';
export default {
  components: {
    // BottomNav
  },
  data() {
    return {
      isHover: false,
      v$: useValidate(),
     userInfo: {},
      
      isLoading: false,
      notify: "",
      
    };
  },
  validations() {
    return {
      userInfo: {
        first_name: {
          required: helpers.withMessage("first name can not be empty", required)
        },
        last_name: {
          required: helpers.withMessage("last name can not be empty", required)
        },
        email: {
          required: helpers.withMessage("please enter your email", required),
          email
        },
        
      },
      
    };
  },

  created() {
    
  },
  
  computed: {
    fields() {
      return this.$store.getters.fields;
    },
    user() {
      return this.$store.getters.user;
    },
    roleModels() {
      return this.$store.getters.roleModels;
    },
    blogs() {
      return this.$store.getters.blogs;
    },
    
  },
  methods: {
    decreaseHeight() {
      this.isHover = true;
    },
    increaseHeight() {
      this.isHover = false;
        },
    getAppFromAppStor(){
      this.$toast.success('product added to the cart')
    },
    getAppFromPlayStor(){},
   
    formatDate(createdAt) {
      var date = new Date(createdAt);
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      return month * 1 + 1 + "/" + day + "/" + year;
    },
   async subscribe(){
      this.v$.userInfo.$validate()
      if(!this.v$.userInfo.$error){
        try{
          var response = await apiClient.post('user/subscribe',this.userInfo)
           if(response.status === 200){
            this.$toast.success(`thank you! we will inform updated information`);
           }
           if(response.status === 201){
            this.$toast.success(`already subscribed !`);
           }
        }      
      catch(err){
        console.log('error')
      }
      }
    }
  }
};
</script>
<style scoped>

.backgrounImg {
  min-width: 100%;
  max-width: 100%;
}
.fromGoogleBtn {
  background-color: #e7453a;
}
.bodyContainer {
  width: 100%;
  position: absolute;
  top: 18%;
  left: 0%;
  right: 0%;
}
.textContainer {
  width: 50%;
}
.leftImgContainer {
  position: relative;
}
.leftImg {
  width: 45%;
  margin-top: 11%;
  position: absolute;
  right: 45%;
  border-radius: 1.5rem;
  transition: all 0.6s;
}
.leftImgContainer:hover .leftImg {
  width: 60%;
  border-radius: 2rem;
  margin-top: 0%;
  right: 35%;
  z-index: 1;
}
.rightImageContainer {
  position: relative;
}
.rightImg {
  width: 60%;
  position: absolute;
  top: 0%;
  right: 12%;
  border-radius: 1.5rem;
  transition: all 1s ease-out;
}
.onHover img {
   width: 45%;
  margin-top: 5%;
  border-radius: 1.5rem;
  position: absolute;
  right: 9%;
  transition: all 1s ease-out;
}
.leftBtn,
.rightBtn {
  display: none;
  margin-top: 30%;
}
.leftImgContainer:hover .leftBtn {
  display: inline;
  position: absolute;
  left: 25%;
  text-decoration: none;
  color: #fff;
  z-index: 10;
}
.rightImageContainer:hover .rightBtn {
  display: inline;
  position: absolute;
  top: 60%;
  right: 25%;
  text-decoration: none;
  color: #fff;
  z-index: 10;
}
/* fore small device */
.bgForSmallDevice {
  width: 100%;
  height: 15em;
  background-color: #e7453a;
}
.downloadApp{
  border: none;
  background: none;
  color: #fff;
}
.homeBgText {
  background-color: #002f5d;
  /* margin-top: 20em; */
}
/*  */
.recentRoleModels {
  margin-left: 3%;
  margin-right: 3%;
  background-color: #0f0e1c;
}
.imgContainer {
  width: 100%;
  overflow: hidden;
}
.imgContainer img {
  width: 100%;
  transition: all 1.5s;
}
.imgContainer img:hover {
  transform: scale(1.2);
}
.issue {
  color: #f69f83;
}
.review {
  color: #e7453a;
}
.blog {
  text-align: left;
}
.recentBlogs {
  background-color: #0f0e1c;
}
.blogSection {
  background-color: #0f0e1c;
  max-width: 100%;
}
.subscription {
  background-color: #0d0d0d;
}
.subscribtionInput {
  background-color: #1d213a;
  border-radius: 1rem;
}
form input {
  width: 100%;
  background-color: #1d213a;
  border-left: none;
  border-top: none;
  border-right: none;
  color: #fff;
  border-radius: 0% !important;
}

form input:focus {
  background-color: #1d213a;
  border-left: none;
  border-top: none;
  border-right: none;
  box-shadow: none !important;
}
.sbscribeBtn {
  width: 10rem;
  background-color: #e7453a;
}
.findMentor {
  background-color: #0f0e1c;
}
.findMentorBox {
  background-color: #002f5d;
  border-radius: 1rem;
}
.findMentorBtn {
  background-color: #f69f83;
}

input,
select {
  background-color: #1d213a;
  color: #fff;
}
.warning input {
  border: 1px red solid;
}
.warning span {
  display: inline;
  color: red;
}
@media(min-width: 576px){
  .bgForSmallDevice{
   height: 30em;
  }
}
@media (max-width: 768px) {
  .leftImg {
    margin-top: 5%;
    width: 25%;
    left: 25%;
  }
  .rightImg{
    width: 35%;
    right: 23%;
  }
  .leftImgContainer:hover .leftImg {
  width: 35%;
  border-radius: 2rem;
  margin-top: 0%;
  left: 25%;
  z-index: 1;
}
.leftImgContainer:hover .leftBtn {
  display: inline;
  position: absolute;
  left: 35%;
  text-decoration: none;
  color: #fff;
  z-index: 10;
}
.rightImageContainer:hover .rightBtn {
  display: inline;
  position: absolute;
  top: 5%;
  right: 30%;
  text-decoration: none;
  color: #fff;
  z-index: 10;
}
.onHover img {
   width: 25%;
  margin-top: 5%;
  border-radius: 1.5rem;
  position: absolute;
  right: 23%;
  transition: all 1s ease-out;
}
}
@media(min-width: 768px){
  .recentRoleModels{
margin-left: 8%;
margin-right: 8%;
  }
}

</style>