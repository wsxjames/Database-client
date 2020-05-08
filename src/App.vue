
<template>
  <div id="app">
    <Navigation id="NavBar"/>
    <router-view/>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
// import AuthService from './services/AuthService'
import Config from './config'
import axios from "axios"
export default {
  name: 'app',
  components: {
    'Navigation': Navigation
  },
  create(){
    // this.getHome()
  },
  methods:{
    // async getHome(){
    //   AuthService.home().then(result=>console.log(result))
    // }
  },
  created(){
    axios.get(Config.URL
    ,{ withCredentials: true }).then((response)=>{
        console.log(response.status)
        // return "auth"
    }).catch((error)=>{
        console.log("err")
        console.log(error.status)
        this.$router.push({name:'Login'})
    })
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
  height: 60px;
}

#NavBar{
  text-align: right; 
  margin-top: -10px;
  margin-right: -10px;
  margin-left: -10px; 
  background:#769AE9;
}
</style>