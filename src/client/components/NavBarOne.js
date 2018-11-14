import React from "react"
import { List, Icon } from "semantic-ui-react"

const NavBarOne = () => {
  return (
    <List bulleted horizontal link>
      <List.Item>
        <a href="/">
          <Icon name="home" />
          Dashboard
        </a>
      </List.Item>
      <List.Item>
        <a href="/grant-wishes">
          <Icon name="magic" />
          Grant Wishes
        </a>
      </List.Item>
      <List.Item>
        <Icon name="search" />
        Browse Treasures
      </List.Item>
    </List>
  )
}

export default NavBarOne
