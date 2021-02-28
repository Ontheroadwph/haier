import { } from 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min.js';
const $spicI = $('.spic img');
const $bpicI = $('.bpic img');
const $spic = $('.spic');
const $bpic = $('.bpic');
const $title = $('.title p');
const $type = $('.title span');
const $price = $('.price_pro em');
const $ul = $('.ulList_box ul');
const $sf = $('.sf');
const $content_left = $('.detail_content_left');

// 获取页面地址栏的sid
const sid = location.search.substring(1).split('=')[1];
console.log(sid);

$.ajax({
  url: "http://10.31.165.55/haier/php/getsid.php",
  data: {
    datasid: sid
  },
  dataType: "json",
  type: 'post'
}).done(function (data) {
  console.log(data);
  // 渲染
  $spicI.attr('src', 'https://images.weserv.nl/?url=' + data.picurl);
  $bpicI.attr('src', 'https://images.weserv.nl/?url=' + data.picurl);
  $title.html(data.title);
  $type.html(data.type);
  $price.html(data.price);
  let picarr = data.piclist.split(',');
  let str = '';
  for (let value of picarr) {
    str += `
      <li><img src="https://images.weserv.nl/?url=${value}" alt=""></li>
    `
  }
  $ul.html(str);
  // 移入小图给图片添加边框，切换放大镜中的图片
  const $li = $('.ulList_box ul li');
  $li.on('mouseover', function () {
    $(this).siblings('li').children('img').removeClass('curr');
    $(this).children('img').addClass('curr');
    let $img = $(this).children('img').attr('src');
    $bpicI.attr('src', $img);
    $spicI.attr('src', $img);
  })
  // 将产品信息给title
  document.title = `海尔${data.type}(haier)${data.title}介绍价格参考-海尔官网`;
})

// 放大镜效果
$spic.on('mouseover', function () {
  $sf.show();
  $bpic.show();
  // 小图和大图移动的比例
  const bili = $bpicI.width() / $spic.width();
  // console.log(bili); 
  $spic.on('mousemove', function (e) {
    // 获取放大镜到边框的距离
    let leftValue = e.pageX - $sf.width() / 2 - $content_left.offset().left;
    let topValue = e.pageY - $sf.height() / 2 - $content_left.offset().top;
    // 限制放大镜移动范围
    if (leftValue <= 0) {
      leftValue = 0;
    } else if (leftValue >= $spic.width() - $sf.width()) {
      leftValue = $spic.width() - $sf.width();
    }
    if (topValue <= 0) {
      topValue = 0;
    } else if (topValue >= $spic.height() - $sf.height()) {
      topValue = $spic.height() - $sf.height();
    }
    // 将值赋给图片  大图朝小图相反位置移动
    $sf.css('left', leftValue);
    $sf.css('top', topValue);
    $bpicI.css('left', -leftValue * bili);
    $bpicI.css('top', -topValue * bili);
  })
})

$spic.on('mouseout', function () {
  $sf.hide();
  $bpic.hide();
})

