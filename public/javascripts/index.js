(function ($) {

  $('#login').click(function () {
    var number = $('#number').val();
    var password = $('#password').val();
    if (!number) {
      swal(
        '教务系统账号不能为空',
        '',
        'error'
      );
      return false;
    }
    if (!password) {
      swal(
        '教务系统密码不能为空',
        '',
        'error'
      );
      return false;
    }
    var $btn = $(this).button('loading');
    var data = {
      number: number,
      password: password,
    };
    $.post('/login', data, function (res) {
      if (res.code === 0) {
        $btn.button('reset');
        var token = res.token;
        window.location.href = '/users/grade?token=' + token;
      } else {
        swal(
          res.message,
          '',
          'error'
        );
        $btn.button('reset');
      }
    });
  });


})(jQuery);