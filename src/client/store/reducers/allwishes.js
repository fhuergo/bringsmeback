import db from "../../../firestore"

const GET_ALL_WISHES = "GET_ALL_WISHES"

const getAllWishes = allWishes => {
  return {
    type: GET_ALL_WISHES,
    allWishes
  }
}

export const fetchAllWishes = () => async dispatch => {
  try {
    const wishesArr = []
    while (!wishesArr.length) {
      // important to keep while loop! otherwise cannot grab wishes 'in time' for render
      const allUsers = await db.collection("users").get()
      await allUsers.docs.forEach(async user => {
        const thisUser = await db
          .collection("users")
          .doc(user.id)
          .get()
        const wishes = await thisUser.data().wishlist
        wishes.forEach(wish => {
          wishesArr.push(wish)
        })
      })
    }
    dispatch(getAllWishes(wishesArr))
  } catch (err) {
    console.error(err)
  }
}

export const sendPossibleWish = (wish, userId, url) => async dispatch => {
  try {
    console.log("wish is", wish) // includes userId of other person
    console.log("userId (of 'me' for if I get a point) is", userId) //
    console.log("url is", url)
    // add possibleWish to incoming/inbox of whoever user it belongs to
    // so first, figure out whose wish it is, and get the userId.
    // once I have the userId, add it there.
    // add it to outbox of user who sent? (optional)
  } catch (err) {
    console.error(err)
  }
}

const initialState = []

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_WISHES:
      return action.allWishes
    default:
      return state
  }
}
