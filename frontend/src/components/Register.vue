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
            <span class="ml-10">確認：</span><input name="passwordchk" class="text-black" type="password" v-model="password_chk" required>
            <br>
            <br>
            <div class="flex">
                <button class="m-auto border-1 bg-white text-black px-3" @click="register()">註冊帳戶</button>
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
    name:"regis-ter",
    emits:['change_page'],
    setup(props,{emit}){
        const username=ref("");
        const password=ref("");
        const password_chk=ref("");
        const error=ref("");

        const API=inject('API');

        function register(){
            if(password.value != password_chk.value){
                error.value='密碼不一致';
                return;
            }
            axios.post(API+'/users/new', {
                username: username.value,
                password: password.value
            })
            .then(response => {
                if(response.data.success){
                    emit('change_page', 'Login');
                }else{
                    error.value=response.data.error;
                }
            })
            .catch(error => console.log(error));
        }

        return {
            username,password,password_chk,error,
            register
        }
    }
}
</script>

<style>

</style>