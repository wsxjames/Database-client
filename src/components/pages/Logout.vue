<template>
  <h1>Logout successful</h1>
</template>

<script>
import axios from "axios"
import Config from "../../config"
export default {
    created(){
    axios.get(Config.URL+"logout",{ withCredentials: true }).then(()=>{
        this.$router.push({name:'Login'})
    }).catch((error)=>{
        console.log("err")
        console.log(error.status)
        this.$router.push({name:'Login'})
    })
  }
}
</script>

<style>

</style>