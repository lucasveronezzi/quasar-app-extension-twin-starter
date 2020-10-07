<template>
  <q-layout view="lHh Lpr lFf" >
    <q-page-container v-if="authenticated === false" class="flex full-width" style="height: 100vh">
        <q-page padding class="row items-center justify-center fit">
          <div class="col-xs-12 col-sm-8 col-md-4 col-lg-4 col-xl-2">
            <router-view />
          </div>
        </q-page>
      </q-page-container>

      <splashscreen-spinner v-else />
  </q-layout>
</template>

<script>
import SplashscreenSpinner from 'components/general/SplashscreenSpinner.vue'

export default {
  name: 'AuthLayout',

  components: { SplashscreenSpinner },

  computed: {
    authenticated () {
      return this.$store.getters['twin/auth/isAuthenticated']
    }
  }
}
</script>
