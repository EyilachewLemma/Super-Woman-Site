<template>
    <div class="d-none d-md-flex wraper text-white px-3 py-4 px-lg-5">
        <div class="sideBar">
            <div class="mt-2">
                <router-link :to="{name:'MyAccount'}">
                <div class="d-flex px-2 py-1 rounded">
                    <span class="fs-5 me-2"><i class="fas fa-user-circle"></i></span>
                    <span>Account Detail</span>
                </div>
            </router-link>
            </div>
             <div class="mt-3">
                <router-link :to="{name:'PhoneSetting'}">
                <div class="d-flex px-2 py-1 rounded ">
                    <span class="fs-5 me-1"><i class="fas fa-phone"></i></span>
                    <span>Phone Number</span>
                </div>
            </router-link>
            </div>
             <div class="mt-3">
                <router-link :to="{name:'MyMentor'}">
                <div class="d-flex px-2 py-1 rounded">
                    <span class="fs-5 me-2"><i class="fas fa-user-graduate"></i></span>
                    <span>My Mentor</span>
                </div>
            </router-link>
            </div>
             <div class="mt-3">
                <router-link :to="{name:'MyInterest'}">
                <div class="d-flex px-2 py-1 rounded">
                    <span class="fs-5 me-2"><i class="fas fa-book-open"></i></span>
                    <span>My Interest</span>
                </div>
            </router-link>
            </div>
             <div class="mt-3">
                <router-link :to="{name:'MyRequest'}">
                <div class="d-flex px-2 py-1 rounded">
                    <span class="fs-5 me-2"><i class="fas fa-question-circle"></i></span>
                    <span>My Request</span>
                </div>
            </router-link>
            </div>
        </div>
        <div class="flex-fill ms-5 mt-2">
              <router-view />
        </div>
    </div>
    <div class="wraper d-md-none px-2">
          <!-- profile picturre -->
        <div class="position-relative d-flex align-items-center">
            <div class="align-self-center">
          <div class="detailProfileCircle rounded-circle mt-4">
        <img
          v-if="!image"
          src="../assets/rolemodel1.jpg"
          alt="admin profile picture"
          class="img-fluid radius-circled"
        />
        <img
          v-else
          id="profileImg"
          alt="admin profile picture"
          class="img-fluid radius-circled"
        />
      </div>
       <input
          type="file"
          class="form-control d-none"
          id="changeProfile"
          ref="profileImage"
          accept="image/.*"
          @change="fileHandler($event)"
        />
      <label for="changeProfile" class="cameraIcon">
        <span class="text-white fs-4"><i class="fas fa-camera"></i></span>
      </label>
            </div>

            <div class="ms-3 me-2 mt-4 text-white">
                <p class="m-0 fw-bold">Ruhama Bekele</p>
                <p class="m-0">Grade 12 student</p>
                <p class="m-0">hav a pasion to be Software Engineer</p>
            </div>
        </div>
          <!-- upload button -->
        <div v-if="image" class="my-3">
            <button
              @click="saveProfileImg()"
              class="btn saveChangeBtn ms-3 px-3 py-1 text-white"
              :disabled="isUploading"
            >
              <span v-if="isUploading">
                <span
                  class="spinner-border spinner-border-sm mx-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span>Saving</span>
              </span>
              <span v-else>Save</span>
            </button>
            <p class="text-danger text-center small">{{ notify }}</p>
          </div>
        <div class="findMentor rounded px-3 py-3 mt-3 text-white">
            <p>Are you looking a mentor,</p>
            <p>for advice in your dream ?</p>
            <button @click="findMentor()" class="btn rounded-pill bg-white text-dark ms-5 mt-3">Find Mentor</button>
        </div>

         <div class="pt-2 mt-3">
                <router-link :to="{name:'AccountSetting'}">
                <div class="d-flex px-3 py-1 rounded">
                    <span class="fs-5 me-2"><i class="fas fa-user-circle"></i></span>
                    <span>Account Detail</span>
                    <span class="ms-auto text-white"><i class="fa-solid fa-angle-right"></i></span>
                </div>
            </router-link>
            </div>
             <div class="mt-3">
                <router-link :to="{name:'SettingPhone'}">
                <div class="d-flex px-3 py-1 rounded ">
                    <span class="fs-5 me-2"><i class="fas fa-phone"></i></span>
                    <span>Phone Number</span>
                    <span class="ms-auto text-white"><i class="fa-solid fa-angle-right"></i></span>
                </div>
            </router-link>
            </div>
             <div class="mt-3">
                <router-link :to="{name:'MentorSetting'}">
                <div class="d-flex px-3 py-1 rounded">
                    <span class="fs-5 me-2"><i class="fas fa-user-graduate"></i></span>
                    <span>My Mentor</span>
                    <span class="ms-auto text-white"><i class="fa-solid fa-angle-right"></i></span>
                </div>
            </router-link>
            </div>
             <div class="mt-3">
                <router-link :to="{name:'InterestSetting'}">
                <div class="d-flex px-3 py-1 rounded">
                    <span class="fs-5 me-2"><i class="fas fa-book-open"></i></span>
                    <span>My Interest</span>
                    <span class="ms-auto text-white"><i class="fa-solid fa-angle-right"></i></span>
                </div>
            </router-link>
            </div>
             <div class="mt-3">
                <router-link :to="{name:'RequestSetting'}">
                <div class="d-flex px-3 py-1 rounded">
                    <span class="fs-5 me-2"><i class="fas fa-question-circle"></i></span>
                    <span>My Request</span>
                    <span class="ms-auto text-white"><i class="fa-solid fa-angle-right"></i></span>
                </div>
            </router-link>
            </div>
            <div class="mt-3 px-3 pb-5">
                <button class="logoutBtn fs-5 text-white">
                    <span><i class="fa-solid fa-right-from-bracket logoutIcon"></i></span>
                    <span class="ms-2">Logout</span>
                </button>
            </div>
    </div>
        
