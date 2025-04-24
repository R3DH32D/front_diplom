<template>
  <div class="build-results">
    <div v-if="!buildData" class="no-results">
      <p>No build data available. Please generate a build first.</p>
      <button class="back-button" @click="goBack">Go Back</button>
    </div>
    
    <div v-else class="results-container">
      <h2>Твоя сгенерированная сборка</h2>
      
      <div class="specs-grid">
        <div class="spec-item">
          <h3>Процессор</h3>
          <p>{{ buildData.cpu.name }}</p>
          <p class="price">{{ buildData.cpu.cost }}</p>
        </div>
        <div v-if="buildData.gpu && buildData.gpu.name && buildData.gpu.cost" class="spec-item">
          <h3>Видеокарта</h3>
          <p>{{ buildData.gpu.name }}</p>
          <p class="price">{{ buildData.gpu.cost }}Р</p>
        </div>
      <div v-else></div>
        <div class="spec-item">
          <h3>Оперативная память</h3>
          <p>{{ buildData.ram.name }}</p>
          <p class="price">{{ buildData.ram.cost }}Р</p>
        </div>
        
        <div class="spec-item">
          <h3>Блок питания</h3>
          <p>{{ buildData.power_unit.name }}Р</p>
          <p class="price">{{ buildData.power_unit.cost }}Р</p>
        </div>
        
        <div class="spec-item">
          <h3>Материнская плата</h3>
          <p>{{ buildData.motherboard.name }}</p>
          <p class="price">{{ buildData.motherboard.cost }}Р</p>
        </div>
        <div class="spec-item">
          <h3>Накопитель</h3>
          <p>{{ buildData.memory.name }}</p>
          <p class="price">{{ buildData.memory.cost }}Р</p>
        </div>
        <div class="spec-item">
          <h3>Охлаждение</h3>
          <p>{{ buildData.cooler.name }}</p>
          <p class="price">{{ buildData.cooler.cost }}Р</p>
        </div>
        <div class="spec-item">
          <h3>Корпус</h3>
          <p>{{ buildData.case.name }}</p>
          <p class="price">{{ buildData.case.cost }}Р</p>
        </div>
      </div>
      
      <div class="total-section">
        <p class="total-label">Total Budget:</p>
        <p class="total-price">{{ totalBudget }}Р</p>
      </div>
      
      <button class="back-button" @click="goBack">Вернуться в конфигуратор</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const buildData = ref(null);
const totalBudget = ref(null);

onBeforeMount(() => {
  const storedData = localStorage.getItem('buildResult');
  if (storedData) {
    buildData.value = JSON.parse(storedData);
    console.log("stored",buildData.value)
  }
  totalBudget.value = buildData.value.cpu.cost + buildData.value.gpu.cost + buildData.value.ram.cost + buildData.value.power_unit.cost + buildData.value.motherboard.cost + buildData.value.case.cost + buildData.value.memory.cost + buildData.value.cooler.cost
});

const goBack = () => {
  router.push('/');
};

</script>

<style scoped>
.build-results {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.specs-grid {
  display: flexbox;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.spec-item {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 0.5rem;
}

.spec-item h3 {
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 1.1rem;
}

.price {
  margin-top: 0.5rem;
  font-weight: bold;
  color: #2980b9;
}

.total-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 6px;
}

.total-label {
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
}

.total-price {
  font-weight: bold;
  font-size: 1.5rem;
  color: #2980b9;
}

.back-button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: center;
}

.back-button:hover {
  background-color: #2980b9;
}

.no-results {
  text-align: center;
  padding: 2rem;
}
</style>