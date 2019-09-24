<template>
  <div id="app">
    <div id="nav">
      <Navigation/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/layout/Navigation'
export default {
  components: {
    Navigation
  }
}
</script>


<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
  @import './scss/App.scss';

</style>
