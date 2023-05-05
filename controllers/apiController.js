const User = require('../models/user')
const asyncHandler = require("express-async-handler") 
const { body, validationResult } = require("express-validator") 
const passport = require("passport") 
const bcrypt = require("bcryptjs")
require("dotenv").config() 

exports.login_get = asyncHandler(async(req, res, next) => {
  const messages = req.session.messages
  res.json(messages)
})
// this is where i need to work with the jwt for authentication..?
exports.login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/user/login",
})

exports.signup_get = function(req, res, next) {
  res.json({
    message: "signup GET"
  })
}
exports.signup_post = function(req, res, next) {
  res.json({
    message: "signup POST"
  })
}

exports.user_list = function(req, res, next) {
  res.json({
    message: "user list GET"
  })
}

exports.user_detail = function(req, res, next) {
  res.json({
    message: "user detail GET"
  })
}

// blog related
exports.blogs_list = function(req, res, next) {
  res.json({
    message: "blog list GET"
  })
}

exports.blog_create_get = function(req, res, next) {
  res.json({
    message: "create blog GET"
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