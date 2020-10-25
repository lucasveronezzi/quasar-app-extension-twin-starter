<template>
  <q-layout view="lHh Lpr lFf" >
    <the-header @clickLeftDrawer="leftDrawerOpen = !leftDrawerOpen"/>

    <the-menu-left v-model="leftDrawerOpen"/>

    <q-page-container>
      <t-page-header v-if="!$q.platform.is.mobile" />

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import TPageHeader from 'twin-starter/components/TPageHeader.vue'
import TheHeader from 'components/General/TheHeader.vue'
import TheMenuLeft from 'components/General/TheMenuLeft.vue'

export default {
  name: 'AppLayout',

  components: { TPageHeader, TheHeader, TheMenuLeft },

  data () {
    return {
      leftDrawerOpen: false
    }
  },

  // This is needed if you are using PreFetch
  beforeRouteUpdate (to, from, next) {
    if (this.$q.platform.is.mobile) { this.leftDrawerOpen = false }

    next()
  }
}
</script>
