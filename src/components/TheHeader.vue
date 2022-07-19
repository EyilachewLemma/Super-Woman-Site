<template>
  <nav class="d-none d-md-block border-1">
    <img src="../assets/NavigationImage.png" alt class="navBakgound img-fluid" />
    <div class="naveContainer d-flex align-item-center justify-content-between px-2 px-lg-5">
      <div>
        <router-link to="#" class="d-flex">
          <img src="../assets/logo.png" alt="logo" class="img-fluid logo me-2" />
          <img src="../assets/brand.png" alt="logo marker" class="img-fluid logoMarker" />
        </router-link>
      </div>
      <div class="d-flex mt-2">
        <router-link to="#" class="text-white text-decoration-none me-4">Role Models</router-link>
        <router-link to="#" class="text-white text-decoration-none">Blog</router-link>
      </div>
      <div class="d-flex align-items-center">
        <router-link to="#" class="text-white text-decoration-none">Become a Mentor</router-link>

        <div class="dropdown ms-4">
          <button
            class="btn langBtn dropdown-toggle"
            type="button"
            id="languageDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span class="fs-5 text-white">
              <i class="fas fa-globe"></i>
            </span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="languageDropdown">
            <li>
              <a class="dropdown-item" href="#">English</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">አማርኛ</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">Affan Oromo</a>
            </li>
          </ul>
        </div>
       <!-- <div class="dropdown p-0 ms-4">
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
            <li>
              <router-link to="#" class="text-white">My Account</router-link>
            </li>
            <li>
              <button class="text-white">Logout</button>
            </li>
          </ul>
        </div> -->
        <button @click="gotoLogin()" class="profBtn text-white ms-2 me-2">Login</button>
        <button @click="gotoSignup()" class="profBtn text-white">SignUp</button>
      </div>
    </div>
  </nav>
  <!-- for only small device -->
  <nav class="smallNav d-md-none">
    <div class="d-flex align-items-center justify-content-between px-3">
      <div class="mt-3">
        <router-link to="#" class="d-flex">
          <img src="../assets/logo.png" alt="logo" class="img-fluid logo me-2" />
          <img src="../assets/brand.png" alt="logo marker" class="img-fluid logoMarker" />
        </router-link>
      </div>
      <div class="dropdown ms-auto mt-2">
        <button
          class="btn langBtn dropdown-toggle"
          type="button"
          id="languageDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="fs-5 text-white">
            <i class="fas fa-globe"></i>
          </span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="languageDropdown">
          <li>
            <a class="dropdown-item" href="#">Action</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Another action</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Something else here</a>
          </li>
        </ul>
      </div>
       <button @click="gotoLogin()" class="profBtn text-white ms-2 me-2">Login</button>
        <button @click="gotoSignup()" class="profBtn text-white">SignUp</button>
    </div>
  </nav>
  <!-- sign up code -->
  <div class="signUp">
    <base-modal id="infoModal">
      <template #modalBody>
        <div class="px-2 py-3 px-lg-5">
          <div class="d-flex">
            <button @click="infoModal.hide()" class="text-white backBtn fs-4">
              <i class="fas fa-times"></i>
            </button>
            <div class="text-white fs-5 ms-auto me-auto">Sign Up</div>
          </div>
          <div class="mb-3" :class="{ warning: v$.userInfo.first_name.$error }">
            <label for="fname" class="form-label text-white">First Name</label>
            <input
              class="form-control"
              type="text"
              id="fname"
              aria-label="default input example"
              v-model="userInfo.first_name"
            />
            <span class="error-msg mt-1">
              {{
              v$.userInfo.first_name.$errors[0]?.$message
              }}
            </span>
          </div>
          <div class="mb-3" :class="{ warning: v$.userInfo.last_name.$error }">
            <label for="lname" class="form-label text-white">Last Name</label>
            <input
              class="form-control"
              type="text"
              id="lname"
              aria-label="default input example"
              v-model="userInfo.last_name"
            />
            <span class="error-msg mt-1">
              {{
              v$.userInfo.last_name.$errors[0]?.$message
              }}
            </span>
          </div>
          <div class="mb-3" :class="{ warning: v$.userInfo.date_of_birth.$error }">
            <label for="dob" class="form-label text-white">Birth Date</label>
            <input
              class="form-control"
              type="date"
              id="dob"
              aria-label="default input example"
              v-model="userInfo.date_of_birth"
            />
            <span class="error-msg mt-1">
              {{
              v$.userInfo.date_of_birth.$errors[0]?.$message
              }}
            </span>
          </div>
          <div class="mb-3" :class="{ warning: v$.userInfo.education_level_id.$error }">
            <label for="educationLevel" class="form-label text-white">Education Level</label>
            <select
              class="form-select text-white"
              id="educationLevel"
              aria-label="Default select example"
              v-model="userInfo.education_level_id"
            >
              <option
                v-for="eduLeble in educationLebles"
                :key="eduLeble.id"
                :value="eduLeble.id"
              >{{eduLeble?.level}}</option>
            </select>
            <span class="error-msg mt-1">
              {{
              v$.userInfo.education_level_id.$errors[0]?.$message
              }}
            </span>
          </div>
          <div :class="{ warning: v$.userInfo.phone_no.$error }">
            <label for="phone" class="form-label text-white">Phone Number</label>
           <vue3-phone-input class="text-white p-0" v-model="userInfo.phone_no" outlined id="phone" />
           <span v-if="v$.userInfo.phone_no.$error && !userInfo.phone_no?.isValid" class="error-msg mt-1">invalid phone number</span>
          </div>
                    <div class="d-grid gap-2">
            <button
              @click="registerUser()"
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
              <span v-else>Next</span>
            </button>
            <p class="text-danger text-center small">{{ notify }}</p>
          </div>
          <!-- <button @click="registerUser()" class="btn w-100 confirmBtn mt-3">Next</button> -->
        </div>
      </template>
    </base-modal>
    <!-- phone number confirmation modal-->
    <base-modal id="confirmModal">
      <template #modalBody>
        <div class="px-2 py-3 px-lg-4">
          <div class="d-flex">
            <button @click="backToInfoModal()" class="text-white backBtn fs-4">
              <i class="fas fa-angle-left"></i>
            </button>
            <div class="text-white fs-5 ms-auto me-auto">Sign Up</div>
          </div>
          <div class="text-center text-white my-3">Enter The code we sent to {{userInfo.phone_no?.number}} via SMS</div>
          <div class="d-flex me-3">
            <input
              type="text"
              class="form-control me-3"
              maxlength="1"
              id="code1"
              ref="code1"
              v-model="code1"
              @input="setCode($event,'code2')"
            />
            <input
              type="text"
              class="form-control me-3"
              maxlength="1"
              id="code2"
              ref="code2"
              v-model="code2"
              @input="setCode($event,'code3')"
            />
            <input
              type="text"
              class="form-control me-3"
              maxlength="1"
              id="code3"
              ref="code3"
              v-model="code3"
              @input="setCode($event,'code4')"
            />
            <input
              type="text"
              class="form-control me-3"
              maxlength="1"
              id="code4"
              ref="code4"
              v-model="code4"
              @input="setCode($event,'code5')"
            />
            <input
              type="text"
              class="form-control me-3"
              maxlength="1"
              id="code5"
              ref="code5"
              v-model="code5"
              @input="setCode($event,'code6')"
            />
            <input
              type="text"
              class="form-control me-3"
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
            <button
              @click="resendCode()"
              class="resendCode"
              :disabled="resending"
            >
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
  <!-- interest selection modal -->
  <div v-if="isFieldModal" class="fieldSelectionModal">
    <div class="fieldContainer rounded shadow-sm px-2 pt-3 pb-5">
      <div class="d-flex">
        <button @click="isFieldModal = false" class="text-white fw-bold fs-4 backBtn">
          <i class="fas fa-times"></i>
        </button>
        <div class="text-white fs-5 ms-auto me-auto">Sign Up</div>
      </div>
      <p
        class="text-center text-white mt-3"
      >Choose your interests and get the best Mentore recommendation.</p>
      <p class="text-center text-white">Don't Worry you can change it later</p>
      <div class="row px-2 px-lg-4">
        <div
          class="col-sm-6 col-md-3 ms-lg-3 me-3 me-lg-5 mt-3"
          v-for="(field,index) in fields"
          :key="field.id"
        >
          <p
            @click="selectInterest(field.id,'interest'+index)"
            class="border interestselection rounded-pill text-center p-2 text-white"
            :id="'interest'+index"
          >{{field.title}}</p>
        </div>
      </div>
      <div class="d-grid gap-2 px-3 px-lg-5 mt-3">
        <button @click="setInterest()"
          class="btn w-100 confirmBtn text-white"
          :disabled="isDisabled"
        >
          <span v-if="isLoading">
            <span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
            <span>Saving</span>
          </span>
          <span v-else>Finish</span>
        </button>
        <p class="text-danger text-center small">{{ notify }}</p>
      </div>
    </div>
  </div>
  <!-- sign up end -->
   <!-- signin modale -->
  <div class="signIn">
    <base-modal id="logIninfoModal">
      <template #modalBody>
        <div class="px-2 py-3 px-lg-5">
          <div class="d-flex">
            <button @click="logIninfoModal.hide()" class="text-white backBtn fs-4">
              <i class="fas fa-times"></i>
            </button>
            <div class="text-white fs-5 ms-auto me-auto">Sign In</div>
          </div>
          <p class="text-white mt-5">Welcome to Super Woman</p>
          <div class="mt-3" :class="{ warning: v$.phone.$error }">
            <label for="loginphone" class="form-label text-white">Phone Number</label>
            <vue3-phone-input
              class="text-white p-0"
              v-model="phone"
              outlined
              id="loginphone"
            />
            <span
              v-if="v$.phone.$error && !phone?.isValid"
              class="error-msg mt-1"
            >invalid phone number</span>
          </div>
          <p class="text-white mt-3">We will call or text to confirm your phone number </p>
          <div class="form-check mt-3">
  <input class="form-check-input" type="checkbox" id="rememberMe" v-model="rememberMe">
  <label class="form-check-label text-white" for="rememberMe">
    Remember me
  </label>
