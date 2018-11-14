import React from "react"
import { Header } from "semantic-ui-react"
import { Router, Route, Switch } from "react-router-dom"
import Dashboard from "./Dashboard"
import Donate from "./Donate"
import GrantWishes from "./GrantWishes"
import MyWishlist from "./MyWishlist"
import ReportLink from "./ReportLink"
import NavBarOne from "./NavBarOne"
import NavBarTwo from "./NavBarTwo"
import NotFound from "./NotFound"

import history from "./history"

const Root = () => {
  return (
    <div>
      <div align="center">
        <NavBarOne />
      </div>
      <div>
        <Header size="huge" textAlign="center">
          bringsmeback.io
        </Header>
        {/* <Header as="h5" textAlign="center">
          curing nostalgia and censorship
        </Header> */}
      </div>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/donate" component={Donate} />
          <Route exact path="/my-wishlist" component={MyWishlist} />
          <Route exact path="/grant-wishes" component={GrantWishes} />
          <Route exact path="/report-link" component={ReportLink} />
          <Route path="/" component={NotFound} />
        </Switch>
      </Router>
      <div align="center">
        <NavBarTwo />
      </div>
    </div>
  )
}

export default Root
