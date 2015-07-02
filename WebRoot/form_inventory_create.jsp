	<br/>
	<div id="div-sub-form-inventory-create">
		<jsp:include page="sub_form_inventory_create.jsp"></jsp:include>
	</div>					
	<br/>
	<div id="div-form-inventory-create-marketplace" class="row">
		<div class="col-sm-3 col-md-3 col-sm-offset-9 col-md-offset-9">
			<button type="button" id="input-btn-inventory-create-table-add-marketplace" class="btn btn-primary btn-sm btn-block" data-toggle="modal" data-target=".marketplace-create-modal">
				Create Marketplace
			</button>
		</div>

		<!-- create inventory Marketplace form -->
		<div id="div-modal-form-inventory-marketplace-create">
			<jsp:include page="form_marketplace_create.jsp"/>
		</div>						
	</div>
	<br/>
	<div id="div-form-inventory-create-table" class="row">
		<div class="col-sm-12 col-md-12 col-xs-12">		
			<table id="table-form-inventory-create-table" class="table" >
				<thead id="thead-table-form-inventory-create">
					<tr>								
						<th>Marketplace</th>
						<th>Url</th>
						<th>Sell Price</th>
						<th>Stock</th>
						<th>Status</th>
						<th>Progress Health</th>
						<th>Edit/Save</th>
					</tr>									      
				</thead>
				<tbody id="tbody-table-form-inventory-create">
					
				</tbody>
			</table>		 					
		</div>    
	</div>
	
<div id="div-form-inventory-create-state-buttons" class="row">		
	<jsp:include page="button_edit_save_reset.jsp"></jsp:include>
</div>			
	