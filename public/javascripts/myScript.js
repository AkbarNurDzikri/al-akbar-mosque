const modalTrigger = document.getElementById('modalTrigger');
const labelModal = document.getElementById('modalLabel');
const btnEdit = document.getElementsByClassName('btnEdit');
const btnHapus = document.getElementsByClassName('btnHapus');
const inputId = document.getElementById('id');
const inputNama = document.getElementById('nama');
const inputAlamat = document.getElementById('alamat');
const inputNohp = document.getElementById('nohp');
const inputJabatan = document.getElementById('jabatan');
const myForm = document.querySelector('form');
const btnUpdate = document.getElementById('btnUpdate');

modalTrigger.addEventListener('click', () => {
  myForm.setAttribute('action', '/anggota');
  labelModal.innerHTML = 'Tambah Anggota';
  btnUpdate.innerHTML = 'Save';
  inputNama.value = '';
  inputAlamat.value = '';
  inputNohp.value = '';
  inputJabatan.value = '';
});

for(let i = 0; i < btnEdit.length; i++) {
  btnEdit[i].addEventListener('click', () => {
    myForm.setAttribute('action', '/anggota?_method=PUT');
    labelModal.innerHTML = 'Edit Anggota';
    btnUpdate.innerHTML = 'Update';
    inputId.value = btnEdit[i].getAttribute('data-id');
    inputNama.value = btnEdit[i].getAttribute('data-nama');
    inputAlamat.value = btnEdit[i].getAttribute('data-alamat');
    inputNohp.value = btnEdit[i].getAttribute('data-nohp');
    inputJabatan.value = btnEdit[i].getAttribute('data-jabatan');
  });
};