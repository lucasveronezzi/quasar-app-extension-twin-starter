<template>
  <q-card class="fit">
    <q-form v-if="!sent_email" @submit="submit">
      <q-card-section class="flex items-center">
        <t-btn-back :to="{ name: 'login' }" />

        <span class="text-h6">{{ $twin.i18n.t('page.passwordForgot.title') }}</span>
        <br />
        <br />
        <span class="text-subtitle-1">{{ $twin.i18n.t('page.passwordForgot.subTitle') }}</span
        >
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="email"
          label="E-mail"
          type="email"
          bg-color="white"
          outlined
          autocomplete
          :rules="[ $twin.rules.required(), invalid_email ]"
        >
          <template v-slot:prepend>
            <q-icon name="las la-envelope" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions vertical class="q-pa-md">
        <q-btn type="submit" :loading="loading" :label="$twin.i18n.t('btn.sendEmail')" color="primary" />
      </q-card-actions>
    </q-form>

    <template v-else>
      <q-card-section class="flex items-center">
        <t-btn-back :to="{ name: 'login' }" />

        <span class="text-h6 q-mr-sm">{{ $twin.i18n.t('page.passwordForgot.emailSent') }}</span>

        <q-icon
          name="las la-check-circle"
          class="text-positive"
          style="font-size: 30px;"
        />
      </q-card-section>

      <q-card-section>
        <span class="text-subtitle-1">{{ $twin.i18n.t('page.passwordForgot.checkEmailMessage') }}</span>
      </q-card-section>
    </template>
  </q-card>
</template>

<script>
import TBtnBack from 'twin-starter/components/TBtnBack.vue'

export default {
  name: 'ForgotPasswordPage',

  components: { TBtnBack },

  data () {
    return {
      email: '',
      invalid_email: false,
      sent_email: false,
      loading: false
    }
  },

  methods: {
    submit () {
      this.loading = true

       this.$store.dispatch('Auth/passwordForgot', this.email)
        .then(response => {
          this.sent_email = true
        })
        .catch(error => {
          if (error.response.status === 402 || error.response.status === 422) {
            this.invalid_email = true
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
