<?php

include 'connect.php';
// echo $_GET['datasid'];
if(isset($_POST['datasid'])){
  
  $sid = $_POST['datasid'];
  $result = $conn->query("SELECT * FROM haiershop WHERE sid=$sid");
  echo json_encode($result->fetch_assoc());
};