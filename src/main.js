import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

// Configure axios defaults if needed
// axios.defaults.baseURL = 'https://your-api-url.com';

const app = createApp(App)
app.use(router)
app.mount("#app")

