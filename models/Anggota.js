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
  nohp: {
    type: String,
    required: true,
  },
  jabatan: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Anggota', anggotaScheme);