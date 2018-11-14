const express = "express"
const router = express.Router()
const { Wishlist } = require("../models")

router.get("/:userId", async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findById(req.params.userId)
    if (wishlist) {
      res.status(200).send(wishlist)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.delete("/:userId/:wishId", async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findById(req.params.userId)
    console.log(wishlist) // keep; see comment just below
    if (wishlist) {
      // I need to see what the object looks like to know how to destroy that one item inside of it...MAYBE WISHLIST ITEM BELONGS TO WISHLIST??
    } else {
      res.sendStatus(404) // or res.status(200).send([]) because maybe they just don't have anything in it. or front end can take care of that
    }
  } catch (err) {
    next(err)
  }
})

// delete entire wishlist (need to be careful that user can still add to it; may be more appropriate to send back empty array after deleting)
router.delete("/:userId", async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findById(req.params.userId)
    if (wishlist) {
      await wishlist.destroy()
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

// route to add one wish

// route to edit one wish
