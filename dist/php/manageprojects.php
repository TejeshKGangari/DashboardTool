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
$projectname = $_POST['projectname'];
$No_of_Resources = $_POST['No_of_Resources'];
$Current_Phase = $_POST['Current_Phase'];
$account_name = $_POST['account_name'];
$portfolio_name=$_POST['portfolio_name'];
$qeamanager = $_POST['qeamanager'];
$applicationname = $_POST['applicationname'];
$releasenumber = $_POST['releasenumber'];
$designinterface = $_POST['designinterface'];
$designdomain = $_POST['designdomain'];
$designproject = $_POST['designproject'];
$designtestsetfolder = $_POST['designtestsetfolder'];
$designtestset = $_POST['designtestset'];
$executioninterface = $_POST['executioninterface'];
$executiondomain = $_POST['executiondomain'];
$executionproject = $_POST['executionproject'];
$executiontestsetfolder = $_POST['executiontestsetfolder'];
$executiontestset = $_POST['executiontestset'];
$defectsinterface = $_POST['defectsinterface'];
$defectsdomain = $_POST['defectsdomain'];
$defectsproject = $_POST['defectsproject'];
$defectstestsetfolder = $_POST['defectstestsetfolder'];
$defectstestset = $_POST['defectstestset'];
$designserver = $_POST['designserver'];
$executionserver = $_POST['executionserver'];
$defectsserver = $_POST['defectsserver'];
$groups=json_decode($_POST['groups']);

