<template>
  <q-input
    v-bind="$attrs"
    :value="value"
    @input="$emit('input', $event.trim())"
    :type="isPwd ? 'password' : 'text'"
    :label="$twin.i18n.t('label.password')"
    :rules="myRules"
    outlined
  >
    <template v-slot:prepend>
      <q-icon name="las la-lock" />
    </template>

    <template v-slot:append>
      <q-icon
        :name="isPwd ? 'las la-low-vision' : 'las la-eye'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>
  </q-input>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },

    rules: {
      type: Array,
      default: () => []
    },

    noRequired: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      isPwd: true
    }
  },

  computed: {
    myRules () {
      return this.noRequired ? this.rules : [this.$twin.rules.required(), ...this.rules]
    }
  }
}
</script>
