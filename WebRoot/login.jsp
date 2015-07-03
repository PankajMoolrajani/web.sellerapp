<!DOCTYPE html>
<html lang="en">
<head>	
    <link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
  	<script src="js/script.js"></script>   
</head>
<body>	
	<div class="container">
		<div id="div-login-page-title" class="row">
			<div class="col-xs-8 col-sm-6 col-md-4 col-xs-offset-2 col-sm-offset-3 col-md-offset-4 ">
				<h1 class="text-center login-title">Single Sign On Authentication - Sellers App</h1>
			</div>
		</div>
		
		<div id="div-login-box" class="row">
			<div class="col-xs-8 col-sm-6 col-md-4 col-xs-offset-2 col-sm-offset-3 col-md-offset-4">				
				<br>									
					<div id="div-login-pic">
		            	<img class="profile-img" src="pictures/blank_login.png" height="120px" width="120px">
					</div>		             
			        <div id="div-status-login"> 
		                    
		            </div>							    
					<br>       
			    	<div id="div-login-username">
			    		<input type="text" id="input-text-login-username" class="form-control" placeholder="Username" required autofocus>
			    	</div>
			    	<div id="div-login-password">
			        	<input type="password"  id="input-text-login-password" class="form-control" placeholder="Password" required>
			        </div>
			        <br>
			        <div>
			        	<button class="btn btn-lg btn-primary btn-block" id="btn-submit-login-form" type="submit">Login</button>
			        </div>		                                 
				</div>
	    	</div>
		</div>
	</body>
</html>