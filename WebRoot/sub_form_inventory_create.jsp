<div class="row">
		<div id="div-img-form-inventory-create-image" class="col-md-2 col-sm-2">
			<div class="row">
				<div id="div-img-form-inventory-create-image-main" class="col-md-12 col-sm-12">
					<p>Main-Image</p>
				</div>				
			</div>	
			<div class="row">
				<div id="div-img-form-inventory-create-image-thumbnail-1" class="col-md-4 col-sm-4 div-img-form-inventory-create-image-thumbnail">
					<p>Thumb-nail-1</p>					
				</div>
				<div id="div-img-form-inventory-create-image-thumbnail-2" class="col-md-4 col-sm-4 div-img-form-inventory-create-image-thumbnail">
					<p>Thumb-nail-2</p>
				</div>
				<div id="div-img-form-inventory-create-image-thumbnail-3" class="col-md-4 col-sm-4 div-img-form-inventory-create-image-thumbnail">
					<p>Thumb-nail-3</p>
				</div>					
			</div>
		</div>
		<div class="col-md-10 col-sm-10">
			<div id="div-form-inventory-create-line-1" class="row">
				<div id="div-form-inventory-create-base-sku" class="col-md-3 col-sm-3 col-xs-6">
					<label class="control-label" for="inputInventorySku">SKU Number</label>
		  			<input type="text" id="input-text-form-inventory-create-base-sku" class="form-control val-empty"/>						
				</div>
				<div id="div-form-inventory-create-name" class="col-md-5 col-sm-5 col-xs-6">
					<label class="control-label" for="inputInventoryName">Inventory Name</label>
		  			<input type="text" id="input-text-form-inventory-create-name" class="form-control val-empty"/>			
				</div>
				<div id="div-form-inventory-create-category" class="col-md-4 col-sm-4 col-xs-6">					
		  			<button type="button" id="input-btn-form-inventory-create-category" class="form-control btn btn-default" data-toggle="modal" data-target="#div-modal-form-inventory-create-category">
		  				Select Inventory Category
		  			</button>
		  			<input type="text" id="input-txt-form-inventory-create-category" class="form-control val-empty" readonly/>								
				</div>				
			</div>	
			<div id="div-form-inventory-create-line-2" class="row">
				<div id="div-form-inventory-brand" class="form-group col-md-3 col-sm-3">							
					<label class="control-label" for="inputInventorySku">Brand</label>
					<select id="input-select-form-invenotry-create-brand" class="form-control val-empty" >
						<option>Select Brand</option>
					</select>	
				</div>
				<div id="div-form-inventory-create-stock" class="col-md-3 col-sm-3">
					<label class="control-label" for="inputInventorySku">Stock</label>
		  			<input type="text" id="input-text-form-invenotry-create-stock" class="form-control val-empty"/>						
				</div>
				<div id="div-form-inventory-tax" class="form-group col-md-2 col-sm-2">							
					<label class="control-label" for="inputInventorySku">Tax</label>
					<select id="input-select-form-invenotry-create-tax" class="form-control val-empty" >
						<option>Select Tax</option>													
					</select>
				</div>	
				<div id="div-form-inventory-create-maxprice" class="form-group col-md-2 col-sm-2">
					<label class="control-label" for="inputInventorySku">Max-Price</label>
					<input type="text" id="input-text-form-inventory-create-maxprice" class="form-control val-empty"/>						
				</div>
				<div id="div-form-invenotry-create-minprice" class="form-group col-md-2 col-sm-2">
					<label class="control-label" for="inputInventorySku">Min-Price</label>
					<input type="text" id="input-text-form-invenotry-create-minprice" class="form-control val-empty"/>						
				</div>			
			</div>
			<div id="div-form-inventory-create-line-3" class="row">
				<div id="div-form-inventory-weight" class="form-group col-md-3 col-sm-3">
					<label class="control-label" for="inputInventorySku">weight</label>
					<input type="text" id="input-text-form-invenotry-create-weight" class="form-control val-empty"/>
				</div>
				<div id="div-form-inventory-supplier" class="form-group col-md-3 col-sm-3">
					<label class="control-label" for="inputInventorySku">supplier</label>
					<select id="input-select-form-inventory-create-supplier" class="form-control val-empty" >
						<option>Select Supplier</option>													
					</select>
				</div>
				<div id="div-form-inventory-procurement-time" class="form-group col-md-2 col-sm-2">
					<label class="control-label" for="inputInventorySku">Procurement-Time</label>
					<input type="text" id="input-text-form-invenotry-create-procurement-time" class="form-control val-empty"/>
				</div>	
				<div id="div-select-form-inventory-create-status" class="form-group col-md-4 col-sm-4">
					<label class="control-label" for="inputInventorySku">Status</label>
					<select id="input-select-form-invenotry-create-status" class="form-control val-empty" >
						<option>Select Status</option>
										
					</select>						
				</div>						
			</div>
			<div id="div-form-inventory-create-line-4" class="row">
				<div id="div-form-inventory-create-warehouse" class="form-group col-md-3 col-sm-3">							
					<label class="control-label" for="inputInventorySku">Warehouse</label>
					<select id="input-select-form-invenotry-create-warehouse" class="form-control val-empty" >
						<option>Select Warehouse</option>
									
					</select>	
				</div>
				<div id="div-form-inventory-create-aisle" class="col-md-3 col-sm-3">
					<label class="control-label" for="inputInventorySku">Aisle</label>
		  			<select id="input-select-form-invenotry-create-aisle" class="form-control val-empty" >
						<option>Select Aisle</option>
										
					</select>						
				</div>
				<div id="div-form-inventory-create-location" class="form-group col-md-2 col-sm-2">							
					<label class="control-label" for="inputInventorySku">Location</label>
					<select id="input-select-form-invenotry-create-location" class="form-control val-empty" >
						<option>Select Location</option>
										
					</select>
				</div>	
				<div id="div-form-inventory-create-shelf" class="form-group col-md-2 col-sm-2">
					<label class="control-label" for="inputInventorySku">Shelf</label>
					<select id="input-select-form-invenotry-create-shelf" class="form-control val-empty" >
						<option>Select Shelf</option>
										
					</select>						
				</div>
				<div id="div-form-inventory-create-box" class="form-group col-md-2 col-sm-2">
					<label class="control-label" for="inputInventorySku">Box</label>
					<select id="input-select-form-invenotry-create-box" class="form-control val-empty" >
						<option>Select Box</option>
									
					</select>						
				</div>			
			</div>
			<div id="div-form-inventory-create-line-5" class="row">				
				<div class="form-group col-md-4 col-sm-4 col-md-offset-3">
					<label class="control-label" for="inputInventorySku">tag-Id</label>
					<div id="div-form-invenotry-create-tags" class="row">
						<div class="col-md-12 col-sm-12">
							<input type="text" id="input-text-form-inventory-create-tags" class="form-control" placeholder="tag id...">
						</div>								
					</div>
					<div id="div-inventory-create-tag-fetch-list" class="row">
						<div id="div-inventory-create-tag-fetch-list" class="fetched-tag-list col-md-12 col-sm-12">								
						</div>
					</div>
				</div>			
			</div>
			<div id="div-form-inventory-create-line-6" class="row">				
				<div id="div-form-inventory-create-save" class="form-group col-md-2 col-sm-2 col-md-offset-3">
					<button type="button" id="input-btn-submit-form-inventory-create" class="btn btn-primary">Save Inventory</button>
				</div>
				<div id="div-form-inventory-create-edit" class="form-group col-md-2 col-sm-2">
					<button type="button" id="input-btn-edit-form-inventory-create" class="btn btn-primary">Edit Inventory</button>
				</div>			
			</div>
		</div>					
	</div>
	
	<div id="div-modal-form-inventory-create-category" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">	
		<jsp:include page="modal_inventory_category_create.jsp"></jsp:include>
	</div>