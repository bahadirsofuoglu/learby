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
                v-model="newCard.front"
              />
              <span>Front</span>
            </label>
            <label class="form-group has-float-label">
              <input type="text" class="form-control" v-model="newCard.back" />
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
                  newCard.flipped = !newCard.flipped
                }
              "
            >
              <transition name="flip">
                <p :key="newCard.flipped" class="flipCard">
                  {{ newCard.flipped ? newCard.back : newCard.front }}
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
  data () {
    return {
      direction: getDirection().direction,
      selected: null,
      selectData: [
        { label: 'a1' },
        { label: 'a2' },
        { label: 'b1' },
        { label: 'b2' },
        { label: 'c1' },
        { label: 'c2' }
      ],
      newCard: {
        flipped: false
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    addItem () {
      console.log(this.selected.label)
      this.newCard.category = this.selected.label
      db.collection('users')
        .doc(this.currentUser.uid)
        .collection('cards')
        .add(this.newCard)
        .then(console.log('sended to db'))
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