$result=mysqli_query($con,"select * from projectdetails where projectname = '".$projectname."'");
	$rowcount=mysqli_num_rows($result);

	if($rowcount==0)
	{
mysqli_query($con,"INSERT INTO projectdetails (projectname,qeamanager,applicationname,releasenumber,designinterface,designfield1,designfield2,designfield3,designfield4,designfield5,executioninterface,executionfield1,executionfield2,executionfield3,executionfield4,executionfield5,defectsinterface,defectsfield1,defectsfield2,defectsfield3,defectsfield4,defectsfield5,portfolio_name,No_of_Resources,Current_Phase,account_name) 
VALUES ('".$projectname."','".$qeamanager."','".$applicationname."','".$releasenumber."','".$designinterface."','".$designdomain."','".$designproject."','".$designtestsetfolder."','".$designtestset."','".$designserver."','".$executioninterface."','".$executiondomain."','".$executionproject."','".$executiontestsetfolder."','".$executiontestset."','".$executionserver."','".$defectsinterface."','".$defectsdomain."','".$defectsproject."','".$defectstestsetfolder."','".$defectstestset."','".$defectsserver."','".$portfolio_name."','".$No_of_Resources."','".$Current_Phase."','".$account_name."')")or die(mysqli_error("Some technical glitch!!"));


$result1=mysqli_query($con,"Select * from `projectdetails` order by id desc limit 1")or die(mysqli_connect_errno());
$row1=mysqli_fetch_array($result1);

$result1=mysqli_query($con,"Delete from `projectgroups` where projectid = '".$row1['id']."'")or die(mysqli_connect_errno());

if(sizeof($groups)!='')
{
$insertlist = "";
$query = "INSERT INTO `projectgroups` (`projectid`, `groupid`) VALUES";

for($i=0;$i<sizeof($groups);$i++)
{
	if($insertlist !='')
	{
		$insertlist .=",";
	}
	$insertlist .= "('".$row1['id']."','".$groups[$i]."')";
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
if($action == 'getfieldinfo')
{

$result=mysqli_query($con,"select distinct domainname from qcdomains")or die(mysqli_connect_errno());
  // Fetch one and one row
  $arr=array();
  while ($row=mysqli_fetch_array($result))
    {
$rowdata=array();
		array_push($rowdata,$row['domainname']);
	}
	
	array_push($arr,$rowdata);

$result=mysqli_query($con,"select distinct projectname from qcprojects")or die(mysqli_connect_errno());
  // Fetch one and one row

  while ($row=mysqli_fetch_array($result))
    {
		$rowdata=array();
		array_push($rowdata,$row['projectname']);
	}
	array_push($arr,$rowdata);	

$result=mysqli_query($con,"select name, hierarchicalpath from qctestsetfolders")or die(mysqli_connect_errno());
  // Fetch one and one row
$line = array();
  while ($row=mysqli_fetch_array($result))
    {
		$rowdata=array();
		array_push($rowdata,$row['name']);
		array_push($rowdata,$row['hierarchicalpath']);
		array_push($line,$rowdata);
	}
	array_push($arr,$line);		
$result=mysqli_query($con,"select name, id from qctestset")or die(mysqli_connect_errno());
  // Fetch one and one row
$line = array();
  while ($row=mysqli_fetch_array($result))
    {
		$rowdata=array();
		array_push($rowdata,$row['id']);
		array_push($rowdata,$row['name']);
	array_push($line,$rowdata);
	}
	array_push($arr,$line);
	
	$result=mysqli_query($con,"select * from qcserver")or die(mysqli_connect_errno());
	
	$line = array();
  while ($row=mysqli_fetch_array($result))
    {
		$rowdata=array();
		array_push($rowdata,$row['servername']);
	array_push($line,$rowdata);
	}
	array_push($arr,$line);
	
	echo json_encode($arr);	
}


if($action == 'getprojects')
{
	
$result=mysqli_query($con,"select * from projectdetails")or die(mysqli_connect_errno());

  // Fetch one and one row
  $arr=array();
  while ($row=mysqli_fetch_array($result))
    {
		$rowdata=array();
		array_push($rowdata,$row['id']);
		array_push($rowdata,$row['projectname']);
		array_push($rowdata,$row['applicationname']);
		array_push($rowdata,$row['releasenumber']);
		array_push($arr,$rowdata);
    }

echo json_encode($arr);
}
if($action == 'getserver')
{
		
$result=mysqli_query($con,"select * from qcserver")or die(mysqli_connect_errno());
  // Fetch one and one row
  $arr=array();
  while ($row=mysqli_fetch_array($result))
    {
		$rowdata=array();
		array_push($rowdata,$row['servername']);
		array_push($arr,$rowdata);
    }

echo json_encode($arr);
	
}
if($action == 'getprojectinfo')
{
$id = $_POST['id'];	
$result=mysqli_query($con,"select * from projectdetails where id = '".$id."'")or die(mysqli_connect_errno());
  // Fetch one and one row
  $row=mysqli_fetch_array($result);
  $arr=array();
  	$rowdata=array();
		array_push($rowdata,$row['id']);
		
		array_push($rowdata,$row['projectname']);
		
		array_push($rowdata,$row['qeamanager']);
		array_push($rowdata,$row['applicationname']);
		array_push($rowdata,$row['releasenumber']);
		array_push($rowdata,$row['designinterface']);
		array_push($rowdata,$row['designfield1']);
		array_push($rowdata,$row['designfield2']);
		array_push($rowdata,$row['designfield3']);
		array_push($rowdata,$row['designfield4']);
		array_push($rowdata,$row['designfield5']);
		array_push($rowdata,$row['executioninterface']);
		array_push($rowdata,$row['executionfield1']);
		array_push($rowdata,$row['executionfield2']);
		array_push($rowdata,$row['executionfield3']);
		array_push($rowdata,$row['executionfield4']);
		array_push($rowdata,$row['executionfield5']);
		array_push($rowdata,$row['defectsinterface']);
		array_push($rowdata,$row['defectsfield1']);
		array_push($rowdata,$row['defectsfield2']);
		array_push($rowdata,$row['defectsfield3']);
		array_push($rowdata,$row['defectsfield4']);
		array_push($rowdata,$row['defectsfield5']);
		array_push($rowdata,$row['account_name']);
		array_push($rowdata,$row['portfolio_name']);
		array_push($rowdata,$row['Current_Phase']);
		array_push($rowdata,$row['No_of_Resources']);
		array_push($arr,$rowdata);
		
	$result1=mysqli_query($con,"select * from projectgroups where projectid ='".$id."'")or die(mysqli_connect_errno());

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
$account_name=	$_POST['account_name'];
$projectname = $_POST['projectname'];
$Current_Phase = $_POST['Current_Phase'];
$No_of_Resources = $_POST['No_of_Resources'];
$portfolio_name=$_POST['portfolio_name'];
$qeamanager = $_POST['qeamanager'];
$applicationname = $_POST['applicationname'];
$releasenumber = $_POST['releasenumber'];
$designinterface = $_POST['designinterface'];
$designdomain = $_POST['designdomain'];
$designproject = $_POST['designproject'];
$designtestsetfolder = $_POST['designtestsetfolder'];
$designtestset = $_POST['designtestset'];
$executioninterface = $_POST['executioninterface'];
$executiondomain = $_POST['executiondomain'];
$executionproject = $_POST['executionproject'];
$executiontestsetfolder = $_POST['executiontestsetfolder'];
$executiontestset = $_POST['executiontestset'];
$defectsinterface = $_POST['defectsinterface'];
$defectsdomain = $_POST['defectsdomain'];
$defectsproject = $_POST['defectsproject'];
$defectstestsetfolder = $_POST['defectstestsetfolder'];
$defectstestset = $_POST['defectstestset'];
$designserver = $_POST['designserver'];
$executionserver = $_POST['executionserver'];
$defectsserver = $_POST['defectsserver'];
$groups=json_decode($_POST['groups']);$id = $_POST['id'];
$groups=json_decode($_POST['groups']);
$result=mysqli_query($con,"UPDATE projectdetails SET portfolio_name='".$portfolio_name."',account_name='".$account_name."',No_of_Resources='".$No_of_Resources."',Current_Phase='".$Current_Phase."',projectname='".$projectname."',qeamanager='".$qeamanager."',applicationname='".$applicationname."',releasenumber='".$releasenumber."',designinterface='".$designinterface."',designfield1='".$designdomain."',designfield2='".$designproject."',designfield3='".$designtestsetfolder."',designfield4='".$designtestset."',designfield5='".$designserver."',executioninterface='".$executioninterface."',executionfield1='".$executiondomain."',executionfield2='".$executionproject."',executionfield3='".$executiontestsetfolder."',executionfield4='".$executiontestset."',executionfield5='".$executionserver."',defectsinterface='".$defectsinterface."',defectsfield1='".$defectsdomain."',defectsfield2='".$defectsproject."',defectsfield3='".$defectstestsetfolder."',defectsfield4='".$defectstestset."',defectsfield5='".$defectsserver."' WHERE id='".$id."'")or die(mysqli_connect_errno());

$result1=mysqli_query($con,"Delete from `projectgroups` where projectid = '".$id."'")or die(mysqli_connect_errno());

if(sizeof($groups) >0)
{
$insertlist = "";
//echo $query;
$query = "INSERT INTO `projectgroups` (`projectid`, `groupid`) VALUES";

for($i=0;$i<sizeof($groups);$i++)
{
	if($insertlist !='')
	{
		$insertlist .=",";
	}
	$insertlist .= "('".$id."','".$groups[$i]."')";
}

$query .= $insertlist;

mysqli_query($con,$query)or die(mysqli_connect_errno());

}
echo '1';
}

if($action == 'createserver')
{
	$server = $_POST['server'];
	$result = mysqli_query($con,"select * from qcserver where servername ='".$server."'")or die(mysqli_connect_errno());
	$rowcount=mysqli_num_rows($result);
	
	if($rowcount == 0)
	{
	mysqli_query($con,"Insert into qcserver(servername) values ('".$server."')")or die(mysqli_connect_errno());
	echo '1';
	}
	else
	{
	echo '0';	
	}
}


if($action = 'serverupdate')
{
	
	
}

mysqli_close($con);

?>