$(document).ready( function () {
  $('#myTable').DataTable({
    fixedHeader: true,
  });
});

// edit handler
const btnEdit = $('.btnEdit');
for(let i = 0; i < btnEdit.length; i++) {
  btnEdit[i].addEventListener('click', () => {
    $('#idEdit').val(btnEdit[i].getAttribute('data-id'));
    $('#role_nameEdit').val(btnEdit[i].getAttribute('data-role_name'));
  });
}

// delete handler
const btnDelete = $('.btnDelete');
for(let i = 0; i < btnDelete.length; i++) {
  btnDelete[i].addEventListener('click', () => {
    $('#idDelete').val(btnDelete[i].getAttribute('data-id'));
    $('#textConfirm').html('Yakin hapus data ' + btnDelete[i].getAttribute('data-role_name'));
  });
}