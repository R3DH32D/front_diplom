<template>
  <div class="configurator-form">
    <div v-if="loading" class="loading">
      <p>Loading categories...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button class="retry-button" @click="fetchCategories">Повторить</button>
    </div>
    
    <form v-else @submit.prevent="generateBuild">
      <div class="form-group">
        <label for="category">Категория ПК:</label>
        <select 
          id="category" 
          v-model="selectedCategory" 
          required
          class="form-control"
        >
          <option value="" disabled>Выбери категорию</option>
          <option 
            v-for="category in categories" 
            :key="category.id" 
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="price">Твой бюджет:</label>
        <input 
          id="price" 
          type="number" 
          v-model.number="price" 
          min="1" 
          required
          class="form-control"
          placeholder="Enter your budget"
        />
      </div>
      
      <button type="submit" class="generate-button" :disabled="loading">
        Сгенерировать
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const categories = ref([]);
const selectedCategory = ref('');
const price = ref('');
const loading = ref(false);
const error = ref('');

const fetchCategories = async () => {
  loading.value = true;
  error.value = '';
  
  try {

    const response = await axios.get('api/calculator/category');
    console.log(response.data);
    
    categories.value = response.data;
    
    if (categories.value.length === 0) {
      error.value = 'No categories available';
    }
  } catch (err) {
    console.error('Error fetching categories:', err);
    error.value = 'Failed to load categories. Please try again.';
  } finally {
    loading.value = false;
  }
};

const generateBuild = async () => {
  if (!categories.value || !price.value) {
    return;
  }
  
  loading.value = true;
  
  try {

    
    const response = await axios.get('api/calculator/configuration/new', {
      params: {
        category: category.value,
        cost: price.value
      }
    });
    console.log(response)

    localStorage.setItem('buildResult', JSON.stringify(response.data));
    router.push('/results');
  } catch (err) {
    console.error('Error generating build:', err);
    error.value = 'За эту цену ничего собрать нельзя, попробуйте снова';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.configurator-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.generate-button {
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
}

.generate-button:hover {
  background-color: #2980b9;
}

.generate-button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
}

.error {
  color: #e74c3c;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>

