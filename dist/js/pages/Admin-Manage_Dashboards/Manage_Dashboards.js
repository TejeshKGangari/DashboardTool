function managedash()
{
var tabledata ="";
var url="";
url= "dist/php/managedashboard.php?action=gettemplate"+"&" + new Date().getTime();

$.get( url, function( data ) {
tabledata = "<div class='box-body'>"
+" <table id='example1' class='table table-bordered table-striped'>"
+"<thead>"
+"<tr>"
+"<th>Dashboard Name</th>"
+"<th>Project Name</th>"
+"<th>Portfolio Name</th>"
+"<th>Template</th>"
+"<th>Actions</th>"
+"</tr>"
+"</thead>"
+"<tbody>";

for(i=0; i<data.length; i++)
{
	tabledata =tabledata.concat("<tr>")
	+"<td>"
	+data[i][1]
	+"</td>"
	+"<td>";
if(data[i][4]===null){
tabledata =tabledata.concat("Portfolio");
}
else{
tabledata =tabledata.concat(data[i][4]);
}
tabledata =tabledata.concat("<td>")
	
	
	+data[i][3]
	+"</td>"
	+"<td>" 
	+data[i][2]
	+"</td>"
	+"<td>"
	+"<span class='fa fa-edit fa-2x' onclick='editdashboarddata("+data[i][0]+")'</span>"
	+"</td>"
	+"</tr>";
}
tabledata =tabledata.concat("</tbody>")
+"</table>"
+"</div>";
	



$("#content").html(tabledata);


var table = $("#example1").DataTable();
	
}, "json" );



$("#buttons").html("<button class='btn btn-default' onclick='dashboards()'><i class='fa fa-plus'></i> Add item</button>");

valstandard = "<div></div>"
$(".standard-values").html(valstandard);

managedashboardsheader = "<h1>"
+"Manage Dashboard"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Manage Dashboard</li>"
+"</ol>";
$(".content-header").html(managedashboardsheader);
}


function displayprojectdetails(dashboardid,projectid)
{

	 $.ajax({
  method: "POST",
  url:"dist/php/managedashboard.php?action=getprojectdetails"+"&" + new Date().getTime(),
  data: { project: projectid }
})
  .done(function( data ) {
 
  var data = jQuery.parseJSON( data );	
  var edr=0; 
  var ftpr=0;  
  var tdp=0;
    var drr=0;
  var red=false;
  var amber=false;
  
     if(data[3]==0)
	{
		edr=0;
		ftpr=0;
		tep=0;
		drr=0;
		//sv=0;
		//ev=0;
	}
	else{
		edr=(data[1]/data[3]);
		edr=edr.toFixed(2);
		var int_edr = Math.ceil(edr);
          		
		
		ftpr=(data[5]/data[3]);
		ftpr=ftpr.toFixed(2)*100;
		var int_ftpr = Math.ceil(ftpr);
		tep=parseFloat(data[6]);
		tep=tep.toFixed(2);
		var int_tep = Math.ceil(tep);
		drr=(data[12]/data[13]);
		drr=drr.toFixed(2);

	    //var date1=data[7];
		//var date2=data[8];
		//sv=Math.abs(date2.getTime() - date1.getTime());
	}

		
		
	tabledata = "<div class='box-body table-responsive no-padding'>"
 +"<div class='container-fluid'>"
	+"<table>"	
+"<tr><th><font color='green'>Efficiency:</font></th></tr>"
+"</table>"	

+" <table id='example1' class='table table-hover' border='1'>"	
+"<col width='100px'>"
+"<col width='100px'>"
+"<col width='100px'>"
+"<col width='100px'>"
+"<thead>"	

+"<tr  bgcolor='#b3dffc'>"
+"<th style='text-align:center'>Metric Name</th>"
+"<th style='text-align:center'>Status</th>"
+"<th style='text-align:center'>Actual Metric</th>"
//+"<th style='text-align:center'>Benchmark<a href='#'><i class='fa fa-info-circle pull-right' id='tooltipex' title='View Benchmark Standards' onclick='benchmarkpage()'></i></a></th>"
+"<th style='text-align:center'>Benchmark<a href='Capture.jpg'><i class='fa fa-info-circle pull-right' id='tooltipex' title='View Benchmark Standards' onclick=<div class='thumbnail'><img src='' style='width:10px'></a></div></i></th>"

+"</tr>"
+"</thead>"
+"<tbody>";
 
			tabledata =tabledata.concat("<tr>")
	+"<td>Test Design Productivity"
	+"</td>"
	+"<td align='center'>";
	if(int_tep<10)
		{
			
			 //tabledata =tabledata.concat("<span class='fa fa-circle text-red'><span>");	
		}
		else if(int_tep<24)
		{
			
			//tabledata =tabledata.concat("<span class='fa fa-circle text-green'><span>");	 
		}
	


	tabledata =tabledata.concat("</td>")	
	
	//+"</td>"
	+"<td align='center'>"
	//+tep
	+"</td>"
	+"<td align='center'>"
	+">15"
	+"</td>"
	+"</tr>";

tabledata =tabledata.concat("<tr>")
	+"<td>Test Execution Productivity"
	+"</td>"
	+"<td align='center'>";
	if(int_tep<17)
		{
			
			 tabledata =tabledata.concat("<span class='fa fa-circle text-red'><span>");	
		}
		else if(int_tep>17)
		{
			
			tabledata =tabledata.concat("<span class='fa fa-circle text-green'><span>");	 
		}
	


	tabledata =tabledata.concat("</td>")	
	
	//+"</td>"
	+"<td align='center'>"
	+tep
	+"</td>"
	+"<td align='center'>"
	+">17"
	+"</td>"
	+"</tr>";
	
		tabledata =tabledata.concat("<tr>")
	+"<td >First Time Pass Rate "
	+"</td>"
	+"<td align='center'>";
          if(int_ftpr < 0)
		{
			
			tabledata =tabledata.concat("<span class='fa fa-circle text-red'><span>");	
		}
		else
		{////alert(edr);
			 tabledata =tabledata.concat("<span class='fa fa-circle text-green'><span>");	 
		}
		tabledata =tabledata.concat("</td>")	
	
	+"<td align='center'>"
	+ftpr
	+"%"
	+"</td>"
	+"<td align='center'>"
	+">0"
	+"</td>"
	+"</tr>"; 

			tabledata =tabledata.concat("<tr>")
	+"<td >Schedule Variation-Design"
	+"</td>"
	+"<td align='center'>";
	
		 //tabledata =tabledata.concat("<span class='fa fa-circle text-red'><span>");	 
	 


	tabledata =tabledata.concat("</	td>")	
	
	//+"</td>"
	+"<td align='center'> "
	//+sv
	//+"0"
	+"</td>"
	+"<td align='center'>"
	+"±3"

	+"</td>"
	+"</tr>";
	
		tabledata =tabledata.concat("<tr>")
	+"<td >Schedule Variation-Execution"
	+"</td>"
	+"<td align='center'>";
	 
	 //tabledata =tabledata.concat("<span class='fa fa-circle text-red'><span>");	

	tabledata =tabledata.concat("</td>")	
	
	//+"</td>"
	+"<td align='center'> "
	//+ev
	//+"0"
	+"</td>"
	+"<td align='center'> "
	+"±3"
	+"</td>"
	+"</tr>";

	
managedashboardsheader = "<h1>"
+data[7]
+" Metrics Summary"
+"<small>"
+"<button type='button' id='tooltipex' onclick='managesummary()' class=' fa fa-reply'  title='Back'></button></h1>"
+"</small>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Projects Summary</a></li>"
+"</ol>";
$(".content-header").html(managedashboardsheader);


tabledata =tabledata.concat("</tbody>")
+"</table>"
+"</div>"


	+"<div class='container-fluid'>"
	+"<table>"	
+"<tr><th><font color='green'>Effectiveness:</font></th></tr>"
+"</table>"	

+" <table id='example1' class='table table-hover' border='1'>"	
+"<col width='100px'>"
+"<col width='100px'>"
+"<col width='100px'>"
+"<col width='100px'>"
+"<thead>"	

+"<tr  bgcolor='#b3dffc'>"
+"<th style='text-align:center'>Metric Name</th>"
+"<th style='text-align:center'>Status</th>"
+"<th style='text-align:center'>Actual Metric</th>"
+"<th style='text-align:center'>Benchmark<a href='Capture.jpg'><i class='fa fa-info-circle pull-right' id='tooltipex' title='View Benchmark Standards' onclick=<div class='thumbnail'><img src='' style='width:10px'></a></div></i></th>"


+"</tr>"
+"</thead>"
+"<tbody>";
 
    tabledata =tabledata.concat("<tr>")
	+"<td>Error Discovery Rate"
	+"</td>"
	+"<td align='center'>";	
	if(int_edr <0.46)
		{
			
			tabledata =tabledata.concat("<span class='fa fa-circle text-red'></span>");	
		}
		else
		{
			////alert(edr);
			 tabledata =tabledata.concat("<span class='fa fa-circle text-green'></span>");	 
		}
	


	tabledata =tabledata.concat("</td>")	
	
	//+"</td>"
	+"<td align='center'>"
	+edr
	+"%"
	+"</td>"
	+"<td align='center'>"
	+">0.46%"
	+"</td>"
	+"</tr>";

tabledata =tabledata.concat("<tr>")
	+"<td>Defect Re-open Rate"
	+"</td>"
	+"<td align='center'>";
	if(drr>2.03)
		{
			
			 tabledata =tabledata.concat("<span class='fa fa-circle text-red'><span>");	
		}
		else if(drr<2.03)
		{
			
			tabledata =tabledata.concat("<span class='fa fa-circle text-green'><span>");	 
		}
	


	tabledata =tabledata.concat("</td>")	
	
	//+"</td>"
	+"<td align='center'>"
	+drr
	+"%"
	+"</td>"
	+"<td align='center'>"
	+"<2.03%"
	+"</td>"
	+"</tr>";
	
	tabledata =tabledata.concat("</tbody>")
	+"</table>"	
	+"</div>"
	
	+"<div class='container-fluid'>"
	+"<table>"	
+"<tr><th><font color='green'>Execution Completion:</font></th></tr>"
+"</table>"	
+"</div>"

// Third Table
	+"<div class='container-fluid'>"

 +" <table id='example1' class='table table-hover' border='1' style='outline:thin solid'>"	
 +"<col width='100px'>"
 +"<col width='100px'>"
 +"<col width='100px'>"
+"<thead>"	

+"<tr  bgcolor='#b3dffc'>"
+"<th style='text-align:center'>Pass%</th>"
+"<th style='text-align:center'>Fail%</th>"
+"<th style='text-align:center'>Completion%</th>"
+"</tr>"
+"</thead>"
+"</table>"

	

 +" <table id='example1' class='table table-hover' border='1'>"	
+"<thead>"
/* +"<col width='75px'>"
+"<col width='75px'>"
+"<col width='75px'>"
+"<col width='75px'>"
+"<col width='75px'>"	
 */
+"<tr  bgcolor='#e0f0ff' border='1'>"
+"<th style='text-align:center' border='1px'>Defects By Severity</th>"
+"<th style='text-align:center' border='1px'>Critical</th>"
+"<th style='text-align:center' border='1px'>High</th>"
+"<th style='text-align:center' border='1px'>Medium</th>"
+"<th style='text-align:center' border='1px'>Low</th>"
+"</tr>"
+"</thead>"
+"<tbody>"; 

 tabledata =tabledata.concat("<tr>")
+"<td align='center'>"+data[11]+"</td>"
+"<td align='center'>nil</td>"
+"<td align='center'>"+data[8]+"</td>"
+"<td align='center'>"+data[10]+"</td>"
+"<td align='center' >"+data[9]+"</td>"
+"</tr>";


tabledata =tabledata.concat("</tbody>")
	+"</table>"
	

	
	+" <table id='example1' class='table table-hover' border='1'>"	
+"<thead>"	
/* +"<col width='75px'>"
+"<col width='75px'>"
+"<col width='75px'>"
+"<col width='75px'>"
+"<col width='75px'>" */	
+"<tr  bgcolor='#e0f0ff'>"

+"<th style='text-align:center'>&nbspDefects By &nbspStatus&nbsp&nbsp</th>"
+"<th style='text-align:center'>Critical</th>"
+"<th style='text-align:center'>High</th>"
+"<th style='text-align:center'>Medium</th>"
+"<th style='text-align:center'>Low</th>"
+"</tr>"
+"</thead>"
+"<tbody>"; 

 tabledata =tabledata.concat("<tr>")
+"<td align='center'>nil</td>"
+"<td align='center'>nil</td>"
+"<td align='center'>nil</td>"
+"<td align='center'>nil</td>"
+"<td align='center'>nil</td>"
+"</tr>";


tabledata =tabledata.concat("</tbody>")
	+"</table>"
	
	+"</div>"
	
	
+"</div>"	
+"</div>";	
$("#content").html(tabledata);
$("#buttons").html("");

  });
}

function benchmarkpage()
{
$.get( "dist/php/managedashboard.php?action=projectdetails"+"&", function( data) {

tabledata = "<div align='center'><b><strong><h2>Metric Benchmarks</strong></b></h2></div>"
+"<div box-body table-responsive no-padding'>"
+" <table id='example1' class='table table-hover' border='1' >"
+"<thead>"

+"<tr bgcolor='#b3dffc'>"
+"<th style='text-align:center ;width:100px '>Metric Name</th>"
+"<th style='text-align:center;width:100px'>Inception</th>"
+"<th style='text-align:center;width:100px'>Functional</th>"
+"<th style='text-align:center;width:100px' bgcolor='orange'>Performing</th>"
+"<th style='text-align:center;width:100px'>BIC</th>"
+"</tr>"
+"</thead>"
+"<tbody>";
	tabledata =tabledata.concat("<tr>")
	+"<td align='center'>"
	+"Test Design Productivity"
	
	+"</td>"
	+"<td align='center'>"
+"13.17"
+"</td>"
	+"<td align='center'>"
+"15.30"
	+"</td>"
	+"<td align='center' bgcolor='orange'>"
	+"17.68"
	+"</td>"
    +"<td align='center'>"
+"20.02"
	+"</td>"
	+"</tr>";
	tabledata =tabledata.concat("<tr>")
	+"<td align='center'>"
	+"Test Execution Productivity"
	+"</td>"
	+"<td align='center'>"
+"13.75"
+"</td>"
	+"<td align='center'>"
+"16.58"
	+"</td>"
	+"<td align='center'bgcolor='orange'>"
	+"18.00"
	+"</td>"
    +"<td align='center'>"
+"23.96"
	+"</td>"
	+"</tr>";
	tabledata =tabledata.concat("<tr>")
	+"<td align='center'>"
	+"Schedule Variation-Design"
	+"</td>"
	+"<td align='center'>"
+"2.21"
+"</td>"
	+"<td align='center'>"
+"0.99"
	+"</td>"
	+"<td align='center'bgcolor='orange'>"
	+"0.62"
	+"</td>"
    +"<td align='center'>"
+"0.00"
	+"</td>"
	+"</tr>";
	tabledata =tabledata.concat("<tr>")
	+"<td align='center'>"
	+"Schedule Variation-Execution"
	+"</td>"
	+"<td align='center'>"
+"1.05"
+"</td>"
	+"<td align='center'>"
+"0.48"
	+"</td>"
	+"<td align='center'bgcolor='orange'>"
	+"0.34"
	+"</td>"
    +"<td align='center'>"
+"0.00"
	+"</td>"
	+"</tr>";
	tabledata =tabledata.concat("<tr>")
	+"<td align='center'>"
	+"Error Discovery Rate"
	+"</td>"
	+"<td align='center'>"
+"0.27"
+"</td>"
	+"<td align='center'>"
+"0.46"
	+"</td>"
	+"<td align='center'bgcolor='orange'>"
	+"0.72"
	+"</td>"
    +"<td align='center'>"
+"2.26"
	+"</td>"
	+"</tr>";
	tabledata =tabledata.concat("<tr>")
	+"<td align='center'>"
	+"Defect Re-open Rate"
	+"</td>"
	+"<td align='center'>"
+"4.35"
+"</td>"
	+"<td align='center'>"
+"2.03"
	+"</td>"
	+"<td align='center'bgcolor='orange'>"
	+"1.22"
	+"</td>"
    +"<td align='center'>"
+"0.43"
	+"</td>"
	+"</tr>";
//
tabledata =tabledata.concat("</tbody>")
+"</table>"
+"</div>";
$("#content").html(tabledata);
//table table-hover
}, "json" );

	
/*managedashboardsheader = "<h1>"
+"Projects Summary"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Projects Summary</a></li>"
+"</ol>";
$(".content-header").html(managedashboardsheader);

valstandard = "<div> </div>"
$(".standard-values").html(valstandard);	
$("#buttons").html("");*/

}






