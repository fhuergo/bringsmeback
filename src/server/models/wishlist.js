const Sequelize = require("sequelize")

const { ENUM, STRING } = Sequelize

const Wishlist = db.define("wishlist", {
  body: {
    type: ENUM(STRING)
  },
  type: {
    type: ENUM(STRING)
  }
})

module.exports = Wishlist
