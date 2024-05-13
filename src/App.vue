<script setup>
import { RouterView } from 'vue-router'
// import HomePage from './components/HomePage.vue'
import FooterContent from './components/FooterContent.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar></NavBar>
  <div class="container">
    <router-view></router-view>
  </div>
  <FooterContent></FooterContent>
</template>

<style scoped>

</style>
