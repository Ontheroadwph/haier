<?php

include 'connect.php';

if(isset($_POST['username']) && isset($_POST['password'])){
  $username = $_POST['username'];
  $password = sha1($_POST['password']); // 密码得加密匹配
  // 判断本条数据是否在数据库中 有则表示可以登录，反之不能
  $result = $conn->query("SELECT * FROM haierreg WHERE username='$username' AND password='$password'");
  if($result->fetch_assoc()){
    echo 'true';
  }else{
    echo 'false';
  }
}