<template>
  <q-form @submit="submit">
    <q-card class="fit text-center">
      <q-img src="~assets/icon.svg" style="max-width: 150px" />

      <q-card-section class="q-gutter-y-md">
        <q-input
          v-model="login"
          outlined
          autocomplete
          bg-color="white"
          :label="$twin.i18n.t('label.email')"
          :rules="[ $twin.rules.required(), $twin.rules.email() ]"
        >
          <template v-slot:prepend>
            <q-icon name="las la-envelope" />
          </template>
        </q-input>

        <app-input-password v-model="password" />
      </q-card-section>

      <q-card-actions vertical class="text-caption text-grey-9 q-pa-md q-mb-lg">
        <q-btn type="submit" :loading="loading" :label="$twin.i18n.t('btn.logIn')" color="primary" />

        <hr color="#e0e0e0" class="q-my-md full-width" />

        <div class="q-pb-sm" align="center">
          <router-link
            :to="{ name: 'forgotPassword' }"
            tag="a"
            class="text-grey-7 not-hover"
            align="center"
          >{{ $twin.i18n.t('page.login.passwordForgot') }}
          </router-link>
        </div>

        <div class="q-pb-sm" align="center">
          {{ $twin.i18n.t('page.login.registerMessage') }}
          <router-link
            :to="{ name: 'register'}"
            tag="a"
            class="not-hover"
            align="center"
          >
            {{ $twin.i18n.t('page.login.register') }}
          </router-link>
        </div>
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script>
import AppInputPassword from 'components/App/AppInputPassword.vue'

export default {
  name: 'LoginPage',

  components: { AppInputPassword },

  data () {
    return {
      login: '',
      password: '',
      isPwd: true,
      loading: false
    }
  },

  methods: {
    submit () {
      this.loading = true

      this.$store.dispatch('Auth/login', { username: this.login, password: this.password })
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
            this.password = ''

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

<style lang="sass" scoped>
a:hover.not-hover
  color: #448aff !important
</style>
