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
          <q-input
            v-model="form.password"
            label="Senha"
            :type="isPwd ? 'password' : 'text'"
            bg-color="white"
            class="q-mb-md"
            outlined
            autocomplete
            :rules="[ $twin.rules.required() ]"
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

          <q-input
            v-model="form.passwordConfirm"
            label="Confirmar Senha"
            :type="isPwd2 ? 'password' : 'text'"
            bg-color="white"
            :rules="[ $twin.rules.required(), $twin.rules.sameAs(form.password, 'Confirmação de senha não confere') ]"
            outlined
            required
            autocomplete
          >
            <template v-slot:prepend>
              <q-icon name="las la-lock" />
            </template>

            <template v-slot:append>
              <q-icon
                :name="isPwd2 ? 'las la-low-vision' : 'las la-eye'"
                class="cursor-pointer"
                @click="isPwd2 = !isPwd2"
              />
            </template>
          </q-input>
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

export default {
  name: 'ResetPasswordPage',

  components: { TBackBtn },

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
