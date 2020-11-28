<template>
  <div>
    <b-card :title="'Question Mode'" style="min-height: 700px">
      <br />
      <br />
      <br />
      <br />
      <b-row v-if="cardsLengthControl == false">
        <b-colxx xxs="3" md="5"></b-colxx>
        <b-colxx xxs="4" md="4">
          <div class="float-left">
            <transition name="flip">
              <p v-bind:key="randomCard.flipped" class="flipCard">
                {{ randomCard.flipped ? randomCard.back : randomCard.front }}
              </p>
            </transition>
            <b-row>
              <b-colxx xxs="3" md="5">
                <label
                  class="form-group has-float-label ml-2 mt-5 "
                  style="min-width: 200px"
                >
                  <input
                    type="text"
                    class="form-control"
                    required
                    v-model="answer"
                    @keyup.enter="answerQuestion(answer)"
                  />
                  <span>Answer</span>
                  <!--  <b-button
                    variant="warning"
                    style="min-width: 50px"
                    class=" mt-3 float-left"
                    @click="answerQuestion(answer)"
                    >Check</b-button
                  > -->
                </label>
              </b-colxx>
              <b-colxx xxs="4" md="4"> </b-colxx>
            </b-row>
          </div>
        </b-colxx>
      </b-row>
      <b-row v-if="cardsLengthControl == true">
        <b-colxx xxs="3" md="5"></b-colxx>
        <b-colxx xxs="4" md="4">
          <div class="float-left">
            <transition name="flip">
              <p v-bind:key="randomCard.flipped" class="flipCard">
                {{ randomCard.flipped ? randomCard.back : randomCard.front }}
              </p>
            </transition>
            <b-row>
              <b-colxx xxs="3" md="5">
                <b-button
                  variant="warning"
                  style="min-width: 50px"
                  class=" mt-3 float-left"
                  @click="toggleCard()"
                  >Congrats
                </b-button>
              </b-colxx>
              <b-colxx xxs="4" md="4"> </b-colxx>
            </b-row>
          </div>
        </b-colxx>
      </b-row>
    </b-card>
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
      randomCard: null,
      answer: null,
      cardsLengthControl: false,
      lastCard: {
        front: 'congrats you learned all cards',
        back: 'Tebrikle Tüm kartları öğrendin',
        flipped: false,
        category: 'a1'
      }
    }
  },

  created () {
    this.getAllCards()
  },
  computed: {
    ...mapGetters(['currentUser', 'processing', 'loginError'])
  },
  watch: {
    cards: function () {
      if (this.cards.length === 0) {
        this.cardsLengthControl = true
        this.randomCard = this.lastCard
      }
    }
  },

  methods: {
    toggleCard () {
      this.randomCard.flipped = !this.randomCard.flipped
      setTimeout(() => {
        this.randomCard.flipped = !this.randomCard.flipped
      }, 3000)
    },

    getAllCards () {
      db.collection('users')
        .doc(this.currentUser.uid)
        .collection('cards')
        .onSnapshot(snapshotChange => {
          this.cards = []
          snapshotChange.forEach(doc => {
            this.cards.push({
              front: doc.data().front,
              back: doc.data().back,
              category: doc.data().category,
              flipped: doc.data().flipped
            })
          })
          this.randomQuestion()
        })
    },
    async randomQuestion () {
      this.randomCard = await this.cards[
        Math.floor(Math.random() * this.cards.length)
      ]
      console.log(this.randomCard.flipped)
      this.answer = null

      console.log(this.cards)
    },
    async answerQuestion (answer) {
      if (this.randomCard.back === answer) {
        this.$notify(
          'success',
          'Congratulations!',
          'Your Answer is true. This cards status is Learned!'
        )

        this.cards = await this.cards.filter(x => x !== this.randomCard)
        console.log(this.cards)
        await this.randomQuestion()
        this.answer = null
      } else {
        await this.toggleCard()
        setTimeout(async () => {
          await this.randomQuestion()
        }, 4000)

        console.log(this.cards)
      }
    }
  }
}
</script>
<style scoped>
@import '../../../assets/css/cardStyle/flipCard.css';
</style>
