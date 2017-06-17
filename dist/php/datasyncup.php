


<?php



$action = $_REQUEST['action'];
//$action = "getrunsdata";
$con=mysqli_connect("localhost","root","","upsdashboard");
//echo $action;
// Check connection
if (mysqli_connect_errno())
 {
 echo "Failed to connect to MySQL: " . mysqli_connect_error();
 }

$username = $_POST['username'];
$password = $_POST['password'];
$projectid = $_POST['id'];	


//$username = "hdc4crv";
//$password = "password";
//QC connect

$qc = curl_init();
$ckfile = tempnam ("/tmp", "CURLCOOKIE");

$result= mysqli_query($con,"select * FROM projectdetails where id='".$projectid."'")or die(mysqli_connect_errno());
$row=mysqli_fetch_array($result);

//echo $projectid;

if($action == 'getrunsdata')
{
curl_setopt($qc, CURLOPT_URL, $row['executionfield5']."/rest/is-authenticated");
}
else
{
curl_setopt($qc, CURLOPT_URL, $row['designfield5']."/rest/is-authenticated");
 }       
curl_setopt($qc, CURLOPT_HEADER, 0);
curl_setopt($qc, CURLOPT_HTTPGET, 1);
curl_setopt($qc, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($qc, CURLOPT_SSL_VERIFYPEER,false);
curl_setopt($qc, CURLOPT_SSL_VERIFYHOST,false); 
$result = curl_exec($qc);
$response = curl_getinfo($qc);
//echo $response['http_code'];
if($response['http_code'] == '401')
{
	
  $url = $row['designfield5']."/authentication-point/authenticate";
        $credentials = $username.":".$password; 
        $headers = array("GET /HTTP/1.1","Authorization: Basic ". base64_encode($credentials));

if($action == 'getrunsdata')
{
curl_setopt($qc, CURLOPT_URL, $row['executionfield5']."/authentication-point/authenticate");
}
else
{
curl_setopt($qc, CURLOPT_URL, $row['designfield5']."/authentication-point/authenticate");
 }       
    curl_setopt($qc, CURLOPT_HTTPGET,1); //Not sure we need these again as set above?
    curl_setopt($qc, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($qc, CURLOPT_COOKIEJAR, $ckfile);
        curl_setopt($qc, CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($qc);
        $response = curl_getinfo($qc);
		//echo $response['http_code'];

       if($response['http_code'] == '200')
       {

		 if($action == 'getrunsdata')
{
curl_setopt($qc, CURLOPT_URL, $row['executionfield5']."/rest/site-session");
}
else
{
curl_setopt($qc, CURLOPT_URL, $row['designfield5']."/rest/site-session");
 }       
         curl_setopt($qc, CURLOPT_POST,1); //Not sure we need these again as set above?
   

        curl_setopt($qc, CURLOPT_COOKIEFILE, $ckfile);
        curl_setopt($qc, CURLOPT_RETURNTRANSFER, true);
         $result = curl_exec($qc);
        $response = curl_getinfo($qc);
	  if ($response['http_code'] == '201')
	   {
        //Use the cookie for subsequent calls...
        curl_setopt($qc, CURLOPT_COOKIEFILE, $ckfile);
		curl_setopt($qc, CURLOPT_RETURNTRANSFER, true);
curl_setopt($qc, CURLOPT_SSL_VERIFYPEER, FALSE); 
curl_setopt($qc, CURLOPT_SSL_VERIFYHOST, FALSE); 
			$headers = array('Accept: application/json');
		curl_setopt($qc, CURLOPT_HTTPGET,1);
		curl_setopt($qc, CURLOPT_HTTPHEADER, $headers);	
		
if($action == 'designdomain')
{			
       curl_setopt($qc, CURLOPT_URL, $row['designfield5']."/rest/domains"); 
		 $json = curl_exec($qc);
	$array=json_decode($json, true); 
if($array!='')
{

	mysqli_query($con,"DELETE FROM qcdomains")or die(mysqli_connect_errno());
	
	
	$query = "insert into qcdomains (domainname) values";
	$where ="";
for ($i=0;$i<count($array['Domain']);$i++)
{
	if($where !="")
	{
		$where .=",";
	}
	$where .= "('".$array['Domain'][$i]['Name']."')";
}
$query .= $where;

mysqli_query($con,$query)or die(mysqli_connect_errno());
}
}

if($action == 'designproject')
{			
$domains = $_POST['designdomain']; //commenting for test
//$domains = 'OP';
       curl_setopt($qc, CURLOPT_URL, $row['designfield5']."/rest/domains/".$domains."/projects"); 
		 $json = curl_exec($qc);
	$array=json_decode($json, true); 
	if($array!='')
{
	mysqli_query($con,"DELETE FROM qcprojects where domainname = '".$domains."'")or die(mysqli_connect_errno());
	
	
	$query = "insert into qcprojects (domainname,projectname) values";
	$where ="";
	
for ($i=0;$i<count($array['Project']);$i++)
{
	if($where !="")
	{
		$where .=",";
	}
	$where .= "('".$domains."','".$array['Project'][$i]['Name']."')";
}
$query .= $where;
mysqli_query($con,$query)or die(mysqli_connect_errno());

}
}

/*function designtestsetfolder()
{

$projectid = $_POST['id'];	
$domains = $_POST['designdomain'];
$projects = $_POST['designproject'];

	curl_setopt($qc, CURLOPT_URL, $row['designfield5']."/rest/domains/".$domains."/projects/".$projects."/test-set-folders"); 
		 $json = curl_exec($qc);
	$array=json_decode($json, true); 
//print_r ($array);
	if($array!='')
{

	mysqli_query($con,"DELETE FROM qctestsetfolders where domainname = '".$domains."' and projectname = '".$projects."'")or die(mysqli_connect_errno());

	$query = "insert into qctestsetfolders (domainname, projectname, id, noofsons, verstamp, parentid, assignrcyc, lastmodified, hierarchicalpath, description, vieworder, name, attachment, workflow) values";
	$where ="";
	
for ($i=0;$i<count($array['entities']);$i++)
{
	
	if($where !="")
	{
		$where .=",";
	}
	
	
//	for($j=0;$j<count($array['entities'][$i]['Fields']);$j++)
	//{
		if(isset($array['entities'][$i]['Fields'][0]['values'][0]['value']))
		{
				$id = $array['entities'][$i]['Fields'][0]['values'][0]['value'];
		}
		else
		{
				$id = "";
		}
		if(isset($array['entities'][$i]['Fields'][1]['values'][0]['value']))
		{
				$noofsons = $array['entities'][$i]['Fields'][1]['values'][0]['value'];
		}
		else
		{
				$noofsons = "";
		}
		if(isset($array['entities'][$i]['Fields'][2]['values'][0]['value']))
		{
				$verstamp = $array['entities'][$i]['Fields'][2]['values'][0]['value'];
		}
		else
		{
				$verstamp = "";
		}
		if(isset($array['entities'][$i]['Fields'][3]['values'][0]['value']))
		{
				$parentid = $array['entities'][$i]['Fields'][3]['values'][0]['value'];
		}
		else
		{
				$parentid = "";
		}
		if(isset($array['entities'][$i]['Fields'][4]['values'][0]['value']))
		{
				$assignrcyc = $array['entities'][$i]['Fields'][4]['values'][0]['value'];
		}
		else
		{
				$assignrcyc = "";
		}
		if(isset($array['entities'][$i]['Fields'][5]['values'][0]['value']))
		{
				$lastmodified = $array['entities'][$i]['Fields'][5]['values'][0]['value'];
		}
		else
		{
				$lastmodified = "";
		}
		if(isset($array['entities'][$i]['Fields'][6]['values'][0]['value']))
		{
				$hierarchicalpath = $array['entities'][$i]['Fields'][6]['values'][0]['value'];
		}
		else
		{
				$hierarchicalpath = "";
		}
		if(isset($array['entities'][$i]['Fields'][7]['values'][0]['value']))
		{
				$description = $array['entities'][$i]['Fields'][7]['values'][0]['value'];
		}
		else
		{
				$description = "";
		}
		if(isset($array['entities'][$i]['Fields'][8]['values'][0]['value']))
		{
				$vieworder = $array['entities'][$i]['Fields'][8]['values'][0]['value'];
		}
		else
		{
				$vieworder  = "";
		}
		if(isset($array['entities'][$i]['Fields'][9]['values'][0]['value']))
		{
				$name = $array['entities'][$i]['Fields'][9]['values'][0]['value'];
		}
		else
		{
				$name  = "";
		}
		if(isset($array['entities'][$i]['Fields'][10]['values'][0]['value']))
		{
				$attachment = $array['entities'][$i]['Fields'][10]['values'][0]['value'];
		}
		else
		{
				$attachment  = "";
		}
		if(isset($array['entities'][$i]['Fields'][11]['values'][0]['value']))
		{
				$workflow = $array['entities'][$i]['Fields'][11]['values'][0]['value'];
		}
		else
		{
				$workflow  = "";
		}
			
	$where .= "('".$domains."','".$projects."','".$id."','".$noofsons."','".$verstamp."','".$parentid."','".$assignrcyc."','".$lastmodified."','".$hierarchicalpath."','".$description."','".$vieworder."','".$name."','".$attachment."','".$workflow."')";	
	//}
	
}
$query .= $where;
//echo $query;
mysqli_query($con,$query)or die(mysqli_connect_errno());

}
}

*/

}

//echo $action;
if($action == 'getdesigndata')
{

	$projectid=$_POST['id'];
	
	//$projectid='0';

	mysqli_query($con,"DELETE FROM qctestinstances where projectid = '".$projectid."'")or die(mysqli_connect_errno());

$result = mysqli_query($con,"select * from projectdetails where id ='".$projectid."'")or die(mysqli_connect_errno());
$row = mysqli_fetch_array($result);

$arr = array();

$portfolio_name =  $row['portfolio_name'];
$account_name=$row['account_name'];


$arr = explode(',',$row['designfield4']);
//print_r($arr);
//for($i=0;$i<sizeof($arr);$i++)
foreach($arr as $key=>$value)
{
//echo $value;

	//curl_setopt($qc, CURLOPT_URL, $row['designfield5']."/rest/domains/".$row['designfield1']."/projects/".$row['designfield2']."/test-instances?query={cycle-id[".$row['designfield3']."]}"); 
curl_setopt($qc, CURLOPT_URL, $row['designfield5']."/rest/domains/".$row['designfield1']."/projects/".$row['designfield2']."/test-instances?query={cycle-id[".$value."]}"); 

	$json = curl_exec($qc);
	$array=json_decode($json, true); 
	//print_r ($array);
	if($array!='')
{


	$query = "INSERT INTO `qctestinstances`(`projectid`, `testinstance`, `eparams`, `planschedulingtime`, `planschedulingdate`, `id`, `verstamp`, `osconfig`, `hostname`, `testconfigid`, `dataobj`, `haslinkage`, `pinnedbaseline`, `execdate`, `cycleid`, `cycle`, `assignrcyc`, `exectime`, `lastmodified`, `status`, `iterations`, `actualtester`, `execeventhandle`, `attachment`, `testid`, `subtypeid`, `testorder`, `owner`, `bptachangeawarness`,`portfolio_name`,`account_name`) VALUES ";
	$where ="";

for ($i=0;$i<count($array['entities']);$i++)
{
	print_r ($array);
	if($where !="")
	{
		$where .=",";
	}
	
/*			if(isset($array['entities'][$i]['Fields'][0]['values'][0]['value']))
		{
				$testinstance = $array['entities'][$i]['Fields'][0]['values'][0]['value'];
		}
		else
		{
				$testinstance = "";
		}
			if(isset($array['entities'][$i]['Fields'][1]['values'][0]['value']))
		{
				$eparams = $array['entities'][$i]['Fields'][1]['values'][0]['value'];
		}
		else
		{
				$eparams = "";
		}	

			if(isset($array['entities'][$i]['Fields'][2]['values'][0]['value']))
		{
				$planschedulingtime = $array['entities'][$i]['Fields'][2]['values'][0]['value'];
		}
		else
		{
				$planschedulingtime = "";
		}	
			if(isset($array['entities'][$i]['Fields'][3]['values'][0]['value']))
		{
				$planschedulingdate = $array['entities'][$i]['Fields'][3]['values'][0]['value'];
		}
		else
		{
				$planschedulingdate = "";
		}	
		if(isset($array['entities'][$i]['Fields'][4]['values'][0]['value']))
		{
				$id = $array['entities'][$i]['Fields'][4]['values'][0]['value'];
		}
		else
		{
				$id = "";
		}
if(isset($array['entities'][$i]['Fields'][5]['values'][0]['value']))
		{
				$verstamp = $array['entities'][$i]['Fields'][5]['values'][0]['value'];
		}
		else
		{
				$verstamp = "";
		}			

if(isset($array['entities'][$i]['Fields'][6]['values'][0]['value']))
		{
				$osconfig = $array['entities'][$i]['Fields'][6]['values'][0]['value'];
		}
		else
		{
				$osconfig = "";
		}			
if(isset($array['entities'][$i]['Fields'][7]['values'][0]['value']))
		{
				$hostname = $array['entities'][$i]['Fields'][7]['values'][0]['value'];
		}
		else
		{
				$hostname = "";
		}			
		if(isset($array['entities'][$i]['Fields'][8]['values'][0]['value']))
		{
				$testconfigid = $array['entities'][$i]['Fields'][8]['values'][0]['value'];
		}
		else
		{
				$testconfigid = "";
		}		
if(isset($array['entities'][$i]['Fields'][9]['values'][0]['value']))
		{
				$dataobj = $array['entities'][$i]['Fields'][9]['values'][0]['value'];
		}
		else
		{
				$dataobj = "";
		}				
if(isset($array['entities'][$i]['Fields'][10]['values'][0]['value']))
		{
				$haslinkage = $array['entities'][$i]['Fields'][10]['values'][0]['value'];
		}
		else
		{
				$haslinkage = "";
		}		
if(isset($array['entities'][$i]['Fields'][11]['values'][0]['value']))
		{
				$pinnedbaseline = $array['entities'][$i]['Fields'][11]['values'][0]['value'];
		}
		else
		{
				$pinnedbaseline = "";
		}					
		if(isset($array['entities'][$i]['Fields'][12]['values'][0]['value']))
		{
				$execdate = $array['entities'][$i]['Fields'][12]['values'][0]['value'];
		}
		else
		{
				$execdate = "";
		}		
if(isset($array['entities'][$i]['Fields'][13]['values'][0]['value']))
		{
				$cycleid = $array['entities'][$i]['Fields'][13]['values'][0]['value'];
		}
		else
		{
				$cycleid = "";
		}					
		if(isset($array['entities'][$i]['Fields'][14]['values'][0]['value']))
		{
				$cycle = $array['entities'][$i]['Fields'][14]['values'][0]['value'];
		}
		else
		{
				$cycle = "";
		}	
if(isset($array['entities'][$i]['Fields'][15]['values'][0]['value']))
		{
				$assignrcyc = $array['entities'][$i]['Fields'][15]['values'][0]['value'];
		}
		else
		{
				$assignrcyc = "";
		}
if(isset($array['entities'][$i]['Fields'][16]['values'][0]['value']))
		{
				$exectime = $array['entities'][$i]['Fields'][16]['values'][0]['value'];
		}
		else
		{
				$exectime = "";
		}					
if(isset($array['entities'][$i]['Fields'][17]['values'][0]['value']))
		{
				$lastmodified = $array['entities'][$i]['Fields'][17]['values'][0]['value'];
		}
		else
		{
				$lastmodified = "";
		}		
if(isset($array['entities'][$i]['Fields'][18]['values'][0]['value']))
		{
				$status = $array['entities'][$i]['Fields'][18]['values'][0]['value'];
		}
		else
		{
				$status = "";
		}			
if(isset($array['entities'][$i]['Fields'][19]['values'][0]['value']))
		{
				$iterations = $array['entities'][$i]['Fields'][19]['values'][0]['value'];
		}
		else
		{
				$iterations = "";
		}			
if(isset($array['entities'][$i]['Fields'][20]['values'][0]['value']))
		{
				$actualtester = $array['entities'][$i]['Fields'][20]['values'][0]['value'];
		}
		else
		{
				$actualtester = "";
		}					
if(isset($array['entities'][$i]['Fields'][21]['values'][0]['value']))
		{
				$execeventhandle = $array['entities'][$i]['Fields'][21]['values'][0]['value'];
		}
		else
		{
				$execeventhandle = "";
		}			
if(isset($array['entities'][$i]['Fields'][22]['values'][0]['value']))
		{
				$attachment = $array['entities'][$i]['Fields'][22]['values'][0]['value'];
		}
		else
		{
				$attachment = "";
		}					
if(isset($array['entities'][$i]['Fields'][23]['values'][0]['value']))
		{
				$testid = $array['entities'][$i]['Fields'][23]['values'][0]['value'];
		}
		else
		{
				$testid = "";
		}	
if(isset($array['entities'][$i]['Fields'][24]['values'][0]['value']))
		{
				$subtypeid = $array['entities'][$i]['Fields'][24]['values'][0]['value'];
		}
		else
		{
				$subtypeid = "";
		}		
if(isset($array['entities'][$i]['Fields'][25]['values'][0]['value']))
		{
				$testorder = $array['entities'][$i]['Fields'][25]['values'][0]['value'];
		}
		else
		{
				$testorder = "";
		}	
if(isset($array['entities'][$i]['Fields'][26]['values'][0]['value']))
		{
				$owner = $array['entities'][$i]['Fields'][26]['values'][0]['value'];
		}
		else
		{
				$owner = "";
		}					
if(isset($array['entities'][$i]['Fields'][27]['values'][0]['value']))
		{
				$bptachangeawareness = $array['entities'][$i]['Fields'][27]['values'][0]['value'];
		}
		else
		{
				$bptachangeawareness = "";
		} */
$testinstance = "";
$eparams = "";
$planschedulingdate = "";
$planschedulingtime = "";
$id = "";
$verstamp = "";
$osconfig = "";
$hostname = "";
$testconfigid = "";
$dataobj = "";
$haslinkage = "";
$pinnedbaseline = "";
$execdate = "";
$cycleid = "";
$cycle = "";
$lastmodified = "";
$assignrcyc = "";
$exectime = "";
$status = "";
$iterations = "";
$execeventhandle = "";
$actualtester = "";
$attachment = "";
$testid = "";
$subtypeid = "";
$testorder = "";
$owner = "";
$bptachangeawareness = "";

for ($j=0;$j<count($array['entities'][$i]['Fields']);$j++)
	{
	if(isset($array['entities'][$i]['Fields'][$j]['values'][0]['value'])) {
	$fieldname = $array['entities'][$i]['Fields'][$j]['Name'];
		if($fieldname == 'test-instance'){
			$testinstance = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'eparams'){
			$eparams = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'plan-scheduling-date'){
			$planschedulingdate = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'plan-scheduling-time'){
			$planschedulingtime = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'id'){
			$id = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'ver-stamp') {
			$verstamp = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'os-config') {
			$osconfig = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'host-name') {
			$hostname = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'test-config-id') {
			$testconfigid = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'data-obj') {
			$dataobj = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'has-linkage') {
			$haslinkage = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'pinned-baseline') {
			$pinnedbaseline = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'exec-date') {
			$execdate = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'cycle-id') {
			$cycleid = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'cycle') {
			$cycle = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'last-modified') {
			$lastmodified = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'assign-rcyc') {
			$assignrcyc = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'exec-time') {
			$exectime = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'status') {
			$status = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'iterations') {
			$iterations = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'exec-event-handle') {
			$execeventhandle = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'actual-tester') {
			$actualtester = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'attachment') {
			$attachment = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'test-id') {
			$testid = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'subtype-id') {
			$subtypeid = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'test-order') {
			$testorder = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'owner') {
			$owner = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'bpta-change-awareness') {
			$bptachangeawareness = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} 
	}
}
$where .="('".$projectid."','".$testinstance."','".$eparams."','".$planschedulingtime."','".$planschedulingdate."','".$id."','".$verstamp."','".$osconfig."','".$hostname."','".$testconfigid."','".$dataobj."','".$haslinkage."','".$pinnedbaseline."','".$execdate."','".$cycleid."','".$cycle."','".$assignrcyc."','".$exectime."','".$lastmodified."','".$status."','".$iterations."','".$actualtester."','".$execeventhandle."','".$attachment."','".$testid."','".$subtypeid."','".$testorder."','".$owner."','".$bptachangeawareness."','".$portfolio_name."','".$account_name."')";
		print_r($array);
}
$query = $query.$where;
//echo $query;
mysqli_query($con,$query)or die(mysqli_connect_errno());

//$result= mysqli_query($con,"select * FROM projectdetails where id='".$projectid."'")or die(mysqli_connect_errno());
//$row=mysqli_fetch_array($result);

  //  logout($qc,$row['designfield5']."/authentication-point/logout");
			
       }
}


$result= mysqli_query($con,"select * FROM projectdetails where id='".$projectid."'")or die(mysqli_connect_errno());
$row=mysqli_fetch_array($result);

  logout($qc,$row['designfield5']."/authentication-point/logout");
}

if($action == 'getrunsdata')
{

	$projectid=$_POST['id'];
	//$projectid='1';
$result = mysqli_query($con,"select * from projectdetails where projectdetails.id ='".$projectid."'")or die(mysqli_connect_errno());
$row=mysqli_fetch_array($result);
$portfolio_name =  $row['portfolio_name'];
$account_name=$row['account_name'];
$arr = array();

$arr = explode(',',$row['executionfield4']);

//for($i=0;$i<sizeof($arr);$i++)

mysqli_query($con,"DELETE FROM qcruns where projectid = '".$projectid."'")or die(mysqli_connect_errno());

foreach($arr as $key=>$value)
{
echo $row['executionfield5']."/rest/domains/".$row['executionfield1']."/projects/".$row['executionfield2']."/runs?query={cycle-id[".$value."]}";
//echo "select qctestset.id, projectdetails.id,projectdetails.designfield3,projectdetails.designfield1,projectdetails.designfield2 from projectdetails join qctestset where projectdetails.designfield4= qctestset.testsetfolder and projectdetails.id ='".$id."'";
	curl_setopt($qc, CURLOPT_URL, $row['executionfield5']."/rest/domains/".$row['executionfield1']."/projects/".$row['executionfield2']."/runs?query={cycle-id[".$value."]}"); 
		 $json = curl_exec($qc);
		//echo $json;
	$array=json_decode($json, true); 
	
	if($array!='')
{
//echo "DELETE FROM qcruns where projectid = '".$projectid."'";
	print_r($array);

	
for ($i=0;$i<count($array['entities']);$i++)
{


	$query = "INSERT INTO `qcruns`(`projectid`, `testinstance`, `executiondate`, `state`, `id`, `verstamp`, `osconfig`, `testconfigid`, `name`, `haslinkage`, `path`, `vcstatus`, `pinnedbaseline`, `vcversionnumber`, `osbuild`, `testcycleid`, `cycleid`, `cycle`, `host`, `assignrcyc`, `lastmodified`, `status`, `osname`, `attachment`, `itersparamsvalues`, `testid`, `subtypeid`, `draft`, `iterssumstatus`, `duration`, `bptstructure`, `owner`, `bptachangedetected`, `textsync`, `executiontime`, `bptachangeawareness`, `vclockedby`, `comments`, `ossp`,`portfolio_name`,`account_name') VALUES ";
	$where ="";
	
	if($where !="")
	{
		$where .=",";
	}
	
$testinstance = "";
$executiondate = "";
$state = "";
$id = "";
$verstamp = "";
$osconfig = "";
$testconfigid = "";
$name = "";
$haslinkage = "";
$path = "";
$vcstatus = "";
$pinnedbaseline = "";
$vcversionnumber = "";
$osbuild = "";
$testcycleid = "";
$cycleid = "";
$cycle = "";
$host = "";
$assignrcyc = "";
$lastmodified = "";
$status = "";
$osname = "";
$attachment = "";
$itersparamsvalues = "";
$testid = "";
$subtypeid = "";
$draft = "";
$iterssumstatus = "";
$duration = "";
$bptstructure = "";
$owner = "";
$textsync = "";
$bptachangedetected = "";
$executiontime = "";
$bptachangeawareness = "";
$vclockedby = "";
$comments = "";
$ossp = "";

/*	
			if(isset($array['entities'][$i]['Fields'][0]['values'][0]['value']))
		{
				$testinstance = $array['entities'][$i]['Fields'][0]['values'][0]['value'];
		}
		else
		{
				$testinstance = "";
		}	
			if(isset($array['entities'][$i]['Fields'][1]['values'][0]['value']))
		{
				$executiondate = $array['entities'][$i]['Fields'][1]['values'][0]['value'];
		}
		else
		{
				$executiondate = "";
		}	
		if(isset($array['entities'][$i]['Fields'][2]['values'][0]['value']))
		{
				$state = $array['entities'][$i]['Fields'][2]['values'][0]['value'];
		}
		else
		{
				$state= "";
		}	
if(isset($array['entities'][$i]['Fields'][3]['values'][0]['value']))
		{
				$id = $array['entities'][$i]['Fields'][3]['values'][0]['value'];
		}
		else
		{
				$id = "";
		}					
		if(isset($array['entities'][$i]['Fields'][4]['values'][0]['value']))
		{
				$verstamp = $array['entities'][$i]['Fields'][4]['values'][0]['value'];
		}
		else
		{
				$verstamp = "";
		}		
if(isset($array['entities'][$i]['Fields'][5]['values'][0]['value']))
		{
				$osconfig = $array['entities'][$i]['Fields'][5]['values'][0]['value'];
		}
		else
		{
				$osconfig = "";
		}					
		if(isset($array['entities'][$i]['Fields'][6]['values'][0]['value']))
		{
				$testconfigid = $array['entities'][$i]['Fields'][6]['values'][0]['value'];
		}
		else
		{
				$testconfigid = "";
		}	
if(isset($array['entities'][$i]['Fields'][7]['values'][0]['value']))
		{
				$name = $array['entities'][$i]['Fields'][7]['values'][0]['value'];
		}
		else
		{
				$name = "";
		}
if(isset($array['entities'][$i]['Fields'][8]['values'][0]['value']))
		{
				$haslinkage = $array['entities'][$i]['Fields'][8]['values'][0]['value'];
		}
		else
		{
				$haslinkage = "";
		}					
if(isset($array['entities'][$i]['Fields'][9]['values'][0]['value']))
		{
				$path = $array['entities'][$i]['Fields'][9]['values'][0]['value'];
		}
		else
		{
				$path = "";
		}		
if(isset($array['entities'][$i]['Fields'][10]['values'][0]['value']))
		{
				$vcstatus = $array['entities'][$i]['Fields'][10]['values'][0]['value'];
		}
		else
		{
				$vcstatus = "";
		}			
if(isset($array['entities'][$i]['Fields'][11]['values'][0]['value']))
		{
				$pinnedbaseline = $array['entities'][$i]['Fields'][11]['values'][0]['value'];
		}
		else
		{
				$pinnedbaseline = "";
		}			
if(isset($array['entities'][$i]['Fields'][12]['values'][0]['value']))
		{
				$vcversionnumber = $array['entities'][$i]['Fields'][12]['values'][0]['value'];
		}
		else
		{
				$vcversionnumber = "";
		}					
if(isset($array['entities'][$i]['Fields'][13]['values'][0]['value']))
		{
				$osbuild = $array['entities'][$i]['Fields'][13]['values'][0]['value'];
		}
		else
		{
				$osbuild = "";
		}			
if(isset($array['entities'][$i]['Fields'][14]['values'][0]['value']))
		{
				$testcycleid = $array['entities'][$i]['Fields'][14]['values'][0]['value'];
		}
		else
		{
				$testcycleid = "";
		}					
if(isset($array['entities'][$i]['Fields'][15]['values'][0]['value']))
		{
				$cycleid = $array['entities'][$i]['Fields'][15]['values'][0]['value'];
		}
		else
		{
				$cycleid = "";
		}	
if(isset($array['entities'][$i]['Fields'][16]['values'][0]['value']))
		{
				$cycle = $array['entities'][$i]['Fields'][16]['values'][0]['value'];
		}
		else
		{
				$cycle = "";
		}		
if(isset($array['entities'][$i]['Fields'][17]['values'][0]['value']))
		{
				$host = $array['entities'][$i]['Fields'][17]['values'][0]['value'];
		}
		else
		{
				$host = "";
		}	
if(isset($array['entities'][$i]['Fields'][18]['values'][0]['value']))
		{
				$assignrcyc = $array['entities'][$i]['Fields'][18]['values'][0]['value'];
		}
		else
		{
				$assignrcyc = "";
		}					
if(isset($array['entities'][$i]['Fields'][19]['values'][0]['value']))
		{
				$lastmodified = $array['entities'][$i]['Fields'][19]['values'][0]['value'];
		}
		else
		{
				$lastmodified = "";
		}
		if(isset($array['entities'][$i]['Fields'][20]['values'][0]['value']))
		{
				$status = $array['entities'][$i]['Fields'][20]['values'][0]['value'];
		}
		else
		{
				$status = "";
		}
		if(isset($array['entities'][$i]['Fields'][21]['values'][0]['value']))
		{
				$osname = $array['entities'][$i]['Fields'][21]['values'][0]['value'];
		}
		else
		{
				$osname = "";
		}
		if(isset($array['entities'][$i]['Fields'][22]['values'][0]['value']))
		{
				$attachment = $array['entities'][$i]['Fields'][22]['values'][0]['value'];
		}
		else
		{
				$attachment = "";
		}
		if(isset($array['entities'][$i]['Fields'][23]['values'][0]['value']))
		{
				$itersparamsvalues = $array['entities'][$i]['Fields'][23]['values'][0]['value'];
		}
		else
		{
				$itersparamsvalues = "";
		}
		if(isset($array['entities'][$i]['Fields'][24]['values'][0]['value']))
		{
				$testid = $array['entities'][$i]['Fields'][24]['values'][0]['value'];
		}
		else
		{
				$testid = "";
		}
		if(isset($array['entities'][$i]['Fields'][25]['values'][0]['value']))
		{
				$subtypeid = $array['entities'][$i]['Fields'][25]['values'][0]['value'];
		}
		else
		{
				$subtypeid = "";
		}
		if(isset($array['entities'][$i]['Fields'][26]['values'][0]['value']))
		{
				$draft = $array['entities'][$i]['Fields'][26]['values'][0]['value'];
		}
		else
		{
				$draft = "";
		}
				if(isset($array['entities'][$i]['Fields'][27]['values'][0]['value']))
		{
				$iterssumstatus = $array['entities'][$i]['Fields'][27]['values'][0]['value'];
		}
		else
		{
				$iterssumstatus	= "";
		}
				if(isset($array['entities'][$i]['Fields'][28]['values'][0]['value']))
		{
				$duration = $array['entities'][$i]['Fields'][28]['values'][0]['value'];
		}
		else
		{
				$duration	= "";
		}
				if(isset($array['entities'][$i]['Fields'][29]['values'][0]['value']))
		{
				$bptstructure	 = $array['entities'][$i]['Fields'][29]['values'][0]['value'];
		}
		else
		{
				$bptstructure	= "";
		}
				if(isset($array['entities'][$i]['Fields'][30]['values'][0]['value']))
		{
				$owner = $array['entities'][$i]['Fields'][30]['values'][0]['value'];
		}
		else
		{
				$owner	= "";
		}		

						if(isset($array['entities'][$i]['Fields'][32]['values'][0]['value']))
		{
				$bptachangedetected = $array['entities'][$i]['Fields'][32]['values'][0]['value'];
		}
		else
		{
				$bptachangedetected	= "";
		}
				if(isset($array['entities'][$i]['Fields'][31]['values'][0]['value']))
		{
				$textsync = $array['entities'][$i]['Fields'][31]['values'][0]['value'];
		}
		else
		{
				$textsync = "";
		}	
		if(isset($array['entities'][$i]['Fields'][33]['values'][0]['value']))
		{
				$executiontime = $array['entities'][$i]['Fields'][33]['values'][0]['value'];
		}
		else
		{
				$executiontime = "";
		}		
		if(isset($array['entities'][$i]['Fields'][34]['values'][0]['value']))
		{
				$bptachangeawareness = $array['entities'][$i]['Fields'][34]['values'][0]['value'];
		}
		else
		{
				$bptachangeawareness = "";
		}		
		if(isset($array['entities'][$i]['Fields'][35]['values'][0]['value']))
		{
				$vclockedby	 = $array['entities'][$i]['Fields'][35]['values'][0]['value'];
		}
		else
		{
				$vclockedby = "";
		}		
		if(isset($array['entities'][$i]['Fields'][36]['values'][0]['value']))
		{
				$comments = $array['entities'][$i]['Fields'][36]['values'][0]['value'];
		}
		else
		{
				$comments = "";
		}		
			if(isset($array['entities'][$i]['Fields'][37]['values'][0]['value']))
		{
				$ossp	 = $array['entities'][$i]['Fields'][37]['values'][0]['value'];
		}
		else
		{
				$ossp = "";
		}	*/	
for ($j=0;$j<count($array['entities'][$i]['Fields']);$j++)
	{
	if(isset($array['entities'][$i]['Fields'][$j]['values'][0]['value'])){
	$fieldname = $array['entities'][$i]['Fields'][$j]['Name'];
		if($fieldname == 'test-instance'){
					$testinstance = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'execution-date'){
					$executiondate = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'state'){
					$state = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'id'){
					$id = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'ver-stamp'){
					$verstamp = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'os-config'){
					$osconfig = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'test-config-id'){
					$testconfigid = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'name'){
					$name = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'has-linkage'){
					$haslinkage = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'path'){
					$path = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'vc-status'){
					$vcstatus = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'pinned-baseline'){
					$pinnedbaseline = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'vc-version-number'){
					$vcversionnumber = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'os-build'){
					$osbuild = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'testcycl-id'){
					$testcycleid = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'cycle-id'){
					$cycleid = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'cycle'){
					$cycle = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'host'){
					$host = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'assign-rcyc'){
					$assignrcyc = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'last-modified'){
					$lastmodified = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'status'){
					$status = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'os-name'){
					$osname = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'attachment'){
					$attachment = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'iters-params-values'){
					$itersparamsvalues = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'test-id'){
					$testid = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'subtype-id'){
					$subtypeid = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'draft'){
					$draft = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'iters-sum-status'){
					$iterssumstatus = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'duration'){
					$duration = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'bpt-structure'){
					$bptstructure = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'owner'){
					$owner = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'text-sync'){
					$textsync = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'bpta-change-detected'){
					$bptachangedetected = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'execution-time'){
					$executiontime = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'bpta-change-awareness'){
					$bptachangeawareness = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'vc-locked-by'){
					$vclockedby = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'comments'){
					$comments = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'os-sp'){
					$ossp = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		}
	}	
}					
		$where .="('".$projectid."','".$testinstance."','".$executiondate."','".$state."','".$id."','".$verstamp."','".$osconfig."','".$testconfigid."','".$name."','".$haslinkage."','".$path."','".$vcstatus."','".$pinnedbaseline."','".$vcversionnumber."','".$osbuild."','".$testcycleid."','".$cycleid."','".$cycle."','".$host."','".$assignrcyc."','".$lastmodified."','".$status."','".$osname."','".$attachment."','".$itersparamsvalues."','".$testid."','".$subtypeid."','".$draft."','".$iterssumstatus."','".$duration."','".$bptstructure."','".$owner."','".$bptachangedetected."','".$textsync."','".$executiontime."','".$bptachangeawareness."','".$vclockedby."','".$comments."','".$ossp."','".$portfolio_name."','".$account_name."')";	
		//print_r($array);
		
		$query = $query.$where;
mysqli_query($con,$query)or die(mysqli_connect_errno());
}

}
}


	mysqli_query($con,"DELETE FROM qctest where projectid = '".$projectid."'")or die(mysqli_connect_errno());
	
	$result = mysqli_query($con,"select * from projectdetails where projectdetails.id ='".$projectid."'")or die(mysqli_connect_errno());
$row=mysqli_fetch_array($result);


curl_setopt($qc, CURLOPT_URL, $row['executionfield5']."/rest/domains/".$row['executionfield1']."/projects/".$row['executionfield2']."/tests"); 
//curl_setopt($qc, CURLOPT_URL, "http://hpqc12.ams1907.com:8080/qcbin/rest/domains/OP/projects/SALES/tests"); 
	//echo "https://".$row['designfield5']."/qcbin/rest/domains/".$row['designfield1']."/projects/".$row['designfield2']."/tests";
		 $json = curl_exec($qc);
		 //echo $json;
	$array=json_decode($json, true); 
	//echo $array;
	if($array!='')
{


	
for ($i=0;$i<count($array['entities']);$i++)
{
		$query = "INSERT INTO `qctest`(`projectid`, `estimatedevtime`, `vccheckintime`, `vcstartauditactionid`, `verstamp`, `description`, `vcversionnumber`, `devcomments`, `template`, `status`, `hasdependencies`, `steps`, `runtimedata`, `checkoutusername`, `vccheckindate`, `parentid`, `vcdate`,`owner`, `vctime`, `basetestid`, `storagepath`, `configurationscount`, `id`, `vccomments`, `name`, `haslinkage`, `vcstatus`, `hascriteria`, `vccheckinusername`, `creationtime`, `lastmodified`, `attachment`, `vcendauditactionid`, `subtypeid`, `execstatus`, `vccheckincomments`, `stepparam`, `textsync`, `timeout`) VALUES";
	
	$where ="";
	if($where !="")
	{
		$where .=",";
	}

/*	if(isset($array['entities'][$i]['Fields'][0]['values'][0]['value']))
		{
				$estimatedevtime	 = $array['entities'][$i]['Fields'][0]['values'][0]['value'];
				$estimatedevtime = str_replace("'", "`",$estimatedevtime);
		}
		else
		{
				$estimatedevtime = "";
		}
		if(isset($array['entities'][$i]['Fields'][1]['values'][0]['value']))
		{
				$vccheckintime	 = $array['entities'][$i]['Fields'][1]['values'][0]['value'];
				$vccheckintime = str_replace("'", "`",$vccheckintime);
		}
		else
		{
				$vccheckintime = "";
		}	
if(isset($array['entities'][$i]['Fields'][2]['values'][0]['value']))
		{
				$vcstartauditactionid	 = $array['entities'][$i]['Fields'][2]['values'][0]['value'];
				$vcstartauditactionid = str_replace("'", "`",$vcstartauditactionid);
		}
		else
		{
				$vcstartauditactionid = "";
		}			
if(isset($array['entities'][$i]['Fields'][3]['values'][0]['value']))
		{
				$verstamp	 = $array['entities'][$i]['Fields'][3]['values'][0]['value'];
				$verstamp = str_replace("'", "`",$verstamp);
		}
		else
		{
				$verstamp = "";
		}		

if(isset($array['entities'][$i]['Fields'][4]['values'][0]['value']))
		{
				$description	 = $array['entities'][$i]['Fields'][4]['values'][0]['value'];
				$description = str_replace("'", "`",$description);
		}
		else
		{
				$description = "";
		}			if(isset($array['entities'][$i]['Fields'][6]['values'][0]['value']))
		{
				$vcversionnumber	 = $array['entities'][$i]['Fields'][6]['values'][0]['value'];
				$vcversionnumber = str_replace("'", "`",$vcversionnumber);
		}
		else
		{
				$vcversionnumber = "";
		}			
if(isset($array['entities'][$i]['Fields'][5]['values'][0]['value']))
		{
				$devcomments	 = $array['entities'][$i]['Fields'][5]['values'][0]['value'];
				$devcomments = str_replace("'", "`",$devcomments);
		}
		else
		{
				$devcomments = "";
		}			if(isset($array['entities'][$i]['Fields'][7]['values'][0]['value']))
		{
				$template	 = $array['entities'][$i]['Fields'][7]['values'][0]['value'];
				$template = str_replace("'", "`",$template);
		}
		else
		{
				$template = "";
		}

if(isset($array['entities'][$i]['Fields'][8]['values'][0]['value']))
		{
				$status	 = $array['entities'][$i]['Fields'][8]['values'][0]['value'];
				$status = str_replace("'", "`",$status);
		}
		else
		{
				$status = "";
		}			if(isset($array['entities'][$i]['Fields'][9]['values'][0]['value']))
		{
				$hasdependencies	 = $array['entities'][$i]['Fields'][9]['values'][0]['value'];
				$hasdependencies = str_replace("'", "`",$hasdependencies);
		}
		else
		{
				$hasdependencies = "";
		}		
	
if(isset($array['entities'][$i]['Fields'][10]['values'][0]['value']))
		{
				$steps	 = $array['entities'][$i]['Fields'][10]['values'][0]['value'];
				$steps = str_replace("'", "`",$steps);
		}
		else
		{
				$steps = "";
		}			if(isset($array['entities'][$i]['Fields'][11]['values'][0]['value']))
		{
				$runtimedata	 = $array['entities'][$i]['Fields'][11]['values'][0]['value'];
				$runtimedata = str_replace("'", "`",$runtimedata);
		}
		else
		{
				$runtimedata = "";
		}
		
if(isset($array['entities'][$i]['Fields'][12]['values'][0]['value']))
		{
				$checkoutusername	 = $array['entities'][$i]['Fields'][12]['values'][0]['value'];
				$checkoutusername = str_replace("'", "`",$checkoutusername);
		}
		else
		{
				$checkoutusername = "";
		}			if(isset($array['entities'][$i]['Fields'][13]['values'][0]['value']))
		{
				$vccheckindate	 = $array['entities'][$i]['Fields'][13]['values'][0]['value'];
				$vccheckindate = str_replace("'", "`",$vccheckindate);
		}
		else
		{
				$vccheckindate = "";
		}		
		
if(isset($array['entities'][$i]['Fields'][14]['values'][0]['value']))
		{
				$parentid	 = $array['entities'][$i]['Fields'][14]['values'][0]['value'];
				$parentid = str_replace("'", "`",$parentid);
		}
		else
		{
				$parentid = "";
		}			if(isset($array['entities'][$i]['Fields'][15]['values'][0]['value']))
		{
				$vcdate	 = $array['entities'][$i]['Fields'][15]['values'][0]['value'];
				$vcdate = str_replace("'", "`",$vcdate);
		}
		else
		{
				$vcdate = "";
		}		
				if(isset($array['entities'][$i]['Fields'][16]['values'][0]['value']))
		{
				$owner	 = $array['entities'][$i]['Fields'][16]['values'][0]['value'];
				$owner = str_replace("'", "`",$owner);
		}
		else
		{
				$owner = "";
		}		
			
if(isset($array['entities'][$i]['Fields'][22]['values'][0]['value']))
		{
				$vctime	 = $array['entities'][$i]['Fields'][22]['values'][0]['value'];
				$vctime = str_replace("'", "`",$vctime);
		}
		else
		{
				$vctime = "";
		}			if(isset($array['entities'][$i]['Fields'][23]['values'][0]['value']))
		{
				$basetestid	 = $array['entities'][$i]['Fields'][23]['values'][0]['value'];
				$basetestid = str_replace("'", "`",$basetestid);
		}
		else
		{
				$basetestid = "";
		}	
			
if(isset($array['entities'][$i]['Fields'][26]['values'][0]['value']))
		{
				$storagepath	 = $array['entities'][$i]['Fields'][26]['values'][0]['value'];
				$storagepath = str_replace("'", "`",$storagepath);
		}
		else
		{
				$storagepath = "";
		}			if(isset($array['entities'][$i]['Fields'][28]['values'][0]['value']))
		{
				$configurationscount	 = $array['entities'][$i]['Fields'][28]['values'][0]['value'];
				$configurationscount = str_replace("'", "`",$configurationscount);
		}
		else
		{
				$configurationscount = "";
		}
		
		
if(isset($array['entities'][$i]['Fields'][30]['values'][0]['value']))
		{
				$id	 = $array['entities'][$i]['Fields'][30]['values'][0]['value'];
				$id = str_replace("'", "`",$id);
		}
		else
		{
				$id = "";
		}			if(isset($array['entities'][$i]['Fields'][31]['values'][0]['value']))
		{
				$vccomments	 = $array['entities'][$i]['Fields'][31]['values'][0]['value'];
				$vccomments = str_replace("'", "`",$vccomments);
		}
		else
		{
				$vccomments = "";
		}
		
if(isset($array['entities'][$i]['Fields'][32]['values'][0]['value']))
		{
				$name	 = $array['entities'][$i]['Fields'][32]['values'][0]['value'];
				$name = str_replace("'", "`",$name);
		}
		else
		{
				$name = "";
		}			if(isset($array['entities'][$i]['Fields'][33]['values'][0]['value']))
		{
				$haslinkage	 = $array['entities'][$i]['Fields'][33]['values'][0]['value'];
				$haslinkage = str_replace("'", "`",$haslinkage);
		}
		else
		{
				$haslinkage = "";
		}
		

if(isset($array['entities'][$i]['Fields'][34]['values'][0]['value']))
		{
				$vcstatus	 = $array['entities'][$i]['Fields'][34]['values'][0]['value'];
				$vcstatus = str_replace("'", "`",$vcstatus);
		}
		else
		{
				$vcstatus = "";
		}			if(isset($array['entities'][$i]['Fields'][35]['values'][0]['value']))
		{
				$hascriteria	 = $array['entities'][$i]['Fields'][35]['values'][0]['value'];
				$hascriteria = str_replace("'", "`",$hascriteria);
		}
		else
		{
				$hascriteria = "";
		}	


if(isset($array['entities'][$i]['Fields'][36]['values'][0]['value']))
		{
				$vccheckinusername	 = $array['entities'][$i]['Fields'][36]['values'][0]['value'];
				$vccheckinusername = str_replace("'", "`",$vccheckinusername);
		}
		else
		{
				$vccheckinusername = "";
		}			if(isset($array['entities'][$i]['Fields'][37]['values'][0]['value']))
		{
				$creationtime	 = $array['entities'][$i]['Fields'][37]['values'][0]['value'];
				$creationtime = str_replace("'", "`",$creationtime);
		}
		else
		{
				$creationtime = "";
		}

if(isset($array['entities'][$i]['Fields'][39]['values'][0]['value']))
		{
				$lastmodified	 = $array['entities'][$i]['Fields'][39]['values'][0]['value'];
				$lastmodified = str_replace("'", "`",$lastmodified);
		}
		else
		{
				$lastmodified = "";
		}			
if(isset($array['entities'][$i]['Fields'][41]['values'][0]['value']))
		{
				$attachment	 = $array['entities'][$i]['Fields'][41]['values'][0]['value'];
				$attachment = str_replace("'", "`",$attachment);
		}
		else
		{
				$attachment = "";
		}			
if(isset($array['entities'][$i]['Fields'][43]['values'][0]['value']))
		{
				$vcendauditactionid	 = $array['entities'][$i]['Fields'][43]['values'][0]['value'];
				$vcendauditactionid = str_replace("'", "`",$vcendauditactionid);
		}
		else
		{
				$vcendauditactionid = "";
		}

if(isset($array['entities'][$i]['Fields'][42]['values'][0]['value']))
		{
				$subtypeid	 = $array['entities'][$i]['Fields'][42]['values'][0]['value'];
				$subtypeid = str_replace("'", "`",$subtypeid);
		}
		else
		{
				$subtypeid = "";
		}			if(isset($array['entities'][$i]['Fields'][44]['values'][0]['value']))
		{
				$execstatus	 = $array['entities'][$i]['Fields'][44]['values'][0]['value'];
				$execstatus = str_replace("'", "`",$execstatus);
		}
		else
		{
				$execstatus = "";
		}

if(isset($array['entities'][$i]['Fields'][45]['values'][0]['value']))
		{
				$vccheckincomments	 = $array['entities'][$i]['Fields'][45]['values'][0]['value'];
				$vccheckincomments = str_replace("'", "`",$vccheckincomments);
		}
		else
		{
				$vccheckincomments = "";
		}			if(isset($array['entities'][$i]['Fields'][46]['values'][0]['value']))
		{
				$stepparam	 = $array['entities'][$i]['Fields'][46]['values'][0]['value'];
				$stepparam = str_replace("'", "`",$stepparam);
		}
		else
		{
				$stepparam = "";
		}	

if(isset($array['entities'][$i]['Fields'][47]['values'][0]['value']))
		{
				$textsync	 = $array['entities'][$i]['Fields'][47]['values'][0]['value'];
				$textsync = str_replace("'", "`",$textsync);
		}
		else
		{
				$textsync = "";
		}			if(isset($array['entities'][$i]['Fields'][48]['values'][0]['value']))
		{
				$timeout	 = $array['entities'][$i]['Fields'][48]['values'][0]['value'];
				$timeout = str_replace("'", "`",$timeout);
		}
		else
		{
				$timeout = "";
		}	*/
$estimatedevtime = "";
$vccheckintime = "";
$vcstartauditactionid = "";
$verstamp = "";
$description = "";
$devcomments = "";
$vcversionnumber = "";
$template = "";
$status = "";
$hasdependencies = "";
$steps = "";
$runtimedata = "";
$checkoutusername = "";
$vccheckindate = "";
$parentid = "";
$vcdate = "";
$owner = "";
$vctime = "";
$basetestid = "";
$storagepath = "";
$configurationscount = "";
$id = "";
$vccomments = "";
$name = "";
$haslinkage = "";
$vcstatus = "";
$hascriteria = "";
$vccheckinusername = "";
$creationtime = "";
$lastmodified = "";
$attachment = "";
$subtypeid = "";
$vcendauditactionid = "";
$execstatus = "";
$vccheckincomments = "";
$textsync = "";
$stepparam = "";
$timeout = "";
for ($j=0;$j<count($array['entities'][$i]['Fields']);$j++)
	{
	if(isset($array['entities'][$i]['Fields'][$j]['values'][0]['value'])) {
	$fieldname = $array['entities'][$i]['Fields'][$j]['Name'];
		if($fieldname == 'estimate-devtime'){
					$estimatedevtime = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'vc-checkin-time'){
					$vccheckintime = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'vc-start-audit-action-id'){
					$vcstartauditactionid = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'ver-stamp'){
					$verstamp = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'description'){
					$description = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'dev-comments'){
					$devcomments = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'vc-version-number'){
					$vcversionnumber = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'template'){
					$template = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'status'){
					$status = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'has-dependencies'){
					$hasdependencies = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'steps'){
					$steps = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'runtime-data'){
					$runtimedata = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'check-out-user-name'){
					$checkoutusername = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'vc-checkin-date'){
					$vccheckindate = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'parent-id'){
					$parentid = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'vc-date'){
					$vcdate = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'owner'){
					$owner = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'vc-time'){
					$vctime = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'base-test-id'){
					$basetestid = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'storage-path'){
					$storagepath = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'configurations-count'){
					$configurationscount = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'id'){
					$id = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'vc-comments'){
					$vccomments = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'name'){
					$name = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'has-linkage'){
					$haslinkage = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'vc-status'){
					$vcstatus = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'has-criteria'){
					$hascriteria = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'vc-checkin-user-name'){
					$vccheckinusername = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'creation-time'){
					$creationtime = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'last-modified'){
					$lastmodified = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'attachment'){
					$attachment = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'subtype-id'){
					$subtypeid = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'vc-end-audit-action-id'){
					$vcendauditactionid = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'exec-status'){
					$execstatus = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'vc-checkin-comments'){
					$vccheckincomments = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'text-sync'){
					$textsync = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'step-param'){
					$stepparam = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		} elseif($fieldname == 'timeout'){
					$timeout = $array['entities'][$i]['Fields'][$j]['values'][0]['value'];
		}
	}
}
	$where .="('".$projectid."','".$estimatedevtime."','".$vccheckintime."','".$vcstartauditactionid."','".$verstamp."','".$description."','".$vcversionnumber."','".$devcomments."','".$template."','".$status."','".$hasdependencies."','".$steps."','".$runtimedata."','".$checkoutusername."','".$vccheckindate."','".$parentid."','".$vcdate."','".$owner."','".$vctime."','".$basetestid."','".$storagepath."','".$configurationscount."','".$id."','".$vccomments."','".$name."','".$haslinkage."','".$vcstatus."','".$hascriteria."','".$vccheckinusername."','".$creationtime."','".$lastmodified."','".$attachment."','".$vcendauditactionid."','".$subtypeid."','".$execstatus."','".$vccheckincomments."','".$stepparam."','".$textsync."','".$timeout."')";
		//print_r($array);
$query = $query.$where;
//echo $query;
mysqli_query($con,$query)or die(mysqli_connect_errno());
		
		
		
	

       }
}
	$result= mysqli_query($con,"select * FROM projectdetails where id='".$projectid."'")or die(mysqli_connect_errno());
$row=mysqli_fetch_array($result);

    logout($qc,$row['executionfield5']."/authentication-point/logout");
}
if($action == 'getdefectsdata')
{
	$projectid=$_POST['id'];
	
$result = mysqli_query($con,"select projectdetails.id,projectdetails.defectsfield5,projectdetails.defectsfield1,projectdetails.defectsfield2 from projectdetails where projectdetails.id ='".$projectid."'")or die(mysqli_connect_errno());
$row=mysqli_fetch_array($result);
//echo "select qctestset.id, projectdetails.id,projectdetails.designfield3,projectdetails.designfield1,projectdetails.designfield2 from projectdetails join qctestset where projectdetails.designfield4= qctestset.testsetfolder and projectdetails.id ='".$id."'";
	curl_setopt($qc, CURLOPT_URL, "https://".$row['defectsfield5']."/qcbin/rest/domains/".$row['defectsfield1']."/projects/".$row['defectsfield2']."/defects"); 
		 
		// echo "https://".$row['defectsfield5']."/qcbin/rest/domains/".$row['defectsfield1']."/projects/".$row['defectsfield2']."/defects";
		 $json = curl_exec($qc);
	$array=json_decode($json, true); 
	//print_r ($array);
	if($array!='')
{

	mysqli_query($con,"DELETE FROM qcdefects where projectid = '".$projectid."'")or die(mysqli_connect_errno());

	$query = "INSERT INTO `qcdefects`(`projectid`, `usertemplate08`, `usertemplate07`, `usertemplate09`, `plannedclosingver`, `haschange`, `reproducible`, `usertemplate02`, `usertemplate01`, `usertemplate04`, `usertemplate03`, `usertemplate06`, `usertemplate05`, `verstamp`, `hasotherslinkage`, `priority`, `description`, `runreference`, `devcomments`, `tomail`, `cycleid`, `status`, `closingdate`, `detectedinrel`, `estimatedfixtime`, `targetrel`, `project`, `stepreference`, `actualfixtime`, `requesttype`, `testreference`, `subject`, `requestid`, `requestserver`, `id`, `name`, `haslinkage`, `cyclereference`, `creationtime`, `requestnote`, `closingversion`, `detectionversion`, `lastmodified`, `detectedinrcyc`, `severity`, `usertemplate15`, `attachment`, `usertemplate14`, `usertemplate12`, `usertemplate11`, `usertemplate10`, `extendedreference`, `detectedby`, `targetrcyc`) VALUES";
	$where ="";
	
for ($i=0;$i<count($array['entities']);$i++)
{
	
	if($where !="")
	{
		$where .=",";
	}
	
	if(isset($array['entities'][$i]['Fields'][0]['values'][0]['value']))
		{
				$usertemplate08 = $array['entities'][$i]['Fields'][0]['values'][0]['value'];
		$usertemplate08 = str_replace("'", "`",$usertemplate08);
		}
		else
		{
				$usertemplate08 = "";
		}
		
		if(isset($array['entities'][$i]['Fields'][1]['values'][0]['value']))
		{
				$usertemplate07 = $array['entities'][$i]['Fields'][1]['values'][0]['value'];
		$usertemplate07=  str_replace("'", "`",$usertemplate07);
		}
		else
		{
				$usertemplate07 = "";
		}		
		if(isset($array['entities'][$i]['Fields'][2]['values'][0]['value']))
		{
				$usertemplate09 = $array['entities'][$i]['Fields'][2]['values'][0]['value'];
		$usertemplate09 = str_replace("'", "`",$usertemplate09);
		}
		else
		{
				$usertemplate09 = "";
		}		
			if(isset($array['entities'][$i]['Fields'][3]['values'][0]['value']))
		{
				$plannedclosingver = $array['entities'][$i]['Fields'][3]['values'][0]['value'];
		$plannedclosingver = str_replace("'", "`",$plannedclosingver);
		}
		else
		{
				$plannedclosingver = "";
		}		
				if(isset($array['entities'][$i]['Fields'][4]['values'][0]['value']))
		{
				$haschange = $array['entities'][$i]['Fields'][4]['values'][0]['value'];
		$haschange = str_replace("'", "`",$haschange);
		}
		else
		{
				$haschange = "";
		}		
				if(isset($array['entities'][$i]['Fields'][5]['values'][0]['value']))
		{
				$reproducible = $array['entities'][$i]['Fields'][5]['values'][0]['value'];
		$reproducible = str_replace("'", "`",$reproducible);
		}
		else
		{
				$reproducible = "";
		}	
			if(isset($array['entities'][$i]['Fields'][6]['values'][0]['value']))
		{
				$usertemplate02 = $array['entities'][$i]['Fields'][6]['values'][0]['value'];
		$usertemplate02 = str_replace("'", "`",$usertemplate02);
		}
		else
		{
				$usertemplate02 = "";
		}				
				if(isset($array['entities'][$i]['Fields'][7]['values'][0]['value']))
		{
				$usertemplate01 = $array['entities'][$i]['Fields'][7]['values'][0]['value'];
		$usertemplate01 = str_replace("'", "`",$usertemplate01);
		}
		else
		{
				$usertemplate01 = "";
		}				
				if(isset($array['entities'][$i]['Fields'][8]['values'][0]['value']))
		{
				$usertemplate04 = $array['entities'][$i]['Fields'][8]['values'][0]['value'];
		$usertemplate04 = str_replace("'", "`",$usertemplate01);
		}
		else
		{
				$usertemplate04 = "";
		}	
	if(isset($array['entities'][$i]['Fields'][9]['values'][0]['value']))
		{
				$usertemplate03 = $array['entities'][$i]['Fields'][9]['values'][0]['value'];
		$usertemplate03 = str_replace("'", "`",$usertemplate03);
		}
		else
		{
				$usertemplate03 = "";
		}		
	if(isset($array['entities'][$i]['Fields'][10]['values'][0]['value']))
		{
				$usertemplate06 = $array['entities'][$i]['Fields'][10]['values'][0]['value'];
		$usertemplate06 = str_replace("'", "`",$usertemplate06);
		}
		else
		{
				$usertemplate06 = "";
		}
	if(isset($array['entities'][$i]['Fields'][11]['values'][0]['value']))
		{
				$usertemplate05 = $array['entities'][$i]['Fields'][11]['values'][0]['value'];
		$usertemplate05 = str_replace("'", "`",$usertemplate05);
		}
		else
		{
				$usertemplate05 = "";
		}						
			if(isset($array['entities'][$i]['Fields'][12]['values'][0]['value']))
		{
				$verstamp = $array['entities'][$i]['Fields'][12]['values'][0]['value'];
		$verstamp = str_replace("'", "`",$verstamp);
		}
		else
		{
				$verstamp = "";
		}				
		if(isset($array['entities'][$i]['Fields'][13]['values'][0]['value']))
		{
				$hasotherslinkage = $array['entities'][$i]['Fields'][13]['values'][0]['value'];
		$hasotherslinkage = str_replace("'", "`",$hasotherslinkage);
		}
		else
		{
				$hasotherslinkage = "";
		}				
		if(isset($array['entities'][$i]['Fields'][14]['values'][0]['value']))
		{
				$priority	 = $array['entities'][$i]['Fields'][14]['values'][0]['value'];
		$priority = str_replace("'", "`",$priority);
		}
		else
		{
				$priority	 = "";
		}				
		if(isset($array['entities'][$i]['Fields'][15]['values'][0]['value']))
		{
				$description	 = $array['entities'][$i]['Fields'][15]['values'][0]['value'];
		$description = str_replace("'", "`",$description);
		}
		else
		{
				$description	 = "";
		}
		if(isset($array['entities'][$i]['Fields'][16]['values'][0]['value']))
		{
				$runreference	 = $array['entities'][$i]['Fields'][16]['values'][0]['value'];
		$runreference = str_replace("'", "`",$runreference);
		}
		else
		{
				$runreference	 = "";
		}
		if(isset($array['entities'][$i]['Fields'][17]['values'][0]['value']))
		{
				$devcomments	 = $array['entities'][$i]['Fields'][17]['values'][0]['value'];
		$devcomments = str_replace("'", "`",$devcomments);
		}
		else
		{
				$devcomments	 = "";
		}
		if(isset($array['entities'][$i]['Fields'][18]['values'][0]['value']))
		{
				$tomail	 = $array['entities'][$i]['Fields'][18]['values'][0]['value'];
		$tomail = str_replace("'", "`",$tomail);
		}
		else
		{
				$tomail	 = "";
		}
		if(isset($array['entities'][$i]['Fields'][19]['values'][0]['value']))
		{
				$cycleid	 = $array['entities'][$i]['Fields'][19]['values'][0]['value'];
			$cycleid = str_replace("'", "`",$cycleid);
		}
		else
		{
				$cycleid	 = "";
		}
		if(isset($array['entities'][$i]['Fields'][20]['values'][0]['value']))
		{
				$status	 = $array['entities'][$i]['Fields'][20]['values'][0]['value'];
			$status = str_replace("'", "`",$status);
		}
		else
		{
				$status	 = "";
		}
		if(isset($array['entities'][$i]['Fields'][21]['values'][0]['value']))
		{
				$closingdate	 = $array['entities'][$i]['Fields'][21]['values'][0]['value'];
			$closingdate = str_replace("'", "`",$closingdate);
		}
		else
		{
				$closingdate	 = "";
		}
		if(isset($array['entities'][$i]['Fields'][22]['values'][0]['value']))
		{
				$detectedinrel	 = $array['entities'][$i]['Fields'][22]['values'][0]['value'];
			$detectedinrel = str_replace("'", "`",$detectedinrel);
		}
		else
		{
				$detectedinrel	 = "";
		}
		if(isset($array['entities'][$i]['Fields'][23]['values'][0]['value']))
		{
				$estimatedfixtime	 = $array['entities'][$i]['Fields'][23]['values'][0]['value'];
			$estimatedfixtime = str_replace("'", "`",$estimatedfixtime);
		}
		else
		{
				$estimatedfixtime	 = "";
		}
		if(isset($array['entities'][$i]['Fields'][24]['values'][0]['value']))
		{
				$targetrel	 = $array['entities'][$i]['Fields'][24]['values'][0]['value'];
			$targetrel = str_replace("'", "`",$targetrel);
		}
		else
		{
				$targetrel	 = "";
		}
			if(isset($array['entities'][$i]['Fields'][25]['values'][0]['value']))
		{
				$project	 = $array['entities'][$i]['Fields'][25]['values'][0]['value'];
			$project = str_replace("'", "`",$project);
		}
		else
		{
				$project	 = "";
		}
			if(isset($array['entities'][$i]['Fields'][26]['values'][0]['value']))
		{
				$stepreference	 = $array['entities'][$i]['Fields'][26]['values'][0]['value'];
			$stepreference = str_replace("'", "`",$stepreference);
		}
		else
		{
				$stepreference	 = "";
		}
			if(isset($array['entities'][$i]['Fields'][27]['values'][0]['value']))
		{
				$actualfixtime	 = $array['entities'][$i]['Fields'][27]['values'][0]['value'];
			$actualfixtime = str_replace("'", "`",$actualfixtime);
		}
		else
		{
				$actualfixtime	 = "";
		}
			if(isset($array['entities'][$i]['Fields'][28]['values'][0]['value']))
		{
				$requesttype		 = $array['entities'][$i]['Fields'][28]['values'][0]['value'];
			$requesttype = str_replace("'", "`",$requesttype);
		}
		else
		{
				$requesttype		 = "";
		}
			if(isset($array['entities'][$i]['Fields'][29]['values'][0]['value']))
		{
				$testreference		 = $array['entities'][$i]['Fields'][29]['values'][0]['value'];
			$testreference = str_replace("'", "`",$testreference);
		}
		else
		{
				$testreference		 = "";
		}
		if(isset($array['entities'][$i]['Fields'][30]['values'][0]['value']))
		{
				$subject		 = $array['entities'][$i]['Fields'][30]['values'][0]['value'];
			$subject = str_replace("'", "`",$subject);
		}
		else
		{
				$subject		 = "";
		}
		if(isset($array['entities'][$i]['Fields'][31]['values'][0]['value']))
		{
				$requestid		 = $array['entities'][$i]['Fields'][31]['values'][0]['value'];
			$requestid = str_replace("'", "`",$requestid);
		}
		else
		{
				$requestid		 = "";
		}
		if(isset($array['entities'][$i]['Fields'][32]['values'][0]['value']))
		{
				$requestserver		 = $array['entities'][$i]['Fields'][32]['values'][0]['value'];
			$requestserver = str_replace("'", "`",$requestserver);
		}
		else
		{
				$requestserver		 = "";
		}
		if(isset($array['entities'][$i]['Fields'][33]['values'][0]['value']))
		{
				$id		 = $array['entities'][$i]['Fields'][33]['values'][0]['value'];
			$id = str_replace("'", "`",$id);
		}
		else
		{
				$id		 = "";
		}
			if(isset($array['entities'][$i]['Fields'][34]['values'][0]['value']))
		{
				$name		 = $array['entities'][$i]['Fields'][34]['values'][0]['value'];
			$name = str_replace("'", "`",$name);
		}
		else
		{
				$name		 = "";
		}
			if(isset($array['entities'][$i]['Fields'][35]['values'][0]['value']))
		{
				$haslinkage		 = $array['entities'][$i]['Fields'][35]['values'][0]['value'];
			$haslinkage = str_replace("'", "`",$haslinkage);
		}
		else
		{
				$haslinkage		 = "";
		}
			if(isset($array['entities'][$i]['Fields'][36]['values'][0]['value']))
		{
				$cyclereference		 = $array['entities'][$i]['Fields'][36]['values'][0]['value'];
			$cyclereference = str_replace("'", "`",$cyclereference);
		}
		else
		{
				$cyclereference		 = "";
		}
			if(isset($array['entities'][$i]['Fields'][37]['values'][0]['value']))
		{
				$creationtime		 = $array['entities'][$i]['Fields'][37]['values'][0]['value'];
			$creationtime = str_replace("'", "`",$creationtime);
		}
		else
		{
				$creationtime		 = "";
		}
		if(isset($array['entities'][$i]['Fields'][38]['values'][0]['value']))
		{
				$requestnote		 = $array['entities'][$i]['Fields'][38]['values'][0]['value'];
			$requestnote = str_replace("'", "`",$requestnote);
		}
		else
		{
				$requestnote		 = "";
		}
		if(isset($array['entities'][$i]['Fields'][39]['values'][0]['value']))
		{
				$closingversion		 = $array['entities'][$i]['Fields'][39]['values'][0]['value'];
			$closingversion = str_replace("'", "`",$closingversion);
			}
		else
		{
				$closingversion		 = "";
		}
		if(isset($array['entities'][$i]['Fields'][40]['values'][0]['value']))
		{
				$detectionversion		 = $array['entities'][$i]['Fields'][40]['values'][0]['value'];
			$detectionversion = str_replace("'", "`",$detectionversion);
		}
		else
		{
				$detectionversion		 = "";
		}		
		if(isset($array['entities'][$i]['Fields'][41]['values'][0]['value']))
		{
				$lastmodified		 = $array['entities'][$i]['Fields'][41]['values'][0]['value'];
			$lastmodified = str_replace("'", "`",$lastmodified);
		}
		else
		{
				$lastmodified		 = "";
		
		}
if(isset($array['entities'][$i]['Fields'][42]['values'][0]['value']))
		{
				$detectedinrcyc		 = $array['entities'][$i]['Fields'][42]['values'][0]['value'];
			$detectedinrcyc = str_replace("'", "`",$detectedinrcyc);
		}
		else
		{
				$detectedinrcyc		 = "";
		}	
if(isset($array['entities'][$i]['Fields'][43]['values'][0]['value']))
		{
				$severity		 = $array['entities'][$i]['Fields'][43]['values'][0]['value'];
			$severity = str_replace("'", "`",$severity);
		}
		else
		{
				$severity		 = "";
		}	
if(isset($array['entities'][$i]['Fields'][44]['values'][0]['value']))
		{
				$usertemplate15		 = $array['entities'][$i]['Fields'][44]['values'][0]['value'];
			$usertemplate15 = str_replace("'", "`",$usertemplate15);
		}
		else
		{
				$usertemplate15		 = "";
		}	
if(isset($array['entities'][$i]['Fields'][45]['values'][0]['value']))
		{
				$attachment		 = $array['entities'][$i]['Fields'][45]['values'][0]['value'];
			$attachment = str_replace("'", "`",$attachment);
		}
		else
		{
				$attachment		 = "";
		}	
if(isset($array['entities'][$i]['Fields'][46]['values'][0]['value']))
		{
				$usertemplate14		 = $array['entities'][$i]['Fields'][46]['values'][0]['value'];
			$usertemplate14 = str_replace("'", "`",$usertemplate14);
		}
		else
		{
				$usertemplate14		 = "";
		}				
if(isset($array['entities'][$i]['Fields'][47]['values'][0]['value']))
		{
				$usertemplate12		 = $array['entities'][$i]['Fields'][47]['values'][0]['value'];
			$usertemplate12 = str_replace("'", "`",$usertemplate12);
		}
		else
		{
				$usertemplate12		 = "";
		}	
		if(isset($array['entities'][$i]['Fields'][48]['values'][0]['value']))
		{
				$usertemplate11		 = $array['entities'][$i]['Fields'][48]['values'][0]['value'];
			$usertemplate11 = str_replace("'", "`",$usertemplate11);
		}
		else
		{
				$usertemplate11		 = "";
		}	
		if(isset($array['entities'][$i]['Fields'][49]['values'][0]['value']))
		{
				$usertemplate10		 = $array['entities'][$i]['Fields'][49]['values'][0]['value'];
			$usertemplate10 = str_replace("'", "`",$usertemplate10);
		}
		else
		{
				$usertemplate10		 = "";
		}	
			if(isset($array['entities'][$i]['Fields'][50]['values'][0]['value']))
		{
				$extendedreference		 = $array['entities'][$i]['Fields'][50]['values'][0]['value'];
			$extendedreference = str_replace("'", "`",$extendedreference);
		}
		else
		{
				$extendedreference		 = "";
		}	
			if(isset($array['entities'][$i]['Fields'][51]['values'][0]['value']))
		{
				$detectedby		 = $array['entities'][$i]['Fields'][51]['values'][0]['value'];
			$detectedby = str_replace("'", "`",$detectedby);
		}
		else
		{
				$detectedby		 = "";
		}	
			if(isset($array['entities'][$i]['Fields'][52]['values'][0]['value']))
		{
				$targetrcyc		 = $array['entities'][$i]['Fields'][52]['values'][0]['value'];
			$targetrcyc = str_replace("'", "`",$targetrcyc);
		}
		else
		{
				$targetrcyc		 = "";
		}
$where .="('".$projectid."','".$usertemplate08."','".$usertemplate07."','".$usertemplate09."','".$plannedclosingver."','".$haschange."','".$reproducible."','".$usertemplate02."','".$usertemplate01."','".$usertemplate04."','".$usertemplate03."','".$usertemplate06."','".$usertemplate05."','".$verstamp."','".$hasotherslinkage."','".$priority."','".$description."','".$runreference."','".$devcomments."','".$tomail."','".$cycleid."','".$status."','".$closingdate."','".$detectedinrel."','".$estimatedfixtime."','".$targetrel."','".$project."','".$stepreference."','".$actualfixtime."','".$requesttype."','".$testreference."','".$subject."','".$requestid."','".$requestserver."','".$id."','".$name."','".$haslinkage."','".$cyclereference."','".$creationtime."','".$requestnote."','".$closingversion."','".$detectionversion."','".$lastmodified."','".$detectedinrcyc."','".$severity."','".$usertemplate15."','".$attachment."','".$usertemplate14."','".$usertemplate12."','".$usertemplate11."','".$usertemplate10."','".$extendedreference."','".$detectedby."','".$targetrcyc."')";
		//print_r($array);
}
$query = $query.$where;
//echo $query;
mysqli_query($con,$query)or die(mysqli_connect_errno());
}


    logout($qc,$row['designfield5']."/authentication-point/logout");

       }
}
		
       else
       {
        echo "Authentication failed";
       }
	   }


	   
curl_close($qc);

function logout($qc, $url)
{
    curl_setopt($qc, CURLOPT_URL, $url);
        curl_setopt($qc, CURLOPT_HEADER, 0);
        curl_setopt($qc, CURLOPT_HTTPGET,1);
        curl_setopt($qc, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($qc);
	
}


function designtestset()
{

$result= mysqli_query($con,"select * FROM projectdetails where projectid='".$projectid."'")or die(mysqli_connect_errno());
$row=mysqli_fetch_array($result);


$server = $row['designfield5'];
$domains = $row['designfield1'];
$projects = $row['designfield2'];
$designtestsetfolder = $row['designfield3'];

//$domains = 'OP';
//$projects = 'SALES';
//$designtestsetfolder = 'AAAAAQAAPABSAAB';



	curl_setopt($qc, CURLOPT_URL, $server."/rest/domains/".$domains."/projects/".$projects."/test-sets?query={test-set-folder.hierarchical-path[".$designtestsetfolder."*]}"); 
		 $json = curl_exec($qc);
	$array=json_decode($json, true); 
//print_r ($array);
	if($array!='')
{

	mysqli_query($con,"DELETE FROM qctestset where domainname = '".$domains."' and projectname = '".$projects."'")or die(mysqli_connect_errno());

	$query = "insert into qctestset (domainname,projectname, testsetfolder, closedate, requestid, mailsettings, id, verstamp, osconfig, description, name, haslinkage,pinnedbaseline,reportsettings,assignrcyc,lastmodified,status,cycleconfig,execeventhandle,opendate,attachment,subtypeid,parentid,comment) values";
	$where ="";
	
for ($i=0;$i<count($array['entities']);$i++)
{
	
	if($where !="")
	{
		$where .=",";
	}
	
	
//	for($j=0;$j<count($array['entities'][$i]['Fields']);$j++)
	//{
	
		if(isset($array['entities'][$i]['Fields'][0]['values'][0]['value']))
		{
				$closedate = $array['entities'][$i]['Fields'][0]['values'][0]['value'];
				$closedate = str_replace("'","`",$closedate);
		}
		else
		{
				$closedate = "";
		}
		if(isset($array['entities'][$i]['Fields'][4]['values'][0]['value']))
		{
				$requestid = $array['entities'][$i]['Fields'][4]['values'][0]['value'];
				$requestid = str_replace("'","`",$requestid);
		}
		else
		{
				$requestid = "";
		}
		if(isset($array['entities'][$i]['Fields'][5]['values'][0]['value']))
		{
				$mailsettings = $array['entities'][$i]['Fields'][5]['values'][0]['value'];
				$mailsettings = str_replace("'","`",$mailsettings);
		}
		else
		{
				$mailsettings = "";
		}
		
		if(isset($array['entities'][$i]['Fields'][6]['values'][0]['value']))
		{
				$id = $array['entities'][$i]['Fields'][6]['values'][0]['value'];
				$id = str_replace("'","`",$id);
		}
		else
		{
				$id  = "";
		}
		if(isset($array['entities'][$i]['Fields'][7]['values'][0]['value']))
		{
				$verstamp = $array['entities'][$i]['Fields'][7]['values'][0]['value'];
				$verstamp = str_replace("'","`",$verstamp);
		}
		else
		{
				$verstamp  = "";
		}
		if(isset($array['entities'][$i]['Fields'][8]['values'][0]['value']))
		{
				$osconfig = $array['entities'][$i]['Fields'][8]['values'][0]['value'];
				$osconfig = str_replace("'","`",$osconfig);
		}
		else
		{
				$osconfig  = "";
		}
		if(isset($array['entities'][$i]['Fields'][9]['values'][0]['value']))
		{
				$description = $array['entities'][$i]['Fields'][9]['values'][0]['value'];
				$description = str_replace("'","`",$description);
		}
		else
		{
				$description  = "";
		}
		if(isset($array['entities'][$i]['Fields'][10]['values'][0]['value']))
		{
				$name = $array['entities'][$i]['Fields'][10]['values'][0]['value'];
				$name = str_replace("'","`",$name);
		}
		else
		{
				$name  = "";
		}
		if(isset($array['entities'][$i]['Fields'][11]['values'][0]['value']))
		{
				$haslinkage = $array['entities'][$i]['Fields'][11]['values'][0]['value'];
				$haslinkage = str_replace("'","`",$haslinkage);
		}
		else
		{
				$haslinkage  = "";
		}
		if(isset($array['entities'][$i]['Fields'][12]['values'][0]['value']))
		{
				$pinnedbaseline = $array['entities'][$i]['Fields'][12]['values'][0]['value'];
				$pinnedbaseline = str_replace("'","`",$pinnedbaseline);
		}
		else
		{
				$pinnedbaseline  = "";
		}
		if(isset($array['entities'][$i]['Fields'][13]['values'][0]['value']))
		{
				$reportsettings = $array['entities'][$i]['Fields'][13]['values'][0]['value'];
				$reportsettings = str_replace("'","`",$reportsettings);
		}
		else
		{
				$reportsettings  = "";
		}
		if(isset($array['entities'][$i]['Fields'][14]['values'][0]['value']))
		{
				$assignrcyc = $array['entities'][$i]['Fields'][14]['values'][0]['value'];
				$assignrcyc = str_replace("'","`",$assignrcyc);
		}
		else
		{
				$assignrcyc  = "";
		}
		if(isset($array['entities'][$i]['Fields'][15]['values'][0]['value']))
		{
				$lastmodified = $array['entities'][$i]['Fields'][15]['values'][0]['value'];
				$lastmodified = str_replace("'","`",$lastmodified);
		}
		else
		{
				$lastmodified  = "";
		}
		if(isset($array['entities'][$i]['Fields'][16]['values'][0]['value']))
		{
				$status = $array['entities'][$i]['Fields'][16]['values'][0]['value'];
				$status = str_replace("'","`",$status);
		}
		else
		{
				$status  = "";
		}
		if(isset($array['entities'][$i]['Fields'][17]['values'][0]['value']))
		{
				$cycleconfig = $array['entities'][$i]['Fields'][17]['values'][0]['value'];
				$cycleconfig = str_replace("'","`",$cycleconfig);
		}
		else
		{
				$cycleconfig  = "";
		}
		if(isset($array['entities'][$i]['Fields'][18]['values'][0]['value']))
		{
				$execeventhandle = $array['entities'][$i]['Fields'][18]['values'][0]['value'];
				$execeventhandle = str_replace("'","`",$execeventhandle);
		}
		else
		{
				$execeventhandle  = "";
		}
		if(isset($array['entities'][$i]['Fields'][19]['values'][0]['value']))
		{
				$opendate = $array['entities'][$i]['Fields'][19]['values'][0]['value'];
				$opendate = str_replace("'","`",$opendate);
		}
		else
		{
				$opendate  = "";
		}
		if(isset($array['entities'][$i]['Fields'][20]['values'][0]['value']))
		{
				$attachment = $array['entities'][$i]['Fields'][20]['values'][0]['value'];
		}
		else
		{
				$attachment  = "";
		}
				if(isset($array['entities'][$i]['Fields'][21]['values'][0]['value']))
		{
				$subtypeid = $array['entities'][$i]['Fields'][21]['values'][0]['value'];
				$subtypeid = str_replace("'","`",$subtypeid);
		}
		else
		{
				$subtypeid  = "";
		}
		if(isset($array['entities'][$i]['Fields'][22]['values'][0]['value']))
		{
				$parentid = $array['entities'][$i]['Fields'][22]['values'][0]['value'];
				$parentid = str_replace("'","`",$parentid);
		}
		else
		{
				$parentid  = "";
		}
				if(isset($array['entities'][$i]['Fields'][23]['values'][0]['value']))
		{
				$comment = $array['entities'][$i]['Fields'][23]['values'][0]['value'];
				$comment = str_replace("'","`",$comment);
		}
		else
		{
				$comment  = "";
		}
		$where .= "('".$domains."','".$projects."','".$designtestsetfolder."','".$closedate."','".$requestid."','".$mailsettings."','".$id."','".$verstamp."','".$osconfig."','".$description."','".$name."','".$haslinkage."','".$pinnedbaseline."','".$reportsettings."','".$assignrcyc."','".$lastmodified."','".$status."','".$cycleconfig."','".$execeventhandle."','".$opendate."','".$attachment."','".$subtypeid."','".$parentid."','".$comment."')";	
	
}
$query .= $where;
//echo $query;
mysqli_query($con,$query)or die(mysqli_connect_errno());

}
}


?>