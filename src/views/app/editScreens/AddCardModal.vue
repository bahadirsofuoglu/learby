<template>
  <div>
    <b-row>
      <b-col md="8" sm="12">
        <b-card>
          <b-form>
            <label class="form-group has-float-label">
              <v-select :options="answers" />
              <span>Select Category</span>
            </label>
            <label class="form-group has-float-label">
              <v-select :options="forms" />
              <span>Select Forms</span>
            </label>
            <label class="form-group has-float-label mt-2">
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
                <div class="modalFlipCard">
                  <span class="form-card">Verb</span>
                  <p :key="newCard.flipped" class="text-card">
                    {{ newCard.flipped ? newCard.back : newCard.front }}
                  </p>
                </div>
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
import firebase from 'firebase'

const db = firebase.firestore()
export default {
  components: {
    'v-select': vSelect
  },
  data () {
    return {
      newCard: {
        front: null,
        back: null,

        flipped: false
      },
      answers: [
        { label: 'Single Select', value: 1, options: true },
        { label: 'Single asdf', value: 2, options: true }
      ],
      forms: [{ label: 'Verb', value: 1, options: true }]
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    addCard () {
      db.collection('users')
        .doc(this.currentUser.uid)
        .collection('cards')
        .add(this.newCard)
        .then(
          this.$notify('success', 'Congratulations!', 'You Added a New Card')
        )
        .catch(error => {
          console.error(error)
        })
      this.newCard.front = null
      this.newCard.back = null

      this.newCard.flipped = false
    }
  }
}
</script>
<style scoped>
ul {
  padding-left: 0;
  display: flex;
  flex-flow: row wrap;
}

li {
  list-style-type: none;
  padding: 10px 10px;
  transition: all 0.3s ease;
}

.modalFlipCard {
  display: block;
  position: relative;
  width: 150px;
  height: 175px;
  padding: 80px 50px;
  background-color: #a17de9;
  border-radius: 7px;
  margin: 5px;
  text-align: center;
  line-height: 27px;
  cursor: pointer;
  color: #fff;
  -webkit-box-shadow: 9px 10px 22px -8px rgba(209, 193, 209, 0.5);
  -moz-box-shadow: 9px 10px 22px -8px rgba(209, 193, 209, 0.5);
  box-shadow: 9px 10px 22px -8px rgba(209, 193, 209, 0.5);
  will-change: transform;
}
.text-card {
  text-align: center;
  font-weight: 600;
  font-size: 15px;
}
li:hover {
  transform: scale(1.1);
}

li:nth-child(-n + 3) .flipCard {
  background-color: #e65f51;
}

li:nth-child(2n + 1) .flipCard {
  background-color: #a17de9;
}

li:nth-child(4n) .flipCard {
  background-color: #feca34;
}

li:nth-child(5n-2) .flipCard {
  background-color: #51aae5;
}

li:nth-child(4n + 4) .flipCard {
  background-color: #feca34;
}

li:nth-child(-7n + 7) .flipCard {
  background-color: #e46055;
}

.form-card {
  position: absolute;
  left: 0;
  top: 0;
  padding: 10px 15px;
  opacity: 0.8;
  transition: all 0.5s ease;
}

.form-card:hover,
.error {
  opacity: 1;
  transform: rotate(360deg);
}

.flip-enter-active {
  transition: all 0.4s ease;
}

.flip-leave-active {
  display: none;
}

.flip-enter,
.flip-leave {
  transform: rotateY(180deg);
  opacity: 0;
}

.vs--searchable .vs__dropdown-toggle {
  width: 98%;
}
</style>