</div>
          <div class="d-grid gap-2">
            <button
              @click="confirmPhoneToLogin()"
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
              <span v-else>Continue</span>
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
      </template>
    </base-modal>
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
import { required, helpers} from "@vuelidate/validators";
import { Modal } from "bootstrap";
import apiClient from "../url";
import Vue3PhoneInput from "vue3-phone-input";
export default {
  components: {
    Vue3PhoneInput
  },
  data() {
    return {
      v$: useValidate(),
      infoModal: null,
      confirmModal: null,
      logIninfoModal:null,
      loginConfirmModal:null,
      userInfo: {},
      interests: [],
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
      isDisabled: true,
      isFieldModal: false,
      verificationCodes: [],
      isLoading: false,
      resending:false,
      notify: "",
      selectedFields: [],
      phone:'',
      rememberMe:'',
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
        phone_no: {
          required: helpers.withMessage("phone number can not be empty",required)
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
        phone: {
          required: helpers.withMessage("phone number required",required),
    }
    };
  },
  beforeCreate() {
    this.$store.dispatch("fetchEducationLebles");
  },
  mounted() {
    this.infoModal = new Modal(document.getElementById("infoModal"));
    this.confirmModal = new Modal(document.getElementById("confirmModal"));
     this.logIninfoModal = new Modal(document.getElementById("logIninfoModal"));
     this.loginConfirmModal = new Modal(document.getElementById("loginConfirmModal"));
  },
  computed: {
    educationLebles() {
      return this.$store.getters.educationLebles;
    },
    fields() {
      return this.$store.getters.fields;
    }
  },
  methods: {
    gotoSignup() {
      this.infoModal.show();
    },
    async registerUser() {
      this.v$.userInfo.$validate();
      if (!this.v$.userInfo.$error && this.userInfo.phone_no?.isValid) {
        this.userInfo.phone_number = this.userInfo.phone_no.number;
        try {
          var response = await apiClient.post("user/register", this.userInfo);
          if (response.status === 201) {
            this.infoModal.hide();
            this.confirmModal.show();
          }
        } catch (err) {
          console.log(err);
        }
      }
  
    },
    backToInfoModal() {
      this.confirmModal.hide();
      this.infoModal.show();
    },
    setCode(event, elementId) {
      if (elementId !== "codeSix" && event.target.value) {
        window.requestAnimationFrame(() => {
          this.$refs[elementId].focus();
          this.verificationCodes.push(event.target.value);
          console.log("length of code = ", this.verificationCodes.length);
        });
      } else if (elementId === "codeSix") {
        document.getElementById("code6").blur();
        this.verificationCodes.push(event.target.value);
        this.isDisabled = false;
        console.log("length of code = ", this.verificationCodes.length);
      }
    },
    async resendCode(){
      try{
        this.resending = true
       var response = await apiClient.post("user/resend",{phone_number: this.userInfo.phone_no.number});
          if (response.status === 200) {
            localStorage.setItem("tokenu", response.data.access_token);
          }
        } finally {
          this.resending = false;
        }
    },
    async confirmVerification() {
      if (this.verificationCodes.length * 1 === 6) {
        this.isLoading = true;
        var credential = {
          otp: this.verificationCodes.join(""),
          phone_number: this.userInfo.phone_no.number
        };
        try {
          this.confirmModal.hide();
          this.isFieldModal = true;
          var response = await apiClient.post("user/verify_phone", credential);
          if (response.status === 200) {
            localStorage.setItem("tokenu", response.data.access_token);
            this.confirmModal.hide();
            this.isFieldModal = true;
          }
        } finally {
          this.isLoading = false;
        }
      }
    },
    selectInterest(fieldId, elementId) {
      var index = this.selectedFields.findIndex(field => {
        return field * 1 === fieldId * 1;
      });
      if (index === -1) {
        this.selectedFields.push(fieldId);
        document.getElementById(elementId).style.backgroundColor = "#002f5d";
        console.log("selected fields ==", this.selectedFields);
      } else if (index) {
        this.selectedFields.splice(index, 1);
        document.getElementById(elementId).style.backgroundColor = "#1d213a";
        console.log("selected fields ==", this.selectedFields);
      }
    },
    async setInterest() {
      this.isLoading = true;
      try {
        var selctedInterest = {
          interests: this.selectedFields,
          token: localStorage.getItem("tokenu")
        };

        var response = await apiClient.post("api/users", selctedInterest);
        if (response.status === 201) {
          console.log("user created = ", response.data);
        }
      } finally {
        this.isLoading = false;
      }
    },
    // sign in
      gotoLogin() {
      this.infoModal.hide();
      this.confirmModal.hide();
      this.isFieldModal = false;
      this.logIninfoModal.show();
    },
   async confirmPhoneToLogin(){
      //  this.isLoading = true;
      // try {
      //   var response = await apiClient.post("user/login", {phone_number:this.phone.number});
      //   if (response.status === 200) {
      //      this.logIninfoModal.hide(); 
      //     this.loginConfirmModal.show()
      //     console.log("user created = ", response.data);
      //   }
      // } finally {
      //   this.isLoading = false;
      // }
         window.requestAnimationFrame(() => {
          this.$refs.codeOne.focus();
        });
          this.logIninfoModal.hide(); 
          this.loginConfirmModal.show()        
     
    },
     setLoginCode(event, elementId) {
      if (elementId !== "loginCodeSix" && event.target.value) {
        window.requestAnimationFrame(() => {
          this.$refs[elementId].focus();
          this.verificationCodes.push(event.target.value);
          console.log("length of code = ", this.verificationCodes.length);
        });
      } else if (elementId === "loginCodeSix") {
        document.getElementById("code6").blur();
        this.verificationCodes.push(event.target.value);
        this.isDisabled = false;
        console.log("length of code = ", this.verificationCodes.length);
      }
    },

    backToLoginInfoModal(){
      this.loginConfirmModal.hide()
      this.logIninfoModal.show();    
    },
    async resendLoginCode(){
       try {
        this.resending = true;
        var response = await apiClient.post("user/resend", {
          phone_number: this.phone.number
        });
        if (response.status === 200) {
          localStorage.setItem("tokenu", response.data.access_token);
        }
      } finally {
        this.resending = false;
      }
    },
   async confirmLoginVerification(){
        if (this.verificationCodes.length * 1 === 6) {
        this.isLoading = true;
        var credential = {
          otp: this.verificationCodes.join(""),
          phone_number: this.userInfo.phone_no.number
        };
        try {
          this.confirmModal.hide();
          this.isFieldModal = true;
          var response = await apiClient.post("user/verify_phone", credential);
          if (response.status === 200) {
            localStorage.setItem("tokenu", response.data.access_token);
            this.confirmModal.hide();
            this.isFieldModal = true;
          }
        } finally {
          this.isLoading = false;
        }
      }
    },
    saveUserData(response){
            apiClient.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
            this.$store.commit("setUser", response.data.user);
            this.$store.commit("setIsAuthenticated", true);
            let user = response.data.user;

            localStorage.setItem("tokenu", response.data.access_token);
            localStorage.setItem("supUser", JSON.stringify(user));
            localStorage.setItem("legal", true);

            let toPath = this.$route.query.to || "/";
            this.$router.push(toPath);
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
nav .navBakgound {
  min-width: 100%;
  max-width: 100%;
  min-height: 4.5rem;
  padding: 0%;
}
.naveContainer {
  width: 100%;
  /* max-width: 90%; */
  position: absolute;
  top: 20%;
  color: #fff;
}

.logo {
  min-width: 2rem;
  max-width: 2rem;
  height: auto;
  /* max-height: 3rem; */
}
.logoMarker {
  min-width: 9rem;
  max-width: 9rem;
}
.profileBtn {
  background-color: #1d213a;
  box-shadow: none !important;
}
.langBtn {
  background: none;
  box-shadow: none !important;
}
.smallNav {
  background-color: #002f5d !important;
  min-width: 100%;
  max-width: 100%;
  min-height: 4.5rem;
  margin: 0%;
}
.profBtn {
  background: none;
  border: none;
}

/* for sign up */
.signUp,.signIn {
  position: absolute;
  top: 10%;
  text-align: left;
}
.fieldSelectionModal {
  min-width: 100%;
  max-width: 100%;
  min-height: 100vh;
  position: absolute;
  top: 10%;
  background-color: rgba(0, 0, 0, 0.69);
}
.fieldContainer {
  width: 70%;
  height: 100%;
  margin: auto;
  background-color: #1d213a;
  color: #fff;
  overflow-y: auto;
}
input,
select {
  background-color: #1d213a;
  color: #fff;
}
.phoneInput{
  background:none;
  background-color: #1d213a;
  color: #fff;

}
.btn-save {
  background-color: #eb9713;
  border-radius: 0;
}
.btn-save:hover {
  background-color: #f4480a;
}
.btn-cancel {
  border-radius: 0;
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
.interestselection:hover {
  /* border-radius: 10rem; */
  color: #fff;
  cursor: pointer;
}
.warning input {
  border: 1px red solid;
}
.warning span {
  display: inline;
  color: red;
}
.insteadSignUp{
  color: #e7453a;
}
#rememberMe{
  background-color: #e7453a;
}
.borderBottom{
  border-bottom: 1px solid #fff;
}
.loginWith img{
max-width: 30%;
margin: auto;
}
@media (max-width: 768px) {
  .fieldContainer {
    width: 100%;
  }
}
</style>