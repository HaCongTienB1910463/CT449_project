<template>
    <div class="d-flex justify-content-center flex-nowrap" style="padding-top: 50px;">
        <div class="row" style="height: 500px;width: 500px;background-image: url(https://i1.sndcdn.com/artworks-vhxb0IArz28rUay2-pLYEOQ-t500x500.jpg);border-radius: 10px;">
            <div class="col-6" style="padding: 200px 0 20px 20px;">
                <form action="/home" style="text-align: center;">
                    <div class="form-group">
                        <input type="text" class="form-control" id="username" required placeholder="Input username" @change="b" style="text-align: center; color: darkgreen;background-color: transparent;border: 5px double darkgreen; border-radius: 10px;">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="password" @change="e" placeholder="Input password" style="text-align: center; color: darkgreen;background-color: transparent;border: 5px double darkgreen; border-radius: 10px;">
                    </div>
                    <button class="btn btn-success" style="border: 2px solid darkgreen;border-radius: 10px; width: 100%;">Sign In</button>
                    <router-link :to="{name: 'register',}">
                        <div @click="a" style="color: darkgreen;">Create an account?</div>
                    </router-link>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default{
        data() {
            return {
                contacts: [],
            }
        },
        mounted() {
            // console.log(urlid)
            axios.get(`http://localhost:3000/contacts/`)
                // console.log('http://localhost:4580/api/sanpham/' + urlid)
                .then((response) => {
                    console.log(response.data);
                    this.contacts = response.data;
                    //console.log(this.contacts[0].username)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        methods:{
            a(){
                this.$route.push({name:'register'})
            },
            b(){
                console.log(event.target.value);
                axios.get(`http://localhost:3000/contacts/`+event.target.value)
                // console.log('http://localhost:4580/api/sanpham/' + urlid)
                .then((response) => {
                    //console.log(response.data);
                    this.contacts = response.data;
                    //console.log(this.contacts)
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            e(){
                const password = document.getElementById('password');
                const confirm = this.contacts.pass;
                if(password.value != confirm) {
                    password.setCustomValidity('Passwords do not match');
                    //alert('a')
                } else {
                    localStorage.setItem('storedData', this.contacts.username);
                    password.setCustomValidity('');
                }
            }
        }
    }
</script>