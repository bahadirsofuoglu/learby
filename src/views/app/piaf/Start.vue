<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <b-button
          v-if="showMode == true"
          size="lg"
          variant="outline-primary"
          class="top-left-button-container"
          @click="showModeChange"
          >Table</b-button
        >

        <b-button
          v-if="showMode == false"
          size="lg"
          variant="outline-warning"
          class="top-left-button-container"
          @click="showModeChange"
          >Cards</b-button
        >
        <b-button
          v-b-modal.modallg
          variant="outline-primary"
          size="lg"
          class="top-right-button-container"
          >Add Card</b-button
        >
        <b-modal id="modallg" size="lg" title="Add a New Card">
          <AddCardModal ref="addCardModal" />
          <template slot="modal-footer">
            <b-button variant="outline-secondary">Cancel</b-button>
            <b-button variant="warning" @click="addItem()" class="mr-1"
              >Submit</b-button
            >
          </template>
        </b-modal>
        <div class="separator mb-5 mt-4"></div>
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
                  <p v-bind:key="card.flipped" class="flipCard">
                    {{ card.flipped ? card.back : card.front }}
                    <span
                      v-on:click="cards.splice(index, 1)"
                      class="delete-card"
                      >X</span
                    >
                  </p>
                </transition>
              </li>
            </ul>
          </div>
        </b-card>
      </b-colxx>
    </b-row>

    <b-row v-if="showMode == false">
      <b-colxx xxs="12">
        <Edit :cards="cards" />
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from 'firebase'
import Edit from '../table/Edit.vue'
import AddCardModal from '../addCardModal/AddCardModal'
const db = firebase.firestore()

export default {
  components: {
    Edit,
    AddCardModal
  },

  data () {
    return {
      showMode: true,
      cards: []
    }
  },

  created () {
    this.get()
  },
  computed: {
    ...mapGetters(['currentUser', 'processing', 'loginError'])
  },
  methods: {
    addItem () {
      this.$refs.addCardModal.addItem()
    },
    toggleCard (card) {
      card.flipped = !card.flipped
    },
    addCard () {
      db.collection('users')
        .doc(this.currentUser.uid)
        .collection('cards')
        .add({
          front: 'aaaa',
          back: 'bbbb',
          category: 'A1',
          flipped: false
        })
    },
    showModeChange () {
      this.showMode = !this.showMode
    },
    get () {
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
              flipped: doc.data().flipped
            })
          })
        })
    }
  }
}
</script>
<style scoped>
@import '../../../assets/css/cardStyle/flipCard.css';
</style>
