import { } from 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min.js';
const $box = $('.nav .box'); // 触发二级菜单
const $list = $('.box .list'); // 二级菜单
const $span = $('.list.pro span'); // 触发三级菜单
const $detailed = $('.category .detailed'); // 三级菜单
const $Dinput = $('.input'); // 搜索框外
const $input = $('input'); // 搜索框
const $ul = $('.result-search ul');
const $rSearch = $('.result-search'); // 搜索结果
const $nSearch = $('.normal-search'); // 默认结果

// 移入显示二级菜单
$box.hover(function () {
  let $index = $(this).index();
  $list.eq($index).show();
  $detailed.eq(0).show();
}, function () {
  let $index = $(this).index();
  $list.eq($index).hide();
});

// 移入切换三级菜单
$span.on('mouseover',function(){
  let $index = $(this).index() - 1;
  $.each($detailed,function(index,value){
    $detailed.eq(index).hide();
  });
  $detailed.eq($index).show();
})

// 改变边框颜色
$input.on('focus', function () {
  $Dinput.addClass('curr');
});
$input.on('blur', function () {
  $Dinput.removeClass('curr');
});

//
$input.on('input', function () {
  $rSearch.show();
  if ($input.val() === '') {
    $nSearch.show();
    $rSearch.hide();
  } else {
    $nSearch.hide();
    $.ajax({
      url: `https://www.haier.com/igs/front/suggest/term.jhtml?code=3e6bff6304c547dba650d9941aa472c0&searchWord=${$input.val()}`,
    }).done(function (data) {
      // console.log(data[0]);
      if (data[0] == undefined) {
        $rSearch.hide();
        $nSearch.hide();
      }
      let str = '<span>搜索结果建议</span>';
      for (let value of data) {
        str += `
        <li><a href="">${value}</a></li>
        `
      }
      $ul.html(str);
    })
  }
});

$input.on('blur', function () {
  $rSearch.hide();
  $nSearch.hide();
})

// 根据本地存储判断是否登录,登录就显示登录的头像
const $user_a = $('.user .login');
const $user_img = $('.user img');
const $user_list = $('.user .list');
const $username = $('.user .list .username');
const $return = $('.user .return');
const $user = $('.user');
if(window.localStorage.loginname){
  $user_a.hide();
  $user_img.show();
  $username.html(window.localStorage.loginname);
  $user.hover(function(){
    $user_list.show();
  },function(){
    $user_list.hide();
  });
}
$return.on('click',function(){
  window.localStorage.removeItem('loginname');
  $user_a.show();
  $user_img.hide();
})

