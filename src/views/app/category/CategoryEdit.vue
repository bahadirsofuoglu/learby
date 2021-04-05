<template>
  <b-row>
    <b-colxx xxs="12">
      <b-button
        v-b-modal.modalAddCategory
        variant="outline-warning"
        size="lg"
        class="top-left-button-container ml-3 mt-3"
        >Add Category</b-button
      >

      <div class=" mb-5 mt-4"></div>
    </b-colxx>

    <b-colxx xxs="12">
      <b-card>
        <vuetable
          table-height="360px"
          ref="vuetable"
          :api-mode="false"
          class="order-with-arrow"
          :fields="fields"
          :data="categories"
          pagination-path
        >
          <template slot="actions" slot-scope="row">
            <b-row>
              <b-colxx>
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
    </b-colxx>
    <b-modal
      id="modalAddCategory"
      ref="modalAddCategory"
      size="lg"
      title="Add New Category"
    >
      <AddCategoryModal ref="addCategoryModal" />
      <template slot="modal-footer">
        <b-button variant="warning" @click="addCategory" class="mr-1"
          >Submit</b-button
        >
        <b-button variant="primary" @click="hideCategoryModel" class="mr-1"
          >Cancel</b-button
        >
      </template>
    </b-modal>
  </b-row>
</template>
<script>
import { mapGetters } from 'vuex'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import AddCategoryModal from './AddCategoryModal'
import firebase from 'firebase'
const db = firebase.firestore()
export default {
  components: {
    vuetable: Vuetable,
    AddCategoryModal
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
          name: 'name',
          title: 'category',
          titleClass: 'name',
          dataClass: 'list-item-heading',
          width: '80%'
        },

        {
          name: '__slot:actions',
          title: 'Actions',
          titleClass: '',
          dataClass: 'list-item-actions',
          width: '20%'
        }
      ],
      categories: []
    }
  },
  async created () {
    await this.getCategories()
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    async addCategory () {
      this.$refs.addCategoryModal.addCategory()
      await this.getCategories
    },
    async hideCategoryModel () {
      this.$refs.modalAddCategory.hide()
      await this.getCategories()
    },
    async onDelete (row) {
      db.collection('users')
        .doc(this.currentUser.uid)
        .collection('categories')
        .doc(row.rowData.key)
        .delete()
        .then(this.$notify('warning', 'Hey!!', 'You Deleted a Category'))
        .catch(error => {
          console.error(error)
        })

      await this.getCategories()
    },
    getCategories () {
      db.collection('users')
        .doc(this.currentUser.uid)
        .collection('categories')
        .onSnapshot(snapshotChange => {
          this.categories = []
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
