
$(document).ready(function(){
    var $form = $('form')
    $('form').submit(function (e) {
      e.preventDefault()
      var data = getFormData($form)
      // checkNullData(data)
      // checkRePassword(data.password, data.confirmPassword)
      if(checkNullData(data) && checkRePassword(data.password, data.confirmPassword)) {
        $.ajax({
          url: '/api/user/signup',
          type: 'POST',
          data: data,
          complete: function (res) {
            if (res.status !== 200) {
              return shakeModal(res.responseJSON.msg)
            }
             else {
              window.location.href = '/login'
            }
          }
        })
      }
    })
  })

  function checkNullData(data) {
    if(data.username.trim() == '' || data.password.trim() == '' 
    || data.confirmPassword.trim() == '' || data.fullname.trim() == '') {
      return false
    }
    return true
  }
  
  function checkRePassword(password, confirmPassword) {
    if(password.trim() != confirmPassword.trim()) {
      shakeModal('Re-password do not match!!')
      return false
    }
    return true
  }

    function getFormData ($form) {
      var unindexedArray = $form.serializeArray()
      var indexedArray = {}
      $.map(unindexedArray, function (n, i) {
        indexedArray[n['name']] = n['value'].trim()
      })
      return indexedArray
    }
    
    function shakeModal (message) {
      $('#register-form').addClass('animated shake')
      $('.error').addClass('alert alert-warning').html(message || 'Server error')
      $('input[type="password"]').val('')
      setTimeout(function () {
        $('#register-form').removeClass('animated shake')
      }, 1000)
      setTimeout(function () {
        $('.error').removeClass('alert alert-warning').html('')
      }, 3000)
    }