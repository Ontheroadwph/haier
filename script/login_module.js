import { } from 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min.js';
const $input = $('.quickLogin input'); // input标签
const $span = $('.input-box>span'); // 下边框改变的span
const $checkbox = $('.checkbox'); // 勾选框
// const $rule = $('.rule'); // 勾选框后的文字
const $button = $('.button'); // 注册按钮
const $err = $('.err'); // 错误弹窗
let checkflag = false;
// 点击勾选
$checkbox.on('click', function () {
  $(this).toggleClass('curr');
  if ($(this).hasClass('curr')) {
    checkflag = true;
    $checkbox.eq(0).removeClass('error');
    $checkbox.eq(0).siblings('.rule').removeClass('error');
  } else {
    checkflag = false;
  }
})

// 获取输入框焦点，隐藏对应的label，将文字该为黑色,添加cur类,隐藏redtext
$input.on('focus', function () {
  $(this).addClass('focus');
  $(this).parent('span').addClass('cur');
  $(this).parent('span').removeClass('redtext');
  $(this).parent('span').siblings('label').hide();
  $(this).parent('span').siblings('.err').hide();
})

// 失去焦点，如果val为空，则显示label，并将文字改为灰色
$input.on('blur', function () {
  $(this).removeClass('focus');
  $(this).parent('span').removeClass('cur');
  if (!$(this).val()) {
    $(this).parent('span').siblings('label').show();
  }
})

// 点击提交数据进行验证
$button.on('click', function () {
  if ($input.eq(0).val() === '') {
    $err.eq(0).html('这里还没填呢');
    $err.eq(0).show();
    $input.eq(0).parent('span').addClass('redtext');
  } else if ($input.eq(1).val() === '') {
    $err.eq(1).html('这里还没填呢');
    $err.eq(1).show();
    $input.eq(1).parent('span').addClass('redtext');
  } else if (checkflag === false) {
    $checkbox.eq(0).addClass('error');
    $checkbox.eq(0).siblings('.rule').addClass('error');
  } else {
    let $str1 = $input.eq(0).val()
    let $str2 = $input.eq(1).val()
    $err.eq(0).hide();
    $err.eq(1).hide();
    $.ajax({
      url: 'http://10.31.165.55/haier/php/login.php',
      type: 'post',
      data: {
        username: $str1,
        password: $str2
      }
    }).done(function (data) {
      if (data === 'true') { // 满足条件，进行跳转
        window.localStorage.setItem('loginname',$str1); // 获取用户名
        location.href = 'http://10.31.165.55/haier/src/index1.html';
      } else if (data === 'false') {
        $err.eq(0).html('你的用户名或者密码好像不对哦');
        $err.eq(0).show();
        $input.eq(0).parent('span').addClass('redtext');
      }
    })
  }
})
