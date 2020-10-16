<template>
  <div id="q-app">
    <router-view v-if="authenticated !== null" />

    <splashscreen-spinner v-else />
  </div>
</template>
<script>
import SplashscreenSpinner from 'components/general/SplashscreenSpinner.vue'

export default {
  name: 'App',

  components: { SplashscreenSpinner },

  computed: {
    authenticated () {
      return this.$store.getters['twin/auth/isAuthenticated']
    }
  }
}
</script>
