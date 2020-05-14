<template>
  <div>
      <h1>Login</h1>
      <input v-model="loginData.username" placeholder="username"> <br>
      <input v-model="loginData.password"  type="password" placeholder="password"> <br>
      <button v-on:click="login()" >login</button>
      <h1>Register</h1>
      <input v-model="registerData.firstName" placeholder="first name"> <br>
      <input v-model="registerData.lastName" placeholder="last name"> <br>
      <input v-model="registerData.username" placeholder="username"> <br>
      <input v-model="registerData.password"  type="password" placeholder="password"> <br>
      <button v-on:click="register()" >register</button>
  </div>
</template>

<script>
import axios from "axios"
import Config from '../../config'
export default {
    name:'Login',
    data(){
        return{
            loginData:{
                username:"",
                password:""
            },
            registerData:{
                firstName:"",
                lastName:"",
                username:"",
                password:""
            },
        }
    },
    create(){
        // this.login()
    },
    methods:{
        login(){
            axios.post(Config.URL+"login", this.loginData,{ withCredentials: true }).then((response) => {
                console.log(response)
                this.$router.push({name:'Profile'});
            })
            .catch((err) => {
                
                console.log(err);
                alert("invalid login")
                this.$router.push({name:'Login'});
            })
        },
        register(){
            axios.post(Config.URL+"register", this.registerData,{ withCredentials: true }).then((response) => {
                console.log(response)
                this.$router.push({name:'Profile'});
            })
            .catch((err) => {
                console.log(err);
                alert("duplicated username")
                this.$router.push({name:'Login'});
            })
        }
    }
}
</script>

<style>

</style>