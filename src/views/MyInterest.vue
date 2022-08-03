<template>
    <div class="px-2 pt-3 px-lg-3 pb-5">
        <button @click="$router.back()" class="text-white fw-bold fs-5 backBtn d-md-none">
         <i class="fa-solid fa-angle-left"></i>
        </button>      
      <p class="text-center text-white mt-3">Choose your interests and get the best Mentore recommendation.</p>
      <p class="text-center text-white">Don't Worry you can change it later</p>
     <div class="d-flex">
       <div class="flex-fill">
          <div class="row">
        <div class="col-6 col-md-4 mt-3"
          v-for="field in fields"
          :key="field.id"
        >
          <p
            @click="selectInterest(field.id)"
            class="border rounded-pill text-center py-1 text-white fieldP"
            :id="field.id"
          >{{field.title}}</p>
        </div>
      </div>
       </div>
     </div>
      <div class="d-flex px-3 px-lg-5 mt-4">
        <button
          @click="editInterest()"
          class="btn confirmBtn text-white ms-auto"
          :disabled="isLoading"
        >
          <span v-if="isLoading">
            <span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
            <span>Saving</span>
          </span>
          <span v-else>Save Changes</span>
        </button>
        <p class="text-danger text-center small">{{ notify }}</p>
      </div>
    </div>
</template>
<script>
import apiClient from '../url/index.js'
export default {
  data() {
    return {
      selectedFields:[],
      isLoading:false,
      notify:''
    }
  },
  mounted() {    
   this.colorMyInterest()
  },
  computed:{
     fields() {
      return this.$store.getters.fields;
    },
     myInterests() {
      return this.$store.getters.myInterests;
    },
    
  },
  watch:{
    myInterests(){
      if(!this.selectedFields.length){
      this.colorMyInterest()
      }
    }
  },
  methods: {
    colorMyInterest(){
      this.myInterests.forEach(interest => {
        this.selectedFields.push(interest.id)
        document.getElementById(interest.id).style.backgroundColor ='#002f5d'
      });
    },
     selectInterest(fieldId) {
      var index = this.selectedFields.findIndex(field => {
        return field * 1 === fieldId * 1;
      });
      if (index === -1) {
        this.selectedFields.push(fieldId);
        document.getElementById(fieldId).style.backgroundColor = "#002f5d";
        console.log("selected fields length ==", this.selectedFields?.length);
        console.log('element id =',fieldId)
      } else if (index) {
        this.selectedFields.splice(index, 1);
        document.getElementById(fieldId).style.backgroundColor = "#0f0e1c";
        console.log("selected fields length ==", this.selectedFields?.length);
      }
    },
     async editInterest() {
      this.isLoading = true;
      try {
        var response = await apiClient.post("user/set_interest",{interests:this.selectedFields});
        if (response.status === 201) {
          this.$toast.success(`your Interest is edited successfully`);
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
}
</script>
<style scoped>
.btn{
    background-color: #e7433a;
}
.fieldP{
  cursor: pointer;
}
@media(max-width: 768px){
    .btn{
        width: 100%;
    }
}
</style>