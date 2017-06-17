function createusers()
{

$.get( "dist/php/manageusers.php?action=getusers"+"&" + new Date().getTime(), function( data ) {
tabledata = "<div class='box-body'>"
+" <table id='example1' class='table table-bordered table-striped'>"
+"<thead>"
+"<tr>"
+"<th>Username</th>"
+"<th>First Name</th>"
+"<th>Last Name</th>"
+"<th>Groups</th>"
+"<th>Status</th>"
+"<th>Actions</th>"
+"</tr>"
+"</thead>"
+"<tbody>";
/*
array = sessionStorage.getItem("access");
	var array = jQuery.parseJSON( array );
*/
for(i=0; i<data.length; i++)
{
	tabledata =tabledata.concat("<tr>"
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
	
	+"</td>"
	+"<td>"
	+data[i][4]
	+"</td>"
	+"<td>");
	/*
for (j=0;j<array.length;j++)
{
if(array[j][0] == 'Manage User')
{

for (k=0;k<array[j].length;k++)
{
	if(array[j][k] == 'Edit')
	{	*/	
	tabledata =tabledata.concat("<span class='fa fa-edit fa-2x' onclick='userdata("+data[i][0]+")'</span>");
/*	}
}	
}
}
*/
	tabledata =tabledata.concat("</td>"
	+"</tr>");
}
tabledata =tabledata.concat("</tbody>")
+"</table>"
+"</div>";
$("#content").html(tabledata);
$("#example1").DataTable();
}, "json" );
$("#buttons").html("");
/*array = sessionStorage.getItem("access");
	var array = jQuery.parseJSON( array );

for (i=0;i<array.length;i++)
{
if(array[i][0] == 'Manage User')
{

for (j=0;j<array[i].length;j++)
{
	if(array[i][j] == 'Create')
	{
	*/	
		$("#buttons").html("<button class='btn btn-default' onclick='users()'><i class='fa fa-plus'></i> Add item</button>");
/*	}
}	
}
}

*/

valstandard = "<div></div>"
$(".standard-values").html(valstandard);

managedashboardsheader = "<h1>"
+"Manage User"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Manage User</li>"
+"</ol>";
$(".content-header").html(managedashboardsheader);
}

function cancel(){
	$('#myModal').modal('hide');
}


function users(){

$.get( "dist/php/managegroups.php?action=getgroups", function( data ) {
	
	var data = jQuery.parseJSON( data );
	var fieldvalue = "";
	for(i=0;i<data.length;i++)
	{

			fieldvalue = fieldvalue.concat("<option value='"+data[i][0]+"'>"+data[i][1]+"</option>");
	}
	createdashboards = "<div class='box-body'>"

+" <table style='width:100%'>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='username'>Username</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='username' type='text' placeholder='Username' maxlength = 30></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='active'>Active</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<select class='form-control' id='active' type='text' placeholder='' disabled><option value='Active'>Active</option><option value='In-active'>In-active</option></select>"
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
+"<td style='width:10%'><label class='control-label' for='firstname'>First Name</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='firstname' type='text' maxlength = 30 placeholder='First Name'></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='lastname'>Last Name</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='lastname' type='text' maxlength = 30 placeholder='Last Name'>"
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
+"<select class='form-control' id='groups' type='text' placeholder='' multiple>"+fieldvalue+"</select>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='emailAddress'>Email Address</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='emailaddress' maxlength = 50 type='email' placeholder='Email Address'>"
+"</div>"
+"</td>"
+"</tr>"



+"</table>"
+"&nbsp"
+"</div>";
$("#content").html(createdashboards);



$("#buttons").html("<button class='btn btn-default' onclick='adduser()'>Create</button>");
createdashboardheader = "<h1>"
+"Manage User"
+"<small>"
+"Create User"
+"</small>"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Manage User</li>"
+"<li class='active'>Create</li>"
+"</ol>"
$(".content-header").html(createdashboardheader);
});

}


