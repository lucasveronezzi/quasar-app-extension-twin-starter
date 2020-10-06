<template>
  <q-card class="fit">
    <q-form @submit="submit">
      <template v-if="!password_sucess">
        <q-card-section class="flex items-center">
          <t-back-btn :to="{ name: 'login' }" />

          <span class="text-h6">{{ $twin.i18n.t('page.passwordReset.welcome') }} {{ form.email }}</span>
          <br />
          <br />
          <span class="text-subtitle-1">{{ $twin.i18n.t('page.passwordReset.subTitle') }}</span>
        </q-card-section>

        <q-card-section>
          <input-password v-model="form.password" />

          <input-password
            v-model="form.passwordConfirm"
            :rules="[ $twin.rules.sameAs(form.password, 'Confirme novamente a senha') ]"
          />
        </q-card-section>

        <q-card-actions vertical class="q-pa-md">
          <q-btn type="submit" :loading="loading" :label="$twin.i18n.t('btn.resetPassword')" color="primary" />
        </q-card-actions>
      </template>

      <template v-else>
        <q-card-section class="flex items-center">
          <t-back-btn :to="{ name: 'login' }" />

          <span class="text-h6">{{ $twin.i18n.t('page.passwordReset.passwordChangedMessage') }} </span>

          <q-icon
            name="far fa-check-circle"
            class="text-positive"
            style="font-size: 30px;"
          />
        </q-card-section>

        <q-card-section align="center">
          <span class="text-subtitle-1">{{ $twin.i18n.t('page.passwordReset.redirect') }}</span
          >
          <br />
          <span class="text-h6 ">{{ timer }}</span>
        </q-card-section>
      </template>
    </q-form>
  </q-card>
</template>

<script>
import TBackBtn from 'twin-starter/components/TBackBtn.vue'
import InputPassword from 'components/general/InputPassword.vue'

export default {
  name: 'ResetPasswordPage',

  components: { TBackBtn, InputPassword },

  data () {
    return {
      form: {
        email: this.$route.query.email,
        password: '',
        passwordConfirm: '',
        token: this.$router.currentRoute.query.token
      },
      isPwd: true,
      isPwd2: true,
      password_sucess: false,
      timer: 3,
      loading: false
    }
  },

  methods: {
    submit () {
      this.loading = true

      this.$twin.passwordReset(this.form)
        .then(response => {
          this.password_sucess = true
          this.redirect()
        })
        .catch(error => {
          if (error.response.status === 402) {
            this.$q.notify({
              message: 'Token Inválido. Esse link de recuperação de senha não é mais válido.',
              color: 'negative',
              icon: 'fas fa-exclamation-triangle',
              position: 'center',
              multiLine: true,
              actions: [{ label: 'Fechar', color: 'white' }]
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    redirect () {
      setTimeout(() => {
        if (this.timer !== 0) {
          this.redirect()
          this.timer--
        } else {
          this.$router.push({ name: 'login' })
        }
      }, 1000)
    }
  }
}
</script>
