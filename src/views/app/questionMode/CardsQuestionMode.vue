<template>
  <div>
    <b-card :title="'Question Mode'" style="min-height: 700px">
      <br />
      <br />
      <br />
      <br />
      <b-row v-if="cardsLengthControl == false">
        <b-colxx xxs="1" md="5"></b-colxx>
        <b-colxx xxs="4" md="4">
          <div class="float-left">
            <transition name="flip">
              <p
                v-bind:key="randomCard.flipped"
                :class="randomCard.flipped ? 'backflipCard' : 'flipCard'"
              >
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
                  <b-button
                    variant="warning"
                    style="min-width: 50px"
                    class=" mt-3 float-left"
                    @click="answerQuestion(answer)"
                    >Check</b-button
                  >
                </label>
              </b-colxx>
              <b-colxx xxs="4" md="4"> </b-colxx>
            </b-row>
          </div>
        </b-colxx>
      </b-row>
      <b-row v-if="cardsLengthControl == true">
        <b-colxx xxs="3" md="5"></b-colxx>
        <b-colxx xxs="4" md="4"
          >flipCard
          <div class="float-left">
            <transition name="flip">
              <p
                v-bind:key="lastCard.flipped"
                :class="lastCard.flipped ? 'flipCard' : 'backflipCard'"
              >
                {{ lastCard.flipped ? lastCard.back : lastCard.front }}
              </p>
            </transition>
            <b-row>
              <b-colxx xxs="3" md="5">
                <b-button
                  variant="warning"
                  style="min-width: 50px"
                  class=" mt-3 float-left"
                  @click="toggleLastCard(lastCard)"
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
        front: 'Add card for trying',
        back: 'Denemek için kelime ekle!',
        flipped: false
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
    toggleLastCard (randomCard) {
      randomCard.flipped = !randomCard.flipped
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

      this.answer = null
    },
    async answerQuestion (answer) {
      if (this.randomCard.back === answer) {
        this.$notify('success', 'Congratulations!', 'Your Answer is true. ')

        this.cards = await this.cards.filter(x => x !== this.randomCard)

        await this.randomQuestion()
        this.answer = null
      } else {
        this.$notify('warning', 'Sorry', 'Your Answer is wrong. ')
        await this.toggleCard()
        setTimeout(async () => {
          await this.randomQuestion()
        }, 4000)
      }
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
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  -webkit-box-shadow: 9px 10px 22px -8px rgba(209, 193, 209, 0.5);
  -moz-box-shadow: 9px 10px 22px -8px rgba(209, 193, 209, 0.5);
  box-shadow: 9px 10px 22px -8px rgba(209, 193, 209, 0.5);
  will-change: transform;
}
.backflipCard {
  display: block;
  width: 200px;
  height: 205px;
  padding: 80px 50px;
  background-color: #e65f51;
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
</style>
