<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md="10" class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
        <div class="position-relative image-side">
          <p class="text-white h2">
            Learby
          </p>
          <p class="white mb-0">
            It stores the words you want to memorize<br />
            while learning a new language.<br />
            Teaches you those words in a fun way
          </p>
        </div>
        <div class="form-side">
          <b-form
            @submit.prevent="onSigninGoogle"
            class="av-tooltip tooltip-label-bottom"
          >
            <div>
              <br /><br />
              <b-button type="submit" block variant="outline-primary" size="lg">
                <span class="label">Login with Google</span>
              </b-button>
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
  mixins: [validationMixin],
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
    onSigninGoogle () {
      this.$store.dispatch('signUserInGoogle')
    }
  },
  watch: {
    currentUser (val) {
      if (val && val.uid && val.uid.length > 0) {
        setTimeout(() => {
          this.$router.push(adminRoot)
        }, 200)
      }
    },
    loginError (val) {
      if (val != null) {
        this.$notify('error', 'Login Error', val, {
          duration: 3000,
          permanent: false
        })
      }
    }
  }
}
</script>
