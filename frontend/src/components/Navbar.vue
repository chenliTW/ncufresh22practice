<template>
  <div>
    <nav class="h-12 z-50 fixed w-full" style="background-color: rgb(12, 10, 102);">
      <div class="pt-1 px-2">
        <a class="text-yellow-200 text-2xl fixed top-2" href="/">留言板(?</a>
        
        <div v-if="username === ''">
          <button class="bg-green-800 text-xl text-white py-1 px-4 rounded fixed top-2 right-24" @click="change_page('Login')">登入</button>
          <button class="bg-green-800 text-xl text-white py-1 px-4 rounded fixed top-2 right-2" @click="change_page('Register')">註冊</button>
        </div>
        <div v-if="username !== ''">
          <span class="text-yellow-200 text-2xl fixed top-2 right-52" href="/" hidden>早安, {{username}} </span>
          <button class="bg-green-800 text-xl text-white py-1 px-4 rounded fixed top-2 mx-1 right-20" onclick="location.href='/new'" >新文章</button>
          <button class="bg-red-800 text-xl text-white py-1 px-4 rounded fixed top-2 right-2" onclick="location.href='/logout'">登出</button>
        </div>
      </div>
    </nav>

    <div class="fixed bg-gray-300 text-lg w-full -bottom-0 h-7 z-50 flex">
      <span class="ml-8 px-3 text-yellow-300 bg-purple-500 w-44 flex"><span class="m-auto" id="time">{{time}}</span></span>
      <span v-if="username!==''" class="bg-green-800 px-3 text-white flex-initial">早安, {{ username }}</span>
      <span v-if="username===''" class="bg-green-800 px-3 text-white flex-initial">未登入</span>
      <span class="flex-1 mx-5">
        <input class="w-full" id="comment" >
      </span>
      <span class="flex-initial w-20">
        <button v-if="username!==''" class="px-2 bg-red-500 text-white" onclick="newcomment()">推</button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav-bar',
  props: {
    username: String,
  },
  mounted (){
    this.update_clock();
    setInterval(this.update_clock, 1000);
  },
  data(){
    return {
      time: '',
    }
  },
  methods:{
    update_clock(){
      let clock = new Date();
      let hour = clock.getHours();
      let minute = clock.getMinutes();
      let second = clock.getSeconds();
      this.time= hour + ":" + minute + ":" + second;
    },
    change_page(page){
      this.$emit('change_page', page);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
