<template>
  <div>
    <h1>Profile</h1>
    <p>Hello {{currentUser}}</p>
    <p>Personal info</p>
    <p>First Name</p>
    Your current first name is: {{profileData.firstName}} <br>
    <input v-model="profileData.firstName" placeholder="New First Name" >
    <p>Last Name</p>
    Your current first name is: {{profileData.lastName}} <br>
    <input v-model="profileData.lastName" placeholder="New Last Name">
    <p>Password</p> 
    <input type="password" v-model="profileData.password" placeholder="edit me" >
    <button v-on:click="updateProfile(profileData)">Submit</button>
  </div>
</template>

<script>
// import SchoolService from '../../services/SchoolService'
// import AuthService from '../../services/AuthService'
import ProfileService from '../../services/ProfileService'
import axios from "axios"
import Config from '../../config'
export default {
  name:'Profile',
  data(){
    return{
      currentUser:"",
      profileData:{
        username:"",
        firstName:"",
        lastName:"",
        password:""
      }
    }
  },
  created(){
    axios.get(Config.URL,{ withCredentials: true }).then((response)=>{
        console.log(response.status)
        // return "auth"
    }).catch((error)=>{
        console.log("err")
        console.log(error.status)
        this.$router.push({name:'Login'})
    })
  },
  mounted(){
    // let dt=axios.get("http://localhost:3000/studentprofile",{ withCredentials: true }).then((res)=>{
    //   console.log(JSON.stringify(res.data.recordset[0]))
    //   // let profileDataFetched=JSON.stringify(res.data.recordset[0])
    //   // this.profileData.firstName=profileDataFetched.FirstName
    // })
    this.fetchProfile()
        
  },
  computed:{
    validForm:()=>{
        return this.validForm()
    }
  },
  create(){
    this.isNumber()
    // this.updateProfile()
  },
  methods:{

    async fetchProfile(){
      ProfileService.fetchData().then(
        (data=>{
          console.log(data[0].FirstName)
          this.$set(this.profileData,"firstName",data[0].FirstName)
          this.$set(this.profileData,"lastName",data[0].LastName)
          this.$set(this.profileData,"password",data[0].Password)
          this.$set(this.profileData,"username",data[0].Username)
          this.$set(this,"currentUser",data[0].Username)
        }).bind(this)
      )
    },
    
    async updateProfile(profileData){
      ProfileService.updateData(profileData)
    },
    isNumber: (numString)=>{
      return !isNaN(parseFloat(numString))
    },
    isValidGPA:(string)=>{
      if(string === "") return true;
      let parsedString=""+parseFloat(string)
      if(parsedString.length!=string.length&&parseFloat(string)!=0&&parseFloat(string)!=1&&parseFloat(string)!=2&&parseFloat(string)!=3&&parseFloat(string)!=4) return false;
      return (parseFloat(string)>=0&&parseFloat(string)<=4)
    },
    isValidScore:(string)=>{
      if(string === "") return true;
      let parsedString=""+parseInt(string)
      if(parsedString.length!=string.length) return false;
      return (parseFloat(string)>=0&&parseFloat(string)<=100)
    },
    isValidRank:(string)=>{
      if(string === "") return true;
      let parsedString=""+parseFloat(string)
      if(parsedString.length!=string.length||!Number.isSafeInteger(parseFloat(string))) return false;
      return (parseFloat(string)>=1)
    },
    validateForm: ()=>{
      // return this.isValidGPA(this.GPA)
    }
  }
}
</script>

<style>
.warning{
  color: red;
}
</style>