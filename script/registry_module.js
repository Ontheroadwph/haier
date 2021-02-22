import { } from 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min.js';
const $checkbox = $('.checkbox');
const $label = $('label');
const $input = $('.input-style');
const $sInput = $('.input');
const $showPw = $('.showPw i');
const $aFloat = $('.a-float');
const $float = $('.float');
const $errMsg = $('.errMsg'); // 错误弹窗
const $mimabox = $('.mimabox'); // 密码强度弹窗
const $qrLi = $('.qiangruo>li'); // 三个密码强度
const $regbtn = $('.registryBtn'); // 注册按钮
const $form = $('form'); // 获取form标签 
let phone = false;
let username = false;
let mima = false;
let mimaT = false;
let checkbox = false;
// 点击勾选条款 勾选时为true
$checkbox.on('click', function () {
  $(this).toggleClass('curr')
  if ($checkbox.hasClass('curr')) {
    checkbox = true;
  } else {
    checkbox = false;
  }
});

// 得到焦点添加cur类和隐藏对应的label
// $input.on('focus', function () {
//   let $index = $(this).index();
//   $sInput.eq($index).removeClass('redtext');
//   $sInput.eq($index).addClass('cur');
//   $(this).next().hide();
// });


// 点击密码可见切换状态,并将对应的密码框改成文本框
// 点击显示密码按钮将password改为text
$showPw.on('click', function () {
  $(this).toggleClass('icon-mimabukejian').toggleClass('icon-iconfontbukejian');
  if ($(this).hasClass('icon-mimabukejian')) {
    $(this).parent('.showPw').siblings('input').attr('type', 'password');
  } else {
    $(this).parent('.showPw').siblings('input').attr('type', 'text');
  }
});

// 移入显示密码弹框
$aFloat.hover(function () {
  $float.show();
}, function () {
  $float.hide();
})

// 表单验证效果
// 手机号码  不满足条件显示弹层，改变span的边框

$input.eq(0).on('focus', function () {
  $sInput.eq(0).removeClass('redtext');
  $sInput.eq(0).addClass('cur');
  $input.eq(0).next().hide();
});

$input.eq(0).on('blur', function () {
  let reg = /^1[358]\d{9}$/;
  if ($input.eq(0).val() === '') {
    $sInput.eq(0).addClass('redtext');
    $errMsg.eq(0).html('这里还没填呢');
    $errMsg.eq(0).show();
    phone = false;
  } else if (!reg.test($input.eq(0).val())) {
    $sInput.eq(0).addClass('redtext');
    $errMsg.eq(0).html('手机号好像不对哦');
    $errMsg.eq(0).show();
    phone = false;
  } else {
    $sInput.eq(0).removeClass('cur');
    $sInput.eq(0).removeClass('redtext');
    $errMsg.eq(0).hide();
    phone = true;
  }
})

//  用户名  失去焦点发送ajax请求，判断用户名是否存在
$input.eq(1).on('focus', function () {
  $sInput.eq(1).removeClass('redtext');
  $sInput.eq(1).addClass('cur');
  $input.eq(1).next().hide();
});

$input.eq(1).on('blur', function () {
  let $str = $input.eq(1).val();
  console.log($str);
  if ($str === '') {
    $sInput.eq(1).addClass('redtext');
    $errMsg.eq(1).html('这里还没填呢');
    $errMsg.eq(1).show();
    username = false;
  } else {
    $.ajax({
      type: 'post',
      url: 'http://10.31.165.55/haier/php/reg.php',
      data: {
        checkname: $str
      }
    }).done(function (data) {
      console.log(data);
      if (data === 'true') {
        $sInput.eq(1).addClass('redtext');
        $errMsg.eq(1).html('用户名已存在');
        $errMsg.eq(1).show();
        username = false;
      }
      else if ($str === '') {
        $sInput.eq(1).addClass('redtext');
        $errMsg.eq(1).html('这里还没填呢');
        $errMsg.eq(1).show();
        username = false;
      } else {
        $errMsg.eq(1).hide();
        username = true;
      }
    })
  }
  $sInput.eq(1).removeClass('cur');
});

