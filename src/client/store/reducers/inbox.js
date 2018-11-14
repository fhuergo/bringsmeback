import db from "../../../firestore"

const GET_INBOX = "GET_INBOX"

const getInbox = inbox => ({
  type: GET_INBOX,
  inbox
})

export const fetchInbox = userId => async dispatch => {
  // const inbox = [
  //   { id: 1, from: "michael", content: "hi i may have something for you" },
  //   { id: 2, from: "jillian", content: "hi i may have something for you" }
  // ]
  const userData = await db
    .collection("users")
    .doc(userId)
    .get()
  const { inbox } = await userData.data()
  console.log("inbox is", inbox)
  dispatch(getInbox(inbox))
}

const initialState = []

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_INBOX:
      return action.inbox
    default:
      return state
  }
}
