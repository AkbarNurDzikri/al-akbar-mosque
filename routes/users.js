const router = require('express').Router();
const usersController = require('../controllers/usersController');

// endpoint
router.get('/', usersController.viewUsers);

module.exports = router;
