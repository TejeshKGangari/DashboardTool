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
                        <h3 class="panel-title">Register</h3>
<div align="right"> <a href="login.php">Sign In</a>&nbsp|&nbsp <a href="tokenlogin.php">Token Login</a></div>
                    </div>

<div class="panel-body">
                    
<form id="register"action="register.php" method="post"> 

<fieldset>
<div class="form-group">
<input class="form-control" placeholder="E-mail Address" id = "email" name="email" type="email" value="<?php 
if(!empty($_POST['email'])){ 
echo $_POST['email'];}?>" maxlength = '50'>
</div>
<div class="form-group">
<input class="form-control" placeholder="Username" id = "username" name="username" type="username" value="<?php 
if(!empty($_POST['username'])){ 
echo $_POST['username'];}?>" maxlength = '30'>
</div>
<div class="form-group">
                                    <input class="form-control" placeholder="First Name" id = "fname" name="fname" type="text" value="<?php 
if(!empty($_POST['fname'])){ 
echo $_POST['fname'];}?>" maxlength = '30'>
                                </div>
								<div class="form-group">
                                    <input class="form-control" placeholder="Last Name" id = "lname" name="lname" type="text" value="<?php 
if(!empty($_POST['lname'])){ 
echo $_POST['lname'];}?>" maxlength = '30'>
                                </div>
							<!--			<div class="form-group">
                                    <input class="form-control" placeholder="Associate ID" id = "associateid" name="associateid" type="text" value="

//if(!empty($_POST['associateid'])){ 
//echo $_POST['associateid'];}?>" maxlength = '6'>
                                </div>
                              <div class="form-group">
                                    <input class="form-control" placeholder="Password" name="password" id="password" type="password" value="

//if(!empty($_POST['password'])){ 
//echo $_POST['password'];}?>">
                                </div>

 <div class="form-group">
                                    <input class="form-control" placeholder="Confirm Password" name="confirmpwd" type="password" value="">
                                </div>-->

