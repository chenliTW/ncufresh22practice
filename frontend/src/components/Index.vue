<template>
    <div class="relative top-20 p-5">
        <div v-for="(post,index) in posts" :key="index">
            <div class="m-2 p-2 flex" style="background-color: rgb(17, 17, 17);">
                <div class="inline text-green-400 text-xl w-8 flex-initial">{{post.comments.length}}</div>
                <div class="inline flex-1">
                    <a id="title<%=i%>" :class="(mouseon[index])?('bg-white text-black text-xl'):('bg-black text-white text-xl')" @click="view_post(post.id)" @mouseenter="()=>{this.mouseon[index]=1}" @mouseleave="()=>{this.mouseon[index]=0}" >
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

import axios from 'axios'

export default {
    name:'In-dex',
    data(){
        return {
            posts: [],
            mouseon:[]
        }
    },
    mounted(){
        axios.get(this.API+'/posts/list')
        .then(response => {
            this.posts = response.data;
            this.mouseon = new Array(this.posts.length).fill(false)
            })
        .catch(error => console.log(error))
    },
    methods:{
        view_post(id){
            this.$emit('view_post', id)
        },
    }
}
</script>

<style>

</style>