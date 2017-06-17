
<!DOCTYPE html>
<!--
This is a starter template page. Use this page to start your new project from
scratch. This page gets rid of all links and provides the needed markup only.

-->
<html>
  <head>
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
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    -->
	<!--[endif]-->
  </head>
  <!--
  BODY TAG OPTIONS:
  =================
  Apply one or more of the following classes to get the
  desired effect
  |---------------------------------------------------------|
  | SKINS         | skin-blue                               |
  |               | skin-black                              |
  |               | skin-purple                             |
  |               | skin-yellow                             |
  |               | skin-red                                |
  |               | skin-green                              |
  |---------------------------------------------------------|
  |LAYOUT OPTIONS | fixed                                   |
  |               | layout-boxed                            |
  |               | layout-top-nav                          |
  |               | sidebar-collapse                        |
  |               | sidebar-mini                            |
  |---------------------------------------------------------|
  -->
  <body class="hold-transition skin-blue sidebar-mini" onload="access()">
    <div class="wrapper">

      <!-- Main Header -->
      <header class="main-header">

        <!-- Logo -->
        <a href="#" class="logo">
          <!-- mini logo for sidebar mini 50x50 pixels -->
          <span class="logo-mini"><b>UPS</b></span>
          <!-- logo for regular state and mobile devices -->
          <span class="logo-lg"><b>UPS</b> | <b>QE&A</b></span>
        </a>

        <!-- Header Navbar -->
        <nav class="navbar navbar-static-top" role="navigation">
          <!-- Sidebar toggle button-->
          <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
          </a>
		 
          <!-- Navbar Right Menu -->
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
            

              <!-- User Account Menu -->
              <li class="dropdown user user-menu">
                <!-- Menu Toggle Button -->
                <a href="#">
                  <!-- The user image in the navbar-->
               <!--   <img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image">-->
                  <!-- hidden-xs hides the username on small devices so only the image appears. -->
                  <span class="hidden-xs"><?php echo $_SESSION['user']['username']?></span>
                </a>
                <ul class="dropdown-menu">
                  <!-- The user image in the menu -->
                  <li class="user-header">
              <!--      <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">-->
                    <p>
<?php echo $_SESSION['user']['username']; print_r($_SESSION['arr'])?>
                    
					
					</p>
                  </li>
  
                  <!-- Menu Footer-->
                  <li class="user-footer">
                    <div class="pull-left">
                      <a href="#" class="btn btn-default btn-flat">Profile</a>
                    </div>
                    <div class="pull-right">
                      <a href="#" class="btn btn-default btn-flat">Sign out</a>
                    </div>
                  </li>
                </ul>
              </li>
              <!-- Control Sidebar Toggle Button -->
      <!--        <li>
                <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
              </li>
          -->  </ul>
          </div>
        </nav>
      </header>
      <!-- Left side column. contains the logo and sidebar -->
      <aside class="main-sidebar">

        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">

          <!-- Sidebar user panel (optional) -->
          <div class="user-panel">
         <!--   <div class="pull-left image">
     <!--         <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">-->
            <!--</div>
           <!-- <div class="pull-left info">
              <p><?php echo $_SESSION['user']['username']?></p>
         
            </div>-->
          </div>

       
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
              <a href="#"><i class="fa fa-link"></i> <span>Dashboards</span> <i class="fa fa-angle-left pull-right"></i></a>
			  <ul class="treeview-menu">
			  <?php 
			  
$con=mysqli_connect("localhost","UPSDASHBOARD","BPAVSuctKJMtEV7G","upsdashboard");

// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
$result=mysqli_query($con,"select * from dashboarddetails where id in (select dashboardid from dashboardgroups where groupid in (select groupid from users join usergroups where users.id = usergroups.userid and username ='".$_SESSION['user']['username']."'))");
	$arr=array();
	
	while ($row=mysqli_fetch_array($result))		  
	{
                echo "<li><a href='#' onclick=dashboarddata(".$row['id'].")>".$row['dashboardname']."</a></li>";
	}
			  ?>
              

              </ul>
            </li>
			
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
			
			
		<!--	<li class="header">Other Links</li>-->
            <li class="treeview">
              <a href="#"><i class="fa fa-link"></i> <span>Admin</span> <i class="fa fa-angle-left pull-right"></i></a>
              <ul class="treeview-menu">
				<li><a href="#" onclick="managedash()">Manage Dashboard</a></li>
                <li><a href="#" onclick="createproj()">Manage Project</a></li>
				<li><a href="#" onclick="createusers()">Manage User</a></li>
				<li><a href="#" onclick="creategroups()">Manage Group</a></li>
				<li><a href="#" onclick="datasyncup()">Data sync-up</a></li>
		<!--		<li><a href="#">Effort Tracker</a></li>
				<li><a href="#">Activity Tracker</a></li>-->
              </ul>
            </li>
			
			 <li class="treeview">
              <a href="#"><i class="fa fa-link"></i> <span>Settings</span> <i class="fa fa-angle-left pull-right"></i></a>
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
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
  <section class="content-header">
          
        </section>
        <!-- Main content -->
        <section class="content">

