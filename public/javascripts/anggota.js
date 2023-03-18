const modalTrigger = document.getElementById('modalTrigger');
const labelModal = document.getElementById('modalLabel');
const btnEdit = document.getElementsByClassName('btnEdit');
const btnHapus = document.getElementsByClassName('btnHapus');
const inputId = document.getElementById('id');
const inputNama = document.getElementById('nama');
const inputAlamat = document.getElementById('alamat');
const inputWhatsapp = document.getElementById('whatsapp');
const inputEmail = document.getElementById('email');
const inputJabatan = document.getElementById('jabatan');
const inputFoto = document.getElementById('foto');
const formCreateUpdate = document.getElementById('formCreateUpdate');
const btnUpdate = document.getElementById('btnUpdate');
const fotoLama = document.getElementById('fotoLama');
const gantiFoto = document.getElementById('gantiFoto');

modalTrigger.addEventListener('click', () => {
  formCreateUpdate.setAttribute('action', '/anggota');
  labelModal.innerHTML = 'Tambah Anggota';
  btnUpdate.innerHTML = 'Save';
  inputNama.value = '';
  inputAlamat.value = '';
  inputWhatsapp.value = '';
  inputEmail.value = '';
  inputJabatan.value = '';
  inputFoto.value = '';
  inputFoto.setAttribute('type', 'file');
  inputFoto.setAttribute('required', true);
  fotoLama.style.display = 'none';
  gantiFoto.style.display = 'none';
});

for(let i = 0; i < btnEdit.length; i++) {
  btnEdit[i].addEventListener('click', () => {
    formCreateUpdate.setAttribute('action', '/anggota?_method=PUT');
    labelModal.innerHTML = 'Edit Anggota';
    btnUpdate.innerHTML = 'Update';
    inputId.value = btnEdit[i].getAttribute('data-id');
    inputNama.value = btnEdit[i].getAttribute('data-nama');
    inputAlamat.value = btnEdit[i].getAttribute('data-alamat');
    inputWhatsapp.value = btnEdit[i].getAttribute('data-whatsapp');
    inputEmail.value = btnEdit[i].getAttribute('data-email');
    inputJabatan.value = btnEdit[i].getAttribute('data-jabatan');
    inputFoto.setAttribute('type', 'hidden');
    inputFoto.setAttribute('required', false);
    inputFoto.value = btnEdit[i].getAttribute('data-foto');
    fotoLama.setAttribute('src', '/images/uploads/' + btnEdit[i].getAttribute('data-foto'));
    fotoLama.style.display = 'block';
    gantiFoto.style.display = 'block';
  });
};

gantiFoto.addEventListener('click', () => {
  gantiFoto.style.display = 'none';
  fotoLama.style.display = 'none';
  inputFoto.removeAttribute('value');
  inputFoto.setAttribute('type', 'file');
  inputFoto.setAttribute('required', true);
});

for(let i = 0; i < btnHapus.length; i++) {
  btnHapus[i].addEventListener('click', () => {
    document.getElementById('idDelete').value = btnHapus[i].getAttribute('data-id');
    document.querySelector('h3').innerHTML = 'Yakin <span class="text-danger">hapus</span> data "' + btnHapus[i].getAttribute('data-nama') + '"';
  });
};