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
      </b-colxx>
      <b-colxx xxs="12">
        <b-card :title="'Question Mode'" style="min-height: 700px">
          <b-row class="d-flex justify-content-center">
            <div style=" margin-top:100px">
              <transition name="flip">
                <p
                  v-if="randomCard"
                  v-bind:key="randomCard.flipped"
                  :class="randomCard.flipped ? 'backflipCard' : 'flipCard'"
                >
                  {{ randomCard.flipped ? answer : question }}
                </p>
              </transition>

              <label
                class="form-group has-float-label"
                style="min-width: 200px; margin-top:50px"
              >
                <input
                  type="text"
                  class="form-control"
                  required
                  v-model="userAnswer"
                  @keyup.enter="answerQuestion(userAnswer)"
                />
                <span>Answer</span>
                <b-button
                  variant="warning"
                  style="min-width: 50px"
                  class=" mt-3 float-left"
                  @click="answerQuestion(userAnswer)"
                  >Check</b-button
                >
              </label>
            </div>
          </b-row>
          <!--       <b-row v-if="cardsLengthControl">
            <b-colxx xxs="3" md="5"></b-colxx>
            <b-colxx xxs="4" md="4">
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
                      @click="toggleLastCard"
                      >Flip
                    </b-button>
                  </b-colxx>
                  <b-colxx xxs="4" md="4"> </b-colxx>
                </b-row>
              </div>
            </b-colxx>
          </b-row> -->
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import {
  getCategories,
  getCards,
  getFilteredCards
} from '@/data/dbControllers.js'

export default {
  components: {
    vSelect
  },

  data () {
    return {
      showMode: true,
      cards: [],
      randomCard: {},
      question: '',
      answer: '',
      userAnswer: '',
      lastCard: {
        front: 'You should add new cards',
        back: 'Denemek için kelimeler ekle!',
        flipped: false
      },
      categories: [],
      selectedCategory: 'all'
    }
  },
  async mounted () {
    this.categories = await getCategories()
  },
  watch: {
    'selectedCategory.name': async function (value) {
      value === 'all'
        ? (this.cards = await getCards())
        : (this.cards = await getFilteredCards(value))

      await this.randomQuestion()
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    toggleCard () {
      this.randomCard.flipped = !this.randomCard.flipped
      setTimeout(() => {
        this.randomCard.flipped = !this.randomCard.flipped
      }, 3000)
    },
    toggleLastCard () {
      this.lastCard.flipped = !this.lastCard.flipped
    },
    async randomQuestion () {
      if (this.cards.length > 0) {
        this.randomCard = this.cards[
          Math.floor(Math.random() * this.cards.length)
        ]

        let random = Math.floor(Math.random() * 2)
        if (random === 0) {
          this.question = this.randomCard.back
          this.answer = this.randomCard.front
        } else {
          this.question = this.randomCard.front
          this.answer = this.randomCard.back
        }
      } else {
        this.$notify('success', 'Congratulations!', 'You learned all cards')
      }
    },
    async answerQuestion (userAnswer) {
      if (this.answer === userAnswer) {
        this.$notify('success', 'Congratulations!', 'Your Answer is true. ')

        this.cards = await this.cards.filter(x => x !== this.randomCard)

        await this.randomQuestion()
      } else {
        this.$notify('warning', 'Sorry', 'Your Answer is wrong. ')
        await this.toggleCard()
        setTimeout(async () => {
          await this.randomQuestion()
        }, 4000)
      }
      this.userAnswer = ''
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
.v-select {
  width: 250px;
}
/* Form */

label {
  font-weight: 400;
  color: #333;
  margin-right: 10px;
}
</style>
