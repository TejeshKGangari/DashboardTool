<?php
//$username='us\hdc4crv';

//$password='jul@2016';
$username = $_POST['username'];
$password = $_POST['password'];
$projectid = $_POST['id'];	

$con=mysqli_connect("localhost","root","","upsdashboard");
$query1 = "select * from projectdetails where id ='".$projectid."'";
$result1 = mysqli_query($con,$query1)or die(mysql_error());
$row1=mysqli_fetch_array($result1);
$portfolio_name =  $row1['portfolio_name'];
$account_name=$row1['account_name'];
$server = $row1['defectsfield5'];
$domain = $row1['defectsfield1'];
$query = $row1['defectsfield3'];
$query= str_replace("`","'",$query);
//$server= 'http://tfs.ups.com:8080/tfs';
//$domain = 'UpsProd';
//$query = "Select [System.Id], [System.Title], [System.State] From WorkItems Where [ups.Release] = 'July 2016 Enterprise Release'";
//$projectid = '1';
// Check connection
if (mysqli_connect_errno())
 {
 echo "Failed to connect to MySQL: " . mysqli_connect_error();
 }
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_PORT => "8080",
  CURLOPT_URL => $server."/".$domain."/_apis/wit/wiql?api-version=1.0",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"query\": \"$query\"}",  //hardcoded the where clause
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache",
    "content-type: application/json",
    "postman-token: c0a7dc74-55a9-7bda-3811-12dfc795e5f4"
  ),
));
curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
curl_setopt($curl, CURLOPT_USERPWD, "$username:$password");
$response = curl_exec($curl);
echo $response;
$err = curl_error($curl);
curl_close($curl);
if ($err) {
//  echo "cURL Error #:" . $err;
} else {
 // echo $response;
}

//Building dynamic URL
error_reporting(0);
//$url = json_encode($response, true);
//print_r ($response);
$url = $response;
//print_r ($url);
$pusharray="";
$url1="";
$pusharray1="";
$j=0;
// Open the file using the HTTP headers set above
//$firstrequest = file_get_contents($response);
$firstrequestarray = json_decode($response,true);
$i=0;
//print_r ($firstrequestarray);

mysqli_query($con,"DELETE FROM tfsdefects where projectid = '".$projectid."'")or die(mysqli_connect_errno()); //hardcoded the where clause

foreach($firstrequestarray as $value)
{         

foreach($value as $k => $v)
{


foreach($v as $k1=>$v1)
{

//$defectarray=array();
if($k1=='id')
{

if($pusharray !='')
{
$pusharray.=",";

}
$pusharray.=$v1;
$i+=1;
//print_r ($pusharray);
if(++$j === count($value)) {
    $i=10;
  }

if($i%10==0)
{
$pusharray1=$pusharray;
$pusharray="";
echo $pusharray1;
//$url1 ="http://tfs.ups.com:8080/tfs/UpsProd/_apis/wit/workItems/?ids=".$pusharray1."&api_version=1.0";
//echo $url1;

//$url1="workitem.json";
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_PORT => "8080",
  CURLOPT_URL => $server."/".$domain."/_apis/wit/workItems/?ids=".$pusharray1."&api_version=1.0",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache",
    "content-type: application/json",
    "postman-token: c0a7dc74-55a9-7bda-3811-12dfc795e5f4"
  ),
));
curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
curl_setopt($curl, CURLOPT_USERPWD, "$username:$password");
$response1 = curl_exec($curl);
//echo $json($response);
$err = curl_error($curl);
curl_close($curl);
if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
$finalrequestarray = json_decode($response1,true);

	$array=json_decode($response1, true); 
   //	print_r ($array);
	if($array!='')
{

  	//mysqli_query($con,"DELETE FROM tfsdefects where projectid = '".$projectid."'")or die(mysqli_connect_errno());
	

	$query = "INSERT INTO `tfsdefects`(`projectid`,`defectid`, `description`, `raiseddate`, `severity`, `priority`, `status`, `projectrelease`, `createdby`, `rootcause`, `closeddate`,`portfolio_name`,`account_name`) VALUES";
	$where ="";
for ($i=0;$i<$array['count'];$i++)
{
	 
	if($where !="")
	{
		$where .=",";
	}
	 //$id=$array["value"][$i]["fields"]["System.AreaPath"];
	 //echo $id;
	if(isset($array["value"][$i]["id"]))
		{
			$defectid = $array["value"][$i]["id"];
			// echo $defectid;
		}
		else
		{
			$defectid = "";
		}
	if(isset($array["value"][$i]["fields"]["System.Title"]))
		{
				$description = $array['value'][$i]['fields']['System.Title'];
				$description = str_replace("'", "`",$description);
				//echo $description;
		}
		else
		{
				$description = "";
		}
	if(isset($array["value"][$i]["fields"]["System.CreatedDate"]))
		{
				$raiseddate = $array['value'][$i]['fields']['System.CreatedDate'];	
		}
		else
		{
				$raiseddate = "";
		}	
	if(isset($array["value"][$i]["fields"]["Microsoft.VSTS.Common.Severity"]))
		{
				$severity = $array['value'][$i]['fields']['Microsoft.VSTS.Common.Severity'];	
				$severity = str_replace("'", "`",$severity);
		}
		else
		{
				$severity = "";
		}
	if(isset($array["value"][$i]["fields"]["ups.priority"]))
		{
				$priority = $array['value'][$i]['fields']['ups.priority'];	
				$priority = str_replace("'", "`",$priority);
		}
		else
		{
				$priority = "";
		}
	if(isset($array["value"][$i]["fields"]["ups.Status"]))
		{
				$status = $array['value'][$i]['fields']['ups.Status'];	
				$status = str_replace("'", "`",$status);
		}
		else
		{
				$status = "";
		}
	if(isset($array["value"][$i]["fields"]["ups.Release"]))
		{
				$projectrelease = $array['value'][$i]['fields']['ups.Release'];	
				$projectrelease = str_replace("'", "`",$projectrelease);
		}
		else
		{
				$projectrelease = "";
		}
	if(isset($array["value"][$i]["fields"]["System.CreatedBy"]))
		{
				$createdby = $array['value'][$i]['fields']['System.CreatedBy'];	
				$createdby = str_replace("'", "`",$createdby);
		}
		else
		{
				$createdby = "";
		}
	if(isset($array["value"][$i]["fields"]["Microsoft.VSTS.CMMI.RootCause"]))
		{
				$rootcause = $array['value'][$i]['fields']['Microsoft.VSTS.CMMI.RootCause'];	
				$rootcause = str_replace("'", "`",$rootcause);
		}
		else
		{
				$rootcause = "";
		}
	if(isset($array["value"][$i]["fields"]["Microsoft.VSTS.Common.ClosedDate"]))
		{
				$closeddate = $array['value'][$i]['fields']['Microsoft.VSTS.Common.ClosedDate'];	
		}
		else
		{
				$closeddate = "";
		}
$where .="('".$projectid."','".$defectid."','".$description."','".$raiseddate."','".$severity."','".$priority."','".$status."','".$projectrelease."','".$createdby."','".$rootcause."','".$closeddate."','".$portfolio_name."','".$account_name."')";
		//print_r($array);
}
$query = $query.$where;
//echo $query;
mysqli_query($con,$query)or die(mysqli_connect_errno());
}

$i=0;
}




}
}
} 


}

?>