<template>
  <Navbar :username="username" :post_id="post_id" :token="token" :stage="stage" @change_page="change_page" @set_token="set_token"/>
  <Login v-if="stage==='Login'" @change_page="change_page" @set_token="set_token"/>
  <Index v-if="stage==='Index'" @view_post="view_post" @change_page="change_page"/>
  <Register v-if="stage==='Register'" @change_page="change_page"/>
  <Newpost v-if="stage==='Newpost'" :token="token" @change_page="change_page"/>
  <Viewpost v-if="stage==='Viewpost'" :post_id="post_id" :username="username" :token="token" @change_page="change_page"/>

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
  data() {
    return {
      username: '',
      token: '',
      stage: 'Index',
      post_id: '',
    }
  },
  mounted(){
    this.set_username();
  },
  updated(){
    if(this.stage==='reload_Viewpost'){
      this.stage='Viewpost';
    }else if(this.stage!=='Viewpost'){
      this.post_id='';
    }
    if(this.stage==='reload_Index'){
      this.stage='Index';
    }
    
  },
  methods:{
    change_page(page){
      this.stage = page;
    },
    set_username(){
      try{
        this.token=document.cookie.split('token=')[1].split(';')[0];
        this.username=JSON.parse(atob(this.token.split('.')[1])).username;
      }catch(e){
        this.token='';
        this.username='';
      }
    },
    set_token(token){
      this.token = token;
      document.cookie = 'token='+token+';';
      this.set_username();
    },
    view_post(pid){
      this.post_id = pid;
      this.stage = 'Viewpost';
    }
  }
}
</script>

<style>
  body{
    background-color: #000000;
  }
</style>
