<script setup>
    function check(){
        const password = document.querySelector('input[id=password]');
        const confirm = document.querySelector('input[id=confrimpassword]');
        if (confirm.value === password.value) {
            confirm.setCustomValidity('');
        } else {
            confirm.setCustomValidity('Passwords do not match');
        }
    }
    function put(){
        var s = document.getElementById('url');
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
</script>

<template>
    <div class="d-flex justify-content-center flex-nowrap">
        <div class="row" style=";width: 1000px;height: 70px; background-color: black;color: white; padding: 10px;border-radius: 10px;">
            <h4 class="col-4" @click="logout" style="color: rebeccapurple;margin;: left: 100px;"><i class="fa fa-sign-out"></i></h4>
            <h1 style="text-align: center;" @click="this.$router.push({ name: 'home' })">TRAVELING APP</h1>
            
        </div>
    </div>
    <div class="d-flex justify-content-center flex-nowrap">
        <div class="row" style="width:1000px;margin-top: 10px; background-color: grey;padding: 20px;border-radius: 10px;">
            <div class="col-7"  style="height: 600px;width: 100%;overflow: auto;" >
                <div class="d-flex justify-content-center" :key="index" v-for="(post, index) in posts"> 
                    <router-link :to="{name: 'view',params:{id:post._id}}">
                        <div style="width:400px;border-radius: 10px;border: 2px solid blue;padding: 10px;text-align: start;background-color: lightslategrey; margin-bottom: 10px;">
                            <div class="row" style="margin: 10px;">
                                <div style="width: 60px;height: 60px;border: 2px solid red;border-radius: 100px;padding: 2px;">
                                    <img :src="post.ui_url" style="border-radius: 100px;width: 100%;height: 100%;">
                                </div>
                                <div class="col" style="height: 60px;">
                                    <h4 style="color: white;">{{ post.username }}</h4>
                                    <h6 style="color: darkgrey;">{{post.time}}</h6>
                                </div>
                            </div>
                            <div style="border-radius: 10px;border: 2px solid green;padding: 5px;">
                                <h5 style="color: white;">{{ post.message }}</h5>
                                <img :src="post.url" alt="" style="border-radius: 10px; width: 100%;">
                            </div>
                        </div>
                </router-link> 
                </div>
                
                
            </div>
            <div class="col-5" style="width: 100%;">
                <div class="d-flex justify-content-center" style="width: 100%; background-color: lightslategray; padding: 10px; border-radius: 10px;">
                    <form action="" @submit="update" style="text-align: center;">
                        <div class="form-group row">
                            <div class="col-4">
                                <div style="border: 2px solid red;height: 45px;width: 45px;border-radius: 100px; padding: 2px;">
                                    <img id="img" :src="contact.url" alt="" style="border-radius: 1000px; width: 100%;height: 100%;">
                                </div>
                            </div>
                            
                            <input type="text" class="form-control col-7" id="url" v-model="contact.url" @change="put" placeholder="Input image url" style="color: darkgreen;background-color: transparent;border: 2px solid darkgreen; border-radius: 10px;height: 45px;">
                        </div>
                        <div class="form-group row">
                            <h6 class="col-4" style="padding-top: 5px;">UserName</h6>
                            <input type="text" class="form-control col-7" id="username" v-model="contact.username" @change="search" required style="text-align: left; color: darkblue;background-color: transparent;border: 2px solid darkgreen; border-radius: 10px;">
                        </div>
                        <div class="form-group row">
                            <h6 class="col-4" style="padding-top: 5px;">Password</h6>
                            <input type="password" class="form-control col-7" id="password" v-model="contact.pass" required minlength="5" style="text-align: left; color: darkblue;background-color: transparent;border: 2px solid darkgreen; border-radius: 10px;">
                        </div>
                        <div class="form-group row">
                            <h6 class="col-4"></h6>
                            <input type="password" class="form-control col-7" id="confrimpassword" required placeholder="Confirm password" @change="check" style="text-align: left; color: darkgreen;background-color: transparent;border: 2px solid darkgreen; border-radius: 10px;">
                        </div>
                        
                        <button type="submit" class="btn btn-success" style="border: 2px solid darkgreen;border-radius: 10px; width: 50%;">save</button>
                    </form>
                </div>
                <hr>
                <div class="justify-content-center" style="width: 100%; background-color: lightslategray; padding: 10px; border-radius: 10px; margin-top: 20px;">
                    <h4 style="text-align: center;">Post something</h4><hr>
                    <router-link :to="{name: 'upload'}">
                        <div class="d-flex justify-content-center" @click="upload"><button class="btn btn-success">
                            <i class="fa fa-add" style="font-size: 50px;"></i>
                        </button></div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default{
        data() {
            return {
                contact:[],
                posts: [],
                temp:{
                    url:null
                } 
            }
        },
        mounted() {
            axios.get('http://localhost:3000/contacts/' + localStorage.getItem('storedData'))
            .then((response) => {
                    //console.log(response.data);
                    this.contact = response.data;
                    //console.log(this.posts[0].username)
                    console.log(this.contact)
                })
                .catch((error) => {
                    console.log(error);
                });
            
            // console.log(urlid)
            axios.get('http://localhost:3000/post/')
                // console.log('http://localhost:4580/api/sanpham/' + urlid)
                .then((response) => {
                    //console.log(response.data);
                    this.posts = response.data;
                    this.posts.forEach((post)=>{
                        axios.get('http://localhost:3000/contacts/'+post.username)
                        .then((response)=>{
                            // console.log(response.data.url);
                            post.ui_url = response.data.url;
                            //console.log(this.temp)
                            console.log(post.ui_url)
                        });
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        methods:{
            upload(){
                this.$route.push({name:'upload'})
            },
            view(){
                this.$route.push({name:'view'})
            },
            search(){
                const name = document.getElementById('username')
                //console.log(event.target.value);
                axios.get(`http://localhost:3000/contacts/`+event.target.value)
                // console.log('http://localhost:4580/api/sanpham/' + urlid)
                .then((response) => {
                    //console.log(response.data);
                    this.new = response.data;
                    //console.log(this.new.username)
                    if(this.new.username == name.value){
                        name.setCustomValidity('Username already existed');
                    } else {
                        name.setCustomValidity('');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            update(){
                if(confirm('This will change your account information, continue?')){
                    try{
                        localStorage.setItem('storedData', this.contact.username);
                        axios.put('http://localhost:3000/contacts/'+this.contact._id,this.contact);
                        
                    }catch(e){
                        alert(e)
                    }
                }
            },
            logout(){
                if(confirm('This will sign-out, continue?')){
                    localStorage.setItem('storedData', null);
                    this.$router.push({ name: 'signin' })
                }
            }
        }
    }
</script>