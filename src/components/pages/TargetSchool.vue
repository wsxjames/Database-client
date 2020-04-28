<template>
  <div>
    <h1>target school</h1>
    <p>Select Gender:</p>
    <input type="radio" id="maleCheckBox" value="male" v-model="checkedGender">
    <label for="maleCheckBox">Male</label>
    <input type="radio" id="femaleCheckBox" value="female" v-model="checkedGender">
    <label for="femaleCheckBox">FeMale</label>
    <p>High School</p>
    <select v-model="selectedHighSchool">
      <option disabled value="">Please select one high school</option>
      <option value="">Not preferred</option>
      <option v-bind:key="highSchool.SID" v-for="highSchool in highSchools">{{highSchool.Name}}</option>
    </select>

    <p>GPA:</p>
    <!-- <input v-model="GPA" number placeholder="edit me" > -->
    <input v-model="GPA" number placeholder="edit me" >
    <p v-if="!isValidGPA(GPA)" class="warning">Please enter a number in [0,4]</p>
    <!-- <input v-if="GPA.length === 'Competition'" v-model="rank" placeholder="edit me"> -->
    
    <p>Standarized Test:</p>
    <input v-model="stdTestScore" placeholder="edit me">
    <p v-if="!isValidScore(stdTestScore)" class="warning">Please enter a number in [0,100]</p>
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
     <input v-if="selectedActivityType === 'Competition'" v-model="rank" placeholder="edit me">
      <p v-if="!isValidRank(rank)" class="warning">Please enter an integer greater than 0</p>
    <button v-if="isValidGPA(GPA)&&isValidRank(rank)&&isValidScore(stdTestScore)" v-on:click="getSchoolData(GPA)">Submit</button>
    <div v-else>
      <button v-on:click="getSchoolData(GPA)" disabled=1>You can't submit</button>
      <p class="warning">Please follow instructions</p>
    </div>
    <Schools v-bind:schools="schools"/>
  </div>
</template>

<script>
import SchoolService from '../../services/SchoolService'
import Schools from '../Schools'
export default {
  name:'TargetSchool',
  components: {Schools},
  data(){
    return{
      GPA:"",
      checkedGender:"",
      stdTestScore:"",
      activity:"",
      rank:"",
      schools:[],  
      highSchools:[
        {SID: 1, Name:'QDHS'},
        {SID: 2, Name:'PYK'}
      ],
      selectedHighSchool:"",
      stdTests:[
        {TID: 1, Name:'ACT'},
        {TID: 2, Name:'SAT'}
      ],
      selectedStdTest:"",
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
  create(){
    this.getSchoolData(),
    this.isNumber()
  },
  methods:{
    async getSchoolData(GPA){
      SchoolService.getSchools(GPA).then(
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
      if(parsedString.length!=string.length) return false;
      return (parseFloat(string)>=0&&parseFloat(string)<=4)
    },
    isValidScore:(string)=>{
      if(string === "") return true;
      let parsedString=""+parseFloat(string)
      if(parsedString.length!=string.length) return false;
      return (parseFloat(string)>=0&&parseFloat(string)<=4)
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