import firebase from 'firebase'
import store from '@/store'
const currentUserUid = store.getters.currentUser.uid
const db = firebase
  .firestore()
  .collection('users')
  .doc(currentUserUid)

export const getCards = async () => {
  const response = []

  await db.collection('cards').onSnapshot(snapshotChange => {
    snapshotChange.forEach(doc => {
      response.push({
        key: doc.id,
        front: doc.data().front,
        back: doc.data().back,
        category: doc.data().category,
        form: doc.data().form,
        flipped: doc.data().flipped
      })
    })
  })
  return response
}

export const getFilteredCards = async selectedCategory => {
  const response = []
  db.collection('cards')
    .where('category', '==', selectedCategory)
    .onSnapshot(snapshotChange => {
      snapshotChange.forEach(doc => {
        response.push({
          key: doc.id,
          front: doc.data().front,
          back: doc.data().back,
          category: doc.data().category,
          form: doc.data().form,
          flipped: doc.data().flipped
        })
      })
    })
  return response
}

export const addNewCard = async newCard => {
  db.collection('cards').add(newCard)
}
export const deleteCard = async keyData => {
  db.collection('cards')
    .doc(keyData)
    .delete()
}
export const getCategories = async () => {
  const response = []
  response.push({ name: 'all' })
  db.collection('categories').onSnapshot(snapshotChange => {
    snapshotChange.forEach(doc => {
      response.push({
        key: doc.id,
        name: doc.data().name
      })
    })
  })
  return response
}
