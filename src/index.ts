import { type App } from "vue";
import Button from "./components/Button.vue";
import Dropdown from "./components/Dropdown.vue";
import "./assets/tailwind.css";

const components = {
  VButton: Button,
  VDropdown: Dropdown,
};

const install = (app: App) => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
};

export default { install };
export { Button as VButton, Dropdown as VDropdown };
