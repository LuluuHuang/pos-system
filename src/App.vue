<script setup>
import { RouterView } from 'vue-router'
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

<style lang="scss">
  @import "./assets/all.scss";
</style>