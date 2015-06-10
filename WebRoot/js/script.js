$(document).ready(function(){	

	var domainName = "http://dev.monoxor.com/";
	
/*................... Javascript for Index page ......................*/

	$(".login-link").click(function(){	
		
		window.location.assign("login.jsp");
	});


/*................... Javascript for login page ......................*/

	var submitLoginForm;	
	submitLoginForm = function(login_username , login_password){		
		var $btn = $("#login-form").button('loading'); //explain button('loading')				
		$.ajax({
			type: "GET", //get request
			url: "Authentication",
			data: {"action": "authenticateUser", "login_username": login_username, "login_password":login_password }, //use pass instead of hash user_
			dataType: "json",
			success: function(responseText){
				$btn.button('reset'); //check issues 	
				var error_code = responseText["error_code"];
				if(error_code=="")
				{					
					var pageURL = responseText["page-to-load"];						
					window.location.assign(pageURL);									
				}
				else
				{														
					var error_message=getErrorMessage(error_code);
					$("#div-login-profile-status").html("<p class='login-error-msg'>"+error_message+"</p>");															
				}		
			} 
		});
	};
	
	$("#login-form").click(function(){	
		var login_username = $("#login-username").val(); // changed variable name to login_username
		var login_password = $("#login-password").val(); 
		submitLoginForm(login_username,login_password);		
	});
	/*.....if enter pressed on password textbox..........*/
	$("#login-password").keypress(function(event){
		var login_username = $("#login-username").val(); // changed variable name to login_username
		var login_password = $("#login-password").val(); 
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			submitLoginForm(login_username,login_password);	
		}
	});

	
/*................dashboard - Side Bar script open.................*/
var collapseMyMenu,expandMyMenu,showMenuTexts,hideMenuTexts,changeSidebarIcon;
	
	expandMyMenu = function(){
		return $("nav.sidebar").removeClass("sidebar-menu-collapsed").addClass("sidebar-menu-expanded");
	};
    collapseMyMenu = function() {
    	return $("nav.sidebar").removeClass("sidebar-menu-expanded").addClass("sidebar-menu-collapsed");
    };
    showMenuTexts = function() {
    	return $(".div-sidemenu-menuitem a span.span-sidemenu-menuitem-text").show();
    };
    hideMenuTexts = function() {
    	return $(".div-sidemenu-menuitem a span.span-sidemenu-menuitem-text").hide();
    };
    function leftSidebarIcon()
    {    	
    	$( "#div-toggle-button-sidemenu  #a-toggle-button-sidebar  span" ).removeClass("glyphicon glyphicon-chevron-right");
    	$( "#div-toggle-button-sidemenu  #a-toggle-button-sidebar  span" ).addClass("glyphicon glyphicon-chevron-left");    	
    }
    function rightSidebarIcon()
    {    	
    	$( "#div-toggle-button-sidemenu  #a-toggle-button-sidebar  span" ).removeClass("glyphicon glyphicon-chevron-left");
    	$( "#div-toggle-button-sidemenu  #a-toggle-button-sidebar  span" ).addClass("glyphicon glyphicon-chevron-right");    	    
    }

	$("#div-toggle-button-sidemenu").click(function(){		
		if ($(this).parent("nav.sidebar").hasClass("sidebar-menu-collapsed")) 
		{					
			$(".side-icon").css("float","right");
			expandMyMenu();
			showMenuTexts();
			leftSidebarIcon();
			$(this).css({
			  color: "#999999"
			});
			if($(window).width()>="750")
			{								
				$("#div-page-content").css("padding-left","125px");
			}
			else
			{
				$("#div-page-content").css("padding-left","120px");
			}
		}
    	else if ($(this).parent("nav.sidebar").hasClass("sidebar-menu-expanded"))
		{    		    		
    		$(".side-icon").css("float","none");
			collapseMyMenu();
			hideMenuTexts();
			rightSidebarIcon();
			$(this).css({
			  color: "#999999"
			});
			if($(window).width()>="750")
			{
				$("#div-page-content").css("padding-left","50px");
			}
			else
			{
				$("#div-page-content").css("padding-left","40px");
			}			
        }		
	});
	
	$(".div-sidemenu-submenu-menuitem").click(function(){
		$(".submenus-user").css("background-color","#f8f8f8");		
	});
	/*........create user and create category forms refresh on click of sidebar user tab....... */
	$("#dashboard-user").click(function(){		
		$("#div-form-user-create").load('form_user_create.jsp');	
		$("#div-form-user-create").css("display","none");

		$("#div-form-user-category-create").load('form_user_category_create.jsp');	
		$("#div-form-user-category-create").css("display","none");
		
	});
	
	userCreatePageScript(domainName); //calling of user-management page script
	userCreateFormVal(domainName); //calling of user-mgmt validation page script
	
	userCatCreatePageScript(domainName); //calling of user-category page script
	userCatCreateFormVal(domainName); //calling of user-mgmt validation page script
	
/*....................sidebar script close............................*/
	
});

