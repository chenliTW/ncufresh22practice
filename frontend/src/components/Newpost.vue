<template>
    <div class="relative top-12 px-24 py-12">
      <div>
        <div class="flex">
          <div class="text-2xl text-white w-20 flex-initial">標題:</div>
          <input class="bg-gray-300 text-2xl flex-1 mr-10" name="title" v-model="title" required>
        </div>
        <br>
        <div class="flex">
          <div class="text-2xl text-white w-20 flex-initial">內文:</div>
          <textarea class="bg-gray-300 text-2xl flex-1 mr-10" name="body" v-model="body" rows="8"></textarea>
        </div>
        <br>
        <div class="flex">
          <div class="flex-1"></div>
          <div class="m-auto">
            <button class="bg-white text-black px-2 py-1" @click="newpost()" required>建立文章</button>
          </div>
          <div class="flex-1"></div>
        </div>
      </div>
    </div>
</template>

<script>

import {ref,inject} from "vue"

import axios from 'axios'

export default {
    name:'New-post',
    props:['token'],
    emits:['change_page'],
    setup(props,{emit}){
      const title=ref("");
      const body=ref("");

      const API=inject('API');

      function newpost(){
        axios.post(API+'/posts/new', {
            title: title.value,
            body: body.value,
            token: props.token
        })
        .then(response => {
            if(response.data.success){
                emit('change_page', 'Index');
            }else{
                alert(response.data.error);
                //error=response.data.error;
            }
        })
        .catch(error => {
            console.log(error);
        })
      }
      return {
        title,body,
        newpost
      }
    }
    
}
</script>

<style>

</style>