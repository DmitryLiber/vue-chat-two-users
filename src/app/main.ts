import './assets/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import routers from './routers'
import { Btn, Container, Loader, Typography, Field, Grid } from '@shared/ui'

const app = createApp(App)

app.use(createPinia())
app.use(routers)

app.component('Btn', Btn)
app.component('Loader', Loader)
app.component('Typography', Typography)
app.component('Container', Container)
app.component('Field', Field)
app.component('Grid', Grid)

app.mount('#app')
