<template>
    <div class="wraper pb-5">
        <div class="d-flex align-items-center justify-content-center mt-2 px-3 pt-3 px-lg-4">
             <div class="text-center text-white px-3 pt-3 pt-lg-4 px-lg-4 fs-4 fw-bold">Mentors Lists</div>
            <div class="d-none d-md-block ms-auto">
        <select class="form-select form-select-lg" aria-label="Default select example" @change="filterMentors($event)">
         <option selected value="all">All</option>
         <option v-for="field in fields" :key="field.id" :value="field.id">{{field.title}}</option>
       </select>
            </div>
        </div>
       <!-- <div class="d-none d-md-block">
         <div class="row mx-2 mx-lg-3">
           <div class="col-md-4 col-lg-3 mt-3" v-for="mentor in mentors.data" :key="mentor.id">
           <div class="border px-1 py-3">
             <div v-if="mentor.profile_picture" class="detailProfileCircle rounded-circle text-white">
                    <img :src="mentor.profile_picture" alt="mentor profile" class="img-fluid">
                </div> 
             <div v-else class="d-flex justify-content-center">
                <p class="profileCircle rounded-circle text-white p-4">{{mentor.first_name.charAt(0)+mentor.last_name.charAt(0)}}</p>
                </div>
            <div class="mt-3 px-2">
                <p class="text-white text-center">{{mentor.first_name+' '+mentor.last_name}}</p>
                <p class="text-white">{{mentor.bio}}</p>
                <p class="text-white text-center">
                    <span v-for="experience in mentor.experiances" :key="experience.id">{{experience.position}}, </span>
                </p>
                <p class="text-white text-center"></p>
            </div>
           
            <div class="px-2 mt-3">
            <button v-if="!user?.mentor_id" @click="sendMentorRequest(mentor.id)" class="btn sendRequest text-white px-0 px-lg-1">Send Mentor Request</button>
            <button @click="viewMentorProfile(mentor)" class="btn viewProfile text-white mt-3">View Profile</button>
           </div>
           </div>
           </div>
        </div>
       </div> -->
       <!-- card start -->
   <div class="d-none d-md-block mt-4 px-3 px-lg-5">
        <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 rowCard">
  <div class="col" v-for="mentor in mentors" :key="mentor.id">
    <div class="card h-100">
         <img v-if="mentor.profile_picture"  :src="mentor.profile_picture" alt="mentor profile" class="card-img-top img-fluid">
          <img v-else  src="../assets/img_avatar2.png" alt="mentor profile" class="card-img-top img-fluid">
         
      <div class="card-body">
        <h5 class="card-title text-white">{{mentor.first_name+' '+mentor.last_name}}</h5>
        <div class="mt-3 px-2 card-text">
                <p class="text-white">{{mentor.bio}}</p>
                <p class="text-white text-center">
                <span v-for="experience in mentor.experiances" :key="experience.id">{{experience.position}}, </span>
                </p>
            </div>
            <div class="px-2 mt-3">
            <button v-if="!user?.mentor_id" @click="sendMentorRequest(mentor.id)" class="btn sendRequest text-white px-0 px-lg-1">Send Mentor Request</button>
            <button @click="viewMentorProfile(mentor)" class="btn viewProfile text-white mt-3">View Profile</button>
           </div>
      </div>
    </div>
  </div>  
