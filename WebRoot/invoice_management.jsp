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
			<div id="div-invoice-search" class="row">										
				<jsp:include page="search_box_main.jsp"></jsp:include>							
			</div>	
			<div id="div-invoice-table" class="row">							
				<div class="col-sm-12 col-md-12 col-xs-12">
					<br/><br/>		
					<table id="table-invoice" class="table table-striped table-condensed" >
					    <thead id="thead-table-invoice">
					    	<tr><th>Select</th><th>Invoice Id</th><th>Customer Name</th><th>Order Id</th><th>Order Total</th><th>commission</th><th>invoice amount tax</th><th>INvoice Status</th></tr>
					    	<!--  Here table header names will be shown according to the screen size -->					      
					    </thead>
					    <tbody id="tbody-table-invoice">
					    	<tr><td><input type='checkbox' value=""></input>
				    									    	
					    </tbody>
			    	</table>		 					
				</div>								
			</div>
		</div>																		
	</div>
 </div>