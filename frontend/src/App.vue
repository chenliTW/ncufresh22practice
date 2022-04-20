<template>
  <Navbar :username="username" @change_page="change_page"/>
  <Login v-if="stage==='Login'"/>
  <Index v-if="stage==='Index'"/>
  <Register v-if="stage==='Register'" />
</template>

<script>
import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'
import Index from './components/Index.vue'
import Register from './components/Register.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Login,
    Index,
    Register
  },
  methods:{
    change_page(page){
      this.stage = page;
    }
  },
  data() {
    return {
      username: '',
      stage: 'Index'
    }
  }
}
</script>

<style>
  body{
    background-color: #000000;
  }
</style>
