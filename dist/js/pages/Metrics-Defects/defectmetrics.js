function defectmetrics(){

defectpagedetails = "<div id='container' style='min-width: 310px; height: 400px; margin: 0 auto'></div>"
+"<br>"
+"Chart title:"
+"<input type='text' id='chart_title' value='Chart Title'>"
+"<input type='button' id='change_chart_title' value='Change'>";

$("#content").html(defectpagedetails);	

 
//	var data = JSON.parse(data);
	
    /*var data = [
                      ['Firefox', 42.0],
                      ['IE', 26.8],
                      ['Chrome',14.8],
                      ['Safari', 6.5],
                      ['Opera', 8.2],
                      ['Others', 0.7]
                  ];
             datalist = data;*/
 
function RenderPieChart(elementId, dataList) {
                new Highcharts.Chart({
                    chart: {
                        renderTo: elementId,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    }, title: {
                        text: 'Browser market shares at a specific website, 2010'
                    },
                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
                        }
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                color: '#000000',
                                connectorColor: '#000000',
                                formatter: function () {
                                    return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Browser share',
                        data: dataList
                    }]
                });
            };
	
	
defectpageheader = "<h1>";
defectpageheader = defectpageheader.concat("Defects Metrics");
defectpageheader = defectpageheader.concat("<small></small>");
defectpageheader = defectpageheader.concat("</h1>");
defectpageheader = defectpageheader.concat("<ol class='breadcrumb'>");
defectpageheader = defectpageheader.concat("<li><a href='#'><i class='fa fa-dashboard'></i> Home</a></li>");
defectpageheader = defectpageheader.concat("<li><a href='#'>Metrics</a></li>");
defectpageheader = defectpageheader.concat("<li class='active'>Defects</li>");          
defectpageheader = defectpageheader.concat("</ol>");
$(".content-header").html(defectpageheader);

$.get("dist/php/defectmetrics.php", function(data, status){
      var mydata = JSON.parse(data);
      
			
			
        });

}