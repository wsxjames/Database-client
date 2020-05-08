<template>
  <div>
    <nav>
      <router-link class="NavBarItem" v-for="routes in links" 
      v-bind:key="routes.id"
      :to="`${routes.page}`">{{routes.text}}</router-link>
      <!-- <NavBarItem /> -->
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Percentage',
          page:'/percentage'
        },
        {
          id: 1,
          text: 'TargetSchool',
          page:'/targetschool'
        },
        {
          id: 2,
          text: 'DreamSchool',
          page:'/dreamschool'
        },
        {
          id: 3,
          text: 'Profile',
          page:'/profile'
        },
        {
          id: 4,
          text:'Logout',
          page:'/logout'
        }
      ]
    }
  }
}
</script>
<style>
.NavBarItem {
  margin-right: 15px;
  background: #769AE9;
  color: white;
  font-size: 30px;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-decoration-line: none;
}

.NavBarItem:hover{
  background: white;
  color: #769AE9;
}
</style>