</template>
<script>
import fileApiClient from "../url/fileApi";
// import BottomNav from "@/components/BottomNav.vue";
export default {
    components:{
        // BottomNav
    },
    data() {
        return {
            editInfoModal:null,
            notify:'',
             image: false,
            imageFile: "",
            isUploading:'',
        }
    },
    created() {
      this.$store.dispatch('fetchMyInterests')
    },
    methods: {
        fileHandler(e) {
      var reader = new FileReader();
      reader.onload = function () {
        var output = document.getElementById("profileImg");
        output.src = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.imageFile = e.target.files[0];
      this.image = true;
      console.log('image selected')
    },
     async saveProfileImg(){
    this.isUploading = true
    var formData = new FormData()
    formData.append('profile_photo',this.imageFile)
    try{
      
      var response = await fileApiClient.post('api/change_profile',formData)
      if(response.status === 200){
        this.imageFile = ''
        this.image = false

      }
    }
    finally{
      this.isUploading = false
    }
    },
    findMentor(){
      this.$router.push({name:'Mentors'})
    }
    },
}
</script>
<style scoped>
.wraper{
    max-width: 100%;
    background-color: #0f0e1c;
}
.sideBar{
    min-width: 15%;
}
.active div{
    background-color: #f69f83;
    color: black;
}
a{
  text-decoration: none;
    color: #fff;
}
.detailProfileCircle {
  width: 5rem;
  height: 5rem;
  overflow: hidden;
}
.detailProfileCircle img {
  width: 100%;
  height: 100%;
}
.cameraIcon{
  position: absolute;
  top: 75%;
  left: 4%;
}
.saveChangeBtn{
    background-color: #e7453a;
}
.findMentor{
    background-color: #002f5d;
}
.mobileView{
    width: 100%;
    max-width: 100%;
    height: 100vh;
    overflow: auto;
}
.logoutBtn{
    background: none;
    border: none;
    box-shadow: none!important;
}
.logoutIcon{
transform: rotate(180deg);
}
@media(max-width: 768px){
  .cameraIcon{
  position: absolute;
  top: 75%;
  left: 10%;
}
}
@media(max-width:992px){
    .sideBar{
        min-width: 20%;
    }
}
</style>