<template>
  <div class="home-page">
    <div class="container">
      <h2 class="page-title">Собери свой ПК</h2>
      <p class="page-description">Выбери категорию и введи свой бюджет для генерации своего уникального ПК</p>
      <ConfiguratorForm />
    </div>
  </div>
</template>

<script setup>
import ConfiguratorForm from '../components/ConfiguratorForm.vue';
</script>

<style scoped>
.home-page {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-title {
  text-align: center;
  margin-bottom: 0.5rem;
  color: #333;
}

.page-description {
  text-align: center;
  margin-bottom: 2rem;
  color: #666;
}
</style>
