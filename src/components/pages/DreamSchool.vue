<template>
 <div>
    <p>Enter your dream school</p>
    <input v-model="university" placeholder="edit me">
    <button v-if="university!=''" v-on:click="getStudentData(university)">Submit</button>
    <div v-else>
      <button disabled=1>You can't submit</button>
      <p class="warning">Please fill the name of school</p>
    </div>
    <p>The students enrolled in {{university}} has following records</p>
    <Students v-bind:students="students"/>
    <!-- <p v-if="students.length=0" class="warning">no result</p> -->
 </div>
</template>

<script>
import StudentService from '../../services/StudentService'
import Students from '../Students'
export default {
  name: 'DreamSchool',
  components: {Students},
  data(){
    return{
      university:"",
      students:[]
    }
  },
  create(){
    this.getStudentData()
  },
  methods:{
  async getStudentData(university){
      StudentService.getStudents(university).then(
        (students=>{
            this.$set(this, "students", students);
          }).bind(this)
      )
    }
  }
}
</script>

<style>

</style>