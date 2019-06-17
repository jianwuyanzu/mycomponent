<template>
  <div id="app" class="customScrollbar">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
      console.log(process.env.API_ROOT)
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
