
<?php 
// First we execute our common code to connection to the database and start the session
     require("common.php"); 
     
    // We remove the user's data from the session 
    unset($_SESSION['user']); 
     
    // We redirect them to the login page 
    ?>
	
	
	<div style="position:absolute;top:15%;left:47%">
<center>
<img src="bugsnaplogo.png">
</center>
</div>
<div style="position:absolute;top:50%;left:44%">
You are successfully logged out. For <a href="login.php">login</a>
</div>