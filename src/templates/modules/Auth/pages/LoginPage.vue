<template>
 <login-form :data="form" v-slot="{ loading }" @clear="form.password = ''">
    <q-card class="fit text-center">
      <q-img src="~assets/icon.svg" style="max-width: 150px" />

      <q-card-section class="q-gutter-y-md">
        <q-input
          v-model="form.login"
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

        <app-input-password v-model="form.password" />
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
  </login-form>
</template>

<script>
import AppInputPassword from 'components/App/AppInputPassword.vue'
import LoginForm from <% if (prompts.useModules) { %>'../components/LoginForm.vue'<%}else{%>'components/Auth/LoginForm.vue'<%}%>

export default {
  name: 'LoginPage',

  components: { AppInputPassword, LoginForm },

  data() {
    return { 
      form: {
        <%=prompts.authIndetifierField%>: '',
        password: '',
      },
      isPwd: true
    }
  }
}
</script>

<style lang="sass" scoped>
a:hover.not-hover
  color: #448aff !important
</style>