/* error handling for whole script page*/
function getErrorMessage(error_code)
{		
	var error_message;
	$.ajax({
		type: "GET", 
		url: "ManageException",
		async: false,
		data: {"error_code": error_code},
		dataType: "json",
		success: function(responseText){						
			error_message = responseText["error_message"];		
		}
	});		
	return error_message;
}

/*............................user-create script OPEN......................... */
function userCreatePageScript(domainName)
{				
	/*...apply table headers of user-create page according to the screen-size....*/
	if($(window).width()>=750)
	{		
		var header="<tr><th>Select</th><th>User Id</th><th>Username</th><th>EmailID</th><th>Phone</th></tr>";			
		$("#thead-table-user").html(header);

	}
	else
	{
		var header="<tr><th>Select</th><th>Username</th><th>Phone</th></tr>";							      
		$("#tbody-table-user").html(header);
	}
	
	/*........first it Loads table according to the screen-size.......*/
	var userTextChar = $("#input-text-user-search").val();  
	if(($(window).width())>=750) /*......screen width greater than 750px.....*/
	{
//		$.ajax({
//			type: "GET",
//			url: "UserTableDataServlet",			
//			dataType: "json",
//			data: {"var": "empty", "pageName": "user-create", "screenType": "large"},
//			success: function(responseText){				
//				var userTable="";
//				
//		    	for(var i=0 ; i<responseText["userTable"].length ; i=i+1)
//        		{				        		
//		    		userTable =	userTable+"<tr><td><input type='checkbox' value="+responseText["userTable"][i].id+"></input>"+
//		    		"</td><td>"+responseText["userTable"][i].id+
//					"</td><td>"+responseText["userTable"][i].userName+
//        			"</td><td>"+responseText["userTable"][i].emailId+
//        			"</td><td>"+responseText["userTable"][i].phoneNo+
//        			"</td></tr>";
//				}		    	
//				$("#tbody-table-user").html(userTable);					
//			},
//			error: function(request, error, data){
//				alert(error);				
//			}  						
//		});
		
		/*........searching time table load according to the search result.......*/				
		$("#input-text-user-search").keyup(function(){			

			var userTextChar1 = $("#input-text-user-search").val();	 				
			if(!(userTextChar1==""))  //if a character typed in search-bar
			{	 	 				 					  					
//				$.ajax({ 						
//					type: "GET",
//					url: "UserTableDataServlet",			
//					dataType: "json",
//					data: {"var": "filled","pageName": "user-create", "textChar": userTextChar1, "screenType": "large" },
//					success: function(responseText){							
//						var userTable="";
//						for(var i=0 ; i<responseText["userTable"].length ; i=i+1)
//		        		{				        		
//				    		userTable =	userTable+"<tr><td><input type='checkbox' value="+responseText["userTable"][i].id+"></input>"+
//				    		"</td><td>"+responseText["userTable"][i].id+
//							"</td><td>"+responseText["userTable"][i].userName+
//		        			"</td><td>"+responseText["userTable"][i].emailId+
//		        			"</td><td>"+responseText["userTable"][i].phoneNo+
//		        			"</td></tr>";
//						}		  						
//						$("#tbody-table-user").html(userTable);	
//						//$("#tbody-table-user").html(responseText);						
//					},
//					error: function(request, error, data){
//						alert(error);
//						alert(data);
//					}  						
//				});		
			}
			else  // if search bar is empty even after button typed (back-button,space)
			{		 					
//				$.ajax({
//					type: "GET",
//					url: "UserTableDataServlet",			
//					dataType: "json",
//					data: {"var": "empty", "pageName": "user-create", "screenType": "large"},
//					success: function(responseText){
//						var userTable="";
//						for(var i=0 ; i<responseText["userTable"].length ; i=i+1)
//		        		{				        		
//				    		userTable =	userTable+"<tr><td><input type='checkbox' value="+responseText["userTable"][i].id+"></input>"+
//				    		"</td><td>"+responseText["userTable"][i].id+
//							"</td><td>"+responseText["userTable"][i].userName+
//		        			"</td><td>"+responseText["userTable"][i].emailId+
//		        			"</td><td>"+responseText["userTable"][i].phoneNo+
//		        			"</td></tr>";
//						}		    	
//						$("#tbody-table-user").html(userTable);							
//					},
//					error: function(request, error, data){
//						alert(error);				
//					}  						
//				});
			}	 			
		});
	}
	else	  /*......screen width less than 750px.....*/
	{	
//		$.ajax({
//			type: "GET",
//			url: "UserTableDataServlet",			
//			dataType: "html",
//			data: {"var": "empty", "pageName": "user-create", "screenType": "small"},
//			success: function(responseText){				
//				$("#tbody-table-user").html(responseText);						
//				},
//			error: function(request, error, data){
//					alert(error);				
//				}  						
//			});
			
		/*........searching time table load according to the search result.......*/				
		$("#input-text-user-search").keyup(function(){	 					 				
			var userTextChar1 = $("#input-text-user-search-text-box").val();	 				
			if(!(userTextChar1==""))  //if a character typed in search-bar
			{	 	 				 					  					
//				$.ajax({ 						
//					type: "GET",
//					url: "UserTableDataServlet",			
//					dataType: "html",
//					data: {"var": "filled","pageName": "user-create", "textChar": userTextChar1, "screenType": "small"},
//					success: function(responseText){										
//						$("#tbody-table-user").html(responseText);						
//							},
//					error: function(request, error, data){
//								alert(error);				
//							}  						
//					 });		
			}
			else  // if search bar is empty even after button typed (back-button,space)
			{		 					
//				$.ajax({
//					type: "GET",
//					url: "UserTableDataServlet",			
//					dataType: "html",
//					data: {"var": "empty", "pageName": "user-create", "screenType": "small"},
//					success: function(responseText){				
//						$("#tbody-table-user").html(responseText);						
//						},
//					error: function(request, error, data){
//							alert(error);				
//						}  						
//					});
			}	 			
		});
	}
	
	/*.......launch the user form.......*/
	$("#btn-user-create").click(function(){			
		$("#div-form-user-create").toggle();
	});

/*......load form each time when clicking on nav user......*/
	$("#li-tab-user-browse").click(function(){  
		$("#div-form-user-create").css("display","none");
		$("#div-form-user-create").load('form_user_create.jsp');
	}); 
}

