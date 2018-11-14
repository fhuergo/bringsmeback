const Sequelize = require("sequelize")
const db = new Sequelize("postgres://localhost:5432/bringsmeback")

const User = require("./user")
const Content = require("./content")
const Wishlist = require("./wishlist")

Content.belongsTo(User)
User.hasMany(Content)

Wishlist.belongsTo(User)
User.hasOne(Wishlist)

module.exports = { User, Content, Wishlist, db }
