<div id="div-orders" class="container-fluid">
	<br/><br/>
	<div id="div-order-create-orders" class="row">
		<div class="col-sm-12 col-md-12 col-xs-12">
			<div id="div-btn-user-category-create" class="row">		
				<div class="col-sm-3 col-md-3 col-xs-12 ">										  	
					<button type="button" id="btn-order-create" class="btn btn-primary btn-sm btn-block">Create Order</button>		     			
				</div>													
			</div>		
			<div id="div-form-order-create" class="row">
				<div class="col-xs-12 col-md-12 col-sm-12">
					<jsp:include page="form_order_create.jsp"/>
				</div>					
			</div>
		</div>		
	</div>
	<div id="div-order-table" class="row">
		<div class="col-sm-12 col-md-12 col-xs-12">
			<br/><br/>
			<table class="table table-striped table-condensed ">
				<thead id="thead-table-orders">  <!-- made changes in id -->
					<th>Select</th><th>Order_Id</th><th>Customer Name</th><th>marketplace</th><th>marketplace_order_id</th><th>date_order</th><th>status_order</th>				      
				</thead>
				<tbody id="tbody-table-orders">
				</tbody> <!-- made changes in id -->
			</table>		
		</div>
	</div>
</div>