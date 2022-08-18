<template>
  <nav class="d-none d-md-block" :class="{bigNavContainer:$route.meta.ishome}">
    <img src="../assets/NavigationImage.png" alt class="navBackground img-fluid" />
    <div class="naveContainer d-flex align-items-center justify-content-between p-2 px-lg-5">
      <div class="brandContainer mt-lg-2">
        <router-link :to="{name:'HomePage'}" class="d-flex">
          <img
            src="../assets/logo.png"
            alt="super woman logo"
            class="img-fluid bigLogo me-2 align-self-center"
          />
          <img
            src="../assets/brand.png"
            alt="super woman logo marker"
            class="img-fluid bigLogoMarker align-self-center"
          />
        </router-link>
      </div>

      <div class="d-flex align-items-center mt-2">
        <router-link
          :to="{name:'RoleModels'}"
          class="text-white text-decoration-none me-4"
        >Role Models</router-link>
        <router-link :to="{name:'Blogs'}" class="text-white text-decoration-none">Blog</router-link>
      </div>

      <div class="d-flex align-items-center mt-2">
        <router-link :to="{name:'MentorApplication'}" class="text-white text-decoration-none me-3">Become a Mentor</router-link>
<!-- language section -->
      <div class="d-flex langInputGroup align-items-center ms-auto">
        <span class="fs-5 text-white"><i class="fas fa-globe"></i></span>
  <select class="form-select text-white" aria-label="Default select example" @change="changeLanguage($event)" v-model="selectedLanguage">
  <option selected class="text-blak">Language</option>
  <option v-for="language in languages" :key="language.id" :value="language.code" class="text-dark">{{language.name}}</option>
</select>
</div>
    <div v-if="user?.mentor_id">
    <button @click="gotoChatRoom()" class="notificationIcon text-white position-relative">
      <span class="fs-5">  <i class="fas fa-comment-alt"></i></span>
      <p v-if="user?.message_no" class="position-absolute top-0 text-primary px-1">{{user?.message_no}}</p>
    </button>
   </div>
        <div v-if="user" class="dropdown p-0 ms-4">
          <button
            class="btn profileBtn rounded-pill text-white py-0"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span>
              <i class="fas fa-align-left"></i>
            </span>
            <span class="ms-3 fs-5">
              <i class="fas fa-user"></i>
            </span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li class="accountList">
              <router-link :to="{name:'MyAccount'}" class="px-3 text-decoration-none">My Account</router-link>
            </li>
            <li class="accountList">
              <button @click="logout()" class="px-3 logoutbtn">Logout</button>
            </li>
          </ul>
        </div>
        <div v-else class="d-flex align-items-center">
          <button @click="gotoLogin()" class="profBtn text-white ms-2 me-2">Login</button>
          <button @click="gotoSignup()" class="profBtn text-white">SignUp</button>
        </div>
      </div>
    </div>
  </nav>
  <!-- for only small device navigation -->
  <nav class="smallNav d-md-none">
    <div class="d-flex align-items-center px-3 py-3">
      <div>
        <router-link :to="{name:'HomePage'}" class="d-flex">
          <img src="../assets/logo.png" alt="logo" class="img-fluid logo me-2" />
          <img
            src="../assets/brand.png"
            alt="logo marker"
            class="img-fluid logoMarker align-self-center"
          />
        </router-link>
      </div>
      <div class="d-flex langInputGroup align-items-center ms-auto">
        <span class="fs-5 text-white"><i class="fas fa-globe"></i></span>
  <select class="form-select text-white selectSm" aria-label="Default select example" @change="changeLanguage($event)" v-model="selectedLanguage">
  <option selected class="text-dark">Language</option>
  <option v-for="language in languages" :key="language.id" :value="language.code" class="text-dark">{{language.name}}</option>
</select>
</div>
      <button v-if="user" @click="logout()" class="profBtn text-white ms-2 me-2">Logout</button>
      <div v-else class="d-flex align-items-center">
        <button @click="gotoLogin()" class="profBtn text-white ms-2 me-2">Login</button>
        <button @click="gotoSignup()" class="profBtn text-white">SignUp</button>
      </div>
    </div>
  </nav>
 
