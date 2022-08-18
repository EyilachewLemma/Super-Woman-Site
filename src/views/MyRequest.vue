<template>
<div class="px-3 py-4">
       <button  @click="$router.back()" class="d-md-none backBnt text-white"><i class="fa-solid fa-angle-left"></i></button>
    <div class="row mt-3 mt-lg-0" v-if="myRequest?.length">
  <div class="col-sm-6" v-for="request in myRequest" :key="request.id">
    <div class="d-flex justify-content-between">
       <p class="text-white">Sent to {{request.mentor}} on  {{formatDate(request.created_at)}}</p>
       <p class="fw-bold" :class="{open:request.state !== 'accepted',accepted:request.state === 'accepted'}">{{request.state}}</p>
    </div>
    <div class="border rounded mt-1 mb-4 px-3 py-2 text-white">{{request.request_message}}
    </div>
  </div>

    </div>
    <div v-else class="text-center mt-3 findMentor text-white p-2">
      <p class="fs-5 fw-bold">You didn't make any mentor request yet</p>
                <div class="rounded px-3 py-3 mt-2 text-white text-center">
            <p>Are you looking a mentor,</p>
            <p>find mentors here ?</p>
            <button @click="findMentor()" class="btn rounded-pill bg-white text-dark ms-5 mt-3">Find Mentor</button>
            </div>
       </div>
    </div>
</template>
<script>
import apiClient from '@/url/index'
export default {
  data() {
    return {
      myRequest:[]
    }
  },
  created() {
    this.fetchMyRequest()
  },
  methods: {
    async fetchMyRequest(){
       try {
                var response = await apiClient.get(`user/my_requests`)
                if (response.status === 200) {
                    this.myRequest = response.data
                    console.log('myRequest =', response.data)
                }
            } catch (err) {
                throw 'error'
            } 
    },
     formatDate(createdAt){
     var date = new Date(createdAt)
     var year = date.getFullYear()
     var month = date.getMonth()
     var day = date.getDate()
     return month*1+1+'/'+day+'/'+year
    },
        findMentor(){
      this.$router.push({name:'Mentors'})
    }
  },
}
</script>
<style scoped>
.accepted{
  color: green;
}
.open{
  color: red;
}.findMentor{
    background-color: #002f5d;
}
</style>