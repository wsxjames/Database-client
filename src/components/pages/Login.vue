<template>
  <div>
      <h1>Login</h1>
      <input v-model="loginData.username" placeholder="username"> <br>
      <input v-model="loginData.password" placeholder="password"> <br>
      <button v-on:click="login()" >login</button>
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
            }
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

                this.$router.push({name:'Login'});
            })
        }
    }
}
</script>

<style>

</style>