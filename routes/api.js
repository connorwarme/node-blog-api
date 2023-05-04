const express = require('express');
const router = express.Router();

/* GET api home */
router.get('/', function(req, res, next) {
  res.json({
    message: 'Welcome to the API',
  });
});

module.exports = router;