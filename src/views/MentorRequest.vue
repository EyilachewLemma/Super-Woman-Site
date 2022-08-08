<template>
    <div class="wraper px-3 pt-3 px-lg-5 pb-5 rounded my-5 ">
       <button @click="$router.back()" class="text-white fs-4 mb-4">
              <i class="fas fa-angle-left"></i>
            </button>
        <div class="text-white">Specify what you want to learn</div>
       <div class="form-floating mt-1">
     <textarea class="form-control form-control-lg text-white" style="height:auto" placeholder="Leave a comment here" id="about" v-model="message"></textarea>
    </div> 
      <div class="d-grid gap-2 pb-4">
            <button
              @click="sendMentorRequest()"
              class="btn sendRequest mt-3 text-white"
              :disabled="isLoading"
            >
              <span v-if="isLoading">
                <span
                  class="spinner-border spinner-border-sm mx-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span>Sending request</span>
              </span>
              <span v-else>Send Request</span>
            </button>
            <p class="text-center small" :class="{success:isSuccess,fail:!isSuccess}">{{ notify }}</p>
          </div>
    </div>
</template>
<script>
import apiClient from '@/url/index'
export default {
    props:['mentorId'],
    data() {
        return {
            message:'',
            isLoading:false,
            isSuccess:true,
            notify:''
        }
    },
    methods: {
       async sendMentorRequest(){
            this.isLoading = true
           try{
            var response = await apiClient.post(`user/send_mentor_request/${this.mentorId}`,{message:this.message})
            if(response.status === 200){
                this.isSuccess = true
                this.notify = 'your request is sent successfully, wait the response'
            }
           }
           catch(err){
            this.isSuccess = false
            this.notify = ' faild to send request ,try again'
           }
           finally{
            this.isLoading = false
           }
        }
    },
}
</script>
<style scoped>
.wraper{
    width: 100%;
    margin: auto;
}
.sendRequest{
    width: 100%;
    margin: auto;
    background-color: #e7453a;
}
textarea{
    background-color: #0f0e1c;
}
textarea:focus{
    background-color: #0f0e1c;
}
.success{
    color: green;
}
.fail{
    color: red;
}
@media(min-width: 768px){
    .wraper{
        width: 75%;
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