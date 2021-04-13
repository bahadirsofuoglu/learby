import firebase from 'firebase'
import store from '@/store'
const currentUserUid = store.getters.currentUser.uid
const db = firebase
  .firestore()
  .collection('users')
  .doc(currentUserUid)

export const getCards = async () => {
  const response = []

  const cardsRef = await db.collection('cards').get()

  cardsRef.forEach(doc => {
    response.push({
      key: doc.id,
      front: doc.data().front,
      back: doc.data().back,
      category: doc.data().category,
      form: doc.data().form,
      flipped: doc.data().flipped
    })
  })

  return response
}

export const getFilteredCards = async selectedCategory => {
  const response = []
  const cardRef = await db
    .collection('cards')
    .where('category', '==', selectedCategory)
    .get()

  cardRef.forEach(doc => {
    response.push({
      key: doc.id,
      front: doc.data().front,
      back: doc.data().back,
      category: doc.data().category,
      form: doc.data().form,
      flipped: doc.data().flipped
    })
  })

  return response
}

export const addNewCard = async newCard => {
  await db.collection('cards').add(newCard)
}
export const updateCard = async updateCard => {
  await db
    .collection('cards')
    .doc(updateCard.key)
    .update(updateCard)
}
export const deleteCard = async keyData => {
  await db
    .collection('cards')
    .doc(keyData)
    .delete()
}
export const getCategories = async () => {
  const response = []
  response.push({ name: 'all' })
  const catRef = await db.collection('categories').get()

  catRef.forEach(doc => {
    response.push({
      key: doc.id,
      name: doc.data().name
    })
  })

  return response
}
