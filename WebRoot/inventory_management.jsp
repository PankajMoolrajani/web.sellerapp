<div id="div-inventory" class="container-fluid">
<br/><br/>		
	<div id="div-inventory-create" class="row">
		<div class="col-sm-12 col-md-12 col-xs-12">
			<div id="div-btn-inventory-create" class="row">		
				<div class="col-sm-12 col-md-12 col-xs-12 ">										  	
					<button type="button" id="btn-inventory-create" class="btn btn-primary btn-block"> <!-- changed the id to btn-create-usercat-form -->
				  		Create Inventory
					</button>		     			
				</div>													
			</div>		
			<div id="div-form-inventory-create" class="row">
				<div class="col-xs-12 col-md-12 col-sm-12">
					<jsp:include page="form_inventory_create.jsp"/>
				</div>					
			</div>	
		</div>			
	</div>		
	
	<div id="div-inventory-browse" class="row"> 
		<div class="col-sm-12 col-md-12 col-xs-12">
			<div id="div-inventory-table" class="row">
				<div class="col-sm-12 col-md-12 col-xs-12">
					<br/><br/>								
					<table class="table table-striped table-hover table-condensed ">
						<thead id="thead-table-inventory">  <!-- made changes in id -->
					    	<tr><th>Select</th><th>User Id</th><th>Username</th><th>EmailID</th><th>Phone</th></tr>
					    	<!--  Here table header names will be shown according to the screen size -->					      						
						</thead>
						<tbody id="tbody-table-inventory">
					    	<tr><td><input type='checkbox' value=""></input>
				    		</td><td>1</td><td>Amit</td><td>amit.sharma@monoxor.com</td><td>9549554645</td></tr>							    							
						</tbody> <!-- made changes in id -->						
					</table>
				</div>					
			</div>						
		</div>
	</div>	
</div>