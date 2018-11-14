import React, { Component } from "react"
import PreviewGift from "./PreviewGift"
import { fetchInbox } from "../store/reducers/inbox"
import { Header, List, Button, Icon, Modal } from "semantic-ui-react"
import { connect } from "react-redux"

class MyInbox extends Component {
  constructor(props) {
    super(props)
    this.userId = "CUVplyzZFwe2vSatxeDR"
  }
  componentDidMount() {
    this.props.loadInbox(this.userId)
  }
  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="mail" />
          My Inbox
        </Header>
        <List>
          {this.props.inbox.map((message, index) => {
            console.log("message is", message)
            const { Item, Content } = List
            const { from, url } = message
            return (
              <Item key={index}>
                <Content floated="left">
                  Possible match for {from} ({url})
                </Content>
                <Content floated="right">
                  <PreviewGift
                    from={from}
                    url={url}
                    reportLink={this.props.reportLink}
                  />
                  <Button>Delete</Button>
                </Content>
              </Item>
            )
          })}
        </List>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  inbox: state.inbox
})

const mapDispatchToProps = dispatch => ({
  loadInbox: userId => dispatch(fetchInbox(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyInbox)
