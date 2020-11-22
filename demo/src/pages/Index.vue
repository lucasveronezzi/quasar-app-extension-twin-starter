<template>
  <base-page class="flex flex-center" :isLoading="isLoading">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
    <q-btn label="teste" @click="teste" />
  </base-page>
</template>

<script>
export default {
  name: 'PageIndex',
  computed: {
    isLoading () {
      return this.$store.state.twin.loadingPage > 0
    }
  },

  methods: {
    teste() {
      this.$store.commit("Auth/teste")
    }
  }
}
</script>
