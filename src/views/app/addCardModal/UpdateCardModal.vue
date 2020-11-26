<template>
  <div>
    <b-row>
      <b-col md="8" sm="12">
        <b-card>
          <b-form>
            <label class="form-group has-float-label">
              <input
                type="text"
                class="form-control"
                required
                v-model="updateCard.front"
              />
              <span>Front</span>
            </label>
            <label class="form-group has-float-label">
              <input
                type="text"
                class="form-control"
                v-model="updateCard.back"
              />
              <span>Back</span>
            </label>

            <div class="form-group has-float-label" id="select">
              <v-select
                :dir="direction"
                :options="selectData"
                v-model="selected"
              />
              <span>Category</span>
            </div>
          </b-form>
        </b-card>
      </b-col>
      <b-col>
        <div class="mt-3">
          <ul class="flashcard-list">
            <li
              @click="
                () => {
                  updateCard.flipped = !updateCard.flipped
                }
              "
            >
              <transition name="flip">
                <p :key="updateCard.flipped" class="modalFlipCard">
                  {{ updateCard.flipped ? updateCard.back : updateCard.front }}
                </p>
              </transition>
            </li>
          </ul>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { getDirection } from '../../../utils'
import firebase from 'firebase'
const db = firebase.firestore()
export default {
  components: {
    'v-select': vSelect
  },
  props: {
    willUpdateCard: {
      type: null
    }
  },
  data () {
    return {
      direction: getDirection().direction,
      selected: {
        label: this.willUpdateCard.category,
        value: this.willUpdateCard.category
      },
      updateCard: this.willUpdateCard,
      selectData: [
        { label: 'a1', value: 'a1' },
        { label: 'a2', value: 'a2' },
        { label: 'b1', value: 'b1' },
        { label: 'b2', value: 'b2' },
        { label: 'c1', value: 'c1' },
        { label: 'c2', value: 'c2' }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  /*   watch: {
    updateCard: function () {
      if (this.willUpdateCard) {
        this.willUpdateCard = this.updateCard
      }
    }
  }, */
  methods: {
    updateCardMethod () {
      console.log(this.selected.label)
      this.updateCard.category = this.selected.label
      db.collection('users')
        .doc(this.currentUser.uid)
        .collection('cards')
        .doc(this.updateCard.key)
        .update(this.updateCard)
        .then(this.$notify('success', 'Congratulations!', 'You Update a Card'))
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>
<style scoped>
@import '../../../assets/css/cardStyle/flipCardForModal.css';
#select {
  width: 98%;
}
</style>
