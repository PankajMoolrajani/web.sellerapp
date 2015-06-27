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
		<div id="div-form-inventory-create-inventory-summary" class="row">
			<div class="col-md-12 col-sm-12">
				
			</div>		
		</div>
		<div id="div-form-inventory-create-line-1" class="row">
			<div class="col-md-5 col-sm-5">
				<div class="row">
					<div id="div-form-inventory-create-base-sku" class="col-md-6 col-sm-6">
						<label class="control-label" for="inputInventorySku">SKU Number</label>
			  			<input type="text" id="input-text-form-inventory-create-base-sku" class="form-control val-empty"/>																							
					</div>
					<div id="div-form-inventory-create-name" class="col-md-6 col-sm-6">
			  			<label class="control-label" for="inputInventorySku">Inventory Category</label>
			  			<button type="button" id="input-btn-form-inventory-create-category" class="form-control btn btn-default" data-toggle="modal" data-target="#div-modal-form-inventory-create-category">
			  				Select Inventory Category
			  			</button>			  														  											
					</div>
				</div>
			</div>
			<div class="col-md-7 col-sm-7">
				<div id="div-form-inventory-brand" class="col-md-4 col-sm-4">
					<label class="control-label" for="inputInventorySku">Brand</label>
					<select id="input-select-form-invenotry-create-brand" class="form-control val-empty" >
						<option>Select Brand</option>
					</select>	
				</div>
				<div id="div-form-inventory-create-name" class="col-md-4 col-sm-4">
					<label class="control-label" for="inputInventoryName">Inventory Name</label>
		  			<input type="text" id="input-text-form-inventory-create-name" class="form-control val-empty"/>			
				</div>
				<div id="div-form-inventory-create-weight" class="col-md-4 col-sm-4">
					<label class="control-label" for="inputInventorySku">Weight</label>
		  			<input type="text" id="input-text-form-inventory-create-weight" class="form-control val-empty"/>											
				</div>
			</div>			
		</div>
		<br/>
		<div class="row">		
			<div id="div-form-inventory-create-tab" class="col-md-10 col-sm-10 col-md-offset-1 col-sm-offset-1">
				    <ul id="tabs" class="nav nav-tabs" data-tabs="tabs">
				        <li class="active"><a href="#div-form-inventory-create-stock" data-toggle="tab">Stock</a></li>
				        <li><a href="#div-form-inventory-create-procurement" data-toggle="tab">Procurement</a></li>
				        <li><a href="#div-tab-form-inventory-create-sales" data-toggle="tab">Sales</a></li>
				        <li><a href="#div-tab-form-inventory-create-variants" data-toggle="tab">Variants</a></li>
				        <li><a href="#div-tab-form-inventory-create-accounting" data-toggle="tab">Accounting</a></li>
				    </ul>											
			</div>
		</div>	
		<div id="row">	
			<div id="div-form-inventory-create-tab-pages" class="tab-content col-md-10 col-sm-10 col-md-offset-1 col-sm-offset-1">
				<div class="tab-pane active" id="div-form-inventory-create-stock">
		            <jsp:include page="form_inventory_create_stock.jsp"></jsp:include>		           
		        </div>
		        <div class="tab-pane" id="div-form-inventory-create-procurement">
		            <jsp:include page="form_inventory_create_procurement.jsp"></jsp:include>
		        </div>
		        <div class="tab-pane" id="div-tab-form-inventory-create-sales">
		          
		        </div>
		        <div class="tab-pane" id="div-tab-form-inventory-create-variants">
		        	
		        </div>
		        <div class="tab-pane" id="div-tab-form-inventory-create-accounting">
		            <jsp:include page="form_inventory_create_accounting.jsp"></jsp:include>
		        </div>
		    </div>
		</div>				
	</div>	
</div>
<br/>
<div class="row">		
	<div id="div-form-inventory-create-save" class="col-md-2 col-sm-2 col-xs-6 col-sm-offset-4 col-md-offset-4">
		<button type="button" id="input-btn-submit-form-inventory-create" class="btn btn-primary">Save Inventory</button>
	</div>
	<div id="div-form-inventory-create-edit" class="form-group col-md-2 col-sm-2">
		<button type="button" id="input-btn-edit-form-inventory-create" class="btn btn-primary">Edit Inventory</button>
	</div>
</div>			
