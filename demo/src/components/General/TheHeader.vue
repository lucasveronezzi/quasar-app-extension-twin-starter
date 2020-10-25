<template>
  <q-header elevated>
    <q-toolbar>
      <t-btn-back
        v-show="$route.meta.backBtn && $q.platform.is.mobile"
      />

      <q-btn
        dense
        flat
        round
        icon="menu"
        @click="$emit('clickLeftDrawer')"
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
import TBtnBack from 'twin-starter/components/TBtnBack.vue'

export default {
  name: 'TheHeader',

  components: { TBtnBack }
}
</script>
