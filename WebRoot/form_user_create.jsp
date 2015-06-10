<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <body>  
  	  		
		<div id="div-create-user-heading" class="row">
			<div class="col-md-4 col-md-offset-4 page-header">
				<center><h1>User Form</h1></center>
			</div>						
		</div>
		<div id="div-form-user-fname-lname-category" class="row">
			<div id="div-form-user-fname" class="form-group col-sm-6 col-md-4 col-xs-12">
				<label class="control-label" for="inputWarning1">First Name</label>
		  		<input type="text" id="input-form-user-fname" class="form-control val-empty" >
			</div>
			<div id="div-form-user-lname" class="form-group col-sm-6 col-md-4 col-xs-12">
				<label class="control-label" for="inputWarning1">Last Name</label>
		  		<input type="text" id="input-form-user-lname" class="form-control val-empty">
			</div>	
			<div id="div-form-user-category" class="form-group col-sm-12 col-md-4 col-xs-12">
			  	<label for="sel1">Category</label>
				<select id="select-form-user-category" class="form-control val-empty" >
					<option>Select Category</option>
					<%
//						Connection con = DbConnection.getConnection();
//						PreparedStatement ps = con.prepareStatement("select id,name from user_category");
//						ResultSet rs = ps.executeQuery();
//						while(rs.next())
//						{																
					%>
							<option value="<%="(rs.getInt(1))"%>"><%="(rs.getString(2))"%></option>
					<%
//						}
					%>	        						        
				</select>							   
			</div>			
		</div>
		<div id="div-form-user-phone-email" class="row">
			<div id="div-form-user-phone" class="form-group col-sm-6 col-md-6 col-xs-12">
				<label class="control-label" for="inputWarning1">Phone number</label>
	  			<input type="text" id="input-form-user-phone" class="form-control val-empty">
			</div>
			<div id="div-form-user-email" class="form-group col-sm-6 col-md-6 col-xs-12">
				<label class="control-label" for="inputWarning1">Email ID</label>
	  			<input type="text" id="input-form-user-email" class="form-control val-empty">
			</div>				
		</div>								
		<div id="div-form-user-add1-add2" class="row">
			<div id="div-form-user-add1" class="form-group col-sm-6 col-md-6 col-xs-12">
				<label class="control-label" for="inputWarning1">Address Line 1</label>
			  	<input type="text" id="input-form-user-add1" class="form-control val-empty">
			</div>
			<div id="div-form-user-add2" class="form-group col-sm-6 col-md-6 col-xs-12">
				<label class="control-label" for="inputWarning1">Address Line 2</label>
			  	<input type="text" id="input-form-user-add2" class="form-control val-empty">
			</div>
		</div>					      	
		<div id="div-form-user-city-state-zip" class="row">
			<div id="div-form-user-city" class="form-group col-sm-4">
				<label class="control-label" for="inputWarning1">City</label>
			  	<input type="text" id="input-form-user-city" class="form-control val-empty">
			</div>
			<div id="div-form-user-state" class="form-group col-sm-4">
				<label class="control-label" for="inputWarning1">State</label>
			  	<input type="text" id="input-form-user-state" class="form-control val-empty">
			</div>
			<div id="div-form-user-zip" class="form-group col-sm-4">
				<label class="control-label" for="inputWarning1">Zip Code</label>
			  	<input type="text" id="input-form-user-zip" class="form-control val-empty">
			</div>			
		</div>
		<div id="div-form-user-submit" class="row">
			<div class="form-group col-sm-12 col-md-12 col-xs-12">
				<div class="col-sm-5 col-md-5 col-xs-2"></div>
				<button type="button" id="btn-form-user-submit" class="btn btn-primary">Create User</button>				
			</div>
		</div>
	<script>
		$(document).ready(function(){
			userCreateFormVal();    		
		});
	</script>
		
  </body> 	
</html>