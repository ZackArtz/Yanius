let blockEdit = false;
let blockKey = false;
let KeyHidden = true;

function showAPIKey() {
  if (!KeyHidden) return;
  let element = $('input[name=\'apiKey\']');
  element.val(element.data('value'));
  KeyHidden = false;
}

function regenerateAPIKey() {
  if (blockKey) return;
  blockKey = true;
  const url = '../api/regenerateAPIKey';
  $.ajax({
    url: url,
    type: 'GET'
  }).always(function (response) {
    Materialize.toast(response.message, 5000);
    if (response.key) {
      $('input[name=\'apiKey\']').val(response.key);
      Materialize.updateTextFields();
    }
  });
  setTimeout(function () {
    blockKey = false;
  }, 2000);
}

function editUser() {
  if (blockEdit) return;
  blockEdit = true;
  const url = '../api/users/' + user.id;
  let data = {
    email: $('input[name=\'email\']').val(),
    password: $('input[name=\'password\']').val()
  };
  $.ajax({
    url: url,
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(data)
  }).always(function (response) {
    Materialize.toast(response.message, 5000);
  });
  setTimeout(function () {
    blockEdit = false;
  }, 2000);
}

$('#account').addClass('active');