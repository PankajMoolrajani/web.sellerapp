<div class="modal fade marketplace-create-modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-sm">
	    <div class="modal-content">
			<div id="div-form-invMarketplace-header" class="modal-header">
		    	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="myModalLabel">MarketPlace</h4>
			</div>
		    <div id="div-form-invMarketplace-fields" class="modal-body">
		        <jsp:include page="sub_form_marketplace_create.jsp"></jsp:include>
		    </div>
		    <div id="div-form-pMarketplace-submit" class="modal-footer">
		        <button type="button" id="btn-form-marketplace-create-close" class="btn btn-default" data-dismiss="modal">Close</button>
		        <button type="button" id="btn-form-marketplace-create-submit" class="btn btn-primary">Create</button>
		    </div>
		</div>
	</div>
</div>