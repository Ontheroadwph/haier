import { } from 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min.js';
// banner轮播图和爆款轮播图

const $left = $('.banner .left');
const $right = $('.banner .right');
const $aLi = $('.banner .pager li');
const $aDiv = $('.banner .imgList div');
const $banner = $('.banner');
const $imgList = $('.banner .imgList');

const $baokuan = $('.baokuan');
const $bDiv = $('.baokuan .imgList>div');
const $bLeft = $('.baokuan .left');
const $bRight = $('.baokuan .right');
const $bImgList = $('.baokuan .imgList');

let $index = 0; // 默认的索引
let $timer = null;

let $bIndex = 0; // 默认的索引
let $bTimer = null;

let $picwidth = $aDiv.eq(0).width(); // 获取元素的宽度
let $bPicwidth = $bDiv.eq(0).width(); // 获取元素的宽度
// 进入页面默认向右平移，移入轮播停止
$timer = setInterval(() => {
  $right.click();
}, 3000);
$banner.hover(function () {
  clearInterval($timer);
}, function () {
  $timer = setInterval(() => {
    $right.click();
  }, 3000);
})

$bTimer = setInterval(() => {
  $bRight.click();
}, 3000);
$baokuan.hover(function () {
  clearInterval($bTimer);
}, function () {
  $bTimer = setInterval(() => {
    $bRight.click();
  }, 3000);
})

// 根据图片数量设置imgList宽度
$imgList.css({
  width: $picwidth * $aDiv.length
})

// 点击移动图片
$aLi.on('click', function () {
  $index = $(this).index() - 1;
  move();
});
$left.on('click', function () {
  $index -= 2;
  move();
})
$right.on('click', function () {
  move();
})

// 爆款按钮
$bLeft.on('click', function () {
  $bIndex -= 2;
  bMove();
})
$bRight.on('click', function () {
  bMove();
})

// 封装移动效果
function move() {
  $index++;
  // 当图片位于最后一张时，重置位置，index变为1 判断如果是图片的最后一张，重置位置。
  if ($index === $aDiv.length) { // $aLi.length + 1
    $imgList.css('left', 0);
    $index = 1;
  }
  if ($index === -1) {
    $imgList.css({
      left: -$picwidth * $aLi.length
    })
    $index = 4;
  }
  if (($index === $aDiv.length - 1)) {
    $aLi.eq(0).addClass('active').siblings().removeClass('active');
  } else {
    $aLi.eq($index).addClass('active').siblings().removeClass('active');
  }
  $imgList.stop(true).animate({ left: -$picwidth * $index }, 500);
}
function bMove() {
  $bIndex++;
  // 当图片位于最后一张时，重置位置，$bIndex变为1 判断如果是图片的最后一张，重置位置。
  if ($bIndex === $bDiv.length) { // $aLi.length + 1
    $bImgList.css('left', 0);
    $bIndex = 1;
  }
  if ($bIndex === -1) {
    $bImgList.css({
      left: -$bPicwidth * $bDiv.length
    })
    $bIndex = 8;
  }
  $bImgList.stop(true).animate({ left: -$bPicwidth * $bIndex }, 500);
}


// 心选和人气排行选项卡效果
const $xx_tab = $('.xinxuan-tab ul li'); // 选项卡按钮
const $xx_content = $('.showbox ul li'); // 选项卡按钮对应内容
const $rq_tab =  $('.renqiul > li');
const $rq_content = $('.renqi_buttom > ul > li');
$xx_tab.on('click',function(){
  $index = $(this).index();
  $(this).addClass('curr').siblings('li').removeClass('curr');
  $xx_content.eq($index).show().siblings('li').hide();
})
$rq_tab.on('click',function(){
  $index = $(this).index();
  $(this).addClass('curr').siblings('li').removeClass('curr');
  $rq_content.eq($index).show().siblings('li').hide();
})



