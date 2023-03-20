const Anggota = require('../models/Anggota');
const fs = require('fs');

const viewAnggota = async (req, res) => {
  try {
    const anggota = await Anggota.find();
    const alertMsg = req.flash('alertMsg');
    const alertStatus = req.flash('alertStatus');
    const alert = { msg: alertMsg, status: alertStatus };

    res.render('./dkm/anggota', {
      anggota,
      alert,
      title: 'Anggota DKM'
    });
  } catch(err) {
    res.redirect('/anggota');
  }
};

const addAnggota = async (req, res) => {
  try {
    const { nama, alamat, whatsapp, email, jabatan } = req.body;
    await Anggota.create({nama, alamat, kontak: {whatsapp, email}, jabatan, foto: req.file.filename});
    req.flash('alertMsg', 'Berhasil menambahkan anggota');
    req.flash('alertStatus', 'success');
    res.redirect('/anggota');
  } catch(err) {
    req.flash('alertMsg', `${err.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/anggota');
  }
};

const editAnggota = async (req, res) => {
  try {
    const { id, nama, alamat, whatsapp, email, jabatan, foto } = req.body;
    const target = await Anggota.findOne({ _id: id });

    // jika ada foto, artinya foto masihh menggunakan foto lama
    if(foto) {
      const update = { nama, alamat, kontak: {whatsapp, email}, jabatan, foto };
      await Anggota.findOneAndUpdate(target._id, update);
      req.flash('alertMsg', 'Berhasil mengupdate data anggota');
      req.flash('alertStatus', 'primary');
      res.redirect('/anggota');
    } else {
      // hapus foto lama dan ganti dengan foto baru
      fs.unlink('./public/images/uploads/' + target.foto, async (err) => {
        if(err) {
          req.flash('alertMsg', `Gagal mengupdate file ! [ Kode kesalahan : ${err} ]`);
          req.flash('alertStatus', 'danger');
          res.redirect('/anggota');
        } else {
          const update = { nama, alamat, kontak: {whatsapp, email}, jabatan, foto: req.file.filename };
          await Anggota.findOneAndUpdate(target._id, update);
          req.flash('alertMsg', 'Berhasil mengupdate data dan file anggota');
          req.flash('alertStatus', 'primary');
          res.redirect('/anggota');
        }
      });
    }
  } catch(err) {
    req.flash('alertMsg', `${err.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/anggota');
  }
};

const deleteAnggota = async (req, res) => {
  try {
    const { id } = req.body;
    const target = await Anggota.findOne({ _id: id });

    fs.unlink('./public/images/uploads/' + target.foto, async (err) => {
      if(err) {
        req.flash('alertMsg', `Gagal menghapus file ! [ Kode kesalahan : ${err} ]`);
        req.flash('alertStatus', 'danger');
        res.redirect('/anggota');
      } else {
        await Anggota.deleteOne(target);
        req.flash('alertMsg', 'Berhasil menghapus data dan file anggota');
        req.flash('alertStatus', 'success');
        res.redirect('/anggota');
      }
    });
  } catch(err) {
    req.flash('alertMsg', `${err.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/anggota');
  }
};

module.exports = { viewAnggota, addAnggota, editAnggota, deleteAnggota };