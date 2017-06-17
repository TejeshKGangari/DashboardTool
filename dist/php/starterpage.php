<?php
session_start();
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
	$result1=mysqli_query($con,"select distinct id, modulename, accessname from groupaccesslist join (select groupaccessid from groupaccess join (select groupid from users join usergroups where users.id = usergroups.userid and username = '".$_SESSION['user']['username']."')groupidlist where groupaccess.groupid = groupidlist.groupid) groupaccessidlist where groupaccessidlist.groupaccessid = groupaccesslist.id")or die(mysqli_connect_errno());
			$arr=array();
		while ($row=mysqli_fetch_array($result1))
		{	
		$rowdata=array();
		array_push($rowdata,$row['modulename']);
		array_push($rowdata,$row['accessname']);
		array_push($arr,$rowdata);
		}
	
		

echo json_encode($arr);
}
mysqli_close($con);

?>