function managesummary()
{

$.get( "dist/php/managedashboard.php?action=gettemplate1"+"&" + new Date().getTime(), function( data ) {
//////alert(data[0][1]);

  var edr=0; 
  var ftpr=0;  
  var tdp=0;
  var sv=0;
  var ev=0;
	
	var red= false;
    var amber= false;	


tabledata = "<div box-body table-responsive no-padding'>"
+" <table id='example1' class='table table-hover' border='5' >"
+"<thead>"
+"<tr bgcolor='#b3dffc'>"
+"<th style='text-align:center'>Project Name</th>"
+"<th style='text-align:center'>Status</th>"
+"<th style='text-align:center'>Current Phase</th>"
+"<th style='text-align:center'>No of Resources</th>"
+"<th style='text-align:center'>View Project Details</th>"
+"</tr>"
+"</thead>"
+"<tbody>";

for(i=0; i<data.length; i++)
{
	
	
	  if(data[i][8]==0)
	{
		edr=0;
		ftpr=0;
		tdp=0;
		//sv=0;
	}
	else{
		edr=(data[i][6]/data[i][8]);
		var int_edr = Math.ceil( edr );

		ftpr=(data[i][10]/data[i][8]);
		ftpr=ftpr.toFixed(2);
		int_ftpr=Math.ceil( ftpr );

		tep=parseFloat(data[i][11]);
		tep=tep.toFixed(2);
		var int_tep = Math.ceil(tep);
		//var date1=new date(data[i][12]);
		//date1
		var date2=data[i][13];
		//sv=Math.abs(date2.getTime() - date1.getTime());
		////alert(data[i][12]);
	
	}
	if(int_edr>2)
		{
			
			red=true;
		}
		else 
		{
			amber=true;
		}
	 if(int_ftpr<0)
		{
			
			red=true;
		}
		else if(int_ftpr==0)
		{
		
			amber=true;
		} 
	
		
	if(int_tep<10)
		{
			
			red=true;
		}
		else if(int_tep<24)
		{
			
			amber=true;
		}
		
		
	/* 	 if(sv<0)
		{
			
			red=true;
		}
		else if(sv>0)
		{
			
			amber=true;
		} 
		
		 if(ev<0)
		{
			
			red=true;
		}
		else if(ev>0)
		{
			
			amber=true;
		}  */
		
		
	tabledata =tabledata.concat("<tr>")
	+"<td align='center' onclick='displayprojectdetails("+data[i][1]+","+data[i][4]+")'>"
	+"<a href='#'>"
	+data[i][0]
	+"</a>"
	+"</td>"
	+"<td align='center'>";
		
	if(red)
    {
      tabledata =tabledata.concat("<span class='fa fa-circle text-red'><span>");	

     }

	 else
	 {
		 tabledata =tabledata.concat("<span class='fa fa-circle text-green'><span>");	 
	 }



tabledata =tabledata.concat("<span></span> ");	

	tabledata =tabledata.concat("</td>")	
	+"<td align='center'>"
	+data[i][2]
	+"</td>"
	+"<td align='center'>"
	+data[i][3]
	+"</td>"
    +"<td align='center'>"
	+"<a href='#'>"
	+"<span class='glyphicon glyphicon-eye-open' onclick='dashboarddata("+data[i][1]+")'</span></a>"
	+"</td>"
	+"</tr>";
}
tabledata =tabledata.concat("</tbody>")
+"</table>"
+"</div>";
$("#content").html(tabledata);
//table table-hover
}, "json" );

	
managedashboardsheader = "<h1>"
+"Projects Summary"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Projects Summary</a></li>"
+"</ol>";
$(".content-header").html(managedashboardsheader);

valstandard = "<div> </div>"
$(".standard-values").html(valstandard);	
$("#buttons").html("");
}
function addquery(sectionid)
{

$('#myModalLabel').html("Select Query");	
myModalbody = "<table style='width:100%'>"
+"<tr>"
+"<td style='width:40%'>"
+"Query Name"
+"</td>"
+"<td style='width:60%'>"
+"<select class='form-control' id='queryname' type='text' placeholder='Query Name'>"
+"</select>"
+"</td>"
+"</tr>"

+"</table>";
myModalfooter="<button class='btn btn-default' onclick=cancel()>Cancel</button>"
+"&nbsp"
+"<button class='btn btn-default' onclick=querypreview('"+sectionid+"')>Preview</button>"
+"&nbsp"
+"<button class='btn btn-default' onclick=querydashboardsave('"+sectionid+"')>save</button>";
$('#myModalfooter').html(myModalfooter);
$('#myModalbody').html(myModalbody);
 $('#myModal').modal({show:true});	

}

function cancel(){
	$('#myModal').modal('hide');
}


function dashboards(){

var createdashboards="";
$("#content").html(createdashboards);
createdashboards = "<div class='box-body'>"

+" <table style='width:100%'>"

+"<tr>"
+"<td style='width:10%'><label class='control-label' for='account_name'>Account Name</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<select class='form-control' id='accountnameinput' type='text' placeholder='Account Name'></select>"
+"</div>"

+"</tr>"

+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>&nbsp</td>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>&nbsp</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'><label class='control-label' for='dashboardname'>Dashboard Name</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='dashboardname' type='text' placeholder='Dashboard Name' maxlength='50'></td>"
+"</div>"


+"<td style='width:10%'><label class='control-label' for='projectname'>Project Name</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<select class='form-control' id='projectnameinput' type='text' placeholder='Project Name'></select>"
+"</div>"

+"</tr>"
+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>&nbsp</td>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>&nbsp</td>"
+"</tr>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='groups'>Groups</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<select id = 'groups'  class='form-control' multiple></select>"
+"</div>"
+"</td>"



+"<td style='width:10%'><label class='control-label' for='portfolio_nametname'>Portfolio Name</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<select class='form-control' id='portfolio_nameinput' type='text' placeholder='Portfolio Name'></select>"


+"</div>"
+"</td>"
+"<td style='width:10%'></td>"
+"<td style='width:40%'></td>"



+"</tr>"
+"</table>"
+"&nbsp"
+"<div class='form-group' style='padding:15px;max-height:68vh;overflow-y:scroll;'>"
    +"<div class='container'>"
      +"<div class='row'>"

        +"<div class='col-sm-4 sample-item'>"
          +"<h4><input type='radio' name='template' value='1'>&nbspQuarter Grid</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/quarter-grid.png'>"
        +"</div>"

        +"<div class='col-sm-4 sample-item'>"
		  +"<h4><input type='radio' name='template' value='2'>&nbspThirds Grid</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/thirds-grid.png'>"
        +"</div>"

        +"<div class='col-sm-4 sample-item'>"
		+"<h4><input type='radio' name='template' value='HeroThirds'>&nbspHero Thirds</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/hero-thirds.png'>"
        +"</div>"

      +"</div>"
      +"<div class='row'>"
        +"<div class='col-sm-4 sample-item'>"
          +"<h4><input type='radio' name='template' value='SplitCenetered'>&nbspSplit Centered</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/split-centered.png'>"
        +"</div>"

        +"<div class='col-sm-4 sample-item'>"
          +"<h4><input type='radio' name='template' value='SplitColumns'>&nbspSplit Columns</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/split-columns.png'>"
        +"</div>"

        +"<div class='col-sm-4 sample-item'>"
          +"<h4><input type='radio' name='template' value='SplitRows'>&nbspSplit Rows</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/split-rows.png'>"
        +"</div>"

      +"</div>"

      +"<div class='row'>"

        +"<div class='col-sm-4 sample-item'>"
          +"<h4><input type='radio' name='template' value='HeroSidebar'>&nbspHero Sidebar</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/hero-sidebar.png'>"
        +"</div>"

        +"<div class='col-sm-4 sample-item'>"
          +"<h4><input type='radio' name='template' value='TwoandOne'>&nbspTwo-and-One</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/two-and-one.png'>"
        +"</div>"
		
		        +"<div class='col-sm-4 sample-item'>"
          +"<h4><input type='radio' name='template' value='NewDashboard'>&nbspNew Dashboard</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/create-dashboard.png'>"
        +"</div>"
		
      +"</div>"
      +"</div>"
+"</div>";


$("#content").html(createdashboards);

$.get( "dist/php/managedashboard.php?action=projectdetails", function( data ) {
fielddata="";
fielddata=fielddata.concat("<option data-val='0'>None (for account/portfolio)</option>");
for (i=0;i<data.length;i++)
{
fielddata=fielddata.concat("<option data-val='"+data[0][0]+"'>"+data[i][1]+"</option>");
}
$('#projectnameinput').html(fielddata);
}, "json" );
 
$.get( "dist/php/managedashboard.php?action=accountdetails", function( data ) {
fielddata="";
for (i=0;i<data.length;i++)
{
fielddata=fielddata.concat("<option data-val='"+data[0][0]+"'>"+data[i][0]+"</option>");
}
$('#accountnameinput').html(fielddata);
}, "json" );
  



$.get( "dist/php/managedashboard.php?action=portfoliodetails", function( data ) {
fielddata="";
fielddata=fielddata.concat("<option data-val='Account Level'>Account Level</option>");
for (i=0;i<data.length;i++)
{
fielddata=fielddata.concat("<option data-val='"+data[i][0]+"'>"+data[i][0]+"</option>");
}
$('#portfolio_nameinput').html(fielddata);
}, "json" );




$.get( "dist/php/managegroups.php?action=getgroups", function( data1 ) {
	
	var data1 = jQuery.parseJSON( data1 );
	var fieldvalue = "";
	for(i=0;i<data1.length;i++)
	{

			fieldvalue = fieldvalue.concat("<option value='"+data1[i][0]+"'>"+data1[i][1]+"</option>");
	}
$('#groups').html(fieldvalue);	
})

$("#buttons").html("<button class='btn btn-default' onclick='dashboardtemp()'>Create</button>");
createdashboardheader = "<h1>"
+"Manage Dashboard"
+"<small>"
+"Create Dashboard"
+"</small>"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Manage Dashboard</li>"
+"<li class='active'>Create</li>"
+"</ol>"
$(".content-header").html(createdashboardheader);
}

function dashboardtemp(){
	var dashboardname = $('#dashboardname').val();
	var portfolio_name = $('#portfolio_nameinput').val();
	//var projectname = $('#projectnameinput').data("val");
	var projectname = $('#projectnameinput').find(':selected').data('val');
	var project = $('#projectnameinput').val();
	
	var account_name =  $('#accountnameinput').find(':selected').data('val');
	var account = $('#accountnameinput').val();
	
	//////alert(project);
	dashboardname = $.trim(dashboardname);
	portfolio_name = $.trim(portfolio_name);
	var template = $("input[name='template']:checked").val();
	//////alert(template);
groups = [];    
    $("#groups :selected").each(function(){
        groups .push($(this).val()); 
    });
	var groups = JSON.stringify(groups)
	
	if((dashboardname != "")&&($("input[name='template']").is(':checked')))
	{
	var selectedtemplate = $( "input:radio[name=template]:checked" ).val();
	//////alert(selectedtemplate);
	dashboardname=dashboardname.replace("'","`");
	$.post( "dist/php/managedashboard.php?action=create", { dashboardname: dashboardname,portfolio_name:portfolio_name, projectname: projectname,template:selectedtemplate,groups:groups,account_name:account })
	.done(function( data ) {
var data = jQuery.parseJSON( data );		
		$('#myModalLabel').html("Success Message");
		$('#myModalbody').html(data[1]);
		$('#myModalfooter').html("<button class='btn btn-default' id = 'success' data-dashboardname='"+dashboardname+"' data-dashboard = '"+data[0]+"' data-project='"+project+"' data-projectname='"+projectname+"' data-selectedtemplate = '"+selectedtemplate+"'onclick=dashboardtemplist()>OK</button>");
		$('#myModal').modal({show:true});	
		
	});
	}
	else
	{
		content = "<ul>";
		if(dashboardname == "")
		{
			content =content.concat("<li>Please enter a Dashboard Name</li>");
		}
		if(!$("input[name='template']").is(':checked'))
		{
			content =content.concat("<li>Please select a template</li>");
		}
		content =content.concat("</ul>");
		$('#myModalLabel').html("Error Message");
		$('#myModalbody').html(content);
		$('#myModalfooter').html("<button class='btn btn-default' onclick='cancel()'>Cancel</button>");
		$('#myModal').modal({show:true});	
	}
}
function dashboardtemplist(){

template = $('#success').data("selectedtemplate");
project = $('#success').data("project");
dashboard = $('#success').data("dashboard");
projectname = $('#success').data("projectname");
dashboardname = $('#success').data("dashboardname");
$('#myModal').modal('hide');
//////alert(projectname);

$.get( "dist/php/managedashboard.php?action=templatedetails",{ templateid: template }, function( data ) {
$("#content").html(data[0][1]);
}, "json" );

createdashboardheader = "<h1>"
+"Manage Dashboard"
+"<small>"
+" ("
+"Project Name : "
+"<b><span id='project' data-val='"
+projectname
+"'>"
+project
+"</span></b>"
+" Dashboard Name : "
+"<b><span id='dashboard' data-val='"
+dashboard
+"'>"
+dashboardname
+"</span></b>"
+")"
+"</small>"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Manage Dashboard</li>"
+"<li class='active'>Create</li>"
+"</ol>"
$(".content-header").html(createdashboardheader);	
}

function addquery(sectionid)
{

/* $.get( "dist/php/managedashboard.php?action=querydetails", function( data ) {
fielddata="";
for (i=0;i<data.length;i++)
{
fielddata=fielddata.concat("<option id='"+data[i]+"'>"+data[i]+"</option>");
}
$('#querynamefront').html(fielddata);
}, "json" ); */

$('#myModalLabel').html("Select Query");	
myModalbody = "<table style='width:100%'>"
+"<tr>"
+"<td style='width:40%'>"
+"Query Name"
+"</td>"
+"<td style='width:60%'>"
+"<select class='form-control' id='querynamefront' type='text' placeholder='Query Name'>"
+"<option id='Test Execution Status'>Test Execution Status</option>"
+"<option id='Test Execution trend'>Test Execution trend</option>"
+"<option id='Defect Trend'>Defect Trend</option>"
+"<option id='Defects by Priority'>Defects by Priority</option>"
+"<option id='Defects by Severity'>Defects by Severity</option>"
+"<option id='Defects by status'>Defects by status</option>"
//+"<option id='Defects by status'>Quality of fix</option>"
+"<option id='Defects by status'>Error Discovery Rate</option>"
+"</select>"
+"</td>"
+"</tr>"

+"</table>";
	



myModalfooter="<button class='btn btn-default' onclick=cancel()>Cancel</button>"
+"&nbsp"
+"<button class='btn btn-default' onclick=newquery('"+sectionid+"')>New Query</button>"
+"&nbsp"
+"<button class='btn btn-default' onclick=newparameter('"+sectionid+"')>New Parameter</button>"
+"&nbsp"
+"<button class='btn btn-default' onclick=querypreview('"+sectionid+"')>Preview</button>"
+"&nbsp"
$('#myModalfooter').html(myModalfooter);
$('#myModalbody').html(myModalbody);
 $('#myModal').modal({show:true});

}
function newparameter(sectionid){

myModalbody = "<table id='struct' style='width:100%'>"
+"<tr>"
+"<td style='width:40%'>"
+"Parameter Name"
+"</td>"
+"<td style='width:60%'>"
+"<input class='form-control' id='parametername' type='text' placeholder='Parameter Name'>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"Chart Name"
+"</td>"
+"<td style='width:60%'>"
+"<input class='form-control' id='chartname' type='text' placeholder='Chart Name'>"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"Chart Type"
+"</td>"
+"<td style='width:60%'>"
+"<select class='form-control' id='charttype' onchange=setlimit(this.value)>"
+"<option id='piechart'>Pie Chart</option>"
+"<option id='barchart'>Bar Chart</option>"
//+"<option id='barchart'>Stacked Bar Chart</option>"
+"<option id='linechart'>Line Chart</option>"
+"<option id='donutchart'>Donut Chart</option>"
+"<option id='meterGauge'>Meter Gauge</option>"
+"<option id='value'>Value</option>"
+"</select>"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"X-axis Parameter"
+"</td>"
+"<td style='width:60%'>"
+"<input class='form-control' id='xaxisparameter' type='text' placeholder='X-axis Parameter' >"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"Y-axis Parameter"
+"</td>"
+"<td style='width:60%'>"
+"<input class='form-control' id='yaxisparameter' type='text' placeholder='Y-axis Parameter' >"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"UCL"
+"</td>"
+"<td style='width:60%'>"
+"<input class='form-control' id='ucl' type='text' placeholder='Upper Control Limit' disabled>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"LCL"
+"</td>"
+"<td style='width:60%'>"
+"<input class='form-control' id='lcl' type='text' placeholder='Lower Control Limit' disabled>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"<input class='form-control' data-text='parameter' type='text' placeholder='Parameter' >"
+"</td>"
+"<td style='width:60%'>"
+"<input class='form-control' data-text='value' type='text' placeholder='value' >"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"<button onclick='addrow()'>Add Row</button>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"Formula"
+"</td>"
+"<td style='width:60%'>"
+"<textarea class='form-control' id='formula' style='overflow:auto;resize:none' type='text' placeholder='Formula' disabled></textarea>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"Notes"
+"</td>"
+"<td style='width:60%'>"
+"<textarea class='form-control' id='notes' style='overflow:auto;resize:none' type='text' placeholder='Notes'></textarea>"
+"</td>"
+"</tr>"


+"</table>";	
	$('#myModalbody').html(myModalbody);

	myModalfooter="<button class='btn btn-default' onclick=cancel()>Cancel</button>"
+"&nbsp"
+"<button class='btn btn-default' onclick=parameterpreview('"+sectionid+"')>Preview</button>"
+"&nbsp"
+"<button class='btn btn-default' onclick=parametersave('"+sectionid+"')>save</button>";
$('#myModalfooter').html(myModalfooter);


}

