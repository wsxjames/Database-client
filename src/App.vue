
<template>
  <div id="app">
    <Navigation id="NavBar"/>
    <router-view/>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
export default {
  name: 'app',
  components: {
    'Navigation': Navigation
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
  height: 60px;
}

#NavBar{
  text-align: right; 
  margin-top: -10px;
  margin-right: -10px;
  margin-left: -10px; 
  background:#769AE9;
}
</style>