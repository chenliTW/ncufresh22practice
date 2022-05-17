<template>
  <div class="relative top-60 flex text-white">
        <div class="border-2 border-white w-80 m-auto">
            <br>
            <br>
            <span class="ml-10">帳號：</span><input name="username" class="text-black" type="text" v-model="username" required>
            <br>
            <br>
            <span class="ml-10">密碼：</span><input name="password" class="text-black" type="password" v-model="password" required>
            <br>
            <br>
            <div class="flex">
                <button class="m-auto border-1 bg-white text-black px-3" @click="login">登入</button>
            </div>
            <br>
            <div v-if="error!==''" class="flex">
                <div class="m-auto text-red-600 text-xl">{{error}}</div>
            </div>
            <br v-if="error!==''">
        </div>
    </div>
</template>

<script>

import {ref,inject} from "vue";

import axios from 'axios';

export default {
    name:'Log-in',
    emits:['set_token','change_page'],
    setup(props,{ emit }){
        const username=ref("");
        const password=ref("");
        const error=ref("");

        const API=inject('API');

        function login(){
            axios.post(API+'/users/login', {
                username: username.value,
                password: password.value,
            })
            .then(response => {
                if(response.data.success){
                    emit('set_token', response.data.token);
                    emit('change_page', 'Index');
                }else{
                    error.value=response.data.error;
                }
            })
            .catch(error => {
                console.log(error);
            })
        }

        return {username,password,
                login
                }
    }
}
</script>

<style>

</style>