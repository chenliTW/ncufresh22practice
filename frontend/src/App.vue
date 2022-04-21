<template>
  <Navbar :username="username" :post_id="post_id" :token="token" :stage="stage" @change_page="change_page" @set_username="set_username"/>
  <Login v-if="stage==='Login'" @change_page="change_page" @set_username="set_username" @set_token="set_token"/>
  <Index v-if="stage==='Index'" @view_post="view_post"/>
  <Register v-if="stage==='Register'" @change_page="change_page"/>
  <Newpost v-if="stage==='Newpost'" :token="token" @change_page="change_page"/>
  <Viewpost v-if="stage==='Viewpost'" :post_id="post_id" :username="username"/>

</template>

<script>
import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'
import Index from './components/Index.vue'
import Register from './components/Register.vue'
import Newpost from './components/Newpost.vue'
import Viewpost from './components/Viewpost.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Login,
    Index,
    Register,
    Newpost,
    Viewpost
  },
  methods:{
    change_page(page){
      this.stage = page;
    },
    set_username(username){
      this.username = username;
    },
    set_token(token){
      this.token = token;
    },
    view_post(pid){
      this.post_id = pid;
      this.stage = 'Viewpost';
    }
  },
  data() {
    return {
      username: '',
      token: '',
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
