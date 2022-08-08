<template>
    <div class="wraper px-3 py-5 text-white">
      <p class="fw-bold fs-4">Please fill the following forms carefully to be a mentor</p> 
      <div class="mb-3 mt-3" :class="{ warning: v$.mentor.first_name.$error }">
  <label for="fname" class="form-label">First Name</label>
  <input type="text" class="form-control text-white" id="fname" v-model="mentor.first_name">
  <span class="error-msg mt-1">{{v$.mentor.first_name.$errors[0]?.$message}}</span>
</div> 
  <div class="mb-3" :class="{ warning: v$.mentor.last_name.$error }">
  <label for="lname" class="form-label">Last Name</label>
  <input type="text" class="form-control text-white" id="lname" v-model="mentor.last_name">
  <span class="error-msg mt-1">{{v$.mentor.last_name.$errors[0]?.$message}}</span>
</div> 
<div class="mb-3" :class="{ warning: v$.mentor.date_of_birth.$error }">
  <label for="dob" class="form-label">Date of Birth</label>
  <input type="date" class="form-control text-white" id="dob" v-model="mentor.date_of_birth">
  <span class="error-msg mt-1">{{v$.mentor.date_of_birth.$errors[0]?.$message}}</span>
</div>
  <div class="mb-3" :class="{ warning: v$.mentor.phone_number.$error }">
  <label for="phoneno" class="form-label">Phone Number</label>
  <input type="tel" class="form-control text-white" id="phoneno" v-model="mentor.phone_number">
  <span class="error-msg mt-1">{{v$.mentor.phone_number.$errors[0]?.$message}}</span>
</div> 
  <div class="mb-3" :class="{ warning: v$.mentor.email.$error }">
  <label for="email" class="form-label">Email</label>
  <input type="email" class="form-control text-white" id="email" v-model="mentor.email">
  <span class="error-msg mt-1">{{v$.mentor.email.$errors[0]?.$message}}</span>
</div> 
<div class="mb-3" :class="{ warning: v$.mentor.bio.$error }">
  <label for="personality" class="form-label">Describe your Strangth in short</label>
  <textarea class="form-control text-white" style="height:auto" id="personality" rows="3" v-model="mentor.bio"></textarea>
  <span class="error-msg mt-1">{{v$.mentor.bio.$errors[0]?.$message}}</span>
</div>
 <div class="d-flex">
            <button
              @click="registoreMentor()"
              class="btn confirmBtn mt-3 text-white ms-auto px-5"
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
              <span v-else>Save</span>
            </button>
            <p class="text-danger text-center small">{{ notify }}</p>
          </div>
    </div>
    <div class="modal" tabindex="-1" id="successModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="fs-4 fw-bold text-success">You have registered successfully</div>
      <p>We will see your request</p>
      please download the mobil application from <a href="">download the mobile application from here</a>
      <p class="fw-bold"><i>Thank You</i></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, helpers,email } from "@vuelidate/validators";
import apiClient from '@/url/index';
import { Modal } from "bootstrap";
export default {
  data() {
    return {
      v$:useValidate(),
      mentor:{},
    isLoading:false,
    successModal:null,
    }
  },
  validations(){
    return{
      mentor:{
        first_name:{
          required:helpers.withMessage('first name is required',required)
        },
         last_name:{
          required:helpers.withMessage('last name is required',required)
        },
         bio:{
          required:helpers.withMessage('please describe your self',required)
        },
        date_of_birth:{
          required:helpers.withMessage('please select your date of birth',required)
        },
         phone_number:{
          required:helpers.withMessage('phone number is required',required)
        },
         email:{
          required:helpers.withMessage('email is required',required),
          email
        }
      }
    }
  },
  mounted() {
    this.successModal = new Modal(document.getElementById('successModal'))
  },
methods: {
   async registoreMentor(){
    this.v$.mentor.$validate()
    if(!this.v$.mentor.$error){
      this.isLoading =true
      try{
      var response = await apiClient.post('mentor/register',this.mentor)
      if(response.status === 201){
        this.successModal.show()
        this.mentor = {}
        this.v$.$reset()
        
      }
      }
      catch(err){
         this.notify = 'faild to save, please try again'
      }
      finally{
        this.isLoading = false
      }
    }
  }
},
    
}
</script>
<style scoped>
.wraper{
 width: 100%;
}
input,textarea{
  background-color: #0f0e1c;
  color: #fff;
}
input:focus,textarea:focus{
   background-color: #0f0e1c;
}
.confirmBtn{
  background-color: #e7433a;
}
.warning input {
  border: 1px red solid;
}
.warning span {
  display: inline;
  color: red;
}
@media(max-width: 576px){
  .confirmBtn{
    width: 100%;
    margin: auto;
  }
}
@media(min-width: 768px){
  .wraper{
    width: 80%;
    margin: auto;
  }
}
@media(min-width: 992px){
  .wraper{
    width: 50%;
    margin: auto;
  }
}

</style>