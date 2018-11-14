import db from "../../../firestore"

const GET_WISHLIST = "GET_WISHLIST"
const ADD_NEW_WISH = "ADD_NEW_WISH"
const SAVE_WISHLIST = "SAVE_WISHLIST"

const getWishlist = wishlist => ({
  type: GET_WISHLIST,
  wishlist
})

const newWish = objWithWishAndUserId => ({
  type: ADD_NEW_WISH,
  objWithWishAndUserId
})

const saveWishes = wishes => ({
  type: SAVE_WISHLIST,
  wishes
})

export const fetchWishlist = userId => async dispatch => {
  try {
    const response = await db
      .collection("users")
      .doc(userId)
      .get()
    const wishlist = await response.data().wishlist
    dispatch(getWishlist(wishlist))
  } catch (err) {
    console.error(err)
  }
}

export const addNewWish = (wish, userId) => dispatch => {
  const obj = {
    wish,
    userId
  }
  dispatch(newWish(obj))
}

export const saveWishlist = (
  userId,
  wishlistWithItemsPossiblyAdded,
  wishesToDelete,
  wishIDsToDelete
) => async dispatch => {
  try {
    // make user's new wishlist to upload
    let wishlistToModify = wishlistWithItemsPossiblyAdded
    const anyWishesToDelete = wishIDsToDelete.length
    if (anyWishesToDelete) {
      for (let i = 0; i < wishlistToModify.length; i++) {
        let wish = wishlistToModify[i]
        console.log("wishIDsToDelete are", wishIDsToDelete)
        console.log("wish.id is", wish.id)
        if (wishIDsToDelete.includes(wish.id)) {
          console.log(
            `reached 'if (wishIDsToDelete.includes(wish.id))' with this wish: ${wish}`
          )
          wishlistToModify.splice(wishlistToModify.indexOf(wish), 1)
        }
      }
    }

    // update user's wishlist on database
    let modifiedWishlist = wishlistToModify
    await db
      .collection("users")
      .doc(userId)
      .set({
        wishlist: modifiedWishlist
      })

    // update user's wishlist on state
    dispatch(saveWishes(modifiedWishlist))
    // (Does not go on the bottom!!!! modifiedWishlist will be mutated to update allWishes.)

    // and now we deal with allWishes

    // download allWishes
    let wishesArr = []
    await db
      .collection("allWishes")
      .get()
      .then(snapshot => {
        snapshot.forEach(async doc => {
          let wish = await doc.data()
          console.log("wish is", wish)
          wishesArr.push(wish)
        })
      })
      .catch(err => {
        console.log("Error getting documents", err)
      })

    console.log("wishesArr after download from db is", wishesArr)

    // in downloaded array, delete wishes to delete
    for (let i = 0; i < wishesToDelete.length; i++) {
      let aWishToDelete = wishesToDelete[i]
      if (wishesArr.includes(aWishToDelete)) {
        wishesArr.splice(wishesArr.indexOf(aWishToDelete), 1)
        i--
      }
    }

    // REMOVE DUPLICATES FROM OUR DOWNLOADED ARRAY!!! So when we send it back up we're not repeating anything. Our new array already has new stuff.

    console.log(
      "wishesArr after delete-to-delete and before duplicate-delete is",
      wishesArr
    )

    for (let i = 0; i < modifiedWishlist.length; i++) {
      let oneOfOurWishes = modifiedWishlist[i]
      oneOfOurWishes.userId = userId
      if (wishesArr.includes(oneOfOurWishes)) {
        wishesArr.splice(wishesArr.indexOf(oneOfOurWishes), 1)
        i--
      }
    }

    // send allWishes updated list of all wishes with stuff user just deleted, plus user's new and old wishes, with no repeats
    console.log("wishesArr is", wishesArr)
    await db
      .collection("allWishes")
      .doc("allWishes")
      .set({
        allWishes: wishesArr // had put 'modifiedWishList' variable here but we've been working on wishesArr???
      })
  } catch (err) {
    console.error(err)
  }
}

const initialState = []

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_WISHLIST:
      return action.wishlist
    case SAVE_WISHLIST:
      return action.wishes
    case ADD_NEW_WISH:
      if (state.length) {
        const lastId = state[state.length - 1].id
        return state.concat({
          id: lastId + 1,
          type: [],
          body: action.objWithWishAndUserId.wish,
          uniqueId: new Date() + Math.random(),
          userId: action.objWithWishAndUserId.userId
        })
      } else {
        return state.concat({ id: 0, type: [], body: action.wish })
      }
    default:
      return state
  }
}
