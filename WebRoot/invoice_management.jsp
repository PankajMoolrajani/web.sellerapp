 <div id="div-invoice" class="container-fluid">
 	<br/><br/>	
	<div id="div-invoice-create" class="row">	
		<div class="col-sm-12 col-md-12 col-xs-12">
			<div id="div-btn-invoice-create" class="row">
				<div class="col-sm-12 col-md-12 col-xs-12 ">									  	
					<button type="button" id="btn-invoice-create" class="btn btn-primary btn-block" >  <!-- changed the id to btn-create-user-form -->
						Create Invoice
					</button>	     			
				</div>				
			</div>			
			<div id="div-form-invoice-create" class="row">
				<div class="col-xs-12 col-md-12 col-sm-12">				
					<jsp:include page="form_invoice_create.jsp"/>								
				</div>
			</div>				
		</div>				
	</div>
			
	<div id="div-invoice-browse" class="row">			
	<br/><br/>			
		<div class="col-sm-12 col-md-12 col-xs-12" >
			<div id="div-user-search" class="row">										
				<div class="col-md-3 col-sm-4 col-xs-10 col-md-offset-8 col-sm-offset-7 col-xs-offset-1 input-group">
	    			<input type="text" class="form-control" id="input-text-invoice-search" placeholder="Search User"/>
					<span class="input-group-addon">
					<i class="fa fa-search"></i>
		   			</span>						
				</div>								
			</div>	
			<div id="div-invoice-table" class="row">							
				<div class="col-sm-12 col-md-12 col-xs-12">
					<br/><br/>		
					<table class="table table-striped table-hover table-condensed" >
					    <thead id="thead-table-invoice">
					    	<tr><th>Select</th><th>User Id</th><th>Username</th><th>EmailID</th><th>Phone</th></tr>
					    	<!--  Here table header names will be shown according to the screen size -->					      
					    </thead>
					    <tbody id="tbody-table-invoice">
					    	<tr><td><input type='checkbox' value=""></input>
				    		</td><td>1</td><td>Amit</td><td>amit.sharma@monoxor.com</td><td>9549554645</td></tr>							    	
					    </tbody>
			    	</table>		 					
				</div>								
			</div>
		</div>																		
	</div>
 </div>