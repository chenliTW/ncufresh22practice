import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone,faXmark,faFloppyDisk,faPenToSquare } from "@fortawesome/free-solid-svg-icons";

library.add(faPhone,faXmark,faFloppyDisk,faPenToSquare);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
