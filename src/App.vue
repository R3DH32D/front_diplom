<template>
  <div class="app-container">
    <Header />
    <router-view />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

.app-container {
  min-height: 100vh;
  background-color: #f0f0f0;
}
</style>
