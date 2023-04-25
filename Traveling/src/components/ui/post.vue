<script setup>
    function put(){
        var s = document.getElementById('image');
        var a = document.getElementById('img');
        // if(s.files && s.files[0]){
        //     var reader = new FileReader();
        //     reader.onload = function (e){
        //         a.setAttribute('src',e.target.result)
        //     }
        //     reader.readAsDataURL(s.files[0])
        // }
        a.setAttribute('src',s.value);
        //alert(s.value);
        
    }
    // function set(){
    //     const now = new Date();
    //     const currentTime = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    //     document.getElementById("time").value = currentTime;
    //     document.getElementById("username").value = localStorage.getItem('storedData');
    // }
</script>

<template>
    <div class="d-flex justify-content-center" style="padding-top: 20px;">
        <form action="/home" @submit="submitpost" style="width:400px;border-radius: 10px;border: 2px solid blue;padding: 10px;text-align: start;background-color: lightslategrey; margin-bottom: 10px;">
            <div class="row" style="margin: 10px;">
                <div style="width: 60px;height: 60px;border: 2px solid red;border-radius: 100px;padding: 2px;">
                    <img :src="img.url" style="border-radius: 100px;width: 100%;height: 100%;">
                </div>
                <div class="col" style="height: 60px;">
                    <div class="form-group">
                        <input type="text" class="form-control" id="username" disabled v-model="post.username" style="text-align: left: ; color: white;background-color: transparent; height: 30px;">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" id="time" disabled v-model="post.time" style="text-align: left: ; color: black;background-color: transparent; height: 20px;">
                    </div>
                </div>
            </div>
            <div style="border-radius: 10px;border: 2px solid green;padding: 5px; margin-bottom: 10px;">
                <div class="form-group">
                    <textarea class="form-control" id="message" v-model="post.message" required placeholder="Write something" style="width: 100%;height: 100px;"></textarea>
                    <!-- <input type="text" class="form-control" id="message" placeholder="Title your post" style="text-align: left: ; color: white;background-color: transparent; height: 50px;"> -->
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" id="image" v-model="post.url" placeholder="input image url" style="color: black;background-color: transparent; height: 50px;" @change="put">
                </div>
                <img id="img" src="" alt="" style="border-radius: 10px; width: 100%;">
            </div>
            <button type="submit" class="btn btn-success" style="border: 2px solid darkgreen;border-radius: 10px; width: 100%;">Post</button>
        </form>
    </div>
</template>
<script>
    import axios from 'axios';
    export default{
        data(){
            return{
                post:{
                    message:null,
                    time:null,
                    url:null,
                    username:null
                },
                img:{
                    url:null
                }
            }
        },
        mounted(){
            const now = new Date();
            const currentTime = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
            this.post.username = localStorage.getItem('storedData');
            this.post.time = currentTime;
            axios.get('http://localhost:3000/contacts/'+this.post.username)
                .then((response)=>{
                    // console.log(response.data.url);
                    this.img.url = response.data.url;
                    //console.log(this.temp)
                    //console.log(this.img)
                });
        },
        methods:{
            submitpost(){
                try{
                    axios.post('http://localhost:3000/post/',this.post);
                }catch(e){
                    alert(e)
                }
            }
        }
    }
</script>