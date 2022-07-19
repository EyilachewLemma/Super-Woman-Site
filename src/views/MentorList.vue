<template>
    <div class="wraper">
        <div class="text-center text-white px-3 pt-4 px-lg-4">Mentors Lists</div>
        <div class="d-flex align-items-center mt-2 px-3 pt-3 px-lg-4">
            <div class="input-group mb-3 border searchContainer me-md-5">
             <input type="text" class="form-control" placeholder="Search Mentors" aria-label="Recipient's username" aria-describedby="button-addon2">
             <button class="searchBtn fs-4 px-2" type="button" id="searchBtn"><i class="fas fa-search"></i></button>
             </div>
            <div class="d-none d-md-block">
        <select class="form-select" aria-label="Default select example">
         <option selected>All</option>
         <option value="1">Enginers</option>
          <option value="2">Artist</option>
         <option value="3">Lawyers</option>
       </select>
            </div>
        </div>
       <div class="d-none d-md-block">
         <div class="row mx-2 mx-lg-3">
           <div class="col-md-4 col-lg-3 mt-3" v-for="n in 15" :key="n">
           <div class="border px-1 py-3">
             <div class="d-flex justify-content-center">
                <p class="profileCircle rounded-circle text-white p-4">AK</p>
                </div>
            <div class="mt-3 px-3">
                <p class="text-white">Eden Getachew</p>
                <p class="text-white">Data scientist,IA Engineer</p>
                <p class="text-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius culpa tempora saepe.</p>
            </div>
            <button @click="sendMentorRequest()" class="btn sendRequest text-white px-0 px-lg-1">Send Mentor Request</button>
            <button @click="viewMentorProfile()" class="btn viewProfile text-white mt-2">View Profile</button>
           </div>
           </div>
        </div>
       </div>
        <!-- for small device  -->
        <div class="d-md-none">
            <div class="mt-2 d-flex d-md-none interestSection w-100 pb-3">
            <button class="border interestBtn w-25 me-2 text-white p-2" v-for="n in 15" :key="n" >Computer Science</button>
        </div>
        <div class="mt-3 px-3">
            <div class="pb-3" v-for="n in 15" :key="n">
                <router-link to="#" class="text-decoration-none">
                    <div class="d-flex">
                <p class="align-self-center profileCircle smProfileCircle rounded-circle text-white p-4 me-3">AK</p>
                   <div class="text-white text-start">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, exercitationem odio. Cumque excepturi explicabo illo.</div>
                </div>
                </router-link>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import apiClient from '@/url'
export default {
    data() {
        return {
            mentors:[]
        }
    },
    created() {
        // this.fetchMentors()
    },
    computed:{
        fields() {
      return this.$store.getters.fields;
    }
    },
    methods: {
       async fetchMentors(){
            this.$store.commit('setIsLoading',true)
            try{
                var response = apiClient.get('api/mentors')
                if(response.status === 200){
                    this.mentors = response.data
                }
            }
            finally{
                this.$store.commit('setIsLoading',false)
            }

        },
        sendMentorRequest(){},
        viewMentorProfile(){}
    },
}
</script>
<style scoped>
.wraper{
    background-color: #0f0e1c;
}
/* .searchContainer{
    border-radius: 10rem;
} */
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
    /* border-top-right-radius: 10rem;
    border-bottom-right-radius: 10rem; */
}
select{
    background-color: #0f0e1c;
    color: #fff;
}
.profileCircle{
    background-color: #1d213a;
}
.sendRequest{
    width: 80%;
    margin: auto;
    background-color: #e7453a;
}
.viewProfile{
     width: 80%;
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
    border-radius: 5rem;
    background-color: #1d213a;
}
.smProfileCircle{
    background-color: #e7453a;
}
</style>