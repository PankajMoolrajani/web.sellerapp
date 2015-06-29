	<div id="div-form-inventory-create-heading" class="row">
		<div class="col-md-4 col-md-offset-4">
			<center><h2 style="border-bottom:1px solid #D2D2D2;">Inventory Form</h2></center>
		</div>						
	</div>
	
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
					<tr>
						<td id="td-form-invenotry-create-table-marketplace">
							<select id="input-select-form-invenotry-create-table-marketplace" class="form-control selectpicker">
								<option>Select Marketplace</option>
							</select>
						</td>
						<td id="td-form-invenotry-create-table-link">
							<input type="text" id="input-text-form-invenotry-create-table-link" class="form-control val-empty"/>
						</td>
						<td id="td-form-invenotry-create-table-sellprice">
							<input type="text" id="input-text-form-invenotry-create-table-sellprice" class="form-control val-empty"/>
						</td>
						<td id="td-form-invenotry-create-table-stock">
							<input type="text" id="input-text-form-invenotry-create-table-stock" class="form-control val-empty"/>
						</td>
						<td id="td-form-invenotry-create-table-status">
							<select id="input-select-form-invenotry-create-table-status" class="form-control val-empty" >										
								<option>Active</option>       						        
								<option>InActive</option>					
							</select>				  
						</td>
						<td id="td-form-invenotry-create-table-health">
							<div class="progress">
							  <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"
							  aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:40%">
							    40% Complete (success)
							  </div>
							</div>
						</td>
						<td id="td-form-invenotry-create-table-submit-edit">									
							<div class="form-group col-md-6 col-sm-6 col-xs-6">
								<button type="button" id="input-btn-edit-form-inventory-create" class="form-control btn btn-primary">Save</button>
							</div>	
							<div class="form-group col-md-6 col-sm-6 col-xs-6">
								<button type="button" id="input-btn-edit-form-inventory-create" class="form-control btn btn-primary">Edit</button>
							</div>											
						</td>
					</tr>
				</tbody>
			</table>		 					
		</div>    
	</div>
	