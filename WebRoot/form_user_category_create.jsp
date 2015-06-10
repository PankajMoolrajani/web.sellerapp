		<div id="div-create-usercat-heading" class="row" >
			<div class="col-md-4 col-md-offset-4 col-xs-12 page-header">
				<center><h1>User Category Form</h1></center>
			</div>
		</div>
		<div id="div-form-user-cname-cdesc" class="row" >
			<div id="div-form-user-cname" class="form-group col-xs-12 col-sm-6 col-md-6">
				<label class="control-label" for="inputWarning1">Category Name</label>
				<input type="text" id="input-form-usercat-cname" class="form-control val-empty">			
			</div>				
			<div id="div-form-user-cdesc" class="form-group col-xs-12 col-sm-6 col-md-6">
				<label class="control-label" for="inputWarning1">Category Description</label>
				<input type="text" id="input-form-usercat-cdesc" class="form-control val-empty">
			</div>
		</div>					
		<div id="div-form-usercat-submit" class="row">
			<div class="col-sm-5 col-md-5"></div>
			<div class="form-group col-sm-7 col-md-7 col-xs-12">				
				<button type="button" id="btn-form-usercat-submit" class="btn btn-primary">Create User Category</button>				
			</div>
		</div>
		
	    <script>
	    	$(document).ready(function(){
	    		userCatCreateFormVal();
	    	});
	    </script>
  	