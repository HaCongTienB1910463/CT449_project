<template>
    <div class="d-flex justify-content-center flex-nowrap" style="padding-top: 50px;">
        <div class="row" style="height: 500px;width: 500px;background-image: url(https://i1.sndcdn.com/artworks-vhxb0IArz28rUay2-pLYEOQ-t500x500.jpg);border-radius: 10px;">
            <div class="col-6" style="padding: 200px 0 20px 20px;">
                <form action="/" @submit="create" style="text-align: center;">
                    <div class="form-group">
                        <input type="text" class="form-control" id="username" v-model="acc.username" @change="search" maxlength="10" required placeholder="Input username" style="text-align: center; color: darkgreen;background-color: transparent;border: 5px double darkgreen; border-radius: 10px;">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="password" v-model="acc.pass" @change="b" required minlength="5" placeholder="Input password" style="text-align: center; color: darkgreen;background-color: transparent;border: 5px double darkgreen; border-radius: 10px;">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="confrimpassword" required @change="check" placeholder="Confrim password" onchange="check()" style="text-align: center; color: darkgreen;background-color: transparent;border: 5px double darkgreen; border-radius: 10px;">
                    </div>
                    <button type="submit" class="btn btn-success" style="border: 2px solid darkgreen;border-radius: 10px; width: 100%;">Register</button>
                    <router-link :to="{name: 'signin'}">
                        <div style="color: darkgreen;" @click="signin">Already have an account?</div>
                    </router-link>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default{
        data(){
            return {
                acc:{
                    username:null,
                    pass:null
                },
                contacts:[]
            }
        },

        methods:{
            signin(){
                this.$route.push({name:'signin'})
            },
            check(){
                const password = document.querySelector('input[id=password]');
                const confirm = document.querySelector('input[id=confrimpassword]');
                if (confirm.value === password.value) {
                    confirm.setCustomValidity('');
                } else {
                    confirm.setCustomValidity('Passwords do not match');
                };
            },
            create(){
                try{
                    axios.post('http://localhost:3000/contacts/',this.acc)
                }catch(e){
                    alert(e)
                }
                //a.preventDefault();
            },
            search(){
                //console.log(event.target.value);
                axios.get(`http://localhost:3000/contacts/`+event.target.value)
                // console.log('http://localhost:4580/api/sanpham/' + urlid)
                .then((response) => {
                    //console.log(response.data);
                    this.contacts = response.data;
                    console.log(this.contacts)
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            b(){
                // alert(this.contacts.username);
                const name = document.getElementById('username');
                if(name.value != this.contacts.username){
                    name.setCustomValidity('');
                } else {
                    name.setCustomValidity('Username already existed');
                }
            }
        }
    }
</script>