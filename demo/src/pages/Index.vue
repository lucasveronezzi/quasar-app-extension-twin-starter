<template>
  <app-page>
    <app-card>
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
