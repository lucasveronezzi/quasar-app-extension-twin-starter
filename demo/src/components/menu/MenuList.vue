<template>
  <q-scroll-area :style="{ height: `calc(100% - ${marginTop})`, 'margin-top': marginTop }">
    <q-list padding>
      <template v-for="(item, index) in menuItems">
        <q-item
          v-if="!item.child"
          :key="index"
          :to="item.link"
          @click="item.action ? action(item.action) : null"
          v-ripple
          clickable
          exact
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section>
            {{ item.name }}
          </q-item-section>
        </q-item>

        <q-expansion-item
          v-if="item.child"
          :key="index"
          v-model="menuItemsOpen[index]"
          :label="item.name"
          :icon="item.icon"
          group="groupItems"
          :class="{'item-open': menuItemsOpen[index]}"
          :header-class="{ 'text-primary': menuItemsOpen[index] }"
          expand-icon="navigate_before"
          expanded-icon="keyboard_arrow_down"
          expand-separator
        >
          <q-item
            v-for="(child, childIndex) in item.child"
            :key="childIndex"
            v-ripple
            :inset-level="0.8"
            :to="child.link"
            @click="child.action ? action(item.action) : null"
            active-class="text-white"
            clickable
            exact
          >
            <q-item-section>
              {{ child.name }}
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </template>
    </q-list>

  </q-scroll-area>
</template>

<script>
import mixinMenuItems from 'twin-starter/mixins/menuItems.js'
import importedItems from 'components/menu/items.js'

export default {
  name: 'MenuList',

  mixins: [mixinMenuItems],

  props: {
    marginTop: {
      type: String,
      default: '0px'
    }
  },

  beforeCreate () {
    this.importedItems = importedItems
  },

  methods: {
    logout () {
      console.log('logout')
      // this.$q.loading.show({
      //   message: 'Saindo do sistema...'
      // })

      // this.$store.dispatch('account/logout').finally(() => {
      //   this.$q.loading.hide()
      //   this.$router.push('/login')
      // })
    }
  }
}
</script>

<style lang="sass" scoped>
  .item-open
    border-left: 4px solid $primary
</style>
