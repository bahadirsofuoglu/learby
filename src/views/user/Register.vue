<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md="10" class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
        <div class="position-relative image-side ">
          <p class=" text-white h2">
            {{ $t('dashboards.magic-is-in-the-details') }}
          </p>
          <p class="white mb-0">
            Please use this form to register. <br />If you are a member, please
            <router-link tag="a" to="/user/login" class="white"
              >login</router-link
            >.
          </p>
        </div>
        <div class="form-side">
          <router-link tag="a" to="/"><span class="logo-single"/></router-link>
          <h6 class="mb-4">{{ $t('user.register') }}</h6>
          <b-form @submit.prevent="formSubmit">
            <label class="form-group has-float-label mb-4">
              <input type="text" class="form-control" v-model="form.fullname" />
              <span>{{ $t('user.fullname') }}</span>
            </label>
            <label class="form-group has-float-label mb-4">
              <input type="email" class="form-control" v-model="form.email" />
              <span>{{ $t('user.email') }}</span>
            </label>
            <label class="form-group has-float-label mb-4">
              <input
                type="password"
                class="form-control"
                v-model="form.password"
              />
              <span>{{ $t('user.password') }}</span>
            </label>
            <div class="d-flex justify-content-end align-items-center">
              <b-button
                type="submit"
                variant="primary"
                size="lg"
                class="btn-shadow"
                >{{ $t('user.register-button') }}</b-button
              >
            </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
const {
  required,
  maxLength,
  minLength,
  email
} = require('vuelidate/lib/validators')
import { adminRoot } from '../../constants/config'
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      password: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(4)
      },
      email: {
        required,
        email,
        minLength: minLength(4)
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'processing', 'loginError'])
  },
  methods: {
    ...mapActions(['register']),
    formSubmit () {
      /*    this.form.email = "piaf-vue@coloredstrategies.com";
            this.form.password = "piaf123"; */

      // if (!this.$v.form.$anyError) {
      this.register({
        email: this.form.email,
        password: this.form.password
      })
      //}
    }
  }
}
</script>
