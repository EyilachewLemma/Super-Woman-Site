<template>
<div class="wraper">
    <div class="messageBox border">
    <div class="mentorProfile sticky-top d-flex justify-content-start px-3 px-lg-5 py-2">
<button  @click="$router.back()" class="text-white backBtn align-self-center me-4 fs-4"><i class="fa-solid fa-angle-left"></i></button>
 <div class="profileCircle rounded-circle text-white me-3">
  <img :src="myMentor?.profile_picture" alt="mentor profile" class="img-fluid rounded-circle">
   </div>  
   <div class="text-white align-self-center">Eden Getachew</div>
    </div> 
    <div class="contentContainer pb-5">
        <div class="px-2 pt-3" v-for="(message,index) in messages" :key="message.id">
        <div v-if="message.sender === 'mentor'" class="d-flex me-5">        
        <div class="smProfileCircle rounded-circle text-white me-2 align-self-end">
           <img :src="myMentor?.profile_picture" alt="mentor profile" class="img-fluid rounded-circle">
            </div> 
           <div class="position-relative text-white userone rounded p-2">
               <div class="text-break pt-1">{{message.message}}</div>
               <p class="pt-1 ms-auto my-0 d-flex">
                <span v-if="message.created_at === message.updated_at" class="ms-auto small">{{formatDate(message.created_at)}}</span>
                <span v-else class="ms-auto small">edited {{formatDate(message.updated_at)}}</span>
                </p>              
           </div>
           </div>
           <div v-else class="position-relative text-white  mt-2 usertwo d-flex">
               <div class="ms-auto bgforusertwo rounded p-2">
                <div class="editDeletet px-2">
                <button @click="editMessage(message,index)" class="editBtn ms-auto me-3 small border rounded">edit</button>
                 <button @click="deleteMessage(message.id,index)" class="deleteBtn small border rounded">delete</button>               
            </div>
                <div class="text-break">{{message.message}}</div>
               <p class="pt-1 ms-auto my-0 d-flex">
                <span v-if="message.created_at === message.updated_at" class="ms-auto small">{{formatDate(message.created_at)}}</span>
                <span v-else class="ms-auto small">edited {{formatDate(message.updated_at)}}</span>
                </p>
               </div>
           </div>
        </div>
    </div>
     <div v-if="!isEdit" class="mt-3 pt-3 messageInput pb-1 px-3 fixed-bottom">
          <div class="input-group mb-3 msgInputGroup border px-3">
               <textarea class="form-control border-0 mt-2" placeholder="write message" id="floatingTextarea2" style="height: auto" v-model="newMessage" @keyup.enter="sendMessage"></textarea>
               <button @click="sendMessage()" class="text-primary fs-4 sendBtn" type="button" id="sendBtn"><i class="fas fa-paper-plane sendIcon"></i></button>
           </div>  
          
    </div> 
      <div v-else-if="isEdit" class="mt-3 pt-3 messageInput pb-1 px-3 fixed-bottom">
            <div class="input-group mb-3 msgInputGroup border px-3">
               <textarea class="form-control border-0 mt-2" placeholder="write message" id="floatingTextarea2" style="height: auto" ref="editBox" v-model="newMessage" @keyup.enter="saveEditedMessage"></textarea>
               <button @click="saveEditedMessage()" class="text-primary fs-4 sendBtn" type="button" id="editBtn"><i class="fas fa-paper-plane sendIcon"></i></button>
           </div> 
          
    </div>
</div>
</div>
     
