const Users = require('../models/Users');
const Roles = require('../models/Roles');

const viewUsers = async (req, res) => {
  try {
    const users = await Users.find();
    const roles = await Roles.find();
    const alertMsg = req.flash('alertMsg');
    const alertStatus = req.flash('alertStatus');
    const alert = { msg: alertMsg, status: alertStatus };

    res.render('./master/users/tableUsers', {
      users,
      alert,
      roles,
      title: 'Master Users'
    });
  } catch(err) {
    res.redirect('/users');
  }
};

const addUser = async (req, res) => {
  try {
    const { username, email, role, password, isActive } = req.body;
    const exist = await Users.findOne({ username: username.toLowerCase() });

    if(exist) {
      req.flash('alertMsg', 'Username ' + username.toLowerCase() + ' sudah terdaftar !');
      req.flash('alertStatus', 'warning');
      res.redirect('/users');
    } else {
      await Users.create({username, email, role, password, isActive});
      req.flash('alertMsg', 'Berhasil menambahkan user');
      req.flash('alertStatus', 'success');
      res.redirect('/users');
    }
  } catch(err) {
    req.flash('alertMsg', `${err.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/users');
  }
};

const editUser = async (req, res) => {
  try {
    const { id, username, email, role, password, isActive } = req.body;
    const target = await Users.findOne({ _id: id });
    const update = { username, email, role, password, isActive };
    const result = await Users.updateOne(target, update);

    if(result.modifiedCount == 1) {
      req.flash('alertMsg', 'Berhasil mengupdate user');
      req.flash('alertStatus', 'primary');
      res.redirect('/users');
    } else {
      req.flash('alertMsg', 'Gagal mengupdate user');
      req.flash('alertStatus', 'warning');
      res.redirect('/users');
    }
  } catch(err) {
    req.flash('alertMsg', `${err.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/users');
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const target = await Users.findOne({ _id: id });
    const result = await Users.deleteOne(target);
    
    if(result.deletedCount == 1) {
      req.flash('alertMsg', 'Berhasil menghapus user');
      req.flash('alertStatus', 'primary');
      res.redirect('/users');
    } else {
      req.flash('alertMsg', 'Gagal menghapus user');
      req.flash('alertStatus', 'warning');
      res.redirect('/users');
    }
  } catch(err) {
    req.flash('alertMsg', `${err.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/anggota');
  }
};

module.exports = { viewUsers, addUser, editUser, deleteUser };