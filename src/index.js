import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store from "./client/store"
import "./index.css"
//import App from './App';
import Root from "./client/components/root"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root")
)
registerServiceWorker()
