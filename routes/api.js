const express = require('express');
const router = express.Router();
const api_controller = require("../controllers/apiController")
const passport = require("../passport")

/* GET api home */
router.get('/', function(req, res, next) {
  res.json({
    message: 'Welcome to the API',
  });
});
// user related
router.get('/signup', api_controller.signup_get)
router.post('/signup', api_controller.signup_post)

router.get('/login', api_controller.login_get)
router.post('/login', api_controller.login_post)

router.get('/users', api_controller.user_list)

router.get('/user/:userid', api_controller.user_detail)

// blog related
router.get('/blogs', api_controller.blogs_list)

router.get('/blog/create', passport.authenticateToken, api_controller.blog_create_get)
router.post('/blog/create', api_controller.blog_create_post)

router.get('blog/:blogid', api_controller.blog_detail)
// do these need to come before blogid?
router.get('/blog/:blogid/comment', api_controller.blog_comment_create_get)
router.post('/blog/:blogid/comment', api_controller.blog_comment_create_post)

router.get('/blog/:blogid/comments', api_controller.blog_comments_list) 


module.exports = router;