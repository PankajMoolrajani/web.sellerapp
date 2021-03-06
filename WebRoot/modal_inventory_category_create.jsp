<div class="modal-dialog modal-md">
	<div class="modal-content">
		<div id="div-modal-form-inventory-create-category-heading" class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	       	<h4 class="modal-title" id="myModalLabel">Create Inventory Category</h4>
		</div>
		
		<div id="div-modal-form-inventory-create-category-content" class="modal-body">
			<div class="row">
				<div id="div-modal-form-inventory-create-category-search" class="col-md-10 col-md-offset-1">
					<label for="sel1">Inventory Category</label>
					<div class="input-group">									
						<input type="text" class="form-control class-input-modal-form-inventory-category-create" id="input-select-modal-form-inventory-category-create" placeholder="Search category"/>
						<span class="input-group-addon">
							<i class="fa fa-search"></i>
						</span>
					</div>		
	     		</div>
			</div>
			<div class="row">
				<div id="div-modal-form-inventory-create-category-search-content" class="class-modal-create-category-search-content col-md-10 col-md-offset-1">
														
				</div>
			</div>
			<div class="row">
				<br/>
				<div id="div-modal-form-inventory-category-create-toggle" class="col-md-10 col-md-offset-1">
					<button id="btn-modal-form-inventory-category-create-toggle" class="form-control btn btn-default">
						Create Category
					</button>						
				</div>
			</div>
			<div class="row">
				<div id="div-modal-sub-form-inventory-category-create" class="col-sm-10 col-md-10 col-md-offset-1 col-sm-offset-1 to-none">
					<jsp:include page="sub_modal_inventory_category_create.jsp"/>
				</div>					
			</div>		      	      	      							
		</div>		
		<br/>
		<div id="div-modal-form-inventory-category-create-footer" class="modal-footer">
			<button id="btn-modal-form-inventory-category-create-close" type="button" class="inventory-category-create-modal-close-btn btn btn-primary">Ok</button>		    
		</div>
	</div>
</div>