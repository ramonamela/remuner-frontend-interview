/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const remunerTheme = {
  dark: false,
  colors: {
    primary: "#5E6AD2",
    secondary: "#D9DBE9",
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'remunerTheme',
    themes: {
      remunerTheme
    }
  }
})
