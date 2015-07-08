<div class="row"> 
	<div id="div-img-form-inventory-create-image" class="col-md-2 col-sm-2">
		<div class="row">
			<div id="div-img-form-inventory-create-image-main" class="col-md-12 col-sm-12">
				<p>Main-Image</p>
			</div>				
		</div>	
		<div class="row">
			<div id="div-img-form-inventory-create-image-thumbnail-1" class="col-md-4 col-sm-4 col-xs-4 div-img-form-inventory-create-image-thumbnail">
				<p>Thumb-nail-1</p>					
			</div>
			<div id="div-img-form-inventory-create-image-thumbnail-2" class="col-md-4 col-sm-4 col-xs-4 div-img-form-inventory-create-image-thumbnail">
				<p>Thumb-nail-2</p>
			</div>
			<div id="div-img-form-inventory-create-image-thumbnail-3" class="col-md-4 col-sm-4 col-xs-4 div-img-form-inventory-create-image-thumbnail">
				<p>Thumb-nail-3</p>
			</div>					
		</div>
	</div>
	<div class="col-md-10 col-sm-10 col-xs-12">
		<div id="div-form-inventory-create-inventory-summary" class="row">
			<div class="col-md-12 col-sm-12">
				
			</div>		
		</div>
		<div id="div-form-inventory-create-line-1" class="row">
			<div id="div-form-inventory-create-name" class="form-group col-md-8 col-sm-8">
				<label class="control-label" for="inputInventoryName">Inventory Name</label>
		  		<input type="text" id="input-text-form-inventory-create-name" class="form-control val-empty"/>		
			</div>
			<div id="div-form-inventory-brand" class="form-group col-md-4 col-sm-4">
				<label class="control-label" for="inputInventorySku">Brand</label>
				<select id="input-select-form-invenotry-create-brand" class="form-control selectpicker show-tick val-empty" >
					<option>Demo Brand-1</option>
				</select>							
			</div>				
		</div>
		<div id="div-form-inventory-create-line-2" class="row">
			<div id="div-form-inventory-create-base-sku" class="form-group col-md-4 col-sm-4">
				<label class="control-label" for="inputInventorySku">SKU Number</label>
			  	<input type="text" id="input-text-form-inventory-create-base-sku" class="form-control val-empty"/>				
			</div>
			<div id="div-form-inventory-create-category" class="form-group col-md-4 col-sm-4">
				<label class="control-label" for="inputInventorySku">Inventory Category</label>
			  	<button type="button" id="input-btn-form-inventory-create-category" class="form-control btn btn-default" data-toggle="modal" data-target="#div-modal-form-inventory-create-category">
                	Select Inventory Category
                </button>	  		
			</div>
			<div id="div-form-inventory-create-weight" class="form-group col-md-4 col-sm-4">
				<label class="control-label" for="inputInventorySku">Weight</label>
	  			<input type="text" id="input-text-form-inventory-create-weight" class="form-control val-empty"/>
			</div>			
		</div>
		
		<br/>
		<div class="row">		
			<div id="div-form-inventory-create-tab" class="col-md-12 col-sm-12 ">
				    <ul id="tabs" class="nav nav-tabs" data-tabs="tabs">
				        <li class="active"><a href="#div-form-inventory-create-stock" id="a-tab-form-inventory-create-stock" data-toggle="tab">Stock</a></li>
				        <li><a href="#div-form-inventory-create-procurement" id="a-tab-form-inventory-create-procurement" data-toggle="tab">Procurement</a></li>
				        <li><a href="#div-tab-form-inventory-create-sales" id="a-tab-form-inventory-create-sales" data-toggle="tab">Sales</a></li>
				        <li><a href="#div-tab-form-inventory-create-variants" id="a-tab-form-inventory-create-variants" data-toggle="tab">Variants</a></li>
				        <li><a href="#div-tab-form-inventory-create-accounting" id="a-tab-form-inventory-create-accounting" data-toggle="tab">Accounting</a></li>
				    </ul>											
			</div>
		</div>	
		<div id="row">	
			<div id="div-form-inventory-create-tab-pages" class="tab-content col-md-12 col-sm-12">
				<div class="tab-pane active" id="div-form-inventory-create-stock">
		            <jsp:include page="form_inventory_create_stock.jsp"></jsp:include>		           
		        </div>
		        <div class="tab-pane" id="div-form-inventory-create-procurement">
		            <jsp:include page="form_inventory_create_procurement.jsp"></jsp:include>
		        </div>
		        <div class="tab-pane" id="div-tab-form-inventory-create-sales">
		          	<jsp:include page="form_inventory_create_sales.jsp"></jsp:include>
		        </div>
		        <div class="tab-pane" id="div-tab-form-inventory-create-variants">
		        	<jsp:include page="form_inventory_create_variants.jsp"></jsp:include>
		        </div>
		        <div class="tab-pane" id="div-tab-form-inventory-create-accounting">
		            <jsp:include page="form_inventory_create_accounting.jsp"></jsp:include>
		        </div>
		    </div>
		</div>				
	</div>	
</div>

<div id="div-modal-form-inventory-create-category" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">    
        <jsp:include page="modal_inventory_category_create.jsp"></jsp:include>
</div>
