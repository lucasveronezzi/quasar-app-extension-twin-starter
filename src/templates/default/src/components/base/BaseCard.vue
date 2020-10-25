<template>
  <q-card
    v-bind="$attrs"
    v-on="$listeners"
    flat
  >
    <template v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </q-card>
</template>
