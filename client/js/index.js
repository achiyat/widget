// client\js\index.js
import { getWidgetFromAPI } from "./services.js";
console.log("Script loaded");

const data = await getWidgetFromAPI(4);
console.log(data);
