<template>
  <div class="container">
    <TheSidebar></TheSidebar>
    <TheMain></TheMain>
  </div>
</template>

<script>
import TheSidebar from './layout/TheSidebar.vue';
import TheMain from './layout/TheMain.vue';

export default {
  name: 'App',
  components: {
    TheSidebar,TheMain
  }
}
</script>

<style>
@import url(./css/main.css);
#app{
  height: 100%;
}
</style>