<input type="submit" value="Register" class="btn btn-sm btn-primary"/> 
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

	if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) 
        { 
     
	 die("<div style='position:absolute;left:68%;top:47%;' class='col-sm-4 col-md-2'>
            <div class='alert alert-danger'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>
                    &times;</button>
                <strong>Error Message</strong>
                <hr class='message-inner-separator'>
                <p>Please enter a valid E-mail address</p>
            </div>
        </div>"); 
        }         
        // Ensure that the user has entered a non-empty password 
        
       if(empty($_POST['username'])) 
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
else 
        {
			
			$pattern = '/^[a-z]+([a-z0-9._]*)?[a-z0-9]+$/i';
if ( ! preg_match($pattern, $_POST['username']))
{
        die("<div style='position:absolute;left:68%;top:53%;' class='col-sm-4 col-md-2'>
            <div class='alert alert-danger'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>
                    &times;</button>
                <strong>Error Message</strong>
                <hr class='message-inner-separator'>
                <p>Username should contain only alphanumeric characters.</p>
            </div>
        </div>"); 
    }
//echo $_POST['fname'];	
		}	

		if(empty($_POST['fname'])) 
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
                <p>Please enter a first name</p>
            </div>
        </div>"); 
        }
		
		else  
        {
			
			$pattern = '/^[a-zA-Z]+$/';
if ( ! preg_match($pattern, $_POST['fname']))
{
        die("<div style='position:absolute;left:68%;top:53%;' class='col-sm-4 col-md-2'>
            <div class='alert alert-danger'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>
                    &times;</button>
                <strong>Error Message</strong>
                <hr class='message-inner-separator'>
                <p>First Name should contain only alphabets.</p>
            </div>
        </div>"); 
    }			
		}
if(empty($_POST['lname'])) 
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
                <p>Please enter a last name</p>
            </div>
        </div>"); 
        }
		else
        {
			
			$pattern = '/^[a-zA-Z]+$/';
if ( ! preg_match($pattern, $_POST['lname']))
{
        die("<div style='position:absolute;left:68%;top:53%;' class='col-sm-4 col-md-2'>
            <div class='alert alert-danger'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>
                    &times;</button>
                <strong>Error Message</strong>
                <hr class='message-inner-separator'>
                <p>Last Name should contain only alphabets.</p>
            </div>
        </div>"); 
    }			
		}
		
	/*	if(empty($_POST['associateid'])) 
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
                <p>Please enter an Associate ID</p>
            </div>
        </div>"); 
        } 		
else
        {
			
			$pattern = '/^[0-9]*$/';
if ( ! preg_match($pattern, $_POST['associateid']))
{
        die("<div style='position:absolute;left:68%;top:53%;' class='col-sm-4 col-md-2'>
            <div class='alert alert-danger'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>
                    &times;</button>
                <strong>Error Message</strong>
                <hr class='message-inner-separator'>
                <p>Associate ID should contain only numbers.</p>
            </div>
        </div>"); 
    }		

		}
		
		if(empty($_POST['password'])) 
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
		  
		$password= $_POST['password']; 
		$confirmpassword=$_POST['confirmpwd'];
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
	
		}*/
        // Make sure the user entered a valid E-Mail address 
        // filter_var is a useful PHP function for validating form input, see: 
        // http://us.php.net/manual/en/function.filter-var.php 
        // http://us.php.net/manual/en/filter.filters.php 
         
        // Now we perform the same type of check for the email address, in order
         // to ensure that it is unique. 
        $query = " 
            SELECT 
                1 
            FROM members 
            WHERE 
                email = :email 
        "; 
         
        $query_params = array( 
            ':email' => $_POST['email'] 
        ); 
         
        try 
        { 
            $stmt = $db->prepare($query); 
            $result = $stmt->execute($query_params); 
        } 
        catch(PDOException $ex) 
        { 
            die("Failed to run query: " . $ex->getMessage()); 
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
                <p>This E-mail address is already in use</p>
            </div>
        </div>"); 
        } 
         
         
        // We will use this SQL query to see whether the username entered by the
         // user is already in use.  A SELECT query is used to retrieve data from the database.
         // :username is a special token, we will substitute a real value in its place when
         // we execute the query. 
        $query = " 
            SELECT 
                1 
            FROM members 
            WHERE 
                username = :username 
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
             die("Failed to run query: " . $ex->getMessage()); 
        } 
         
        // The fetch() method returns an array representing the "next" row from 
        // the selected results, or false if there are no more rows to fetch. 
        $row = $stmt->fetch(); 
         
        // If a row was returned, then we know a matching username was found in 
        // the database already and we should not allow the user to continue. 
        if($row) 
        { 
            die("<div style='position:absolute;left:68%;top:53%;' class='col-sm-4 col-md-2'>
            <div class='alert alert-danger'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>
                    &times;</button>
                <strong>Error Message</strong>
                <hr class='message-inner-separator'>
                <p>This username is already in use</p>
            </div>
        </div>"); 
        } 
         
        // An INSERT query is used to add new rows to a database table. 
        // Again, we are using special tokens (technically called parameters) to
         // protect against SQL injection attacks. 
        
		
         
		
      // echo $query;
        // A salt is randomly generated here to protect again brute force attacks
         // and rainbow table attacks.  The following statement generates a hex 
        // representation of an 8 byte salt.  Representing this in hex provides 
        // no additional security, but makes it easier for humans to read. 
        // For more information: 
        // http://en.wikipedia.org/wiki/Salt_%28cryptography%29 
        // http://en.wikipedia.org/wiki/Brute-force_attack 
        // http://en.wikipedia.org/wiki/Rainbow_table 
       // $salt = dechex(mt_rand(0, 2147483647)) . dechex(mt_rand(0, 2147483647));
          
        // This hashes the password with the salt so that it can be stored securely
         // in your database.  The output of this next statement is a 64 byte hex
         // string representing the 32 byte sha256 hash of the password.  The original
         // password cannot be recovered from the hash.  For more information: 
        // http://en.wikipedia.org/wiki/Cryptographic_hash_function 
      //  $password = hash('sha256', $_POST['password'] . $salt); 
         
        // Next we hash the hash value 65536 more times.  The purpose of this is to
         // protect against brute force attacks.  Now an attacker must compute the hash 65537
         // times for each guess they make against a password, whereas if the password
         // were hashed only once the attacker would have been able to make 65537 different 
         // guesses in the same amount of time instead of only one. 
      //  for($round = 0; $round < 65536; $round++) 
       // { 
       //     $password = hash('sha256', $password . $salt); 
       // } 
         
        // Here we prepare our tokens for insertion into the SQL query.  We do not
         // store the original password; only the hashed version of it.  We do store
         // the salt (in its plaintext form; this is not a security risk). 
        
					require_once('databaseconnect.php');
       $query = " 
            INSERT INTO members ( 
                username, 
                email,
				
				reset,
				token				
            ) VALUES ( 
               '".$_POST['username']."', 
                '".$_POST['email']."' ,
				
				'Y',
				'0'
            ) 
        "; 
		
		$query_params = array( 
            ':username' => $_POST['username'], 
			':fname' => $_POST['fname'], 
			':lname' => $_POST['lname'], 
            ':email' => $_POST['email']
            	
        ); 
         
        try 
        { 
            // Execute the query to create the user 
            $stmt = $db->prepare($query); 
            $result = $stmt->execute($query_params); 
			
			ini_set("SMTP","ssl:smtp.gmail.com" );
			

// Please specify an SMTP Number 25 and 8889 are valid SMTP Ports.
ini_set("smtp_port","25");

// Please specify the return address to use
ini_set('sendmail_from', $_POST['email']);
$to      = "rseshathiri@gmail.com";
$subject = 'New Registration need token';
$message = $_POST['username'];
$headers = 'From:' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

//mail($to, $subject, $message, $headers);
        } 
        catch(PDOException $ex) 
        { 
            // Note: On a production website, you should not output $ex->getMessage().
             // It may provide an attacker with helpful information about your code. 
             die("Failed to run query: " . $ex->getMessage()); 
        } 
     //echo $query;
         
		 		
//$count1 = mysql_num_rows($result1);

        // This redirects the user back to the login page after they register 

		header("Location: login.php"); 
         
        // Calling die or exit after performing a redirect using the header function
         // is critical.  The rest of your PHP script will continue to execute and
         // will be sent to the user if you do not die or exit. 
        die("Redirecting to login.php"); 
    } 
     
?> 