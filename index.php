<!DOCTYPE html>
<html>
  <head>
  <meta http-equiv="Cache-control" content="no-cache">
<meta http-equiv="Expires" content="-1">
  <?php 
session_start();
if(!isset($_SESSION['user']['username']))
{
header("Location: login.php");
}
?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>UPS | QE&A Dashboard</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="dist/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="dist/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="dist/css/AdminLTE.min.css">
	<link rel="stylesheet" href="plugins/datatables/dataTables.bootstrap.css">
    <!-- AdminLTE Skins. We have chosen the skin-blue for this starter
          page. However, you can choose any other skin. Make sure you
          apply the skin class to the body tag so the changes take effect.
    -->
    <link rel="stylesheet" href="dist/css/skins/skin-blue.min.css">
	
	<style>
	
	
.chart-legend li span{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 5px;
}

.chart-legend li {list-style-type: none;}

.bar-legend li span, .doughnut-legend li span, .line-legend li span{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 5px;
}

.doughnut-legend li,.bar-legend li,.line-legend li {list-style-type: none;}


#buttons { 
min-height:2%;
max-height:5%;
width: 100%; 
position: relative; 
bottom: 2%; 
text-align: center;

background-color: #whatever 
} 
.vertical {
    transform: rotate(-90deg);
    transform-origin: right, top;
    -ms-transform: rotate(-90deg);
    -ms-transform-origin:right, top;
    -webkit-transform: rotate(-90deg);
    -webkit-transform-origin:right, top;
    position: absolute;
    bottom: 50%;
    display: table-cell;
    vertical-align: middle;
}

</style>
	
  </head>
  
  
  
  <body class="hold-transition skin-blue sidebar-mini">
    <div class="wrapper">

      <header class="main-header">
        <!-- Logo -->
         <a href="#" onClick="window.location.reload()" class="logo">         
		  <span class="logo-mini"><b>UPS</b></span>
         <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>UPS</b> | <b>QE&A</b></span>
		  </a>

        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top" role="navigation">
          <!-- Sidebar toggle button-->
          <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
          </a>
          <!-- Navbar Right Menu -->
          <div class="navbar-custom-menu">
            
              <ul class="nav navbar-nav">
         
		 
		 <li class="dropdown user user-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                 
                  <span class="hidden-xs">Welcome <?php echo $_SESSION['user']['username']?></span>
                </a>
                <ul class="dropdown-menu">
                  <!-- User image -->
                  <li class="user-footer">
                      <a href="logout.php" >Logout</a>           
                  </li>
                </ul>
              </li>
          </ul>
          </div>
        </nav>
      </header>
      <!-- Left side column. contains the logo and sidebar -->

      <aside class="main-sidebar">

        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
          <div class="user-panel">
            <div class="pull-left image">
              <img src="user.png"  alt="User Image">
            </div>
            <div class="pull-left info">
              <p><?php echo $_SESSION['user']['username']?></p>
              <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
          </div>
          <!-- Sidebar user panel (optional) -->
          

       
	   <!-- search form (Optional) -->
<!--          <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
              <input type="text" name="q" class="form-control" placeholder="Search...">
              <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
              </span>
            </div>
          </form>-->
          <!-- /.search form -->

          <!-- Sidebar Menu -->
          <ul class="sidebar-menu">  
		  		  		   <li class="treeview">
              <a href="#"><i class="fa fa-dashboard"></i> <span>Dashboards</span> <i class="fa fa-angle-left pull-right"></i></a>
			  <ul class="treeview-menu">
			  		  
			  <?php 
			  
$con=mysqli_connect("localhost","root","","upsdashboard");

// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  
     //select groupid from users join usergroups where users.id = usergroups.userid and username ='Manigandan'
	 //select groupid from users join usergroups where users.id = usergroups.userid and username ='".$_SESSION['user']['username']."'
	 
	 
	 $admin=mysqli_query($con,"select groupid from users join usergroups where active='Y' AND users.id = usergroups.userid and username ='".$_SESSION['user']['username']."'");
	 $admin_arr=mysqli_fetch_array($admin);
	 $admin_check=$admin_arr['groupid'];
    //$result1=mysqli_query($con,"select * from dashboarddetails where id in (select dashboardid from dashboardgroups where groupid in (select groupid from users join usergroups where users.id = usergroups.userid and username ='".$_SESSION['user']['username']."'))");
		$result_acc=mysqli_query($con,"select * from dashboarddetails where projectnameid=0 And portfolio_name = 'Account Level' AND id in (select dashboardid from dashboardgroups where groupid in (select groupid from users join usergroups where active='Y' AND users.id = usergroups.userid and username ='".$_SESSION['user']['username']."'))");
   while($row_acc=mysqli_fetch_array($result_acc))
    {	
	
	echo "<li><a href='#' onclick=dashboarddataportfolio(".$row_acc['id'].",0)><i class='fa fa-circle-o'></i><i class='fa fa-angle-left pull-right'></i>".$row_acc['dashboardname']."</a><ul class='treeview-menu'><i class='fa fa-angle-left pull-right'></i>";
	
	$result=mysqli_query($con,"select * from dashboarddetails where projectnameid=0 And portfolio_name <> 'Account Level' and account_name='".$row_acc['account_name']."' AND id in (select dashboardid from dashboardgroups where groupid in (select groupid from users join usergroups where active='Y' AND users.id = usergroups.userid and username ='".$_SESSION['user']['username']."'))");
	$arr=array();
	
	while ($row=mysqli_fetch_array($result))		  
	{  
				       
		echo "<li><a href='#' onclick=dashboarddataportfolio(".$row['id'].",1)><i class='fa fa-circle-o text-green'></i><i class='fa fa-angle-left pull-right'></i>".$row['dashboardname']."</a><ul class='treeview-menu'><i class='fa fa-angle-left pull-right'></i>";
			 $result1=mysqli_query($con,"select * from dashboarddetails where portfolio_name='".$row['portfolio_name']."' AND projectnameid <> 0 and account_name='".$row_acc['account_name']."' AND id in (select dashboardid from dashboardgroups where groupid in (select groupid from users join usergroups where active='Y' AND users.id = usergroups.userid and username ='".$_SESSION['user']['username']."'))");				
			 while ($row1=mysqli_fetch_array($result1))		  
	          {  
			   echo "<li><a href='#' onclick=dashboarddata(".$row1['id'].")><i class='fa fa-circle-o text-red'></i>".$row1['dashboardname']."</a></li>";
	          }
	echo "</ul></li>";
	}	
	echo " </ul>";
    }
	echo "</li></ul>";
	echo "</li></li>";
	if($admin_check==48)
	{
	echo "<li class='treeview'>";
             echo "<a href='#'><i class='fa fa-edit'></i> <span>Admin</span> <i class='fa fa-angle-left pull-right'></i></a>";
              echo "<ul class='treeview-menu'>";
			echo "<li><a href='#' onclick='managedash()'>Manage Dashboard</a></li>";
              echo "   <li><a href='#' onclick='createproj()'>Manage Project</a></li>";
			 echo "	<li><a href='#' onclick='createusers()'>Manage User</a></li>";
				 echo "<li><a href='#' onclick='creategroups()'>Manage Group</a></li>";
			 echo "	<li><a href='#' onclick='datasyncup()'>Data sync-up</a></li>";
		
             echo "  </ul>";
           echo "  </li>";
		   
	}
	
		echo "<li class='treeview'>";
          echo "<a href='#' onclick='managesummary()'><i class='fa fa-pie-chart'></i> <span>Summary</span> <i class='fa fa- pull-right'></i></a>";
             
		echo "<ul class='treeview-menu'>";
		 echo "</ul>";
          echo "  </li>";
	
	
	
			  ?>
			  	
				
			 
              


             
            
			
			<!--   <li class="treeview">
              <a href="#"><i class="fa fa-link"></i> <span>Metrics</span> <i class="fa fa-angle-left pull-right"></i></a>
              <ul class="treeview-menu">
                <li><a href="#" onclick="defectmetrics()">Defects</a></li>
              </ul>
            </li>
			
					   <li class="treeview">
              <a href="#"><i class="fa fa-link"></i> <span>Interfaces</span> <i class="fa fa-angle-left pull-right"></i></a>
              <ul class="treeview-menu">
                <li><a href="#" onclick="defectpagedetails()">Defects</a></li>
              </ul>
            </li>-->
			
			
		<!--	<li class="header">Other Links</li>-->
    <!--        <li class="treeview">
    <!--              <a href="#"><i class="fa fa-link"></i> <span>Trackers</span> <i class="fa fa-angle-left pull-right"></i></a>
            <!--      <ul class="treeview-menu">
                    <!--<li><a href="#" onclick="buildtrackerpagedetails()">Build Tracker</a></li>
                    <!--<li><a href="#" onclick="downtimetrackerpagedetails()">Downtime Tracker</a></li>
				    <!--<li><a href="#">Schedule Tracker</a></li>
		<!--		<li><a href="#">Effort Tracker</a></li>
				    <!--<li><a href="#">Activity Tracker</a></li>-->
                  <!--</ul>
                <!--</li>
			
			
		<!--	<li class="header">Other Links</li>
          
			<li class="treeview">
              <a href="#" onclick="managesummary()"><i class="fa fa-pie-chart"></i> <span>Summary</span> <i class="fa fa-angle-left pull-right"></i></a>
             
			 <ul class="treeview-menu">-->
							
				
		<!--		<li><a href="#">Effort Tracker</a></li>
				<li><a href="#">Activity Tracker</a></li>-->
             
			 <li class="treeview">
              <a href="#"><i class="fa  fa-gear"></i> <span>Settings</span> <i class="fa fa-angle-left pull-right"></i></a>
              <ul class="treeview-menu">
				<li><a href="logout.php">Logout</a></li>
				
				
		<!--		<li><a href="#">Effort Tracker</a></li>
				<li><a href="#">Activity Tracker</a></li>-->
              </ul>
            </li>
				
           
		    
           
          </ul><!-- /.sidebar-menu -->
        </section>
        <!-- /.sidebar -->
      </aside>
      <!-- Content Wrapper. Contains page content -->
    <!-- /.content-wrapper -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
		
		
		
		
  <section class="content-header">
          
        </section>
		<section class="standard-values">
		
		</section>
        <!-- Main content -->
        <section class="content">

