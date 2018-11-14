import React, { Component, Fragment } from "react"
import { connect } from "react-redux"

class UserProfile extends Component {
  componentDidMount() {
    this.props.loadUserProfile()
  }
  render() {
    return <Fragment>THEIR wishlist</Fragment>
  }
}

const mapStateToProps = state => ({
  popular: state.popular
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadUserProfile: () =>
    dispatch(fetchUserProfile(ownProps.match.params.otherUserId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile)
