<template>
  <app-page class="flex flex-center" :isLoading="isLoading">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
    {{$store.state.Auth.sobbb}}
    <br>
    {{$store.state.Auth.nested.nsnsn}}
    <br>
    {{$store.state.Auth.teste2.nestedArray[0]}}
    <br>
    {{$store.state.rootNested.myname}}
    <br>
    {{$store.state.rootNested.neste.name}}
    <br>
    {{$store.state.teste}}

    <q-btn label="teste" @click="teste" />
  </app-page>
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
