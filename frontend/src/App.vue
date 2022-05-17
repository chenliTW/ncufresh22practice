<template>
  <Navbar :username="username" :post_id="post_id" :token="token" :stage="stage" @change_page="change_page" @set_token="set_token"/>
  <Login v-if="stage==='Login'" @change_page="change_page" @set_token="set_token"/>
  <Index v-if="stage==='Index'" @view_post="view_post" @change_page="change_page"/>
  <Register v-if="stage==='Register'" @change_page="change_page"/>
  <Newpost v-if="stage==='Newpost'" :token="token" @change_page="change_page"/>
  <Viewpost v-if="stage==='Viewpost'" :post_id="post_id" :username="username" :token="token" @change_page="change_page"/>
</template>

<script>

import {ref,onMounted,onUpdated} from "vue";

import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'
import Index from './components/Index.vue'
import Register from './components/Register.vue'
import Newpost from './components/Newpost.vue'
import Viewpost from './components/Viewpost.vue'

export default {
  name: 'App',
  provide:{
    API:''
  },
  components:{
    Navbar,
    Login,
    Index,
    Register,
    Newpost,
    Viewpost
  },
  setup(){

    const username=ref("");
    const token=ref("");
    const stage=ref("Index");
    const post_id=ref("");
    
    function change_page(page){
      stage.value = page;
    }

    function set_username(){
      try{
        token.value=document.cookie.split('token=')[1].split(';')[0];
        username.value=JSON.parse(atob(token.value.split('.')[1])).username;
      }catch(e){
        token.value='';
        username.value='';
      }
    }

    function set_token(_token){
      token.value = _token;
      document.cookie = 'token='+_token+';';
      set_username();
    }

    function view_post(pid){
      post_id.value = pid;
      stage.value = 'Viewpost';
    }
    
    onMounted(()=>{
      set_username();
    });
    
    onUpdated(()=>{
      if(stage.value==='reload_Viewpost'){
        stage.value='Viewpost';
      }else if(stage.value!=='Viewpost'){
        post_id.value='';
      }
      if(stage.value==='reload_Index'){
        stage.value='Index';
      }
    });

    return {
      username,token,stage,post_id,
      change_page,set_token,view_post
    }
  }
}
</script>

<style>
  body{
    background-color: #000000;
  }
</style>
