const router = require('express').Router();
const usersController = require('../controllers/usersController');

// endpoint
router.get('/', usersController.viewUsers);
router.post('/', usersController.addUser);
router.put('/', usersController.editUser);
router.delete('/', usersController.deleteUser);

module.exports = router;