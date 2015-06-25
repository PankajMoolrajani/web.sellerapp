<html>
<head>
<title>dashboard page</title>
	  	
<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	  	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">  
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
  	  	<script src="http://malsup.github.com/jquery.form.js" ></script>
  	  	<script src="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/js/bootstrap-datepicker.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.7.2/js/bootstrap-select.js"></script>  	  	
		<script src="js/script.js" ></script>
		
	  	<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">  		  
		<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/css/datepicker.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.7.2/css/bootstrap-select.css">
		<link href="css/style.css" rel="stylesheet">				
</head>

<body class="body-dashboard">
	<nav class="navbar navbar-default navbar-fixed-top">
		<div class="container-fluid">
			<div id="div-company-logo" class="navbar-header" >
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#div-profile-box">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>			  
				<a class="navbar-brand" href="#">Pk Agencies</a>
			</div>
			<div id="div-alert-box-small-screen">
				<p class='navbar-text'>Notification</p>
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

<div>
	<nav class='sidebar sidebar-menu-collapsed'>
	 <ul id="nav" class="nav nav-list bs-docs-sidenav sidebar">
		<li id="li-sidemenu-menuitem-toggle">
			<div class="parent div-sidemenu-menuitem">
				<a class='expandable' id='a-toggle-button-sidebar'>
					<span class='span-sidemenu-menuitem-text'>Move Bar</span>
					<span class='glyphicon glyphicon-chevron-right span-sidemenu-menuitem-icon'></span>
				</a>
			</div>
		</li>	 	
		<li>
			<div class="parent div-sidemenu-menuitem">
				<a class='expandable' href="#">
					<span class='span-sidemenu-menuitem-text'>User</span>
					<span class='glyphicon glyphicon-user collapsed-element span-sidemenu-menuitem-icon'></span>
				</a>
			</div>
			<ul class="bs-docs-sidenav" style="display:none">
				<li>
					<div class="div-sidemenu-menuitem">
						<a class='expandable' id="a-sidemenu-item-user-management" href="#div-user-management-page" data-toggle="tab">
							<span class='span-sidemenu-menuitem-text'>User-Management</span>
							<span class='glyphicon glyphicon-pencil collapsed-element span-sidemenu-menuitem-icon'></span>
						</a>
					</div>				
				</li>
				<li>
					<div class="div-sidemenu-menuitem">
						<a class='expandable' id="a-sidemenu-item-user-category" href="#div-user-categories-page" data-toggle="tab">
							<span class='span-sidemenu-menuitem-text'>User-Category</span>
							<span class='glyphicon glyphicon-user collapsed-element span-sidemenu-menuitem-icon'></span>
						</a>
					</div>	
				</li>
			</ul>
		</li>
		<li>
			<div class="parent div-sidemenu-menuitem">
				<a class='expandable' href="#">
					<span class='span-sidemenu-menuitem-text'>Inventory</span>
					<span class='glyphicon glyphicon-gift collapsed-element span-sidemenu-menuitem-icon'></span>
				</a>
			</div>
			<ul class="bs-docs-sidenav" style="display:none">
				<li>
					<div class="div-sidemenu-menuitem">
						<a class='expandable' id="a-sidemenu-item-inventory" href="#div-inventory-management-page" data-toggle="tab">
							<span class='span-sidemenu-menuitem-text'>Management</span>
							<span class='glyphicon glyphicon-pencil collapsed-element span-sidemenu-menuitem-icon'></span>
						</a>
					</div>				
				</li>
				<li>
					<div class="div-sidemenu-menuitem">
						<a class='expandable' id="" href="#" data-toggle="tab">
							<span class='span-sidemenu-menuitem-text'>Bulk Upload</span>
							<span class='glyphicon glyphicon-upload collapsed-element span-sidemenu-menuitem-icon'></span>
						</a>
					</div>	
				</li>
			</ul>
		</li>

		<li>
			<div class="parent div-sidemenu-menuitem">
				<a class='expandable' href="#">
					<span class='span-sidemenu-menuitem-text'>Order</span>
					<span class='glyphicon glyphicon glyphicon-record collapsed-element span-sidemenu-menuitem-icon'></span>
				</a>
			</div>
			<ul class="bs-docs-sidenav" style="display:none">
				<li>
					<div class="div-sidemenu-menuitem">
						<a class='expandable' id="a-sidemenu-item-order" href="#div-order-management-page" data-toggle="tab">
							<span class='span-sidemenu-menuitem-text'>Management</span>
							<span class='glyphicon glyphicon-pencil collapsed-element span-sidemenu-menuitem-icon'></span>
						</a>
					</div>				
				</li>
				<li>
					<div class="div-sidemenu-menuitem">
						<a class='expandable' href="#" data-toggle="tab">
							<span class='span-sidemenu-menuitem-text'>Bulk Upload</span>
							<span class='glyphicon glyphicon-upload collapsed-element span-sidemenu-menuitem-icon'></span>
						</a>
					</div>	
				</li>
			</ul>
		</li>
		<li>
			<div class="parent div-sidemenu-menuitem">
				<a class='expandable' href="#">
					<span class='span-sidemenu-menuitem-text'>Accounts</span>
					<span class='glyphicon glyphicon-cog collapsed-element span-sidemenu-menuitem-icon'></span>
				</a>
			</div>
			<ul class="bs-docs-sidenav" style="display:none">
				<li>
					<div class="div-sidemenu-menuitem">
						<a class='expandable' href="#div-invoice-management-page" data-toggle="tab">
							<span class='span-sidemenu-menuitem-text'>Management</span>
							<span class='glyphicon glyphicon-pencil collapsed-element span-sidemenu-menuitem-icon'></span>
						</a>
					</div>				
				</li>
				<li>
					<div class="div-sidemenu-menuitem">
						<a class='expandable' href="#div-accounts-management-page" data-toggle="tab">
							<span class='span-sidemenu-menuitem-text'>Bulk Upload</span>
							<span class='glyphicon glyphicon-upload collapsed-element span-sidemenu-menuitem-icon'></span>
						</a>
					</div>				
				</li>
				
			</ul>
		</li>
	
		</ul>
	</nav>   
</div>

	<div id="div-dashboard-content" class="container-fluid">
		<div id="div-page-content" class="row">
		 	<div class="col-md-12 col-sm-12 col-xs-12 tab-content">
				<div id="div-user-management-page" class="tab-pane active">
					<jsp:include page="user_management.jsp"/>
				</div>
				<div id="div-user-categories-page" class="tab-pane">
					<jsp:include page="user_category.jsp"/>
				</div>
				<div id="div-inventory-management-page" class="tab-pane">
					<jsp:include page="inventory_management.jsp"/>
				</div>	
				<div id="div-order-management-page" class="tab-pane">
					<jsp:include page="order_management.jsp"></jsp:include>
				</div>
				<div id="div-invoice-management-page" class="tab-pane">
					<jsp:include page="invoice_management.jsp"></jsp:include>
				</div>												
			</div> 
		</div>
	</div>

</body>

</html>