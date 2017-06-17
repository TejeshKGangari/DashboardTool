<?php
$action = $_REQUEST['action'];
$con=mysqli_connect("localhost","UPSDASHBOARD","BPAVSuctKJMtEV7G","upsdashboard");

// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

// Perform queries 


if($action == 'create')
{
$dashboardname = $_POST['dashboardname'];
$projectname = $_POST['projectname'];
$template = $_POST['template'];
$groups=json_decode($_POST['groups']);

mysqli_query($con,"INSERT INTO dashboarddetails (dashboardname,projectnameid,templateid) 
VALUES ('".$dashboardname."','".$projectname."','".$template."')")or die(mysqli_error("Some technical glitch!!"));



$result1=mysqli_query($con,"Select * from `dashboarddetails` order by id desc limit 1")or die(mysqli_connect_errno());
$row1=mysqli_fetch_array($result1);

$result1=mysqli_query($con,"Delete from `dashboardgroups` where dashboardid = '".$row1['id']."'")or die(mysqli_connect_errno());
$insertlist = "";
$query = "INSERT INTO `dashboardgroups` (`dashboardid`, `groupid`) VALUES";

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



$result = mysqli_query($con,"select * from  dashboarddetails where id = '".$row1['id']."'")or die(mysqli_error("Some technical glitch!!"));
$row=mysqli_fetch_array($result);
$arr = array();
array_push($arr,$row['id']);
array_push($arr,$dashboardname." created successfully");
echo json_encode($arr);
}

if($action == 'gettemplate')
{
	
$result=mysqli_query($con,"select template.id, template.dashboardname, template.templatename, projectdetails.projectname from projectdetails join (SELECT dashboarddetails.id, dashboardname, projectnameid, templatename FROM `dashboarddetails` join `templatelist`  where dashboarddetails.templateid = templatelist.id) template where template.projectnameid = projectdetails.id")or die(mysqli_connect_errno());
  // Fetch one and one row
  $arr=array();
  while ($row=mysqli_fetch_array($result))
    {
		$rowdata=array();
		array_push($rowdata,$row['id']);
		array_push($rowdata,$row['dashboardname']);
		array_push($rowdata,$row['templatename']);
		array_push($rowdata,$row['projectname']);
		array_push($arr,$rowdata);
    }

echo json_encode($arr);
}

if($action == 'templatedetails')
{
$template = $_REQUEST['templateid'];	
$result=mysqli_query($con,"select * from templatelist where id='".$template."'")or die(mysqli_connect_errno());
  // Fetch one and one row
  $arr=array();
  while ($row=mysqli_fetch_array($result))
    {
		$rowdata=array();
		array_push($rowdata,$row['id']);
		array_push($rowdata,$row['templatedetails']);
		array_push($rowdata,$row['templatename']);
		array_push($arr,$rowdata);
    }

echo json_encode($arr);
}

if($action == 'querydetails')
{
$result=mysqli_query($con,"select * from querydetails")or die(mysqli_connect_errno());
  // Fetch one and one row
  $arr=array();
  while ($row=mysqli_fetch_array($result))
    {
		array_push($arr,$row['queryname']);
    }

echo json_encode($arr);
	
}

if($action == 'projectdetails')
{
$result=mysqli_query($con,"select * from projectdetails")or die(mysqli_connect_errno());
  // Fetch one and one row
  $arr=array();
  while ($row=mysqli_fetch_array($result))
    {
		$rowlabel = array();
		array_push($rowlabel,$row['id']);
		array_push($rowlabel,$row['projectname']);
		array_push($arr,$rowlabel);
	}

echo json_encode($arr);
	
}


if($action == 'queryvalues')
{
	$searchquery = $_REQUEST['searchquery']; 
	
	$result=mysqli_query($con,$searchquery)or die(mysqli_connect_errno());
  // Fetch one and one row
  $fieldcount=mysqli_num_fields($result);
  //echo $fieldcount;
  
  $arr=array();
  while ($row=mysqli_fetch_array($result))
    {
		$rowlabel = array();
		for($i=0;$i<$fieldcount;$i++)
		{
		array_push($rowlabel,$row[$i]);
		}
		array_push($arr,$rowlabel);
    }

echo json_encode($arr);
	
}

if($action == 'querysave')
{
	$queryname = $_POST['queryname'];
	$chartname = $_POST['chartname'];
	$searchquery = $_POST['searchquery'];
	$charttype = $_POST['charttype'];
	$ucl = $_POST['ucl'];
	$lcl = $_POST['lcl'];
	$notes = $_POST['notes'];
	$dashboard = $_POST['dashboard'];
	$project = $_POST['projectname'];
	$sectionid = $_POST['sectionid'];
	$type = $_POST['type'];

	$xaxis = $_POST['xaxis'];
	$yaxis = $_POST['yaxis'];
	
	
	$result=mysqli_query($con,"select * from querydetails where dashboardid = '".$dashboard."' and projectid = '".$project."' and sectionid = '".$sectionid."'");
	$rowcount=mysqli_num_rows($result);
 
	if($rowcount==0)
	{
	mysqli_query($con,"INSERT INTO querydetails (queryname,chartname,searchquery,charttype,ucl,lcl,xaxis, yaxis,notes,dashboardid,projectid,sectionid,type) 
VALUES ('".$queryname."','".$chartname."','".$searchquery."','".$charttype."','".$ucl."','".$lcl."','".$xaxis."','".$yaxis."','".$notes."','".$dashboard."','".$project."','".$sectionid."','".$type."')")or die(mysqli_error("Some technical glitch!!"));
echo $queryname." created successfully";		
	}
	else
	{
		
		mysqli_query($con,"Update querydetails set queryname ='".$queryname."', chartname='".$chartname."', searchquery='".$searchquery."', charttype ='".$charttype."',ucl='".$ucl."', lcl='".$lcl."',xaxis='".$xaxis."',yaxis='".$yaxis."',notes='".$notes."', type='".$type."' where dashboardid ='".$dashboard."' and projectid ='".$project."' and sectionid='".$sectionid."'");
	
	echo $queryname." updated successfully";		
	}

	
}

if($action == 'celldetails')
{
	$cell = $_POST['cell'];
	$dashboard = $_POST['dashboard'];
	$project = $_POST['projectname'];
	
	$result=mysqli_query($con,"select * from querydetails where sectionid ='".$cell."' and dashboardid ='".$dashboard."'and projectid ='".$project."' limit 1")or die(mysqli_connect_errno());

$row=mysqli_fetch_array($result);
if($row['type']=='query')
{
$result1=mysqli_query($con,$row['searchquery'])or die(mysqli_connect_errno());
$fieldcount=mysqli_num_fields($result1);

$rowname = array();
		for($i=0;$i<$fieldcount;$i++)
		{	
		array_push($rowname,mysqli_fetch_field_direct($result1,$i));
		}

//echo $rowname;
		
//$arrayfield = array();
//while ($fieldinfo=mysqli_fetch_field($result1))
//    {
//		array_push($arrayfield,$fieldinfo->name);
//	}

$arr=array();
  while ($row1=mysqli_fetch_array($result1))
    {
		$rowlabel = array();
		for($i=0;$i<$fieldcount;$i++)
		{
		array_push($rowlabel,$row1[$i]);
		}
		array_push($arr,$rowlabel);
    }
$arrayvalue=array();
	array_push($arrayvalue, $row['chartname']);
	array_push($arrayvalue, $arr);
	array_push($arrayvalue, $row['charttype']);
	array_push($arrayvalue, $row['xaxis']);
	array_push($arrayvalue, $row['yaxis']);
	array_push($arrayvalue, $row['ucl']);
	array_push($arrayvalue, $row['lcl']);
	array_push($arrayvalue, $rowname);
	array_push($arrayvalue, 'query');
echo json_encode($arrayvalue);

}
else
{
	
$arr[] = explode(",",$row['searchquery']);
$arrayvalue=array();
array_push($arrayvalue, $row['chartname']);
	array_push($arrayvalue, $arr[0]);
	array_push($arrayvalue, $row['charttype']);
	array_push($arrayvalue, $row['xaxis']);
	array_push($arrayvalue, $row['yaxis']);
	array_push($arrayvalue, $row['ucl']);
	array_push($arrayvalue, $row['lcl']);
	array_push($arrayvalue, '');
	array_push($arrayvalue, 'parameter');
echo json_encode($arrayvalue);
}

}
if($action == 'getdashboardtemplate')
{
	$dashboard = $_POST['dashboard'];
	$result=mysqli_query($con,"select templatedetails, dashboardname, projectname,dashboard.dashboardid, projectnameid from (SELECT dashboarddetails.id dashboardid, templateid, templatedetails, projectnameid, dashboardname FROM `templatelist` join dashboarddetails on templatelist.id = dashboarddetails.templateid where dashboarddetails.id = '".$dashboard."')dashboard join projectdetails on projectdetails.id = dashboard.projectnameid")or die(mysqli_connect_errno());
$row=mysqli_fetch_array($result);
$rowdata=array();

		array_push($rowdata,$row['projectname']);
		array_push($rowdata,$row['projectnameid']);
		array_push($rowdata,$row['dashboardname']);
		array_push($rowdata,$row['dashboardid']);
		array_push($rowdata,$row['templatedetails']);
		
			$result=mysqli_query($con,"select * from dashboardgroups where dashboardid = '".$row['dashboardid']."'")or die(mysqli_connect_errno());
$line=array();
			while($row=mysqli_fetch_array($result))
{
array_push($line,$row['groupid']);
}
		array_push($rowdata,$line);
echo json_encode($rowdata);
}
if($action == 'getdashboardgraphdetails')
{
	$project = $_POST['project'];
	$dashboard = $_POST['dashboard'];
	$result=mysqli_query($con,"select * from querydetails where dashboardid = '".$dashboard."' and projectid = '".$project."'")or die(mysqli_connect_errno());

	//echo "select * from querydetails where dashboardid = '".$dashboard."' and projectid = '".$project."'";
		$line = array();

	while ($row=mysqli_fetch_array($result))
    {
		array_push($line,$row['sectionid']);
	/*	array_push($line,$row['chartname']);
		array_push($line,$row['charttype']);
			$result1=mysqli_query($con,$row['searchquery'])or die(mysqli_connect_errno());
			$fieldcount=mysqli_num_fields($result1);
		
		$arr=array();
			while ($row1=mysqli_fetch_array($result1))
			{
				$rowlabel = array();
				for($i=0;$i<$fieldcount;$i++)
				{
				array_push($rowlabel,$row1[$i]);
				}
				array_push($arr,$rowlabel);
			
			}		
			array_push($line,$arr);*/
	}
echo json_encode($line);
}

if($action == 'update')
{
$dashboardname = $_POST['dashboardname'];
$projectname = $_POST['projectname'];
$template = $_POST['template'];
$id = $_POST['id'];
$groups=json_decode($_POST['groups']);

mysqli_query($con,"Update dashboarddetails set dashboardname = '".$dashboardname."', projectnameid = '".$projectname."',templateid = '".$template."' where id = '".$id."'"); 

$result1=mysqli_query($con,"Delete from `dashboardgroups` where dashboardid = '".$id."'")or die(mysqli_connect_errno());
$insertlist = "";
$query = "INSERT INTO `dashboardgroups` (`dashboardid`, `groupid`) VALUES";

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


echo '1';
}
mysqli_close($con);

?>