const mongoose = require('mongoose');

const anggotaScheme = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  kontak: {
    whatsapp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    }
  },
  jabatan: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Anggota', anggotaScheme);