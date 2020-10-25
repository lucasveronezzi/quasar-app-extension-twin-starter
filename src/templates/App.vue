<template>
  <div id="q-app">
    <router-view <% if (prompts.splashscreen) { %>v-if="authenticated !== null" <% } %>/>
<% if (prompts.splashscreen) { %>
    <the-splashscreen-spinner v-else /><% } %>
  </div>
</template>
<script>
<% if (prompts.splashscreen) { %>import TheSplashscreenSpinner from 'components/General/TheSplashscreenSpinner.vue'
<% } %>
export default {
  name: 'App'<% if (prompts.splashscreen) { %>,

  components: { TheSplashscreenSpinner },

  computed: {
    authenticated () {
      return this.$store.getters['Auth/isAuthenticated']
    }
  }<% } %>
}
</script>
