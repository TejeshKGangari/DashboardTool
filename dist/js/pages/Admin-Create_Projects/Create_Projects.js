function createproj()
{
var tabledata="";
$.get( "dist/php/manageprojects.php?action=getprojects", function( data ) {

	
tabledata = "<div class='box-body'>"
+" <table id='example1' class='table table-bordered table-striped'>"
+"<thead>"
+"<tr>"
+"<th>Project Name</th>"
+"<th>Application Name</th>"
+"<th>Release Number</th>"
+"<th>Actions</th>"
+"<th>Delete</th>"
+"</tr>"
+"</thead>"
+"<tbody>";

for(i=0; i<data.length; i++)
{
	tabledata =tabledata.concat("<tr>")
	+"<td>"
	+data[i][1]
	+"</td>"
	+"<td>"
	+data[i][2]
	+"</td>"
	+"<td>"
	+data[i][3]
	+"</td>"
	+"<td>"
	+"<span class='fa fa-edit fa-2x' onclick='projectdata("+data[i][0]+")'></span>"
	+"</td>"
	+"<td>"
	+"<span class ='fa fa-times' onclick='' ></span>"
	+"</td>"
	+"</tr>";
}
tabledata =tabledata.concat("</tbody>")
+"</table>"
+"</div>";
$("#content").html(tabledata);
$("#example1").DataTable();
}, "json" );



$("#buttons").html("<button class='btn btn-default' onclick='addprojects()'><i class='fa fa-plus'></i> Add item</button>");

valstandard = "<div></div>"
$(".standard-values").html(valstandard);
managedashboardsheader = "<h1>"
+"Manage Project"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Manage Project</li>"
+"</ol>";
$(".content-header").html(managedashboardsheader);
}


