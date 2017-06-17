function datasyncup()
{

$.get( "dist/php/manageprojects.php?action=getprojects", function( data ) {
tabledata = "<div class='box-body'>"
+" <table id='example1' class='table table-bordered table-striped'>"
+"<thead>"
+"<tr>"
+"<th>Project Name</th>"
+"<th>Application Name</th>"
+"<th>Release Number</th>"
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
	+"<td>"
	+data[i][2]
	+"</td>"
	+"<td>"
	+data[i][3]
	+"</td>"
	+"<td>"
	+"<span class='fa fa-edit fa-2x' onclick='projectdatasyncup("+data[i][0]+")'</span>"
	+"</td>"
	+"</tr>";
}
tabledata =tabledata.concat("</tbody>")
+"</table>"
+"</div>";
$("#content").html(tabledata);
$("#example1").DataTable();
}, "json" );



$("#buttons").html("");
valstandard = "<div></div>"
$(".standard-values").html(valstandard);

managedashboardsheader = "<h1>"
+"Data Sync-up"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Data Sync-up</li>"
+"</ol>";
$(".content-header").html(managedashboardsheader);
}


function projects(){


createdashboards = "<div class='box-body'>"

+" <table style='width:100%'>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='projectname'>Project Name</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='projectname' type='text' placeholder='Project Name'></td>"
+"</div>"
+"<td style='width:10%'><label class='control-label' for='qeamanager'>QE&A Manager</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='qeamanager' type='text' placeholder='QE&A Manager'></td>"
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
+"<input class='form-control' id='applicationname' type='text' placeholder='Application Name'></td>"
+"</div>"
+"<td style='width:10%'><label class='control-label' for='releasenumber'>Release Number</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='releasenumber' type='text' placeholder='Release Number'></td>"
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
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

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


+"<tr>"
+"<td style='width:10%'><label class='control-label' for='designinterface'>Interface</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<select class='form-control' id='designinterface'><option id='QC'>Quality Center</option><option id='TFS'>Team Foundation Server</option><option id='JIRA'>Jira</option></select>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='interface'>Domain</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='designdomain' type='text' placeholder='Domain'></td>"
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
+"<td style='width:10%'><label class='control-label' for='designproject'>Project</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='designproject' type='text' placeholder='Project'></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='designpath'>Folder Path</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='designpath' type='text' placeholder='Path'></td>"
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
+"<td style='width:10%'><label class='control-label' for='testexecution'>Test execution:</label></td>"
+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

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


+"<tr>"
+"<td style='width:10%'><label class='control-label' for='executioninterface'>Interface</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<select class='form-control' id='executioninterface'><option id='QC'>Quality Center</option><option id='TFS'>Team Foundation Server</option><option id='JIRA'>Jira</option></select>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='interface'>Domain</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='executiondomain' type='text' placeholder='Domain'></td>"
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
+"<td style='width:10%'><label class='control-label' for='executionproject'>Project</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='executionproject' type='text' placeholder='Project'></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='executionpath'>Folder Path</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='executionpath' type='text' placeholder='Path'></td>"
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
+"&nbsp"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

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


+"<tr>"
+"<td style='width:10%'><label class='control-label' for='defectsinterface'>Interface</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<select class='form-control' id='defectsinterface'><option id='QC'>Quality Center</option><option id='TFS'>Team Foundation Server</option><option id='JIRA'>Jira</option></select>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='interface'>Domain</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='defectsdomain' type='text' placeholder='Domain'></td>"
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
+"<td style='width:10%'><label class='control-label' for='defectsproject'>Project</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='defectsproject' type='text' placeholder='Project'></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='defectspath'>Folder Path</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='defectspath' type='text' placeholder='Path'></td>"
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

+"</table>";

$("#content").html(createdashboards);

$.get( "dist/php/managedashboard.php?action=projectdetails", function( data ) {
fielddata="";
for (i=0;i<data.length;i++)
{
fielddata=fielddata.concat("<option data-val='"+data[i][0]+"'>"+data[i][1]+"</option>");
}
$('#projectnameinput').html(fielddata);
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
$("#buttons").html("<button class='btn btn-default' onclick='projecttemp()'>Create</button>");
createdashboardheader = "<h1>"
+"Data Sync-up"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Data Sync-up</li>"
+"<li class='active'>Create</li>"
+"</ol>"
$(".content-header").html(createdashboardheader);
}

function projecttemp(){
	var projectname = $('#projectname').val();
	projectname = $.trim(projectname);
	var qeamanager = $('#qeamanager').val();
	qeamanager = $.trim(qeamanager);
	//alert(qeamanager);
	var applicationname = $('#applicationname').val();
	applicationname = $.trim(applicationname);
	//alert(applicationname);
	var releasenumber = $('#releasenumber').val();
	releasenumber = $.trim(releasenumber);
	var designinterface = $('#designinterface').find(':selected').val();
	var designdomain = $('#designdomain').val();
	designdomain = $.trim(designdomain);
	var designproject = $('#designproject').val();
	designproject = $.trim(designproject);
	var designpath = $('#designpath').val();
	designpath = $.trim(designpath);
	
	var executioninterface = $('#executioninterface').find(':selected').val();
	var executiondomain = $('#executiondomain').val();
	executiondomain = $.trim(executiondomain);
	var executionproject = $('#executionproject').val();
	executionproject = $.trim(executionproject);
	var executionpath = $('#executionpath').val();
	executionpath = $.trim(executionpath);

	var defectsinterface = $('#defectsinterface').find(':selected').val();
	var defectsdomain = $('#defectsdomain').val();
	defectsdomain = $.trim(defectsdomain);
	var defectsproject = $('#defectsproject').val();
	defectsproject = $.trim(defectsproject);
	var defectspath = $('#defectspath').val();
	defectspath = $.trim(defectspath);
	groups = [];    
    $("#groups :selected").each(function(){
        groups .push($(this).val()); 
    });
	var groups = JSON.stringify(groups)
	if((projectname != "")&&(qeamanager != "")&&(applicationname != "")&&(releasenumber != ""))
	{
	
	$.post( "dist/php/manageprojects.php?action=create", { projectname: projectname, qeamanager: qeamanager,applicationname:applicationname,releasenumber:releasenumber,designinterface:designinterface,designdomain:designdomain,designproject:designproject,designpath:designpath,executioninterface:executioninterface,executiondomain:executiondomain,executionproject:executionproject,executionpath:executionpath,defectsinterface:defectsinterface,defectsdomain:defectsdomain,defectsproject:defectsproject,defectspath:defectspath,groups:groups })
	.done(function( data ) {
		
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
function projectdatasyncup(id){

$.ajax({
  method: "POST",
  url: "dist/php/manageprojects.php?action=getprojectinfo",
  data: { id:id}
})
.done(function( data ) {
var data = jQuery.parseJSON( data );
//alert(data);
createdashboards = "<div class='box-body'>"

+" <table style='width:100%'>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='projectname'>Project Name</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='projectname' type='text' placeholder='Project Name' value='"+data[0][1]+"' disabled></td>"
+"</div>"
+"<td style='width:10%'><label class='control-label' for='qeamanager'>QE&A Manager</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='qeamanager' type='text' placeholder='QE&A Manager' value='"+data[0][2]+"' disabled></td>"
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
+"<input class='form-control' id='applicationname' type='text' placeholder='Application Name' value='"+data[0][3]+"' disabled></td>"
+"</div>"
+"<td style='width:10%'><label class='control-label' for='releasenumber'>Release Number</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='releasenumber' type='text' placeholder='Release Number' value='"+data[0][4]+"' disabled></td>"
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
+"<select class='form-control' id='designinterface' disabled><option id='QC'>Quality Center</option></select>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='testdesign'>Server:</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='designserver' placeholder = 'Server' value='"+data[0][10]+"' disabled>"
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
+"<input class='form-control' id='designdomain' type='text' placeholder='Domain' value='"+data[0][6]+"'disabled/></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='designproject'>Project</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='designproject' type='text' placeholder='Project' value='"+data[0][7]+"' disabled/></td>"
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
+"<td style='width:10%'><label class='control-label' for='designproject'>Test Set Folder</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='designtestsetfolder' type='text' placeholder='Test Set Folder' value='"+data[0][8]+"' disabled></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='designtestset'>Test Set</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='designtestset' type='text' placeholder='Test Set' value='"+data[0][9]+"' disabled></td>"
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
+"<td style='width:10%'></td>"
+"<td style='width:40%'>"
+"<button class='btn btn-default' onclick='fetchdesigndata("+id+")'>Sync-up</button>"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:10%'></td>"
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
+"<select class='form-control' id='executioninterface' disabled><option id='QC'>Quality Center</option></select>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='testdesign'>Server:</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='executionserver' placeholder = 'Server' value='"+data[0][16]+"' disabled>"
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
+"<input class='form-control' id='executiondomain' type='text' placeholder='Domain' value='"+data[0][12]+"' disabled></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'>"
+"<label class='control-label' for='interface'>Project</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='executionproject' type='text' placeholder='project' value='"+data[0][13]+"' disabled></td>"
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
+"<td style='width:10%'><label class='control-label' for='executiontestsetfolder'>Test Set Folder</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='executiontestsetfolder' type='text' placeholder='Test set Folder' value='"+data[0][14]+"' disabled></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='executiontestset'>Test Set</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='executiontestset' type='text' placeholder='Test set' value='"+data[0][15]+"' disabled></td>"
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
+"<td style='width:10%'></td>"
+"<td style='width:40%'>"
+"<button class='btn btn-default' onclick = fetchexecutiondata("+id+") >Sync-up</button>"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"


+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"

+"<tr>"
+"<td style='width:10%'></td>"
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
+"<select class='form-control' id='defectsinterface' disabled><option id='TFS'>Team Foundation Server</option></select>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='testdesign'>Server:</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='defectsserver' placeholder = 'Server' value='"+data[0][22]+"' disabled/>"
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
+"<input class='form-control' id='defectsdomain' type='text' placeholder='Domain' value='"+data[0][18]+"' disabled></td>"
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
+"<input class='form-control' id='defecttestsetfolder' type='text' value='"+data[0][20]+"' placeholder='Query' disabled></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'></td>"

+"<td style='width:40%'>"
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
+"<td style='width:10%'></td>"
+"<td style='width:40%'>"
+"<button class='btn btn-default' onclick=fetchdefectsdata("+id+")>Sync-up</button>"
+"</td>"
+"<td style='width:10%'>&nbsp</td>"

+"<td style='width:40%'>"
+"&nbsp"
+"</td>"
+"</tr>"


+"<tr>"
+"<td style='width:10%'></td>"
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


	
$("#buttons").html("");
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


createdashboardheader = "<h1>"
+"Data Sync-up"
+"<small>"
+"Integrate Applications"
+"</small>"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Manage Project</li>"
+"<li class='active'>Sync-up</li>"
+"</ol>"
$(".content-header").html(createdashboardheader);

	});
	
}
 
 function fetchdesigndata(id)
 {
 $('#myModalLabel').html("Sync-up credentials");
 content = " <table style='width:100%'>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='Username'>Username</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='Username' type='text' placeholder='Username'>"
+"</div>"
+"</td>"
+"</tr>"
+"<tr>"
+"<td>"
+"&nbsp"
+"</td>"
+"<td>"
+"&nbsp"
+"</td>"
+"</tr>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='Password'>Password</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='Password' type='password' placeholder='Password'></td>"
+"</div>"

+"</tr>"
+"</table>";
		$('#myModalbody').html(content);
		$('#myModalfooter').html("<button class='btn btn-default' id = 'failure' onclick=cancel();>cancel</button>&nbsp<button class='btn btn-default' id = 'failure' onclick=getdesigndata("+id+");>OK</button>");
		$('#myModal').modal({show:true});
 
 }
  function fetchexecutiondata(id)
 {
$('#myModalLabel').html("Sync-up credentials");
 content = " <table style='width:100%'>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='Username'>Username</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='Username' type='text' placeholder='Username'>"
+"</div>"
+"</td>"
+"</tr>"
+"<tr>"
+"<td>"
+"&nbsp"
+"</td>"
+"<td>"
+"&nbsp"
+"</td>"
+"</tr>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='Password'>Password</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='Password' type='password' placeholder='Password'></td>"
+"</div>"

+"</tr>"
+"</table>";
		$('#myModalbody').html(content);
		$('#myModalfooter').html("<button class='btn btn-default' id = 'failure' onclick=cancel();>cancel</button>&nbsp<button class='btn btn-default' id = 'failure' onclick=getrunsdata("+id+");>OK</button>");
		$('#myModal').modal({show:true});

 }
   function fetchdefectsdata(id)
 {
 $('#myModalLabel').html("Sync-up credentials");
 content = " <table style='width:100%'>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='Username'>Username</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='Username' type='text' placeholder='Username'>"
+"</div>"
+"</td>"
+"</tr>"
+"<tr>"
+"<td>"
+"&nbsp"
+"</td>"
+"<td>"
+"&nbsp"
+"</td>"
+"</tr>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='Password'>Password</label></td>"

+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='Password' type='password' placeholder='Password'></td>"
+"</div>"

+"</tr>"
+"</table>";
		$('#myModalbody').html(content);
		$('#myModalfooter').html("<button class='btn btn-default' id = 'failure' onclick=cancel();>cancel</button>&nbsp<button class='btn btn-default' id = 'failure' onclick=getdefectsdata("+id+");>OK</button>");
		$('#myModal').modal({show:true});
 }
 
function getdesigndata(id)
{
	username = $('#Username').val();
	password = $('#Password').val();

$.ajax({
  method: "POST",
  url: "dist/php/datasyncup.php?action=getdesigndata",
  data: { id:id,username:username,password:password}
})
.done(function( data ) {
	cancel();
});	
}

function getrunsdata(id)
{
	username = $('#Username').val();
	password = $('#Password').val();

$.ajax({
  method: "POST",
  url: "dist/php/datasyncup.php?action=getrunsdata",
  data: { id:id,username:username,password:password}
})
.done(function( data ) {

cancel();
});	
}


function getdefectsdata(id)
{
	username = $('#Username').val();
	password = $('#Password').val();

$.ajax({
  method: "POST",
  url: "dist/php/tfs.php",
  data: { id:id,username:username,password:password}

  
  })
.done(function( data ) {
cancel();
});	
}