<!DOCTYPE html>
<html lang="en">
<head>
	<title>Bootstrap Case</title>
  	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">  
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script> 
	<script src="http://malsup.github.com/jquery.form.js" ></script>
	<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">  
	<script src="js/script.js"></script>
	<link rel="stylesheet" href="css/style.css"></link>
</head>  
<body class="body-dashboard">	
	<div id="div-dashboard-top"> 
		<nav class="navbar navbar-default navbar-fixed-top">
			<div class="container-fluid">
				<div id="div-company-logo" class="navbar-header" >
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#profile-box">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>			  
					<a class="navbar-brand" href="#" style="float:left;">Pk Agencies</a>
				</div>
				
				<div id="div-alert-box" class="div-notification-navbar">
					<p class="navbar-text">Notifications<a href="#" class="navbar-link">NO.1</a></p>
				</div>
				
				<div id="div-profile-box" class="collapse navbar-collapse">			  
					<ul class="nav navbar-nav navbar-right">        
						<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Welcome <span id="span-username-navbar"></span><span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li><a href="#">Setting 1</a></li>
								<li><a href="#">Setting 2</a></li>
								<li><a id="navbar-logout"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
						  	</ul>
						</li>  
				  	</ul>
				</div>
			</div>
		</nav>
	</div>	
	<div id="div-sidemenu">
		<nav class='sidebar sidebar-menu-collapsed'>
			<div id="div-toggle-button-sidemenu" class="cl-div-toggle-button-sidebar" title='Move Sidebar'>						
	  			<a id='a-toggle-button-sidebar'>
					<span class='glyphicon glyphicon-chevron-right span-sidemenu-menuitem-icon'></span>
				</a>
			</div>
	      	<ul>
				<li class="active">
					<div class="div-sidemenu-menuitem">															
						<a class='expandable' href='#subMenuUser' id="a-dashboard-user-sidebar" data-toggle="collapse" title='User'>									
							<span class='span-sidemenu-menuitem-text'>User</span>
							<span class='glyphicon glyphicon-user collapsed-element span-sidemenu-menuitem-icon'></span>
						</a>
					</div>
				</li>
				<li style="margin-top:2px;">
					<div id="subMenuUser" class="div-sidemenu-menuitem submenus-user collapse">															
						<a class='expandable div-sidemenu-submenu-menuitem' href='#div-user-management-page' id="a-dashboard-user-sidebar" data-toggle="tab" title='User'>									
							<span class='span-sidemenu-menuitem-text'>User 
								<span class='glyphicon glyphicon-user collapsed-element span-sidemenu-menuitem-icon'></span>
							Management</span>																			
						</a>
						<a class='expandable div-sidemenu-submenu-menuitem' href='#div-user-categories-page' id="a-dashboard-user-sidebar" data-toggle="tab" title='User'>									
							<span class='span-sidemenu-menuitem-text'>User 
								<span class='glyphicon glyphicon-user collapsed-element span-sidemenu-menuitem-icon'></span>
							Categories</span>
						</a>
					</div>
				</li>
				<li>
					<div class="div-sidemenu-menuitem">
						<a class='expandable' href='#div-inventory-page' id="a-dashboard-inventory-sidebar"  data-toggle="tab"title='Inventory'>									
							<span class='span-sidemenu-menuitem-text'>Inventory</span>
							<span class='glyphicon glyphicon-cog collapsed-element span-sidemenu-menuitem-icon'></span>
						</a>
					</div>
				</li>
				<li>
					<div class="div-sidemenu-menuitem">			
						<a class='expandable' href='#div-order-page' id="a-dashboard-order-sidebar" data-toggle="tab" title='order'>									
							<span class='span-sidemenu-menuitem-text'>Order</span>
							<span class='glyphicon glyphicon-gift collapsed-element span-sidemenu-menuitem-icon'></span>
						</a>
					</div>
				</li>								
	      	</ul>
	    </nav>
	</div>
	
	<div id="div-dashboard-content">
		<div id="div-page-content" class="container-fluid row">
		 	<div class="col-md-12 col-sm-12 col-xs-12 tab-content">
				<div id="div-user-management-page" class="tab-pane">
					<jsp:include page="user_management.jsp"/>
				</div>
				<div id="div-user-categories-page" class="tab-pane">
					<jsp:include page="user_category.jsp"/>
				</div>					
									
			</div> 
		</div>
	</div>	
	</body>
</html>