<div id="content">

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
      </div><!-- /.content-wrapper -->

      <!-- Main Footer -->
      <footer class="main-footer">
        <!-- To the right -->
        <div class="pull-right hidden-xs">
          Tag line
        </div>
        <!-- Default to the left -->
	<strong>Copyright &copy; 2015 <a href="#">Cognizant Technology Solutions</a>.</strong> All rights reserved.
	</footer>

      <!-- Control Sidebar -->
      <aside class="control-sidebar control-sidebar-dark">
        <!-- Create the tabs -->
        <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
          <li class="active"><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
          <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <!-- Home tab content -->
          <div class="tab-pane active" id="control-sidebar-home-tab">
            <h3 class="control-sidebar-heading">Recent Activity</h3>
            <ul class="control-sidebar-menu">
              <li>
                <a href="javascript::;">
                  <i class="menu-icon fa fa-birthday-cake bg-red"></i>
                  <div class="menu-info">
                    <h4 class="control-sidebar-subheading">Langdon's Birthday</h4>
                    <p>Will be 23 on April 24th</p>
                  </div>
                </a>
              </li>
            </ul><!-- /.control-sidebar-menu -->

            <h3 class="control-sidebar-heading">Tasks Progress</h3>
            <ul class="control-sidebar-menu">
              <li>
                <a href="javascript::;">
                  <h4 class="control-sidebar-subheading">
                    Custom Template Design
                    <span class="label label-danger pull-right">70%</span>
                  </h4>
                  <div class="progress progress-xxs">
                    <div class="progress-bar progress-bar-danger" style="width: 70%"></div>
                  </div>
                </a>
              </li>
            </ul><!-- /.control-sidebar-menu -->

          </div><!-- /.tab-pane -->
          <!-- Stats tab content -->
          <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div><!-- /.tab-pane -->
          <!-- Settings tab content -->
          <div class="tab-pane" id="control-sidebar-settings-tab">
            <form method="post">
              <h3 class="control-sidebar-heading">General Settings</h3>
              <div class="form-group">
                <label class="control-sidebar-subheading">
                  Report panel usage
                  <input type="checkbox" class="pull-right" checked>
                </label>
                <p>
                  Some information about this general settings option
                </p>
              </div><!-- /.form-group -->
            </form>
          </div><!-- /.tab-pane -->
        </div>
      </aside><!-- /.control-sidebar -->
      <!-- Add the sidebar's background. This div must be placed
           immediately after the control sidebar -->
      <div class="control-sidebar-bg"></div>
    </div><!-- ./wrapper -->

    <!-- REQUIRED JS SCRIPTS -->

    <!-- jQuery 2.1.4 -->
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
<link rel="stylesheet" href="dist/css/keen-static.css">
	  <script src="plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="plugins/datatables/dataTables.bootstrap.min.js"></script>
<script src="plugins/input-mask/jquery.inputmask.js"></script>
<script src="plugins/input-mask/jquery.inputmask.date.extensions.js"></script>
<script src="plugins/input-mask/jquery.inputmask.extensions.js"></script>
 <script src="plugins/chartjs/Chart.min.js"></script>
<script src="plugins/ckeditor/ckeditor.js"></script>

<script src="dist/js/Chart.StackedBar.js"></script> 
<link rel="stylesheet" href="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">


    <!-- Optionally, you can add Slimscroll and FastClick plugins.
         Both of these plugins are recommended to enhance the
         user experience. Slimscroll is required when using the
         fixed layout. -->
  </body>
</html>
<script>
function access()
{
$.ajax({
  method: "POST",
  url: "dist/php/starterpage.php?action=create"
})
.done(function( data ) {
	sessionStorage.setItem("access",data);
});	
}
</script>