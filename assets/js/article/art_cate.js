$(function () {
  let layer = layui.layer
  let form = layui.form

  // 获取文章分类的列表
  initArtCateList()

  // 先封装一个获取列表并渲染的一个函数(init)
  // 后续所有的增、删、改 调用对应的接口进行操作 操作成功后只需要再次调用(init)
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        let htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }

  //   为添加类别按钮绑定点击事件
  let indexAdd = null
  $('#btnAddCate').on('click', function () {
    //  弹框
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    })
  })

  //   冒泡   好处：性能高，对后续新增的元素同样具有时间绑定的效果
  //  添加文章分类 通过事件委托的形式为表单绑定提交事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()

    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('新增分类失败！')
        }
        // 重新获取分类数据
        initArtCateList()
        // 提示成功信息
        layer.msg('新增分类成功！')
        // 关闭弹出层
        layer.close(indexAdd)
      }
    })
  })

  //   给 btn-edit 编辑按钮绑定点击事件
  let indexEdit = null
  $('tbody').on('click', '.btn-edit', function () {
    //   弹出一个修改文章分类信息的层
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-edit').html()
    })

    // 获取当前分类的数据
    let id = $(this).attr('data-id')

    // 发起请求获取对应分类的数据
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('form-edit', res.data)
      }
    })
  })

  //   事件委托 为修改分类的表单绑定 submit 事件
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()

    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败！')
        }
        layer.msg('更新分类数据成功！')
        layer.close(indexEdit)
        initArtCateList()
      }
    })
  })

  //   事件委托 为删除按钮绑定点击事件
  $('body').on('click', '.btn-delete', function () {
    let id = $(this).attr('data-id')
    //   提示用户是否要删除
    layer.confirm(
      '确定要删除吗?',
      {
        icon: 3,
        title: '提示'
      },
      function (index) {
        $.ajax({
          method: 'GET',
          url: `/my/article/deletecate/${id}`,
          data: $(this).serialize(),
          success: function (res) {
            if (res.status !== 0) {
              return layer.msg('删除分类失败！')
            }
            layer.msg('删除分类成功！')
            // 关闭弹出层
            layer.close(index)
            initArtCateList()
          }
        })
      }
    )
  })
})
