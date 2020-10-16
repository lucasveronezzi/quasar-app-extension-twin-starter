<template>
  <q-layout view="lHh Lpr lFf" >
    <app-header :leftDrawer="leftDrawerOpen" @clickLeftDrawer="leftDrawerOpen = $event"/>

    <app-left-menu v-model="leftDrawerOpen"/>

    <q-page-container>
      <t-container-header v-if="!$q.platform.is.mobile" />

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import TContainerHeader from 'twin-starter/components/TContainerHeader.vue'
import AppHeader from './AppHeader.vue'
import AppLeftMenu from './AppLeftMenu.vue'

export default {
  name: 'AppLayout',

  components: { TContainerHeader, AppHeader, AppLeftMenu },

  data () {
    return {
      leftDrawerOpen: false
    }
  },

  beforeCreate() {
    console.log("teste")
  },

  beforeRouteEnter () {
    console.log("teste enter route")
  },

  // This is needed if you are using PreFetch
  beforeRouteUpdate (to, from, next) {
    if (this.$q.platform.is.mobile) { this.leftDrawerOpen = false }

    next()
  }
}
</script>
