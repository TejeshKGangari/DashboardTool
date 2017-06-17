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
$dashboardname = $_POST['dashboardname'];
$account_name = $_POST['account_name'];
$portfolio_name=$_POST['portfolio_name'];
$projectname = $_POST['projectname'];
$template = $_POST['template'];
$groups=json_decode($_POST['groups']);

mysqli_query($con,"INSERT INTO dashboarddetails (dashboardname,projectnameid,templateid,portfolio_name,account_name) 
VALUES ('".$dashboardname."','".$projectname."','".$template."','".$portfolio_name."','".$account_name."')")or die(mysqli_error("Some technical glitch!!"));



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
	
$result=mysqli_query($con,"select template.id, template.dashboardname, template.templatename, template.portfolio_name, projectdetails.projectname from projectdetails Right outer join (SELECT dashboarddetails.id, dashboardname,portfolio_name, projectnameid, templatename FROM `dashboarddetails` join `templatelist`  where dashboarddetails.templateid = templatelist.id) template on template.projectnameid = projectdetails.id")or die(mysqli_connect_errno());
  // Fetch one and one row
  $arr=array();
  while ($row=mysqli_fetch_array($result))
    {
		$rowdata=array();
		array_push($rowdata,$row['id']);
		array_push($rowdata,$row['dashboardname']);
		array_push($rowdata,$row['templatename']);
		array_push($rowdata,$row['portfolio_name']);
		array_push($rowdata,$row['projectname']);
		array_push($arr,$rowdata);
    }

echo json_encode($arr);
}
if($action == 'admincheck')
{
	$admin=mysqli_query($con,"select groupid from users join usergroups where users.id = usergroups.userid and username ='".$_SESSION['user']['username']."'");
	$arr=array();
	 while ($row=mysqli_fetch_array($admin))
    {
		$rowdata=array();
		array_push($rowdata,$row['groupid']);
		
	}
	 array_push($arr,$rowdata);
	echo json_encode($arr);
}


