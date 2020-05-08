<template>
  <div>
    <div v-bind:key="student.PID" v-for="student in students">
      <StudentItem v-bind:student="student"/>
    </div>
  </div>
</template>

<script>
import StudentItem from './StudentItem'

export default {
   name: "Students",
   components: {
      StudentItem
    },
   props:["students"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
