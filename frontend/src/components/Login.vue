<template>
  <div class="relative top-60 flex text-white">
        <form method="post" class="border-2 border-white w-80 m-auto">
            <br>
            <br>
            <span class="ml-10">帳號：</span><input name="username" class="text-black" type="text" v-model="username" required>
            <br>
            <br>
            <span class="ml-10">密碼：</span><input name="password" class="text-black" type="text" v-model="password" required>
            <br>
            <br>
            <div class="flex">
                <button class="m-auto border-1 bg-white text-black px-3" @click="login">登入</button>
            </div>
            <br>
        </form>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name:'Log-in',
    data(){
        return {
            username: '',
            password: '',
        }
    },
    methods:{
        login(){
            let data = {
                username: this.username,
                password: this.password,
            }
            axios.post('http://localhost:8000/users/login', data)
            .then(response => {
                if(response.data.status === 'success'){
                    this.$emit('change_page', 'Index');
                }
                else{
                    alert('帳號或密碼錯誤');
                }
            })
            .catch(error => {
                console.log(error);
            })
        },
    }
}
</script>

<style>

</style>