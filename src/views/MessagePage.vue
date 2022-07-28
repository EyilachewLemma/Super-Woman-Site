<template>
<div class="wraper">
    <div class="messageBox">
    <div class="mentorProfile d-flex justify-content-start px-3 px-lg-5 py-2">
<button  @click="$router.back()" class="text-white backBtn align-self-center me-4 fs-4"><i class="fa-solid fa-angle-left"></i></button>
 <div class="profileCircle rounded-circle text-white me-3">
  <img :src="myMentor?.profile_picture" alt="mentor profile" class="img-fluid rounded-circle">
   </div>  
   <div class="text-white align-self-center">Eden Getachew</div>
    </div> 
    <div class="px-2">
        <div class="pt-3" v-for="message in messages" :key="message.id">
        <div v-if="message.sender === 'mentor'" class="d-flex me-5">        
        <div class="smProfileCircle rounded-circle text-white me-2 align-self-end">
           <img :src="myMentor?.profile_picture" alt="mentor profile" class="img-fluid rounded-circle">
            </div> 
           <div class="position-relative text-white userone rounded p-2">
            <div class="editDeletet rounded shadow-sm px-2">
                    <button @click="editMessage()" class="editBtn ms-auto border rounded me-3 small">edit</button>
                 <button @click="deleteMessage()" class="deleteBtn small border rounded">delete</button>
                </div> 
               <div class="text-break pt-1">{{message.message}}</div>
               <p class="small pt-1 ms-auto my-0 d-flex">
                <span class="ms-auto">{{formatDate(message.created_at)}}</span>
                </p>              
           </div>
           </div>
           <div v-else class="position-relative text-white  mt-2 usertwo d-flex">
               <div class="ms-auto bgforusertwo rounded p-2">
                <div class="editDeletet px-2">
                <button @click="editMessage(message.id)" class="editBtn ms-auto me-3 small border rounded">edit</button>
                 <button @click="deleteMessage(message.id)" class="deleteBtn small border rounded">delete</button>               
            </div>
                <div class="text-break">{{message.message}}</div>
               <p class="small pt-1 ms-auto my-0 d-flex">
                <span class="ms-auto">{{formatDate(message.created_at)}}</span>
                </p>
               </div>
           </div>
        </div>
          <div class="pt-3 messageInputContainer pb-1">
          <div class="input-group mb-3 msgInputGroup border px-3">
        <input type="text" class="form-control form-control-lg msginput" placeholder="write message" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="newMessage" @keyup.enter.prevent="sendMessage()">
       <button @click="sendMessage()" class="text-primary fs-4" type="button" id="sendBtn"><i class="fas fa-paper-plane"></i></button>
     </div>
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

        }
    },
    created() {
        this.$store.dispatch('fetchMyMentor')
        this.listenForChanges(),
        this.featchMessages()
    },
    computed:{
        myMentor(){
            return this.$store.getters.myMentor
        }
    },
    methods: {
       async featchMessages(){
            try{
                var response = await apiClient.get('user/messages')
                if(response.status === 200){
                    this.messages = response.data
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
                    //  var index = (this.messages?.length -1)
                    // this.messages[index] = response.data
                    // console.log('msgLength=',index)
                    this.messages = []
                    this.newMessage = ''
                    console.log(response.data)
                    
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
      pusher.subscribe('chat') 
      pusher.bind('newMessage', data => { 
           this.messages= data.message
      }) 
        },
        formatDate(createdAt){
            var date = new Date(createdAt)      
       console.log('date',date.toLocaleString());
       return date.toLocaleString()
    },        
       editMessage(){},
        deleteMessage(){},
    },
}
</script>
<style scoped>
.wraper{
    width: 100%;
    background-color: #0f0e1c;
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
    max-width: 3rem;
    min-height: 3rem;
    max-height: 3rem;
    background-color: #e7453a;
    overflow: hidden;
}
.smProfileCircle img{
    min-width: 100%;
    max-height: 100%;
    min-height: 100%;
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
.messageInputContainer{
    background-color: #0d0d0d;
}
.msgInputGroup{
    border-radius: 5rem;
}
input{
     border-radius: 5rem;
    background-color: #0d0d0d;
    color: #fff;
}
input:focus{
    background-color: #0d0d0d;
    color: #fff;
}
.msginput{
    box-shadow: none!important;
    border: none;
}
#sendBtn{
    background: none;
    border: none;
}
@media(min-width: 768px){
    .messageBox{
        width: 60%;
        margin: auto;
    }
}
@media(min-width: 992px){
    .messageBox{
        width: 50%;
        margin: auto;
    }
}
</style>