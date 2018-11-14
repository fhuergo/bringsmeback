import React, { Component } from "react"
import { Header, Button, List, Icon } from "semantic-ui-react"

export default class MyTreasureChest extends Component {
  render() {
    const { treasureChest } = this.props
    return (
      <div>
        <Header as="h2">
          <Icon name="gem outline" size="tiny" />
          My Treasure Chest
        </Header>
        <List>
          {treasureChest.length
            ? treasureChest.map(item => {
                const { id, body } = item
                return (
                  <List.Item key={id}>
                    <List.Content floated="left">{body}</List.Content>
                    <List.Content floated="right">
                      <Button primary>Gift</Button>
                      <Button>Remove</Button>
                    </List.Content>
                  </List.Item>
                )
              })
            : `When you've found someone's treasure, it'll appear here :) browse some wishes!`}
        </List>
      </div>
    )
  }
}
