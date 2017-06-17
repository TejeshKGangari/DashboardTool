<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>QE&A Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="plugins/jQuery/jQuery-2.1.4.min.js"></script>
    <!-- Bootstrap 3.3.5 -->
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <!-- AdminLTE App -->
    <link rel="stylesheet" href="dist/css/AdminLTE.min.css">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
</head>
<style type="text/css">
    body { margin-top:30px; }
hr.message-inner-separator
{
    clear: both;
    margin-top: 10px;
    margin-bottom: 13px;
    border: 0;
    height: 1px;
    background-image: -webkit-linear-gradient(left,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.15),rgba(0, 0, 0, 0));
    background-image: -moz-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
    background-image: -ms-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
    background-image: -o-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
}

    </style>
<div style="position:absolute;top:15%;left:47%">
<center>
<img src="bugsnaplogo.png">
</center>
</div>
<div class="col-md-12" style="position:absolute;top:40%;">
    <div class="modal-dialog" style="margin-bottom:0">
        <div class="modal-content">

 <div class="panel-heading">
                        <h3 class="panel-title">Token Login</h3>
<div align="right"> <a href="login.php">Sign In</a>&nbsp|&nbsp <a href="Register.php">Register</a></div>
                    </div>

<div class="panel-body">
                    
<form id="register"action="tokenlogin.php" method="post"> 

<fieldset>
<div class="form-group">
<input class="form-control" placeholder="Token #" name="token" value="">
</div>
<div class="form-group">
<input class="form-control" placeholder="Username" name="username" type="username" value="<?php 
if(!empty($_POST['username'])){ 
echo $_POST['username'];}?>" >
</div>

                                <div class="form-group">
                                    <input class="form-control" placeholder="Password" name="password" type="password" value="">
                                </div>

 <div class="form-group">
                                    <input class="form-control" placeholder="Confirm Password" name="confirmpwd" type="password" value="">
                                </div>

<input type="submit" value="Login" class="btn btn-sm btn-primary"/>
</fieldset>
</form>
</div> 
</div>
</div>
</div>

