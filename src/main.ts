import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {
  Avatar, Collapse, InputNumber,
  Button, Breadcrumb, Checkbox,
  ConfigProvider, Dropdown, Form, Input, Layout, Menu, Modal, Popconfirm, Select, Table, Tag
} from "ant-design-vue";
import HeaderComponent from 'menu-header-component/dist/menu-header-component.umd.js'
import 'menu-header-component/dist/menu-header-component.css'

const app = createApp(App)
app.use(router)

app.use(ConfigProvider)
app.use(Layout)
app.use(Button)
app.use(Dropdown)
app.use(Avatar)
app.use(Menu)
app.use(Select)
app.use(Table)
app.use(Form)
app.use(Input)
app.use(Checkbox)
app.use(Popconfirm)
app.use(Modal)
app.use(Tag)
app.use(Collapse)
app.use(Breadcrumb)
app.use(InputNumber)

app.use(HeaderComponent)

app.mount("#app");
