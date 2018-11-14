import React, { Component } from "react"
import { fetchAllWishes, sendPossibleWish } from "../store/reducers/allwishes"
import { List, Button, Modal, Header } from "semantic-ui-react"
import { connect } from "react-redux"

class GrantWishes extends Component {
  constructor() {
    super()
    this.state = {
      showModal: false
    }
    this.userId = "CUVplyzZFwe2vSatxeDR"
    this.submitPossibleWish = this.submitPossibleWish.bind(this)
  }
  componentDidMount() {
    this.props.loadAllWishes()
  }
  submitPossibleWish(wish, userId, url) {
    this.props.submitPossibleWish(wish, userId, url)
  }
  render() {
    let id = 0
    return (
      <List>
        <Header textAlign="center">All Users' Wishes</Header>
        {this.props.allWishes.map(wish => {
          id++
          let { type, body, uniqueId } = wish
          let label
          if (type) {
            label = body + type.join(", ")
          } else {
            label = body
          }
          return (
            <List.Item key={id}>
              <List.Content floated="left">{label}</List.Content>
              <List.Content floated="right">
                <FoundItModal
                  label={label}
                  userId={this.userId}
                  submitPossibleWish={this.submitPossibleWish}
                  wish={wish}
                />
              </List.Content>
            </List.Item>
          )
        })}
        <List.Item />
      </List>
    )
  }
}

const mapStateToProps = state => ({
  allWishes: state.allWishes
})

const mapDispatchToProps = dispatch => ({
  loadAllWishes: () => dispatch(fetchAllWishes()),
  submitPossibleWish: (wish, userId, url) =>
    dispatch(sendPossibleWish(wish, userId, url))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GrantWishes)

class FoundItModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submittedSomething: false,
      url: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    const { submitPossibleWish, wish, userId } = this.props
    return (
      <Modal trigger={<Button primary>Found it!</Button>}>
        <Modal.Header>{this.props.label}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {/* should say "you have already submitted a possible treasure for this item, please wait" */}
            <Header>May Have Found Treasure</Header>
            <p>
              Please enter the URL of what you've found. If the other user
              confirms it's what they're looking for, you'll get a point!
            </p>
            <form className="ui form">
              <div className="field">
                <label>URL</label>
                {!this.state.submittedSomething ? (
                  <input
                    type="text"
                    name="url"
                    placeholder="URL"
                    onChange={this.handleChange}
                    value={this.state.url}
                    name="url"
                  />
                ) : (
                  <div>
                    <input type="text" name="url" placeholder="URL" disabled />
                    <br />
                    Thank you for submitting something!
                  </div>
                )}
              </div>
            </form>
          </Modal.Description>
          <Button
            onClick={() => {
              submitPossibleWish(wish, userId, this.state.url)
              this.setState({ submittedSomething: true, url: "" })
            }}
            primary
          >
            Send to User
          </Button>
        </Modal.Content>
      </Modal>
    )
  }
}
