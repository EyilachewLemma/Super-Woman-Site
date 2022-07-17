import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import BaseModal from './components/BaseModal'
import BottomNav from './components/BottomNav'
const app = createApp(App)
app.use(VueTelInput)
app.component('BaseModal', BaseModal)
app.component('BottomNav', BottomNav)
app.use(store).use(router).mount('#app')