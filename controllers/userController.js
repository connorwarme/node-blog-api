const User = require('../models/user')
const asyncHandler = require("express-async-handler") 
const { body, validationResult } = require("express-validator") 
const passport = require("passport") 
const bcrypt = require("bcryptjs")
require("dotenv").config() 

exports.detail = asyncHandler(async(req, res, next) => {
  res.send("not implemented yet: user detail page")
})
exports.create_get = asyncHandler(async (req, res, next) => {
  res.render("signup", { title: "Sign Up" })
})
exports.create_post = [
  body("first_name", "Please add your first name.")
    .trim()
    .isLength({ min: 1 })
    .escape(), 
  body("family_name", "Please add your family name.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email", "Please add your email address.")
    .trim()
    .isLength({ min: 1 })
    .isEmail() 
    .withMessage("Must be a valid email address!") 
    .escape(),
  body("password", "Password required.")
    .trim() 
    .isLength({ min: 6 }) 
    .withMessage("Password must be at least 6 characters.")
    .escape(),
  body("confirm_password", "Passwords did not match.") 
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password
    })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req) 
    const salt = 12
    bcrypt.hash(req.body.password, salt, async(err, hashedPassword) => {
      if (err) {
        return next(err)
      }
      const user = new User({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        email: req.body.email,
        hash: hashedPassword,
      })
      if (!errors.isEmpty()) {
        res.render("signup", {
          title: "Sign Up",
          user,
          errors: errors.array(),
        })
        return
      } else {
        const emailExists = await User.findOne({ email: req.body.email }).exec()
        if (emailExists) {
          const error = new Error("Email address already associated with an account!")
          error.status = 404 
          console.log(error.message)
          res.render("signup", {
            title: "Sign Up",
            user,
            error: error,
          })
        } else {
          await user.save()
          res.redirect(user.url)
        }
      }
    })
  })
]
exports.login_get = asyncHandler(async(req, res, next) => {
  res.render("login", { 
    title: "Login",
    messages: req.session.messages,
  })
})
exports.login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "user/login",
})