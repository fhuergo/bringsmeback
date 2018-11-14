const Sequelize = require("sequelize")

// copy from grace shopper which is copied from a boilerplate

const { STRING, ENUM } = Sequelize

const User = db.define("user", {
  username: {
    type: STRING,
    allowNull: false
  },
  treasureChest: {
    type: ENUM(STRING)
  },
  wishlist: {
    type: ENUM(STRING)
  }
})

module.exports = User
