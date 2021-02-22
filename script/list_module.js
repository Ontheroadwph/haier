import { } from 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min.js';
import { } from './jquery.lazyload.js';
import { } from './jquery.pagination.js';

const $list = $('.list ul');
const $btn = $('.prolist li');

$btn.on('click',function(){
  $btn.each(function(index,ele){
    $(ele).removeClass('down');
  })
  $(this).addClass('down');
})

//排序的操作-设置初始变量
let $array = []; // 排序后的数组
let $array_default = []; // 排序前的数组
let $prev = 0; // 上一个价格
let $next = 0; // 下一个价格

// 获取数据
$.ajax({
  url: 'http://10.31.165.55/haier/php/list.php',
  dataType: 'json'
}).done(function (data) {
  let $page = data.pagesize; // 设置变量保存总页数
  console.log(data);
  let $arr = data.pagecontent;
  let $str = '';
  $.each($arr, function (index, value) {
    $str += `
    <li>
      <div class="box">
        <a class="imgbox" href="./detail.html?sid=${value.sid}"><img class="lazy" data-original="${value.picurl}" alt="" width="220" height="220"></a>
        <div class="textbox">
          <a class="tit">${value.title}</a>
        </div>
        <p class="jiage">
          参考价
          <b>${value.price}</b>
        </p>
      </div>
    </li>
    `
  });
  $list.html($str);

  $array = [];
  $array_default = [];
  // 将渲染后的li加入数组中
  $('.list li').each(function (index, ele) {
    $array[index] = $(this);
    $array_default[index] = $(this);
  })

  $('img.lazy').lazyload({
    effect: "fadeIn" //切换形式
  });

  // 根据传递的页数重新渲染数据
  $('.page').pagination({
    pageCount: $page, //总的页数
    jump: true, //是否开启跳转到指定的页数，布尔值。
    prevContent: '上一页', //将图标改成上一页下一页。
    nextContent: '下一页',
    callback: function (api) {
      console.log(api.getCurrent()); //获取当前的点击的页码。
      // 根据页码请求接口数据
      $.ajax({
        url: 'http://10.31.165.55/haier/php/list.php',
        data: {
          page: api.getCurrent()
        },
        dataType: 'json'
      }).done(function (data) {
        let $arr = data.pagecontent;
        let $str = '';
        $.each($arr, function (index, value) {
          $str += `
          <li>
            <div class="box">
              <a class="imgbox"><img class="lazy" data-original="${value.picurl}" alt="" width="220" height="220"></a>
              <div class="textbox">
                <a class="tit">${value.title}</a>
              </div>
              <p class="jiage">
                参考价
                <b>${value.price}</b>
              </p>
            </div>
          </li>
        `
        });
        $list.html($str);

        $array = [];
        $array_default = [];
        // 将渲染后的li加入数组中
        $('.list li').each(function (index, ele) {
          $array[index] = $(this);
          $array_default[index] = $(this);
        })

        $('img.lazy').lazyload({
          effect: "fadeIn" //切换形式
        });
      })

    }
  });
})


// 恢复默认
$btn.eq(0).on('click',function(){
  $.each($array_default,function(index,value){
    $list.append(value);
  })
})
// 价格降序
$btn.eq(1).on('click',function(){
  // 根据冒泡排序将价格按降序处理
  for(let i=0;i<$array.length-1;i++){
    for(let j=0;j<$array.length-i-1;j++){
      $prev = parseFloat($array[j].find('b').html());
      $next = parseFloat($array[j+1].find('b').html());
      if($prev > $next){
        let temp =  $array[j];
        $array[j]  = $array[j+1];
        $array[j+1] =  temp;
      }
    }
  }
  $.each($array,function(index,value){
    $list.append(value);
  })
})
