<template>
  <div>
    <h1>target school</h1>
    <p>Select Gender:</p>
    <input type="radio" id="maleCheckBox" value="male" v-model="checkedGender">
    <label for="maleCheckBox">Male</label>
    <input type="radio" id="femaleCheckBox" value="female" v-model="checkedGender">
    <label for="femaleCheckBox">Female</label>
    <input type="radio" id="noPreferCheckBox" value="" v-model="checkedGender">
    <label for="noPreferCheckBox">Not preferred</label>
    <!-- <p>First applicant in university?</p>
    <input type="checkbox" id="checkbox" v-model="isFirstApplicant"> -->
    <p>High School</p>
    <select v-model="selectedHighSchool">
      <option disabled value="">Please select one high school</option>
      <option value="">Not preferred</option>
      <option v-bind:key="highSchool.SID" v-for="highSchool in highSchools">{{highSchool.Name}}</option>
    </select>

    <p>Graduation Year</p>
    <select v-model="gradYear">
      <option disabled value="">Please select one graduation year</option>
      <option value="">Not preferred</option>
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
    </select>

    <p>GPA:</p>
    <!-- <input v-model="GPA" number placeholder="edit me" > -->
    <input v-model="GPA" number placeholder="edit me" >
    <p v-if="!isValidGPA(GPA)" class="warning">Please enter a number in [0,4]</p>
    <!-- <input v-if="GPA.length === 'Competition'" v-model="rank" placeholder="edit me"> -->
    
    <p>Standarized Test:</p>
    <input v-model="stdTestScore" placeholder="edit me">
    <p v-if="!isValidScore(stdTestScore)" class="warning">Please enter an integer in [0,100]</p>
    <select v-model="selectedStdTest">
      <option disabled value="">Please select one standarized test type</option>
      <option value="">Not preferred</option>
      <option v-bind:key="stdTest.SID" v-for="stdTest in stdTests">{{stdTest.Name}}</option>
    </select>
    <p>Activity:</p>
    <input v-model="activity" placeholder="edit me">
    <select v-model="selectedActivityType">
      <option disabled value="">Please select one activity type</option>
      <option value="">Not preferred</option>
      <option v-bind:key="activity.AID" v-for="activity in activities">{{activity.Name}}</option>
    </select>
    <button v-if="isValidGPA(GPA)&&isValidScore(stdTestScore)" v-on:click="getSchoolData(checkedGender, isFirstApplicant, gradYear, GPA,selectedHighSchool, selectedStdTest, stdTestScore, testLocation, testCity, selectedActivityType, rank)">Submit</button>
    <div v-else>
      <button v-on:click="getSchoolData(checkedGender, isFirstApplicant, gradYear, GPA,selectedHighSchool, selectedStdTest, stdTestScore, testLocation, testCity, selectedActivityType, rank)" disabled=1>You can't submit</button>
      <p class="warning">Please follow instructions</p>
    </div>
    <p>The following are your recommended target schools:</p>
    <Schools v-bind:schools="schools"/>
    <!-- <p v-if="schools.length=0" class="warning">no result</p> -->
  </div>
</template>

<script>
import SchoolService from '../../services/SchoolService'
import Schools from '../Schools'
import axios from "axios"
import Config from "../../config"
export default {
  name:'TargetSchool',
  components: {Schools},
  data(){
    return{
      GPA:"",
      checkedGender:"",
      isFirstApplicant:"",
      gradYear:"",
      stdTestScore:"",
      activity:"",
      rank:"",
      schools:[],  
      highSchools:[
        {SID: 1, Name:'HighSchool 1'},
        {SID: 2, Name:'HighSchool 2'}
      ],
      selectedHighSchool:"",
      stdTests:[
        {TID: 1, Name:'ACT'},
        {TID: 2, Name:'SAT'}
      ],
      selectedStdTest:"",
      testLocation:"",
      testCity:"",
      activities:[
        {AID: 1, Name:'Volunteer'},
        {AID: 2, Name:'Competition'},
        {AID: 3, Name:'Project'}
      ],
      selectedActivityType:"",
      
    }
  },
  created(){
    console.log("pdoing?")
    axios.get(Config.URL,{ withCredentials: true }).then((response)=>{
        console.log(response.status)
        // return "auth"
    }).catch((error)=>{
        console.log("err")
        console.log(error.status)
        this.$router.push({name:'Login'})
    })
  },
  computed:{
    validForm:()=>{
        return this.validForm()
    }
  },
  create(){
    this.getSchoolData(),
    this.isNumber()
  },
  methods:{
    async getSchoolData(checkedGender, isFirstApplicant, gradYear, GPA,selectedHighSchool, selectedStdTest, stdTestScore, testLocation, testCity, selectedActivityType, rank){
      SchoolService.getSchools(checkedGender, isFirstApplicant, gradYear, GPA,selectedHighSchool, selectedStdTest, stdTestScore, testLocation, testCity, selectedActivityType, rank).then(
        (schools=>{
            this.$set(this, "schools", schools);
          }).bind(this)
      )
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