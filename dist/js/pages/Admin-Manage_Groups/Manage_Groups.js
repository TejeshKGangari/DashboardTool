function creategroups()
{

$.get( "dist/php/managegroups.php?action=getgroups"+"&" + new Date().getTime(), function( data ) {
tabledata = "<div class='box-body'>"
+" <table id='example1' class='table table-bordered table-striped'>"
+"<thead>"
+"<tr>"
+"<th>Group Name</th>"
+"<th>Description</th>"
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
	+"<span class='fa fa-edit fa-2x' onclick='groupdata("+data[i][0]+")'</span>"
	+"</td>"
	+"</tr>";
}
tabledata =tabledata.concat("</tbody>")
+"</table>"
+"</div>";
$("#content").html(tabledata);
$("#example1").DataTable();
}, "json" );



$("#buttons").html("<button class='btn btn-default' onclick='groups()'><i class='fa fa-plus'></i> Add item</button>");

valstandard = "<div></div>"
$(".standard-values").html(valstandard);
managedashboardsheader = "<h1>"
+"Manage Group"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Manage Group</li>"
+"</ol>";
$(".content-header").html(managedashboardsheader);
}

function cancel(){
	$('#myModal').modal('hide');
}


function groups(){

$.ajax({
  method: "POST",
  url: "dist/php/managegroups.php?action=getgroupaccesslist"
})
.done(function( data ) {

createdashboards = "<div class='box-body'>"

+" <table style='width:100%'>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='groupname'>Group Name</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='groupname' type='text' placeholder='groupname' maxlength=50>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='description'>Description</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<textarea class='form-control' id='description'  placeholder='Description' maxlength=500></textarea>"
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
+"<td style='width:10%'><label class='control-label' for='accesslevels'>Access Levels</label></td>"
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
+"</tr>";
"</table>"
+"</div>";
	var data = jQuery.parseJSON( data );
grouplist ="<table id='result1' style='width:100%'>";
	for (i=0;i<data.length;i++)
{
list = "<tr>"
+"<td style='width:20%'></td>"
+"<td style='width:20%'>"+data[i][1]+"</td>"
+"<td style='width:20%'>"
+data[i][2]
+"</td>"
+"<td style='width:20%'>"
+"<input type='checkbox' id='groupaccess' value="+data[i][0]+">"
+"</td>"
+"<td style='width:20%'></td>"
+"</tr>";

grouplist = grouplist.concat(list);	
}
grouplist = grouplist.concat("</table></div>");	
createdashboards = createdashboards.concat(grouplist);

$("#content").html(createdashboards);



$("#buttons").html("<button class='btn btn-default' onclick='addgroup()'>Create</button>");
createdashboardheader = "<h1>"
+"Manage Groups"
+"<small>"
+"Create Groups"
+"</small>"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Manage Group</li>"
+"<li class='active'>Create</li>"
+"</ol>";
$(".content-header").html(createdashboardheader);
});



}

function addgroup(){
var groupname = $('#groupname').val();
	groupname = $.trim(groupname);
	var description = $('#description').val();
	description = $.trim(description);
	groupaccess =[];
	  $("#result1 input:checkbox:checked").each(function(){
        groupaccess.push($(this).val()); 
    });
if((groupname !='')&&(description !=''))
{
	var groupaccess = JSON.stringify(groupaccess)
$.ajax({
  method: "POST",
  url: "dist/php/managegroups.php?action=create",
  data: { groupname:groupname,description:description,groupaccess:groupaccess}
})
.done(function( data ) {
if(data==1)
{

$('#myModalLabel').html("Success Message");
		$('#myModalbody').html(groupname+" created successfully");
		$('#myModalfooter').html("<button class='btn btn-default' id = 'failure' onclick=creategroups();cancel();>OK</button>");
		$('#myModal').modal({show:true});	
}
else
{
			$('#myModalLabel').html("Error Message");
		$('#myModalbody').html(groupname+" already exists");
		$('#myModalfooter').html("<button class='btn btn-default' id = 'success' onclick=cancel()>OK</button>");
		$('#myModal').modal({show:true});	
}
});	
}
else
{
		$('#myModalLabel').html("Error Message");
		$('#myModalfooter').html("<button class='btn btn-default' id = 'success' onclick=cancel()>OK</button>");
		content = ""
		if(groupname =='')
		{
		content = content.concat("<li>Group Name should not be empty</li>");
		}
		if(description =='')
		{
		content = content.concat("<li>Description should not be empty</li>");
		}	
		$('#myModalbody').html("<ul>"+content+"</ul>");
		$('#myModal').modal({show:true});	
}
}

