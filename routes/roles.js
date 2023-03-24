const router = require('express').Router();
const rolesController = require('../controllers/rolesController');

// endpoint
router.get('/', rolesController.viewRoles);
router.post('/', rolesController.addRole);
router.put('/', rolesController.editRole);
router.delete('/', rolesController.deleteRole);

module.exports = router;