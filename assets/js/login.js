$(function () {
  // 点击【去注册账号】的链接
  // 去注册
  $('#link_reg').on('click', function () {
    // 隐藏登录框
    $('.login-box').hide()
    // 显示注册框
    $('.reg-box').show()
  })

  // 点击【去登录】的链接
  $('#link_login').on('click', function () {
    // 隐藏注册框
    $('.reg-box').hide()
    // 显示登录框
    $('.login-box').show()
  })

  // 自定义校验规则
  // 从 layui 中获取 form 对象
  var form = layui.form
  var layer = layui.layer
  form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容 然后进行下一次判断
      // 如果判断失败 则return 一个提示消息即可
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一样'
      }
    }
  })

  // 注册功能 监听注册表单的提交事件
  $('#form-reg').on('click', function (e) {
    // 阻止默认行为
    e.preventDefault()
    $.post(
      'http://ajax.frontend.itheima.net/api/reguser',
      {
        username: $('#form-reg [name=username]').val(),
        password: $('#form-reg [name=username]').val()
      },
      function (res) {
        if (res.status !== 0) {
          return layer.msg('注册失败', res.message)
        }
        layer.msg('注册成功，请登录！')
        // 模拟人的点击行为
        $('#link_login').click()
      }
    )
  })
})
