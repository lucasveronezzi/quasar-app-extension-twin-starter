<template>
  <q-layout view="lHh Lpr lFf" >
<% if (prompts.splashscreen) { %>      <template v-if="authenticated"><% } %>
      <app-header :leftDrawer="leftDrawerOpen" @clickLeftDrawer="leftDrawerOpen = $event"/>

      <app-left-menu v-model="leftDrawerOpen"/>

      <q-page-container>
        <t-container-header v-if="!$q.platform.is.mobile" />

        <router-view />
      </q-page-container><% if (prompts.splashscreen) { %>
    </template>

    <splashscreen-spinner v-else /><% } %>
  </q-layout>
</template>

<script>
import TContainerHeader from 'twin-starter/components/TContainerHeader.vue'
import AppHeader from './AppHeader.vue'
import AppLeftMenu from './AppLeftMenu.vue'
<% if (prompts.splashscreen) { %>import SplashscreenSpinner from 'components/general/SplashscreenSpinner.vue'
<% } %>
export default {
  name: 'AppLayout',

  components: { TContainerHeader, AppHeader, AppLeftMenu<% if (prompts.splashscreen) { %>, SplashscreenSpinner<% } %> },

  data () {
    return {
      leftDrawerOpen: false
    }
  },<% if (prompts.splashscreen) { %>

  computed: {
    authenticated () {
      return this.$store.getters['twin/auth/isAuthenticated']
    }
  },
<% } %>
  beforeRouteUpdate (to, from, next) {
    if (this.$q.platform.is.mobile) { this.leftDrawerOpen = false }

    next()
  }
}
</script>
