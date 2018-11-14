import { createStore, combineReducers, applyMiddleware } from "redux"
//import { createLogger } from "redux-logger"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import wishlist from "./reducers/wishlist"
import treasureChest from "./reducers/treasurechest"
import inbox from "./reducers/inbox"
import allWishes from "./reducers/allwishes"

const reducer = combineReducers({
  wishlist,
  treasureChest,
  inbox,
  allWishes
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware) // createLogger({ collapsed: true })
)
const store = createStore(reducer, middleware)

export default store
