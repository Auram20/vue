/* main.ts */
import { createApp } from "vue"
import App from "./App.vue"

import { createNeo } from "@vizrt/components"

const neo = createNeo({})

createApp(App).use(neo).mount("#app")