/*......user form validation.........*/
function userCreateFormVal(domainName)
{	
	/*......check fields are not empty.........*/
	$("#input-form-user-fname, #input-form-user-lname, #input-form-user-phone, #input-form-user-add1, #input-form-user-add2, #input-form-user-city, #input-form-user-state, #input-form-user-zip").on('input', function() {
		var input=$(this);
		var is_name=input.val();
		if(is_name)
		{
			input.parent().removeClass("has-error").addClass("has-success");	    	
		}
		else
		{
			input.parent().addClass("has-error");
		}
	});

/*......check fields are empty.........*/	
	$("#input-form-user-fname,#input-form-user-lname, #input-form-user-phone, #input-form-user-email, #input-form-user-add1, #input-form-user-add2, #input-form-user-city, #input-form-user-state, #input-form-user-zip").blur(function(){		
		if(!$(this).val())
		{
			$(this).parent().addClass("has-error");
		}	  		  
	});

	/*........check for html injection......*/
	$("#input-form-user-fname, #input-form-user-lname, #input-form-user-phone, #input-form-user-add1, #input-form-user-add2, #input-form-user-email, #input-form-user-city, #input-form-user-state, #input-form-user-zip").on('input', function() {
		var input = $(this);
		var re = /(<([^>]+)>)/gi;
		var has_html_characters = re.test(input.val());
		if(has_html_characters){input.parent().addClass("has-error");}	
		else{input.parent().removeClass("has-error").addClass("has-success");}
	});
	
	/*.......first-name,last-name,city,state field validation........*/
	$("#input-form-user-fname, #input-form-user-lname, #input-form-user-city, #input-form-user-state").on('input', function() {
		var input = $(this);
		var re = /^[a-zA-Z]+(?:(?:\\s+|-)[a-zA-Z]+)*$/;
		var has_characters = re.test(input.val());
		if(has_characters){input.parent().removeClass("has-error").addClass("has-success");}	
		else{input.parent().addClass("has-error");}
	});
	
	/*.......phone,zip field validation........*/
	$("#input-form-user-phone, #input-form-user-zip").on('input', function() {
		var input = $(this);
		var re = /\d/g;
		var is_phone_zip = re.test(input.val());
		if(is_phone_zip){input.parent().removeClass("has-error").addClass("has-success");}	
		else{input.parent().addClass("has-error");}
	});
	
	$("#input-form-user-phone").on('input', function() {
		var input = $(this);
		var re = /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/;
		var is_phone_zip = re.test(input.val());
		if(is_phone_zip){input.parent().removeClass("has-error").addClass("has-success");}	
		else{input.parent().addClass("has-error");}
	});
	
	/*.......email field validation........*/
	$("#input-form-user-email").on('input', function() {
	    var input=$(this);
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    var is_email=re.test(input.val());
	    if(is_email){input.parent().removeClass("has-error").addClass("has-success");}
	    else{input.parent().addClass("has-error");}
	});   	
		
	/*......validation on user field select category......*/
	$("#select-form-user-category").blur(function(){
		  
		if($(this).val()=="Select Category")
		{
			$(this).parent().addClass("has-error");
		}
		else
		{
			$(this).parent().removeClass("has-error").addClass("has-success");
		}
	});


/*...............user-create Form Submission.................*/
var submitUserFormDetails;

submitUserFormDetails = function(){
	var $btn = $("#btn-form-user-submit").button('loading');
	var selector = ["#input-form-user-fname",
	                "#input-form-user-lname",
	                "#input-form-user-phone", 
	                "#input-form-user-email", 
	                "#input-form-user-add1", 	  
	                "#input-form-user-add2", 
	                "#input-form-user-city", 
	                "#input-form-user-state", 
	                "#input-form-user-zip",
	                "#select-form-user-category"];
	var userFormSubmitState="false";
	for(var i=0 ; i<selector.length ; i=i+1)
	{		
		if($(selector[i]).parent().hasClass("has-error") || $(selector[i]).val()=="")
		{
			userFormSubmitState= "false";						  
			break;
		}
		else
		{				 
			userFormSubmitState="true";			 
		}
	}
	 		
	if(userFormSubmitState=="true")
	{					
//		$.ajax({
//			type: "POST",
//			url: "UserFormSubmitServlet",
//			dataType: "json",
//			data: {"form_user_fname_text": $(selector[0]).val(),
//			"form_user_lname_text": $(selector[1]).val() ,
//			"form_user_phone_text": $(selector[2]).val() ,
//			"form_user_email_text": $(selector[3]).val(),
//			"form_user_add1_text": $(selector[4]).val() ,
//			"form_user_add2_text": $(selector[5]).val() ,
//			"form_user_city_text": $(selector[6]).val() ,
//			"form_user_state_text": $(selector[7]).val() ,
//			"form_user_zip_text": $(selector[8]).val() ,				 							 			
//			"form_user_category_select": $(selector[9]).val()},				
//			success: function(responseText){
//				$btn.button('reset');
//				alert('in success');
//				$("#div-form-user-create").load('form_user_create.jsp');
//				$("#div-form-user-create").toggle();				 				
//				alert(responseText["userStatus"]);
//					},
//			error: function(request, error, data){
//						alert(error);						
//						$btn.button('reset');
//				} 
//		});
	}
	else
	{
		alert("First Fill all the fields Properly");		
		$btn.button('reset');
	}	
};

$("#btn-form-user-submit").click(function(){
	submitUserFormDetails();
});	
}

