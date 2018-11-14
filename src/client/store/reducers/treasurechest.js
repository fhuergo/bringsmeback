import db from "../../../firestore"

const GET_TREASURE_CHEST = "GET_TREASURE_CHEST"
const ADD_ITEM_TO_TREASURE_CHEST = "ADD_ITEM_TO_TREASURE_CHEST"
const DELETE_TREASURE = "DELETE_TREASURE"
const ADD_NEW_TREASURE = "ADD_NEW_TREASURE"
const EDIT_TREASURE = "EDIT_TREASURE"

const getTreasureChest = treasureChest => ({
  type: GET_TREASURE_CHEST,
  treasureChest
})

const addToTreasureChest = item => ({
  type: ADD_ITEM_TO_TREASURE_CHEST,
  item
})

const deleteTreasure = id => ({
  type: DELETE_TREASURE,
  id
})

const newTreasure = treasure => ({
  type: ADD_NEW_TREASURE,
  treasure
})

const editTreasure = editedTreasure => ({
  type: EDIT_TREASURE,
  editedTreasure
})

export const fetchTreasureChest = userId => async dispatch => {
  try {
    const userData = await db
      .collection("users")
      .doc(userId)
      .get()
    const treasureChest = await userData.data().treasureChest
    dispatch(getTreasureChest(treasureChest))
  } catch (err) {
    console.error(err)
  }
}

export const addItemToTreasureChest = (item, from) => async dispatch => {
  // hold up. people will want a treasure chest of stuff they actually wanted. not other people's stuff. maybe both? that can be a separate list with a link, and the link would be the number of points. not a lot of people are gonna purely find people's stuff for fun and if they do they want the points not the names of the thing with the links.
  try {
    const userData = await db
      .collection("users")
      .doc(from) // from user? no... should be the 'to' user!
      .get()
    let treasureChest = await userData.data().treasureChest
    if (!treasureChest) treasureChest = []
    treasureChest.push(item)
    await db
      .collection("users")
      .doc(from) // from user? no... should be the 'to' user!
      .set({ treasureChest: treasureChest }) // may be invalid to do ({ treasureChest }) as happened before
    const fromUserData = await db
      .collection("users")
      .doc(from) // correct. please don't remove this comment until those above are taken care of
      .get()
    let points = fromUserData.data().points
    points++
    await db
      .collection("users")
      .doc(from)
      .set({ points: points })
    dispatch(addToTreasureChest(item))
    // remove item from inbox
  } catch (err) {
    console.error(err)
  }
}

// export const removeFromWishlist = (userId, wishId) => async dispatch => {
//   try {
//     await axios.delete(`/api/wishlist/${userId}/${wishId}`)
//     dispatch(deleteWish(wishId))
//   } catch (err) {
//     console.error(err)
//   }
// }

// export const addNewWish = (userId, wish) => async dispatch => {
//   try {
//     const response = await axios.post(`/api/wishlist/${userId}/`, wish)
//     const aNewWish = response.data
//     dispatch(newWish(aNewWish))
//   } catch (err) {
//     console.error(err)
//   }
// }

// export const modifyWish = (userId, wish) => async dispatch => {
//   try {
//     const response = await axios.put(`/api/wishlist/${userId}/${wish.id}`, wish)
//     const editedWish = response.data
//     dispatch(editWish(editedWish))
//   } catch (err) {
//     console.error(err)
//   }
// }

const initialState = []

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TREASURE_CHEST:
      return action.treasureChest
    case ADD_ITEM_TO_TREASURE_CHEST:
      return state.concat(action.item)
    default:
      return state
  }
}