</div>
   </div>
       <!-- card end -->
        <!-- for small device  -->
        <div class="d-md-none">
            <div class="mt-2 d-flex  d-md-none interestSection w-100 pb-3">
            <button class="border interestBtn  me-2 text-white p-1" v-for="field in fields" :key="field.id"  @click="filterMentorsByFields(field.id)">{{field.title}}</button>
        </div>
        <hr>
        <div class="mt-3 px-3">
            <div class="pb-3" v-for="mentor in mentors"  :key="mentor.id">
                    <div @click="viewMentorProfile(mentor)" class="d-flex profileContainer">
                     <div class="px-1 py-3 me-2">
             <div v-if="mentor.profile_picture" class="smProfileCircle rounded-circle text-white">
                    <img :src="mentor.profile_picture" alt="mentor profile" class="img-fluid">
                </div> 
             <div v-else class="smProfileCircle rounded-circle text-white">
                    <img src="../assets/img_avatar2.png" alt="mentor profile" class="img-fluid">
                </div> 
                </div>
                   <div class="text-white">
                    <h5 class="card-title text-white">{{mentor.first_name+' '+mentor.last_name}}</h5>
                    <p >{{mentor.bio}}</p>
                    <span v-for="experience in mentor.experiances" :key="experience.id">{{experience.position}}</span>                
                   </div>
                </div>
                <hr>
            </div>
        </div>
        </div>
    </div>
    <!-- mentor profile detail dialog -->
    <base-modal id="profileModal">
      <template #modalBody>
         <button @click="profileModal.hide()" class="hideModalBtn text-white fs-4"><i class="fas fa-chevron-left"></i></button>
            <div class="mt-3">
                <div class="detailProfileCircle rounded-circle text-white">
                    <img :src="mentorDetails.profile_picture" alt="mentor profile" class="img-fluid">
                </div>              
           <div class="text-center mt-2">
               <p class="text-white">{{mentorDetails.first_name+' '+mentorDetails.last_name}}</p>
                <p class="text-white">{{mentorDetails.bio}}</p>
                <p class="text-white">Number of Mentee {{mentorDetails.no_of_mentee}}</p>                
           </div>
            </div>
            <div class="d-flex justify-content-center mt-5">
                <button @click="showExperience()" class="experience text-white px-2 px-md-5" :class="{activeBtn:isExperience}">Experience</button>
                <button @click="showAvailability()" class="experience text-white px-2 px-md-5">Availabile Time</button>
            </div>
            <transition>
            <div v-if="isExperience && experiences?.length" class="w-100 px-3 mt-3">
                <div v-for="experience in experiences" :key="experience.id">
                   <p class="text-white">{{experience.position}}</p>
                   <p class="text-white">{{experience.organization}}</p>
                   <p class="text-white">From {{experience.from}} to {{experience.to}}</p>
                   <hr class="text-white mt-2">
            </div>
            </div>
            </transition>
            <transition>
            <div v-if="isAvailability && availabilities?.length" class="border rounded shadow-sm w-100 p-3 mt-3 bg-white">
                   <p>I will be free in the following times</p>
                   <p class="mt-3" v-for="availability in availabilities" :key="availability.id">{{availability.day+' '+availability.from+' to '+availability.to}}</p>
            </div>
            </transition>
             <div class="d-grid gap-2 pb-4">
            <button
              @click="sendMentorRequest(mentorId)"
              class="btn sendRequestFromDetail mt-3 text-white"
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
              <span v-else>Send Mentor Request</span>
            </button>
            <p class="text-danger text-center small">{{ notify }}</p>
            <div class="d-flex">
                <button @click="profileModal.hide()" class="btn border rounded closeBtn ms-auto text-white">Close</button>
            </div>
          </div>
        </template>
        </base-modal>