<?php 
    // First we execute our common code to connection to the database and start the session
     require("common.php"); 
     
    // This if statement checks to determine whether the registration form has been submitted
     // If it has, then the registration code is run, otherwise the form is displayed
     if(!empty($_POST)) 
    { 
        // Ensure that the user has entered a non-empty username 

	if(empty($_POST['token'])) 
        { 
           die("<div style='position:absolute;left:68%;top:47%;' class='col-sm-4 col-md-2'>
            <div class='alert alert-danger'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>
                    &times;</button>
                <strong>Error Message</strong>
                <hr class='message-inner-separator'>
                <p>Please enter a token</p>
            </div>
        </div>"); 
        }         
        // Ensure that the user has entered a non-empty password 
        
       else if(empty($_POST['username'])) 
        { 
            // Note that die() is generally a terrible way of handling user errors
             // like this.  It is much better to display the error with the form
             // and allow the user to correct their mistake.  However, that is an
             // exercise for you to implement yourself. 

	die("<div style='position:absolute;left:68%;top:53%;' class='col-sm-4 col-md-2'>
            <div class='alert alert-danger'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>
                    &times;</button>
                <strong>Error Message</strong>
                <hr class='message-inner-separator'>
                <p>Please enter an username</p>
            </div>
        </div>"); 
        } 
	else if(empty($_POST['password'])) 
        { 
            die("<div style='position:absolute;left:68%;top:57%;' class='col-sm-4 col-md-2'>
            <div class='alert alert-danger'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>
                    &times;</button>
                <strong>Error Message</strong>
                <hr class='message-inner-separator'>
                <p>Please enter a password</p>
            </div>
        </div>");  
	} 
		  else if(empty($_POST['confirmpwd'])) 
         {
	die("<div style='position:absolute;left:68%;top:60%;' class='col-sm-4 col-md-2'>
            <div class='alert alert-danger'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>
                    &times;</button>
                <strong>Error Message</strong>
                <hr class='message-inner-separator'>
                <p>Passwords do not match</p>
            </div>
        </div>"); 
		 }
		$password= $_POST['password']; 
		$confirmpassword=$_POST['confirmpwd'];
		
		$pattern = '^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$';
if ( ! preg_match('/'.$pattern . '/', $_POST['password']))
{
        die("<div style='position:absolute;left:68%;top:53%;' class='col-sm-4 col-md-2'>
            <div class='alert alert-danger'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>
                    &times;</button>
                <strong>Error Message</strong>
                <hr class='message-inner-separator'>
                <p>Password Should contain<ul><li>minimum of 8 characters</li><li>at least 1 number</li><li>at least one uppercase character</li><li>at least one lowercase character</li></ul></p>
            </div>
        </div>"); 
    }
		
		if($password!=$confirmpassword)
		{		die("<div style='position:absolute;left:68%;top:60%;' class='col-sm-4 col-md-2'>
            <div class='alert alert-danger'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>
                    &times;</button>
                <strong>Error Message</strong>
                <hr class='message-inner-separator'>
                <p>Passwords do not match</p>
            </div>
        </div>"); 
	
		}
        // Make sure the user entered a valid E-Mail address 
        // filter_var is a useful PHP function for validating form input, see: 
        // http://us.php.net/manual/en/function.filter-var.php 
        // http://us.php.net/manual/en/filter.filters.php 
         
        // Now we perform the same type of check for the email address, in order
         // to ensure that it is unique. 
        
         
        // We will use this SQL query to see whether the username entered by the
         // user is already in use.  A SELECT query is used to retrieve data from the database.
         // :username is a special token, we will substitute a real value in its place when
         // we execute the query. 
        $query = " 
            SELECT 
                1 
            FROM members 
            WHERE 
                username = '".$_POST['username']."' and reset = 'Y'
        "; 
         
        // This contains the definitions for any special tokens that we place in
         // our SQL query.  In this case, we are defining a value for the token 
        // :username.  It is possible to insert $_POST['username'] directly into
         // your $query string; however doing so is very insecure and opens your
         // code up to SQL injection exploits.  Using tokens prevents this. 
        // For more information on SQL injections, see Wikipedia: 
        // http://en.wikipedia.org/wiki/SQL_Injection 
        $query_params = array( 
            ':username' => $_POST['username'] 
        ); 
         
        try 
        { 
            // These two statements run the query against your database table. 
            $stmt = $db->prepare($query); 
            $result = $stmt->execute($query_params); 
        } 
        catch(PDOException $ex) 
        { 
            // Note: On a production website, you should not output $ex->getMessage().
             // It may provide an attacker with helpful information about your code. 
             die("Failed to run query: "); 
        } 
         
        // The fetch() method returns an array representing the "next" row from 
        // the selected results, or false if there are no more rows to fetch. 
        $row = $stmt->fetch(); 

        // If a row was returned, then we know a matching username was found in 
        // the database already and we should not allow the user to continue. 
        if($row) 
        {
			require_once('databaseconnect.php');
			
$query1 = " 
            SELECT 
                1 
            FROM members 
            WHERE 
                username = '".$_POST['username']."' and token = '".$_POST['token']."'
        "; 

		$result1 = mysql_query($query1)or die(mysql_error());
$count1 = mysql_num_rows($result1);
if($count1 >0)
{



            
        $salt = dechex(mt_rand(0, 2147483647)) . dechex(mt_rand(0, 2147483647));
        $password = hash('sha256', $_POST['password'] . $salt); 
        for($round = 0; $round < 65536; $round++) 
        { 
            $password = hash('sha256', $password . $salt); 
        } 
		        $query_params = array( 
            ':username' => $_POST['username'], 
            ':password' => $password, 
            ':salt' => $salt
            ); 

$query = "UPDATE members Set password = '".$password."', salt = '".$salt."', reset = 'N', token = '0' where username = '".$_POST['username']."'";

        try 
        { 
            // Execute the query to create the user 
		
            $stmt = $db->prepare($query); 
            $result = $stmt->execute($query_params); 
        } 
        catch(PDOException $ex) 
        { 
		die("Failed to run query: " . $ex->getMessage()); 
        } 
		            unset($row['salt']); 
            unset($row['password']); 
             
            $_SESSION['user'] = $row; 
        header("Location: login.php"); 

}
else{
	
	die("<div style='position:absolute;left:68%;top:47%;' class='col-sm-4 col-md-2'>
            <div class='alert alert-danger'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>
                    &times;</button>
                <strong>Error Message</strong>
                <hr class='message-inner-separator'>
                <p>The Username and token combination is not valid</p>
            </div>
        </div>"); 
}
		} 
         else
		 {
			 
			$query = " 
            SELECT 
                1 
            FROM members 
            WHERE 
                username = '".$_POST['username']."' and reset = 'N'
        ";  
			 $query_params = array( 
            ':username' => $_POST['username'] 
        ); 
       
//echo $query;
        try 
        { 
            // These two statements run the query against your database table. 
            $stmt = $db->prepare($query); 
            $result = $stmt->execute($query_params); 
        } 
        catch(PDOException $ex) 
        { 
             die("Failed to run query: "); 
        } 
         
        $row = $stmt->fetch(); 
        if($row)
		{
			
			die("<div style='position:absolute;left:68%;top:47%;' class='col-sm-4 col-md-2'>
            <div class='alert alert-danger'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>
                    &times;</button>
                <strong>Error Message</strong>
                <hr class='message-inner-separator'>
                <p>The Username is not eligible for token login</p>
            </div>
        </div>"); 

			
		}
		else
		{
			die("<div style='position:absolute;left:68%;top:47%;' class='col-sm-4 col-md-2'>
            <div class='alert alert-danger'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>
                    &times;</button>
                <strong>Error Message</strong>
                <hr class='message-inner-separator'>
                <p>The Username is not registered</p>
            </div>
        </div>"); 

		}
		 
		 }
        // An INSERT query is used to add new rows to a database table. 
        // Again, we are using special tokens (technically called parameters) to
         // protect against SQL injection attacks. 
        
    } 
     
?> 
