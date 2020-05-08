<template>
  <div id="app">
    <!-- <button v-on:click="getSchoolData">test</button> -->
    <Schools v-bind:schools="schools"/>
    <NavBar />
  </div>
</template>

<script>
import SchoolService from './services/SchoolService.js'
import Schools from './components/Schools'
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    Schools,
    NavBar
  }, 
  data(){
    return {
      // schools:[
      //     {
      //       SID: 1,
      //       Name: "Rose Hulman"
      //     },
      //     {
      //       SID: 2,
      //       Name: "Purdue"
      //     },
      //     {
      //       SID: 3,
      //       Name: "Indiana State"
      //     },
      //   ]
      schools:[]
      }
  },
  create(){
    this.getSchoolData()
  },
  methods:{
    async getSchoolData(){
      SchoolService.getSchools().then(
        (schools=>{
            this.$set(this, "schools", schools);
          }).bind(this)
      )
    }
    // getSchoolData(){
    //   console.log("test")
    //   SchoolService.getSchools()
    // }
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
