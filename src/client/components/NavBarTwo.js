import React from "react"
import { List } from "semantic-ui-react"

const NavBar = () => {
  return (
    <List celled horizontal>
      <List.Item>About Us</List.Item>
      <List.Item>Contact</List.Item>
      <List.Item>Donate</List.Item>
    </List>
  )
}

export default NavBar
