<template>
    <div class="d-flex justify-content-center flex-nowrap">
        <div class="row" style=";width: 1000px;height: 70px; background-color: black;color: white; padding: 10px;border-radius: 10px;">
            <h4 class="col-4" @click="logout" style="color: rebeccapurple;margin;: left: 100px;"><i class="fa fa-sign-out"></i></h4>
            <h1 style="text-align: center;" @click="this.$router.push({ name: 'home' })">TRAVELING APP</h1>
            
        </div>
    </div>
    <div class="d-flex justify-content-center flex-nowrap" style="margin-top: 10px;">
        <div class="row" style="width: 1000px; background-color: grey;border-radius: 10px;">
            <div class="col-6" style="padding: 50px;">
                <div style="width:400px;border-radius: 10px;border: 2px solid blue;padding: 10px;text-align: start;background-color: lightslategrey; margin-bottom: 10px;">
                    <div class="row" style="margin: 10px;">
                        <div style="width: 60px;height: 60px;border: 2px solid red;border-radius: 100px;padding: 2px;">
                            <img :src="img.url" style="border-radius: 100px;width: 100%;height: 100%;">
                        </div>
                        <div class="col" style="height: 60px;">
                            <h4 style="color: white;">{{ posts.username }}</h4>
                            <h6>{{posts.time}}</h6>
                        </div>
                        <!-- <router-link :to="{name: 'home',}"> -->
                            <div @click="a" style="height: 20px;width: 20px;margin-right: 10px;">
                                <button class="btn btn-danger"  style="border-radius: 100px;"><i class="fa fa-minus"></i></button>
                            </div>
                        <!-- </router-link> -->
                        
                    </div>
                    <div style="border-radius: 10px;border: 2px solid green;padding: 5px;">
                        <h5 style="color: white;">{{ posts.message }}</h5>
                        <img :src="posts.url" style="border-radius: 10px; width: 100%;">
                    </div>
                </div>
            </div>
            <div class="col-6" style="margin-top: 50px;">
                <form @submit="postcomment" class="d-flex justify-content-center">
                    <div class="row" style="background-color: darkseagreen;border-radius: 100px;width: 400px; height: 50px;padding: 7px;margin-top: 10px;">
                        <!-- <input type="text" class="form-control col-10" required placeholder="Write your comment here" style="background-color: transparent;border: transparent;border-radius: 100px;"> -->
                        <textarea class="form-control col-10" rows="1" v-model="new_cmt.message" required style="resize: none;border-radius: 100px;"></textarea>
                        <button class="btn btn-success" type="submit" style="border-radius: 100px;margin-left: 20px;"><i class="fa fa-paper-plane"></i></button>
                    </div>
                    <!-- <input type="text" v-model="newcm.message" hidden id="username">
                    <input type="text" hidden id="time"> -->
                </form>
                <div style="width: 100%;height: 540px; overflow: auto;padding: 20px;margin-top: 10px;">
                    <div class="row" style="border: 2px solid darkgreen;padding: 5px; border-radius: 10px; margin-bottom: 10px;background-color: darkgrey;" :key="index" v-for="(comment, index) in comments">
                        <div class="col-2">
                            <div style="width: 50px;height: 50px; border: 2px solid red;padding: 2px;border-radius: 100px;">
                                <img :src="comment.ui_url" style="width: 100%;height: 100%;border-radius: 100px;">
                            </div>
                        </div>
                        <div class="col-8">
                            <span>{{ comment.time }}</span>
                            <h5>{{ comment.username }}</h5>
                        </div>
                        <div @click="b(comment.username,comment._id)" class="col-1" style="margin-left: 20px;">
                            <button class="btn btn-danger" style="border-radius: 100px;"><i class="fa fa-minus"></i></button>
                        </div>
                        <div style="padding-left: 20px;padding-right: 20px;text-align: justify;">
                            {{ comment.message }}
                        </div>
                    </div>
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
                comments:[],
                posts: [],
                img:{
                    url:null
                },
                new_cmt:{
                    message:null,
                    post_id:null,
                    time:null,
                    username:null
                },
            }
        },
        props:{
            id:{required:true,type:String}
        },
        mounted() {
            var id = this.$route.params.id;
            //axios.get();
            axios.get(`http://localhost:3000/post/`+id)
                .then((response) => {
                    this.posts = response.data;
                    axios.get('http://localhost:3000/contacts/'+this.posts.username)
                        .then((response)=>{
                            this.img.url = response.data.url;
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
            axios.get('http://localhost:3000/comment/'+id)
                .then((response)=>{
                    this.comments = response.data;
                    this.comments.forEach(comment=>{
                        axios.get('http://localhost:3000/contacts/'+comment.username)
                            .then((response)=>{
                                comment.ui_url = response.data.url;
                            });
                    })
                });
            
            
        },
        methods:{
            a(){
                if(localStorage.getItem('storedData') == this.posts.username){
                    if(confirm("Do you really want to delete this post?")){
                        try{
                            axios.delete(`http://localhost:3000/post/`+this.posts._id);
                            this.$router.push({ name: 'home' })
                        }catch(e){
                            alert(e)
                        }
                    } 
                }else {
                    alert("You can't delete this post. It's not yours")  
                }
            },
            b(username,id){
                if(localStorage.getItem('storedData') == username){
                    if(confirm("Do you really want to delete this post?")){
                        try{
                            axios.delete(`http://localhost:3000/comment/`+id);
                            window.location.reload();
                        }catch(e){
                            alert(e)
                        }
                    } 
                }else {
                    alert("You can't delete this comment. It's not yours")  
                }
            },
            postcomment(){
                try{
                    const now = new Date();
                    const currentTime = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
                    this.new_cmt.time = currentTime;
                    this.new_cmt.post_id = this.posts._id;
                    this.new_cmt.username = localStorage.getItem('storedData');
                    axios.post('http://localhost:3000/comment/',this.new_cmt);
                }catch(e){
                    alert(e)
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