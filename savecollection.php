<?php

$phplogin = $_POST['phplogin'];
$phpcollection = $_POST['phpcollection'];
$fname = $phplogin . ".js";//generates random name
$file = fopen("collections/" .$fname, 'w');//creates new file
fwrite($file, $phpcollection);
fclose($file);