function adduser()
{
	
	var username = $('#username').val();
	username = $.trim(username);
	var firstname = $('#firstname').val();
	firstname = $.trim(firstname);
	var lastname = $('#lastname').val();
	lastname = $.trim(lastname);
	var emailaddress = $('#emailaddress').val();
	var active = $('#active').find(':selected').val();
	groups = [];    
    $("#groups :selected").each(function(){
        groups .push($(this).val()); 
    });
	var groups = JSON.stringify(groups)
	
	if(username !='')
	{
	$.ajax({
  method: "POST",
  url: "dist/php/manageusers.php?action=create",
  data: { username:username,firstname:firstname,lastname:lastname,emailaddress:emailaddress,active:active,groups:groups}
})
.done(function( data ) {
var data1 = $.parseJSON(data);
if (data1[0] == 'Success')
{
$('#myModalLabel').html("Success Message");
		$('#myModalbody').html(username+" created successfully.</br>Token:"+data1[1]);
		$('#myModalfooter').html("<button class='btn btn-default' id = 'failure' onclick=createusers();cancel();>OK</button>");
		$('#myModal').modal({show:true});	
}
else
{
			$('#myModalLabel').html("Error Message");
		$('#myModalbody').html("Username already exxists");
		$('#myModalfooter').html("<button class='btn btn-default' id = 'success' onclick=cancel()>OK</button>");
		$('#myModal').modal({show:true});	
}
});
}
else{
	$('#myModalLabel').html("Error Message");
		$('#myModalbody').html("<ul><li> Username should not be empty</li></ul>");
		$('#myModalfooter').html("<button class='btn btn-default' id = 'success' onclick=cancel()>OK</button>");
		$('#myModal').modal({show:true});	
}
}
function userdata(id){
$.get( "dist/php/managegroups.php?action=getgroups", function( data1 ) {
	
	var data1 = jQuery.parseJSON( data1 );
	var fieldvalue = "";
	for(i=0;i<data1.length;i++)
	{

			fieldvalue = fieldvalue.concat("<option value='"+data1[i][0]+"'>"+data1[i][1]+"</option>");
	}
$.ajax({
  method: "POST",
  url: "dist/php/manageusers.php?action=getuserinfo",
  data: { id:id}
})
.done(function( data ) {
	var data = jQuery.parseJSON( data );
createdashboards = "<div class='box-body'>"

+" <table style='width:100%'>"
+"<tr>"
+"<td style='width:10%'><label class='control-label' for='username'>Username</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='username' type='text' placeholder='Username' maxlength = 30 value='"+data[0][1]+"' disabled></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='active'>Active</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<select class='form-control' id='active' type='text' placeholder=''><option value='Active'>Active</option><option value='In-active'>In-active</option></select>"
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
+"<td style='width:10%'><label class='control-label' for='firstname'>First Name</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='firstname' type='text'  maxlength = 30  placeholder='First Name' value='"+data[0][2]+"'></td>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='lastname'>Last Name</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='lastname' type='text'  maxlength = 30 placeholder='Last Name' value='"+data[0][3]+"'>"
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
+"<select class='form-control' id='groups' type='text' placeholder='' multiple>"+fieldvalue+"</select>"
+"</div>"
+"</td>"
+"<td style='width:10%'><label class='control-label' for='emailAddress'>Email Address</label></td>"
+"<td style='width:40%'>"
+"<div class='col-sm-10'>"
+"<input class='form-control' id='emailaddress' type='email'  maxlength = 50  placeholder='Email Address' value='"+data[0][4]+"'>"
+"</div>"
+"</td>"
+"</tr>"



+"</table>"
+"&nbsp"
+"</div>";
$("#content").html(createdashboards);
$("#active").val(data[0][5]);
for(i=0;i<data1[1].length;i++)
 {
	  $('#groups option').each(function(){
	 if (this.value == data[1][i]) {
               $(this).prop('selected', true);
           }//this is the checked checkbox
  });

}


$("#buttons").html("<button class='btn btn-default' onclick='updateuser("+data[0][0]+")'>Update</button>&nbsp<button class='btn btn-default' onclick='generatetoken("+data[0][0]+")'>Generate Token</button>");
createdashboardheader = "<h1>"
+"Manage User"
+"<small>"
+"Update User"
+"</small>"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Admin</a></li>"
+"<li class='active'>Manage User</li>"
+"<li class='active'>Update</li>"
+"</ol>"
$(".content-header").html(createdashboardheader);	
});
});
}

function updateuser(id)
{
	
var username = $('#username').val();
	var firstname = $('#firstname').val();
	var lastname = $('#lastname').val();
	var emailaddress = $('#emailaddress').val();
	var active = $('#active').find(':selected').val();
	groups = [];    
    $("#groups :selected").each(function(){
        groups .push($(this).val()); 
    });
	var groups = JSON.stringify(groups)
	$.ajax({
  method: "POST",
  url: "dist/php/manageusers.php?action=update",
  data: { username:username,firstname:firstname,lastname:lastname,emailaddress:emailaddress,active:active,groups:groups,id:id}
})
.done(function( data ) {

var data1 = $.parseJSON(data);
if (data1[0] == 'Success')

{
$('#myModalLabel').html("Success Message");
		$('#myModalbody').html(username+" updated successfully");
		$('#myModalfooter').html("<button class='btn btn-default' id = 'failure' onclick=createusers();cancel();>OK</button>");
		$('#myModal').modal({show:true});	
}
else
{
			$('#myModalLabel').html("Error Message");
		$('#myModalbody').html("some glitch");
		$('#myModalfooter').html("<button class='btn btn-default' id = 'success' onclick=cancel()>OK</button>");
		$('#myModal').modal({show:true});	
}
});	
}

function generatetoken(id)
{
var record = id;
$.ajax({
  method: "POST",
  url: "dist/php/manageusers.php?action=tag",
  data: { id: record }
})
   .done(function (data) { 
   document.getElementById('myModalLabel').innerHTML="Success Message";
   document.getElementById('myModalbody').innerHTML=data;
document.getElementById('myModalfooter').innerHTML="<button type='button' class='btn btn-default' onclick='cancel();'>Close</button>";
 $('#myModal').modal({show:true});	
   },'json')
    .fail(function (jqXHR, textStatus, errorThrown) { alert("fail"); })
}