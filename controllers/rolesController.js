const Roles = require('../models/Roles');

const viewRoles = async (req, res) => {
  try {
    const roles = await Roles.find();
    const alertMsg = req.flash('alertMsg');
    const alertStatus = req.flash('alertStatus');
    const alert = { msg: alertMsg, status: alertStatus };

    res.render('./master/roles/tableRoles', {
      roles,
      alert,
      title: 'Master Roles'
    });
  } catch(err) {
    res.redirect('/roles');
  }
};

const addRole = async (req, res) => {
  try {
    const { role_name } = req.body;
    const roleName = role_name.toLowerCase();
    const exist = await Roles.findOne({ role_name: roleName });

    if(exist) {
      req.flash('alertMsg', 'Role ' + roleName.charAt(0).toUpperCase() + roleName.slice(1) + ' sudah terdaftar !');
      req.flash('alertStatus', 'warning');
      res.redirect('/roles');
    } else {    
      await Roles.create({role_name: roleName});
      req.flash('alertMsg', 'Berhasil menambahkan role');
      req.flash('alertStatus', 'success');
      res.redirect('/roles');
    }
  } catch(err) {
    req.flash('alertMsg', `${err.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/roles');
  }
};

const editRole = async (req, res) => {
  try {
    const { id, role_name } = req.body;
    const target = await Roles.findOne({ _id: id });
    const update = { role_name };
    const result = await Roles.updateOne(target, update);

    if(result.modifiedCount == 1) {
      req.flash('alertMsg', 'Berhasil mengupdate role');
      req.flash('alertStatus', 'primary');
      res.redirect('/roles');
    } else {
      req.flash('alertMsg', 'Gagal mengupdate role');
      req.flash('alertStatus', 'warning');
      res.redirect('/roles');
    }
  } catch(err) {
    req.flash('alertMsg', `${err.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/roles');
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.body;
    const target = await Roles.findOne({ _id: id });
    const result = await Roles.deleteOne(target);
    
    if(result.deletedCount == 1) {
      req.flash('alertMsg', 'Berhasil menghapus role');
      req.flash('alertStatus', 'primary');
      res.redirect('/roles');
    } else {
      req.flash('alertMsg', 'Gagal menghapus role');
      req.flash('alertStatus', 'warning');
      res.redirect('/roles');
    }
  } catch(err) {
    req.flash('alertMsg', `${err.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/roles');
  }
};

module.exports = { viewRoles, addRole, editRole, deleteRole };