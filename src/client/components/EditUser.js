import React, { Component, Fragment } from "react"
import { fetchUser } from "./store"
import { connect } from "react-redux"

class EditUser extends Component {
  componentDidMount() {
    this.props.loadUser()
  }

  render() {
    return <Fragment />
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(fetchPopular())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser)
