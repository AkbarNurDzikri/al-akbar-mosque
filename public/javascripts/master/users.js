$(document).ready( function () {
  $('#myTable').DataTable({
    fixedHeader: true,
  });
});

// check kesamaan password
$('#konfirmPassword').on('keyup', (e) => {
  if($('#konfirmPassword').val() == '') {
    $('#falseKonfirmPassword').css('display', 'none');
    $('#btnSubmit').removeAttr('disabled');
  } else if($('#konfirmPassword').val() != $('#password').val()) {
    $('#falseKonfirmPassword').css('display', 'block');
    $('#falseKonfirmPassword').html('<i class="bi bi-shield-exclamation"></i> Konfirmasi Password tidak sesuai !');
    $('#falseKonfirmPassword').attr('class', 'text-danger');
    $('#btnSubmit').attr('disabled', true);
  } else {
    $('#falseKonfirmPassword').css('display', 'block');
    $('#falseKonfirmPassword').html('<i class="bi bi-check2-circle"></i> Konfirmasi Password sesuai ..');
    $('#falseKonfirmPassword').attr('class', 'text-success');
    $('#btnSubmit').removeAttr('disabled');
  }
});

// edit handler
const btnEdit = $('.btnEdit');
for(let i = 0; i < btnEdit.length; i++) {
  btnEdit[i].addEventListener('click', () => {
    $('#idEdit').val(btnEdit[i].getAttribute('data-id'));
    $('#isActiveEdit').val(btnEdit[i].getAttribute('data-isActive'));
    $('#usernameEdit').val(btnEdit[i].getAttribute('data-username'));
    $('#emailEdit').val(btnEdit[i].getAttribute('data-email'));
    $('#roleEdit').val(btnEdit[i].getAttribute('data-role'));
    $('#passwordEdit').val(btnEdit[i].getAttribute('data-role'));
    $('#labelPasswordEdit').css('display', 'none');
    $('#passwordEdit').css('display', 'none');
  });
}

// delete handler
const btnDelete = $('.btnDelete');
for(let i = 0; i < btnDelete.length; i++) {
  btnDelete[i].addEventListener('click', () => {
    $('#idDelete').val(btnDelete[i].getAttribute('data-id'));
    $('#textConfirm').html('Yakin hapus data ' + btnDelete[i].getAttribute('data-username'));
  });
}