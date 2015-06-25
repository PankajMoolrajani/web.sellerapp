 <div id="div-user" class="container-fluid">
 	<br/><br/>	
	<div id="div-user-create" class="row">	
		<div class="col-sm-12 col-md-12 col-xs-12">
			<div id="div-btn-user-create" class="row">
				<div class="col-sm-12 col-md-12 col-xs-12 ">									  	
					<button type="button" id="btn-user-create" class="btn btn-primary btn-block" >  <!-- changed the id to btn-create-user-form -->
						Create User
					</button>	     			
				</div>				
			</div>			
			<div id="div-form-user-create" class="row">
				<div class="col-xs-12 col-md-12 col-sm-12">				
					<jsp:include page="form_user_create.jsp"/>								
				</div>
			</div>				
		</div>				
	</div>
			
	<div id="div-user-browse" class="row">			
	<br/><br/>			
		<div class="col-sm-12 col-md-12 col-xs-12" >
			<div id="div-user-search" class="row">										
				<div class="col-md-3 col-sm-4 col-xs-10 col-md-offset-8 col-sm-offset-7 col-xs-offset-1 input-group">
	    			<input type="text" class="form-control" id="input-text-user-search" placeholder="Search User"/>
					<span class="input-group-addon">
					<i class="fa fa-search"></i>
		   			</span>						
				</div>								
			</div>	
			<div id="div-user-table" class="row">							
				<div class="col-sm-12 col-md-12 col-xs-12">
					<br/><br/>		
					<table class="table table-striped table-hover table-condensed">
					    <thead id="thead-table-user">					    	
					    	<!--  Here table header names will be shown according to the screen size -->					      
					    </thead>
					    <tbody id="tbody-table-user">
					    </tbody>
			    	</table>		 					
				</div>								
			</div>
		</div>																		
	</div>
 </div>