
$(document).ready(function(){
    var $form = $('form')
    $('form').submit(function (e) {
      e.preventDefault()
      var data = getFormData($form)
      if(checkNullData(data)) {
        $.ajax({
          url: '/api/user/login',
          type: 'POST',
          data: data,
          complete: function (res) {
            if (res.status !== 200) {
              return shakeModal(res.responseJSON.msg)
            }else if(res.responseJSON.user.role ==='customer') {
              return shakeModal('Invalid account')
            }
             else {
              // common.setCookie('admin-role', res.responseJSON.user.role)
              window.location.href = '/'
            }
          }
        })
      }
    })
  })

  function checkNullData(data) {
    if(data.username.trim() == '' || data.password.trim() == '') {
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
      $('#login-form').addClass('animated shake')
      $('.error').addClass('alert alert-warning').html(message || 'Server error')
      $('input[type="password"]').val('')
      setTimeout(function () {
        $('#login-form').removeClass('animated shake')
      }, 1000)
      setTimeout(function () {
        $('.error').removeClass('alert alert-warning').html('')
      }, 3000)
    }