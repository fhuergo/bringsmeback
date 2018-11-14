import React, { Component } from "react"
// import Popular from "./Popular"
import { Segment, Header, Button, List, Icon } from "semantic-ui-react"
import MyWishlist from "./MyWishlist"
import MyStats from "./MyStats"
import MyTreasureChest from "./MyTreasureChest"
import MyInbox from "./MyInbox"
import { fetchWishlist } from "../store/reducers/wishlist"
import { connect } from "react-redux"
import { fetchTreasureChest } from "../store/reducers/treasurechest"

class Dashboard extends Component {
  constructor() {
    super()
    this.userId = "CUVplyzZFwe2vSatxeDR"
    this.reportLink = this.reportLink.bind(this)
  }
  componentDidMount() {
    this.props.loadWishlist(this.userId)
    this.props.loadTreasureChest(this.userId)
  }
  reportLink() {
    // needs to be here instead of MyInbox because MyInbox doesn't have access to this.props.history
    this.props.history.push("/report-link")
  }
  render() {
    const wishlist = (
      <List bulleted>
        {this.props.wishlist.map(wish => {
          return <List.Item key={wish.id}>{wish.body}</List.Item>
        })}
      </List>
    )
    return (
      <div>
        <Segment.Group horizontal>
          <Segment>
            <MyStats
              numWishes={this.props.wishlist.length}
              numTreasures={this.props.treasureChest.length}
            />
          </Segment>
          <Segment>
            <MyInbox reportLink={this.reportLink} />
          </Segment>
        </Segment.Group>
        <Segment.Group horizontal>
          <Segment>
            <Header as="h2">
              <Icon name="like outline" size="mini" />
              My Wishlist
            </Header>
            <Button onClick={() => this.props.history.push("/my-wishlist")}>
              Edit
            </Button>
            {wishlist}
          </Segment>
          <Segment>
            <MyTreasureChest treasureChest={this.props.treasureChest} />
          </Segment>
        </Segment.Group>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  wishlist: state.wishlist,
  treasureChest: state.treasureChest
})

const mapDispatchToProps = dispatch => ({
  loadWishlist: userId => dispatch(fetchWishlist(userId)),
  loadTreasureChest: userId => dispatch(fetchTreasureChest(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
