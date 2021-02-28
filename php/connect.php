<?php
header('content-type:text/html;charset=utf-8'); //设置中文编码。

// 2.后端再将获取的值传递给数据库。
// 2.1.创建数据库和表 - 注意密码的长度必须是40的长度(md5加密是32位，sha1加密是40位)
// 2.2.连接数据库。
define('HOST','localhost');//主机名
define('USERNAME','root');//用户名
define('PASSWORD','root');//密码
define('DBNAME','jd');//数据库名称
$conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);//连接成功，没有提示的。
if($conn->connect_error){
    die('数据库连接错误'.$conn->connect_error);
}
// 设置字符编码
$conn->query('SET NAMES UTF8');//方法帮助我们执行括号里面的代码