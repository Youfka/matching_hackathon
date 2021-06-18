import Vue from 'vue'
import Vuetify from 'vuetify/lib'


const current = navigator.language.split('-')[0]

Vue.use(Vuetify)

export default new Vuetify({
  current,
  icons: {
    iconfont: 'mdiSvg'
  },
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: '#1689E7',
        accent: '#4CBB99',
        secondary: '#7BC6FF',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252'
      },
      light: {
        primary: '#1689E7',
        accent: '#4CBB99',
        secondary: '#7BC6FF',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252'
      }
    }
  }
})
