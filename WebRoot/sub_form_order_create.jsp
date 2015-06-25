
<div id="div-form-order-create-line-1" class="row">
	<div class="col-md-5 col-sm-5">
		<div class="row">
			<div id="div-form-order-create-order-id" class="form-group col-md-6 col-sm-12">
				<label class="control-label" for="inputWarning1">Order Id</label>
				<input type="text" id="input-text-form-order-create-order-id" class="form-control val-empty" >	
			</div>
			<div id="div-form-order-create-marketplace" class="form-group col-md-6 col-sm-12">
				<label class="control-label" for="inputWarning1">Marketplace</label>
				<select id="input-select-form-order-create-marketplace" class="form-control selectpicker show-tick" title="Select Marketplace">
					<option>Demo Marketplace</option>		
				</select>
			</div>
		</div>		
	</div>
	<div class="col-md-7 col-sm-7">
		<div class="row">
			<div id="div-form-order-create-marketplace-order-id" class="col-md-4 col-sm-6">
				<label class="control-label" for="inputWarning1">Marketplace OrderId</label>
				<input type="text" id="input-text-form-order-create-marketplace-order-id" class="form-control val-empty" >
			</div>
			<div id="div-form-order-create-order-date" class="col-md-4 col-sm-6">
				<label class="control-label" for="inputWarning1">Order Date</label>
				<input  type="text" id="input-date-form-order-create-order-date" class="form-control val-empty">
			</div>
			<div id="div-form-order-create-order-status" class="col-md-4 col-sm-6">
				<label class="control-label" for="inputWarning1">Customer Name</label>
				<select id="input-select-form-order-create-marketplace" class="selectpicker" title="Select Customer">			
					<option>Demo Customer</option>		    
				</select>
			</div>
		</div>
	</div>
</div>
<div id="div-form-order-create-iine-2" class="row">	
	<div id="div-order-table-order-line" class="col-md-8 col-sm-10 col-md-offset-2 col-sm-offset-1">
		<div id="div-order-table-order-line-inner" class="row">
			<div class="col-md-12 col-sm-12">
				<div class="row">
					<div class="col-md-10 col-sm-10 col-md-offset-1 col-sm-offset-1">
						<table id="table-order-line" class="table table-striped table-hover table-condensed ">
							<thead id="thead-table-order-line">  <!-- made changes in id -->
								<th>SNO</th><th>Title</th><th>Qty</th><th>Unit Price</th><th>Taxable Amount</th><th>Tax</th><th>SubTotal</th>				      
							</thead>
							<tbody id="tbody-table-order-line">
								<tr><td>1</td><td>demo-title</td><td>23443</td><td>23443</td><td>0124</td><td>15</td><td>201000</td></tr>
							</tbody> <!-- made changes in id -->
						</table>	
					</div>
				</div>		
				<div class="row">
					<div class="col-md-3 col-sm-4">
						<button id="button" class="btn btn-default btn-sm">add order line</button>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="form-group col-md-3 col-sm-3 col-sm-offset-5 col-md-offset-5">
				<button type="button" class="btn btn-primary btn-sm">Total</button>
			</div>
		</div>
	</div>
</div>
<div id="div-form-order-create-line-2" class="row">
	<div id="div-form-order-create-order-shipping-date" class="col-md-2 col-sm-3">
		<label class="control-label" for="inputWarning1">Shopping Date</label>
		<select id="input-select-form-order-create-shipping-date" class="form-control selectpicker show-tick" title="Select Marketplace">
			<option>Demo Marketplace</option>		
		</select>
	</div>
	<div id="div-form-order-create-order-shipping-service" class="col-md-2 col-sm-3">
		<label class="control-label" for="inputWarning1"></label>
		<select id="input-select-form-order-create-shipping-service" class="form-control selectpicker show-tick" title="Select Marketplace">
			<option></option>		
		</select>
	</div>
	<div id="div-form-order-create-tracking-number" class="col-md-2 col-sm-3">
		<label class="control-label" for="inputWarning1"></label>
		<input type="text" id="input-text-form-order-create-tracking-number" class="form-control val-empty" >	
	</div>
	<div id="div-form-order-create-delivery-status" class="col-md-2 col-sm-3">
		<label class="control-label" for="inputWarning1"></label>
		<select id="input-select-form-order-create-delivery-status" class="form-control selectpicker show-tick" title="Select Marketplace">
			<option></option>		
		</select>
	</div>
	<div id="div-form-order-create-expected-delivery" class="col-md-2 col-sm-3">
		<label class="control-label" for="inputWarning1"></label>
		<input type="text" id="input-text-form-order-create-expected-delivery" class="form-control val-empty" >	
	</div>
	<div id="div-form-order-create-delivery-date" class="col-md-2 col-sm-3">
		<label class="control-label" for="inputWarning1"></label>
		<select id="input-select-form-order-create-delivery-date" class="form-control selectpicker show-tick" title="Select Marketplace">
			<option></option>		
		</select>
	</div>
</div>