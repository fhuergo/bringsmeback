import React, { Component, Fragment } from "react"
//import { fetchPopular } from "../store/reducers/wishlist"
import { connect } from "react-redux"

class Popular extends Component {
  componentDidMount() {
    //this.props.loadPopular()
  }
  // popular downloads
  // popular requests!
  render() {
    //const { popular } = this.props
    return (
      <Fragment>
        {/* {popular.map(popular => {
          return <Fragment>{popular.contentName}</Fragment>
        })} */}
      </Fragment>
    )
  }
}

// const mapStateToProps = state => ({
//   popular: state.popular
// })

// const mapDispatchToProps = dispatch => ({
//   loadPopular: () => dispatch(fetchPopular())
// })

export default connect(null)(Popular)
