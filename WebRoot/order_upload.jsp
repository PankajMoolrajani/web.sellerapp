<div class="row">
	<div class="col-sm-12 col-md-12 col-xs-12">
		<div class="row">
			<div class="col-md-4 col-md-offset-4">
		<center><h2 style="border-bottom:1px solid #D2D2D2;">Process Order</h2></center>
	</div>
		</div>
		<div class="row">
			<div class="col-sm-7 col-md-7 col-xs-12 col-sm-offset-4 col-md-offset-4">
				<div id="div-file" class="col-md-8 navbar-form navbar-left navbar-collapse collapse">
					<div class="row">
						<div class="col-sm-12 col-md-12">						 							 
							<form action="OrderFileProcess" id="form-bulk-order-upload" class="navbar-form navbar-left" method="post" enctype="multipart/form-data">
							  <div class="form-group">    								
							  	<input type="file" size="60" id="input-file-bulk-order-upload" name="order-upload-file">
							  </div>							  
							  <button type="submit" class="btn btn-default">Upload File</button>
							  <span id="message"></span>
							</form>					        			 								   
						</div>
					</div>											    				    					    				    							    				    			    			
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-2 col-md-2 col-xs-12 col-sm-offset-4 col-md-offset-4">
				<select id="select-upload-file-type-order" class="form-control">
				  <option>Uniware</option>
				  <option>Amazon</option>				  
				</select>	
			</div>
			<div class="col-sm-3 col-md-3 col-xs-12">
				<button type="button" id="btn-form-order-upload-file" class="btn btn-default">Process Order File</button>
			</div>
		</div>
	</div>
</div>