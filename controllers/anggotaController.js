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
  const validExt = ['jpg', 'jpeg', 'png'];
  const extReq = req.file.mimetype.split('/')[1];
  if(validExt.includes(extReq) === false) {
    req.flash('alertMsg', 'File yg Anda upload tidak diizinkan !');
    req.flash('alertStatus', 'warning');
    res.redirect('/anggota');
    return false;
  }

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

    const filter = { _id: id };
    const gambar = !foto ? req.file.filename : foto;
    const update = { nama, alamat, kontak: {whatsapp, email}, jabatan, foto: gambar };
    await Anggota.findOneAndUpdate(filter, update);
    req.flash('alertMsg', 'Berhasil merubah data anggota');
    req.flash('alertStatus', 'success');
    res.redirect('/anggota');
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
        req.flash('alertMsg', 'Berhasil menghapus data dan file anggota !');
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