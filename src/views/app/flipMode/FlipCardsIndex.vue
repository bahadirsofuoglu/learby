<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <label class="form-group has-float-label ">
          <v-select
            label="name"
            :options="categories"
            v-model="selectedCategory"
          />
          <span>Select Category</span>
        </label>

        <b-button
          v-b-toggle.collapse1
          variant="outline-secondary"
          size="lg"
          class="mb-5"
          >Edit Menu</b-button
        >

        <b-collapse id="collapse1">
          <b-card>
            <b-button
              v-if="showMode == true"
              size="lg"
              variant="outline-success"
              class="top-left-button-container ml-3 mt-3"
              @click="showModeChange"
              >Table</b-button
            >

            <b-button
              v-if="showMode == false"
              size="lg"
              variant="outline-warning"
              class="top-left-button-container ml-3 mt-3"
              @click="showModeChange"
              >Cards</b-button
            >
            <b-button
              v-b-modal.modalAddCard
              variant="outline-primary"
              size="lg"
              class="top-left-button-container ml-3 mt-3"
              >Add Card</b-button
            >
          </b-card>
          <div class=" mb-5 mt-4"></div>
        </b-collapse>

        <b-modal
          id="modalAddCard"
          ref="modalAddCard"
          size="lg"
          title="Add a New Card"
        >
          <AddCardModal ref="addCardModal" />
          <template slot="modal-footer">
            <b-button variant="warning" @click="addCard" class="mr-1"
              >Submit</b-button
            >
            <b-button
              variant="primary"
              @click="() => this.$refs.modalAddCard.hide()"
              class="mr-1"
              >Cancel</b-button
            >
          </template>
        </b-modal>
      </b-colxx>
    </b-row>
    <b-row v-if="showMode == true">
      <b-colxx xxs="12">
        <b-card class="mb-12" :title="'All Cards'">
          <div>
            <ul class="flashcard-list">
              <li
                v-on:click="toggleCard(card)"
                v-for="(card, index) in cards"
                :key="card.front"
              >
                <transition name="flip">
                  <div class="flipCard ml-5">
                    <p v-bind:key="card.flipped" class="text-card">
                      <span class="form-card">{{ card.form }}</span>
                      {{ card.flipped ? card.back : card.front }}
                      <span
                        v-on:click="cards.splice(index, 1)"
                        class="delete-card"
                        >X</span
                      >
                    </p>
                  </div>
                </transition>
              </li>
            </ul>
          </div>
        </b-card>
      </b-colxx>
    </b-row>

    <b-row v-if="showMode == false">
      <b-colxx xxs="12">
        <CardEditTable :cards="cards" />
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
import CardEditTable from './CardEditTable.vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import AddCardModal from './AddCardModal'

const db = firebase.firestore()

export default {
  components: {
    CardEditTable,
    AddCardModal,
    vSelect
  },

  data () {
    return {
      showMode: true,
      cards: [],
      categories: [{ name: 'all' }],
      selectedCategory: null
    }
  },

  async mounted () {
    await this.getCards()
    await this.getCategories()
  },
  computed: {
    ...mapGetters(['currentUser', 'processing', 'loginError'])
  },
  watch: {
    'selectedCategory.name': async function (value) {
      value === 'all'
        ? await this.getCards()
        : await this.getFilteredCards(value)
    }
  },
  methods: {
    addCard () {
      this.$refs.addCardModal.addCard()
    },

    toggleCard (card) {
      card.flipped = !card.flipped
    },

    showModeChange () {
      this.showMode = !this.showMode
    },
    getCards () {
      db.collection('users')
        .doc(this.currentUser.uid)
        .collection('cards')
        .onSnapshot(snapshotChange => {
          this.cards = []
          snapshotChange.forEach(doc => {
            this.cards.push({
              key: doc.id,
              front: doc.data().front,
              back: doc.data().back,
              category: doc.data().category,
              form: doc.data().form,
              flipped: doc.data().flipped
            })
          })
        })
    },
    getFilteredCards (param) {
      db.collection('users')
        .doc(this.currentUser.uid)
        .collection('cards')
        .where('category', '==', param)
        .onSnapshot(snapshotChange => {
          this.cards = []
          snapshotChange.forEach(doc => {
            this.cards.push({
              key: doc.id,
              front: doc.data().front,
              back: doc.data().back,
              category: doc.data().category,
              form: doc.data().form,
              flipped: doc.data().flipped
            })
          })
        })
    },
    getCategories () {
      this.categories = []
      this.categories.push({ name: 'all' })
      db.collection('users')
        .doc(this.currentUser.uid)
        .collection('categories')
        .onSnapshot(snapshotChange => {
          snapshotChange.forEach(doc => {
            this.categories.push({
              key: doc.id,
              name: doc.data().name
            })
          })
        })
    }
  }
}
</script>
<style>
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

.flipCard {
  display: block;
  width: 200px;
  height: 205px;
  padding: 80px 50px;
  background-color: #a17de9;
  border-radius: 7px;
  margin: 5px;
  text-align: center;
  line-height: 27px;
  cursor: pointer;
  position: relative;
  -webkit-box-shadow: 9px 10px 22px -8px rgba(209, 193, 209, 0.5);
  -moz-box-shadow: 9px 10px 22px -8px rgba(209, 193, 209, 0.5);
  box-shadow: 9px 10px 22px -8px rgba(209, 193, 209, 0.5);
  will-change: transform;
}
.text-card {
  display: block;
  color: #fff;
  text-align: inherit;
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
.form-card {
  position: absolute;
  left: 0;
  top: 0;
  padding: 10px 15px;
  opacity: 0.8;
  transition: all 0.5s ease;
}

.form-card:hover,
/* Form */

label {
  font-weight: 400;
  color: #333;
  margin-right: 10px;
}

.v-select {
  width: 250px;
}
</style>
