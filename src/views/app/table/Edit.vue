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
            <b-button size="xs" variant="outline-warning" @click="edit(row)">
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
</template>
<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
export default {
  components: {
    vuetable: Vuetable
  },
  props: {
    cards: {
      type: []
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
  methods: {
    edit (row) {
      console.log('hello')
      console.log(row)

      const denemeCards = this.cards.filter(x => {
        return x.front !== row.front && x.back !== row.back
      })
      console.log(denemeCards)
    }
  }
}
</script>