if($action == 'gettemplate1')
{
	$result=mysqli_query($con,"SELECT projectnameid,projectname, dashboarddetails.id, No_of_Resources, Current_Phase
FROM `dashboarddetails` 
JOIN `projectdetails` 
WHERE dashboarddetails.projectnameid = projectdetails.id") or die(mysqli_connect_errno());
  // Fetch one and one row
  $arr=array();
  
  while ($row=mysqli_fetch_array($result))
    {
		$rowdata=array();
		array_push($rowdata,$row['projectname']);
		array_push($rowdata,$row['id']);
		array_push($rowdata,$row['Current_Phase']);
		array_push($rowdata,$row['No_of_Resources']);
		array_push($rowdata,$row['projectnameid']);
		$projectid = $row['projectnameid'];	
        $result1=mysqli_query($con,"select count(*) count from tfsdefects where projectid ='".$projectid."'")or die(mysqli_connect_errno());
        while($row1=mysqli_fetch_array($result1))
        {
		array_push($rowdata,$row1['count']);
         }	
        $result2=mysqli_query($con,"select count(*) countnon from tfsdefects where priority <> '04 Non-defect' AND projectid ='".$projectid."'")or die(mysqli_connect_errno()); 
        while($row2=mysqli_fetch_array($result2))
        {	   
		   array_push($rowdata,$row2['countnon']);
        }
        $result3=mysqli_query($con,"SELECT count( * ) count FROM `qctestinstances` WHERE STATUS = 'Passed' AND projectid ='".$projectid."'")or die(mysqli_connect_errno()); 
        while($row3=mysqli_fetch_array($result3))
        {	   
		   array_push($rowdata,$row3['count']);
        } 
        $result3=mysqli_query($con,"SELECT count( * ) count FROM `qctestinstances` WHERE projectid ='".$projectid."'")or die(mysqli_connect_errno()); 
        while($row3=mysqli_fetch_array($result3))
        {	   
		   array_push($rowdata,$row3['count']);
        } 		
		 $result3=mysqli_query($con,"SELECT count( * ) count FROM `qctestinstances` WHERE (STATUS = 'Passed' or Status = 'Failed' )AND	projectid ='".$projectid."'")or die(mysqli_connect_errno()); 
        while($row3=mysqli_fetch_array($result3))
        {	   
		   array_push($rowdata,$row3['count']);
        } 
		$result3=mysqli_query($con,"SELECT count( * ) count FROM `qctestinstances` WHERE testinstance = 1 AND	projectid ='".$projectid."'")or die(mysqli_connect_errno()); 
        while($row3=mysqli_fetch_array($result3))
        {	   
		   array_push($rowdata,$row3['count']);
        } 
		$result3=mysqli_query($con,"SELECT execdate, COUNT( * ) count FROM qctestinstances WHERE projectid = '".$projectid."' GROUP BY execdate") or die(mysqli_connect_errno());
        while($row3=mysqli_fetch_array($result3))
        {	   
		   array_push($rowdata,$row3['count']);
        } 
		$result3=mysqli_query($con,"SELECT execdate, COUNT( * ) count FROM qctestinstances WHERE projectid = '".$projectid."' GROUP BY execdate") or die(mysqli_connect_errno());
        while($row3=mysqli_fetch_array($result3))
        {	   
		   array_push($rowdata,$row3['count']);
        } 
       /*    $result3=mysqli_query($con,"  SELECT CAST( execdate AS DATE ) edate FROM  `qctestinstances` WHERE projectid='".$projectid."' GROUP BY CAST( execdate AS DATE )") or die(mysqli_connect_errno());
        while($row3=mysqli_fetch_array($result3))
        {	   
		  
		   array_push($rowdata,$row3['edate']);
        }  
		 $result3=mysqli_query($con,"  SELECT CAST( planschedulingdate AS DATE ) pdate FROM  `qctestinstances` WHERE projectid='".$projectid."' GROUP BY CAST( planschedulingdate AS DATE )") or die(mysqli_connect_errno());
        while($row3=mysqli_fetch_array($result3))
        {	   
		  
		   array_push($rowdata,$row3['pdate']);
        }   */
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
$result=mysqli_query($con,"select distinct queryname from querydetails")or die(mysqli_connect_errno());
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
        //$data[] =$row['projectname'];
		array_push($arr,$rowlabel);
	}

echo json_encode($arr);
	
}

if($action == 'accountdetails')
{
$result=mysqli_query($con,"select distinct account_name from projectdetails")or die(mysqli_connect_errno());
  // Fetch one and one row
  $arr=array();
  while ($row=mysqli_fetch_array($result))
    {
		$rowlabel = array();
		
		array_push($rowlabel,$row['account_name']);

		array_push($arr,$rowlabel);
	}

echo json_encode($arr);
	
}


if($action == 'portfoliodetails')
{
$result=mysqli_query($con,"select distinct portfolio_name from projectdetails")or die(mysqli_connect_errno());
  // Fetch one and one row
  $arr=array();
  while ($row=mysqli_fetch_array($result))
    {
		$rowlabel = array();
		//array_push($rowlabel,$row['id']);
		array_push($rowlabel,$row['portfolio_name']);
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
	
	//$searchquery=htmlspecialchars($searchquery);
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
	
	 
	//echo "dasd".$dashboard."sectionid =".$sectionid."projectid =".$project."queryname=".$queryname."chartname=".$chartname."searchquery=".$searchquery."charttype=".$charttype;
	
	$result=mysqli_query($con,"select * from querydetails where dashboardid = '".$dashboard."'  and sectionid = '".$sectionid."'  and projectid = '".$project."'");
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
	
	$result=mysqli_query($con,"select * from querydetails where sectionid ='".$cell."' and dashboardid ='".$dashboard."' limit 1")or die(mysqli_connect_errno());

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
	array_push($arrayvalue, $row['notes']);
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
	array_push($arrayvalue, $row['notes']);
echo json_encode($arrayvalue);
}

}

if($action == 'getprojectdetails')
{
$projectid = $_POST['project'];	
$result=mysqli_query($con,"select count(*) count from tfsdefects where projectid ='".$projectid."'")or die(mysqli_connect_errno());
  // Fetch one and one row
  $arr=array();
   while($row=mysqli_fetch_array($result))
   {
		$rowdata=array();
		array_push($rowdata,$row['count']);
   }
		array_push($arr,$rowdata);
		
		
		
  //total defects
  $result1=mysqli_query($con,"select count(*) countnon from tfsdefects where priority <> '04 Non-defect' AND projectid ='".$projectid."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['countnon']);
   }
		array_push($arr,$rowdata1);
		
		
	$result1=mysqli_query($con,"SELECT count( * ) count FROM `qctestinstances` WHERE STATUS = 'Passed' AND projectid ='".$projectid."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['count']);
   }
		array_push($arr,$rowdata1);	
		
	//no of testcases executed
	$result1=mysqli_query($con,"SELECT count( * ) count FROM `qctestinstances` WHERE projectid ='".$projectid."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['count']);
   }
		array_push($arr,$rowdata1);		

	$result1=mysqli_query($con,"SELECT count( * ) count FROM `qctestinstances` WHERE (STATUS = 'Passed' or Status = 'Failed' )AND	projectid ='".$projectid."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['count']);
   }
		array_push($arr,$rowdata1);			
		
	//testcases passed during first run	
	$result1=mysqli_query($con,"SELECT count( * ) count FROM `qctestinstances` WHERE testinstance = 1 AND	projectid ='".$projectid."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['count']);
   }
		array_push($arr,$rowdata1);			
		//execution per day
		$result1=mysqli_query($con,"SELECT  COUNT( * ) count FROM qctestinstances WHERE projectid = '".$projectid."' GROUP BY execdate") or die(mysqli_connect_errno());
		$ave =0;
		$i=0;
		while($row1=mysqli_fetch_array($result1))
   {	   
       
        $ave=$ave+$row1['count'];
		 $i=$i+1;
   }
   $ave=$ave/$i;
        $rowdata1=array();
		array_push($rowdata1,$ave);
		array_push($arr,$rowdata1);
		
		$result1=mysqli_query($con,"SELECT projectname FROM `projectdetails` WHERE id ='".$projectid."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['projectname']);
   }
		array_push($arr,$rowdata1);		
		
 		//data[8]
		  $result1=mysqli_query($con,"SELECT count(*) count FROM `tfsdefects` WHERE severity='02 High (Impacts most customers)' AND projectid ='".$projectid."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['count']);
   }
		array_push($arr,$rowdata1);
//data[9]
		$result1=mysqli_query($con,"SELECT count(*) count FROM `tfsdefects` WHERE severity='04 Low (Impacts few customers)'AND projectid ='".$projectid."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['count']);
   }
		array_push($arr,$rowdata1);
		//data[10]
		 $result1=mysqli_query($con,"SELECT count(*) count FROM `tfsdefects` WHERE severity='03 Medium (Impacts some customers)'AND projectid ='".$projectid."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['count']);
   }
		array_push($arr,$rowdata1);
	//data[11]
	$result1=mysqli_query($con,"SELECT Count(*) count from `tfsdefects` WHERE projectid ='".$projectid."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['count']);
   }
		array_push($arr,$rowdata1);
		 //data[12]
		$result1=mysqli_query($con,"select count(*) count from `tfsdefects` where status ='reopened'AND projectid ='".$projectid."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['count']);
   }
		array_push($arr,$rowdata1);
		//data[13]
		$result1=mysqli_query($con,"select count(*) count from `tfsdefects` where status ='closed' AND projectid ='".$projectid."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['count']);
   }
		array_push($arr,$rowdata1);
		
		
echo json_encode($arr);
}


if($action == 'getportfoliodetails')
{
$portfolio_name = $_POST['project'];	
$result=mysqli_query($con,"select count(*) count from tfsdefects where portfolio_name ='".$portfolio_name."'")or die(mysqli_connect_errno());
  // Fetch one and one row
  $arr=array();
   while($row=mysqli_fetch_array($result))
   {
		$rowdata=array();
		array_push($rowdata,$row['count']);
   }
		array_push($arr,$rowdata);
  
  $result1=mysqli_query($con,"select count(*) countnon from tfsdefects where priority <> '04 Non-defect' AND portfolio_name ='".$portfolio_name."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['countnon']);
   }
		array_push($arr,$rowdata1);
		
		
	$result1=mysqli_query($con,"SELECT count( * ) count FROM `qctestinstances` WHERE STATUS = 'Passed' AND portfolio_name ='".$portfolio_name."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['count']);
   }
		array_push($arr,$rowdata1);	
		
	$result1=mysqli_query($con,"SELECT count( * ) count FROM `qctestinstances` WHERE portfolio_name ='".$portfolio_name."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['count']);
   }
		array_push($arr,$rowdata1);		

	$result1=mysqli_query($con,"SELECT count( * ) count FROM `qctestinstances` WHERE (STATUS = 'Passed' or Status = 'Failed' ) AND	portfolio_name ='".$portfolio_name."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['count']);
   }
		array_push($arr,$rowdata1);			
		//11
		
echo json_encode($arr);
}


if($action == 'getaccountdetails')
{
$account_name = $_POST['project'];	
$result=mysqli_query($con,"select count(*) count from tfsdefects where account_name ='".$account_name."'")or die(mysqli_connect_errno());
  // Fetch one and one row
  $arr=array();
   while($row=mysqli_fetch_array($result))
   {
		$rowdata=array();
		array_push($rowdata,$row['count']);
   }
		array_push($arr,$rowdata);
  
  $result1=mysqli_query($con,"select count(*) countnon from tfsdefects where priority <> '04 Non-defect' AND account_name ='".$account_name."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['countnon']);
   }
		array_push($arr,$rowdata1);
		
		
	$result1=mysqli_query($con,"SELECT count( * ) count FROM `qctestinstances` WHERE STATUS = 'Passed' AND account_name ='".$account_name."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['count']);
   }
		array_push($arr,$rowdata1);	
		
	$result1=mysqli_query($con,"SELECT count( * ) count FROM `qctestinstances` WHERE account_name ='".$account_name."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['count']);
   }
		array_push($arr,$rowdata1);		

	$result1=mysqli_query($con,"SELECT count( * ) count FROM `qctestinstances` WHERE (STATUS = 'Passed' or Status = 'Failed' ) AND	account_name ='".$account_name."'")or die(mysqli_connect_errno()); 
   while($row1=mysqli_fetch_array($result1))
   {	   
  $rowdata1=array();
		array_push($rowdata1,$row1['count']);
   }
		array_push($arr,$rowdata1);			
		
		
echo json_encode($arr);
}


if($action == 'getdashboardtemplate')
{
	$dashboard = $_POST['dashboard'];
	$result=mysqli_query($con,"select account_name,id,templatedetails, dashboardname,portfolio_name, projectname,dashboard.dashboardid, templateid from (SELECT dashboarddetails.id dashboardid, templateid, templatedetails, projectnameid, dashboardname FROM `templatelist` join dashboarddetails on templatelist.id = dashboarddetails.templateid where dashboarddetails.id = '".$dashboard."')dashboard join projectdetails on projectdetails.id = dashboard.projectnameid")or die(mysqli_connect_errno());
$row=mysqli_fetch_array($result);
$rowdata=array();
        
		array_push($rowdata,$row['projectname']);
		array_push($rowdata,$row['templateid']);
		array_push($rowdata,$row['dashboardname']);
		array_push($rowdata,$row['dashboardid']);
		array_push($rowdata,$row['templatedetails']);
		array_push($rowdata,$row['id']);
		array_push($rowdata,$row['portfolio_name']);
		array_push($rowdata,$row['account_name']);
			$result=mysqli_query($con,"select * from dashboardgroups where dashboardid = '".$row['dashboardid']."'")or die(mysqli_connect_errno());
$line=array();
			while($row=mysqli_fetch_array($result))
{
array_push($line,$row['groupid']);
}
		array_push($rowdata,$line);
echo json_encode($rowdata);
}

if($action == 'getdashboardtemplate_portfolio')
{
	$dashboard = $_POST['dashboard'];
	$result=mysqli_query($con,"SELECT account_name,portfolio_name,dashboarddetails.id dashboardid, templateid, templatedetails, projectnameid, dashboardname FROM `templatelist` join dashboarddetails on templatelist.id = dashboarddetails.templateid where dashboarddetails.id = '".$dashboard."'")or die(mysqli_connect_errno());
$row=mysqli_fetch_array($result);
$rowdata=array();

		array_push($rowdata,$row['portfolio_name']);
		array_push($rowdata,$row['templateid']);
		array_push($rowdata,$row['dashboardname']);
		array_push($rowdata,$row['dashboardid']);
		array_push($rowdata,$row['templatedetails']);
		array_push($rowdata,$row['account_name']);
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

if($action == 'getdashboardgraphdetails_portfolio')
{
	
	$dashboard = $_POST['dashboard'];
	$result=mysqli_query($con,"select * from querydetails where dashboardid = '".$dashboard."'")or die(mysqli_connect_errno());

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