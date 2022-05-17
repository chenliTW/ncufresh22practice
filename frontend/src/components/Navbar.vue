<template>
  <div>
    <nav class="h-12 z-50 fixed w-full" style="background-color: rgb(12, 10, 102);">
      <div class="pt-1 px-2">
        <a class="text-yellow-200 text-2xl fixed top-2" @click="change_page('Index')">留言板(?</a>
        
        <div v-if="username === ''">
          <button class="bg-green-800 text-xl text-white py-1 px-4 rounded fixed top-2 right-24" @click="change_page('Login')">登入</button>
          <button class="bg-green-800 text-xl text-white py-1 px-4 rounded fixed top-2 right-2" @click="change_page('Register')">註冊</button>
        </div>
        <div v-if="username !== ''">
          <span class="text-yellow-200 text-2xl fixed top-2 right-52" href="/" hidden>早安, {{username}} </span>
          <button class="bg-green-800 text-xl text-white py-1 px-4 rounded fixed top-2 mx-1 right-20" @click="change_page('Newpost')" >新文章</button>
          <button class="bg-red-800 text-xl text-white py-1 px-4 rounded fixed top-2 right-2" @click="this.$emit('set_token','')">登出</button>
        </div>
      </div>
    </nav>

    <div class="fixed bg-gray-300 text-lg w-full -bottom-0 h-7 z-50 flex">
      <span class="ml-8 px-3 text-yellow-300 bg-purple-500 w-44 flex"><span class="m-auto" id="time">{{time}}</span></span>
      <span v-if="username!==''" class="bg-green-800 px-3 text-white flex-initial">早安, {{ username }}</span>
      <span v-if="username===''" class="bg-green-800 px-3 text-white flex-initial">未登入</span>
      <span class="flex-1 mx-5">
        <input v-if="username!==''" class="w-full" v-model="comment" >
        <input v-if="username===''" class="w-full" disable>
      </span>
      <span class="flex-initial w-20">
        <button v-if="username!==''" class="px-2 bg-red-500 text-white" @click="newcomment()">推</button>
      </span>
    </div>
  </div>
</template>

<script>

import {onMounted, ref,inject} from "vue";

import axios from 'axios'

export default {
  name: 'Nav-bar',
  props: ['username','post_id','token','stage'],
  emits: ['change_page'],
  setup(props,{ emit }){
    const time=ref("");
    const comment=ref("");

    const API=inject('API');

    function update_clock(){
      let clock = new Date();
      let hour = clock.getHours();
      let minute = clock.getMinutes();
      let second = clock.getSeconds();
      time.value= hour + ":" + minute + ":" + second;
    }

    function change_page(page){
      emit('change_page', page);
    }

    function newcomment(){
      if(comment.value === ''){
        alert('請輸入留言');
        return;
      }

      axios.post(API+'/posts/'+props.post_id+'/comment/new',{
        token: props.token,
        body: comment.value,
        username: props.username
      })
      .then(() => {
        comment.value='';
        change_page('reload_Viewpost')
      })
      .catch(error => console.log(error));
    }

    onMounted(()=>{
      update_clock();
      setInterval(update_clock,1000);
    })

    return {
      time,comment,
      change_page,newcomment
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