</template>
<script>
import { Modal } from "bootstrap";
import apiClient from '@/url'
export default {
    data() {
        return {
            mentors:[],
            availabilities:[],
            filterableMentor:[],
            experiences:[],
            mentorDetails:[],
            mentorId:null,
            profileModal:null,
            isExperience:true,
            isAvailability:false,
            isLoading:false,
            notify:'',
            searchBy:'',
            filterBy:'',

        }
    },
    created() {
        this.fetchMentors()
    },
    mounted() {
        this.profileModal = new Modal(document.getElementById("profileModal"));
    },
    computed:{
        fields() {
      return this.$store.getters.fields;
    },
      user() {
      return this.$store.getters.user;
    }
    },
    methods: {
       async fetchMentors(){
            this.$store.commit('setIsLoading',true)
            try{
                var response = await apiClient.get(`user/mentors?search=${this.searchBy}&filter=${this.filterBy}`)
                if(response.status === 200){
                    this.mentors = response.data?.data
                    this.filterableMentor = response.data.data
                    console.log('mentors =',response.data)
                }
            }
            finally{
                this.$store.commit('setIsLoading',false)
            }

        },
        async sendMentorRequest(id){
            if(this.user){
            this.profileModal.hide()
            this.$router.push({name:'MentorRequest',params:{mentorId:id}})
            }
            else{
                this.profileModal.hide()
                this.$router.push({name:'Login'})
            }
           
        },
        viewMentorProfile(mentor){
            this.notify = ''
            this.mentorDetails = mentor
            this.mentorId = mentor.id
            this.availabilities = mentor.availablites
            this.experiences = mentor.experiances
            this.profileModal.show()
        },
        showExperience(){
            this.isAvailability = false
            this.isExperience = true
        },
        showAvailability(){
            this.isExperience = false
            this.isAvailability = true
        },
       async searchMentor(){
            this.fetchMentors()
        },
        filterMentors(event){
            // if(event.target.value === 'all'){
            //     this.filterBy = ''
            //     this.fetchMentors()
            // }
            // else{
            //    this.filterBy = event.target.value
            //    this.fetchMentors()
            // }
                 if(event.target.value === 'all'){
          this.filterBy = ""
          this.fetchMentors(); 
     
      }
      else{
        var filteredMentors = this.filterableMentor.filter(mentor=>{
        return mentor.field_id*1 === event.target.value*1     
      })
      this.mentors = filteredMentors
      console.log('field id=',event.target.value)
      }
          
          
        },
        filterMentorsByFields(id){
               if(id === 'all'){
          this.filterBy = ""
          this.fetchMentors(); 
     
      }
      else{
        var filteredMentors = this.filterableMentor.filter(mentor=>{
        return mentor.field_id*1 === id*1     
      })
      this.mentors = filteredMentors
      }
        }
    },
}
</script>
<style scoped>
.wraper{
    background-color: #0f0e1c;
}
.searchContainer input{
    /* border-radius: 10rem; */
    border: none;
    background-color: #0f0e1c;
    color: #fff;
}
.searchBtn{
    background-color: #0f0e1c;
    color: #fff;
    border: none;
    }
    .searchContainer{
        z-index: 0;
    }
select{
    background-color: #0f0e1c;
    color: #fff;
}
.profileCircle{
    background-color: #1d213a;
}
.profileContainer:hover{
 cursor: pointer;
}
.card-body{
    background-color: #0f0e1c!important;
}
.sendRequest,.sendRequestFromDetail{
    width: 100%;
    margin: auto;
    background-color: #e7453a;
}

.viewProfile{
     width: 100%;
    margin: auto;
    background-color: #002f5d;
}
.interestSection{
    overflow: auto;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.interestSection::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.interestSection {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.interestBtn{    
    min-width: 40%;
    border-radius: 3rem;
    background-color: #1d213a;
    border: none;
}
.interestBtn:focus{
    background-color: #002f5d;
    border: none;
}
.smProfileCircle{
     width: 4rem;
    height: 4rem;
    overflow: hidden;
    background-color: #e7453a;
}
.smProfileCircle img{
    width: 100%;
    height: 100%;
}
.hideModalBtn{
    background: none;
    border: none;
}
.detailProfileCircle{
    width: 5rem;
    height: 5rem;
    margin: auto;
    background-color: #e7453a;
    overflow: hidden;
}
.detailProfileCircle img{
    width: 100%;
    height: 100%;
}
.experience{
    background: none;
    border: none;
    box-shadow: none!important;
    border-bottom: 1px solid #fff;
}
.experience:focus,.activeBtn{
border-bottom: 2px solid #f69f83;
}
.closeBtn{
    background:none
}
.v-enter-from{
    transform: translateX(20%);
    opacity: 0;
}
.v-enter-active{

  transition: all 0.3s ease-out;
}
.v-enter-to{
    opacity: 1;
}
.v-leave-from{
    opacity: 1;
}
.v-leave-active{
    transition: all 0.3s ease-out;
}
.v-leave-to{
    opacity: 0;
    transform: translateX(-20%);
}
@media(max-width: 576px){
    .sendRequestFromDetail{
        width: 100%;
        margin: auto;
    }
}
@media(min-width: 576px){
    .interestBtn{
        width: 35%;
    }
}
@media(min-width: 768px){
    .interestBtn{
        width: 30%;
    }
}
@media(min-width: 992px){
    .interestBtn{
        width: 25%;
    }
}
@media(min-width: 1200px){
    .interestBtn{
        width: 20%;
    }
}
</style>