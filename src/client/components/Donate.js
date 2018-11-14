import React, { Component, Fragment } from "react"
//import { fetchBitcoinAddress } from "./store"
// import { connect } from "react-redux"

export default class Donate extends Component {
  componentDidMount() {
    //this.props.loadBitcoinAddress()
  }
  render() {
    //const { bitcoinAddress } = this.props
    return (
      <Fragment>
        Thank you for considering supporting. We accept payment through Bitcoin
        at this address:
      </Fragment>
    )
  }
}

// const mapStateToProps = state => ({
//   bitcoinAddress: state.bitcoinAddress
// })

// const mapDispatchToProps = dispatch => ({
//   loadBitcoinAddress: () => dispatch(fetchBitcoinAddress())
// })

// export default connect(
//   null,
//   null
// )(Donate)

// how about isntead of having FAQ in state, it's just an HTML file that's rendered? The point of React is to have a single page application that doesn't require a refresh. I don't need taht for this paritcular page...hmmm...guess I could just treat it like HTML. Could be convenient to edit database and have it be that way.
