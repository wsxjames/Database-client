<template>
  <div>
    <h1>Profile</h1>
    <p>Hello {{currentUser}}</p>
    <h2>Personal info</h2>
    <p>Select Gender:</p>
    <input type="radio" id="maleCheckBox" value="Male" v-model="profileData.gender">
    <label for="maleCheckBox">Male</label>
    <input type="radio" id="femaleCheckBox" value="Female" v-model="profileData.gender">
    <label for="femaleCheckBox">Female</label>
    <input type="radio" id="noPreferCheckBox" value="" v-model="profileData.gender">
    <label for="noPreferCheckBox">Not preferred</label>
    <p>First Name</p>
    Your current first name is: {{profileData.firstName}} <br>
    <input v-model="profileData.firstName" placeholder="New First Name" >
    <p>Last Name</p>
    Your current first name is: {{profileData.lastName}} <br>
    <input v-model="profileData.lastName" placeholder="New Last Name">
    <p>Email</p>
    <input v-model="profileData.email" placeholder="edit">
    <p v-if="!isValidEmail(profileData.email)" class="warning">Please enter a proper email</p>
    <p>Password</p> 
    <input type="password" v-model="profileData.password" placeholder="edit me" >
    <h2>High school info</h2>
    <p>High school</p>
    Your high school is: {{profileData.highSchool}}
    <br>
    <select v-model="profileData.highSchool">
      <option disabled value="">Please select one high school</option>
      <option value="">Not preferred</option>
      <option v-bind:key="highSchool.SID" v-for="highSchool in highSchools">{{highSchool.Name}}</option>
    </select>
    <p>Graduation Year</p>
    <select v-model="profileData.gradYear">
      <option disabled value="">Please select one graduation year</option>
      <option value="">Not preferred</option>
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
    </select>
     <p>GPA:</p>
    <input v-model="profileData.GPA" placeholder="edit me" >
    <p v-if="!isValidGPA(profileData.GPA)" class="warning">Please enter a number in [0,4]</p>
    <h2>Extracurricular</h2>
    <p>Standarized Test</p>
    <input v-model="profileData.stdGrade" number placeholder="edit me">
    <p v-if="!isValidScore(profileData.stdGrade)" class="warning">Please enter an integer in [0,100]</p>
    <select v-model="profileData.stdTestType">
      <option disabled value="">Please select one standarized test type</option>
      <option value="">Not preferred</option>
      <option v-bind:key="stdTest.SID" v-for="stdTest in stdTests">{{stdTest.Name}}</option>
    </select>
     <p>Activity:</p>
    <input v-model="profileData.activityName" placeholder="edit me">
    <select v-model="profileData.activityType">
      <option disabled value="">Please select one activity type</option>
      <option value="">Not preferred</option>
      <option v-bind:key="activity.AID" v-for="activity in activities">{{activity.Name}}</option>
    </select>
    <br>
    <!-- <p>start date</p>
    <input v-model="profileData.activityStartDate" placeholder="yyyy-mm-dd">
    <p v-if="!isValidDate(profileData.activityStartDate)" class="warning">Please enter a valid date</p>
    <p>finish date</p>
    <input v-model="profileData.activityEndDate" placeholder="yyyy-mm-dd">
    <p v-if="!isValidDate(profileData.activityEndDate)" class="warning">Please enter a valid date</p>
    <date-picker v-model="profileData.activityStartDate" type="date"></date-picker> -->
    <h2>University</h2>
    <input v-model="profileData.universityName" placeholder="edit me">
    <!-- <select v-model="profileData.universityName">
      <option disabled value="">Please select one university</option>
      <option value="">Not preferred</option>
      <option v-bind:key="university.SID" v-for="university in universities">{{university.Name}}</option>
    </select> -->
    <button v-if="isValidGPA(profileData.GPA)&&isValidScore(profileData.stdGrade)&&isValidEmail(profileData.email)" v-on:click="updateProfile(profileData)">Submit</button>
    <!-- <button v-on:click="console.log(profileData.activityRange)">Test</button> -->
    <div v-else>
      <button disabled=1>You can't submit</button>
      <p class="warning">Please follow instructions</p>
    </div>
    <br>
    <br>
  </div>
</template>

