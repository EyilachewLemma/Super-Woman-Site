<template>
<div class="wraper py-4 px-3 px-lg-5">
  <!-- sign up code -->
  <div v-if="isSignUp" class="signUp border rounded shadow-sm p-4">
          <div class="d-flex">
            <button @click="$router.back()" class="text-white backBtn fs-4">
             <i class="fas fa-chevron-left"></i>
            </button>
            <div class="text-white fs-5 ms-auto me-auto">Sign Up</div>
          </div>
          <div class="mb-3 mt-3" :class="{ warning: v$.userInfo.first_name.$error }">
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
          <div :class="{ warning: v$.phone.$error }">
            <label for="phone" class="form-label text-white">Phone Number</label>
            <vue3-phone-input class="text-white p-0" v-model="phone" outlined id="phone" />
            <span
              v-if="v$.phone.$error && !phone?.isValid"
              class="error-msg mt-1"
            >invalid phone number</span>
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
              <span v-else>Register</span>
            </button>
            <p class="text-danger text-center small">{{ notify }}</p>
          </div>
        <div class="d-flex mt-3">
          <button @click="gotoLogin()" class="text-white ms-auto me-5"><u>Login</u></button>
        </div>
        </div>
  <!-- sign up end -->
    <!-- phone number confirmation modal-->
    <base-modal id="confirmModal">
      <template #modalBody>
        <div class="px-2 py-3 px-lg-4">
          <div class="d-flex">
            <button @click="backToInfoModal()" class="text-white backBtn fs-4">
              <i class="fas fa-angle-left"></i>
            </button>
            <div class="text-white fs-5 ms-auto me-auto">Phone Number Verification</div>
          </div>
          <div
            class="text-center text-white my-3"
          >Enter The code we sent to {{phone?.number}} via SMS</div>
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
              :disabled="isLoading ||isDisabled"
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
  <!-- interest selection modal -->
  <base-modal id="fieldModal">
    <template #modalBody>
      <div class="d-flex">
        <button @click="fieldModal.hide()" class="text-white fw-bold fs-5 backBtn">
          <i class="fas fa-times"></i>
        </button>
        <div class="text-white fs-5 ms-auto me-auto">Select fields you like</div>
      </div>
      <p
        class="text-center text-white mt-3"
      >Choose your interests and get the best Mentore recommendation.</p>
      <p class="text-center text-white">Don't Worry you can change it later</p>
      <div class="d-flex">
        <div class="flex-fill">
          <div class="row">
            <div class="col-6 col-md-4 mt-3" v-for="field in fields" :key="field.id">
              <p
                @click="selectInterest(field.id,'interest'+field.id)"
                class="border interestselection rounded-pill text-center p-1 text-white"
                :id="'interest'+field.id"
              >{{field.title}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="d-grid gap-2 px-3 px-lg-5 mt-3">
        <button
          @click="setInterest()"
          class="btn w-100 confirmBtn text-white"
          :disabled="isLoading"
        >
          <span v-if="isLoading">
            <span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
            <span>Saving</span>
          </span>
          <span v-else>Save</span>
        </button>
        <p class="text-danger text-center small">{{ notify }}</p>
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
  components: {
    Vue3PhoneInput
  },
  data() {
    return {
      v$: useValidate(),
      confirmModal: null,
      logIninfoModal: null,
      loginConfirmModal: null,
      fieldModal: null,
      isSignUp:true,
      userInfo: {},
      interests: [],
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
      isDisabled: true,
      verificationCodes: [],
      isLoading: false,
      resending: false,
      notify: "",
      selectedFields: [],
      phone: "",
      rememberMe: true
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
          required: helpers.withMessage(
            "phone number can not be empty",
            required
          )
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
        required: helpers.withMessage("phone number required", required)
      }
    };
  },
   beforeCreate() {
    this.$store.dispatch("fetchEducationLebles");
  },
   mounted() {
    this.confirmModal = new Modal(document.getElementById("confirmModal"));
    this.fieldModal = new Modal(document.getElementById("fieldModal"));
  },
  computed:{
     educationLebles() {
      return this.$store.getters.educationLebles;
    },
    fields() {
      return this.$store.getters.fields;
    },
  },
   methods: {
    gotoSignup() {
      this.userInfoModal.show();
    },
    async registerUser() {
      this.isLoading = true;
      this.v$.userInfo.$validate();
      this.v$.phone.$validate();
      if (!this.v$.userInfo.$error && this.phone?.isValid) {
        this.userInfo.phone_number = this.phone?.number;
        try {
          var response = await apiClient.post("user/register", this.userInfo);
          if (response.status === 201) {
            this.isSignUp = false
            this.confirmModal.show();
          }
        } catch (err) {
          console.log(err);
        } finally {
          this.isLoading = false;
        }
      }
      this.emptyCode()
      this.isSignUp = false
      this.confirmModal.show();

           
    },
    backToInfoModal() {
      this.confirmModal.hide();
      this.isSignUp = true
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
     async resendCode() {
       this.emptyCode()
      try {       
        this.resending = true;        
        var response = await apiClient.post("user/resend", {
          phone_number: this.userInfo.phone?.number
        });
        if (response.status === 200) {
          console.log("code resent");
        }
      } finally {
        this.resending = false;
      }
    },
    setCode(event, elementId) {
      if (elementId != "codeSix" && event.target.value !== '') {
        window.requestAnimationFrame(() => {
          this.$refs[elementId].focus();
          this.verificationCodes.push(event.target.value);
          console.log('enterd code = ',event.target.value)
          console.log("length of code = ", this.verificationCodes.length);
        });
      } else if (elementId === "codeSix") {
        document.getElementById("code6").blur();
        this.verificationCodes.push(event.target.value);
        console.log("length of code = ", this.verificationCodes.length);
        this.isDisabled = false;
        
      }
    },
    async confirmVerification() {
      this.confirmVerification = []
      this.confirmVerification.push(this.code1)
      this.confirmVerification.push(this.code2)
      this.confirmVerification.push(this.code3)
      this.confirmVerification.push(this.code4)
      this.confirmVerification.push(this.code5)
      this.confirmVerification.push(this.code6)
      console.log('length of code sent to server=',this.confirmVerification.length)
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
            this.confirmModal.hide();
            this.fieldModal.show();
             this.isDisabled = true;
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
          interests: this.selectedFields
        };

        var response = await apiClient.post(
          "user/set_interest",
          selctedInterest
        );
        if (response.status === 200) {
          console.log("user created = ", response.data);
          this.fieldModal.hide();
          var topath = this.$route.query.to || "/";
          this.$router.push(topath);
        }
      } finally {
        this.isLoading = false;
      }
    },
    // sign in
    gotoLogin() {
     this.$router.push({name:'Login'})
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
  }
};
</script>
<style scoped>
.wraper{
  width: 100%;
  height: 100vh;  
background-color: #0f0e1c;

}
.signUp{
  width: 100%;
  margin: auto;
   background-color: #1d213a;
   overflow-y: auto;
}
input,
select {
  background-color: #1d213a;
  color: #fff;
}
.phoneInput {
  background: none;
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
@media(min-width: 768px){
  .signUp{
  width: 50%;
  margin: auto;
}
}
@media(min-width: 992px){
  .signUp{
  width: 30%;
  margin: auto;
}
}

</style>




