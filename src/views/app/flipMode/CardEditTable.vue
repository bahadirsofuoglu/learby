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
            <b-button
              v-b-modal.forEdit
              size="xs"
              variant="outline-warning ml-2"
              @click="onEdit(row)"
            >
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
    <b-modal id="forEdit" size="lg" title="Update Card">
      <UpdateCardModal ref="updateCardModal" :updateCard="updateCard" />
      <template slot="modal-footer">
        <b-button variant="warning" @click="onClickUpdateCard" class="mr-1"
          >Update</b-button
        >
      </template>
    </b-modal>
  </b-card>
</template>
<script>
import UpdateCardModal from './UpdateCardModal'
import Vuetable from 'vuetable-2/src/components/Vuetable'

export default {
  components: {
    vuetable: Vuetable,
    UpdateCardModal
  },
  props: {
    cards: {
      type: Array
    }
  },
  data () {
    return {
      fields: [
        {
          name: 'front',
          title: 'Front',
          titleClass: 'back',
          dataClass: 'list-item-heading',
          width: '25%'
        },
        {
          name: 'back',
          title: 'Back',
          titleClass: '',
          dataClass: 'list-item-heading',
          width: '25%'
        },
        {
          name: 'category',
          title: 'Category',
          titleClass: '',
          dataClass: 'list-item-heading',
          width: '20%'
        },
        {
          name: 'form',
          title: 'Form',
          titleClass: '',
          dataClass: 'list-item-heading',
          width: '20%'
        },
        {
          name: '__slot:actions',
          title: 'Actions',
          titleClass: '',
          dataClass: 'list-item-actions',
          width: '20%'
        }
      ],
      updateCard: {}
    }
  },
  methods: {
    onDelete (row) {
      const keyData = row.rowData.key
      this.$emit('onDelete', keyData)
    },
    onClickUpdateCard () {
      this.$refs.updateCardModal.updateCardMethod()
    },
    onEdit (row) {
      this.updateCard = row.rowData
    }
  }
}
</script>
