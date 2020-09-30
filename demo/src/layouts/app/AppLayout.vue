<template>
  <q-layout view="lHh Lpr lFf" >
    <template v-if="authenticated">
      <app-header :leftDrawer="leftDrawerOpen" @clickLeftDrawer="leftDrawerOpen = $event"/>

      <app-left-menu v-model="leftDrawerOpen"/>

      <q-page-container>
        <t-container-header v-if="!$q.platform.is.mobile" />

        <router-view />
      </q-page-container>

    </template>

    <splashscreen v-else />

  </q-layout>
</template>

<script>
import TContainerHeader from 'twin-starter/components/TContainerHeader.vue'
import AppHeader from './AppHeader.vue'
import AppLeftMenu from './AppLeftMenu.vue'
import Splashscreen from 'components/Splashscreen.vue'

export default {
  name: 'AppLayout',

  components: { TContainerHeader, AppHeader, AppLeftMenu, Splashscreen },

  data () {
    return {
      leftDrawerOpen: false
    }
  },

  computed: {
    authenticated () {
      return this.$store.getters['twin/auth/authenticated']
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (this.$q.platform.is.mobile) { this.leftDrawerOpen = false }

    next()
  }
}
</script>
