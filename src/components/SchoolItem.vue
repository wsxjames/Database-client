<template>
  <div class="SchoolItem">
      <p v-if="school.avgGPA!=undefined">{{school.Name}}    average GPA: {{school.avgGPA}}</p>
      <p v-else-if="school.Rank!=undefined">{{school.Name}}    ranking: {{school.Rank}}</p>
      <p v-else-if="school.avgStdGrade!=undefined">{{school.Name}}    average standarized test score: {{school.stdGrade}}</p>
      <p v-else-if="school.AcceptanceRate!=undefined">{{school.Name}}    acceptance rate: {{school.AcceptanceRate}}</p>
      <p v-else>{{school.Name}}</p>
  </div>
</template>

<script>
export default {
    name: "SchoolItem",
    props:["school"]
}
</script>

<style scoped>
    .SchoolItem{
        background: #f4f4f4;
        padding: 10px;
        /* border-buttom: 1ps #ccc dotted */
    }
</style>