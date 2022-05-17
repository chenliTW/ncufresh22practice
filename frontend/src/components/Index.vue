<template>
    <div class="relative top-20 p-5">
        <div v-for="(post,index) in posts.posts" :key="index">
            <div class="m-2 p-2 flex" style="background-color: rgb(17, 17, 17);">
                <div class="inline text-green-400 text-xl w-8 flex-initial">{{post.comments.length}}</div>
                <div class="inline flex-1">
                    <a id="title<%=i%>" :class="(mouseon.mouseon[index])?('bg-white text-black text-xl'):('bg-black text-white text-xl')" @click="view_post(post.id)" @mouseenter="()=>{mouseon.mouseon[index]=1}" @mouseleave="()=>{mouseon.mouseon[index]=0}" >
                        [問卦] {{ post.title }}
                    </a>
                    <br>
                    <p class="text-white">{{ post.author }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {onMounted,reactive,inject} from "vue";

import axios from 'axios'

export default {
    name:'In-dex',
    emits: ['view_post'],
    setup(props,{ emit }){
        const posts=reactive({
            posts:[]
        });
        const mouseon=reactive({
            mouseon:[]
        })

        const API=inject('API');

        function view_post(id){
            emit('view_post', id)
        }

        onMounted(()=>{
            axios.get(API+'/posts/list')
            .then(response => {
                posts.posts = response.data;
                mouseon.mouseon = new Array(posts.posts.length).fill(false)
                })
            .catch(error => console.log(error))
        });

        return {
            posts,mouseon,
            view_post
        }
    }
}
</script>

<style>

</style>