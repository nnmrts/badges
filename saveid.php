<?php

$phpid = $_POST['phpid'];
$phplogin = $_POST['phplogin'];
$fname = $phplogin . ".txt";//generates random name
echo "$fname";
$file = fopen("ids/" .$fname, 'w');//creates new file
fwrite($file, $phpid);
fclose($file);