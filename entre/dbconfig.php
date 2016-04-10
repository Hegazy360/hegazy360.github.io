<?php

session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "users";

try
{
     $DB_con = new PDO("mysql:host={$servername};dbname={$dbname}",$username,$password);
     $DB_con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
     echo $e->getMessage();
}


include_once 'user_class.php';

$user = new USER($DB_con);
