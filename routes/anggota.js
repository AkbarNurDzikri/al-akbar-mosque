const router = require('express').Router();
const anggotaController = require('../controllers/anggotaController');

// endpoint anggota
router.get('/', anggotaController.viewAnggota);
router.post('/', anggotaController.addAnggota);
router.put('/', anggotaController.editAnggota);
router.delete('/', anggotaController.deleteAnggota);

module.exports = router;