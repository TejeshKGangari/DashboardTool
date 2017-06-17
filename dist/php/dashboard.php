<?php  
 $connect = mysqli_connect("localhost", "root", "", "upsdashboard");  
 $query = "SELECT status, count(*) as count FROM `qctestinstances` group by status";  
 $query1 = "SELECT status, count(*) as count From tfsdefects group by status";
 $result = mysqli_query($connect, $query); 
 $result1 = mysqli_query($connect, $query1); 
 //print_r($result);
 ?>  
 <!DOCTYPE html>  
 <html>  
      <head>  
          
           <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>  
           <script type="text/javascript">  
           google.charts.load('current', {'packages':['corechart']});  
           google.charts.setOnLoadCallback(drawpieChart);  
		   google.charts.setOnLoadCallback(drawbarChart);  
           function drawpieChart()  
           {  
                var data = google.visualization.arrayToDataTable([  
                          ['Status', 'Count'],  
                          <?php  
                          while($row = mysqli_fetch_array($result))  
                          {  
                               echo "['".$row["status"]."', ".$row["count"]."],";  
                          }  
                          ?>  
                     ]);  
                var options = {  
                      title: 'Percentage of Male and Female Employee',  
                      //is3D:true,  
                      pieHole: 0.4  
                     };  
                var chart = new google.visualization.PieChart(document.getElementById('piechart'));  
                chart.draw(data, options);  
		   }

			function drawbarChart()
			{
				var data1 = google.visualization.arrayToDataTable([
							['Status', 'Count'],
							<?php
							while($row1 = mysqli_fetch_array($result1))
							{
								echo "['".$row1["status"]."', ".$row1["count"]."],";
							}	
							?>
							]);
				var options1 = {  
                      title: 'Percentage of Male and Female Employee',  
                      //is3D:true,  
                      pieHole: 0.4  
                     }; 
				var chart1 = new google.visualization.PieChart(document.getElementById('barchart'));
				chart1.draw(data1,options1);
				
           }

           </script>  
      </head>  
      <body>  
           <br /><br />  
           <div style="width:900px;">  
                <h3 align="center">Test Execution Status</h3>  
                <br />  
                <div id="piechart" style="width: 450px; height: 250px;"></div>  
           </div>  
		              <div style="width:900px;">  
                <h3 align="center">Defects By Status</h3>  
                <br />  
                <div id="barChart" style="width: 450px; height: 250px;"></div>  
           </div> 
      </body>  
 </html>  