<template>
  <!-- <button type="button" class="NavBarItem">{{item.title}}</button> -->
  <div>
      <!-- <button type="button" class="NavBarItem">{{item.title}}</button> -->
      <p>{{item.title}}</p>>
  </div>
</template>

<script>
export default {
    name:"NavBarItem",
    props:["item"]
}
</script>

<style>
   .NavBarItem {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
} 
</style>