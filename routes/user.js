const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', user_controller.create_get)
router.post('/signup', user_controller.create_post)

router.get('/login', user_controller.login_get)
router.post('/login', user_controller.login_post)

router.get('/:id', user_controller.detail)

module.exports = router;