/*............................user category-create OPEN......................... */

function userCatCreatePageScript(domainName)
{	
	/*...apply table headers of user-cat according to the screen-size....*/
	if($(window).width()>=750)
	{		
		var header="<tr><th>Select</th><th>Category Id</th><th>Catname</th></tr>";			
		$("#thead-usercat-table-header").html(header);
	}
	else
	{
		var header="<tr><th>Select</th><th>Cat Id</th><th>CatName</th></tr>";							      
		$("#thead-usercat-table-header").html(header);
	}
	
	
 	var userTextChar = $("#input-text-user-category-search").val();  	
//		$.ajax({
//			type: "GET",
//			url: "UserTableDataServlet",			
//			dataType: "json",
//			data: {"var": "empty", "pageName": "user-category", "screenType": "large"},
//			success: function(responseText){			
//				var userCatTable="";				
//		    	for(var i=0 ; i<responseText["usercatTable"].length ; i=i+1)
//        		{				        		
//		    		userCatTable =	userCatTable+"<tr><td><input type='checkbox' value="+responseText["usercatTable"][i].id+"></input>"+
//					"</td><td>"+responseText["usercatTable"][i].id+
//        			"</td><td>"+responseText["usercatTable"][i].name+
//        			"</td></tr>";
//				}		        		    	
//				$("#tbody-usercat-table-data").html(userCatTable);						
//			},
//			error: function(request, error, data){
//				alert(error);				
//			}  						
//		});
	

	$("#input-text-user-category-search").keyup(function(){ 			 				
		var userTextChar1 = $("#input-text-user-category-search").val();			
		if(!(userTextChar1==""))
		{
//			$.ajax({ 						
//				type: "GET",
//				url: "UserTableDataServlet",			
//				dataType: "json",							
//				data: {"var": "filled","pageName": "user-category", "textChar": userTextChar1},
//				success: function(responseText){	
//					
//					var userCatTable="";				
//			    	for(var i=0 ; i<responseText["usercatTable"].length ; i=i+1)
//	        		{				        		
//			    		userCatTable =	userCatTable+"<tr><td><input type='checkbox' value="+responseText["usercatTable"][i].id+"></input>"+
//						"</td><td>"+responseText["usercatTable"][i].id+
//	        			"</td><td>"+responseText["usercatTable"][i].name+
//	        			"</td></tr>";
//					}		        		    	
//					$("#tbody-usercat-table-data").html(userCatTable);						
//				},
//				error: function(request, error, data){
//					alert(error);				
//				}  						
//			});
		}
		else
		{
//				$.ajax({
//				type: "GET",
//				url: "UserTableDataServlet",			
//				dataType: "json",
//				data: {"var": "empty", "pageName": "user-category"},
//				success: function(responseText){				
//					var userCatTable="";				
//			    	for(var i=0 ; i<responseText["usercatTable"].length ; i=i+1)
//	        		{				        		
//			    		userCatTable =	userCatTable+"<tr><td><input type='checkbox' value="+responseText["usercatTable"][i].id+"></input>"+
//						"</td><td>"+responseText["usercatTable"][i].id+
//	        			"</td><td>"+responseText["usercatTable"][i].name+
//	        			"</td></tr>";
//					}		        		    	
//					$("#tbody-usercat-table-data").html(userCatTable);						
//				},
//				error: function(request, error, data){
//					alert(error);				
//				}  						
//			});
		}
	});	
	
	/*.......launch the user-category form.......*/
	$("#btn-user-category-create").click(function(){		
		$("#div-form-user-category-create").toggle();
	});

	/*......load form each time when clicking on nav user......*/
	$("#li-tab-user-category").click(function(){  
		$("#div-form-user-category-create").css("display","none");
		$("#div-form-user-category-create").load('form_user_category_create.jsp');
	});
}
/*.......user category form validation and submission........*/
function userCatCreateFormVal(domainName)
{
	$("#input-form-usercat-cname, #input-form-usercat-cdesc-text").on('input', function() {
		var input = $(this);
		var re = /(<([^>]+)>)/gi;
		var has_html_characters = re.test(input.val());
		if(has_html_characters){input.parent().addClass("has-error");}	
		else{input.parent().removeClass("has-error").addClass("has-success");}
	});

	$("#input-form-usercat-cname, #input-form-usercat-cdesc").blur(function(){			
		  if(!$(this).val())
		  {
			  $(this).parent().addClass("has-error");
		  }		  
	});

	
	$("#btn-form-usercat-submit").click(function(){
		var $btn = $(this).button('loading');
		var selector = ["#input-form-usercat-cname",
		                 "#input-form-usercat-cdesc"];
		var userFormSubmitState="false";
		for(var i=0 ; i<selector.length ; i=i+1)
		{		
			if($(selector[i]).parent().hasClass("has-error") || $(selector[i]).val()=="")
			{				
				userFormSubmitState = "false";
				alert("First Fill all the fields Properly");		
				$btn.button('reset');
				break;
			}
			else
			{
				userFormSubmitState="true";			 
			}
		}
		if(userFormSubmitState=="true")
		{
			alert('value inserted');	
//			$.ajax({
//				type: "POST",
//				url: "UserCatFormSubmitServlet",
//				dataType: "html",
//				data: {"usercat_cname_text": $(selector[0]).val(),
//						"usercat_cdesc_text": $(selector[1]).val()},				
//				success: function(responseText){
//					$("#div-form-user-category-create").toggle();
//					$("#div-form-user-category-create").load('form_user_category_create.jsp');
//					$btn.button('reset')				
//					},
//				error: function(request, error, data){
//					alert(error);
//					$btn.button('reset')
//					} 
//				});
		 }
	}); 	
}
/*............................usercat-create2 CLOSE......................... */	 