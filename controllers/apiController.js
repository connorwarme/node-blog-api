const User = require('../models/user')
const asyncHandler = require("express-async-handler") 
const { body, validationResult } = require("express-validator") 
const passport = require("passport") 
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config() 

exports.login_get = asyncHandler(async(req, res, next) => {
  const messages = req.session.messages
  res.json(messages)
})
// to do:
// learn how to user JWT for the authentication for api
// https://www.theodinproject.com/lessons/nodejs-api-security
// pass the token back and forth in the header of the request obj to verify user
// this is where i need to work with the jwt for authentication..?
exports.login_post = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(400).json({
        message: "Something went south.. :/"
      })
    }
    if (user === false) {
      return res.status(401).json({
        message: "User not found."
      })
    } else {
      const token = jwt.sign({ user }, process.env.JWT_KEY)
      return res.json({ user, token })
    }
  })(req, res, next)
}

exports.signup_get = function(req, res, next) {
  res.json({
    message: "signup GET"
  })
}
exports.signup_post = [
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
        res.json({
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
          res.json({
            title: "Sign Up",
            user,
            error: error,
          })
        } else {
          await user.save()
          res.json({
            title: "User Profile",
            user,
          })
        }
      }
    })
  })
]


exports.user_list = asyncHandler(async(req, res, next) => {
  const users = await User.find({}).exec()
  res.json({
    message: "user list GET",
    users,
  })
})

exports.user_detail = asyncHandler(async(req, res, next) => {
  const detail = await User.findById(req.params.userid).exec()
  if (detail === null) {
    res.json({
      message: "User detail GET",
      error: "User not found in database",
    })
  } else {
    res.json({
      message: "user detail GET",
      detail,
    })
  }
})

// blog related
exports.blogs_list = function(req, res, next) {
  res.json({
    message: "blog list GET"
  })
}

exports.blog_create_get = function(req, res, next) {
  res.json({
    message: "create blog GET",
    user: req.user
  })
}
exports.blog_create_post = function(req, res, next) {
  res.json({
    message: "create blog POST"
  })
}

exports.blog_detail = function(req, res, next) {
  res.json({
    message: "blog detail"
  })
}
// do these need to come before blogid?
exports.blog_comment_create_get = function(req, res, next) {
  res.json({
    message: "blog create comment GET"
  })
}
exports.blog_comment_create_post = function(req, res, next) {
  res.json({
    message: "blog create comment POST"
  })
}

exports.blog_comments_list = function(req, res, next) {
  res.json({
    message: "blog comments GET"
  })
}