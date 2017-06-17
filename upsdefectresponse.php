<?php
//include 'bestpdo.php';
error_reporting(0);
$url = "TFS2.json";
$pusharray="";
$url1="";
$pusharray1="";

// Open the file using the HTTP headers set above
$firstrequest = file_get_contents($url);
$firstrequestarray = json_decode($firstrequest,true);
$i=0;

foreach($firstrequestarray as $value)
{              
foreach($value as $k => $v)
{

foreach($v as $k1=>$v1)
{

$defectarray=array();
if($k1=='id')
{

if($pusharray !='')
{
$pusharray.=",";

}
$pusharray.=$v1;
$i+=1;
if($i%10==0)
{
$pusharray1=$pusharray;
$pusharray="";

$url1 ="http://tfs.ups.com:8080/tfs/UpsProd/_apis/wit/workItems/?ids=".$pusharray1."&api_version=1.0";
echo $url1;
//$url1="workitem.json";
$finalrequest = file_get_contents($url1);
$finalrequestarray = json_decode($finalrequest,true);
foreach ($finalrequestarray as $key=>$value)
{
foreach ($value as $k=>$v)
{
print_r($v);
}
}
}
}




}
}
} 





?>

