<template>
  <q-drawer
    :value="value"
    @input="$emit('input', $event)"
    :width="$q.platform.is.mobile?310:250"
    show-if-above
    side="left"
  >
    <q-scroll-area :style="{ height: `calc(100% - ${menuMarginTop})`, 'margin-top': menuMarginTop }">
      <app-list-generation :items="importedItems" @logout="logout" />
    </q-scroll-area>

    <q-img class="absolute-top" src="~/assets/bg-left-menu.jpg" style="height: 170px;" :img-style="{padding: '0px'}">
      <div class="absolute-bottom bg-transparent text-grey-4" style="padding: 0px">
        <q-avatar size="80px" class="q-mb-sm q-ml-md">
          <q-img src="~assets/icon-user.png" :ratio="1" />
        </q-avatar>
        <div class="dark-dimmed q-pa-sm">
          <div class="text-weight-medium">Lucas Veronezzi</div>

          <div class="text-caption">lucasveronezzi_elric@hotmail.com</div>
        </div>
      </div>
    </q-img>
  </q-drawer>
</template>

<script>
import AppListGeneration from '../App/AppListGeneration.vue'
import importedItems from 'src/menu/main.js'

export default {
  name: 'TheMenuLeft',

  components: { AppListGeneration },

  props: {
    value: {
      type: Boolean,
      required: true
    }
  },

  created () {
    this.importedItems = importedItems
    this.menuMarginTop = '170px'
  },

  methods: {
    logout () {
      this.$q.loading.show({
        message: 'Saindo do sistema...'
      })

      this.$store.dispatch('Auth/logout').finally(() => {
        this.$q.loading.hide()
        this.$router.push({ name: 'login' })
      })
    }
  }
}
</script>

<style lang="sass" scoped="">
.dark-dimmed
  background-color: rgba(0, 0, 0, 0.5) !important
</style>
