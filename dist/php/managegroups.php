<?php
$action = $_REQUEST['action'];
$con=mysqli_connect("localhost","root","","upsdashboard");

// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

// Perform queries 


if($action == 'getgroupaccesslist')
{

$result=mysqli_query($con,"select * from groupaccesslist")or die(mysqli_connect_errno());
  // Fetch one and one row
  $arr=array();
  while ($row=mysqli_fetch_array($result))
    {
		$rowdata=array();
		array_push($rowdata,$row['id']);
		array_push($rowdata,$row['modulename']);
		array_push($rowdata,$row['accessname']);
		array_push($arr,$rowdata);
    }

echo json_encode($arr);
}

if($action == 'create')
{
$groupname = $_POST['groupname'];
$description = $_POST['description'];
$groupaccess=json_decode($_POST['groupaccess']);


$result=mysqli_query($con,"select * from groupdetails where groupname = '".$groupname."'");
	$rowcount=mysqli_num_rows($result);

	if($rowcount == 0)
	{
		
$result=mysqli_query($con,"INSERT INTO `groupdetails`(`groupname`, `description`) VALUES ('".$groupname."','".$description."')")or die(mysqli_connect_errno());


$result1=mysqli_query($con,"Select * from `groupdetails` order by id desc limit 1")or die(mysqli_connect_errno());
$row1=mysqli_fetch_array($result1);

$result1=mysqli_query($con,"Delete from `groupaccess` where groupid = '".$row1['id']."'")or die(mysqli_connect_errno());

if($groupaccess !='')
{
$insertlist = "";
$query = "INSERT INTO `groupaccess` (`groupid`, `groupaccessid`) VALUES";

for($i=0;$i<sizeof($groupaccess);$i++)
{
	if($insertlist !='')
	{
		$insertlist .=",";
	}
	$insertlist .= "('".$row1['id']."','".$groupaccess[$i]."')";
}
$query .= $insertlist;
//echo $query;
mysqli_query($con,$query)or die(mysqli_connect_errno());
}
echo '1';
}
else
{
echo '0';
}


}


if($action == 'getgroups')
{
$result=mysqli_query($con,"select * from groupdetails")or die(mysqli_connect_errno());
  // Fetch one and one row
  $arr=array();
while($row=mysqli_fetch_array($result))
{
		$rowdata=array();
		array_push($rowdata,$row['id']);
		array_push($rowdata,$row['groupname']);
		array_push($rowdata,$row['description']);
		array_push($arr,$rowdata);
}

echo json_encode($arr);
}

if($action == 'getgroupdata')
{
		$id = $_POST['id'];
$result=mysqli_query($con,"select * from groupdetails where id ='".$id."'")or die(mysqli_connect_errno());
  // Fetch one and one row
  $arr=array();
$row=mysqli_fetch_array($result);
		$rowdata=array();
		array_push($rowdata,$row['id']);
		array_push($rowdata,$row['groupname']);
		array_push($rowdata,$row['description']);
		
$result1=mysqli_query($con,"select * from groupaccess where groupid ='".$id."'")or die(mysqli_connect_errno());

	$rowcount1=mysqli_num_rows($result1);
if($rowcount1 > 0)
{
	$line=array();
while($row1=mysqli_fetch_array($result1))
{
	array_push($line,$row1['groupaccessid']);
}
}
else
{
	$line=array();
	array_push($line,'');
}
$result2=mysqli_query($con,"select * from groupaccesslist")or die(mysqli_connect_errno());
  // Fetch one and one row
	$rowcount2=mysqli_num_rows($result2);

 $access=array();

 while ($row2=mysqli_fetch_array($result2))
    {
		$rowdata2=array();
		array_push($rowdata2,$row2['id']);
		array_push($rowdata2,$row2['modulename']);
		array_push($rowdata2,$row2['accessname']);
		array_push($access,$rowdata2);
    }
array_push($arr,$rowdata);
	array_push($arr,$line);
array_push($arr,$access);
echo json_encode($arr);
}

if($action == 'update')
{
	$id = $_POST['id'];
$groupname = $_POST['groupname'];
$description = $_POST['description'];
$groupaccess=json_decode($_POST['groupaccess']);

$result=mysqli_query($con,"Update groupdetails set groupname = '".$groupname."', description = '".$description."' where id = '".$id."'")or die(mysqli_connect_errno());
//echo "Update groupdetails set groupname = '".$groupname."' and description = '".$description."' where id = '".$id."'";
$result1=mysqli_query($con,"Delete from `groupaccess` where groupid = '".$id."'")or die(mysqli_connect_errno());
$insertlist = "";
$query = "INSERT INTO `groupaccess` (`groupid`, `groupaccessid`) VALUES";

for($i=0;$i<sizeof($groupaccess);$i++)
{
	if($insertlist !='')
	{
		$insertlist .=",";
	}
	$insertlist .= "('".$id."','".$groupaccess[$i]."')";
}
$query .= $insertlist;
//echo $query;
mysqli_query($con,$query)or die(mysqli_connect_errno());
echo '1';
	
}
mysqli_close($con);

?>