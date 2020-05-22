<template>
  <div>
    <h1>Find out your percentage of being accepted by a certain university!</h1>
  <p>Select Gender:</p>
    <input type="radio" id="maleCheckBox" value="male" v-model="studentData.gender">
    <label for="maleCheckBox">Male</label>
    <input type="radio" id="femaleCheckBox" value="female" v-model="studentData.gender">
    <label for="femaleCheckBox">Female</label>
    <p>First applicant in university?</p>
    <input type="checkbox" id="checkbox" v-model="studentData.isFirstApplicant">

    <p>Graduation Year</p>
    <select v-model="studentData.gradYear">
      <option disabled value="">Please select one graduation year</option>
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
    </select>

    <p>GPA:</p>
    <input v-model="studentData.GPA" number placeholder="edit me" >
    <p v-if="!isValidGPA(studentData.GPA)" class="warning">Please enter a number in [0,4]</p>
    
    <p>Standarized Test:</p>
    <input v-model="studentData.stdTestScore" placeholder="edit me">
    <p v-if="!isValidScore(studentData.stdTestScore)" class="warning">Please enter an integer in [0,100]</p>
    <select v-model="studentData.stdTestType">
      <option disabled value="">Please select one standarized test type</option>
      <option v-bind:key="stdTest.SID" v-for="stdTest in stdTests">{{stdTest.Name}}</option>
    </select>
    <!-- <input v-model="studentData.university" placeholder="university"> -->
    <p>select unniversity</p>
    <select v-model="studentData.university">
      <option disabled value="">Please select one university</option>
      <option v-bind:key="university.SID" v-for="university in universities">{{university.Name}}</option>
    </select>
    <button v-if="studentData.university!=''&&studentData.GPA!=''&&studentData.stdTestScore!=''" v-on:click="getPercentage(studentData)">submit for percentage</button>
    <div v-else>
      <button disabled=1>You can't submit</button>
      <p class="warning">Please fill all options for result</p>
    </div>
    <h2>result</h2>
    <p>total: {{total}}</p>
    <p>conditional:{{conditional}}</p>
    <p>likelihood:{{likelihood}}</p>
  </div>
</template>

<script>
import SchoolService from '../../services/SchoolService'
export default {
  name:'Percentage',
  data(){
    return{
      studentData:{
        GPA:"",
        gender:"male",
        isFirstApplicant:false,
        gradYear:2022,
        stdTestScore:"",
        stdTestType:"TOEFL",
        university:""
      },
      activity:"",
      rank:"",
      checkedType:"gpa",
      checkedIsDesc:false,
      schools:[],  
      highSchools:[
        {SID: 1, Name:'HighSchool 1'},
        {SID: 2, Name:'HighSchool 2'}
      ],
      selectedHighSchool:"",
      stdTests:[
        {TID: 1, Name:'ACT'},
        {TID: 2, Name:'SAT'},
        {TID: 3, Name:'TOEFL'}
      ],
      testLocation:"",
      testCity:"",
      activities:[
        {AID: 1, Name:'Volunteer'},
        {AID: 2, Name:'Competition'},
        {AID: 3, Name:'Project'}
      ],
      universities:[],
      selectedActivityType:"",
      total:"",
      conditional:"",
      likelihood:""
      
    }
  },
  create(){
    this.getPercentage()
  },
  created(){
    this.getAllUniversities()
  },
  methods:{
    getPercentage(studentData){
      SchoolService.getPercentage(studentData).then(
        (
          data=>{
            // console.log(data.total)
            this.$set(this, "total", data[0].total)
            this.$set(this, "conditional", data[0].conditional)
            this.$set(this, "likelihood", data[0].likelihood)
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

</style>