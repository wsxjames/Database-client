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
    <h2>You may also view all schools sorted by these factors</h2>
    <input type="radio" id="gpaCheckBox" value="gpa" v-model="checkedType">
    <label for="gpaCheckBox">GPA</label>
    <input type="radio" id="rankingCheckBox" value="ranking" v-model="checkedType">
    <label for="rankingCheckBox">Ranking</label>
    <input type="radio" id="accrateCheckBox" value="accrate" v-model="checkedType">
    <label for="accrateCheckBox">Acceptance Rate</label>
    <input type="checkbox" id="checkbox" v-model="checkedIsDesc">
    <label for="checkbox">Descending order?</label>
    <button v-on:click="getSortedUniversityData(checkedType, checkedIsDesc)">view  all universities</button>
    <p>The following are your recommended target schools:</p>
    <Schools v-bind:schools="schools"/>
    <!-- <p v-if="schools.length=0" class="warning">no result</p> -->
  </div>
</template>

<script>
import SchoolService from '../../services/SchoolService'
import Schools from '../Schools'
// import axios from "axios"
// import Config from "../../config"
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
      checkedType:"gpa",
      checkedIsDesc:false,
      schools:[],  
      // highSchools:[
      //   {SID: 1, Name:'Academic Magnet High School'},
      //   {SID: 2, Name:'Thomas Jefferson High School for Science and Technology'},
      //   {SID: 3, Name:'Academic Magnet High School'},
      //   {SID: 4, Name:'Merrol Hyde Magnet School'},
      //   {SID: 5, Name:'School for Advanced Studies (SAS)'}
      // ],
      highSchools:[],
      selectedHighSchool:"",
      stdTests:[
        {TID: 1, Name:'ACT'},
        {TID: 2, Name:'SAT'},
        {TID: 3, Name:'TOEFL'}
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
  computed:{
    validForm:()=>{
        return this.validForm()
    }
  },
  created(){
    this.getAllHighSchools()
  },
  create(){
    this.getSchoolData(),
    this.getSortedUniversityData(),
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
    async getSortedUniversityData(type, isDesc){
      SchoolService.getSortedUniversities(type, isDesc).then(
        (schools=>{
            this.$set(this, "schools", schools);
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
  async getAllHighSchools(){
      SchoolService.getAllHighSchools().then(
        (highSchools=>{
            this.$set(this, "highSchools", highSchools);
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