function groupdata(id){
$.ajax({
  method: "POST",
  url: "dist/php/managegroups.php?action=getgroupdata",
  data:{id:id}
})
.done(function( data ) {
	var data = jQuery.parseJSON( data );
createdashboards = "<div class='box-body'>"

+" <table style='width:100%'>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='groupname'>Group Name</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='groupname' type='text' placeholder='groupname' value='"+data[0][1]+"' maxlength=50 disabled>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='description'>Description</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<textarea class='form-control' id='description'  placeholder='Description' maxlength=500>"+data[0][2]+"</textarea>"
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
+"<td style='width:10%'><label class='control-label' for='accesslevels'>Access Levels</label></td>"
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
+"</tr>";
"</table>"
+"</div>";

grouplist ="<table id='result1' style='width:100%'>";
	for (i=0;i<data[2].length;i++)
{
	
list = "<tr>"
+"<td style='width:20%'></td>"
+"<td style='width:20%'>"+data[2][i][1]+"</td>"
+"<td style='width:20%'>"
+data[2][i][2]
+"</td>"
+"<td style='width:20%'>"
+"<input type='checkbox' id='groupaccess' value="+data[2][i][0]+">"
+"</td>"
+"<td style='width:20%'></td>"
+"</tr>";
grouplist = grouplist.concat(list);	
}
grouplist = grouplist.concat("</table></div>");	
createdashboards = createdashboards.concat(grouplist);
$("#content").html(createdashboards);

for(i=0;i<data[1].length;i++)
 {
	  $('#result1 input:checkbox').each(function(){
	 if (this.value == data[1][i]) {
               $(this).prop('checked', true);
           }//this is the checked checkbox
  });

}




$("#buttons").html("<button class='btn btn-default' onclick='updategroup("+data[0][0]+")'>Update</button>");
createdashboardheader = "<h1>"
+"Manage Group"
+"<small>"
+"Update Group"
+"</small>"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Manage User</li>"
+"<li class='active'>Update</li>"
+"</ol>";
$(".content-header").html(createdashboardheader);
});
	
}

function updategroup(id)
{
var groupname = $('#groupname').val();
	groupname = $.trim(groupname);
	var description = $('#description').val();
	description = $.trim(description);
	
	groupaccess =[];
	  $("#result1 input:checkbox:checked").each(function(){
        groupaccess.push($(this).val()); 
    });
if((groupname !='')&&(description !=''))
{
	var groupaccess = JSON.stringify(groupaccess)
$.ajax({
  method: "POST",
  url: "dist/php/managegroups.php?action=update",
  data: { groupname:groupname,description:description,groupaccess:groupaccess,id:id}
})
.done(function( data ) {
if(data==1)
{

$('#myModalLabel').html("Success Message");
		$('#myModalbody').html(groupname+" updated successfully");
		$('#myModalfooter').html("<button class='btn btn-default' id = 'failure' onclick=creategroups();cancel();>OK</button>");
		$('#myModal').modal({show:true});	
}
else
{
			$('#myModalLabel').html("Error Message");
		$('#myModalbody').html("Some glitch");
		$('#myModalfooter').html("<button class='btn btn-default' id = 'success' onclick=cancel()>OK</button>");
		$('#myModal').modal({show:true});	
}
});	
}	
}