// 密码  按下键盘时判断密码强度
let count = 0;
$input.eq(2).on('focus', function () {
  $sInput.eq(2).removeClass('redtext');
  $sInput.eq(2).addClass('cur');
  $input.eq(2).next().hide();
  $(this).on('input', function () {
    $mimabox.show();
    count = 0;
    let $str = $input.eq(2).val();
    let reg1 = /\d+/;
    let reg2 = /[A-z]+/;
    let reg3 = /\W+/;
    if ($str === '') {
      $mimabox.hide();
    }
    if (reg1.test($str)) {
      count++;
    }
    if (reg2.test($str)) {
      count++;
    }
    if (reg3.test($str)) {
      count++;
    }
    if (count === 1) {
      $qrLi.each(function (index, ele) {
        $(ele).attr('class', 'normal');
      });
      $qrLi.eq(0).addClass('danger');
    }
    if (count === 2) {
      $qrLi.each(function (index, ele) {
        $(ele).attr('class', 'normal');
      });
      $qrLi.eq(1).addClass('medium');
    }
    if (count === 3) {
      $qrLi.each(function (index, ele) {
        $(ele).attr('class', 'normal');
      });
      $qrLi.eq(2).addClass('safe');
    }
  })
})

// 失去焦点时判断显示弹窗
$input.eq(2).on('blur', function () {
  let $str = $input.eq(2).val();
  if ($str === '') {
    $errMsg.eq(2).html('这里还没填呢');
    $errMsg.eq(2).show();
    $sInput.eq(2).addClass('redtext');
    mima = false;
  } else if ($str.length < 6) {
    $errMsg.eq(2).html('密码太短啦，还不到6位呢');
    $errMsg.eq(2).show();
    $sInput.eq(2).addClass('redtext');
    mima = false;
  } else if (count === 1) {
    $errMsg.eq(2).html('需要数字、字母或字符2种组合以上');
    $errMsg.eq(2).show();
    $sInput.eq(2).addClass('redtext');
    mima = false;
  } else {
    $errMsg.eq(2).hide();
    $sInput.eq(2).removeClass('redtext');
    $sInput.eq(2).removeClass('cur');
    mima = true;
  }
})

// 确定密码获取焦点
$input.eq(3).on('focus', function () {
  $sInput.eq(3).removeClass('redtext');
  $sInput.eq(3).addClass('cur');
  $input.eq(3).next().hide();
});

$input.eq(3).on('blur', function () {
  let $str1 = $input.eq(2).val();
  let $str2 = $input.eq(3).val();
  if ($str1 !== $str2) {
    $errMsg.eq(3).show();
    $sInput.eq(3).addClass('redtext');
    mimaT = false;
  } else if ($str2 === '') {
    $errMsg.eq(3).html('这里还没填呢');
    $errMsg.eq(3).show();
    $sInput.eq(3).addClass('redtext');
    mimaT = false;
  } else if ($str1 === '') {
    $errMsg.eq(2).html('这里还没填呢');
    $errMsg.eq(2).show();
    $sInput.eq(2).addClass('redtext');
    mimaT = false;
  }
  else {
    $errMsg.eq(3).hide();
    mimaT = true;
  }
  $sInput.eq(3).removeClass('cur');
});

// from的submit
$form.on('submit',function(){
  if (!phone || !username || !mima || !mimaT || !checkbox) {
    return false;
  }
})

// 当所有条件满足，将按钮变为蓝色，并且点击发送数据
// $regbtn.on('click', function () {
//   if (phone && username && mima && mimaT && checkbox) {
//     $regbtn.addClass('can');
//     $.ajax({
//       url: 'http://10.31.165.55/haier/php/reg.php',
//       type: 'post',
//       data: {
//         phone: $input.eq(0).val(),
//         username: $input.eq(1).val(),
//         password: $input.eq(2).val()
//       }
//     });
//   } else {
//     $regbtn.removeClass('can');
//   }
// })