<div id="content">


<div class="col-md-6">
              <div class="box box-solid">
                <div class="box-header with-border">
                  <h3 class="box-title">QE&A Accounts</h3>
                </div><!-- /.box-header -->
                <div class="box-body">
                  <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                      <li data-target="#carousel-example-generic" data-slide-to="0" class=""></li>
                      <li data-target="#carousel-example-generic" data-slide-to="1" class=""></li>
                      <li data-target="#carousel-example-generic" data-slide-to="2" class="active"></li>
                    </ol>
                    <div class="carousel-inner">
                      <div class="item">
                        <img src="cognizant.jpg" alt="First slide">
                       
                      </div>
                      <div class="item">
                        <img src="ups_logo11.jpg" alt="Second slide">
                        
                      </div>
                      <div class="item active">
                        <img src="cognizant.jpg" alt="Third slide">
                       
                      </div>
                    </div>
                    <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                      <span class="fa fa-angle-left"></span>
                    </a>
                    <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
                      <span class="fa fa-angle-right"></span>
                    </a>
                  </div>
                </div><!-- /.box-body -->
              </div><!-- /.box -->
            </div>
			</div>


<div id="buttons">

</div>
<div class="modal" id="myModal" data-backdrop="static">
	<div class="modal-dialog" style ="position:absolute;left:35%;top:25%;width:30%;">
      <div class="modal-content">
        <div class="modal-header" style ="background-color:#3c8dbc";>
          
             <h4 class="modal-title" id="myModalLabel" style="color:#ffffff;"></h4>
        </div><div class="container"></div>
        <div class="modal-body" id="myModalbody">
         
   
        </div>
		<div class="modal-footer" id="myModalfooter">
          
        </div>
      </div>
    </div>
</div>

        </section><!-- /.content -->
      </div>
      <footer class="main-footer">
        <!-- To the right -->
        <div class="pull-right hidden-xs">
          Tag line
        </div>
        <!-- Default to the left -->
	<strong>Copyright &copy; 2015 <a href="#">Cognizant Technology Solutions</a>.</strong> All rights reserved.
	 
	</footer>

     <!-- /.control-sidebar -->
      <!-- Add the sidebar's background. This div must be placed
           immediately after the control sidebar -->
  

    </div><!-- ./wrapper -->
  <script src="plugins/jQuery/jQuery-2.1.4.min.js"></script>
    <!-- Bootstrap 3.3.5 -->
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <!-- AdminLTE App -->
    <script src="dist/js/app.min.js"></script>
	<!-- Page App -->
<script src="plugins/timepicker/bootstrap-timepicker.min.js"></script>
<link href="plugins/timepicker/bootstrap-timepicker.min.css" rel="stylesheet">
<script src="plugins/select2/select2.full.min.js"></script>
    <link rel="stylesheet" href="plugins/select2/select2.min.css">
	<script src="dist/js/pages/Interfaces-Defects/defects.js"></script>
	<script src="dist/js/pages/Trackers-Build_Tracker/Build_Tracker.js"></script>
	<script src="dist/js/pages/Trackers-Downtime_Tracker/Downtime_Tracker.js"></script>
	<script src="dist/js/pages/Metrics-Defects/defectmetrics.js"></script>
	<script src="dist/js/pages/Admin-Manage_Dashboards/Manage_Dashboards.js"></script>
	<script src="dist/js/pages/Admin-Create_Projects/Create_Projects.js"></script>
  	<script src="dist/js/pages/Admin-Manage_Users/Manage_Users.js"></script>
	<script src="dist/js/pages/Admin-Manage_Groups/Manage_Groups.js"></script>
	<script src="dist/js/pages/Admin-Manage_DataSync-up/DataSync-up.js"></script>
  <script src="dist/lib/keen-js/dist/keen.min.js"></script>
  <script src="dist/js/meta.js"></script>
  
  <script src="dist/js/justgage.js"></script>
  <script src="dist/js/raphael-2.1.4.min.js"></script>
<link rel="stylesheet" href="dist/css/keen-dashboards.css">

	  <script src="plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="plugins/datatables/dataTables.bootstrap.min.js"></script>
<script src="plugins/input-mask/jquery.inputmask.js"></script>
<script src="plugins/input-mask/jquery.inputmask.date.extensions.js"></script>
<script src="plugins/input-mask/jquery.inputmask.extensions.js"></script>
 <script src="plugins/chartjs/Chart.min.js"></script>
<script src="plugins/ckeditor/ckeditor.js"></script>

<script src="dist/js/Chart.StackedBar.js"></script> 
<link rel="stylesheet" href="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">
  </body>
</html>