function addprojects(){

createdashboards = 



"<div class='box-body'>"

+" <table style='width:100%'>"
+"<tr>"

+"<td style='width:10%'><label class='control-label' for='account_name'>Account Name</label></td>"

+"<td style='width:40%'>"

+"<div class='col-sm-10'>"
+"<input class='form-control' id='account_name' type='text'  list='accountList' placeholder='Account Name' maxlength=45></td>"
+"<datalist id='accountList'>"
+"</datalist>"
+"</div>"



+"<td style='width:10%'><label class='control-label' for='portfolio_name'>Portfolio Name</label></td>"

+"<td style='width:40%'>"

+"<div class='col-sm-10'>"
+"<input class='form-control' id='portfolio_name' list='portfolioList' type='text' placeholder='Portfolio Name' maxlength=45></td>"
+"<datalist id='portfolioList'>"
+"</datalist>"
+"</div>"
+"</tr>"

+"<tr>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"



+"<tr>"

+"<td style='width:10%'><label class='control-label' for='projectname'>Project Name</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"


+"<input class='form-control' type='text' id='projectname' list='projectList' placeholder='Project Name' maxlength=45/><!--your input textbox-->"
+"<datalist id='projectList'>"
+"</datalist>"

+"</div>"
+"<td style='width:10%'><label class='control-label' for='qeamanager'>QE&A Manager</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='qeamanager' type='text' placeholder='QE&A Manager' maxlength=45></td>"
+"</div>"

+"</tr>"
+"<tr>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:10%'><label class='control-label' for='applicationname'>Application Name</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='applicationname' type='text' placeholder='Application Name' maxlength=45></td>"
+"</div>"
+"<td style='width:10%'><label class='control-label' for='releasenumber'>Release Number</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='releasenumber' type='text' placeholder='Release Number' maxlength=45></td>"
+"</div>"

+"</tr>"
+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"</tr>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='testdesign'>Test Design:</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<select class='form-control' id='designinterface'><option id='QC'>Quality Center</option></select>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='testdesign' maxlength=45>Server:</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='designserver' placeholder = 'Server' maxlength=45>"
+"</div>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"
+"</table>";

designsection="<div><table style='width:100%'><tr>"
+"<td style='width:10%'><label class='control-label' for='designproject'>Domain</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='designdomain' type='text' placeholder='Domain' maxlength=45/></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='designproject'>Project</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='designproject' type='text' placeholder='Project' maxlength=45/></td>"
+"</div>"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'><label class='control-label' for='designproject' >Test Set Folder</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='designtestsetfolder' type='text' placeholder='Test Set Folder' disabled></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='designtestset'>Test Set</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='designtestset' type='text' placeholder='Test Set' maxlength=45></td>"
+"</div>"
+"</td>"
+"</tr>"
+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"</table>"
+"</div>";
executionsection ="<div>"
+"<table style='width:100%'>"
+"</tr>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='testexecution'>Test execution:</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<select class='form-control' id='executioninterface'><option id='QC'>Quality Center</option></select>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='testdesign' maxlength=45>Server:</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='executionserver' placeholder = 'Server' maxlength=45>"
+"</div>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'><label class='control-label' for='interface'>Domain</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='executiondomain' type='text' placeholder='Domain' maxlength=45></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'>"
+"<label class='control-label' for='interface'>Project</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='executionproject' type='text' placeholder='project' maxlength=45></td>"
+"</div>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'><label class='control-label' for='executiontestsetfolder' >Test Set Folder</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='executiontestsetfolder' type='text' placeholder='Test set Folder' disabled></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='executiontestset'>Test Set</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='executiontestset' type='text' placeholder='Test set' maxlength=45></td>"
+"</div>"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"


+"</tr>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='testdefects'>Test defects:</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<select class='form-control' id='defectsinterface'><option id='TFS'>Team Foundation Server</option></select>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='testdesign'>Server:</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='defectsserver' placeholder = 'Server' maxlength=45/>"
+"</div>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"
+"</table>"
+"</div>";

defectsection="<div>"
+"<table style='width:100%'>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='interface'>Domain</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='defectsdomain' type='text' placeholder='Domain' maxlength=45></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='defectsproject'>Project</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='defectsproject' type='text' placeholder='Project' disabled></td>"
+"</div>"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'><label class='control-label' for='defecttestsetfolder' maxlength=450>Query</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='defecttestsetfolder' type='text' placeholder='Query'></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='Current_Phase'>Current Phase</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='Current_Phase' type='text' placeholder='Current Phase' maxlength=45/></td>"
+"</div>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'><label class='control-label' for='groups'>Groups</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<Select class='form-control' id='groups' type='text' multiple></select>"
+"</div>"
+"</td>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='No_of_Resources'>No of Resources</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='No_of_Resources' type='text' placeholder='No_of_Resources' maxlength=45/></td>"
+"<td style='width:10%'></td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"</table>"
+"</div>";

$("#content").html(createdashboards);
$("#content").append(designsection);
$("#content").append(executionsection);
$("#content").append(defectsection);

  $.get( "dist/php/managedashboard.php?action=projectdetails", function( data ) {
fielddata="";
for (i=0;i<data.length;i++)
{
fielddata=fielddata.concat("<option value='"+data[i][1]+"'/>");
}
$('#projectList').html(fielddata);
}, "json" ); 

 $.get( "dist/php/managedashboard.php?action=portfoliodetails", function( data ) {
fielddata="";
for (i=0;i<data.length;i++)
{
fielddata=fielddata.concat("<option value='"+data[i][0]+"'/>");
}
$('#portfolioList').html(fielddata);
}, "json" ); 

 $.get( "dist/php/managedashboard.php?action=accountdetails", function( data ) {
fielddata="";
for (i=0;i<data.length;i++)
{
fielddata=fielddata.concat("<option value='"+data[i][0]+"'/>");
}
$('#accountList').html(fielddata);
}, "json" );  


$.get( "dist/php/managegroups.php?action=getgroups", function( data ) {
	
	var data = jQuery.parseJSON( data );
	var fieldvalue = "";
	for(i=0;i<data.length;i++)
	{

			fieldvalue = fieldvalue.concat("<option value='"+data[i][0]+"'>"+data[i][1]+"</option>");
	}

$("#groups").html(fieldvalue);
});
$("#buttons").html("<button class='btn btn-default' onclick='createprojecttemp()'>Create</button>");
createdashboardheader = "<h1>"
+"Manage Project"
+"<small>"
+"Create Project"
+"</small>"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Manage Project</li>"
+"<li class='active'>Create</li>"
+"</ol>"
$(".content-header").html(createdashboardheader);
}

