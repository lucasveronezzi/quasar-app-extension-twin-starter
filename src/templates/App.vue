<template>
  <div id="q-app">
    <router-view <% if (prompts.splashscreen) { %>v-if="authenticated !== null" <% } %>/>
<% if (prompts.splashscreen) { %>
    <splashscreen-spinner v-else /><% } %>
  </div>
</template>
<script>
<% if (prompts.splashscreen) { %>import SplashscreenSpinner from 'components/general/SplashscreenSpinner.vue'
<% } %>
export default {
  name: 'App'<% if (prompts.splashscreen) { %>,

  components: { SplashscreenSpinner },

  computed: {
    authenticated () {
      return this.$store.getters['twin/auth/isAuthenticated']
    }
  }<% } %>
}
</script>
