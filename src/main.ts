import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {
  Avatar,
  Button,
  ConfigProvider, Dropdown, Layout, Menu, Select
} from "ant-design-vue";

const app = createApp(App)
app.use(router)

app.use(ConfigProvider)
app.use(Layout)
app.use(Button)
app.use(Dropdown)
app.use(Avatar)
app.use(Menu)
app.use(Select)

app.mount("#app");
