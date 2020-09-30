<template>
  <q-header elevated>
    <q-toolbar>
      <t-back-btn
        v-show="$route.meta.backBtn && $q.platform.is.mobile"
      />

      <q-btn
        dense
        flat
        round
        icon="menu"
        @click="$emit('clickLeftDrawer', !leftDrawer)"
        v-show="!$route.meta.backBtn || $q.platform.is.mobile"
      />

      <q-toolbar-title>
        <q-avatar>
          <img src="favicon.ico">
        </q-avatar>
        Twin Starter Kit Package
      </q-toolbar-title>

      <div>Quasar v{{ $q.version }}</div>
    </q-toolbar>
  </q-header>
</template>

<script>
import TBackBtn from 'twin-starter/components/TBackBtn.vue'

export default {
  name: 'AppHeader',

  components: { TBackBtn },

  props: {
    leftDrawer: {
      type: Boolean,
      required: true
    }
  }
}
</script>
