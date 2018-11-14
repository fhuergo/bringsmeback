const Sequelize = require("sequelize")

const { STRING, TEXT } = Sequelize

const Content = db.define("content", {
  type: {
    type: STRING
  },
  url: {
    type: TEXT
  }
})

module.exports = Content
