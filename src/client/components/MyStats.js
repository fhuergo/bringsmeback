import React from "react"
import { Header, Statistic, Icon } from "semantic-ui-react"

const MyStats = ({ numWishes, numTreasures }) => {
  return (
    <div>
      <Header as="h2">
        <Icon name="chart line" />
        My Stats
      </Header>
      <Statistic.Group>
        <Statistic>
          <Statistic.Value>{numWishes}</Statistic.Value>
          <Statistic.Label>Wishes</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{numTreasures}</Statistic.Value>
          <Statistic.Label>Treasures</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>0</Statistic.Value>
          <Statistic.Label>Gifts</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </div>
  )
}

export default MyStats
