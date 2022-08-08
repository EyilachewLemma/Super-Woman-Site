<template>
 <div class="wraper py-5">
        <div v-if="isLogin" class="signIn border rounded shadow-sm  p-4">
          <div class="d-flex">
            <button @click="$router.back()" class="text-white backBtn fs-4">
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="text-white fs-5 ms-auto me-auto">Sign In</div>
          </div>
          <p class="text-white text-center fs-4 fw-bold mt-3">Welcome to Super Woman</p>
          <div class="mt-3" :class="{ warning: v$.phone.$error }">
            <label for="loginphone" class="form-label text-white">Phone Number</label>
            <vue3-phone-input class="text-white p-0" v-model="phone" outlined id="loginphone" />
            <span
              v-if="v$.phone.$error && !phone?.isValid"
              class="error-msg mt-1"
            >invalid phone number</span>
          </div>
          <p class="text-white mt-3">We will call or text to confirm your phone number</p>
          <div class="form-check mt-3">
            <input class="form-check-input" type="checkbox" id="rememberMe" v-model="rememberMe" />
            <label class="form-check-label text-white" for="rememberMe">Remember me</label>
          </div>
          <div class="d-grid gap-2">
            <button
              @click="login()"
              class="btn w-100 confirmBtn mt-3 text-white"
              :disabled="isLoading"
            >
              <span v-if="isLoading">
                <span
                  class="spinner-border spinner-border-sm mx-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span>Wait...</span>
              </span>
              <span v-else>Login</span>
            </button>
            <p class="text-danger text-center small">{{ notify }}</p>
          </div>
          <div class="d-flex mt-3">
            <p class="text-white me-2">Don't have an account?</p>
            <button @click="gotoSignup()" class="profBtn insteadSignUp">Sign Up</button>
          </div>
          <div class="d-flex align-items-center mt-4">
            <div class="borderBottom flex-fill"></div>
            <p class="text-white ms-5 flex-fill">or sign in with</p>
            <div class="borderBottom flex-fill"></div>
          </div>
          <div class="d-flex justify-content-between mt-3">
            <div class="border rounded loginWith p-2 me-5">
              <img src="../assets/facebooklogo.jpg" class="img-fluid" alt="facebook logo" />
            </div>
            <div class="border rounded loginWith p-2 me-5">
              <img src="../assets/googlelogo.png" class="img-fluid" alt="google logo" />
            </div>
            <div class="border rounded loginWith p-2">
              <img src="../assets/linkedinlogo.jpg" class="img-fluid" alt="linkedin logo" />
            </div>
          </div>
        </div>
    <!-- phone number verification for sign in -->
    <base-modal id="loginConfirmModal">
      <template #modalBody>
        <div class="px-2 py-3 px-lg-4">
          <div class="d-flex">
            <button @click="backToLoginInfoModal()" class="text-white backBtn fs-4">
              <i class="fas fa-angle-left"></i>
            </button>
            <div class="text-white fs-5 ms-auto me-auto">Sign In</div>
          </div>
          <div
            class="text-center text-white my-3"
          >Enter The code we sent to {{phone?.number}} via SMS</div>
          <div class="d-flex me-3">
            <input
              type="text"
              class="form-control me-1 me-lg-3"
              maxlength="1"
              id="loginCode1"
              ref="loginCode1"
              v-model="code1"
              @input="setLoginCode($event,'loginCode2')"
            />
            <input
              type="text"
              class="form-control me-1 me-lg-3"
              maxlength="1"
              id="loginCode2"
              ref="loginCode2"
              v-model="code2"
              @input="setLoginCode($event,'loginCode3')"
            />
            <input
              type="text"
              class="form-control me-1 me-lg-3"
              maxlength="1"
              id="loginCode3"
              ref="loginCode3"
              v-model="code3"
              @input="setLoginCode($event,'loginCode4')"
            />
            <input
              type="text"
              class="form-control me-1 me-lg-3"
              maxlength="1"
              id="loginCode4"
              ref="loginCode4"
              v-model="code4"
              @input="setLoginCode($event,'loginCode5')"
            />
            <input
              type="text"
              class="form-control me-1 me-lg-3"
              maxlength="1"
              id="loginCode5"
              ref="loginCode5"
              v-model="code5"
              @input="setLoginCode($event,'loginCode6')"
            />
            <input
              type="text"
              class="form-control"
              maxlength="1"
              id="loginCode6"
              ref="loginCode6"
              v-model="code6"
              @input="setLoginCode($event,'loginCodeSix')"
            />
          </div>
          <div class="d-flex align-items-center mt-4">
            <div class="text-white me-2">Don't get a code?</div>
            <div class="d-grid gap-2">
              <button @click="resendLoginCode()" class="resendCode" :disabled="resending">
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
              @click="confirmLoginVerification()"
              class="btn w-100 confirmBtn mt-3 text-white"
              :disabled="isDisabled"
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
      </template>
    </base-modal>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { Modal } from "bootstrap";
