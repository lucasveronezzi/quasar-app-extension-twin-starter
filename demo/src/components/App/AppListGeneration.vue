<template>
  <q-list padding>
    <template v-for="(item, index) in listItems">
      <q-item
        v-if="!item.child && item.type !== 'separator'"
        :key="index"
        :to="item.link"
        @click="item.action ? $emit(item.action) : null"
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
        v-if="item.child && item.type !== 'separator'"
        :key="index"
        v-model="itemsOpened[index]"
        :label="item.name"
        :icon="item.icon"
        group="groupItems"
        :class="{'item-open': itemsOpened[index]}"
        :header-class="{ 'text-primary': itemsOpened[index] }"
        expand-icon="navigate_before"
        expanded-icon="keyboard_arrow_down"
        expand-separator
      >
        <template v-for="(child, childIndex) in item.child">
          <q-item
            v-if="child.type !== 'separator'"
            :key="childIndex"
            v-ripple
            :inset-level="0.8"
            :to="child.link"
            @click="child.action ? $emit(item.action) : null"
            active-class="text-white"
            clickable
            exact
          >
            <q-item-section>
              {{ child.name }}
            </q-item-section>
          </q-item>

          <q-separator spaced :key="childIndex" v-else />
        </template>
      </q-expansion-item>

      <q-separator spaced :key="index" v-if="item.type === 'separator'" />
    </template>
  </q-list>
</template>

<script>
import handleImportedItems from 'twin-starter/mixins/handleImportedItems.js'

export default {
  name: 'ListGeneration',

  mixins: [handleImportedItems],

  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="sass" scoped>
  .item-open
    border-left: 4px solid $primary
</style>
