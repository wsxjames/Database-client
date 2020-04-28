<template>
  <div class="NavBar">
      <div v-bind:key="item.id" v-for="item in navBarItems">
        <NavBarItem v-bind:item="item"/>
    </div>
  </div>
</template>

<script>
import NavBarItem from './NavBarItem'
export default {
    name: "NavBar",
    components: {
      NavBarItem
    },
    data(){
      return{
        navBarItems:[
          {id: 1, title:"1"},
          {id: 2, title:"2"},
          {id: 3, title:"3"},
          {id: 4, title:"4"},
        ]
      }
    }
}
</script>

<style scoped>
  .NavBar {
  background-color: #769AE9;
  overflow: hidden;
}
</style>