</template>
<script>
import apiClient from "../url/index";
export default {
  data() {
    return {
       selectedLanguage:'',
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    languages() {
      return this.$store.getters.languages;
    }
  },
  created(){
    this.selectedLanguage =  this.$store.getters.lang;
  },
  watch: {
    rememberMe(value) {
      localStorage.setItem("remember", value);
    },
    
  },
  methods: {
    gotoSignup() {
      this.$router.push({name:'SignUp'})
    },
   async gotoChatRoom(){
    if(this.user?.message_no){
    var response =  await apiClient.get('user/set_messages_seen')
    if(response.status ===200){
      this.$router.push({name:'Chat'})
      var user = this.user
      user.message_no = 0
      this.$store.commit('setUser',user)
    }
    }
    else{
       this.$router.push({name:'Chat'})
    }
     
    },
    gotoLogin() {
      this.$router.push({name:'Login'})
    },
    async logout() {
      var response = await apiClient.post("user/logout");
      if (response.status === 200) {
        this.$store.commit("setUser", null);
        // this.$store.commit("setIsAuthenticated", false);
        localStorage.setItem("tokenu", null);
        // localStorage.setItem("supUser", null);
        // localStorage.setItem("isLegalUser", false);

        let toPath = this.$route.query.to || "/";
        this.$router.push(toPath);
      }
    },
    changeLanguage(event) {
      localStorage.setItem("language", event.target.value);
      this.$store.commit("setLang", event.target.value);
    }
  }
};
</script>
<style scoped>
nav {
  min-width: 100%;
  max-width: 100%;
  margin: 0%;
  padding: 0%;
  position: relative;
}

nav .navBackground {
  min-width: 100%;
  max-width: 100%;
  min-height: 4rem;
  padding: 0%;
}
.bigNavContainer {
  width: 100%;
  position: absolute;
  z-index: 1;
}
.bigNavContainer .navBackground {
  display: none;
}
.naveContainer {
  width: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  right: 0%;
  color: #fff;
}
.brandContainer {
  width: 13%;
}
.bigLogo {
  width: 33%;
}
.logo {
  min-width: 15%;
  max-width: 15%;
  height: auto;
}
.logoMarker {
  min-width: 60%;
  max-width: 60%;
}
.langInputGroup{
  border: none;
  background: none;
}
select{
  background: none!important;
  max-width: 7rem;
  border: none;
  box-shadow: none!important;
}
.notificationIcon{
  background: none;
  border: none;
}
.selectSm{
  width: 15rem;
}
.logoutbtn{
  background: none;
  border: none;
}
.profileBtn {
  background-color: #1d213a;
  box-shadow: none !important;
}
.accountList:hover{
background-color: gainsboro;
}
.langBtn {
  background: none;
  box-shadow: none !important;
}
.smallNav {
  background-color: #002f5d !important;
  min-width: 100%;
  max-width: 100%;
  margin: 0%;
}
.profBtn {
  background: none;
  border: none;
}
/* @media(max-width: 768px){
} */
@media (max-width: 576px) {
  .logo {
    min-width: 20%;
    max-width: 20%;
    height: auto;
  }
  .logoMarker {
    min-width: 60%;
    max-width: 60%;
  }
}
@media (min-width: 576px) {
  .logo {
    min-width: 10%;
    max-width: 10%;
    height: auto;
  }
  .logoMarker {
    min-width: 30%;
    max-width: 30%;
  }
}
@media (min-width: 768px) {
  .logo {
    min-width: 8%;
    max-width: 8%;
    height: auto;
  }
  .logoMarker {
    min-width: 20%;
    max-width: 20%;
  }
}
@media (min-width: 992px) {
  .logo {
    min-width: 5%;
    max-width: 5%;
    height: auto;
  }
  .logoMarker {
    min-width: 15%;
    max-width: 15%;
  }
  .bigLogo {
    width: 25%;
  }
}
@media (min-width: 1200px) {
  .logo {
    min-width: 3%;
    max-width: 3%;
    height: auto;
  }
  .logoMarker {
    min-width: 10%;
    max-width: 10%;
  }
  .bigLogo {
    width: 20%;
  }
}
</style>