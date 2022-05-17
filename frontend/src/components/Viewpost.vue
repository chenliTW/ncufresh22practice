<template>
    <div class="flex top-12 relative lg:px-10 xl:px-16 ">
      <span class="flex-initial text-white bg-gray-400 text-blue-900 px-3 w-18">
        <div>作者</div>
        <div>標題</div>
        <div>時間</div>
      </span>
      <span class="flex-1 bg-blue-900 text-gray-400 px-2">
        <div class="flex">
          <span class="flex-1">{{ post.author }}</span>
          <span class="flex-initial w-auto">
            <span class="bg-gray-400 px-2 text-blue-900">看板</span>
            <span class="px-2">Gossiping(?</span>
          </span>
        </div>
        <div class="flex"><span class="flex-1">{{ post.title }}</span>
          <span v-if="username===post.author" class="flex-initial w-42 pr-4">
            <span v-if="mode==='view'" id="bodyeditbtn" class="px-1" @click="change_mode('edit')">
              <font-awesome-icon icon="pen-to-square" />
            </span>
            <span v-if="mode==='view'" id="bodydeletebtn" class="px-1" @click="delete_post(post.id)">
              <font-awesome-icon icon="xmark" />
            </span>
            <span v-if="mode==='edit'" id="bodysavebtn" class="px-1" @click="put_post()">
              <font-awesome-icon icon="floppy-disk" />     
            </span>
          </span>
        </div>
        <div>{{ post.date }}</div>
      </span>
    </div>
    
    <br>
    <div class="xl:px-16 px-12 sm:text-sm lg:text-xl text-clip overflow-hidden">
      <pre v-if="mode!=='edit'" class="text-white pt-12 pb-4">{{ post.body }}</pre>
      <textarea v-if="mode==='edit'" id="bodytextarea" class="bg-gray-300 text-black w-full mt-12" rows="10" v-model="post.body"></textarea>
      <div class="text-white">
        ---
      </div>
      <div class="text-green-600">
        ※ 發信站: 批??實業坊(p??.cc), 來自: {{ post.ip }} (???)<br>
        ※ 文章網址: <a id="post_url"></a>
      </div>
      <div>
        <div v-for="comment in post.comments" :key="comment" class="flex">
        <span class="mr-3 flex-initial"><span class="text-white px-2">推</span><span class="text-yellow-300">{{ comment.author }}:</span></span>
        <span class="text-yellow-500 flex-1">
            {{ comment.body }}
        </span>
        <span class="flex-initial">
            <span v-if="comment.author===username" class="text-red-800" @click="delete_comment(comment.index)">
                <font-awesome-icon icon="xmark" />
            </span>
            
            <span class="text-yellow-300 mx-3">{{ comment.ip }}</span>
            <span class="text-yellow-300">{{ comment.date.split('.')[0] }}</span>
        </span>
        </div>
      </div>
    </div>
    <div class="h-20">

    </div>
</template>

<script>

import {onMounted, ref,inject} from "vue";

import axios from 'axios'

export default {
    name:"View-post",
    props:['post_id','username','token'],
    emits:['change_page'],  
    setup(props,{emit}){
      const post=ref("");
      const mode=ref("view");

      const API=inject('API');

      onMounted(()=>{
        update_post();
      })

      function update_post(){
        axios.get(API+'/posts/get?id='+props.post_id)
        .then(response => (post.value = response.data.post))
        .catch(error => console.log(error))
      }
      function delete_post(id){
        axios.delete(API+'/posts/'+id+'/delete?token='+props.token)
        .then(response => {
          if(response.data.success){
            axios.get(API+'/posts/get?id='+props.post_id)
            .then(response => (post.value.comments = response.data.post.comments))
            .catch(error => console.log(error))
            emit('change_page','Index');
          }
        })
        .catch(error => console.log(error))
      }
      function delete_comment(index){
        axios.delete(API+'/posts/'+props.post_id+'/comment/'+index+'/delete?token='+props.token)
        .then(response => {
          if(response.data.success){
            post.value.comments.splice(index,1);
            emit('change_page','reload_Viewpost');
          }
        })
        .catch(error => console.log(error))
      }
      function put_post(){
        axios.put(API+'/posts/'+props.post_id+'/edit',{
          token:props.token,
          body:post.value.body
        })
        .then(response => {
          if(response.data.success){
            mode.value = "view";
          }
        })
        .catch(error => console.log(error))
      }

      function change_mode(new_mode){
        mode.value=new_mode;
      }

      return {
        post,mode,
        delete_post,delete_comment,put_post,change_mode
      }

    }
}
</script>

<style>

</style>