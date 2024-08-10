<script setup>
import { RouterView } from 'vue-router';
import { useUserStore } from './stores/user.js';
import { onMounted } from 'vue';
const store = useUserStore();
// const router = useRouter();

onMounted(() => {
  store.checkAuthState();
});

</script>

<template>
  <div class="container-fluid">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  @import "./assets/all.scss";
</style>