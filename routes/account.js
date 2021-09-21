const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../models/User");

router.get("/login", function (req, res) {
  res.render("dashboard/login", { layout: false, title: "Giriş Yap" });
});

router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    if (user) {
      req.session.userId = user._id;
      req.session.userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
      };
      res.redirect("/dashboard");
    }
  } catch (e) {
    req.session.sessionFlash = {
      type: "alert alert-danger",
      message: "Eposta veya parola hatalı! Lütfen tekrar deneyiniz.",
    };

    res
      .status(404)
      .render("dashboard/login", {
        layout: false,
        title: "Hata! Tekrar Deneyin.",
      });
    // loggin açılırken catch' e giriyor ??
    // daha post yapılmamışken
    // konsola hata basıyor
    // console.log(e)
  }
});

router.get("/register", function (req, res) {
  res.render("dashboard/register", { layout: false, title: "Hesap Oluştur" });
});

router.post("/register", function (req, res) {
  User.create(req.body)
    .then((result) => {
      res.redirect("/account/login");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/logout", function (req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
