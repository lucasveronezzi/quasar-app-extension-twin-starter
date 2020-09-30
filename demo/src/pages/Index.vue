<template>
  <app-page>
    <app-card>
      Quasar
      <q-btn @click="login">Login Teste</q-btn>
    </app-card>
  </app-page>

</template>

<script>
export default {
  methods: {
    login () {
      this.$twin.whitLoading('twin/auth/login', {})
    }
  }
}
</script>
