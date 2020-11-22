<template>
  <q-form @submit="submit">
    <slot :loading="loading"></slot>
  </q-form>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
  },

  data() {
    return {
      loading: false
    }
  },

  methods: {
    submit() {
      this.loading = true

      this.$store.dispatch('Auth/login', this.data)
        .then(async response => {
          
          this.loading = false

          if (this.$route.query.redirect) {
            this.$router.replace({ path: this.$route.query.redirect })
          } else {
            this.$router.replace({ name: 'home' })
          }
        })
        .catch(error => {
          this.loading = false

          if (error.response) {
            this.$emit('clear')

            if (error.response.status === 400) {
              this.$q.notify({
                type: 'negative',
                message: 'Usuário e/ou senha invalidos.'
              })
            } else if (error.response.status === 401) {
              this.$q.notify({
                type: 'negative',
                message: 'Crendeciais do servidor incorretas'
              })
            }
          }
        })
    }
  }
}
</script>