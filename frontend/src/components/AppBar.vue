<template>
  <v-app-bar class="AppBar elevation-2" color="purple lighten-3">
    <h2 @click="$router.push({ path: 'home' })">matching app</h2>
    <v-spacer></v-spacer>
    <div v-if="user" class="mr-5">
      <span>{{user.name}}</span>
      <v-icon>{{ icons.mdiAccount }}</v-icon>
    </div>
    <v-btn v-if="user" text @click="logout">
      <span class="mr-2">Выйти</span>
      <v-icon>{{ icons.mdiLogout }}</v-icon>
    </v-btn>
    <v-btn v-else-if="!isLoginPage" text @click="login">
      <span class="mr-2">Войти</span>
      <v-icon>{{ icons.mdiLogin }}</v-icon>
    </v-btn>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon @click="toggleThemeDarkMode">
          <v-icon :style="{transform: `rotate(${$vuetify.theme.dark ? 0 : -190 }deg)`}">
            {{ icons.mdiThemeLightDark }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ ($vuetify.theme.dark ? 'light' : 'dark') + 'Mode' }}</span>
     </v-tooltip>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
import { mdiLogin, mdiLogout, mdiThemeLightDark, mdiAccount } from '@mdi/js'

export default {
  name: 'AppBar',
  components: {
  },
  data () {
    return {
      icons: { mdiLogin, mdiLogout, mdiThemeLightDark, mdiAccount }
    }
  },
  computed: {
    ...mapState('User', [
      'user'
    ]),
    isLoginPage () {
      return this.$router.currentRoute.name === 'login'
    }
  },
  methods: {
    login () {
      this.$router.push({ path: 'login' })
    },
    logout () {
      this.$store.dispatch('User/logout')
        .then(() => this.$router.push({ path: 'home' }))
    },
    toggleThemeDarkMode () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>

<style lang="scss">
.AppBar {
  background-color: #E9DDFF;
  h2 {
    cursor: pointer;
    text-transform: uppercase;
  }
}
</style>
