<template>
  <div class="SchoolItem">
      <p>{{school.Name}}</p>
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