<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
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
              v-b-modal.modalAddCard
              variant="outline-primary"
              size="lg"
              class="top-left-button-container"
              >Add Card</b-button
            >
          </b-card>
          <div class=" mb-5 mt-4"></div>
        </b-collapse>

        <b-modal id="modalAddCard" size="lg" title="Add a New Card">
          <AddCardModal ref="addCardModal" :willUpdateCard="willUpdateCard" />
          <template slot="modal-footer">
            <b-button variant="warning" @click="addCard" class="mr-1"
              >Submit</b-button
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
                  <p v-bind:key="card.flipped" class="flipCard ml-5">
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
import AddCardModal from '../editCardModals/AddCardModal'
const db = firebase.firestore()

export default {
  components: {
    Edit,
    AddCardModal
  },

  data () {
    return {
      showMode: true,
      cards: [],
      willUpdateCard: null
    }
  },

  created () {
    this.get()
  },
  computed: {
    ...mapGetters(['currentUser', 'processing', 'loginError'])
  },
  methods: {
    addCard () {
      this.$refs.addCardModal.addCard()
      this.$refs['modalAddCard'].hide()
    },

    toggleCard (card) {
      card.flipped = !card.flipped
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
