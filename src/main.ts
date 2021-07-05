import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {
  Button,
  ConfigProvider, Layout
} from "ant-design-vue";

const app = createApp(App)
app.use(router)

app.use(ConfigProvider)
app.use(Layout)
app.use(Button)

app.mount("#app");
