<template>
  <div id="q-app">
    <router-view v-if="authenticated !== null" />

    <the-splashscreen-spinner v-else />
  </div>
</template>
<script>
import TheSplashscreenSpinner from 'components/General/TheSplashscreenSpinner.vue'

export default {
  name: 'App',

  components: { TheSplashscreenSpinner },

  computed: {
    authenticated () {
      return this.$store.getters['Auth/isAuthenticated']
    }
  }
}
</script>
