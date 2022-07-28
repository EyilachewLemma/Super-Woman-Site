<template>
<div class="px-3 pt-3">
    <button  @click="$router.back()" class="d-md-none backBnt text-white"><i class="fa-solid fa-angle-left"></i></button>
                <div class="detailProfileCircle rounded-circle text-white">
                    <img :src="myMentor?.profile_picture" alt="mentor profile" class="img-fluid">
                </div>              
           <div class="text-center mt-2">
               <p class="text-white">{{myMentor.first_name+' '+myMentor.last_name}}</p>
                <p class="text-white">Data scientist,IA Engineer</p>
                <p class="text-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius culpa tempora saepe.</p>
                <p>number of mentees:{{myMentor.no_of_mentee}}</p>
           </div>
            <div class="d-flex justify-content-center mt-5">
                <button @click="showExperience()" class="experience text-white px-2 px-md-5" :class="{activeBtn:isExperience}">Experience</button>
                <button @click="showAvailability()" class="experience text-white px-2 px-md-5">Availabile Time</button>
            </div>
            <transition>
            <div v-if="isExperience" class="w-100 mt-3 experienceDiv pb-2">
                <div v-for="experience in myMentor.experiances" :key="experience.id">
                   <p class="text-white">{{experience.position}} at {{experience.organization}}</p>
                   <p class="text-white">from {{experience.from+' to '+experience.to}}</p>
            </div>
            </div>
            </transition>
            <transition>
            <div v-if="isAvailability" class="border rounded shadow-sm w-100 p-3 mt-3 bg-white text-dark">
                   <p>I will be free in the following times</p>
                   <p v-for="freeTime in myMentor.availablites" :key="freeTime.id" class="mt-3">{{freeTime.day+' '+freeTime.from+' to '+freeTime.to}}</p>
            </div>
            </transition>
             <div class="d-flex mt-4 px-3 pb-5 justify-content-center">
                <button @click="disconectMenore(myMentor.id)" class="btn me-5 disconnect">Disconnect</button>
                <button @click="sendMessage()" class="btn text-white sendMessage">Send Message</button>
          </div>
            <p class="text-danger text-center small">{{ notify }}</p>
          </div>
</template>
<script>
import apiClient from '@/url/index'
export default {
    data() {
        return {
             isExperience:true,
            isAvailability:false,
            isLoading:false,
            notify:'',
        }
    },
    created() {
        this.$store.dispatch('fetchMyMentor')
    },
    computed:{
        myMentor(){
            return this.$store.getters.myMentor
        }
    },
    methods: {
        showExperience(){
            this.isAvailability = false
            this.isExperience = true
        },
        showAvailability(){
            this.isExperience = false
            this.isAvailability = true
        },
       
        async disconectMenore(){
             try {
                var response = await apiClient.get(`user/disconnect_mentor`)
                if (response.status === 200) {
                    // this.myMentor = response.data
                    console.log('my mentor =', response.data)
                    this.notify = 'your connection is terminated succussfuly'
                }
            } catch (err) {
                throw 'error'
            } 
        },
        sendMessage(){},
    },
}
</script>
<style scoped>
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
.experienceDiv{
    border-bottom: 1px solid #fff;
}
.disconnect{
    background-color: #e0c0b6;
}
.sendMessage{
    background-color: #e7453a;
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
@media(max-width: 768px){
    .sendRequestFromDetail{
        width: 100%;
        margin: auto;
    }
}
</style>