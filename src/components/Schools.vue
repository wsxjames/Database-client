<template>
  <div>
    <div v-bind:key="school.SID" v-for="school in schools">
      <SchoolItem v-bind:school="school"/>
    </div>
  </div>
</template>

<script>
import SchoolItem from './SchoolItem'

export default {
   name: "Schools",
   components: {
      SchoolItem
    },
   props:["schools"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
