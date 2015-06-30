<div id="div-user-category" class="container-fluid">
<br/><br/>		
	<div id="div-user-cateogry-create" class="row">
		<div class="col-sm-12 col-md-12 col-xs-12">
			<div id="div-btn-user-category-create" class="row">		
				<div class="col-sm-12 col-md-12 col-xs-12 ">										  	
					<button type="button" id="btn-user-category-create" class="btn btn-primary btn-block"> <!-- changed the id to btn-create-usercat-form -->
				  		Create Category
					</button>		     			
				</div>													
			</div>		
			<div id="div-form-user-category-create" class="row">
				<div class="col-xs-12 col-md-12 col-sm-12">
					<jsp:include page="form_user_category_create.jsp"/>
				</div>					
			</div>
		</div>			
	</div>		
	<div id="div-user-category-browse" class="row" > 
		<div class="col-sm-12 col-md-12 col-xs-12">
			<div id="div-user-category-search" class="row">
			<br/><br/>					
				<div class="col-md-3 col-sm-4 col-xs-10 col-md-offset-8 col-sm-offset-7 col-xs-offset-1 input-group">
					<input type="text" id="input-text-user-category-search" class="form-control"  placeholder="Search User"/>
					<span class="input-group-addon">
						<i class="fa fa-search"></i>
					</span>						
				</div>					
			</div>
			<div id="div-user-category-table" class="row">
				<div class="col-sm-12 col-md-12 col-xs-12 ">
					<br/><br/>								
					<table class="table table-striped table-condensed ">
						<thead id="thead-table-user-category">  <!-- made changes in id -->
						    					      
						</thead>
						<tbody id="tbody-table-user-category"></tbody> <!-- made changes in id -->
					</table>
				</div>					
			</div>						
		</div>
	</div>
</div>