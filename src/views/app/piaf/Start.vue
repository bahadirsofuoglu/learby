<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <h1 v-if="showMode == true">Card Mode</h1>
        <h1 v-if="showMode == false">Table Mode</h1>

        <b-button
          v-if="showMode == true"
          size="lg"
          variant="outline-primary"
          class="top-right-button-container"
          @click="showModeChange"
          >Table</b-button
        >

        <b-button
          v-if="showMode == false"
          size="lg"
          variant="outline-warning"
          class="top-right-button-container"
          @click="showModeChange"
          >Cards</b-button
        >
        <b-button v-b-modal.modallg variant="outline-primary" class="mr-2 mb-2"
          >Add Card</b-button
        >
        <b-modal id="modallg" size="lg" title="Large Modal">
          Hello Modal!
          <template slot="modal-footer">
            <b-button
              variant="outline-secondary"
              @click="hideModal('v-b-modal.modallg')"
              >Cancel</b-button
            >
            <b-button variant="primary" @click="addItem()" class="mr-1"
              >Submit</b-button
            >
          </template>
        </b-modal>
        <div class="separator mb-5"></div>
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
        <b-card>
          <vuetable
            table-height="360px"
            ref="vuetable"
            :api-mode="false"
            class="order-with-arrow"
            :fields="fields"
            :data="cards"
            pagination-path
          >
            <template slot="actions">
              <b-row>
                <b-colxx>
                  <b-button size="xs" variant="outline-warning">
                    <i class="simple-icon-pencil"
                  /></b-button>
                  <b-button size="xs" variant="outline-warning">
                    <i class="simple-icon-trash"
                  /></b-button>
                </b-colxx>
              </b-row>
            </template>
          </vuetable>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'

import { mapGetters, mapActions } from 'vuex'
import firebase from 'firebase'
const db = firebase.firestore()

export default {
  components: {
    vuetable: Vuetable
  },
  data () {
    return {
      cards: [],
      showMode: true,
      fields: [
        {
          name: 'back',
          sortField: 'back',
          title: 'English',
          titleClass: 'back',
          dataClass: 'list-item-heading',
          width: '30%'
        },
        {
          name: 'front',
          sortField: 'front',
          title: 'Turkish',
          titleClass: '',
          dataClass: 'list-item-heading',
          width: '30%'
        },
        {
          name: 'stock',
          sortField: 'stock',
          title: 'Category',
          titleClass: '',
          dataClass: 'list-item-heading',
          width: '20%'
        },
        {
          name: '__slot:actions',
          title: 'Actions',
          titleClass: '',
          dataClass: 'list-item-heading',
          width: '20%'
        }
      ]
    }
  },

  created () {
    db.collection('users')
      .doc(this.currentUser.uid)
      .collection('cards')
      .onSnapshot(snapshotChange => {
        this.cards = []
        snapshotChange.forEach(doc => {
          this.cards.push({
            front: doc.data().front,
            back: doc.data().back,
            flipped: doc.data().flipped
          })
        })
      })
    console.log(this.currentUser)
  },
  computed: {
    ...mapGetters(['currentUser', 'processing', 'loginError'])
  },
  methods: {
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
    }
  }
}
</script>
<style scoped>
body {
  font-family: 'Montserrat', sans-serif;
  text-align: center;
}

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

.container {
  max-width: 100%;
  padding: 2em;
}

.flipCard {
  display: block;
  width: 150px;
  height: 175px;
  padding: 80px 50px;
  background-color: #51aae5;
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
.flashcard-form {
  position: relative;
}

label {
  font-weight: 400;
  color: #333;
  margin-right: 10px;
}

input {
  border-radius: 5px;
  border: 2px solid #eaeaea;
  padding: 10px;
  outline: none;
}

.error {
  margin-top: 10px;
  display: block;
  color: #e44e42;
  font-weight: 600;
}
</style>
