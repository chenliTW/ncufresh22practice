import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

import { library } from "@fortawesome/fontawesome-svg-core";
//import { faPhone,faXmark,faFloppyDisk,faPenToSquare } from "@fortawesome/free-solid-svg-icons";

//library.add(faPhone,faXmark,faFloppyDisk,faPenToSquare);

import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app=createApp(App)

app.config.globalProperties.API = 'http://127.0.0.1:8000';

app.component("font-awesome-icon", FontAwesomeIcon).mount('#app')
