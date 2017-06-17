<?php
$action = $_REQUEST['action'];
$con=mysqli_connect("localhost","root","","upsdashboard");

// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

// Perform queries 


if($action == 'create')
{
$username = $_POST['username'];
$active = $_POST['active'];
if($active == 'Active')
	{
		$active = 'Y';
	}
else
	{
		$active = 'N';
	}
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$emailaddress = $_POST['emailaddress'];
$groups=json_decode($_POST['groups']);

$result=mysqli_query($con,"select * from users where username = '".$username."'");
	$rowcount=mysqli_num_rows($result);

	if($rowcount==0)
	{
mysqli_query($con,"INSERT INTO users (username,email,firstname,lastname,active,created_on,updated_on) 
VALUES ('".$username."','".$emailaddress."','".$firstname."','".$lastname."','".$active."',now(),now())")or die(mysqli_error("Some technical glitch!!"));
$token = rand(1000000000,100000000000000);
mysqli_query($con,"INSERT INTO members(username, email, reset, token) VALUES ('".$username."','".$emailaddress."', 'Y', '".$token."')")or die(mysqli_error("Some technical glitch!!"));

$result1=mysqli_query($con,"Select * from `users` order by id desc limit 1")or die(mysqli_connect_errno());
$row1=mysqli_fetch_array($result1);

$result1=mysqli_query($con,"Delete from `usergroups` where groupid = '".$row1['id']."'")or die(mysqli_connect_errno());
$insertlist = "";

for($i=0;$i<sizeof($groups);$i++)
{
	if($insertlist !='')
	{
		$insertlist .=",";
	}
	$insertlist .= "('".$row1['id']."','".$groups[$i]."')";
}
if($insertlist!='')
{
$query = "INSERT INTO `usergroups` (`userid`, `groupid`) VALUES";
$query .= $insertlist;
mysqli_query($con,$query)or die(mysqli_connect_errno());
}
//echo $query;
$data = array('Success',$token);
echo json_encode($data);	
	}
	else
	{
	$data = array('failure');
echo json_encode($data);
	}
}
if($action == 'getusers')
{
	
$result=mysqli_query($con,"select * from users")or die(mysqli_connect_errno());
  // Fetch one and one row
  $arr=array();
  while ($row=mysqli_fetch_array($result))
    {
		$rowdata=array();
		array_push($rowdata,$row['id']);
		array_push($rowdata,$row['username']);
		array_push($rowdata,$row['firstname']);
		array_push($rowdata,$row['lastname']);
		if($row['active']=='Y')
		{
		array_push($rowdata,'Active');
		}
		else
		{
		array_push($rowdata,'In-active');	
		}
		array_push($arr,$rowdata);
    }

echo json_encode($arr);
}

if($action == 'getuserinfo')
{
$id = $_POST['id'];	
$result=mysqli_query($con,"select * from users where id = '".$id."'")or die(mysqli_connect_errno());
  // Fetch one and one row
  $row=mysqli_fetch_array($result);
  $arr=array();
  	$rowdata=array();
		array_push($rowdata,$row['id']);
		array_push($rowdata,$row['username']);
		array_push($rowdata,$row['firstname']);
		array_push($rowdata,$row['lastname']);
		array_push($rowdata,$row['email']);
		if($row['active']=='Y')
		{
		array_push($rowdata,'Active');
		}
		else
		{
		array_push($rowdata,'In-active');	
		}
		array_push($arr,$rowdata);
		$result1=mysqli_query($con,"select * from usergroups where userid ='".$id."'")or die(mysqli_connect_errno());

	$rowcount1=mysqli_num_rows($result1);
if($rowcount1 > 0)
{
	$line=array();
while($row1=mysqli_fetch_array($result1))
{
	array_push($line,$row1['groupid']);
}
}
else
{
	$line=array();
	array_push($line,'');
}
		array_push($arr,$line);		
echo json_encode($arr);
}

if($action == 'update')
{

$id = $_POST['id'];

$username = $_POST['username'];
$active = $_POST['active'];

if($active == 'Active')
	{
		$active = 'Y';
	}
else
	{
		$active = 'N';
	}
	
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$emailaddress = $_POST['emailaddress'];
$groups=json_decode($_POST['groups']);

$result=mysqli_query($con,"UPDATE users SET username='".$username."',email='".$emailaddress."',firstname='".$firstname."',lastname='".$lastname."',active='".$active."',updated_on=now() WHERE id='".$id."'")or die(mysqli_connect_errno());

$result1=mysqli_query($con,"Delete from `usergroups` where userid = '".$id."'")or die(mysqli_connect_errno());
$insertlist = "";
$query = "INSERT INTO `usergroups` (`userid`, `groupid`) VALUES";

for($i=0;$i<sizeof($groups);$i++)
{
	if($insertlist !='')
	{
		$insertlist .=",";
	}
	$insertlist .= "('".$id."','".$groups[$i]."')";
}
$query .= $insertlist;
//echo $query;
mysqli_query($con,$query)or die(mysqli_connect_errno());
$data = array('Success');
echo json_encode($data);	

}

if($action == 'tag')
{
$userid = $_POST['id'];
$token = rand(1000000000,100000000000000);
$query1 = "select * from users where id ='".$userid."'";
$result1 = mysqli_query($con,$query1)or die(mysql_error());
$row1=mysqli_fetch_array($result1);
$query = "Update members set token = '".$token."', reset = 'Y',password ='', salt ='' where username ='".$row1['username']."'" ;
//echo $query;
ini_set("SMTP","mail.cognizant.com");

// Please specify an SMTP Number 25 and 8889 are valid SMTP Ports.
ini_set("smtp_port","8889");

// Please specify the return address to use
ini_set('sendmail_from', 'seshathiri.ranganathan@cognizant.com');
$to      = $row1['email'];
$subject = 'New Login details: Login with below token';
$message = $token;
$headers = 'From:' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

//mail($to, $subject, $message, $headers);

$result = mysqli_query($con,$query)or die("Some technical glitch. Please contact Administrator");
echo "New Token ID:".$token;
}
mysqli_close($con);

?>