import React, { Component, Fragment } from "react"

export default class Rules extends Component {
  render() {
    return (
      <Fragment>
        1) No CP or snuff content...we do not support abuse. 2) Do not reveal
        your or another user's identity.
      </Fragment>
    )
  }
}

// how about isntead of having FAQ in state, it's just an HTML file that's rendered? The point of React is to have a single page application that doesn't require a refresh. I don't need taht for this paritcular page...hmmm...guess I could just treat it like HTML. Could be convenient to edit database and have it be that way.
