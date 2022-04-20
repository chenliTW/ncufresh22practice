<template>
  <div class="relative top-60 flex text-white">
        <form method="post" class="border-2 border-white w-80 m-auto">
            <br>
            <br>
            <span class="ml-10">帳號：</span><input name="username" class="text-black" type="text" required>
            <br>
            <br>
            <span class="ml-10">密碼：</span><input name="password" class="text-black" type="text" required>
            <br>
            <br>
            <span class="ml-10">確認：</span><input name="passwordchk" class="text-black" type="text" required>
            <br>
            <br>
            <div class="flex">
                <button class="m-auto border-1 bg-white text-black px-3">註冊帳戶</button>
            </div>
            <br>
        </form>
    </div>
</template>

<script>
export default {
    name:"regis-ter",
}
</script>

<style>

</style>