function createprojecttemp(){
	var projectname = $('#projectname').val();
	projectname = $.trim(projectname);
	var account_name = $('#account_name').val();
	account_name = $.trim(account_name);
	var portfolio_name = $('#portfolio_name').val();
	portfolio_name = $.trim(portfolio_name);
	//alert(portfolio_name);
	var qeamanager = $('#qeamanager').val();
	qeamanager = $.trim(qeamanager);
	//alert(qeamanager);
	var applicationname = $('#applicationname').val();
	applicationname = $.trim(applicationname);
	//alert(applicationname);
	var releasenumber = $('#releasenumber').val();
	releasenumber = $.trim(releasenumber);
	var No_of_Resources = $('#No_of_Resources').val();
	No_of_Resources = $.trim(No_of_Resources);
	var Current_Phase = $('#Current_Phase').val();
	Current_Phase = $.trim(Current_Phase);
	var designinterface = $('#designinterface').find(':selected').val();
	if(designinterface == 'Quality Center')
	{
	var designdomain = $('#designdomain').val();
	var designproject = $('#designproject').val();
	var designtestsetfolder = $('#designtestsetfolder').val();
	var designtestset = $('#designtestset').val();
	var designserver = $('#designserver').val();
	}
	var executioninterface = $('#executioninterface').find(':selected').val();
	if(executioninterface == 'Quality Center')
	{
	var executiondomain = $('#executiondomain').val();
	var executionproject = $('#executionproject').val();
	var executiontestsetfolder = $('#executiontestsetfolder').val();
	var executiontestset = $('#executiontestset').val();
	var executionserver = $('#executionserver').val();
	}
	var defectsinterface = $('#defectsinterface').find(':selected').val();	
	if(defectsinterface == 'Team Foundation Server')
	{
	var defectsdomain = $('#defectsdomain').val();
	var defectsproject = $('#defectsproject').val();
	var defectstestsetfolder = $('#defecttestsetfolder').val();
	
	defectstestsetfolder = defectstestsetfolder.replace(/'/g,"`");
	//alert(defectstestsetfolder);
	//var defectstestset = $('#defecttestset').val();
	var defectsserver = $('#defectsserver').val();
	}

	groups = [];    
    $("#groups :selected").each(function(){
        groups .push($(this).val()); 
    });
	var groups = JSON.stringify(groups)
	if((projectname != "")&&(qeamanager != "")&&(applicationname != "")&&(releasenumber != ""))
	{
	
	$.post( "dist/php/manageprojects.php?action=create", { projectname: projectname, qeamanager: qeamanager,applicationname:applicationname,releasenumber:releasenumber,designinterface:designinterface,designdomain:designdomain,designproject:designproject,designtestsetfolder:designtestsetfolder,designtestset:designtestset,designserver:designserver,executioninterface:executioninterface,executiondomain:executiondomain,executionproject:executionproject,executiontestsetfolder:executiontestsetfolder,executiontestset:executiontestset,executionserver:executionserver,defectsinterface:defectsinterface,defectsdomain:defectsdomain,defectsproject:defectsproject,defectstestsetfolder:defectstestsetfolder,defectstestset:'',defectsserver:defectsserver,groups:groups ,portfolio_name:portfolio_name,account_name:account_name,Current_Phase:Current_Phase,No_of_Resources:No_of_Resources})
	.done(function( data ) {
		//alert(data);
if(data==1)
{
$('#myModalLabel').html("Success Message");
		$('#myModalbody').html(projectname+" created successfully");
		$('#myModalfooter').html("<button class='btn btn-default' id = 'failure' onclick=createproj();cancel();>OK</button>");
		$('#myModal').modal({show:true});
}
else{


		$('#myModalLabel').html("Error Message");
		$('#myModalbody').html(projectname+" already exists");
		$('#myModalfooter').html("<button class='btn btn-default' id = 'success' onclick=cancel()>OK</button>");
		$('#myModal').modal({show:true});	
}
		});

	}
	else
	{
		content = "<ul>";
		if(projectname == "")
		{
			content =content.concat("<li>Please enter a Project Name</li>");
		}
		if(qeamanager =="")
		{
			content =content.concat("<li>Please enter a QE&A Manager</li>");
		}
		if(applicationname =="")
		{
			content =content.concat("<li>Please enter an Application Name</li>");
		}
		if(releasenumber =="")
		{
			content =content.concat("<li>Please enter a Release Number</li>");
		}
		content =content.concat("</ul>");
		$('#myModalLabel').html("Error Message");
		$('#myModalbody').html(content);
		$('#myModalfooter').html("<button class='btn btn-default' onclick='cancel()'>Cancel</button>");
		$('#myModal').modal({show:true});	
	}
}
//alert(projectname);
function cancel(){
	$('#myModal').modal('hide');
}
function projectdata(id){

$.ajax({
  method: "POST",
  url: "dist/php/manageprojects.php?action=getprojectinfo",
  data: { id:id}
})
.done(function( data ) {
var data = jQuery.parseJSON( data );

createdashboards = 
"<div class='box-body'>"

+" <table style='width:100%'>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='projectname'>Account Name</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='account_name' type='text' placeholder='Account Name' value='"+data[0][23]+"' maxlength=45></td>"
+"</div>"

+"<td style='width:10%'><label class='control-label' for='projectname'>Portfolio Name</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='portfolio_name' type='text' placeholder='Portfolio Name' value='"+data[0][24]+"' maxlength=45></td>"
+"</tr>"
+"<tr>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='projectname'>Project Name</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='projectname' type='text' placeholder='Project Name' value='"+data[0][1]+"' maxlength=45></td>"
+"</div>"
+"<td style='width:10%'><label class='control-label' for='qeamanager'>QE&A Manager</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='qeamanager' type='text' placeholder='QE&A Manager' value='"+data[0][2]+"' maxlength=45></td>"
+"</div>"

+"</tr>"
+"<tr>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:10%'><label class='control-label' for='applicationname'>Application Name</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='applicationname' type='text' placeholder='Application Name' value='"+data[0][3]+"' maxlength=45></td>"
+"</div>"
+"<td style='width:10%'><label class='control-label' for='releasenumber'>Release Number</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='releasenumber' type='text' placeholder='Release Number' value='"+data[0][4]+"' maxlength=45></td>"
+"</div>"

+"</tr>"
+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"</tr>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='testdesign'>Test Design:</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<select class='form-control' id='designinterface'><option id='QC'>Quality Center</option</select>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='testdesign'>Server:</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='designserver' placeholder = 'Server' value='"+data[0][10]+"' maxlength=45>"
+"</div>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"
+"</table>";

designsection="<div><table style='width:100%'><tr>"
+"<td style='width:10%'><label class='control-label' for='designproject'>Domain</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='designdomain' type='text' placeholder='Domain' value='"+data[0][6]+"' maxlength=45/></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='designproject'>Project</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='designproject' type='text' placeholder='Project' value='"+data[0][7]+"'maxlength=45/></td>"
+"</div>"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'><label class='control-label' for='designproject' >Test Set Folder</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='designtestsetfolder' type='text' placeholder='Test Set Folder' value='"+data[0][8]+"' disabled></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='designtestset'>Test Set</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='designtestset' type='text' placeholder='Test Set' value='"+data[0][9]+"' maxlength=45></td>"
+"</div>"
+"</td>"
+"</tr>"
+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"</table>"
+"</div>";
executionsection ="<div>"
+"<table style='width:100%'>"
+"</tr>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='testexecution'>Test execution:</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<select class='form-control' id='executioninterface'><option id='QC'>Quality Center</option></select>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='testdesign'>Server:</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='executionserver' placeholder = 'Server' value='"+data[0][16]+"' maxlength=45>"
+"</div>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'><label class='control-label' for='interface'>Domain</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='executiondomain' type='text' placeholder='Domain' value='"+data[0][12]+"' maxlength=45></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'>"
+"<label class='control-label' for='interface'>Project</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='executionproject' type='text' placeholder='project' value='"+data[0][13]+"' maxlength=45></td>"
+"</div>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'><label class='control-label' for='executiontestsetfolder' >Test Set Folder</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='executiontestsetfolder' type='text' placeholder='Test set Folder' value='"+data[0][14]+"' disabled></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='executiontestset'>Test Set</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='executiontestset' type='text' placeholder='Test set' value='"+data[0][15]+"' maxlength=45></td>"
+"</div>"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"


+"</tr>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='testdefects'>Test defects:</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<select class='form-control' id='defectsinterface'><option id='TFS'>Team Foundation Server</option></select>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='testdesign'>Server:</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='defectsserver' placeholder = 'Server' value='"+data[0][22]+"' maxlength=45/>"
+"</div>"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"
+"</table>"
+"</div>";

defectsection="<div>"
+"<table style='width:100%'>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='interface'>Domain</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='defectsdomain' type='text' placeholder='Domain' value='"+data[0][18]+"' maxlength=45></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='defectsproject'>Project</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='defectsproject' type='text' placeholder='Project' value='"+data[0][19]+"' disabled></td>"
+"</div>"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'><label class='control-label' for='defecttestsetfolder'>Query</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='defecttestsetfolder' type='text' value='"+data[0][20]+"' placeholder='Query' maxlength=450></td>"
+"</div>"
+"<td style='width:10%'><label class='control-label' for='No_of_Resources'>No of Resources</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='No_of_Resources' type='text' placeholder='No of Resources' value= '"+data[0][26]+"' maxlength=45/></td>"

+"<td style='width:10%'></td>"
+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
	

+"</tr>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='Current_Phase'>Current Phase</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='Current_Phase' type='text' placeholder='Current Phase' value= '"+data[0][25]+"'    maxlength=45/></td>"
+"</div>"

+"</tr>"
+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</tr>"
+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'><label class='control-label' for='groups'>Groups</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<Select class='form-control' id='groups' type='text' multiple></select>"
+"</div>"
+"</td>"
+"<td style='width:10%'></td>"




+"</tr>"

+"<tr>"
+"<td style='width:10%'>&nbsp</td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"</table>"
+"</div>";

$("#content").html(createdashboards);
$("#content").append(designsection);
$("#content").append(executionsection);
$("#content").append(defectsection);


$.get( "dist/php/managegroups.php?action=getgroups", function( data1 ) {
	
	var data1 = jQuery.parseJSON( data1 );
	var fieldvalue = "";
	for(i=0;i<data1.length;i++)
	{

			fieldvalue = fieldvalue.concat("<option value='"+data1[i][0]+"'>"+data1[i][1]+"</option>");
	}

$("#groups").html(fieldvalue);
	
	$("#designinterface").val(data[0][5]);
$("#executioninterface").val(data[0][11]);
$("#defectsinterface").val(data[0][17]);
for(i=0;i<data[1].length;i++)
 {
	  $('#groups option').each(function(){
	 if (this.value == data[1][i]) {
               $(this).prop('selected', true);
           }//this is the checked checkbox
  });

}
});

$("#buttons").html("<button class='btn btn-default' onclick='updateproject("+data[0][0]+")'>Update</button>");
createdashboardheader = "<h1>"
+"Manage Project"
+"<small>"
+"Update Project"
+"</small>"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Manage Project</li>"
+"<li class='active'>Update</li>"
+"</ol>"
$(".content-header").html(createdashboardheader);

	});
	
}

function updateproject(id){
	var account_name = $('#account_name').val();
	account_name = $.trim(account_name);
	var portfolio_name = $('#portfolio_name').val();
	portfolio_name = $.trim(portfolio_name);
	var projectname = $('#projectname').val();
	projectname = $.trim(projectname);
	var qeamanager = $('#qeamanager').val();
	qeamanager = $.trim(qeamanager);
	var Current_Phase = $('#Current_Phase').val();
    Current_Phase= $.trim(Current_Phase);
    var No_of_Resources = $('#No_of_Resources').val();
    No_of_Resources= $.trim(No_of_Resources);

  	//alert(qeamanager);
	var applicationname = $('#applicationname').val();
	applicationname = $.trim(applicationname);
	//alert(applicationname);
	var releasenumber = $('#releasenumber').val();
	releasenumber = $.trim(releasenumber);
	var designinterface = $('#designinterface').find(':selected').val();
	if(designinterface == 'Quality Center')
	{
	var designdomain = $('#designdomain').val();
	var designproject = $('#designproject').val();
	var designtestsetfolder = $('#designtestsetfolder').val();
	var designtestset = $('#designtestset').val();
	var designserver = $('#designserver').val();
	}
	var executioninterface = $('#executioninterface').find(':selected').val();
	if(executioninterface == 'Quality Center')
	{
	var executiondomain = $('#executiondomain').val();
	var executionproject = $('#executionproject').val();
	var executiontestsetfolder = $('#executiontestsetfolder').val();
	var executiontestset = $('#executiontestset').val();
	var executionserver = $('#executionserver').val();
	}
	var defectsinterface = $('#defectsinterface').find(':selected').val();	
	if(defectsinterface == 'Team Foundation Server')
	{
	var defectsdomain = $('#defectsdomain').val();
	var defectsproject = $('#defectsproject').val();
	var defectstestsetfolder = $('#defecttestsetfolder').val();
	
	
	defectstestsetfolder = defectstestsetfolder.replace(/'/g,"`");
	
	//var defectstestset = $('#defecttestset').val();
	var defectsserver = $('#defectsserver').val();
	}

	groups = [];    
    $("#groups :selected").each(function(){
        groups .push($(this).val()); 
    });
	var groups = JSON.stringify(groups)
	if((projectname != "")&&(qeamanager != "")&&(applicationname != "")&&(releasenumber != ""))
	{
	
	$.post( "dist/php/manageprojects.php?action=update", { account_name: account_name,portfolio_name: portfolio_name,Current_Phase: Current_Phase,No_of_Resources: No_of_Resources,projectname: projectname, qeamanager: qeamanager,applicationname:applicationname,releasenumber:releasenumber,designinterface:designinterface,designdomain:designdomain,designproject:designproject,designtestsetfolder:designtestsetfolder,designtestset:designtestset,designserver:designserver,executioninterface:executioninterface,executiondomain:executiondomain,executionproject:executionproject,executiontestsetfolder:executiontestsetfolder,executiontestset:executiontestset,executionserver:executionserver,defectsinterface:defectsinterface,defectsdomain:defectsdomain,defectsproject:defectsproject,defectstestsetfolder:defectstestsetfolder,defectstestset:'',defectsserver:defectsserver,groups:groups,id:id })
	.done(function( data ) {
		
if(data==1)
{
$('#myModalLabel').html("Success Message");
		$('#myModalbody').html(projectname+" updated successfully");
		$('#myModalfooter').html("<button class='btn btn-default' id = 'failure' onclick=createproj();cancel();>OK</button>");
		$('#myModal').modal({show:true});
}
else{


		$('#myModalLabel').html("Error Message");
		$('#myModalbody').html("some glitch");
		$('#myModalfooter').html("<button class='btn btn-default' id = 'success' onclick=cancel()>OK</button>");
		$('#myModal').modal({show:true});	
}
		});	
}
}
 function designdomain()
 {
 designserver = $("#designserver").val();
 designserver = $.trim(designserver);
 if(designserver !="")
 {
$.ajax({
  method: "POST",
  url: "dist/php/datasyncup.php?action=designdomain",
  data: { designserver: designserver}
})
.done(function( data ) {
		$('#myModalLabel').html("Success Message");
		$('#myModalbody').html("Domain extracted successfully");
		$('#myModalfooter').html("<button class='btn btn-default' onclick=cancel()>OK</button>");
		$('#myModal').modal({show:true});	
	});
 }
 else
 {
 		$('#myModalLabel').html("Error Message");
		$('#myModalbody').html("Please enter a server name");
		$('#myModalfooter').html("<button class='btn btn-default' onclick=cancel()>OK</button>");
		$('#myModal').modal({show:true});	
 }
 }
 
function executiondomain()
 {
designdomain();
 }
 
 function defectsdomain()
 {
designdomain();
 }

 function designproject()
 {
  designserver = $("#designserver").val();
 designserver = $.trim(designserver);
	 var designdomain = $('#designdomain').find(':selected').val();
	 //var designdomain = $('#designdomain').val();
	 
	 if((designdomain != '--select--')&&(designserver != ''))
	 {
$.ajax({
  method: "POST",
  url: "dist/php/datasyncup.php?action=designproject",
  data: { designdomain: designdomain, designserver:designserver}
})
.done(function( data ) {
		$('#myModalLabel').html("Success Message");
		$('#myModalbody').html("Project extracted successfully");
		$('#myModalfooter').html("<button class='btn btn-default' onclick=cancel()>OK</button>");
		$('#myModal').modal({show:true});	
	});
	 }
	 else
	 {
		$('#myModalLabel').html("Error Message");
		$('#myModalbody').html("Please select a Domain");
		$('#myModalfooter').html("<button class='btn btn-default' onclick=cancel()>OK</button>");
		$('#myModal').modal({show:true});	
	 }
 }
 function executionproject()
 {
designproject();
 }
 
 function defectsproject()
 {
designproject();
 }

 
 
 
   function designtestsetfolder()
 {
  designserver = $("#designserver").val();
 designserver = $.trim(designserver);
	 var designdomain = $('#designdomain').find(':selected').val();
	 var designproject = $('#designproject').find(':selected').val();
	 //var designdomain = $('#designdomain').val();
	 //var designproject = $('#designproject').val();
	 
	 if((designserver !='') && (designdomain != '--select--')||(designproject != '--select--'))
	 {
$.ajax({
  method: "POST",
  url: "dist/php/datasyncup.php?action=designtestsetfolder",
  data: { designdomain: designdomain,designproject: designproject,designserver:designserver}
})
.done(function( data ) {
		$('#myModalLabel').html("Success Message");
		$('#myModalbody').html("Test Set Folders extracted successfully");
		$('#myModalfooter').html("<button class='btn btn-default' onclick=cancel()>OK</button>");
		$('#myModal').modal({show:true});	
	});
	 }
	 else
	 {
		$('#myModalLabel').html("Error Message");
		$('#myModalbody').html("Please select a Domain and Project");
		$('#myModalfooter').html("<button class='btn btn-default' onclick=cancel()>OK</button>");
		$('#myModal').modal({show:true});	
	 }
 }

 function executiontestsetfolder()
 {
designtestsetfolder();
 }
 
 function defecttestsetfolder()
 {
designtestsetfolder();
 }
 
 function designtestset()
 {
	 designserver = $("#designserver").val();
	 var designdomain = $('#designdomain').find(':selected').val();
	 var designproject = $('#designproject').find(':selected').val();
	 var designpath = $('#designtestsetfolder').find(':selected').data('val');
	 //var designdomain = $('#designdomain').val();
	 //var designproject = $('#designproject').val();
	 //var designpath = $('#designpath').val();
 
 if((designdomain != '--select--')||(designproject != '--select--')||(designpath != '--select--'))
	 {
$.ajax({
  method: "POST",
  url: "dist/php/datasyncup.php?action=designtestset",
  data: { designserver:designserver,designdomain: designdomain,designproject: designproject,designtestsetfolder: designpath}
})
.done(function( data ) {
		$('#myModalLabel').html("Success Message");
		$('#myModalbody').html("Test Set extracted successfully");
		$('#myModalfooter').html("<button class='btn btn-default' onclick=cancel()>OK</button>");
		$('#myModal').modal({show:true});	
	});
	 }
	 else
	 {
		$('#myModalLabel').html("Error Message");
		$('#myModalbody').html("Please select a Domain , Project and Test Set Folder");
		$('#myModalfooter').html("<button class='btn btn-default' onclick=cancel()>OK</button>");
		$('#myModal').modal({show:true});	
	 }
 }
  function executiontestset()
 {
designtestset();
 }
 
 function defecttestset()
 {
designtestset();
 }
 
 function addserver()
 {
	 	$('#myModalLabel').html("Server Details");
		$('#myModalbody').html("<table style='width:100%'><td style='width:30%'><label class='control-label' for='server'>Server Name</label></td>"
+"<td style='width:70%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='servercreate' type='text' placeholder='Server Name'>"
+"</div>"
+"</td>"

+"</tr>"
+"</table>");
		$('#myModalfooter').html("<button class='btn btn-default' onclick=cancel()>Cancel</button>&nbsp<button class='btn btn-default' onclick=servercreate()>OK</button>");
		$('#myModal').modal({show:true});	
 }
 
 function servercreate(){
	 var server = $('#servercreate').val();
	 server = $.trim(server);
	 if(server !='')
	 {
$.ajax({
  method: "POST",
  url: "dist/php/manageprojects.php?action=createserver",
  data: { server:server}
})
.done(function( data ) {
	
	if(data == 1)
	{
		$('#myModalLabel').html("Success Message");
		$('#myModalbody').html(server+" created successfully");
		$('#myModalfooter').html("<button class='btn btn-default' onclick=getserver()>OK</button>");
		$('#myModal').modal({show:true});	
		
	}
	else{
		$('#myModalLabel').html("Error Message");
		$('#myModalbody').html(server+" already exists");
		$('#myModalfooter').html("<button class='btn btn-default' id='dataserver' data-server='"+server+"' onclick=cancelcreate()>OK</button>");
		$('#myModal').modal({show:true});
		
	}
});	
		 
		 
	 }
	 else{
		 $('#myModalLabel').html("Error Message");
		$('#myModalbody').html("Please enter Server Name");
		$('#myModalfooter').html("<button class='btn btn-default' id='dataserver' onclick=servercreate()>OK</button>");
	//	$('#myModal').modal({show:true});
	 }
	 
 }
 function getserver(){
	 
	 	$.ajax({
  method: "POST",
  url: "dist/php/manageprojects.php?action=getserver"
})
.done(function(data) {
	var data = jQuery.parseJSON( data );
	content = "";
	for(i=0;i<data.length;i++)
{
	content = content .concat("<option>"+data[i]+"</option>");
}
$("#designserver").html(content);
	cancel();
});
	 
 }
 function cancelcreate()
 {
	 var servername = $("#dataserver").data('server')
	 addserver();
	 $("#servercreate").val(servername);

	$.ajax({
  method: "POST",
  url: "dist/php/manageprojects.php?action=serverupdate",
  data: {servername:servername}
})
.done(function(data) {
	
}) 
	 
 }