function defectpagedetails(){
defectpagedetails = " <div class='box-body'>";
defectpagedetails = defectpagedetails.concat(" <table id='example1' class='table table-bordered table-striped'>");
defectpagedetails = defectpagedetails.concat("<thead>");
defectpagedetails = defectpagedetails.concat("<tr>");
defectpagedetails = defectpagedetails.concat("<th>Defect ID</th>");
defectpagedetails = defectpagedetails.concat("<th>Description</th>");
defectpagedetails = defectpagedetails.concat("<th>Severity</th>");
defectpagedetails = defectpagedetails.concat("<th>Priority</th>");
defectpagedetails = defectpagedetails.concat("<th>Status</th>");
defectpagedetails = defectpagedetails.concat("</tr>");
defectpagedetails = defectpagedetails.concat("</thead>");
defectpagedetails = defectpagedetails.concat("<tbody>");
defectpagedetails = defectpagedetails.concat("</tbody>");
defectpagedetails = defectpagedetails.concat("</table>");
defectpagedetails = defectpagedetails.concat("</div>");
$(".content").html(defectpagedetails);
$("#example1").DataTable();

defectpageheader = "<h1>";
defectpageheader = defectpageheader.concat("Defects Summary");
defectpageheader = defectpageheader.concat("<small>Defect details fetched from TFS</small>");
defectpageheader = defectpageheader.concat("</h1>");
defectpageheader = defectpageheader.concat("<ol class='breadcrumb'>");
defectpageheader = defectpageheader.concat("<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>");
defectpageheader = defectpageheader.concat("<li><a href='#'>Interfaces</a></li>");
defectpageheader = defectpageheader.concat("<li class='active'>Defects</li>");          
defectpageheader = defectpageheader.concat("</ol>");
$(".content-header").html(defectpageheader);
}