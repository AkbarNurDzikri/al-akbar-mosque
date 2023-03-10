const Anggota = require('../models/Anggota');

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
    await Anggota.create({nama, alamat, kontak: {whatsapp, email}, jabatan});
    req.flash('alertMsg', 'Berhasil menambahkan anggota');
    req.flash('alertStatus', 'success');
    res.redirect('/anggota');
  } catch(err) {
    req.flash('alertMsg', `${err.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/anggota');
  }
  // console.log(req.body);
};

const editAnggota = async (req, res) => {
  try {
    const { id, nama, alamat, whatsapp, email, jabatan } = req.body;

    const filter = { _id: id };
    const update = { nama, alamat, kontak: {whatsapp, email}, jabatan };
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
    await Anggota.findOneAndDelete({ _id: id });
    req.flash('alertMsg', 'Berhasil menghapus data anggota');
    req.flash('alertStatus', 'success');
    res.redirect('/anggota');
  } catch(err) {
    req.flash('alertMsg', `${err.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/anggota');
  }
};

module.exports = { viewAnggota, addAnggota, editAnggota, deleteAnggota };