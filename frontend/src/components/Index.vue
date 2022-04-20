<template>
    <div class="relative top-20 p-5">
        <div v-for="post in posts" :key="post">
            <div class="m-2 p-2 flex" style="background-color: rgb(17, 17, 17);">
                <div class="inline text-green-400 text-xl w-8 flex-initial">{{post.comments.length}}</div>
                <div class="inline flex-1">
                    <a id="title<%=i%>" href="/view/<%= posts[i].id %>" >
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
export default {
    name:'In-dex',
    data(){
        return {
            posts: [],
        }
    },
    /*mounted:{
        function(){
        axios.get('http://localhost:8000/posts/list')
        .then(response => (this.posts = response.data))
        .catch(error => console.log(error))
        },
    }*/
}
</script>

<style>

</style>