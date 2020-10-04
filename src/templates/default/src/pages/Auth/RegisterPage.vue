<template>
  <q-form @submit="submit">
    <q-card class="fit text-center">
      <q-card-section class="text-left flex items-center">
          <t-back-btn :to="{ name: 'login' }" />
        <span class="text-h6">{{ $twin.i18n.t('page.register.title') }}</span>
      </q-card-section>
      <q-card-section class="q-py-none">
        <div class="row items-center full-width">
          <hr class="col" /><span class="text-subtitle2 text-grey-7 q-mx-md">{{ $twin.i18n.t('page.register.formTitle') }}</span><hr class="col" />
        </div>
      </q-card-section>
      <q-card-section class="q-gutter-y-md">
        <q-input
          v-model="form.name"
          :label="$twin.i18n.t('label.username')"
          autocomplete
          bg-color="white"
          outlined
          :rules="[ $twin.rules.required() ]"
        >
          <template v-slot:prepend>
            <q-icon name="las la-user" />
          </template>
        </q-input>

        <q-input
          v-model="form.email"
          :label="$twin.i18n.t('label.email')"
          autocomplete
          bg-color="white"
          outlined
          :rules="[ $twin.rules.required() ]"
        >
          <template v-slot:prepend>
            <q-icon name="las la-envelope" />
          </template>
        </q-input>

        <input-password v-model="form.password" />

        <input-password 
          v-model="form.passwordConfirm" 
          :rules="[ $twin.rules.sameAs(form.password, 'Confirme novamente a senha') ]" 
        />

        <q-checkbox
          v-model="form.tos"
          color="secondary"
          keep-color
        >
          <template>
            {{ $twin.i18n.t('page.register.agreeWith') }}
            <span class="text-light-blue-4 text-bold"
              >{{ $twin.i18n.t('page.register.termsService') }}</span
            >
          </template>
        </q-checkbox>
      </q-card-section>

      <q-card-actions vertical class="q-pa-md">
        <q-btn type="submit" :loading="loading" :label="$twin.i18n.t('btn.createAccount')" color="primary" />
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script>
import TBackBtn from 'twin-starter/components/TBackBtn.vue'
import InputPassword from 'components/general/InputPassword.vue'

export default {
  name: 'RegisterPage',

  components: { TBackBtn, InputPassword },

  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        tos: false
      },
      loading: false
    }
  },

  methods: {
    submit () {
      this.loading = true

      this.$twin.auth.register(this.form)
        .then(() => {

        }).finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
