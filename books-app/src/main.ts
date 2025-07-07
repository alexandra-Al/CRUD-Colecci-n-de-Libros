import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

import 'primeicons/primeicons.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'

import './assets/main.css'   // Tailwind

/* 🌎 Locale español (solo lo necesario para el calendario) */
const localeEs = {
  firstDayOfWeek: 1,
  dayNames: [
    'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'
  ],
  dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  dayNamesMin:   ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ],
  monthNamesShort: [
    'ene', 'feb', 'mar', 'abr', 'may', 'jun',
    'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
  ],
  today: 'Hoy',
  clear: 'Limpiar'
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

/* 👉 Registramos PrimeVue con el locale en español */
app.use(PrimeVue, { locale: localeEs })

app.use(ToastService)
app.use(ConfirmationService)

app.mount('#app')
