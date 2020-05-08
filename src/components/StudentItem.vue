<template>
  <div class="StudentItem">
      <p>GPA: {{student.GPA}}, graduated in {{student.GradYear}}</p>
  </div>
</template>

<script>
export default {
    name: "StudentItem",
    props:["student"]
}
</script>

<style scoped>
    .SchoolItem{
        background: #f4f4f4;
        padding: 10px;
        /* border-buttom: 1ps #ccc dotted */
    }
</style>