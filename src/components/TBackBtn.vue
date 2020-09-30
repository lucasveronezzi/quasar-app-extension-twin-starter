<template>
  <q-btn
    v-bind="$attrs"
    v-ripple="false"
    flat
    dense
    round
    :aria-label="$twin.i18n.t('label.goBack')"
    icon="arrow_back"
    :to="to"
    @click="goBack"
    class="q-mr-sm"
  />
</template>

<script>
export default {
  name: 'ButtonGoBack',

  props: {
    to: {
      type: [String, Object],
      required: false
    }
  },

  methods: {
    goBack () {
      if (!this.to) {
        if (this.$routerNested) {
          this.$router.replace(this.$routerNested.history[this.$routerNested.history.length - 2].path)
        } else {
          this.$router.back()
        }
      }
    },

    hasHistory () {
      return window.history?.length > 2
    },

    goBackHistory () {
      this.hasHistory() ? this.$router.go(-1) : this.$router.replace('/')
    }
  }
}
</script>
