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

      updateCard: this.willUpdateCard
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    updateCardMethod () {
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
  width: 150px;
  height: 175px;
  padding: 80px 50px;
  background-color: #a17de9;
  border-radius: 7px;
  margin: 5px;
  text-align: center;
  line-height: 27px;
  cursor: pointer;
  position: relative;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  -webkit-box-shadow: 9px 10px 22px -8px rgba(209, 193, 209, 0.5);
  -moz-box-shadow: 9px 10px 22px -8px rgba(209, 193, 209, 0.5);
  box-shadow: 9px 10px 22px -8px rgba(209, 193, 209, 0.5);
  will-change: transform;
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

.delete-card {
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px 15px;
  opacity: 0.4;
  transition: all 0.5s ease;
}

.delete-card:hover,
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

/* Form */

label {
  font-weight: 400;
  color: #333;
  margin-right: 10px;
}
#select {
  width: 98%;
}
</style>
