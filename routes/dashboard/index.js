const express = require("express")
const router = express.Router()
const postRouter = require("./post")
const categoryRouter = require("./category")

// check session
router.get("*", function (req, res, next) {
  if (req.session.userId === null || req.session.userId === undefined) {
    res.redirect("/account/login")
  }
  next()
})

router.get("/", function (req, res) {
  res.render("dashboard/home", { layout: "dashboard", title: "Anasayfa" })
})

router.use("/posts", postRouter)
router.use("/categories", categoryRouter)

module.exports = router
