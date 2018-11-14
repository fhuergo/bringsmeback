import React, { Component } from "react"
import { Modal, Button, Header } from "semantic-ui-react"
import { addItemToTreasureChest } from "../store/reducers/treasurechest"

export default class PreviewGift extends Component {
  constructor(props) {
    super(props)
    this.state = {
      giftPreviewed: false,
      correctClicked: false,
      incorrectClicked: false
    }
    this.previewGift = this.previewGift.bind(this)
    this.confirmGift = this.confirmGift.bind(this)
    this.rejectGift = this.rejectGift.bind(this)
  }
  previewGift() {
    this.setState({ giftPreviewed: true })
  }
  confirmGift(from, url) {
    this.setState({ correctClicked: true })
    this.props.addItemToTreasureChest(from, url)
  }
  rejectGift() {
    this.setState({ incorrectClicked: true })
  }
  render() {
    const { from, url, reportLink } = this.props
    const { giftPreviewed, correctClicked, incorrectClicked } = this.state
    return (
      <Modal trigger={<Button primary>Open</Button>}>
        <Modal.Header>{from}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>
              Someone thinks this is this what you're looking for. Check out the
              link, and a menu will appear for you to confirm/reject the gift.
            </Header>
            <p>Please use caution when opening any gift-link.</p>
            <p>
              <a
                onClick={this.previewGift}
                href={url}
                target="_blank"
                size="big"
              >
                {url}
              </a>
            </p>
            {!giftPreviewed ? (
              ""
            ) : (
              <div>
                {correctClicked || incorrectClicked ? (
                  <div>Thanks for your input!</div>
                ) : (
                  <div>
                    <button
                      onClick={() => this.confirmGift(from, url)}
                      class="ui positive button"
                    >
                      This is what I was looking for!
                    </button>
                    <button
                      onClick={this.rejectGift}
                      class="ui negative button"
                    >
                      Nope, wrong thing
                    </button>
                    <Button onClick={reportLink}>Report</Button>
                  </div>
                )}
              </div>
            )}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