</template>
<script>
import Pusher from 'pusher-js';
import apiClient from '@/url/index'
export default {
    data() {
        return {
            newMessage:"",
            messages:[],
            page:10,
            pageCounter:1,
            isEdit:false,
            editedMessageId:null,
            editedMessageIndex:null

        }
    },
    created() {
        this.$store.dispatch('fetchMyMentor')
        this.listenForChanges()
        this.featchMessages()
    },
    computed:{
        myMentor(){
            return this.$store.getters.myMentor
        },
         user(){
            return this.$store.getters.user
        }
    },
    mounted() {
        window.addEventListener('scroll',()=>{
            let scrollTop = document.documentElement.scrollTop
            let scrollHeight = document.documentElement.scrollHeight
            let clientHeight = document.documentElement.clientHeight
            if(scrollTop+clientHeight >= scrollHeight){
                this.pageCounter++
                this.page = this.page*this.pageCounter
                this.featchMessages()
            }
        })
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
       async featchMessages(){
            try{
                var response = await apiClient.get(`user/messages?per_page=${this.page}`)
                if(response.status === 200){
                    var featchedMessages = response.data.data
                    this.messages = featchedMessages.reverse()
                    console.log('messages=',response.data)
                }
            }
            catch(err){
                console.log('error')
            }
        },
       async sendMessage(){
         try{
                var response = await apiClient.post('user/send_message',{message:this.newMessage})
                if(response.status === 200){
                    var mesgArray = this.messages;
                    mesgArray.push(response.data)
                    this.messages = []
                    this.messages = [...mesgArray]
                    this.newMessage = ''
                    console.log('MESSAGE =',response.data)
                    
                }
            }
            catch(err){
                console.log('error')
            }
       }, 
       listenForChanges() {  
          let pusher = new Pusher('51df02a0da376c37ab66', 
               { cluster: 'ap2' }, 
               { userAuthentication:  
               { endpoint: "/pusher_user_auth.php"}} 
               ) 
       pusher.subscribe(`get_mentor_message.${this.user?.id}`)
      pusher.bind('newMessage', data => { 
        console.log('brodcasted data=',data)
           this.messages.push(data.message) 

      }) 

        },
        formatDate(createdAt){
            var date = new Date(createdAt)   
       return date.toLocaleString()
    },        
      async deleteMessage(id,index){
         try{
                var response = await apiClient.delete(`user/message/${id}`)
                if(response.status === 200){
                    this.messages.splice(index,1)
                    
                    
                }
            }
            catch(err){
                console.log('error')
            }
       },
       async editMessage(message,index){
        this.newMessage = message.message
        this.isEdit = true
        this.editedMessageId = message.id
        this.editedMessageIndex = index
        window.requestAnimationFrame(()=>{
            this.$refs.editBox.focus()
        })
            
        },
       async saveEditedMessage(){
               try{
                var response = await apiClient.put(`user/message/${this.editedMessageId}`,{message:this.newMessage})
                if(response.status === 200){
                    var mesgArray = this.messages;
                    mesgArray[this.editedMessageIndex] = response.data
                    this.messages = []
                    this.messages = [...mesgArray]
                    this.isEdit = false
                    this.newMessage = ''
                    
    
                }
            }
            catch(err){
                console.log('error')
            }
        }
    },
}
</script>
<style scoped>
.wraper{
    width: 100%;
    min-height: 100vh;
    background-color: #0f0e1c;
}
.messageBox{
    width: 100%;
    min-height: 100vh;
    padding-bottom: 10%;
    background-color: #0f0e1c;
}
.contentContainer{
    overflow-y: scroll;
}
.contentContainer::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.contentContainer {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.backBtn{
    background: none;
    border: none;
}
.mentorProfile{
    border-bottom: 1px solid #fff;
    background-color: #e7453a;
}
.profileCircle{
    max-width: 4rem;
    min-height: 4rem;
    max-height: 4rem;
    background-color: #e7453a;
    overflow: hidden;
}
.profileCircle img{
    min-width: 100%;
    height: 100%;
}
.smProfileCircle{
    max-width: 2.7rem;
    min-height: 2.7rem;
    max-height: 2.7rem;
    background-color: #e7453a;
    overflow: hidden;
}
.smProfileCircle img{
    width: 100%;
    height: 2.7rem;
    
}
.userone{
    max-width: 100%;
    background-color: #1d213a;
}
.usertwo{
    margin-left: 25%;
    
}
.bgforusertwo{
    max-width: 100%;
 background-color: #1d213a;
}
.editDeletet{
    position: absolute;
    top: 6%;
    right: 2%;
    display: none;

}
.userone:hover .editDeletet{
    display: block;
}
.bgforusertwo:hover .editDeletet{
    display: block;
}
.editBtn:hover,.deleteBtn:hover{
    text-decoration: underline;
    color:#e7453a
}
.messageInput{
    max-width: 100%;
    background-color: #0d0d0d;
}
.msgInputGroup{
    border-radius: 5rem;
}
input,textarea{
     border-radius: 5rem;
    background-color: #0d0d0d;
    color: #fff;
}
input:focus,textarea:focus{
    background-color: #0d0d0d;
    color: #fff;
    box-shadow: none!important;
}

    /* Hide scrollbar for Chrome, Safari and Opera */
textarea::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
textarea {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.msginput{
    box-shadow: none!important;
    border: none;
}
.sendBtn{
    background: none;
    border: none;
}
.sendIcon{
    transform: rotate(45deg);
}
@media(min-width: 768px){
    .messageBox,.messageInput{
        width: 60%;
        margin: auto;
    }
}
@media(min-width: 992px){
    .messageBox,.messageInput{
        width: 50%;
        margin: auto;
    }
}
</style>