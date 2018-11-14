import React, { Component } from "react"
import {
  fetchWishlist,
  saveWishlist,
  addNewWish
} from "../store/reducers/wishlist"
import { Header, Button, List, Checkbox } from "semantic-ui-react"
import { connect } from "react-redux"

class MyWishlist extends Component {
  constructor() {
    super()
    this.state = {
      newWish: "",
      checkedItems: []
    }
    this.userId = "CUVplyzZFwe2vSatxeDR"
    this.handleChange = this.handleChange.bind(this)
    this.handleAddWish = this.handleAddWish.bind(this)
    this.checkboxChange = this.checkboxChange.bind(this)
    this.save = this.save.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  componentDidMount() {
    this.props.loadWishlist(this.userId)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAddWish(event) {
    event.preventDefault()
    const { newWish } = this.state
    if (newWish) {
      // if they didn't enter an empty string...
      this.props.addWish(newWish, this.userId)
      this.setState({
        newWish: ""
      })
    }
  }

  save() {
    const { checkedItems } = this.state
    const { wishlist } = this.props

    // grabbing full body of each wish to delete
    let wishesToDelete = []
    for (let i = 0; i < checkedItems.length; i++) {
      let idToCheck = checkedItems[i]
      for (let j = 0; j < wishlist.length; j++) {
        let wishlistItem = wishlist[j]
        if (idToCheck === wishlistItem.id) {
          wishesToDelete.push(wishlistItem)
        }
      }
    }
    this.props.saveWishlist(this.userId, wishlist, wishesToDelete, checkedItems)
    this.props.history.push("/")
  }

  cancel() {
    // but I also have to check if anything was added. So maybe those should have properties attached so I can tell if anything is new on it. That way if it's suddenly removed it won't say "are you sure?" when you click cancel.
    const itemsToRemove = this.state.checkedItems.length
    if (itemsToRemove) {
      const sure = "yes" // for now
      // ask if they are sure they do not want to save changes (modal?)
      if (sure) {
        // delete those items
        this.props.history.push("/")
      }
    } else {
      this.props.history.push("/")
    }
  }

  checkboxChange(wishId) {
    const { checkedItems } = this.state
    // coding note: doesn't work when this.setState is outside the if/else blocks, trust me :)
    const alreadyChecked = checkedItems.includes(wishId)
    console.log("alreadyChecked is", alreadyChecked)
    if (alreadyChecked) {
      // uncheck occurred: remove from to-remove list
      let newStateMinusUncheckedItem = checkedItems
      newStateMinusUncheckedItem.splice(
        newStateMinusUncheckedItem.indexOf(wishId),
        1
      )
      this.setState({ checkedItems: newStateMinusUncheckedItem })
    } else {
      // check occurred: add to to-remove list
      let stateCopy = checkedItems
      let newStatePlusCheckedItem = stateCopy.concat(wishId)
      console.log("newStatePlusCheckedItem is", newStatePlusCheckedItem)
      this.setState({ checkedItems: newStatePlusCheckedItem })
      console.log(
        `after this.setState, this.state.checkedItems is ${
          this.state.checkedItems
        }`
      )
    }
    console.log("checkedItems is", checkedItems)
  }

  render() {
    return (
      <div>
        <Header as="h2">My Wishlist</Header>
        <Header as="h5">Remove?</Header>
        <List>
          {this.props.wishlist.length
            ? this.props.wishlist.map(wish => {
                const { id, type, body } = wish
                const label = body + type.join(", ")
                return (
                  <List.Item key={id}>
                    <List.Content floated="left">
                      <Checkbox
                        label={label}
                        onChange={() => this.checkboxChange(id)}
                      />{" "}
                      ({id})
                    </List.Content>
                  </List.Item>
                )
              })
            : `No wishes! Add something you're looking for :)`}
          <List.Item>
            <List.Content>
              <form onSubmit={newWish => this.handleAddWish(newWish)}>
                <input
                  type="text"
                  name="newWish"
                  value={this.state.newWish}
                  onChange={this.handleChange}
                />
                <Button primary>Add Wish</Button>
              </form>
            </List.Content>
          </List.Item>
          <div align="center">
            <Button color="purple" onClick={() => this.save()}>
              Save
            </Button>
            <Button onClick={() => this.cancel()}>Cancel</Button>
          </div>
        </List>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  wishlist: state.wishlist
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadWishlist: userId => dispatch(fetchWishlist(userId)),
  saveWishlist: (userId, wishlist, wishesToDelete, wishIDsToDelete) =>
    dispatch(saveWishlist(userId, wishlist, wishesToDelete, wishIDsToDelete)),
  addWish: (newWish, userId) => dispatch(addNewWish(newWish, userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyWishlist)