import apiClient from "../url/index";
import fileApiClient from "../url/fileApi";
import Vue3PhoneInput from "vue3-phone-input";
export default {
    components:{
        Vue3PhoneInput
    },
    data() {
    return {
      v$: useValidate(),
      loginConfirmModal: null,
      isLogin:true,
      userInfo: {},
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
      verificationCodes: [],
      isLoading: false,
      resending: false,
      notify: "",
      phone: "",
      rememberMe: true
    };
  },
  validations() {
    return {
      phone: {
        required: helpers.withMessage("phone number required", required)
      }
    };
  },
    mounted() {
    this.loginConfirmModal = new Modal(document.getElementById("loginConfirmModal"));
  },
  watch: {
    rememberMe(value) {
      localStorage.setItem("remember", value);
    }
  },
  methods: {
    gotoSignup() {
      this.$router.push({name:'SignUp'})
    },
    async login() {
      this.isLoading = true;
      try {
        var response = await apiClient.post("user/login", {
          phone_number: this.phone?.number
        });
        if (response.status === 201) {
          this.isLogin = false;
          this.loginConfirmModal.show();
          window.requestAnimationFrame(() => {
            this.$refs["codeOne"].focus();
          });
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.access_token}`;
          localStorage.setItem("tokenu", response.data.access_token);
          console.log("user loged in = ", response.data);
        }
        if (response.status === 200) {
          this.notify = "faild to send verification code";
        }
      } finally {
        this.isLoading = false;
      }
    },
     backToLoginInfoModal() {
      this.loginConfirmModal.hide();
      this.logIninfoModal.show();
    },
     async resendLoginCode() {
      this.emptyCode()
      try {
        this.resending = true;
        var response = await apiClient.post("user/resend", {
          phone_number: this.phone?.number
        });
        if (response.status === 200) {
          console.log("code resent");
        }
      } finally {
        this.resending = false;
      }
    },
     setLoginCode(event, elementId) {
      if (elementId != "loginCodeSix" && event.target.value) {
        window.requestAnimationFrame(() => {
          this.$refs[elementId].focus();
          this.verificationCodes.push(event.target.value);
          console.log("length of code = ", this.verificationCodes.length);
          console.log("entered value =", event.target.value);
        });
      } else if (elementId === "loginCodeSix") {
        document.getElementById("code6").blur();
        this.verificationCodes.push(event.target.value);
        this.isDisabled = false;
        console.log("length of code = ", this.verificationCodes.length);
      }
    },
    async confirmLoginVerification() {
      this.verificationCodes = []
      this.verificationCodes.push(this.code1)
      this.verificationCodes.push(this.code2)
      this.verificationCodes.push(this.code3)
      this.verificationCodes.push(this.code4)
      this.verificationCodes.push(this.code5)
      this.verificationCodes.push(this.code6)
      if (this.verificationCodes.length * 1 === 6) {
        this.isLoading = true;
        var credential = {
          otp: this.verificationCodes.join(""),
          phone_number: this.phone?.number
        };
        try {
          var response = await apiClient.post("user/verify_phone", credential);
          if (response.status === 200) {
            this.saveUserData(response);
            this.loginConfirmModal.hide();
            var topath = this.$route.query.to || "/";
            this.$router.push(topath);
          }
        } finally {
          this.isLoading = false;
        }
      }
    },
    saveUserData(response) {
      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
      fileApiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
      this.$store.commit("setUser", response.data.user);
      this.$store.commit("setIsAuthenticated", true);
      let user = response.data.user;

      localStorage.setItem("tokenu", response.data.access_token);
      localStorage.setItem("supUser", JSON.stringify(user));
      localStorage.setItem("isLegalUser", true);

      let toPath = this.$route.query.to || "/";
      this.$router.push(toPath);
    },
    emptyCode(){
      this.verificationCodes = [];
      this.isDisabled = true;
       this.code1= "";
      this.code2 = "";
      this.code3 = "";
      this.code4 = "";
      this.code5 = "";
      this.code6 = "";
    },
  },
}
</script>
<style scoped>
.wraper{
    width: 100%;
  height: 100vh;  
background-color: #0f0e1c;
}
.signIn{
  width: 100%;
  margin: auto;
   background-color: #1d213a;
}
input,
select {
  background-color: #1d213a;
  color: #fff;
}
.backBtn {
  background: none;
  border: none;
  box-shadow: none !important;
}
.resendCode {
  color: #f4480a;
  background: none;
  border: none;
}
.confirmBtn {
  background-color: #f4480a;
  color: #fff;
  border-radius: 10rem;
}
.warning input {
  border: 1px red solid;
}
.warning span {
  display: inline;
  color: red;
}
.insteadSignUp {
  color: #e7453a;
}
#rememberMe {
  background-color: #e7453a;
}
.borderBottom {
  border-bottom: 1px solid #fff;
}
.loginWith img {
  max-width: 30%;
  margin: auto;
}
@media(min-width: 768px){
  .signIn{
  width: 50%;
  margin: auto;
}
}
@media(min-width: 992px){
  .signIn{
  width: 30%;
  margin: auto;
}
}
</style>