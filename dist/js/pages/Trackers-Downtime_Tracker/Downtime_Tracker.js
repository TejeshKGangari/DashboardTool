function downtimetrackerpagedetails(){
downtimetrackerdetails = " <div class='box-body'>"
+" <table id='example1' class='table table-bordered table-striped'>"
+"<thead>"
+"<tr>"
+"<th>Build Number</th>"
+"<th>Date</th>"
+"<th>Start Time</th>"
+"<th>End Time</th>"
+"<th>Impacted Resources</th>"
+"<th>Actions</th>"
+"</tr>"
+"</thead>"
+"<tbody>"
+"</tbody>"
+"</table>"
+"</div>";
$("#content").html(downtimetrackerdetails);
$("#buttons").html("<button class='btn btn-default' onclick='adddowntimetracker()'><i class='fa fa-plus'></i> Add item</button>");
$("#example1").DataTable();

downtimetrackerheader = "<h1>"
+"Downtime Tracker"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Trackers</a></li>"
+"<li class='active'>Downtime Tracker</li>"
+"</ol>"
$(".content-header").html(downtimetrackerheader);
}

function adddowntimetracker()
{
downtimetrackerform = "<div class='form-group' style='padding:15px;max-height:68vh;overflow-y:scroll;'>"
					+"<table style='width:100%'>"
					+"<tr>"
					+"<td style='width:10%'>"					
                      +"<label class='control-label' for='buildnumber'>Build Number</label>"
					+"</td>"
					+"<td style='width:40%'>"							
					+"<div class='col-sm-10'>"
                      +"<input class='form-control' id='buildnumberinput' type='text' placeholder='Build Number'>"
                    +"</div>"
					+"</td>"					
					+"<td style='width:10%'>"					
                    +"<label class='control-label'>Downtime Date:</label>"
					+"</td>"
					+"<td style='width:40%'>"											
                    +"<div class='input-group col-sm-10'>"

                      +"<input class='form-control' placeholder ='dd/mm/yyyy' type='text' data-mask='' data-inputmask="
					  +'"'
					  +"'alias'"
					  +": 'dd/mm/yyyy'"
					  +'">'
                    +"</div>"
					+"</td>"
				  +"</tr>"
				+"<tr>"
				+"<td style='width:10%'>"
                      +"<label class='control-label'>Start Time:</label>"
				+"</td>"                      
					  				+"<td style='width:40%'>"
+"<div class='bootstrap-timepicker'>"
                    +"<div class='form-group'>"
									+"<div class='col-sm-10'>"
                        +"<input class='form-control timepicker' type='text'>"
                      +"</div>"
                    +"</div>"
                  +"</div>"
									+"</td>"
				+"<td style='width:10%'>"
                      +"<label class='control-label'>End Time:</label>"
				+"</td>"                      
				+"<td style='width:40%'>"
+"<div class='bootstrap-timepicker'>"
                    +"<div class='form-group'>"
									+"<div class='col-sm-10' style='padding-left:0px!important;padding-right:0px!important;'>"
                        +"<input class='form-control timepicker' type='text'>"
                      +"</div>"
                    +"</div>"
                  +"</div>"
									+"</td>"
				+"</tr>"
				+"<tr>"
				+"<td style='width:10%'>"
				+"<label class='control-label'>Multiple</label>"
				+"</td>"
				+"<td style='width:40%'>"
				+"<div class='form-group'>"
                    +"<div class='col-sm-10'>"
                    +"<select class='form-control select2' multiple='multiple' data-placeholder='Select a State' style='width: 100%;'>"
                      +"<option>Alabama</option>"
                      +"<option>Alaska</option>"
                      +"<option>California</option>"
                      +"<option>Delaware</option>"
                      +"<option>Tennessee</option>"
                      +"<option>Texas</option>"
                      +"<option>Washington</option>"
                    +"</select>"
                  +"</div>"
				  +"</div>"
				
				
				+"</tr>"
				  +"</table>"
				  +"</br>"
					 
				    +"<label class='control-label' for='Comments'>Root cause</label>"
					
					   +"<div class='row'>"
            +"<div class='col-md-12'>"
              
                +"<div class='box-body pad'>"
                  +"<form>"
                    +"<textarea id='editor2' name='editor2' rows='10' cols='80'>"

                    +"</textarea>"
                  +"</form>"
                +"</div>"
            
            +"</div>"
			
          +"</div>"
				  +"</div>"
				  
					
					
$("#content").html(downtimetrackerform);

	  CKEDITOR.replace('editor2');
        
$(".timepicker").timepicker({
          showInputs: false
        });
		    $(".select2").select2();

  //Datemask dd/mm/yyyy
        $("#datemask").inputmask("dd/mm/yyyy", {"placeholder": "dd/mm/yyyy"});
        //Datemask2 mm/dd/yyyy
        $("[data-mask]").inputmask();
buttons = "<button class='btn btn-default' onclick='canceldowntimetracker()'><i class='fa fa-close'></i> Cancel</button>"
+"&nbsp&nbsp"
+"<button class='btn btn-primary' onclick='adddowntimetracker()'><i class='fa fa-save'></i> Save item</button>";
$("#buttons").html(buttons);		
		
downtimetrackerheader = "<h1 class='sidebar-toggle'>"
+"Downtime Tracker - New Item"
+"</h1>"
+"<ol class='breadcrumb'>"
+"<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>"
+"<li><a href='#'>Trackers</a></li>"
+"<li><a href='#'>Downtime Tracker</a></li>"
+"<li class='active'>New Item</li>"      
+"</ol>"
$(".content-header").html(downtimetrackerheader);

}
