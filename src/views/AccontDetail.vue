<template>
  <div class="bigWraper">
        <div class="px-3 py-3 px-lg-5">
          <div class="d-flex d-md-none">
            <button @click="$router.back()" class="text-white backBtn fs-4">
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="text-white fw-bold ms-auto me-auto">Edit Info</div>
          </div>
          <!-- profile picturre -->
        <div class="position-relative">
          <div class="detailProfileCircle rounded-circle mt-4">
        <img
          v-if="!image"
          :src="user?.profile_picture"
          alt="admin profile picture"
          class="img-fluid radius-circled"
        />
        <img
          v-else
          id="profile_img"
          alt="admin profile picture"
          class="img-fluid radius-circled"
        />
      </div>
       <input
          type="file"
          class="form-control d-none"
          id="editprofile"
          ref="profileImage"
          accept="image/.*"
          @change="fileHandler($event)"
        />
      <label for="editprofile" class="cameraIcon">
        <span class="text-white fs-4"><i class="fas fa-camera"></i></span>
      </label>
        </div>
        <!-- upload button -->
        <div v-if="image" class="d-flex">
            <button
              @click="saveProfileImage()"
              class="btn saveChangeBtn mt-3 px-3 py-1 text-white"
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
        <!-- <button class="btn mt-3 py-1 px-3">SAve</button> -->
          <div class="mb-3 mt-3" :class="{ warning: v$.user.first_name.$error }">
            <label for="fname" class="form-label text-white">First Name</label>
            <input class="form-control form-control-sm" type="text" id="fname" aria-label="default input example" v-model="user.first_name" />
             <span class="error-msg mt-1">
              {{
              v$.user.first_name.$errors[0]?.$message
              }}
            </span>
          </div>
          <div class="mb-3" :class="{ warning: v$.user.last_name.$error }">
            <label for="lname" class="form-label text-white">Last Name</label>
            <input
              class="form-control form-control-sm"
              type="text"
              id="lname"
              aria-label="default input example"
              v-model="user.last_name"
            />
            <span class="error-msg mt-1">
              {{
              v$.user.last_name.$errors[0]?.$message
              }}
            </span>
          </div>
          <div class="mb-3" :class="{ warning: v$.user.date_of_birth.$error }">
            <label for="dob" class="form-label text-white">Birth Date</label>
            <input
              class="form-control form-control-sm"
              type="date"
              id="dob"
              aria-label="default input example"
              v-model="user.date_of_birth"
            />
            <span class="error-msg mt-1">
              {{
              v$.user.date_of_birth.$errors[0]?.$message
              }}
            </span>
          </div>
          <div class="mb-3" :class="{ warning: v$.user.education_level_id.$error }">
            <label for="educationLevel" class="form-label text-white">Education Level</label>
            <select
              class="form-select form-select-sm text-white"
              id="educationLevel"
              aria-label="Default select example"
              v-model="user.education_level_id"
            >
              <option
                v-for="eduLeble in educationLebles"
                :key="eduLeble.id"
                :value="eduLeble.id"
              >{{eduLeble?.level}}</option>
            </select>
            <span class="error-msg mt-1">
              {{
              v$.user.education_level_id.$errors[0]?.$message
              }}
            </span>
          </div>
                <div class="mb-3">
            <label for="dob" class="form-label text-white">Bio</label>
            <input
              class="form-control form-control-sm"
              type="text"
              id="bio"
              aria-label="default input example"
              v-model="user.bio"
            />
          </div>
           <div class="mb-3">
            <p class="text-white">Interested In</p>
            <span v-for="interest in myInterests" :key="interest.id" class="text-white bbottom mt-2">{{interest.title}},</span>
          </div>
          <div class="d-flex">
            <button
              @click="saveChange()"
              class="btn saveChangeBtn mt-3 text-white ms-auto"
              :disabled="isLoading"
            >
              <span v-if="isLoading">
                <span
                  class="spinner-border spinner-border-sm mx-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span>Saving</span>
              </span>
              <span v-else>Save Changes</span>
            </button>
            <p class="text-danger text-center small">{{ notify }}</p>
          </div>
        </div>
  </div>
</template>
<script>
import apiClient from "../url/index";
import fileApiClient from "../url/fileApi";
import useValidate from "@vuelidate/core";
import { required, helpers} from "@vuelidate/validators";
export default {
  data() {
    return {
      v$:useValidate(),
       isLoading:false,
      notify:'',
      image: false,
      imageFile: "",
      isUploading:false,

    };
  },
   validations() {
    return {
      user: {
        first_name: {
          required: helpers.withMessage("first name can not be empty", required)
        },
        last_name: {
          required: helpers.withMessage("last name can not be empty", required)
        },   
        date_of_birth: {
          required: helpers.withMessage("birth date is required", required)
        },
        education_level_id: {
          required: helpers.withMessage(
            "your education level is required",
            required
          )
        }
      },
    }
  },
  created() {
    
    
  },
  computed:{
     educationLebles() {
      return this.$store.getters.educationLebles;
    },
     user() {
      return this.$store.getters.user;
    },
     myInterests() {
      return this.$store.getters.myInterests;
    },
    
  },
   methods: {
     fileHandler(e) {
      var reader = new FileReader();
      reader.onload = function () {
        var output = document.getElementById("profile_img");
        output.src = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.image = true;
      this.imageFile = e.target.files[0];
    },
   async saveProfileImage(){
    this.isUploading = true
    var formData = new FormData()
    formData.append('profile',this.imageFile)
    try{
      
      var response = await fileApiClient.post('user/change_profile_picture',formData)
      if(response.status === 200){
        this.imageFile = ''
        this.image = false
        localStorage.setItem('supUser',response.data)
        this.$store.commit('setUser',response.data)
        // this.$toast.success('your profile photo is changed successfully')

      }
    }
    finally{
      this.isUploading = false
    }
    },
        async saveChange() {
      this.v$.user.$validate();
      this.isLoading = true
        try {
          var response = await apiClient.post("user/update_profile", this.user);
          if (response.status === 200) {
            localStorage.setItem('supUser',response.data)
            this.$store.commit('setUser',response.data)
            console.log('success')
          }
        } catch (err) {
          console.log(err);
        }
        finally{
          this.isLoading = false
        }
    },
    },
};
</script>
<style scoped>
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
input,select {
  border-radius: 0%;
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: #0f0e1c;
  color: #fff!important;
  box-shadow: none !important;
}
.bbottom{
  border-bottom: 1px solid #fff;
}
input:focus {
  background-color: #0f0e1c;
  color: #fff!important;
}
.btn{
    background-color: #e7453a;
}
.btn:hover{
    background-color: #f71909;
}
@media(max-width: 768px){
  .saveChangeBtn{
    width: 100%;
  }
  .cameraIcon{
  position: absolute;
  top: 75%;
  left: 10%;
}
}
</style>