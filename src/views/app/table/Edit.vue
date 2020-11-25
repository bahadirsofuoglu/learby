<template>
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
      <template slot="actions" slot-scope="row">
        <b-row>
          <b-colxx>
            <b-button size="xs" variant="outline-warning" @click="onEdit(row)">
              <i class="simple-icon-pencil"
            /></b-button>
            <b-button
              size="xs"
              variant="outline-warning"
              @click="onDelete(row)"
            >
              <i class="simple-icon-trash"
            /></b-button>
          </b-colxx>
        </b-row>
      </template>
    </vuetable>
  </b-card>
</template>
<script>
import { mapGetters } from 'vuex'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import firebase from 'firebase'
const db = firebase.firestore()
export default {
  components: {
    vuetable: Vuetable
  },
  props: {
    cards: {
      type: null
    }
  },
  data () {
    return {
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
          name: 'category',
          sortField: 'category',
          title: 'category',
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
  created () {},
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    onDelete (row) {
      console.log('hello')
      console.log(row)
      console.log(this.currentUser.uid)
      db.collection('users')
        .doc(this.currentUser.uid)
        .collection('cards')
        .doc(row.rowData.key)
        .delete()
        .catch(error => {
          console.error(error)
        })
    },
    onEdit (row) {
      console.log(row)
    }
  }
}
</script>
