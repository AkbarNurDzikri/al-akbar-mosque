const router = require('express').Router();
const anggotaController = require('../controllers/anggotaController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads/')
  },
  filename: function (req, file, cb) {
    const date = new Date();
    const uniqueSuffix = date.getTime();
    cb(null, uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
})

// not used for validate extensionbecause there are already HTML5 features (accept="image/png, ...")
const checkExistOrNot = (req, file, cb) => {
  // jika ada file, simpan filenya ke dalam direktori. Jika tidak ada, tidak perlu menyimpan ulang file
  if(file) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: checkExistOrNot,
})

// endpoint anggota
router.get('/', anggotaController.viewAnggota);
router.post('/', upload.single('foto'), anggotaController.addAnggota);
router.put('/', upload.single('foto'), anggotaController.editAnggota);
router.delete('/', anggotaController.deleteAnggota);

module.exports = router;