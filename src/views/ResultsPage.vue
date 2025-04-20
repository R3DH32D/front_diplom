<template>
  <div class="results-page">
    <div class="container">
      <h2 class="page-title">Результаты генерации</h2>
      <BuildResults />
    </div>
  </div>
</template>

<script setup>
import BuildResults from '../components/BuildResults.vue';
</script>

<style scoped>
.results-page {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-title {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}
</style>