function parameterpreview(sectionid){

parametername = $('#parametername').val();
parametername=parametername.replace("'","`");

chartname = $('#chartname').val();
chartname=chartname.replace("'","`");

ucl = $('#ucl').val();
lcl = $('#lcl').val();


xaxis = $('#xaxisparameter').val();
yaxis = $('#yaxisparameter').val();

charttype = $('#charttype').val();
charttype=charttype.replace("'","`");
formula = $('#formula').val();
formula=formula.replace("'","`");

notes = $('#notes').val();
notes=notes.replace("'","`");
completeparam = new Array();
$("input[data-text]").each(function(){
    	 var text = $(this).data('text');
		
		
		 if(text == 'parameter')
		 {
		parameter = $(this).val();
		
		
		 }
		 else if (text == 'value')
		 {
		 value = $(this).val();
		 if((value!='')&&(parameter!=''))
		 {
		 lineparam = new Array();		
		lineparam.push('parameter');
		lineparam.push(parameter);
		 lineparam.push(value);
		 completeparam.push(lineparam);
		 }
		 }
		 

		 
});
if(formula!='')
{

size = completeparam.length;

for(i=0;i<size;i++)
{
eval("var " + completeparam[i][1] + "=" + completeparam[i][2] + ";");
}

	lineparam = new Array();
	lineparam.push('formula');
		lineparam.push(formula);
		lineparam.push(eval(formula));
		completeparam.push(lineparam);

}
//completeparam = completeparam.toString();
if((parametername!='')&&(completeparam!=''))
{


  $('#myModalLabel').html("Preview Chart");

		//$('#myModalfooter').html("<button class='btn btn-default' onclick=cancelquery('"+queryname+"','"+chartname+"','"+searchquery+"','"+charttype+"','"+ucl+"','"+lcl+"')>Cancel</button>");
if(charttype=='Pie Chart')
{
chartcontent ="<canvas id='previewchart' style='height:250px'></canvas><div id='js-legend' class='chart-legend'></div>";
		$('#myModalbody').html(chartcontent);
		var pieChartCanvas = $("#previewchart").get(0).getContext("2d");
		
        
		 var PieData = [];
		 for(i=0;i<completeparam.length;i++)
		 {
		 r = Math.floor(Math.random() * 200);
    g = Math.floor(Math.random() * 200);
    b = Math.floor(Math.random() * 200);
    c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')';
		 var dataset = parseInt(completeparam[i][2]);
		PieData.push({value:dataset,color:c,highlight:h,label:completeparam[i][1]});
		 }
		var pieOptions = {
          //Boolean - Whether we should show a stroke on each segment
          segmentShowStroke: true,
          //String - The colour of each segment stroke
          segmentStrokeColor: "#fff",
          //Number - The width of each segment stroke
          segmentStrokeWidth: 2,
          //Number - The percentage of the chart that we cut out of the middle
          percentageInnerCutout: 00, // This is 0 for Pie charts
          //Number - Amount of animation steps
          animationSteps: 100,
          //String - Animation easing effect
          animationEasing: "easeOutBounce",
          //Boolean - Whether we animate the rotation of the Doughnut
          animateRotate: true,
          //Boolean - Whether we animate scaling the Doughnut from the centre
          animateScale: false,
          //Boolean - whether to make the chart responsive to window resizing
          responsive: true,
          // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
          maintainAspectRatio: false,
          //String - A legend template
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        };
        //Create pie or douhnut chart
        // You can switch between pie and douhnut using the method below.
        var pieChart = new Chart(pieChartCanvas).Doughnut(PieData, pieOptions);
document.getElementById('js-legend').innerHTML = pieChart.generateLegend();
}
else if(charttype=='Donut Chart')
{
chartcontent ="<canvas id='previewchart' style='height:250px'></canvas><div id='js-legend' class='chart-legend'></div>";
		$('#myModalbody').html(chartcontent);
var pieChartCanvas = $("#previewchart").get(0).getContext("2d");
		
        
		 var PieData = [];
		 for(i=0;i<completeparam.length;i++)
		 {
		 r = Math.floor(Math.random() * 200);
    g = Math.floor(Math.random() * 200);
    b = Math.floor(Math.random() * 200);
    c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')';
		 var dataset = parseInt(completeparam[i][2]);
		PieData.push({value:dataset,color:c,highlight:h,label:completeparam[i][1]});
		 }
		var pieOptions = {
          //Boolean - Whether we should show a stroke on each segment
          segmentShowStroke: true,
          //String - The colour of each segment stroke
          segmentStrokeColor: "#fff",
          //Number - The width of each segment stroke
          segmentStrokeWidth: 2,
          //Number - The percentage of the chart that we cut out of the middle
          percentageInnerCutout: 50, // This is 0 for Pie charts
          //Number - Amount of animation steps
          animationSteps: 100,
          //String - Animation easing effect
          animationEasing: "easeOutBounce",
          //Boolean - Whether we animate the rotation of the Doughnut
          animateRotate: true,
          //Boolean - Whether we animate scaling the Doughnut from the centre
          animateScale: false,
          //Boolean - whether to make the chart responsive to window resizing
          responsive: true,
          // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
          maintainAspectRatio: false,
          //String - A legend template
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        };
        //Create pie or douhnut chart
        // You can switch between pie and douhnut using the method below.
        var pieChart = new Chart(pieChartCanvas).Doughnut(PieData, pieOptions);
document.getElementById('js-legend').innerHTML = pieChart.generateLegend();

}
else if (charttype=='Bar Chart')
{

	chartcontent ="<canvas id='previewchart' style='height:250px'></canvas><div id='js-legend' class='chart-legend'></div>";
	 		$('#myModalbody').html(chartcontent);
			var labelsname = [];
			var datavalues = [];
			var datasetsvalue = [];
var data = completeparam;
if(xaxis.indexOf("Dateseries") > -1)
{
var dateFieldValue = new Date(data[0][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data.length);i++)
{
var dateFieldValue = new Date(data[i][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{

labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[i][2]);
}

dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

}

else if(xaxis.indexOf("Dateonlyweekdaysseries") > -1)
{
var dateFieldValue = new Date(data[0][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data.length);i++)
{
var dateFieldValue = new Date(data[i][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
    var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
//	////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[i][2]);
}
}
dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

}

else if(xaxis.indexOf("Seriesonlyweekdaystilldate") > -1)
{
//////alert("Seriesonlyweekdaystilldate");
var dateFieldValue = new Date(data[0][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data.length);i++)
{
var dateFieldValue = new Date(data[i][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
   var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
//	////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[i][2]);
}
}
dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

var today = new Date();
var year = today.getFullYear()+"";
var month = (today.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = today.getDate()+"";
var newdate = year + "-" + month + "-" + day;

for(;currentdate < newdate;)
{

currentdate = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = currentdate.getFullYear()+"";
var month = (currentdate.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = currentdate.getDate()+"";
var currentdate = year + "-" + month + "-" + day;


   var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
//	////alert(dayname);
if(dayname<=5)
{

labelsname.push(currentdate);
datavalues.push('0');
}
}
}

else if(xaxis.indexOf("Seriestilldate") > -1)
{
////////alert("Seriestilldate");
var dateFieldValue = new Date(data[0][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data.length);i++)
{
var dateFieldValue = new Date(data[i][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
  
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[i][2]);
}

dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

var today = new Date();
var year = today.getFullYear()+"";
var month = (today.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = today.getDate()+"";
var newdate = year + "-" + month + "-" + day;

for(;currentdate < newdate;)
{

currentdate = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = currentdate.getFullYear()+"";
var month = (currentdate.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = currentdate.getDate()+"";
var currentdate = year + "-" + month + "-" + day;


labelsname.push(currentdate);
datavalues.push('0');

}
}

else
{

for(i=0;i<completeparam.length;i++)
{
labelsname.push(completeparam[i][1]);
datavalues.push(completeparam[i][2]);
}
}			

 r = Math.floor(Math.random() * 200);
    g = Math.floor(Math.random() * 200);
    b = Math.floor(Math.random() * 200);
    c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')';
 datasetsvalue.push({label:"",fillColor:c,strokeColor:c,pointColor:c,pointStrokeColor:c, pointHighlightFill:h,pointHighlightStroke:h,data:datavalues});

 var areaChartData = {
          labels: labelsname,
          datasets: datasetsvalue
        };
	 var barChartCanvas = $("#previewchart").get(0).getContext("2d");
         var barChart = new Chart(barChartCanvas);
        var barChartData = areaChartData;
       // barChartData.datasets[1].fillColor = "#00a65a";
       // barChartData.datasets[1].strokeColor = "#00a65a";
       // barChartData.datasets[1].pointColor = "#00a65a";
        var barChartOptions = {
          //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
          scaleBeginAtZero: true,
          //Boolean - Whether grid lines are shown across the chart
          scaleShowGridLines: true,
          //String - Colour of the grid lines
          scaleGridLineColor: "rgba(0,0,0,.05)",
          //Number - Width of the grid lines
          scaleGridLineWidth: 1,
          //Boolean - Whether to show horizontal lines (except X axis)
          scaleShowHorizontalLines: true,
          //Boolean - Whether to show vertical lines (except Y axis)
          scaleShowVerticalLines: true,
          //Boolean - If there is a stroke on each bar
          barShowStroke: true,
          //Number - Pixel width of the bar stroke
          barStrokeWidth: 2,
          //Number - Spacing between each of the X value sets
          barValueSpacing: 5,
          //Number - Spacing between data sets within X values
          barDatasetSpacing: 1,
          //String - A legend template
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
          //Boolean - whether to make the chart responsive
          responsive: true,
          maintainAspectRatio: false
        };

        barChartOptions.datasetFill = false;
        barChart.Bar(barChartData, barChartOptions);
      
}

else if(charttype=='Line Chart')
{

	chartcontent ="<canvas id='previewchart' style='height:250px'></canvas><div id='js-legend' class='chart-legend'></div>";
	 		$('#myModalbody').html(chartcontent);
			var labelsname = [];
			var datavalues = [];
			var datasetsvalue = [];
data = completeparam;
if(xaxis.indexOf("Dateseries") > -1)
{
var dateFieldValue = new Date(data[0][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data.length);i++)
{
var dateFieldValue = new Date(data[i][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{

labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[i][2]);
}

dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}


}


else if(xaxis.indexOf("Dateonlyweekdaysseries") > -1)
{
var dateFieldValue = new Date(data[0][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data.length);i++)
{
var dateFieldValue = new Date(data[i][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{

   var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
	//////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[i][2]);
}
}
dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}


}

else if(xaxis.indexOf("Seriestilldate") > -1)
{
//////alert("Seriestilldate");
var dateFieldValue = new Date(data[0][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data.length);i++)
{
var dateFieldValue = new Date(data[i][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[i][2]);
}

dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

var today = new Date();
var year = today.getFullYear()+"";
var month = (today.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = today.getDate()+"";
var newdate = year + "-" + month + "-" + day;

for(;currentdate < newdate;)
{

currentdate = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = currentdate.getFullYear()+"";
var month = (currentdate.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = currentdate.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
labelsname.push(currentdate);
datavalues.push('0');
}
}

else if(xaxis.indexOf("Seriesonlyweekdaystilldate") > -1)
{
//////alert("Seriestilldate");
var dateFieldValue = new Date(data[0][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data.length);i++)
{
var dateFieldValue = new Date(data[i][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
 var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
//	////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[i][2]);
}
}
dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

var today = new Date();
var year = today.getFullYear()+"";
var month = (today.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = today.getDate()+"";
var newdate = year + "-" + month + "-" + day;

for(;currentdate < newdate;)
{

currentdate = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = currentdate.getFullYear()+"";
var month = (currentdate.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = currentdate.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
 var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
//	////alert(currentdate);
//	////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
datavalues.push('0');
}
}
}
else
{
for(i=0;i<data.length;i++)
{
labelsname.push(data[i][1]);
datavalues.push(data[i][2]);
}
}			

 r = Math.floor(Math.random() * 200);
    g = Math.floor(Math.random() * 200);
    b = Math.floor(Math.random() * 200);
    c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')';
 datasetsvalue.push({label:"",fillColor:c,strokeColor:c,pointColor:c,pointStrokeColor:c, pointHighlightFill:h,pointHighlightStroke:h,data:datavalues});

 var areaChartData = {
          labels: labelsname,
          datasets: datasetsvalue
       
		};
		
		 var areaChartOptions = {
          //Boolean - If we should show the scale at all
          showScale: true,
          //Boolean - Whether grid lines are shown across the chart
          scaleShowGridLines: false,
          //String - Colour of the grid lines
          scaleGridLineColor: "rgba(0,0,0,.05)",
          //Number - Width of the grid lines
          scaleGridLineWidth: 1,
          //Boolean - Whether to show horizontal lines (except X axis)
          scaleShowHorizontalLines: true,
          //Boolean - Whether to show vertical lines (except Y axis)
          scaleShowVerticalLines: true,
          //Boolean - Whether the line is curved between points
          bezierCurve: true,
          //Number - Tension of the bezier curve between points
          bezierCurveTension: 0.3,
          //Boolean - Whether to show a dot for each point
          pointDot: false,
          //Number - Radius of each point dot in pixels
          pointDotRadius: 4,
          //Number - Pixel width of point dot stroke
          pointDotStrokeWidth: 1,
          //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
          pointHitDetectionRadius: 20,
          //Boolean - Whether to show a stroke for datasets
          datasetStroke: true,
          //Number - Pixel width of dataset stroke
          datasetStrokeWidth: 2,
          //Boolean - Whether to fill the dataset with a color
          datasetFill: true,
          //String - A legend template
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
          //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
          maintainAspectRatio: false,
          //Boolean - whether to make the chart responsive to window resizing
          responsive: true
        };

		
	        var lineChartCanvas = $("#previewchart").get(0).getContext("2d");
        var lineChart = new Chart(lineChartCanvas);
        var lineChartOptions = areaChartOptions;
        lineChartOptions.datasetFill = false;
        lineChart.Line(areaChartData, lineChartOptions);
      

	}

	else if(charttype=='Meter Gauge')
{

	chartcontent ="<div id='g1' class='gauge'></div>";
	$('#myModalbody').html(chartcontent);
//	////alert(completeparam[0][2]);
//	////alert(ucl);
//	////alert(lcl);
	if((ucl !='')&&(lcl !=''))
	{
      var g1 = new JustGage({
        id: 'g1',
        value: completeparam[0][2],
        min: xaxis,
        max: yaxis,
        symbol: '%',
        pointer: true,
        gaugeWidthScale: 0.6,
        levelcolors: [{
          color: '#00ff00',
          lo: xaxis,
          hi: lcl
        },
		{
          color: '#ff0000',
          lo: lcl,
          hi: ucl
        }, 		
		{
          color: '#00ff00',
          lo: ucl,
          hi: yaxis
        }],
		counter: true
      });
	}
	else if ((ucl !='')&&(lcl==''))
	{
		      var g1 = new JustGage({
        id: 'g1',
        value: completeparam[0][2],
        min: xaxis,
        max: yaxis,
        symbol: '%',
        pointer: true,
        gaugeWidthScale: 0.6,
        levelcolors: [{
          color: '#ff0000',
          lo: xaxis,
          hi: ucl
        },
		{
          color: '#00ff00',
          lo: ucl,
          hi: yaxis
        }],
		counter: true
      });
		
	}
	
		else if ((lcl !='')&&(ucl==''))
	{
		      var g1 = new JustGage({
        id: 'g1',
        value: completeparam[0][2],
        min: xaxis,
        max: yaxis,
        symbol: '%',
        pointer: true,
        gaugeWidthScale: 0.6,
        levelcolors: [{
          color: '#ff0000',
          lo: xaxis,
          hi: lcl
        },
		{
          color: '#00ff00',
          lo: lcl,
          hi: yaxis
        }],
		counter: true
      });
		
	}
	else
	{
	
			      var g1 = new JustGage({
        id: 'g1',
        value: completeparam[0][2],
        min: xaxis,
        max: yaxis,
        symbol: '%',
        pointer: true,
        gaugeWidthScale: 0.6,
        levelcolors: [{
          color: '#ff0000',
          lo: xaxis,
          hi: yaxis
        }],
		counter: true
      });
	  
	}
	}
	
	else if(charttype=='Value')
{
	
//chartcontent = "<div style='text-align: center'><div id='text' style='display: inline-block;'>"+data+"</div></div>";
//$('#myModalbody').html(chartcontent);

	chartcontent ="<canvas id='myCanvas' style='height:250px'></canvas><div id='js-legend' class='chart-legend'></div>";
	 		$('#myModalbody').html(chartcontent);

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

ctx.font = "60px Georgia";
ctx.fillText(parseFloat(Math.round(data * 100) / 100).toFixed(2), 75, 100);

}
	
completeparam = completeparam.toString();
	myModalfooter="<button class='btn btn-default' data-queryname='"+parametername+"' data-chartname='"+chartname+"' data-searchquery='"+completeparam+"' data-charttype='"+charttype+"' data-ucl='"+ucl+"' data-lcl='"+lcl+"' data-notes='"+notes+"' id='cancelparameter' onclick=cancelparameter('"+sectionid+"')>Cancel</button>"
	+"&nbsp"
	+"<button class='btn btn-default' data-queryname='"+parametername+"' data-chartname='"+chartname+"' data-searchquery='"+completeparam+"' data-charttype='"+charttype+"' data-ucl='"+ucl+"' data-lcl='"+lcl+"' data-xaxis='"+xaxis+"' data-yaxis='"+yaxis+"' data-notes='"+notes+"' id='querydashboardsave' onclick=parameterdashboardsave('"+sectionid+"')>Save</button>";
$('#myModalfooter').html(myModalfooter);
/*}); 


$.ajax({
  method: "POST",
  url: "dist/php/managedashboard.php?action=querysave",
  data: { queryname:parametername,chartname:chartname,charttype:charttype,searchquery:completeparam,ucl:ucl,lcl:lcl,xaxis:xaxisparameter, yaxis:yaxisparameter,notes:notes,dashboard:dashboard, projectname:projectname, sectionid:sectionid, type:'parameter'}
})
.done(function( data ) {
		$('#myModalLabel').html("Success Message");
		$('#myModalbody').html(data);
		$('#myModalfooter').html("<button class='btn btn-default' onclick=displaychart('"+sectionid+"')>OK</button>");
		$('#myModal').modal({show:true});	
	});
*/
}
else
{
	error = "<ul>";
		if(parametername == "")
		{
				error=error.concat("<li>Please enter Parameter Name</li>");
		}
		if(completeparam == "")
		{
				error=error.concat("<li>Please enter Parameters and Formula</li>");
		}
		error=error.concat("</ul>");
		charttype=charttype.replace(" ","-");
		$('#myModalLabel').html("Error Message");
		$('#myModalbody').html(error);
		$('#myModalfooter').html("<button class='btn btn-default' data-queryname='"+parametername+"' data-chartname='"+chartname+"' data-searchquery='"+completeparam+"' data-charttype='"+charttype+"' data-ucl='"+ucl+"' data-lcl='"+lcl+"' data-xaxis='"+xaxisparameter+"' data-yaxis='"+yaxisparameter+"' data-notes='"+notes+"' id='cancelparameter' onclick=cancelparameter('"+sectionid+"')>OK</button>");
		$('#myModal').modal({show:true});	
}
}
function addrow(){

$("tr:nth-child(15)").after("<tr><td>&nbsp</td><td>&nbsp</td></tr><tr><td><input class='form-control' data-text='parameter' type='text' placeholder='Parameter' ></td><td><input class='form-control' data-text='value' type='text' placeholder='value' ></td></tr>");

}

function cancel(){
	$('#myModal').modal('hide');
}

function newquery(sectionid){
	
var querynamefront = document.getElementById("querynamefront");
 querynamefront = querynamefront.options[querynamefront.selectedIndex].text;

	projectname = $('#project').data('val');
	portfolio_name = $('#portfolio_name').data('val');
	account=$('#account').data('val');
	
	
	if (projectname === undefined || projectname === null) {
     // do something 
	projectname=0;
	}
	if(querynamefront=='Test Execution Status')
	{
		if(portfolio_name=='Account Level')
		{
		 query='SELECT STATUS , COUNT( * )FROM qctestinstances where account_name="'+account+'" GROUP BY STATUS';   	
		}
		else if(projectname==0)
		{
		 query='SELECT STATUS , COUNT( * )FROM qctestinstances where account_name="'+account+'" and portfolio_name ="'+portfolio_name+'" GROUP BY STATUS';   	
		}
		else{
	      query='SELECT STATUS , COUNT( * )FROM qctestinstances where projectid = "'+projectname+'" and portfolio_name ="'+portfolio_name+'" and account_name="'+account+'" GROUP BY STATUS';   
	    
	    }
	}

	if(querynamefront=='Test Execution trend')
	{
		if(portfolio_name=='Account Level')
		{
		 query='SELECT execdate, COUNT( * ) test_case_count FROM qctestinstances WHERE account_name="'+account+'" GROUP BY execdate LIMIT 0 , 10';   	
		}
		else if(projectname==0)
		{
		   query='SELECT execdate, COUNT( * ) test_case_count FROM qctestinstances WHERE portfolio_name ="'+portfolio_name+'" and account_name="'+account+'" GROUP BY execdate LIMIT 0 , 30';   
	      	
		}
		else{
	      query='SELECT execdate, COUNT( * ) test_case_count FROM qctestinstances WHERE projectid = "'+projectname+'" and portfolio_name ="'+portfolio_name+'" and account_name="'+account+'" GROUP BY execdate LIMIT 0 , 30';   
	    
	    }
	}
	

	if(querynamefront=='Defect Trend')
	{
		if(portfolio_name=='Account Level')
		{
		 query='SELECT CAST( raiseddate AS DATE ) , COUNT( * ) FROM  `tfsdefects` WHERE raiseddate >= DATE_SUB( CURDATE( ) , INTERVAL 5 DAY )  AND  account_name="'+account+'" GROUP BY CAST( raiseddate AS DATE )';  	
		}
		else if(projectname==0)
		{
		   query='SELECT CAST( raiseddate AS DATE ) , COUNT( * ) FROM  `tfsdefects` WHERE raiseddate >= DATE_SUB( CURDATE( ) , INTERVAL 5 DAY )  AND  portfolio_name ="'+portfolio_name+'" and account_name="'+account+'" GROUP BY CAST( raiseddate AS DATE )';
	    	
		}
		else{
	      query='SELECT CAST( raiseddate AS DATE ) , COUNT( * ) FROM  `tfsdefects` WHERE raiseddate >= DATE_SUB( CURDATE( ) , INTERVAL 5 DAY )  AND projectid = "'+projectname+'" and portfolio_name ="'+portfolio_name+'" and account_name="'+account+'" GROUP BY CAST( raiseddate AS DATE )';
	    
	    }
	}
	
	if(querynamefront=='Defects by Priority')
	{
		if(portfolio_name=='Account Level')
		{
		 query='SELECT priority, count(*) FROM `tfsdefects` where account_name="'+account+'" group by priority';  	
		}
		else if(projectname==0)
		{
		   query='SELECT priority, count(*) FROM `tfsdefects` where portfolio_name ="'+portfolio_name+'" and account_name="'+account+'" group by priority';
	    
		}
		else{
	      query='SELECT priority, count(*) FROM `tfsdefects` where projectid = "'+projectname+'" and portfolio_name ="'+portfolio_name+'" and account_name="'+account+'" group by priority';
	    
	    }
	}
	
	if(querynamefront=='Defects by Severity')
	{
		if(portfolio_name=='Account Level')
		{
		 query='SELECT severity, count(*) FROM `tfsdefects` where account_name="'+account+'" group by severity';  	
		}
		else if(projectname==0)
		{
		 query='SELECT severity, count(*) FROM `tfsdefects` where portfolio_name ="'+portfolio_name+'" and account_name="'+account+'" group by severity';
	    
		}
		else{
	      query='SELECT severity, count(*) FROM `tfsdefects` where projectid = "'+projectname+'" and portfolio_name ="'+portfolio_name+'" and account_name="'+account+'" group by severity';
	    
	    }
	}

	if(querynamefront=='Defects by status')
	{
		if(portfolio_name=='Account Level')
		{
		 query='SELECT status, count(*) FROM `tfsdefects` where account_name="'+account+'" group by status';  	
		}
		else if(projectname==0)
		{
		 query='SELECT status, count(*) FROM `tfsdefects` where portfolio_name ="'+portfolio_name+'" and account_name="'+account+'" group by status';
	    
		}
		else{
	      query='SELECT status, count(*) FROM `tfsdefects` where projectid = "'+projectname+'" and portfolio_name ="'+portfolio_name+'" and account_name="'+account+'" group by status';
	    
	    }
	}
	if(querynamefront=='Quality of fix')
	{
		if(portfolio_name=='Account Level')
		{
		 query='select((SELECT count(*) FROM `tfsdefects` WHERE status="closed" AND account_name= "'+account+'" )- (SELECT count(*) FROM `tfsdefects` WHERE status="reopened" AND account_name="'+account+'")) / ((SELECT count(*) FROM `tfsdefects` WHERE status="closed" AND account_name="'+account+'") + (SELECT count(*) FROM `tfsdefects` WHERE status <> "Closed" AND "reopened" AND account_name="'+account+'")) * 100 ';   	
		}
		else if(projectname==0)
		{
		 query='select((SELECT count(*) FROM `tfsdefects` WHERE status="closed" AND account_name= "'+account+'" and portfolio_name="'+portfolio_name+'")- (SELECT count(*) FROM `tfsdefects` WHERE status="reopened" AND account_name="'+account+'" and portfolio_name="'+portfolio_name+'")) / ((SELECT count(*) FROM `tfsdefects` WHERE status="closed" AND account_name="'+account+'" and portfolio_name="'+portfolio_name+'") + (SELECT count(*) FROM `tfsdefects` WHERE status <> "Closed" AND "reopened" AND account_name="'+account+'" and portfolio_name="'+portfolio_name+'")) * 100 ';   
		}
		else{
	      query='select((SELECT count(*) FROM `tfsdefects` WHERE status="closed" AND account_name= "'+account+'" and portfolio_name="'+portfolio_name+'" and projectid = "'+projectname+'")- (SELECT count(*) FROM `tfsdefects` WHERE status="reopened" AND account_name="'+account+'" and portfolio_name="'+portfolio_name+'" and projectid = "'+projectname+'")) / ((SELECT count(*) FROM `tfsdefects` WHERE status="closed" AND account_name="'+account+'" and portfolio_name="'+portfolio_name+'" and projectid = "'+projectname+'") + (SELECT count(*) FROM `tfsdefects` WHERE status <> "Closed" AND "reopened" AND account_name="'+account+'" and portfolio_name="'+portfolio_name+'" and projectid = "'+projectname+'")) * 100 ';    
	    
	    }
	}
	if(querynamefront=='Error Discovery Rate')
	{
		if(portfolio_name=='Account Level')
		{
		 query='select ((select count(*) from `tfsdefects` where account_name="'+account+'") / (SELECT count( * ) FROM `qctestinstances` WHERE account_name="'+account+'"))';   	
		}
		else if(projectname==0)
		{
		 query='select ((select count(*) from `tfsdefects` where portfolio_name ="'+portfolio_name+'" and account_name="'+account+'") / (SELECT count( * ) FROM `qctestinstances` WHERE portfolio_name ="'+portfolio_name+'" and account_name="'+account+'"))';   	
		}
		else{
	      query='select ((select count(*) from `tfsdefects` where projectid ="'+projectname+'" and portfolio_name ="'+portfolio_name+'" and account_name="'+account+'") / (SELECT count( * ) FROM `qctestinstances` WHERE projectid ="'+projectname+'" and portfolio_name ="'+portfolio_name+'" and account_name="'+account+'"))  ';   
	    
	    }
	}
	
	
myModalbody = "<table style='width:100%'>"
+"<tr>"
+"<td style='width:40%'>"
+"Query Name"
+"</td>"
+"<td style='width:60%'>"
+"<input class='form-control' id='queryname' type='text' value='"+querynamefront+"' placeholder='Query Name'>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"Chart Name"
+"</td>"
+"<td style='width:60%'>"
+"<input class='form-control' id='chartname' type='text' placeholder='Chart Name'>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"Search Query"
+"</td>"
+"<td style='width:60%'>"
+"<textarea class='form-control' style='overflow:auto;resize:none'  rows='5' cols='20' id='searchquery' type='text' placeholder='Search Query'>"
+query
+"</textarea>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"Chart Type"
+"</td>"
+"<td style='width:60%'>"
+"<select class='form-control' id='charttype' onchange=setlimit(this.value)>"
+"<option id='piechart'>Pie Chart</option>"
+"<option id='barchart'>Bar Chart</option>"
//+"<option id='barchart'>Stacked Bar Chart</option>"
+"<option id='linechart'>Line Chart</option>"
+"<option id='donutchart'>Donut Chart</option>"
//+"<option id='meterGauge'>Meter Gauge</option>"
+"<option id='value'>Value</option>"
+"</select>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"Min value parameter"
+"</td>"
+"<td style='width:60%'>"
+"<input class='form-control' id='xaxis' type='text' placeholder='X axis Parameter'>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"Max value parameter"
+"</td>"
+"<td style='width:60%'>"
+"<input class='form-control' id='yaxis' type='text' placeholder='Y axis Parameter'>"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"UCL"
+"</td>"
+"<td style='width:60%'>"
+"<input class='form-control' id='ucl' type='text' placeholder='Upper Control Limit' disabled>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"LCL"
+"</td>"
+"<td style='width:60%'>"
+"<input class='form-control' id='lcl' type='text' placeholder='Lower Control Limit' disabled>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:60%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:40%'>"
+"Notes"
+"</td>"
+"<td style='width:60%'>"
+"<textarea class='form-control' id='notes' style='overflow:auto;resize:none' type='text' placeholder='Notes'></textarea>"
+"</td>"
+"</tr>"

+"</table>";	
	$('#myModalbody').html(myModalbody);

	myModalfooter="<button class='btn btn-default' onclick=cancel()>Cancel</button>"
+"&nbsp"
+"<button class='btn btn-default' onclick=querypreview('"+sectionid+"')>Preview</button>"
+"&nbsp"
+"<button class='btn btn-default' onclick=querysave('"+sectionid+"')>save</button>";
$('#myModalfooter').html(myModalfooter);
	
}
function setlimit(option)
{
	$('#ucl').val('');
	$('#lcl').val('');
	if((option=='Bar Chart')||(option=='Line Chart')||(option=='Meter Gauge'))
	{
		$('#ucl').attr('disabled',false);
		$('#lcl').attr('disabled',false);
		
		$('#xaxisparameter').attr('disabled',false);
		if(option=='Meter Gauge')
		{
		$('#yaxisparameter').attr('disabled',false);
		}
		else{
		$('#yaxisparameter').attr('disabled',false);
		}
	}
	else 
	{
		$('#ucl').attr('disabled',true);
		$('#lcl').attr('disabled',true);
		$('#xaxisparameter').attr('disabled',true);
		$('#yaxisparameter').attr('disabled',true);
	}
	if((option=='Value')||(option=='Meter Gauge'))
	{
	$('#formula').attr('disabled',false);
	}
	else
	{
	$('#formula').attr('disabled',true);
	}
	
}

function querysave(sectionid)
{
queryname = $('#queryname').val();
searchquery = $('#searchquery').val();
chartname = $('#chartname').val();
ucl = $('#ucl').val();
lcl = $('#lcl').val();
xaxis = $('#xaxis').val();
yaxis = $('#yaxis').val();
charttype = $('#charttype').val();
notes = $('#notes').val();
queryname = $.trim(queryname);
queryname=queryname.replace("'","`");
searchquery = $.trim(searchquery);
searchquery=searchquery.replace("'","`");
projectname = $('#project').data('val');
if (projectname === undefined || projectname === null) {
     // do something 
	projectname=0;
  
	}
dashboard = $('#dashboard').data('val');

//searchquery
var pattern = /^Select/i
 var result = pattern.test(searchquery);


if((queryname!= "")&&(searchquery != "") && (result))
{
$.ajax({
  method: "POST",
  url: "dist/php/managedashboard.php?action=querysave",
  data: { queryname:queryname,chartname:chartname,charttype:charttype,searchquery:searchquery,ucl:ucl,lcl:lcl,yaxis:yaxis, xaxis:xaxis,notes:notes,dashboard:dashboard, projectname:projectname, sectionid:sectionid, type:'query'}
})
.done(function( data ) {
		$('#myModalLabel').html("Success Message");
		$('#myModalbody').html(data);
		$('#myModalfooter').html("<button class='btn btn-default' onclick=displaychart('"+sectionid+"')>OK</button>");
		$('#myModal').modal({show:true});	
	});
}
else
{

		error = "<ul>";
		if(queryname == "")
		{
				error=error.concat("<li>Please enter Query Name</li>");
		}
		if(searchquery == "")
		{
				error=error.concat("<li>Please enter Search Query  </li>");
		}
		if(result==false)
		{
			error=error.concat("<li>Only select queries are allowed </li>");
		}
		error=error.concat("</ul>");
		charttype=charttype.replace(" ","-");
		$('#myModalLabel').html("Error Message");
		$('#myModalbody').html(error);
		$('#myModalfooter').html("<button class='btn btn-default' data-queryname='"+queryname+"' data-chartname='"+chartname+"' data-searchquery='"+searchquery+"' data-charttype='"+charttype+"' data-ucl='"+ucl+"' data-lcl='"+lcl+"' data-notes='"+notes+"' id='cancelquery' onclick=cancel()>OK</button>");
		$('#myModal').modal({show:true});	
}
}

function cancelparameter(sectionid){

queryname = $('#cancelparameter').data("queryname");
chartname = $('#cancelparameter').data("chartname");
searchquery = $('#cancelparameter').data("searchquery");

charttype = $('#cancelparameter').data("charttype");
ucl = $('#cancelparameter').data("ucl");
lcl = $('#cancelparameter').data("lcl");
xaxis = $('#cancelparameter').data("xaxis");
yaxis = $('#cancelparameter').data("yaxis");
notes = $('#cancelparameter').data("notes");
newparameter(sectionid);
var searchquery = searchquery.split(',');
completeparam = new Array();
for (i=0;i<searchquery.length;i++)
{
lineparam = new Array();
lineparam.push(searchquery[i]);
i++;
lineparam.push(searchquery[i]);
i++;
lineparam.push(searchquery[i]);
completeparam.push(lineparam);
}
for (i=0;i<completeparam.length;i++)
{
if(completeparam[i][0]=='parameter')
{
if(i>0)
{
addrow();
}
count = 0;
$("input[data-text = 'parameter']").each(function(){
if(count == i)
{
$(this).val(completeparam[i][1]);
}
count++;
})
count=0;
$("input[data-text = 'value']").each(function(){
if(count == i)
{
$(this).val(completeparam[i][2]);
}
count++;
})


}
else
{
//////alert(completeparam[i][1]);
$('#formula').val(completeparam[i][1]);
}

}

charttype = charttype.replace("-"," ");
$('#parametername').val(queryname);
$('#chartname').val(chartname);
$('#searchquery').val(searchquery);
$('#charttype').val(charttype);
$('#ucl').val(ucl);
$('#lcl').val(lcl);
$('#xaxisparameter').val(xaxis);
$('#yaxisparameter').val(yaxis);
$('#notes').val(notes);
}


function cancelquery(sectionid){

queryname = $('#cancelquery').data("queryname");

chartname = $('#cancelquery').data("chartname");
searchquery = $('#cancelquery').data("searchquery");
charttype = $('#cancelquery').data("charttype");
ucl = $('#cancelquery').data("ucl");
lcl = $('#cancelquery').data("lcl");
notes = $('#cancelquery').data("notes");
newquery(sectionid);
charttype = charttype.replace("-"," ");
$('#queryname').val(queryname);
$('#chartname').val(chartname);
$('#searchquery').val(searchquery);
$('#charttype').val(charttype);
$('#ucl').val(ucl);
$('#lcl').val(lcl);
$('#notes').val(notes);
}



function querypreview(sectionid)
{

queryname = $('#queryname').val();
//queryname=queryname.replace("'","`");

chartname = $('#chartname').val();
//chartname=chartname.replace("'","`");

searchquery = $('#searchquery').val();
searchquery=searchquery.replace("'","`");

ucl = $('#ucl').val();
lcl = $('#lcl').val();

xaxis = $('#xaxis').val();
yaxis = $('#yaxis').val();

charttype = $('#charttype').val();
charttype=charttype.replace("'","`");

notes = $('#notes').val();
notes=notes.replace("'","`");
if((queryname!= "")&&(searchquery != ""))
{


$.ajax({
  method: "POST",
  url: "dist/php/managedashboard.php?action=queryvalues",
  data: { searchquery: searchquery }
})
  .done(function( data ) {
var data = jQuery.parseJSON( data );
  $('#myModalLabel').html("Preview Chart");

		//$('#myModalfooter').html("<button class='btn btn-default' onclick=cancelquery('"+queryname+"','"+chartname+"','"+searchquery+"','"+charttype+"','"+ucl+"','"+lcl+"')>Cancel</button>");
if(charttype=='Pie Chart')
{
chartcontent ="<canvas id='previewchart' style='height:250px'></canvas><div id='js-legend' class='chart-legend'></div>";
		$('#myModalbody').html(chartcontent);
		var pieChartCanvas = $("#previewchart").get(0).getContext("2d");
		
        
		 var PieData = [];
		 for(i=0;i<data.length;i++)
		 {
		 r = Math.floor(Math.random() * 200);
    g = Math.floor(Math.random() * 200);
    b = Math.floor(Math.random() * 200);
    c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')';
		 var dataset = parseInt(data[i][1]);
		PieData.push({value:dataset,color:c,highlight:h,label:data[i][0]});
		 }
		var pieOptions = {
          //Boolean - Whether we should show a stroke on each segment
          segmentShowStroke: true,
          //String - The colour of each segment stroke
          segmentStrokeColor: "#fff",
          //Number - The width of each segment stroke
          segmentStrokeWidth: 2,
          //Number - The percentage of the chart that we cut out of the middle
          percentageInnerCutout: 00, // This is 0 for Pie charts
          //Number - Amount of animation steps
          animationSteps: 100,
          //String - Animation easing effect
          animationEasing: "easeOutBounce",
          //Boolean - Whether we animate the rotation of the Doughnut
          animateRotate: true,
          //Boolean - Whether we animate scaling the Doughnut from the centre
          animateScale: false,
          //Boolean - whether to make the chart responsive to window resizing
          responsive: true,
          // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
          maintainAspectRatio: false,
          //String - A legend template
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        };
        //Create pie or douhnut chart
        // You can switch between pie and douhnut using the method below.
        var pieChart = new Chart(pieChartCanvas).Doughnut(PieData, pieOptions);
document.getElementById('js-legend').innerHTML = pieChart.generateLegend();
}
else if(charttype=='Donut Chart')
{
	chartcontent ="<canvas id='previewchart' style='height:250px'></canvas><div id='js-legend' class='chart-legend'></div>";
		$('#myModalbody').html(chartcontent);
	var pieChartCanvas = $("#previewchart").get(0).getContext("2d");
		
        
		 var PieData = [];
		 for(i=0;i<data.length;i++)
		 {
		 r = Math.floor(Math.random() * 200);
    g = Math.floor(Math.random() * 200);
    b = Math.floor(Math.random() * 200);
    c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')';
		 var dataset = parseInt(data[i][1]);
		PieData.push({value:dataset,color:c,highlight:h,label:data[i][0]});
		 }
		var pieOptions = {
          //Boolean - Whether we should show a stroke on each segment
          segmentShowStroke: true,
          //String - The colour of each segment stroke
          segmentStrokeColor: "#fff",
          //Number - The width of each segment stroke
          segmentStrokeWidth: 2,
          //Number - The percentage of the chart that we cut out of the middle
          percentageInnerCutout: 50, // This is 0 for Pie charts
          //Number - Amount of animation steps
          animationSteps: 100,
          //String - Animation easing effect
          animationEasing: "easeOutBounce",
          //Boolean - Whether we animate the rotation of the Doughnut
          animateRotate: true,
          //Boolean - Whether we animate scaling the Doughnut from the centre
          animateScale: false,
          //Boolean - whether to make the chart responsive to window resizing
          responsive: true,
          // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
          maintainAspectRatio: false,
          //String - A legend template
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        };
        //Create pie or douhnut chart
        // You can switch between pie and douhnut using the method below.
        var pieChart = new Chart(pieChartCanvas).Doughnut(PieData, pieOptions);
document.getElementById('js-legend').innerHTML = pieChart.generateLegend();

}
else if(charttype=='Bar Chart')
{

	chartcontent ="<canvas id='previewchart' style='height:250px'></canvas><div id='js-legend' class='chart-legend'></div>";
	 		$('#myModalbody').html(chartcontent);
			var labelsname = [];
			var datavalues = [];
			var datasetsvalue = [];

if(xaxis.indexOf("Dateseries") > -1)
{
var dateFieldValue = new Date(data[0][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data.length);i++)
{
var dateFieldValue = new Date(data[i][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{

labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[i][1]);
}

dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

}

else if(xaxis.indexOf("Dateonlyweekdaysseries") > -1)
{
var dateFieldValue = new Date(data[0][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data.length);i++)
{
var dateFieldValue = new Date(data[i][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
    var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
	//////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[i][1]);
}
}
dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

}

else if(xaxis.indexOf("Seriesonlyweekdaystilldate") > -1)
{
//////alert("Seriesonlyweekdaystilldate");
var dateFieldValue = new Date(data[0][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data.length);i++)
{
var dateFieldValue = new Date(data[i][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
   var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
//	////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[i][1]);
}
}
dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

var today = new Date();
var year = today.getFullYear()+"";
var month = (today.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = today.getDate()+"";
var newdate = year + "-" + month + "-" + day;

for(;currentdate < newdate;)
{

currentdate = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = currentdate.getFullYear()+"";
var month = (currentdate.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = currentdate.getDate()+"";
var currentdate = year + "-" + month + "-" + day;


   var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
//	////alert(dayname);
if(dayname<=5)
{

labelsname.push(currentdate);
datavalues.push('0');
}
}
}

else if(xaxis.indexOf("Seriestilldate") > -1)
{
//////alert("Seriestilldate");
var dateFieldValue = new Date(data[0][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data.length);i++)
{
var dateFieldValue = new Date(data[i][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
  
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[i][1]);
}

dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

var today = new Date();
var year = today.getFullYear()+"";
var month = (today.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = today.getDate()+"";
var newdate = year + "-" + month + "-" + day;

for(;currentdate < newdate;)
{

currentdate = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = currentdate.getFullYear()+"";
var month = (currentdate.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = currentdate.getDate()+"";
var currentdate = year + "-" + month + "-" + day;


labelsname.push(currentdate);
datavalues.push('0');

}
}

else
{
for(i=0;i<data.length;i++)
{
labelsname.push(data[i][0]);
datavalues.push(data[i][1]);
}
}			

 r = Math.floor(Math.random() * 200);
    g = Math.floor(Math.random() * 200);
    b = Math.floor(Math.random() * 200);
    c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')';
 datasetsvalue.push({label:"",fillColor:c,strokeColor:c,pointColor:c,pointStrokeColor:c, pointHighlightFill:h,pointHighlightStroke:h,data:datavalues});

 var areaChartData = {
          labels: labelsname,
          datasets: datasetsvalue
        };
	 var barChartCanvas = $("#previewchart").get(0).getContext("2d");
         var barChart = new Chart(barChartCanvas);
        var barChartData = areaChartData;
       // barChartData.datasets[1].fillColor = "#00a65a";
       // barChartData.datasets[1].strokeColor = "#00a65a";
       // barChartData.datasets[1].pointColor = "#00a65a";
        var barChartOptions = {
          //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
          scaleBeginAtZero: true,
          //Boolean - Whether grid lines are shown across the chart
          scaleShowGridLines: true,
          //String - Colour of the grid lines
          scaleGridLineColor: "rgba(0,0,0,.05)",
          //Number - Width of the grid lines
          scaleGridLineWidth: 1,
          //Boolean - Whether to show horizontal lines (except X axis)
          scaleShowHorizontalLines: true,
          //Boolean - Whether to show vertical lines (except Y axis)
          scaleShowVerticalLines: true,
          //Boolean - If there is a stroke on each bar
          barShowStroke: true,
          //Number - Pixel width of the bar stroke
          barStrokeWidth: 2,
          //Number - Spacing between each of the X value sets
          barValueSpacing: 5,
          //Number - Spacing between data sets within X values
          barDatasetSpacing: 1,
          //String - A legend template
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
          //Boolean - whether to make the chart responsive
          responsive: true,
          maintainAspectRatio: false
        };

        barChartOptions.datasetFill = false;
        barChart.Bar(barChartData, barChartOptions);
      

	}

else if(charttype=='Line Chart')
{

	chartcontent ="<canvas id='previewchart' style='height:250px'></canvas><div id='js-legend' class='chart-legend'></div>";
	 		$('#myModalbody').html(chartcontent);
			var labelsname = [];
			var datavalues = [];
			var datasetsvalue = [];

if(xaxis.indexOf("Dateseries") > -1)
{
var dateFieldValue = new Date(data[0][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data.length);i++)
{
var dateFieldValue = new Date(data[i][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{

labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[i][1]);
}

dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}


}


else if(xaxis.indexOf("Dateonlyweekdaysseries") > -1)
{
var dateFieldValue = new Date(data[0][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data.length);i++)
{
var dateFieldValue = new Date(data[i][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{

   var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
//	////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[i][1]);
}
}
dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}


}

else if(xaxis.indexOf("Seriestilldate") > -1)
{
//////alert("Seriestilldate");
var dateFieldValue = new Date(data[0][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data.length);i++)
{
var dateFieldValue = new Date(data[i][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[i][1]);
}

dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

var today = new Date();
var year = today.getFullYear()+"";
var month = (today.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = today.getDate()+"";
var newdate = year + "-" + month + "-" + day;

for(;currentdate < newdate;)
{

currentdate = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = currentdate.getFullYear()+"";
var month = (currentdate.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = currentdate.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
labelsname.push(currentdate);
datavalues.push('0');
}
}

else if(xaxis.indexOf("Seriesonlyweekdaystilldate") > -1)
{
//////alert("Seriestilldate");
var dateFieldValue = new Date(data[0][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data.length);i++)
{
var dateFieldValue = new Date(data[i][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
 var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
//	////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[i][1]);
}
}
dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

var today = new Date();
var year = today.getFullYear()+"";
var month = (today.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = today.getDate()+"";
var newdate = year + "-" + month + "-" + day;

for(;currentdate < newdate;)
{

currentdate = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = currentdate.getFullYear()+"";
var month = (currentdate.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = currentdate.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
 var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
//	////alert(currentdate);
//	////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
datavalues.push('0');
}
}
}
else
{
for(i=0;i<data.length;i++)
{
labelsname.push(data[i][0]);
datavalues.push(data[i][1]);
}
}			

 r = Math.floor(Math.random() * 200);
    g = Math.floor(Math.random() * 200);
    b = Math.floor(Math.random() * 200);
    c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')';
 datasetsvalue.push({label:"",fillColor:c,strokeColor:c,pointColor:c,pointStrokeColor:c, pointHighlightFill:h,pointHighlightStroke:h,data:datavalues});

 var areaChartData = {
          labels: labelsname,
          datasets: datasetsvalue
        };
		
		 var areaChartOptions = {
          //Boolean - If we should show the scale at all
          showScale: true,
          //Boolean - Whether grid lines are shown across the chart
          scaleShowGridLines: false,
          //String - Colour of the grid lines
          scaleGridLineColor: "rgba(0,0,0,.05)",
          //Number - Width of the grid lines
          scaleGridLineWidth: 1,
          //Boolean - Whether to show horizontal lines (except X axis)
          scaleShowHorizontalLines: true,
          //Boolean - Whether to show vertical lines (except Y axis)
          scaleShowVerticalLines: true,
          //Boolean - Whether the line is curved between points
          bezierCurve: true,
          //Number - Tension of the bezier curve between points
          bezierCurveTension: 0.3,
          //Boolean - Whether to show a dot for each point
          pointDot: false,
          //Number - Radius of each point dot in pixels
          pointDotRadius: 4,
          //Number - Pixel width of point dot stroke
          pointDotStrokeWidth: 1,
          //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
          pointHitDetectionRadius: 20,
          //Boolean - Whether to show a stroke for datasets
          datasetStroke: true,
          //Number - Pixel width of dataset stroke
          datasetStrokeWidth: 2,
          //Boolean - Whether to fill the dataset with a color
          datasetFill: true,
          //String - A legend template
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
          //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
          maintainAspectRatio: false,
          //Boolean - whether to make the chart responsive to window resizing
          responsive: true
        };

		
	        var lineChartCanvas = $("#previewchart").get(0).getContext("2d");
        var lineChart = new Chart(lineChartCanvas);
        var lineChartOptions = areaChartOptions;
        lineChartOptions.datasetFill = false;
        lineChart.Line(areaChartData, lineChartOptions);
      

	}
	
	
	else if(charttype=='Meter Gauge')
{
	chartcontent ="<div id='g1' class='gauge'></div>";
	$('#myModalbody').html(chartcontent);
	
	if((ucl !='')&&(lcl !=''))
	{
      var g1 = new JustGage({
        id: 'g1',
        value: data,
        min: xaxis,
        max: yaxis,
        symbol: '%',
        pointer: true,
        gaugeWidthScale: 0.6,
        levelcolors: [{
          color: '#00ff00',
          lo: xaxis,
          hi: lcl
        },
		{
          color: '#ff0000',
          lo: lcl,
          hi: ucl
        }, 		
		{
          color: '#00ff00',
          lo: ucl,
          hi: yaxis
        }],
		counter: true
      });
	}
	else if ((ucl !='')&&(lcl==''))
	{
		      var g1 = new JustGage({
        id: 'g1',
        value: data,
        min: xaxis,
        max: yaxis,
        symbol: '%',
        pointer: true,
        gaugeWidthScale: 0.6,
        levelcolors: [{
          color: '#ff0000',
          lo: xaxis,
          hi: ucl
        },
		{
          color: '#00ff00',
          lo: ucl,
          hi: yaxis
        }],
		counter: true
      });
		
	}
	
		else if ((lcl !='')&&(ucl==''))
	{
		      var g1 = new JustGage({
        id: 'g1',
        value: data,
        min: xaxis,
        max: yaxis,
        symbol: '%',
        pointer: true,
        gaugeWidthScale: 0.6,
        levelcolors: [{
          color: '#ff0000',
          lo: xaxis,
          hi: lcl
        },
		{
          color: '#00ff00',
          lo: lcl,
          hi: yaxis
        }],
		counter: true
      });
		
	}
	}
	
	else if(charttype=='Value')
{
	
//chartcontent = "<div style='text-align: center'><div id='text' style='display: inline-block;'>"+data+"</div></div>";
//$('#myModalbody').html(chartcontent);

	chartcontent ="<canvas id='myCanvas' style='height:250px'></canvas><div id='js-legend' class='chart-legend'></div>";
	 		$('#myModalbody').html(chartcontent);

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

ctx.font = "60px Georgia";
ctx.fillText(parseFloat(data).toFixed(2), 75, 100);

}
else if (charttype == 'Stacked Bar Chart')
{
////alert("stacked");
			var datavalues = [];
			

			 var newArray = [];
    for(var i = 0; i < data[0].length; i++){
        newArray.push([]);
    };

    for(var i = 0; i < data.length; i++){
	
        for(var j = 0; j < data[0].length; j++){
            newArray[j].push(data[i][j]);
        };
    };
//var labelsname = newArray[0];
labelsname = [];
datasetsvalues = [];
/*
for (i=1;i<newArray.length;i++)
{
datavalue =[];
for(j=0;j<newArray[i].length;j++)
{
datavalue.push(newArray[i][j]);
}
*/
if(xaxis.indexOf("Dateseries") > -1)
{
	
	var dateFieldValue = new Date(newArray[0][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//////alert(currentdate);
datasetcondition = [];
for (i=0;i<(newArray[0].length);i++)
{
var dateFieldValue = new Date(newArray[0][i]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;
datavalues=[];
for(;currentdate<=matchdate;)
{
//////alert(currentdate);
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
	for(j=0;j<newArray[i].length;j++)
{
	
datavalues.push(newArray[i][j]);
//////alert(datavalues);
r = Math.floor(Math.random() * 200);
    g = Math.floor(Math.random() * 200);
    b = Math.floor(Math.random() * 200);
    c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')';

datasetsvalues.push({fillColor : c,strokeColor : c,highlightFill: h,highlightStroke: h,data :datavalues})
//////alert(datasetsvalues);
}
}

dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}
datasetcondition.push(datasetsvalues);
}
}
//}
var barChartData = {
labels:labelsname,
datasets :datasetcondition
};
chartcontent ="<canvas id='previewchart' style='height:250px'></canvas><div id='js-legend' class='chart-legend'></div>";
$('#myModalbody').html(chartcontent);
var ctx = document.getElementById("previewchart").getContext("2d");
		new Chart(ctx).StackedBar(barChartData, {
			responsive : true
		});

}
	myModalfooter="<button class='btn btn-default' data-queryname='"+queryname+"' data-chartname='"+chartname+"' data-searchquery='"+searchquery+"' data-charttype='"+charttype+"' data-ucl='"+ucl+"' data-lcl='"+lcl+"' data-notes='"+notes+"' data-xaxis='"+xaxis+"' data-yaxis='"+yaxis+"' id='cancelquery' onclick=cancel()>Cancel</button>"
	+"&nbsp"
	+"<button class='btn btn-default' data-queryname='"+queryname+"' data-chartname='"+chartname+"' data-searchquery='"+searchquery+"' data-charttype='"+charttype+"' data-ucl='"+ucl+"' data-lcl='"+lcl+"' data-notes='"+notes+"' data-xaxis='"+xaxis+"' data-yaxis='"+yaxis+"' id='querydashboardsave' onclick=querydashboardsave('"+sectionid+"')>Save</button>";
$('#myModalfooter').html(myModalfooter);
}); 
}
  else
{
		error = "<ul>";
		if(queryname == "")
		{
				error=error.concat("<li>Please enter Query Name</li>");
		}
		if(searchquery == "")
		{
				error=error.concat("<li>Please enter Search Query</li>");
		}
		error=error.concat("</ul>");
		charttype=charttype.replace(" ","-");
		$('#myModalLabel').html("Error Message");
		$('#myModalbody').html(error);
		$('#myModalfooter').html("<button class='btn btn-default' data-queryname='"+queryname+"' data-chartname='"+chartname+"' data-searchquery='"+searchquery+"' data-charttype='"+charttype+"' data-ucl='"+ucl+"' data-lcl='"+lcl+"' data-notes='"+notes+"' id='cancelquery' onclick=cancelquery('"+sectionid+"')>OK</button>");
		$('#myModal').modal({show:true});	
}
}

function querydashboardsave(sectionid){

queryname = $('#querydashboardsave').data("queryname");
chartname = $('#querydashboardsave').data("chartname");
searchquery = $('#querydashboardsave').data("searchquery");
charttype = $('#querydashboardsave').data("charttype");
ucl = $('#querydashboardsave').data("ucl");
lcl = $('#querydashboardsave').data("lcl");

xaxis = $('#querydashboardsave').data("xaxis");
yaxis = $('#querydashboardsave').data("yaxis");


notes = $('#querydashboardsave').data("notes");
if (projectname === undefined || projectname === null) {
     // do something 
	projectname=0;
  
	}
dashboard = $('#dashboard').data('val');
$.ajax({
	
	
	
  method: "POST",
  url: "dist/php/managedashboard.php?action=querysave",
  data: { queryname: queryname,chartname: chartname,charttype: charttype,searchquery: searchquery,ucl:ucl, lcl:lcl ,notes:notes ,dashboard:dashboard, projectname:projectname, sectionid:sectionid, xaxis:xaxis, yaxis:yaxis,type:'query' }
})
  .done(function( data ) {
  $('#myModalLabel').html("Success Message");
		$('#myModalbody').html(data);
		$('#myModalfooter').html("<button class='btn btn-default' onclick=displaychart('"+sectionid+"')>OK</button>");
		$('#myModal').modal({show:true});	
  });
}

function parameterdashboardsave(sectionid){
queryname = $('#querydashboardsave').data("queryname");
chartname = $('#querydashboardsave').data("chartname");
searchquery = $('#querydashboardsave').data("searchquery");
charttype = $('#querydashboardsave').data("charttype");
ucl = $('#querydashboardsave').data("ucl");
lcl = $('#querydashboardsave').data("lcl");
xaxis = $('#querydashboardsave').data("xaxis");
yaxis = $('#querydashboardsave').data("yaxis");
notes = $('#querydashboardsave').data("notes");

projectname = $('#project').data('val');
dashboard = $('#dashboard').data('val');
$.ajax({
  method: "POST",
  url: "dist/php/managedashboard.php?action=querysave",
  data: { queryname: queryname,chartname: chartname,charttype: charttype,searchquery: searchquery,ucl:ucl, lcl:lcl ,xaxis:xaxis, yaxis:yaxis, notes:notes ,dashboard:dashboard, projectname:projectname, sectionid:sectionid, type:'parameter' }
})
  .done(function( data ) {
  $('#myModalLabel').html("Success Message");
		$('#myModalbody').html(data);
		$('#myModalfooter').html("<button class='btn btn-default' onclick=displaychart('"+sectionid+"')>OK</button>");
		$('#myModal').modal({show:true});	
  });
}

function specialbarchart(data)
{
	String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
data =	data.replaceAll("comma","<br/>");

data=data.replaceAll("space","-");
var a = data.split("<br/>");

 tabledata = "<div class='box-body'>"
+" <table id='piechart' class='table table-bordered table-striped'>"
+"<thead>"
+"<tr>"
+"<th>Field Name</th>"
+"<th>Value</th>"
+"</tr>"
+"</thead>"
+"<tbody>";

for(i=0; i<a.length; i=i+3)
{
	tabledata =tabledata.concat("<tr>")
	
	+"<td>"
	+a[i+1]
	+"</td>"
	+"<td>"
	+a[i+2]
	+"</td>"
	
	
	+"</tr>";
}
tabledata =tabledata.concat("</tbody>")
+"</table>"
+"</div>";
	 
	$('#myModalLabel').html("Chart Details");
		$('#myModalbody').html(tabledata);
		$('#myModalfooter').html("<button class='btn btn-default' id = 'failure' onclick=cancel();>Close</button>");
		$('#myModal').modal({show:true}); 
	 
}


function barchartdetails(data)
{
	String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
data =	data.replaceAll("comma","<br/>");
data=data.replaceAll("space"," ");
var a = data.split("<br/>");

 tabledata = "<div class='box-body'>"
+" <table id='piechart' class='table table-bordered table-striped'>"
+"<thead>"
+"<tr>"
+"<th>Field Name</th>"
+"<th>Value</th>"
+"</tr>"
+"</thead>"
+"<tbody>";

for(i=0; i<a.length; i=i+2)
{
	tabledata =tabledata.concat("<tr>")
	+"<td>"
	+a[i]
	+"</td>"
	+"<td>"
	+a[i+1]
	+"</td>"
	
	
	+"</tr>";
}
tabledata =tabledata.concat("</tbody>")
+"</table>"
+"</div>";
	 
	$('#myModalLabel').html("Chart Details");
		$('#myModalbody').html(tabledata);
		$('#myModalfooter').html("<button class='btn btn-default' id = 'failure' onclick=cancel();>Close</button>");
		$('#myModal').modal({show:true}); 
	 

}


function linechartdetails(data)
{

	String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

data =	data.replaceAll("comma","<br/>");
var a = data.split("<br/>");

 tabledata = "<div class='box-body'>"
+" <table id='piechart' class='table table-bordered table-striped'>"
+"<thead>"
+"<tr>"
+"<th>Field Name</th>"
+"<th>Value</th>"
+"</tr>"
+"</thead>"
+"<tbody>";

for(i=0; i<a.length; i=i+2)
{
	tabledata =tabledata.concat("<tr>")
	+"<td>"
	+a[i]
	+"</td>"
	+"<td>"
	+a[i+1]
	+"</td>"
	
	
	+"</tr>";
}
tabledata =tabledata.concat("</tbody>")
+"</table>"
+"</div>";
	 
	$('#myModalLabel').html("Chart Details");
		$('#myModalbody').html(tabledata);
		$('#myModalfooter').html("<button class='btn btn-default' id = 'failure' onclick=cancel();>Close</button>");
		$('#myModal').modal({show:true}); 
	 


}
function piechartdetails(section)
{
	String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
	String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
   var details = section;
   var b= details.replaceAll("openbracket","(");
    b = b.replaceAll("closebracket",")");
    b =	b.replaceAll("openbracket","(");
	b=b.replaceAll("space"," ");
	 b =	b.replaceAll("comma","<br/>");

	 var a = b.split("<br/>");

	 
	 
	 tabledata = "<div class='box-body'>"
+" <table id='piechart' class='table table-bordered table-striped'>"
+"<thead>"
+"<tr>"
+"<th>Field Name</th>"
+"<th>Value</th>"
+"</tr>"
+"</thead>"
+"<tbody>";

for(i=0; i<a.length; i=i+2)
{
	tabledata =tabledata.concat("<tr>")
	+"<td>"
	+a[i]
	+"</td>"
	+"<td>"
	+a[i+1]
	+"</td>"
	
	
	+"</tr>";
}
tabledata =tabledata.concat("</tbody>")
+"</table>"
+"</div>";
	 
	$('#myModalLabel').html("Chart Details");
		$('#myModalbody').html(tabledata);
		$('#myModalfooter').html("<button class='btn btn-default' id = 'failure' onclick=cancel();>Close</button>");
		$('#myModal').modal({show:true}); 
	 
	 



}


function displaychart(sectionid){



projectname = $('#project').data('val');
dashboard = $('#dashboard').data('val');
//////alert(projectname);


if (projectname === undefined || projectname === null) {
     // do something 
	projectname=0;
  
	}
//projectname =0;

$.ajax({
  method: "POST",
  url: "dist/php/managedashboard.php?action=celldetails",
  data: { cell: sectionid,projectname: projectname,dashboard: dashboard }
})



  .done(function( data ) {
var data = jQuery.parseJSON( data );	

$("*[id='"+sectionid+"chartname']").html(data[0]);

$("#plus").html("");	

if(data[8] =='query')
{


if(data[2]=='Pie Chart')
{
          var a= data[1].toString();
		  
          var b= a.replace(" ","");		 
		   b=b.replace(/,/g , "comma");
		   b=b.replace("(","openbracket");
		   b=b.replace(")", "closebracket");
		   b=b.replace(/\W+/g, 'space');
		 var dat ="<canvas data-id='"
		 +sectionid
		 +"' id='"
		 +sectionid
		 +"canvasvalue' onclick=piechartdetails('"+b+"')"
	
		 +" class='chart-stage'  style='min-height:200px;min-width:25%;'></canvas><div id='"
		 +sectionid
		 +"legend' ></div>";
		 
		
		// chartdetails(a);

		 
 		$("*[id='"+sectionid+"canvas']").html(dat);
		//
		
 		var pieChartCanvas = $("*[id='"+sectionid+"canvasvalue']").get(0).getContext("2d");
		
		//var pieChartCanvas = $("#cell01canvas").get(0).getContext("2d");
      
		 var PieData = [];
		 for(i=0;i<data[1].length;i++)
		 {
		 r = Math.floor(Math.random() * 200);
		 
    g = Math.floor(Math.random() * 200);
    b = Math.floor(Math.random() * 200);
    c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')';
		 var dataset = parseInt(data[1][i][1]);
		PieData.push({value:dataset,color:c,highlight:h,label:data[1][i][0]});
		 }
		  		

		var pieOptions = {
          //Boolean - Whether we should show a stroke on each segment
          segmentShowStroke: true,
          //String - The colour of each segment stroke
          segmentStrokeColor: "#fff",
          //Number - The width of each segment stroke
          segmentStrokeWidth: 2,
          //Number - The percentage of the chart that we cut out of the middle
          percentageInnerCutout: 00, // This is 0 for Pie charts
          //Number - Amount of animation steps
          animationSteps: 100,
          //String - Animation easing effect
          animationEasing: "easeOutBounce",
          //Boolean - Whether we animate the rotation of the Doughnut
          animateRotate: true,
          //Boolean - Whether we animate scaling the Doughnut from the centre
          animateScale: false,
          //Boolean - whether to make the chart responsive to window resizing
          responsive: true,
          // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
          maintainAspectRatio: false,
          //String - A legend template
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        };
        //Create pie or douhnut chart
        // You can switch between pie and douhnut using the method below.
        var pieChart = new Chart(pieChartCanvas).Doughnut(PieData, pieOptions);
//document.getElementById('js-legend').innerHTML = pieChart.generateLegend();
document.getElementById(sectionid+"legend").innerHTML = pieChart.generateLegend();

$("*[id='"+sectionid+"notes']").html(data[9]);

}

if(data[2]=='Donut Chart')
{
	//sesha
	 var a= data[1].toString();
		  
          var b= a.replace(" ","");		 
		   b=b.replace(/,/g , "comma");
		   b=b.replace("(","openbracket");
		   b=b.replace(")", "closebracket");
		   b=b.replace(/\W+/g, 'space');
		   
 		$("*[id='"+sectionid+"canvas']").html("<canvas data-id='"+sectionid+"' id='"+sectionid+"canvasvalue' class='chart-stage' style='min-height:200px;min-width:25%;' onclick=piechartdetails('"+b+"')></canvas><div id='"+sectionid+"legend'></div>");
 		var pieChartCanvas = $("*[id='"+sectionid+"canvasvalue']").get(0).getContext("2d");
		
		//var pieChartCanvas = $("#cell01canvas").get(0).getContext("2d");
      
		 var PieData = [];
		 for(i=0;i<data[1].length;i++)
		 {
		 r = Math.floor(Math.random() * 200);
		 
    g = Math.floor(Math.random() * 200);
    b = Math.floor(Math.random() * 200);
    c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')';
		 var dataset = parseInt(data[1][i][1]);
		PieData.push({value:dataset,color:c,highlight:h,label:data[1][i][0]});
		 }
		var pieOptions = {
          //Boolean - Whether we should show a stroke on each segment
          segmentShowStroke: true,
          //String - The colour of each segment stroke
          segmentStrokeColor: "#fff",
          //Number - The width of each segment stroke
          segmentStrokeWidth: 2,
          //Number - The percentage of the chart that we cut out of the middle
          percentageInnerCutout: 50, // This is 0 for Pie charts
          //Number - Amount of animation steps
          animationSteps: 100,
          //String - Animation easing effect
          animationEasing: "easeOutBounce",
          //Boolean - Whether we animate the rotation of the Doughnut
          animateRotate: true,
          //Boolean - Whether we animate scaling the Doughnut from the centre
          animateScale: false,
          //Boolean - whether to make the chart responsive to window resizing
          responsive: true,
          // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
          maintainAspectRatio: false,
          //String - A legend template
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        };
        //Create pie or douhnut chart
        // You can switch between pie and douhnut using the method below.
        var pieChart = new Chart(pieChartCanvas).Doughnut(PieData, pieOptions);
//document.getElementById('js-legend').innerHTML = pieChart.generateLegend();

document.getElementById(sectionid+"legend").innerHTML = pieChart.generateLegend();
$("*[id='"+sectionid+"notes']").html(data[9]);
  } 
  
  else if (data[2]=='Bar Chart')
{
	
var a= data[1].toString();
		  
   	 
		var b=a.replace(/,/g , "comma");
	
	b=b.replace(/\W+/g, "space");
	   
   

$("*[id='"+sectionid+"canvas']").html("<span class='vertical' id = '"+sectionid+"yaxis'></span><canvas data-id='"+sectionid+"' id='"+sectionid+"canvasvalue' class='chart-stage' style='min-height:200px;min-width:25%;'  onclick=barchartdetails('"+b+"')></canvas><div id='"+sectionid+"xaxis'></div><div id='"+sectionid+"legend'></div>");
 		
			var labelsname = [];
			var datavalues = [];
			var datasetsvalue = [];

if(data[3].indexOf("Dateseries") > -1)
{
	
var dateFieldValue = new Date(data[1][0][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);


for (i=0;i<(data[1].length);i++)
{
var dateFieldValue = new Date(data[1][i][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{

labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[1][i][1]);
}

dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

}

else if(data[3].indexOf("Dateonlyweekdaysseries") > -1)
{
var dateFieldValue = new Date(data[1][0][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data[1].length);i++)
{
var dateFieldValue = new Date(data[1][i][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
    var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
	//////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[1][i][1]);
}
}
dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

}

else if(data[3].indexOf("Seriesonlyweekdaystilldate") > -1)
{
//////alert("Seriesonlyweekdaystilldate");
var dateFieldValue = new Date(data[1][0][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data[1].length);i++)
{
var dateFieldValue = new Date(data[1][i][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
   var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
	//////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[1][i][1]);
}
}
dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

var today = new Date();
var year = today.getFullYear()+"";
var month = (today.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = today.getDate()+"";
var newdate = year + "-" + month + "-" + day;

for(;currentdate < newdate;)
{

currentdate = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = currentdate.getFullYear()+"";
var month = (currentdate.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = currentdate.getDate()+"";
var currentdate = year + "-" + month + "-" + day;


   var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
	//////alert(dayname);
if(dayname<=5)
{

labelsname.push(currentdate);
datavalues.push('0');
}
}
}

else if(data[3].indexOf("Seriestilldate") > -1)
{
//////alert("Seriestilldate");

var dateFieldValue = new Date(data[1][0][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data[1].length);i++)
{

var dateFieldValue = new Date(data[1][i][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
  
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[1][i][1]);
}

dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

var today = new Date();
var year = today.getFullYear()+"";
var month = (today.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = today.getDate()+"";
var newdate = year + "-" + month + "-" + day;

for(;currentdate < newdate;)
{

currentdate = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = currentdate.getFullYear()+"";
var month = (currentdate.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = currentdate.getDate()+"";
var currentdate = year + "-" + month + "-" + day;


labelsname.push(currentdate);
datavalues.push('0');

}
}

else
{

for(i=0;i<data[1].length;i++)
{
	
labelsname.push(data[1][i][0]);
datavalues.push(data[1][i][1]);
}
}			

 r = Math.floor(Math.random() * 200);
    g = Math.floor(Math.random() * 200);
    b = Math.floor(Math.random() * 200);
    c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')';
 datasetsvalue.push({label:data[7][1].name,fillColor:c,strokeColor:c,pointColor:c,pointStrokeColor:c, pointHighlightFill:h,pointHighlightStroke:h,data:datavalues});

 var areaChartData = {
          labels: labelsname,
          datasets: datasetsvalue
        };
	 var barChartCanvas = $("*[id='"+sectionid+"canvasvalue']").get(0).getContext("2d");
         
        var barChartData = areaChartData;
       // barChartData.datasets[1].fillColor = "#00a65a";
       // barChartData.datasets[1].strokeColor = "#00a65a";
       // barChartData.datasets[1].pointColor = "#00a65a";
        var barChartOptions = {
          //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
          scaleBeginAtZero: true,
          //Boolean - Whether grid lines are shown across the chart
          scaleShowGridLines: true,
          //String - Colour of the grid lines
          scaleGridLineColor: "rgba(0,0,0,.05)",
          //Number - Width of the grid lines
          scaleGridLineWidth: 1,
          //Boolean - Whether to show horizontal lines (except X axis)
          scaleShowHorizontalLines: true,
          //Boolean - Whether to show vertical lines (except Y axis)
          scaleShowVerticalLines: true,
          //Boolean - If there is a stroke on each bar
          barShowStroke: true,
          //Number - Pixel width of the bar stroke
          barStrokeWidth: 2,
          //Number - Spacing between each of the X value sets
          barValueSpacing: 5,
          //Number - Spacing between data sets within X values
          barDatasetSpacing: 1,
          //String - A legend template
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
          //Boolean - whether to make the chart responsive
          responsive: true,
          maintainAspectRatio: false
        };
        barChartOptions.datasetFill = false;

        var barChart = new Chart(barChartCanvas).Bar(barChartData, barChartOptions);
     $("*[id='"+sectionid+"xaxis']").html("<center>"+data[3]+"</center>");
	 $("*[id='"+sectionid+"yaxis']").html(data[4]);
	//  ////alert(barChart.generateLegend());
//$("*[id='js-legend1']").innerHTML = barChart.generateLegend();
document.getElementById(sectionid+"legend").innerHTML = barChart.generateLegend();
$("*[id='"+sectionid+"notes']").html(data[9]);
	 }


else if (data[2]=='Line Chart')
{
//////alert(data[1]);
   var chartdata = data[1].toString();
	 
		   chartdata=chartdata.replace(/,/g , "comma");
		   // b=b.replace(/\W+/g, "minus");
	

$("*[id='"+sectionid+"canvas']").html("<span class='vertical' id = '"+sectionid+"yaxis' ></span><canvas data-id='"+sectionid+"' id='"+sectionid+"canvasvalue' class='chart-stage' style='min-height:200px;min-width:25%;'  onclick=linechartdetails('"+chartdata+"')></canvas><div id='"+sectionid+"xaxis'></div><div id='"+sectionid+"legend'></div>");
 		
			var labelsname = [];
			var datavalues = [];
			var datasetsvalue = [];

if(data[3].indexOf("Dateseries") > -1)
{
	
var dateFieldValue = new Date(data[1][0][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);


for (i=0;i<(data[1].length);i++)
{
var dateFieldValue = new Date(data[1][i][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{

labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[1][i][1]);
}

dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

}

else if(data[3].indexOf("Dateonlyweekdaysseries") > -1)
{
var dateFieldValue = new Date(data[1][0][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data[1].length);i++)
{
var dateFieldValue = new Date(data[1][i][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
    var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
	//////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[1][i][1]);
}
}
dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

}

else if(data[3].indexOf("Seriesonlyweekdaystilldate") > -1)
{
//////alert("Seriesonlyweekdaystilldate");
var dateFieldValue = new Date(data[1][0][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data[1].length);i++)
{
var dateFieldValue = new Date(data[1][i][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
   var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
//	////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[1][i][1]);
}
}
dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

var today = new Date();
var year = today.getFullYear()+"";
var month = (today.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = today.getDate()+"";
var newdate = year + "-" + month + "-" + day;

for(;currentdate < newdate;)
{

currentdate = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = currentdate.getFullYear()+"";
var month = (currentdate.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = currentdate.getDate()+"";
var currentdate = year + "-" + month + "-" + day;


   var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
	//////alert(dayname);
if(dayname<=5)
{

labelsname.push(currentdate);
datavalues.push('0');
}
}
}

else if(data[3].indexOf("Seriestilldate") > -1)
{
//////alert("Seriestilldate");

var dateFieldValue = new Date(data[1][0][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(data[1].length);i++)
{

var dateFieldValue = new Date(data[1][i][0]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
  
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[1][i][1]);
}

dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

var today = new Date();
var year = today.getFullYear()+"";
var month = (today.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = today.getDate()+"";
var newdate = year + "-" + month + "-" + day;

for(;currentdate < newdate;)
{

currentdate = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = currentdate.getFullYear()+"";
var month = (currentdate.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = currentdate.getDate()+"";
var currentdate = year + "-" + month + "-" + day;


labelsname.push(currentdate);
datavalues.push('0');

}
}

else
{

for(i=0;i<data[1].length;i++)
{
	
labelsname.push(data[1][i][0]);
datavalues.push(data[1][i][1]);
}
}			

 r = Math.floor(Math.random() * 200);
    g = Math.floor(Math.random() * 200);
    b = Math.floor(Math.random() * 200);
    c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')';
 datasetsvalue.push({label:data[7][1].name,fillColor:c,strokeColor:c,pointColor:c,pointStrokeColor:c, pointHighlightFill:h,pointHighlightStroke:h,data:datavalues});
//completeparam1[i][1]

  var areaChartData = {
          labels: labelsname,
          datasets: datasetsvalue
        };
 var lineChartData = areaChartData;
		 var areaChartOptions = {
          //Boolean - If we should show the scale at all
          showScale: true,
          //Boolean - Whether grid lines are shown across the chart
          scaleShowGridLines: false,
          //String - Colour of the grid lines
          scaleGridLineColor: "rgba(0,0,0,.05)",
          //Number - Width of the grid lines
          scaleGridLineWidth: 1,
          //Boolean - Whether to show horizontal lines (except X axis)
          scaleShowHorizontalLines: true,
          //Boolean - Whether to show vertical lines (except Y axis)
          scaleShowVerticalLines: true,
          //Boolean - Whether the line is curved between points
          bezierCurve: true,
          //Number - Tension of the bezier curve between points
          bezierCurveTension: 0.3,
          //Boolean - Whether to show a dot for each point
          pointDot: false,
          //Number - Radius of each point dot in pixels
          pointDotRadius: 4,
          //Number - Pixel width of point dot stroke
          pointDotStrokeWidth: 1,
          //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
          pointHitDetectionRadius: 20,
          //Boolean - Whether to show a stroke for datasets
          datasetStroke: true,
          //Number - Pixel width of dataset stroke
          datasetStrokeWidth: 2,
          //Boolean - Whether to fill the dataset with a color
          datasetFill: true,
          //String - A legend template
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
          //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
          maintainAspectRatio: false,
          //Boolean - whether to make the chart responsive to window resizing
          responsive: true
        };
      //  barChartOptions.datasetFill = false;
       // barChart.Bar(barChartData, barChartOptions);
		 
        areaChartOptions.datasetFill = false;
		      var lineChartCanvas = $("#"+sectionid+"canvasvalue").get(0).getContext("2d");
        var lineChart = new Chart(lineChartCanvas).Line(lineChartData, areaChartOptions);
    
        //lineChart.Line(areaChartData, lineChartOptions);
           $("*[id='"+sectionid+"xaxis']").html("<center>"+data[3]+"</center>");
	 $("*[id='"+sectionid+"yaxis']").html(data[4]);
	 
	 //////alert(lineChart.generateLegend());
	 document.getElementById(sectionid+"legend").innerHTML = lineChart.generateLegend();
	 $("*[id='"+sectionid+"notes']").html(data[9]);
}

else if(data[2]=='Meter Gauge')
{
	//////alert("avsfsd");
//////alert(data[1][0]);
	//////alert("avsfsd");
$("*[id='"+sectionid+"canvas']").html("<div data-id='"+sectionid+"' id='"+sectionid+"canvasvalue' class='gauge' style='min-height:200px;min-width:25%;'></div>");
	if((data[6] !='')&&(data[5] !=''))
	{
      var g1 = new JustGage({
        id: sectionid+'canvasvalue',
        value: data[1][0],
        min: data[3],
        max: data[4],
        symbol: '',
        pointer: true,
        gaugeWidthScale: 0.6,
		relativeGaugeSize: true,
        levelcolors: [{
          color: '#00ff00',
          lo: data[5],
          hi: data[6]
		  
        },
		{
          color: '#ff0000',
          lo: data[3],
          hi: data[5]
        }, 		
		{
          color: '#00ff00',
          lo: data[6],
          hi: data[4]
        }],
		counter: true
      });
	  
	}
	else if ((data[6] !='')&&(data[5]==''))
	{
		      var g1 = new JustGage({
        id: sectionid+'canvasvalue',
        value: data[1][0],
        min: data[3],
        max: data[4],
        symbol: '',
        pointer: true,
        gaugeWidthScale: 0.6,
		relativeGaugeSize: true,
        levelcolors: [{
          color: '#ff0000',
          lo: data[3],
          hi: data[5]
        },
		{
          color: '#00ff00',
          lo: data[6],
          hi: data[4]
        }],
		counter: true
      });
		
	}
	
		else if ((data[5] !='')&&(data[6]==''))
	{
		      var g1 = new JustGage({
        id: sectionid+'canvasvalue',
        value: data[1][0],
        min: data[3],
        max: data[4],
        symbol: '',
        pointer: true,
        gaugeWidthScale: 0.6,
		relativeGaugeSize: true,
        levelcolors: [{
          color: '#ff0000',
          lo: data[3],
          hi: data[5]
        },
		{
          color: '#00ff00',
          lo: data[5],
          hi: data[4]
        }],
		counter: true
      });
		
	}
	else
	{
	
			      var g1 = new JustGage({
        id: sectionid+'canvasvalue',
        value: data[1][0],
        min: data[3],
        max: data[4],
        symbol: '',
        pointer: true,
        gaugeWidthScale: 0.6,
		relativeGaugeSize: true,
        levelcolors: [{
          color: '#ff0000',
          lo: data[3],
          hi: data[4]
        }],
		counter: true
      });
	  
	}
	$("*[id='"+sectionid+"notes']").html(data[9]);
}

	else if(data[2]=='Value')
{
$("*[id='"+sectionid+"canvas']").html("<canvas data-id='"+sectionid+"' id='"+sectionid+"canvasvalue' class='chart-stage' style='min-height:200px;min-width:25%;'></canvas>");
 		
//chartcontent = "<div style='text-align: center'><div id='text' style='display: inline-block;'>"+data+"</div></div>";
//$('#myModalbody').html(chartcontent);



var c = document.getElementById(sectionid+"canvasvalue");
var ctx = c.getContext("2d");

ctx.font = "3em Georgia";
ctx.fillText(parseFloat(Math.round(data[1][0] * 100) / 100).toFixed(0), 25, 100);
$("*[id='"+sectionid+"notes']").html(data[9]);
}

}
else{
	if(data[2]=='Pie Chart')
{
	
//var data1 = jQuery.parseJSON( data[1] );
completeparam = data[1];
//var array=[];
completeparam1 = new Array();
for (i=0;i<completeparam.length;i++)
{
lineparam = new Array();
lineparam.push(completeparam[i]);
i++;
lineparam.push(completeparam[i]);
i++;
lineparam.push(completeparam[i]);
completeparam1.push(lineparam);
}
	$("*[id='"+sectionid+"canvas']").html("<canvas data-id='"+sectionid+"' id='"+sectionid+"canvasvalue' class='chart-stage' style='min-height:200px;min-width:25%;'></canvas>");
 	
		var pieChartCanvas = $("*[id='"+sectionid+"canvasvalue']").get(0).getContext("2d");
		var PieData = [];
		//var pieChartCanvas = $("#cell01canvas").get(0).getContext("2d");

	 for(i=0;i<completeparam1.length;i++)
		 {
		 r = Math.floor(Math.random() * 200);
    g = Math.floor(Math.random() * 200);
    b = Math.floor(Math.random() * 200);
    c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')';
		 var dataset = parseInt(completeparam1[i][2]);
		// ////alert(dataset);
		PieData.push({value:dataset,color:c,highlight:h,label:completeparam1[i][1]});
		
		 }
		var pieOptions = {
          //Boolean - Whether we should show a stroke on each segment
          segmentShowStroke: true,
          //String - The colour of each segment stroke
          segmentStrokeColor: "#fff",
          //Number - The width of each segment stroke
          segmentStrokeWidth: 2,
          //Number - The percentage of the chart that we cut out of the middle
          percentageInnerCutout: 00, // This is 0 for Pie charts
          //Number - Amount of animation steps
          animationSteps: 100,
          //String - Animation easing effect
          animationEasing: "easeOutBounce",
          //Boolean - Whether we animate the rotation of the Doughnut
          animateRotate: true,
          //Boolean - Whether we animate scaling the Doughnut from the centre
          animateScale: false,
          //Boolean - whether to make the chart responsive to window resizing
          responsive: true,
          // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
          maintainAspectRatio: false,
          //String - A legend template
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        };
        //Create pie or douhnut chart
        // You can switch between pie and douhnut using the method below.
        var pieChart = new Chart(pieChartCanvas).Doughnut(PieData, pieOptions);
//document.getElementById(sectionid+'js-legend').innerHTML = pieChart.generateLegend();
$("*[id='"+sectionid+"notes']").html(data[9]);
}
	else if(data[2]=='Line Chart')
{
$("*[id='"+sectionid+"canvas']").html("<span class='vertical' id = '"+sectionid+"yaxis'></span><canvas data-id='"+sectionid+"' id='"+sectionid+"canvasvalue' class='chart-stage' style='min-height:200px;min-width:25%;'></canvas><div id='"+sectionid+"xaxis'></div><div id='"+sectionid+"legend'></div>");

			var labelsname = [];
			var datavalues = [];
			var datasetsvalue = [];

			
			completeparam = data[1];
//var array=[];
completeparam1 = new Array();
for (i=0;i<completeparam.length;i++)
{
lineparam = new Array();
lineparam.push(completeparam[i]);
i++;
lineparam.push(completeparam[i]);
i++;
lineparam.push(completeparam[i]);
completeparam1.push(lineparam);
}
		

if(data[3].indexOf("Dateseries") > -1)
{
var dateFieldValue = new Date(completeparam1[0][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(completeparam1.length);i++)
{
var dateFieldValue = new Date(completeparam1[i][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{

labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(completeparam1[i][2]);
}

dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}


}


else if(data[3].indexOf("Dateonlyweekdaysseries") > -1)
{
var dateFieldValue = new Date(completeparam1[0][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(completeparam1.length);i++)
{
var dateFieldValue = new Date(completeparam1[i][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{

   var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
	//////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(completeparam1[i][2]);
}
}
dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}


}

else if(data[3].indexOf("Seriestilldate") > -1)
{
//////alert("Seriestilldate");
var dateFieldValue = new Date(completeparam1[0][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(completeparam1.length);i++)
{
var dateFieldValue = new Date(completeparam1[i][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(data[i][2]);
}

dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

var today = new Date();
var year = today.getFullYear()+"";
var month = (today.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = today.getDate()+"";
var newdate = year + "-" + month + "-" + day;

for(;currentdate < newdate;)
{

currentdate = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = currentdate.getFullYear()+"";
var month = (currentdate.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = currentdate.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
labelsname.push(currentdate);
datavalues.push('0');
}
}

else if(data[3].indexOf("Seriesonlyweekdaystilldate") > -1)
{
//////alert("Seriestilldate");
var dateFieldValue = new Date(completeparam1[0][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(completeparam1.length);i++)
{
var dateFieldValue = new Date(data[i][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
 var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
//	////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(completeparam1[i][2]);
}
}
dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

var today = new Date();
var year = today.getFullYear()+"";
var month = (today.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = today.getDate()+"";
var newdate = year + "-" + month + "-" + day;

for(;currentdate < newdate;)
{

currentdate = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = currentdate.getFullYear()+"";
var month = (currentdate.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = currentdate.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
 var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
//	////alert(currentdate);
//	////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
datavalues.push('0');
}
}
}
else
{
for(i=0;i<completeparam1.length;i++)
{
labelsname.push(completeparam1[i][1]);
datavalues.push(completeparam1[i][2]);
}
}			

 r = Math.floor(Math.random() * 200);
    g = Math.floor(Math.random() * 200);
    b = Math.floor(Math.random() * 200);
    c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')';
 datasetsvalue.push({label:"",fillColor:c,strokeColor:c,pointColor:c,pointStrokeColor:c, pointHighlightFill:h,pointHighlightStroke:h,data:datavalues});

 var areaChartData = {
          labels: labelsname,
          datasets: datasetsvalue
       
		};
		
		 var areaChartOptions = {
          //Boolean - If we should show the scale at all
          showScale: true,
          //Boolean - Whether grid lines are shown across the chart
          scaleShowGridLines: false,
          //String - Colour of the grid lines
          scaleGridLineColor: "rgba(0,0,0,.05)",
          //Number - Width of the grid lines
          scaleGridLineWidth: 1,
          //Boolean - Whether to show horizontal lines (except X axis)
          scaleShowHorizontalLines: true,
          //Boolean - Whether to show vertical lines (except Y axis)
          scaleShowVerticalLines: true,
          //Boolean - Whether the line is curved between points
          bezierCurve: true,
          //Number - Tension of the bezier curve between points
          bezierCurveTension: 0.3,
          //Boolean - Whether to show a dot for each point
          pointDot: false,
          //Number - Radius of each point dot in pixels
          pointDotRadius: 4,
          //Number - Pixel width of point dot stroke
          pointDotStrokeWidth: 1,
          //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
          pointHitDetectionRadius: 20,
          //Boolean - Whether to show a stroke for datasets
          datasetStroke: true,
          //Number - Pixel width of dataset stroke
          datasetStrokeWidth: 2,
          //Boolean - Whether to fill the dataset with a color
          datasetFill: true,
          //String - A legend template
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
          //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
          maintainAspectRatio: false,
          //Boolean - whether to make the chart responsive to window resizing
          responsive: true
        };

		
	        var lineChartCanvas = $("*[id='"+sectionid+"canvasvalue']").get(0).getContext("2d");
        var lineChart = new Chart(lineChartCanvas);
        var lineChartOptions = areaChartOptions;
        lineChartOptions.datasetFill = false;
        lineChart.Line(areaChartData, lineChartOptions);
      
$("*[id='"+sectionid+"notes']").html(data[9]);
	}
	
else if (data[2]=='Bar Chart')
{
	var a= data[1].toString();
		  
   	 //ses
		var b=a.replace(/,/g , "comma");
	
	b=b.replace(/\W+/g, "space");

	$("*[id='"+sectionid+"canvas']").html("<span class='vertical' id = '"+sectionid+"yaxis'></span><canvas data-id='"+sectionid+"' id='"+sectionid+"canvasvalue' class='chart-stage' style='min-height:200px;min-width:25%;' onclick=specialbarchart('"+b+"')></canvas><div id='"+sectionid+"xaxis'></div><div id='"+sectionid+"legend'></div>");

	var labelsname = [];
			var datavalues = [];
			var datasetsvalue = [];


			completeparam = data[1];
//var array=[];
completeparam1 = new Array();
for (i=0;i<completeparam.length;i++)
{
lineparam = new Array();
lineparam.push(completeparam[i]);
i++;
lineparam.push(completeparam[i]);
i++;
lineparam.push(completeparam[i]);
completeparam1.push(lineparam);
}
if(data[3].indexOf("Dateseries") > -1)
{
var dateFieldValue = new Date(completeparam1[0][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(completeparam1.length);i++)
{
var dateFieldValue = new Date(completeparam1[i][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{

labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(completeparam1[i][2]);
}

dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

}

else if(data[3].indexOf("Dateonlyweekdaysseries") > -1)
{
var dateFieldValue = new Date(completeparam1[0][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(completeparam1.length);i++)
{
var dateFieldValue = new Date(completeparam1[i][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
    var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
//	////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(completeparam1[i][2]);
}
}
dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

}

else if(data[3].indexOf("Seriesonlyweekdaystilldate") > -1)
{
//////alert("Seriesonlyweekdaystilldate");
var dateFieldValue = new Date(completeparam1[0][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(completeparam1.length);i++)
{
var dateFieldValue = new Date(completeparam1[i][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
   var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
//	////alert(dayname);
if(dayname<=5)
{
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(completeparam1[i][2]);
}
}
dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

var today = new Date();
var year = today.getFullYear()+"";
var month = (today.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = today.getDate()+"";
var newdate = year + "-" + month + "-" + day;

for(;currentdate < newdate;)
{

currentdate = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = currentdate.getFullYear()+"";
var month = (currentdate.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = currentdate.getDate()+"";
var currentdate = year + "-" + month + "-" + day;


   var dayNames = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ];
	currentdateday = new Date(currentdate);
	var dayname = dayNames[currentdateday.getDay()-1];
//	////alert(dayname);
if(dayname<=5)
{

labelsname.push(currentdate);
datavalues.push('0');
}
}
}

else if(data[3].indexOf("Seriestilldate") > -1)
{
//////alert("Seriestilldate");
var dateFieldValue = new Date(completeparam1[0][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;
//labelsname.push(currentdate);
//datavalues.push(data[0][1]);

for (i=0;i<(completeparam1.length);i++)
{
var dateFieldValue = new Date(completeparam1[i][1]);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var matchdate = year + "-" + month + "-" + day;

for(;currentdate<=matchdate;)
{
  
labelsname.push(currentdate);
if(currentdate<matchdate)
{
datavalues.push('0');
}
else
{
datavalues.push(completeparam1[i][2]);
}

dateFieldValue = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = dateFieldValue.getFullYear()+"";
var month = (dateFieldValue.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = dateFieldValue.getDate()+"";
var currentdate = year + "-" + month + "-" + day;

}

}

var today = new Date();
var year = today.getFullYear()+"";
var month = (today.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = today.getDate()+"";
var newdate = year + "-" + month + "-" + day;

for(;currentdate < newdate;)
{

currentdate = new Date((new Date(currentdate)).valueOf() + 1000*3600*24);
var year = currentdate.getFullYear()+"";
var month = (currentdate.getMonth()+1)+"";
 if (month < 10)
{
month = '0'+ month;
}
var day = currentdate.getDate()+"";
var currentdate = year + "-" + month + "-" + day;


labelsname.push(currentdate);
datavalues.push('0');

}
}

else
{

for(i=0;i<completeparam1.length;i++)
{
labelsname.push(completeparam1[i][1]);
datavalues.push(completeparam1[i][2]);
}
}			

 r = Math.floor(Math.random() * 200);
    g = Math.floor(Math.random() * 200);
    b = Math.floor(Math.random() * 200);
    c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')';
 datasetsvalue.push({label:"",fillColor:c,strokeColor:c,pointColor:c,pointStrokeColor:c, pointHighlightFill:h,pointHighlightStroke:h,data:datavalues});

 var areaChartData = {
          labels: labelsname,
          datasets: datasetsvalue
        };
	 var barChartCanvas = $("*[id='"+sectionid+"canvasvalue']").get(0).getContext("2d");
         var barChart = new Chart(barChartCanvas);
        var barChartData = areaChartData;
       // barChartData.datasets[1].fillColor = "#00a65a";
       // barChartData.datasets[1].strokeColor = "#00a65a";
       // barChartData.datasets[1].pointColor = "#00a65a";
        var barChartOptions = {
          //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
          scaleBeginAtZero: true,
          //Boolean - Whether grid lines are shown across the chart
          scaleShowGridLines: true,
          //String - Colour of the grid lines
          scaleGridLineColor: "rgba(0,0,0,.05)",
          //Number - Width of the grid lines
          scaleGridLineWidth: 1,
          //Boolean - Whether to show horizontal lines (except X axis)
          scaleShowHorizontalLines: true,
          //Boolean - Whether to show vertical lines (except Y axis)
          scaleShowVerticalLines: true,
          //Boolean - If there is a stroke on each bar
          barShowStroke: true,
          //Number - Pixel width of the bar stroke
          barStrokeWidth: 2,
          //Number - Spacing between each of the X value sets
          barValueSpacing: 5,
          //Number - Spacing between data sets within X values
          barDatasetSpacing: 1,
          //String - A legend template
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
          //Boolean - whether to make the chart responsive
          responsive: true,
          maintainAspectRatio: false
        };

        barChartOptions.datasetFill = false;
        barChart.Bar(barChartData, barChartOptions);
     $("*[id='"+sectionid+"notes']").html(data[9]); 
}


else if(data[2]=='Meter Gauge')
{
$("*[id='"+sectionid+"canvas']").html("<div data-id='"+sectionid+"' id='"+sectionid+"canvasvalue' class='gauge' style='min-height:200px;min-width:25%;'></div>");

	if((data[3] !='')&&(data[5] !=''))
	{
      var g1 = new JustGage({
        id: sectionid+'canvasvalue',
        value: data[1][0],
        min: data[3],
        max: data[4],
        symbol: '',
        pointer: true,
        gaugeWidthScale: 0.6,
		relativeGaugeSize: true,
        levelcolors: [{
          color: '#00ff00',
          lo: data[3],
          hi: data[5]
		  
        },
		{
          color: '#ff0000',
          lo: data[5],
          hi: data[6]
        }, 		
		{
          color: '#00ff00',
          lo: data[5],
          hi: data[4]
        }],
		counter: true
      });
	  
	}
	else if ((data[3] !='')&&(data[5]==''))
	{
		      var g1 = new JustGage({
        id: sectionid+'canvasvalue',
        value: data[1][0],
        min: data[3],
        max: data[4],
        symbol: '',
        pointer: true,
        gaugeWidthScale: 0.6,
		relativeGaugeSize: true,
        levelcolors: [{
          color: '#ff0000',
          lo: data[3],
          hi: data[6]
        },
		{
          color: '#00ff00',
          lo: data[6],
          hi: data[4]
        }],
		counter: true
      });
		
	}
	
		else if ((data[3] !='')&&(data[5]==''))
	{
		      var g1 = new JustGage({
        id: sectionid+'canvasvalue',
        value: data[1][0],
        min: data[3],
        max: data[4],
        symbol: '',
        pointer: true,
        gaugeWidthScale: 0.6,
		relativeGaugeSize: true,
        levelcolors: [{
          color: '#ff0000',
          lo: data[3],
          hi: data[5]
        },
		{
          color: '#00ff00',
          lo: data[5],
          hi: data[4]
        }],
		counter: true
      });
		
	}
	else
	{
	
			      var g1 = new JustGage({
        id: sectionid+'canvasvalue',
        value: completeparam[0][2],
        min: data[3],
        max: data[4],
        symbol: '',
        pointer: true,
        gaugeWidthScale: 0.6,
		relativeGaugeSize: true,
        levelcolors: [{
          color: '#ff0000',
          lo: data[3],
          hi: data[4]
        }],
		counter: true
      });
	  
	}
	$("*[id='"+sectionid+"notes']").html(data[9]);
}	
}
  });
  
  
  cancel();


}

function displayvalues(projectid,type){
	
	if(type === 2)
	{
	 var urld="dist/php/managedashboard.php?action=getprojectdetails";
	}
	if(type === 1)
	{
	 var urld="dist/php/managedashboard.php?action=getportfoliodetails";
	}
	if(type === 0)
	{
	 var urld="dist/php/managedashboard.php?action=getaccountdetails";
	}
	 $.ajax({
		
		 
  method: "POST",
  url:urld,
  data: { project: projectid }
  


})
  .done(function( data ) {
 
  var data = jQuery.parseJSON( data );	
    
    
	 var eff=parseFloat((data[1]/data[0])*100).toFixed(2);	
	 if(data[3] !== 0){
	 var passpercent=parseFloat((data[2]/data[3])*100).toFixed(2);	
	 }
	 else
	 {
		 var passpercent=0; 
	 }
	 if(data[3] !== 0){
	 var completepercent=parseFloat((data[4]/data[3])*100).toFixed(2);
	 
     //completepercent = 100 - completepercent;	 
	 }
	 else
	 {
		 var completepercent=0; 
	 }
	
     if(isNaN(eff))
	 {
		 eff=0;
	 }
	 if(isNaN(passpercent))
	 {
		 passpercent=0;
	 }
	 if(isNaN(completepercent))
	 {
		 completepercent=0;
	 }
	
	standardval = "<div class='container-fluid'> "

	+"<div class='row'>"
		
		+ "<div class='col-sm-3'><div style='width:220px;background-color:#e0e7ff'><b>Execution Percentage</b></div>"
	     +"    <div style='width:220px' align='left' class='small-box bg-orange'>"
	    
          +"      <div class='inner'>"
              +"   <h3>"
			  +completepercent
			  +"<sup style='font-size: 20px'>%</sup></h3>"
           
           
           +"</div>"

              //+ " <a href='#' class='small-box-footer' title='calculated based on number of executed test cases divided by total test cases'>More info<i class='fa fa-arrow-circle-right'></i></a>"
          +"    </div>"
           +" </div><!-- ./col -->"
    
           +" <div class='col-sm-3'><div style='width:220px;background-color:#e0e7ff'><b>Pass Percentage</b></div>"
          +"  <div style='width:220px;height:75px' class='small-box bg-aqua'>"
              +"  <div class='inner'>"
             +"     <h3>"
			 +passpercent
			 
			 +"<sup style='font-size: 20px'>%</sup></h3>"
              
               +" </div>"
              +"  <div class='icon'>"
  +"              <i class='ion ion-pie-graph'></i>"
+"                </div>"
			//	+"       <a href='#' class='small-box-footer'>More info <i class='fa fa-arrow-circle-right'></i></a>"
       +"       </div>"
      +"      </div><!-- ./col -->"
	+"<div class='col-sm-3'><div style='width:220px;background-color:#e0e7ff'><b>Total Defects Found</b></div>"
              
    +"   <div style='width:220px;height:75px' class='small-box bg-blue'>"
  +"  <div class='inner'>"
  +"                  <h3>"

            +data[0]
          +"</h3>"

  +"            </div>"
            +"    <div class='icon'>"
             +"     <i class='ion ion-bag'></i>"
           +"     </div>"
        // +"       <a href='#' class='small-box-footer'>More info <i class='fa fa-arrow-circle-right'></i></a>"
           +"   </div>"
         +"   </div><!-- ./col -->"
  
  
  +"   <div class='col-sm-3'><div style='width:220px;background-color:#e0e7ff'><b>Test Efficiency</b></div>"
           +"    <div style='width:220px;height:75px' class='small-box bg-green'>"
         +"       <div class='inner'>"
                 +" <h3>"
           +eff
				
				 
				 +"<sup style='font-size: 20px'>%</sup></h3>"
             
              +"  </div>"
              +"  <div class='icon'>"
            +"      <i class='ion ion-stats-bars'></i>"
           +"     </div>"
         //+"       <a href='#' class='small-box-footer'>More info <i class='fa fa-arrow-circle-right'></i></a>"
       +"       </div>"
        +"    </div><!-- ./col -->"
    


  +"        </div>"

 $(".standard-values").html(standardval);	
  })
}


function dashboarddata(dashboardid){
	  $.ajax({
  method: "POST",
  url: "dist/php/managedashboard.php?action=getdashboardtemplate",
  data: { dashboard: dashboardid }
})
  .done(function( data ) {
 
  var data = jQuery.parseJSON( data );	
    
 $("#content").html(data[4]); 

displayvalues(data[5],2);

createdashboardheader = "<h1>"
//+"Project Details"
+"<small>"
//+" ("

+"<b><font style='color:#000000'>Project Name : <b></font>"
+"<b><span id='project' data-val='"
+data[5]
+"'>"
+"<span id='account' data-val='"
+data[7]
+"'>"
+"<span id='portfolio_name' data-val='"
+data[6]
+"'>"

+data[2]
+"</span></b>"
//+" Dashboard Name : "
+"<b><span id='dashboard' data-val='"

+data[3]

+"'>"
//+data[2]
+"</span></b>"
//+")"
"</small>"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Manage Dashboard</li>"
+"<li class='active'>Create</li>"
+"</ol>"
 

$("#buttons").html("");

//////alert(data[3]);

$(".content-header").html(createdashboardheader);	
	  $.ajax({
  method: "POST",
  url: "dist/php/managedashboard.php?action=getdashboardgraphdetails",
  data: { project: data[5], dashboard:data[3]}
})
  .done(function( data ) {
  var data = jQuery.parseJSON( data );	
// ////alert(data); 
  for( i=0;i<data.length;i++)
  {
  displaychart(data[i]);
  }
 // ////alert(data);
  })
  
 })
}

function dashboarddataportfolio(dashboardid,type)
{
	
	
	//dashboarddata(dashboardids);
	//var obj = "<?php echo json_encode($res); ?>";
    //////alert (obj[0]);
	  $.ajax({
  method: "POST",
  url: "dist/php/managedashboard.php?action=getdashboardtemplate_portfolio",
  data: { dashboard: dashboardid }
})
  .done(function( data ) {
var data = jQuery.parseJSON( data );	    
 $("#content").html(data[4]); 
 if(type===1){
 displayvalues(data[0],type);
 }
 if(type === 0)
 {
	displayvalues(data[5],type); 
 }
createdashboardheader = "<h1>"	
+"<small>"
+"<b><span id='portfolio_name' data-val='"
+data[0]
+"'>"
//+data[0]
+"</span></b>"
+" <b><font style='color:#000000'>Dashboard Name :  </b></font>"
+"<b><span id='dashboard' data-val='"
+data[3]
+"'>"
+data[2]
+"</span></b>"


+"<span id='account' data-val='"
+data[5]
+"'>"
+"</small>"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Manage Dashboard</li>"
+"<li class='active'>Create</li>"
+"</ol>"
$("#buttons").html("");	





$(".content-header").html(createdashboardheader);	
	  $.ajax({
  method: "POST",
  url: "dist/php/managedashboard.php?action=getdashboardgraphdetails_portfolio",
  data: { project: data[0], dashboard:data[3]}
})
  .done(function( data ) {
  var data = jQuery.parseJSON( data );	
  //////alert(data); 
  for( i=0;i<data.length;i++)
  {
  displaychart(data[i]);
  //////alert(data[i]);
  }
  //////alert(data[0]);
  })
 })

}


function editdashboarddata(id){


createdashboards = "<div class='box-body'>"

+" <table style='width:100%'>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='dashboardname'>Dashboard Name</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='dashboardname' type='text' placeholder='Dashboard Name' maxlength=50 disabled></td>"
+"</div>"
+"<td style='width:10%'><label class='control-label' for='projectname'>Project Name</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<select class='form-control' id='projectnameinput' type='text' placeholder='Project Name' disabled></select>"
+"</div>"

+"</tr>"
+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>&nbsp</td>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>&nbsp</td>"
+"</tr>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='groups'>Groups</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<select id = 'groups'  class='form-control' multiple></select>"
+"</div>"
+"</td>"
+"<td style='width:10%'></td>"
+"<td style='width:40%'></td>"
+"</tr>"
+"</table>"
+"&nbsp"
+"<div class='form-group' style='padding:15px;max-height:68vh;overflow-y:scroll;'>"
    +"<div class='container'>"
      +"<div class='row'>"

        +"<div class='col-sm-4 sample-item'>"
          +"<h4><input type='radio' id = 'template' name='template' value='1'>&nbspQuarter Grid</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/quarter-grid.png'>"
        +"</div>"

        +"<div class='col-sm-4 sample-item'>"
		  +"<h4><input type='radio' id = 'template' name='template' value='2'>&nbspThirds Grid</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/thirds-grid.png'>"
        +"</div>"

        +"<div class='col-sm-4 sample-item'>"
		+"<h4><input type='radio' id = 'template' name='template' value='HeroThirds'>&nbspHero Thirds</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/hero-thirds.png'>"
        +"</div>"

      +"</div>"
      +"<div class='row'>"
        +"<div class='col-sm-4 sample-item'>"
          +"<h4><input type='radio' id = 'template' name='template' value='SplitCenetered'>&nbspSplit Centered</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/split-centered.png'>"
        +"</div>"

        +"<div class='col-sm-4 sample-item'>"
          +"<h4><input type='radio' id = 'template' name='template' value='SplitColumns'>&nbspSplit Columns</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/split-columns.png'>"
        +"</div>"

        +"<div class='col-sm-4 sample-item'>"
          +"<h4><input type='radio' id = 'template' name='template' value='SplitRows'>&nbspSplit Rows</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/split-rows.png'>"
        +"</div>"

      +"</div>"

      +"<div class='row'>"

        +"<div class='col-sm-4 sample-item'>"
          +"<h4><input type='radio' id = 'template' name='template' value='HeroSidebar'>&nbspHero Sidebar</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/hero-sidebar.png'>"
        +"</div>"

        +"<div class='col-sm-4 sample-item'>"
          +"<h4><input type='radio' id = 'template' name='template' value='TwoandOne'>&nbspTwo-and-One</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/two-and-one.png'>"
        +"</div>"
		
		        +"<div class='col-sm-4 sample-item'>"
          +"<h4><input type='radio' id = 'template' name='template' value='NewDashboard'>&nbspNew Dashboard</h4>"
          +"<img class='img-responsive img-thumbnail' src='dist/js/Images/create-dashboard.png'>"
        +"</div>"
		
      +"</div>"
      +"</div>"
+"</div>";


$("#content").html(createdashboards);




$.get( "dist/php/managedashboard.php?action=projectdetails", function( data ) {
fielddata="";
for (i=0;i<data.length;i++)
{
fielddata=fielddata.concat("<option data-val='"+data[i][0]+"'>"+data[i][1]+"</option>");
}
$('#projectnameinput').html(fielddata);
}, "json" );

$.get( "dist/php/managegroups.php?action=getgroups", function( data1 ) {
	
	var data1 = jQuery.parseJSON( data1 );
	var fieldvalue = "";
	for(i=0;i<data1.length;i++)
	{

			fieldvalue = fieldvalue.concat("<option value='"+data1[i][0]+"'>"+data1[i][1]+"</option>");
	}
$('#groups').html(fieldvalue);	
})

  $.ajax({
  method: "POST",
  url: "dist/php/managedashboard.php?action=getdashboardtemplate",
  data: { dashboard: id }
})
  .done(function( data2 ) {
  	var data2 = jQuery.parseJSON( data2 );
	if(data2[0]){	
  $("#dashboardname").val(data2[2]);
  $("#projectnameinput").val(data2[0]);
  for(i=0;i<data2[5].length;i++)
 {
	  $('#groups option').each(function(){
	 if (this.value == data2[8][i]) {
               $(this).prop('selected', true);
           }//this is the checked checkbox
  });
  }
	  $('input:radio[name=template]').each(function(){
	 
	 if (this.value == data2[1]) {
	           $(this).prop('checked', true);
           }//this is the checked checkbox
   $(this).prop('disabled', true);
});
$("#buttons").html("<button class='btn btn-default' onclick='updatedashboardtemp("+id+")'>Update</button>&nbsp<button class='btn btn-default' onclick='dashboarddata("+id+")'>Go to dashboard</button>");
	}
else{
	
	  $.ajax({
  method: "POST",
  url: "dist/php/managedashboard.php?action=getdashboardtemplate_portfolio",
  data: { dashboard: id }
})
  .done(function( data3 ) {
  	var data3 = jQuery.parseJSON( data3 );
	if(data3[0]==='Account Level')
	{
	$("#buttons").html("<button class='btn btn-default' onclick='updatedashboardtemp("+id+")'>Update</button>&nbsp<button class='btn btn-default' onclick='dashboarddataportfolio("+id+",0)'>Go to dashboard</button>");	
    }
	else
	{
	$("#buttons").html("<button class='btn btn-default' onclick='updatedashboardtemp("+id+")'>Update</button>&nbsp<button class='btn btn-default' onclick='dashboarddataportfolio("+id+",1)'>Go to dashboard</button>");	
    	
	}
  $("#dashboardname").val(data3[2]);
 $("#projectnameinput").val(data3[0]);
  for(i=0;i<data3[6].length;i++)
 {
	  $('#groups option').each(function(){
	 if (this.value == data3[6][i]) {
               $(this).prop('selected', true);
           }//this is the checked checkbox
  });
  }
	  $('input:radio[name=template]').each(function(){
	 
	 if (this.value == data3[1]) {
	           $(this).prop('checked', true);
           }//this is the checked checkbox
   $(this).prop('disabled', true);
});
  });
  

}

	});



createdashboardheader = "<h1>"
+"Manage Dashboard"
+"<small>"
+"Update Dashboard"
+"</small>"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Manage Dashboard</li>"
+"<li class='active'>Update</li>"
+"</ol>"
$(".content-header").html(createdashboardheader);
}



function updatedashboardtemp(id){
	var dashboardname = $('#dashboardname').val();
	//var projectname = $('#projectnameinput').data("val");
	var projectname = $('#projectnameinput').find(':selected').data('val');
	var project = $('#projectnameinput').val();
	//////alert(project);
	dashboardname = $.trim(dashboardname);
	var template = $("input[name='template']:checked").val();
	//////alert(template);
groups = [];    
    $("#groups :selected").each(function(){
        groups .push($(this).val()); 
    });
	var groups = JSON.stringify(groups)
	
	if((dashboardname != "")&&($("input[name='template']").is(':checked')))
	{
	var selectedtemplate = $( "input:radio[name=template]:checked" ).val();
	//////alert(selectedtemplate);
	dashboardname=dashboardname.replace("'","`");
	$.post( "dist/php/managedashboard.php?action=update", { dashboardname: dashboardname, projectname: projectname,template:selectedtemplate,groups:groups,id:id })
	.done(function( data ) {
//var data = jQuery.parseJSON( data );		
		if(data == 1)
		{
		$('#myModalLabel').html("Success Message");
		$('#myModalbody').html(dashboardname+" updated successfully");
		$('#myModalfooter').html("<button class='btn btn-default' id = 'success' data-dashboardname='"+dashboardname+"' data-dashboard = '"+data[0]+"' data-project='"+project+"' data-projectname='"+projectname+"' data-selectedtemplate = '"+selectedtemplate+"'onclick=dashboarddata("+id+"),cancel();>OK</button>");
		$('#myModal').modal({show:true});	
	}
	else
	{
	$('#myModalLabel').html("Success Message");
		$('#myModalbody').html("Some glitch!");
		$('#myModalfooter').html("<button class='btn btn-default' id = 'success' data-dashboardname='"+dashboardname+"' data-dashboard = '"+data[0]+"' data-project='"+project+"' data-projectname='"+projectname+"' data-selectedtemplate = '"+selectedtemplate+"'onclick=cancel()>OK</button>");
		$('#myModal').modal({show:true});	
	}
	});
	}
	else
	{
		content = "<ul>";
		if(dashboardname == "")
		{
			content =content.concat("<li>Please enter a Dashboard Name</li>");
		}
		if(!$("input[name='template']").is(':checked'))
		{
			content =content.concat("<li>Please select a template</li>");
		}
		content =content.concat("</ul>");
		$('#myModalLabel').html("Error Message");
		$('#myModalbody').html(content);
		$('#myModalfooter').html("<button class='btn btn-default' onclick='cancel()'>Cancel</button>");
		$('#myModal').modal({show:true});	
	}
}