<script>
import SchoolService from '../../services/SchoolService'
// import AuthService from '../../services/AuthService'
import ProfileService from '../../services/ProfileService'
// import DateRangePicker from 'vue2-daterange-picker'
// import DatePicker from 'vue2-datepicker';
// import DatePicker from 'vuejs-datepicker';
import axios from "axios"
import Config from '../../config'
export default {
  name:'Profile',
  // components:{DatePicker},
  data(){
    return{
      currentUser:"",
      profileData:{
        PID:"",
        username:"",
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        gender:"",
        highSchool:"",
        gradYear:"",
        GPA:"",
        stdTestType:"",
        stdGrade:"",
        activityName:"",
        activityType:"",
        activityStartDate:"",
        activityEndDate:"",
        universityName:"",
        oldPassword:""
      },
      highSchools:[
        {SID: 1, Name:'Academic Magnet High School'},
        {SID: 2, Name:'Thomas Jefferson High School for Science and Technology'},
        {SID: 3, Name:'Academic Magnet High School'},
        {SID: 4, Name:'Merrol Hyde Magnet School'},
        {SID: 5, Name:'School for Advanced Studies (SAS)'}
      ],
      stdTests:[
        {TID: 1, Name:'ACT'},
        {TID: 2, Name:'SAT'}
      ],
      activities:[
        {AID: 1, Name:'Volunteer'},
        {AID: 2, Name:'Competition'},
        {AID: 3, Name:'Project'}
      ],
      universities:[]
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
    // this.getAllUniversities();
        
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
          console.log(data)
          if (data.length==0)return
          this.$set(this.profileData,"PID",data[0].PID)
          this.$set(this.profileData,"firstName",data[0].FirstName)
          this.$set(this.profileData,"lastName",data[0].LastName)
          this.$set(this.profileData,"email",data[0].Email)
          this.$set(this.profileData,"oldPassword",data[0].Password)
          this.$set(this.profileData,"gender",data[0].Gender)
          this.$set(this.profileData,"highSchool",data[0].HighSchool)
          this.$set(this.profileData,"gradYear",data[0].GradYear)
          this.$set(this.profileData,"GPA",data[0].GPA)
          this.$set(this.profileData,"stdTestType",data[0].StdTestType)
          this.$set(this.profileData,"stdGrade",data[0].StdGrade)
          this.$set(this.profileData,"activityName",data[0].ActivityName)
          this.$set(this.profileData,"universityName",data[0].UniversityName)
          // this.$set(this.profileData,"activityStartDate",data[0].ActivityStart)
          // this.$set(this.profileData,"activityEndDate",data[0].ActivityEnd)
          this.$set(this,"currentUser",data[0].Username)
        }).bind(this)
      )
    },
    async getAllUniversities(){
      SchoolService.getAllUniversities().then(
        (universities=>{
            this.$set(this, "universities", universities);
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
      if(string === ""||string===null) return true;
      let parsedString=""+parseFloat(string)
      if(parsedString.length!=string.length&&parseFloat(string)!=0&&parseFloat(string)!=1&&parseFloat(string)!=2&&parseFloat(string)!=3&&parseFloat(string)!=4) return false;
      return (parseFloat(string)>=0&&parseFloat(string)<=4)
    },
    isValidScore:(string)=>{
      if(string === ""||string===null||string.length===undefined) return true;
      let parsedString=""+parseInt(string)
      console.log(parsedString.length!=string.length)
      if(parsedString.length!=string.length) return false;
      return (parseFloat(string)>=0&&parseFloat(string)<=100)
    },
    isValidRank:(string)=>{
      if(string===undefined)return true;
      if(string === ""||string===null) return true;
      let parsedString=""+parseFloat(string)
      if(parsedString.length!=string.length||!Number.isSafeInteger(parseFloat(string))) return false;
      return (parseFloat(string)>=1)
    },
    isValidDate:(dateString)=>{
      // var regEx = /^\d{4}-\d{2}-\d{2}$/;
      // if(!dateString.match(regEx)) return false;  // Invalid format
      // var d = new Date(dateString);
      // var dNum = d.getTime();
      // if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
      // return d.toISOString().slice(0,10) === dateString;
      console.log(dateString)
      return true
    },
    isValidEmail:(string)=>{
      if(string === ""||string===null) return true;
      var re = /\S+@\S+\.\S+/
      return re.test(String(string).toLowerCase());
      // console.log(string)
      // return false
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