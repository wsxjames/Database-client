<template>
  <h1>Logout successful</h1>
</template>

<script>
import axios from "axios"
export default {
    created(){
    axios.get("http://localhost:3000/logout",{ withCredentials: true }).then(()=>{
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