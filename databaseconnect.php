<?php 
//session_start();
@mysql_connect("localhost","root","","upsdashboard") or die(mysql_error());

mysql_select_db("upsdashboard") or die(mysql_error());


?>