<template>

 <div class="px-3 pt-3 position-relative phoneSetting">
  <button @click="$router.back()" class="text-white backBtn fs-4 d-md-none">
              <i class="fas fa-angle-left"></i>
            </button>
        <div v-if="!isPhoneInput && !isCodeInput">
        <div class="text-white d-flex mt-4">
        <p class="me-5">Phone Number</p>
         <p class="me-5">{{user.phone_number}}</p>
       </div>
    <button @click="changePhone()" class="btn rounded-pill mt-4 text-white">Chage Phone Number</button>
    </div>
       
        <div v-if="isPhoneInput" class="px-2 px-lg-5 phoneInput">
         <div :class="{ warning: v$.phone.$error }">
            <label for="phone" class="form-label text-white">Phone Number</label>
            <vue3-phone-input
              class="text-white p-0"
              v-model="phone"
              outlined
              id="phone"
            />
            <span
              v-if="v$.phone.$error && !phone?.isValid"
              class="error-msg mt-1"
            >invalid phone number</span>
          </div>
          <div class="d-flex justify-content-center">
            <button
              @click="sendPhneNumber()"
              class="btn  mt-3 text-white"
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
              <span v-else>Save Change</span>
            </button>
            <p class="text-danger text-center small">{{ notify }}</p>
          </div>
        </div>
        <!-- verify phone -->
        <div v-if="isCodeInput" class="pt-2 px-2 px-lg-5 codeInput">
          <div
            class="text-center text-white py-2 py-md-3"
          >Enter The code we sent to {{phone?.number}} via SMS</div>
          <div class="d-flex me-3 mt-2">
            <input
              type="text"
              class="form-control me-3 me-lg-5"
              maxlength="1"
              id="code1"
              ref="code1"
              v-model="code1"
              @input="setCode($event,'code2')"
            />
            <input
              type="text"
              class="form-control me-3 me-lg-5"
              maxlength="1"
              id="code2"
              ref="code2"
              v-model="code2"
              @input="setCode($event,'code3')"
            />
            <input
              type="text"
              class="form-control me-3 me-lg-5"
              maxlength="1"
              id="code3"
              ref="code3"
              v-model="code3"
              @input="setCode($event,'code4')"
            />
            <input
              type="text"
              class="form-control me-3 me-lg-5"
              maxlength="1"
              id="code4"
              ref="code4"
              v-model="code4"
              @input="setCode($event,'code5')"
            />
            <input
              type="text"
              class="form-control me-3 me-lg-5"
              maxlength="1"
              id="code5"
              ref="code5"
              v-model="code5"
              @input="setCode($event,'code6')"
            />
            <input
              type="text"
              class="form-control me-3 me-lg-5"
              maxlength="1"
              id="code6"
              ref="code6"
              v-model="code6"
              @input="setCode($event,'codeSix')"
            />
          </div>
          <div class="d-flex align-items-center mt-4">
            <div class="text-white me-2">Don't get a code?</div>
            <div class="d-grid gap-2">
              <button @click="resendCode()" class="resendCode" :disabled="resending">
                <span v-if="resending">
                  <span
                    class="spinner-border spinner-border-sm mx-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span>Wait...</span>
                </span>
                <span v-else>Resend Code</span>
              </button>
            </div>
          </div>
          <div class="d-grid gap-2">
            <button
              @click="confirmVerification()"
              class="btn w-100 confirmBtn mt-3 text-white"
              :disabled="verificationCodes?.length < 6"
            >
              <span v-if="isLoading">
                <span
                  class="spinner-border spinner-border-sm mx-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span>Validating</span>
              </span>
              <span v-else>Confirm</span>
            </button>
            <p class="text-danger text-center small">{{ notify }}</p>
          </div>
        </div>
        </div>
</template>
<script>
import apiClient from '../url/index'
import Vue3PhoneInput from "vue3-phone-input";
import useValidate from "@vuelidate/core";
import { required, helpers} from "@vuelidate/validators";
export default {
    components:{
        Vue3PhoneInput
    },
    data() {
        return {
          v$:useValidate(),
             code1: "",
             code2: "",
             code3: "",
             code4: "",
             code5: "",
             code6: "",
             verificationCodes: [],
             phone:'',
            resending:false,
            isPhoneInput:false,
            isCodeInput:false,
            isLoading:false,
            notify:'',

             
        }
    },
    validations(){
      return{
        phone:{
          required:helpers.withMessage('phone no number is required',required)
        }
      }
    },
    computed:{
      user(){
        return this.$store.getters.user
      }

          },
    methods: {
          setCode(event, elementId) {
      if (elementId !== "codeSix" && event.target.value) {
        window.requestAnimationFrame(() => {
          this.$refs[elementId].focus();
          this.verificationCodes.push(event.target.value);
        });
      } else {
        document.getElementById("code6").blur();
        this.verificationCodes.push(event.target.value);
        console.log("length of code = ", this.verificationCodes.length);
      }
    },
     async resendCode() {
      try {
        this.resending = true;
        await apiClient.post("user/resend", {
          phone_number: this.phone.number
        });
        
      } finally {
        this.resending = false;
      }
    },
    changePhone(){
      this.isPhoneInput = true
    },
   async sendPhneNumber(){    
    try {
        this.isLoading = true
        var response = await apiClient.post("user/change_phone", {
          new_phone_number: this.phone?.number
        });
        if (response.status === 201) {
          this.isPhoneInput = false
         this.isCodeInput = true
        }
        if(response.status === 200){
          this.notify = 'faild to send verification code, try again'
        }
      } finally {
        this.isLoading = false;
      }
    
    },
      async confirmVerification() {
      if (this.verificationCodes.length * 1 === 6) {
        this.isLoading = true;
        var credential = {
          otp: this.verificationCodes.join(""),
          phone_number: this.phone.number
        };
        try {
          var response = await apiClient.post("user/verify_phone", credential);
          if (response.status === 200) {
            this.isCodeInput = false
            var editedUser = this.user
          editedUser.phone_number = this.phone.number
          localStorage.setItem('supUser',JSON.stringify(editedUser))
          this.$store.commit('setUser',editedUser)
            this.$toast.success(`your phone number is changed successfully`);            
          }
        } finally {
          this.isLoading = false;
        }
      }
    },
    backToPhoneInput(){
    this.isCodeInput = false
    this.isPhoneInput = true
    }
    },
}
</script>
<style scoped>
.phoneSetting{
  padding-bottom: 80%;
}
.btn{
    background-color: #e7453a;
    box-shadow: none!important;
}
.btn:hover{
    background-color: #f91b0b;
}
.backBtn {
  background: none;
  border: none;
  box-shadow: none !important;
}
.phoneInput{
  position: absolute;
  min-width: 96%;
  max-width: 96%;
  top: 13%;
  background-color:#0f0e1c;
}
input{
  background-color: #0f0e1c;
  color: #fff;
}
.codeInput{
   position: absolute;
  min-width: 96%;
  max-width: 96%;
  top: 13%;
  background-color:#0f0e1c;
}
.resendCode{
  color: #e7453a;
}
@media(max-width: 768px){
  .btn{
    width: 100%;
  }
}
@media(min-width: 768px){
  .phoneSetting{
  padding-bottom: 25%;
}
}

</style>