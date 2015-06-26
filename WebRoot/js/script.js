$(document).ready(function(){	
		
	var domainName = "http://dev.monoxor.com/";

	/*................... Javascript for Index page ......................*/

	$(".login-link").click(function(){	
		
		window.location.assign("login.jsp");
	});

/*................... Javascript for login page ......................*/

	var submitLoginForm;	
	submitLoginForm = function(login_username , login_password){		
		var $btn = $("#btn-submit-login-form").button('loading'); //explain button('loading')				
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
	
	$("#btn-submit-login-form").click(function(){	
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
	
	$('.parent').click(function() {		
		var subMenu = $(this).siblings('ul');		
		if ($(subMenu).hasClass('open')) {
			$(subMenu).fadeOut();
			$(subMenu).removeClass('open').addClass('closed');
		}
		else {
			$(subMenu).fadeIn();
			$(subMenu).removeClass('closed').addClass('open');
		}
		
		$('.parent').not(this).each(function(){
			var subMenu = $(this).siblings('ul');
			$(subMenu).fadeOut();
			$(subMenu).removeClass('open').addClass('closed');
		});
	});	
	
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
    	$( "#a-toggle-button-sidebar  span.glyphicon" ).removeClass("glyphicon-chevron-right");
    	$( "#a-toggle-button-sidebar  span.glyphicon" ).addClass("glyphicon-chevron-left");    	
    }
    function rightSidebarIcon()
    {    	
    	$( "#a-toggle-button-sidebar  span.glyphicon" ).removeClass("glyphicon-chevron-left");
    	$( "#a-toggle-button-sidebar  span.glyphicon" ).addClass("glyphicon-chevron-right");    	    
    }

	
	function toggleSidebar()
	{
		if ($('nav.sidebar').hasClass("sidebar-menu-collapsed")) 
		{								
			$(".side-icon").css("float","right");
			$(".bs-docs-sidenav").css("width","195px");
			$("#div-toggle-button-sidemenu").css("margin-bottom","30%");
			expandMyMenu();
			showMenuTexts();
			leftSidebarIcon();
			$(this).css({
			  color: "#999999"
			});
			if($(window).width()>="750")
			{								
				$("#div-page-content").css("padding-left","190px");
			}
			else
			{
				$("#div-page-content").css("padding-left","140px");
			}
		}
    	else if ($("nav.sidebar").hasClass("sidebar-menu-expanded"))
		{   
    		$(".side-icon").css("float","none");
			$(".bs-docs-sidenav").css("width","45px");
			$("#div-toggle-button-sidemenu").css("margin-bottom","60px");
			collapseMyMenu();
			hideMenuTexts();
			rightSidebarIcon();
			$(this).css({
			  color: "#999999"
			});
			if($(window).width()>="750")
			{
				$("#div-page-content").css("padding-left","40px");
			}
			else
			{
				$("#div-page-content").css("padding-left","40px");
			}			
        }				
	}

	$("#a-toggle-button-sidebar").click(function(){			
		//alert($(this).parent("nav.sidebar").hasClass("sidebar-menu-collapsed"));
		toggleSidebar();
	});
	
	//if screen size less than 750 than collapse sidemenu on click of menuitem
	if($(window).width()<="750")
	{		
		$("#a-sidemenu-item-user-management, #a-sidemenu-item-user-category, #a-sidemenu-item-inventory, #a-sidemenu-item-order").click(function(){			
			if($("nav.sidebar").hasClass("sidebar-menu-expanded"))
				toggleSidebar();
		});
	}	
	
	userCreatePageScript(domainName); //calling of user-management page script
	userCreateFormVal(domainName); //calling of user-mgmt validation page script
	
	userCatCreatePageScript(domainName); //calling of user-category page script
	userCatCreateFormVal(domainName); //calling of user-mgmt validation page script
	
	inventoryPageScript(domainName);
	
	orderPageScript(domainName); 
	
	
	invoicePageScript(domainName);
	invoiceCreateFormVal(domainName);
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
	$("#btn-form-user-create-reset").click(function(){				
		$("#div-create-user-sub-form").load('sub_form_user_create.jsp',function() {
			userCreateFormVal(domainName);
		});						
	});
	
	$( "#input-select-form-user-create-category" ).change(function () {	
		var text = $("#input-select-form-user-create-category option:selected").text();
		if(text=="CreateCategory")
		{
			$("#div-modal-form-user-create-category").modal('show');
		}
	});
				
	if($(window).width()<=380)
		$("#div-form-user-category-create-submit").removeClass("col-xs-5");

		
	/*...........Demo Table script OPEN...........*/
	var userTableDemoData="<tr><td><input type='checkbox' id='td-user-temp-1' value=''></input></td><td>1</td><td>Amit</td><td>amit.sharma@monoxor.com</td><td>9549554645</td></tr>";
	userTableDemoData = userTableDemoData+"<tr><td id='td-user-temp-1-next' colspan='5'></td></tr>";
	$("#tbody-table-user").html(userTableDemoData);	
	
	
	$("#td-user-temp-1").click(function(){				
		userTableRowEdit();
		$("#td-user-temp-1-next").toggle();
	});
	
	var userTableRowEdit;
	userTableRowEdit = function(){
		$("#td-user-temp-1-next").load('form_user_create.jsp',function(){
			userCreateFormVal(domainName);
			$("#td-user-temp-1-next #div-form-user-create-heading").css("display","none");
			$("#td-user-temp-1-next #div-create-user-sub-form #div-form-user-create-line-1 #div-form-user-create-fname #input-text-form-user-create-fname").val("Amit");			
			$("#td-user-temp-1-next #div-create-user-sub-form #div-form-user-create-line-1 #div-form-user-create-lname #input-text-form-user-create-lname").val("Sharma");
			$("#td-user-temp-1-next #div-create-user-sub-form #div-form-user-create-line-1 #div-form-user-create-category #input-select-form-user-create-category").val("demo-category");
			$("#td-user-temp-1-next #div-create-user-sub-form #div-form-user-create-line-2 #div-form-user-create-phone #input-text-form-user-create-phone").val("9549554645");
			$("#td-user-temp-1-next #div-create-user-sub-form #div-form-user-create-line-2 #div-form-user-create-email #input-text-form-user-create-email").val("amit@demo.com");
			$("#td-user-temp-1-next #div-create-user-sub-form #div-form-user-create-line-3 #div-form-user-create-add-1 #input-text-form-user-create-add-1").val("demo address-1");
			$("#td-user-temp-1-next #div-create-user-sub-form #div-form-user-create-line-3 #div-form-user-create-add-2 #input-text-form-user-create-add-2").val("demo address-2");
			$("#td-user-temp-1-next #div-create-user-sub-form #div-form-user-create-line-4 #div-form-user-create-city #input-text-form-user-create-city").val("alwar");
			$("#td-user-temp-1-next #div-create-user-sub-form #div-form-user-create-line-4 #div-form-user-create-state #input-text-form-user-state").val("rajasthan");
			$("#td-user-temp-1-next #div-create-user-sub-form #div-form-user-create-line-4 #div-form-user-create-zip #input-text-form-user-create-zip").val("301001");

			$("#td-user-temp-1-next #div-form-user-create-line-5 #div-form-user-create-reset #btn-form-user-create-reset").click(function(){
				resetUserFun();
			});
		});						
	};

	var resetUserFun = function(){
		$("#td-user-temp-1-next").load('form_user_create.jsp',function(){
			$("#td-user-temp-1-next #div-form-user-create-heading").css("display","none");
			userCreateFormVal(domainName);
			$("#td-user-temp-1-next #div-form-user-create-line-5 #div-form-user-create-reset #btn-form-user-create-reset").click(function(){
				resetUserFun();
			});
		});
	};
	/*.......Demo table row edit script CLOSE......*/
	
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
	$("#input-text-form-user-create-fname, #input-text-form-user-crate-lname, #input-text-form-user-create-phone, #input-text-form-user-create-add-1, #input-text-form-user-create-add-2, #input-text-form-user-create-city, #input-text-form-user-state, #input-text-form-user-create-zip").on('input', function() {
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
	$("#input-text-form-user-create-fname,#input-text-form-user-crate-lname, #input-text-form-user-create-phone, #input-text-form-user-create-email, #input-text-form-user-create-add-1, #input-text-form-user-create-add-2, #input-text-form-user-create-city, #input-text-form-user-state, #input-text-form-user-create-zip").blur(function(){		
		if(!$(this).val())
		{
			$(this).parent().addClass("has-error");
		}	  		  
	});

	/*........check for html injection......*/
	$("#input-text-form-user-create-fname, #input-text-form-user-crate-lname, #input-text-form-user-create-phone, #input-text-form-user-create-add-1, #input-text-form-user-create-add-2, #input-text-form-user-create-email, #input-text-form-user-create-city, #input-text-form-user-state, #input-text-form-user-create-zip").on('input', function() {
		var input = $(this);
		var re = /(<([^>]+)>)/gi;
		var has_html_characters = re.test(input.val());
		if(has_html_characters){input.parent().addClass("has-error");}	
		else{input.parent().removeClass("has-error").addClass("has-success");}
	});
	
	/*.......first-name,last-name,city,state field validation........*/
	$("#input-text-form-user-create-fname, #input-text-form-user-crate-lname, #input-text-form-user-create-city, #input-text-form-user-state").on('input', function() {
		var input = $(this);
		var re = /^[a-zA-Z]+(?:(?:\\s+|-)[a-zA-Z]+)*$/;
		var has_characters = re.test(input.val());
		if(has_characters){input.parent().removeClass("has-error").addClass("has-success");}	
		else{input.parent().addClass("has-error");}
	});
	
	/*.......phone,zip field validation........*/
	$("#input-text-form-user-create-phone, #input-text-form-user-create-zip").on('input', function() {
		var input = $(this);
		var re = /\d/g;
		var is_phone_zip = re.test(input.val());
		if(is_phone_zip){input.parent().removeClass("has-error").addClass("has-success");}	
		else{input.parent().addClass("has-error");}
	});
	
	$("#input-text-form-user-create-phone").on('input', function() {
		var input = $(this);
		var re = /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/;
		var is_phone_zip = re.test(input.val());
		if(is_phone_zip){input.parent().removeClass("has-error").addClass("has-success");}	
		else{input.parent().addClass("has-error");}
	});
	
	/*.......email field validation........*/
	$("#input-text-form-user-create-email").on('input', function() {
	    var input=$(this);
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    var is_email=re.test(input.val());
	    if(is_email){input.parent().removeClass("has-error").addClass("has-success");}
	    else{input.parent().addClass("has-error");}
	});   	
		
	/*......validation on user field select category......*/
	$("#input-select-form-user-create-category").blur(function(){
		  
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
	var $btn = $("#btn-form-user-create-submit").button('loading');
	var selector = ["#input-text-form-user-create-fname",
	                "#input-text-form-user-crate-lname",
	                "#input-text-form-user-create-phone", 
	                "#input-text-form-user-create-email", 
	                "#input-text-form-user-create-add-1", 	  
	                "#input-text-form-user-create-add-2", 
	                "#input-text-form-user-create-city", 
	                "#input-text-form-user-state", 
	                "#input-text-form-user-create-zip",
	                "#input-select-form-user-create-category"];
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

$("#btn-form-user-create-submit").click(function(){
	submitUserFormDetails();
});	
}

/*............................user category-create OPEN......................... */

function userCatCreatePageScript(domainName)
{	
	if($(window).width()<=380)
	{				
		$("#div-form-user-category-create-submit").removeClass("col-xs-5");
	}
	
	$("#btn-form-user-category-create-reset").click(function(){		
		$("#div-create-user-category-sub-form").load('sub_form_user_category_create.jsp');		
		userCatCreateFormVal(domainName);
	});
		
	/*...apply table headers of user-cat according to the screen-size....*/
	if($(window).width()>=750)
	{		
		var header="<tr><th>Select</th><th>Category Id</th><th>Catname</th></tr>";			
		$("#thead-table-user-category").html(header);
	}
	else
	{
		var header="<tr><th>Select</th><th>Cat Id</th><th>CatName</th></tr>";							      
		$("#thead-usercat-table-header").html(header);
	}	
	
	/*...........Demo Table script OPEN...........*/
	var userCatTableDemoData="<tr><td><input type='checkbox' id='td-user-cat-temp-1' value=''></input></td><td>1</td><td>customer</td></tr>";
	userCatTableDemoData = userCatTableDemoData+"<tr><td id='td-user-cat-temp-1-next' colspan='5'></td></tr>";
	$("#tbody-table-user-category").html(userCatTableDemoData);	
	
	
	$("#td-user-cat-temp-1").click(function(){			
		userCatTableRowEdit();
		$("#td-user-cat-temp-1-next").toggle();
	});
	
	var userCatTableRowEdit;
	userCatTableRowEdit = function(){		
		$("#td-user-cat-temp-1-next").load('form_user_category_create.jsp',function(){
			userCatCreateFormVal(domainName);
			$("#td-user-cat-temp-1-next #div-form-user-category-create-heading").css("display","none");
			$("#td-user-cat-temp-1-next #div-create-user-category-sub-form #div-form-user-category-create-name #input-text-form-user-category-create-name").val("Demo Customer");			
			$("#td-user-cat-temp-1-next #div-create-user-category-sub-form #div-form-user-category-create-description #input-text-form-user-category-create-description").val("Demo Description");

			$("#td-user-cat-temp-1-next #div-form-user-category-create-footer #div-form-user-category-create-reset #btn-form-user-category-create-reset").click(function(){
				resetUserCatFun();
			});
		});						
	};

	var resetUserCatFun = function(){
		$("#td-user-cat-temp-1-next").load('form_user_category_create.jsp',function(){
			$("#td-user-cat-temp-1-next #div-form-user-category-create-heading").css("display","none");
				userCatCreateFormVal(domainName);
			$("#td-user-cat-temp-1-next #div-form-user-category-create-footer #div-form-user-category-create-reset #btn-form-user-category-create-reset").click(function(){
				resetUserCatFun();
			});
		});
	};
	/*.......Demo table row edit script CLOSE......*/
	
	
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
	$("#input-text-form-user-category-create-name, #input-text-form-user-category-create-description-text").on('input', function() {
		var input = $(this);
		var re = /(<([^>]+)>)/gi;
		var has_html_characters = re.test(input.val());
		if(has_html_characters){input.parent().addClass("has-error");}	
		else{input.parent().removeClass("has-error").addClass("has-success");}
	});

	$("#input-text-form-user-category-create-name, #input-text-form-user-category-create-description").blur(function(){				
		  if(!$(this).val())
		  {
			  $(this).parent().addClass("has-error");
		  }		  
	});

	
	$("#btn-form-user-category-create-submit").click(function(){
		var $btn = $(this).button('loading');
		var selector = ["#input-text-form-user-category-create-name",
		                 "#input-text-form-user-category-create-description"];
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

/*............................user-create script OPEN......................... */	
function inventoryPageScript(domainName)
{		
	/*.......launch the inventory form.......*/
	$("#btn-inventory-create").click(function(){			
		$("#div-form-inventory-create").toggle();
	});
	
	if($(window).width()<=380)
	{				
		$("#div-form-inventory-create-save").removeClass("col-md-3 col-sm-2 col-xs-6 col-md-offset-1 col-sm-offset-1").addClass('row');		
		$("#input-btn-submit-form-inventory-create").css({"margin-left": "20%"});
		$("#input-btn-edit-form-inventory-create").css({"margin-top": "10px", "margin-left": "40%"});
	}	
	
	$("#btn-modal-form-inventory-category-create-toggle").click(function(){
		$("#div-modal-sub-form-inventory-category-create").toggle();
	});
	//load validation on page load
	inventoryFormValid();
	
	var selectBoxCount = 0;
	//product selection (sku based)
	$.fn.makeParentCateogryDiv = function(parentCategory){  			
//		$.ajax({ 						
//			type: "GET",
//			url: "InventoryAjaxFetch",			
//			dataType: "json",
//			data: {"fetch":"subCategories","parentCategory":parentCategory},
//			success: function(responseText){
//				$.fn.createsubCategorySelectDiv(responseText);				
//				$.fn.refreshInventorySelect();
//			},
//			error: function(request, error, data){
//				alert(error);
//				alert(data); 
//			}  						
//		});
	}
	//first this function will call and set sub categories for parent-root
	$.fn.makeParentCateogryDiv(1);
	
	//create sub categories in another dropdown box after clicking on child
	$.fn.createsubCategorySelectDiv = function(responseText){    
		selectBoxCount=selectBoxCount+1;
		var divStart="<div class='form-inventory-status form-group col-sm-3 col-md-3 col-xs-6'>" +
		"<select class='select-inventory-subCategory-"+selectBoxCount+" form-control val-empty'>" +
			"<option>Select sub-category</option>";
		
		var subCategoryList="";
		for(var i=0 ; i<responseText["subCategoryList"].length ; i=i+1)
		{				
			subCategoryList = subCategoryList+"<option value="+responseText["subCategoryList"][i].id+">"+responseText["subCategoryList"][i].name+"</option>";
		}
		var divEnd = "</select></div>";
		var categoryConstructedDiv = divStart+subCategoryList+divEnd;		
		var oldSelectedBoxCount = selectBoxCount-1;				
		$("#div-select-inventory-product").append(categoryConstructedDiv);				
		$( ".select-inventory-subCategory-"+selectBoxCount).change(function() {					
			$.fn.makeParentCateogryDiv($(this).val());
		});
		
		//this script must place at last in this function 
		if(oldSelectedBoxCount>0)
		{			
			 $(".select-inventory-subCategory-"+oldSelectedBoxCount).prop('disabled',true);
	          $(".select-inventory-subCategory-"+oldSelectedBoxCount).selectpicker('refresh');
		}
	}
	//refresh product select section
	$.fn.refreshInventorySelect = function(){
		$("#btn-inventory-select-refresh").click(function(){			
			$("#div-inventory-product-select").load('inventory_product_select.jsp');			
			//assign script back
			$.fn.makeParentCateogryDiv(1);
			$.fn.refreshInventorySelect();
			
		});
	}
	//inventory category inserted to list
//	$.ajax({ 						
//		type: "GET",
//		url: "InventoryAjaxFetch",			
//		dataType: "json",
//		data: {"fetch":"categories","var": "empty"},
//		success: function(responseText){			
//			var productCategoryList="<a id='a-inventory-create-listItem' data-toggle='modal' data-target='.productcategory-create-modal' class='list-group-item cursorPointer'>Create Category</a>";			
//			for(var i=0 ; i<responseText["ProductCategory"].length ; i=i+1)
//    		{				        		
//				productCategoryList =	productCategoryList+"<a id="+responseText["ProductCategory"][i].id+" class='inventory-search-text list-group-item cursorPointer'>"+responseText["ProductCategory"][i].name+"</a>";
//			}		  				
//			$("#div-inventory-category-item-list").html(productCategoryList);
//			$(".inventory-search-text").click(function(e){
//				  $.fn.setInventoryText(e);
//			});			
//			$("#a-inventory-create-listItem").click(function(){		
//				$.fn.setTaxPercentTxtScript();
//			});
//		},
//		error: function(request, error, data){
//			alert(error);
//			alert(data); 
//		}  						
//	});
	
	//inventory category fetching according to typed text 
	$("#input-select-form-inventory-create-category").keyup(function(){					
		var userTextChar1 = $("#input-select-form-inventory-create-category").val();	 				
		if(!(userTextChar1==""))  //if a character typed in search-bar
		{	 	 				 					  					
//			$.ajax({ 						
//				type: "GET",
//				url: "InventoryAjaxFetch",			
//				dataType: "json",
//				data: {"fetch":"categories","var": "filled", "textChar": userTextChar1},
//				success: function(responseText){							
//					var productCategoryList="<a data-toggle='modal' data-target='.productcategory-create-modal' class='list-group-item cursorPointer'>Create Category</a>";
//					//alert(responseText);
//					for(var i=0 ; i<responseText["ProductCategory"].length ; i=i+1)
//	        		{				        		
//						productCategoryList =	productCategoryList+"<a id="+responseText["ProductCategory"][i].id+" class='inventory-search-text list-group-item cursorPointer'>"+responseText["ProductCategory"][i].name+"</a>";
//					}		  						
//					$("#div-inventory-category-item-list").html(productCategoryList);
//					$(".inventory-search-text").click(function(e){
//						  $.fn.setInventoryText(e);
//					});
//					
//				},
//				error: function(request, error, data){
//					alert(error);
//					alert(data);
//				}  						
//			});		
		} 
		else
		{
//			$.ajax({ 						
//				type: "GET",
//				url: "InventoryAjaxFetch",			
//				dataType: "json",
//				data: {"fetch":"categories","var": "empty","textChar": userTextChar1},
//				success: function(responseText){							
//					var productCategoryList="<a data-toggle='modal' data-target='.productcategory-create-modal'class='list-group-item cursorPointer'>Create Category</a>";
//					//alert(responseText);
//					for(var i=0 ; i<responseText["ProductCategory"].length ; i=i+1)
//	        		{				        		
//						productCategoryList = productCategoryList+"<a id="+responseText["ProductCategory"][i].id+" class='inventory-search-text list-group-item cursorPointer'>"+responseText["ProductCategory"][i].name+"</a>";
//					}		  						
//					$("#div-inventory-category-item-list").html(productCategoryList);					
//					$(".inventory-search-text").click(function(e){												
//						 $.fn.setInventoryText(e);
//					});
//					
//				},
//				error: function(request, error, data){
//					alert(error);
//					alert(data);
//				}  						
//			});
		}												
	});
	
	
	//set selected text to Search Category textbox
	var inventory_cat_id; //selected category id
	
	$.fn.setInventoryText = function(e){ 		 
		inventory_cat_id = $(e.target).attr("id");
		var txt = $(e.target).text();		
		$("#input-select-form-inventory-create-category").val(txt);
	}
	
	
	//inventrory-Category creat form taxPercent appearance
	$.fn.setTaxPercentTxtScript = function(e){		
		$( "#input-select-inventory-category-create-parent-category" ).change(function () {			
			var parentCatName = $("#input-select-inventory-category-create-parent-category option:selected").text();
			if(parentCatName == "root")
			{
				$("#div-modal-inventory-create-category-tax-percent").removeClass("to-none").addClass("to-display");
			}
			else
			{
				$("#div-modal-inventory-create-category-tax-percent").removeClass("to-display").addClass("to-none");				
				$("#input-form-inventory-category-create-tax-percent").val('');
			}
		});	
	}
	
	//inventory-Category create form submission	
	$("#btn-modal-inventory-category-create-submit").click(function(){			
		var selector = ["#input-modal-inventory-category-create-name"];		
		$.fn.createInvCategoryFormValid(selector);			
	//alert(name+" "+parentCat.trim());
	});
	
	//validation inventory-cateogry create form then submittion
	$.fn.createInvCategoryFormValid = function(selector){
		var invCategoryCreateState="false";		
		
		for(var i=0 ; i<selector.length ; i=i+1)
		{		
			if($(selector[i]).parent().hasClass("has-error") || $(selector[i]).val()=="")
			{
				invCategoryCreateState= "false";						  
				break;
			}
			else
			{				 
				invCategoryCreateState="true";			 
			}
		}
		var parentCatName = $("#input-select-inventory-category-create-parent-category option:selected").text();
		if(parentCatName == "root" && ($("#input-form-inventory-category-create-tax-percent").parent().hasClass("has-error") || $("#input-form-inventory-category-create-tax-percent").val()==""))
		{
			invCategoryCreateState= "false";
		}
		
		if(invCategoryCreateState=="true")
		{			
			var categoryName = $("#input-modal-inventory-category-create-name").val();
			var parentCatName = $("#input-select-inventory-category-create-parent-category option:selected").text();
			var parentCatId = $("#input-select-inventory-category-create-parent-category").val();
			var taxPercent = $("#input-form-inventory-category-create-tax-percent").val();	
//			$.ajax({
//				type: "POST",
//				url: "InventoryAjaxInsert",			
//				dataType: "json",
//				data: {"requestType": "makeInventoryCategory",
//						"categoryName": categoryName,
//						"parentCatName":parentCatName.trim(), 
//						"parentCatId" : parentCatId,
//						"taxPercent" : taxPercent
//					 },
//				success: function(responseText){	
//						 //check if category is available there 
//						 var error_code = responseText["error_code"];
//						 if(error_code=="")
//						 {
//							 if(responseText["categoryAvailabile"]=="true")
//							 {
//								 alert('category available');
//							 }
//							 else
//							 {
//								var newCategory= "<a class='inventory-search-text list-group-item cursorPointer'>"+categoryName+"</a>"; 
//								$("#div-inventory-category-item-list").append(newCategory);
//								$(".inventory-search-text").click(function(e){
//									  $.fn.setInventoryText(e);
//								});
//								$('.productcategory-create-modal').modal('hide');
//								
//								$("#div-form-invCategory-fields").load('sub_form_create_inventory_cat.jsp');
//								inventoryFormValid();
//								$.fn.setTaxPercentTxtScript();
//							 }
//						 }
//						 else
//						 {
//							 var error_message=getErrorMessage(error_code);
//							 alert(error_message);
//						 }
//				},
//				error: function(request, error, data){
//					alert(error);				
//				}  						
//			});						
		}
		else
		{
			alert("First Fill all the fields Properly");					
		}
	}
		
	// submit create market place form
	 $("#btn-form-invMarketplace-submit").click(function(){		
		
		var selector = ["#select-form-pMarketplace-name",
		                "#input-form-pMarketplace-url"];	
		$.fn.createMarketplaceFormValid(selector);		
	});	
	 
	// no. of marketplaces for each product 
		var marketplaceCount=0;
	//validation of marketplace form submission
	$.fn.createMarketplaceFormValid = function(selector){
		var marketplaceCreateState="false";		
		for(var i=0 ; i<selector.length ; i=i+1)
		{					
			if($(selector[i]).parent().hasClass("has-error") || $(selector[i]).val()=="")
			{
				marketplaceCreateState= "false";						  
				break;
			}
			else
			{				 
				marketplaceCreateState="true";			 
			}
		}
						 	
		if(marketplaceCreateState=="true")
		{		
			//alert(marketplaceCount);			
			marketplaceCount=marketplaceCount+1;
			
			
			var mplaceName = $(selector[0]+" option:selected").text();
			var mplaceId = $(selector[0]).val();
			var mplaceUrl = $(selector[1]).val();
			//alert(mplaceName+ " "+ mplaceUrl);
//			var RowShow = "<tr class='active to-diplay'>" +
//			"<td><input type='checkbox' value="+marketplaceCount+" onClick='checkboxInventoryTable(this)'/></td>" +
//				"<td>"+mplaceName+"</td><td>"+mplaceUrl+"</td>" +
//				"<td><input type='text' id='input-form-inventory-sellPrice"+marketplaceCount+"' class='form-control val-empty'/></td>" +
//				"<td><input type='text' id='input-text-form-invenotry-create-stock"+marketplaceCount+"' class='form-control val-empty'/></td>" +
//				"<td><td><select id='input-form-inventory-status"+marketplaceCount+"' class='form-control val-empty'><option>Active</option><option>Inactive</option></td>" +
//				"<td></td>" +
//			"</tr>";
			var RowEdit = "<tr class='active to-diplay'>" +
					"<td><input type='checkbox' value="+marketplaceCount+" onClick='checkboxInventoryTable(this)'/></td>" +
						"<td><span id='span-form-inventory-mplaceName"+marketplaceCount+"' data-form-mplace"+marketplaceCount+"='"+mplaceId+"'>"+mplaceName+"</span></td><td><span id='span-form-inventory-mplaceUrl"+marketplaceCount+"'>"+mplaceUrl+"</span></td>" +
						"<td><input type='text' id='input-form-inventory-sellPrice"+marketplaceCount+"' class='form-control val-empty'/></td>" +
						"<td><input type='text' id='input-text-form-invenotry-create-stock"+marketplaceCount+"' class='form-control val-empty'/></td>" +
						"<td><select id='input-form-inventory-status"+marketplaceCount+"' class='form-control val-empty'><option>Active</option><option>Inactive</option></td>" +
						"<td></td>" +
					"</tr>";			
			$('.marketplace-create-modal').modal('hide');
			
			//refresh modal content after successfully submission
			$("#div-form-invMarketplace-fields").load('sub_form_create_marketplace.jsp');
			
			//assign scirpt again to refreshed elements  
			inventoryFormValid();
			
			$("#inventoryTable #tbody-table-form-inventory-create").append(RowEdit);					
						
//			$(".class-inventory-checkbox").click(function(){
//				alert('hello2');
//			});
			//$("#div-create-marketplace-form").load('form_create_marketplace.jsp'); 									
		}
		else
		{
			alert("First Fill all the fields Properly");					
		}	
	}
	
	//refresh inventory-Category create form after clicking on close button
	$("#btn-modal-inventory-category-create-close").click(function(){		
		$("#div-form-invCategory-fields").load('sub_form_create_inventory_cat.jsp');		
	});
	
	// for tag ids ajax fetch
	$("#input-form-inventory-tagId").keyup(function(){		
		var tagChar = $("#input-form-inventory-tagId").val();	 				
			 	 				 					  					
//		$.ajax({ 						
//			type: "GET",
//			url: "InventoryAjaxFetch",			
//			dataType: "json",
//			data: {"fetch":"tagsIds","tagChar": tagChar},
//			success: function(responseText){						
//				var tagIds = "";				
//				for(var i=0 ; i<responseText["tagsList"].length ; i=i+1)
//				{
//					tagIds = tagIds+"<a id='' class='list-group-item tagsId-list-item cursorPointer'>"+responseText["tagsList"][i].name+"</a>";
//				}								
//				$("#div-inventory-create-tag-fetch-list").html(tagIds);
//				$(".tagsId-list-item").click(function(e){
//					$.fn.setInvTagsIdText(e);
//				});					
//			},
//			error: function(request, error, data){
//				alert(error);
//				alert(data);
//			}  						
//		});													
	});
	
	$.fn.setInvTagsIdText = function(e){ 		 
		inventory_tag_id = $(e.target).attr("id");
		var txt = $(e.target).text();		
		$("#input-text-form-inventory-create-tags").val(txt);
		$("#div-inventory-create-tag-fetch-list").html("");
	}
	
	$("#input-btn-submit-form-inventory-create").click(function(){					
		var $btn = $("#input-btn-submit-form-inventory-create").button('loading');
		
		var selector = ["#input-text-form-inventory-create-base-sku",
		                "#input-text-form-inventory-create-name",
		                "#input-text-form-inventory-create-maxprice", 
		                "#input-text-form-invenotry-create-minprice", 
		                "#input-text-form-invenotry-create-stock", 	  
		                "#input-select-form-inventory-create-category", 
		                "#input-select-form-inventory-create-category", 
		                "#input-text-form-inventory-create-tags"];
		
		//passing selector and marketplaceCount to the function
		$.fn.inventoryEntryFormValid(selector,marketplaceCount);		
		
	});	
	
	//validation of fields
	$.fn.inventoryEntryFormValid = function(selector,marketplaceCount){				
		
		var inventoryFullSubmitState="false";
		for(var i=0 ; i<selector.length ; i=i+1)
		{		
			if($(selector[i]).parent().hasClass("has-error") || $(selector[i]).val()=="")
			{				
				inventoryFullSubmitState= "false";						  
				break;
			}
			else
			{				 				
				inventoryFullSubmitState="true";			 
			}
		}
		 		
		if(inventoryFullSubmitState=="true")
		{					
			$.fn.submitInventoryForm(selector,marketplaceCount);
		}
		else
		{
			alert("First Fill all the fields Properly");		
			$btn.button('reset');
		}						
	}
	
	$.fn.submitInventoryForm = function(selector,marketplaceCount){						
		var inventory_sku = $(selector[0]).val();
		var inventory_name = $(selector[1]).val();
		var inventory_maxPrice = $(selector[2]).val();
		var inventory_minPrice = $(selector[3]).val();
		var inventory_stock = $(selector[4]).val();
		var inventory_status = $(selector[5]).val();
		var category_search = $(selector[6]).val();
		var inventory_tagId = $(selector[7]).val();
					
		var inventoryForm_json_txt = '{"inventory_sku":"'+inventory_sku+'","inventory_name":"'+inventory_name+'","inventory_maxPrice":"'+inventory_maxPrice+'","inventory_minPrice":"'+inventory_minPrice+'","inventory_stock":"'+inventory_stock+'","inventory_status":"'+inventory_status+'","category_search":"'+category_search+'","inventory_tagId":"'+inventory_tagId+'","selected_cat_id":"'+inventory_cat_id+'"}';		
		var inventoryForm_json_obj = JSON.parse(inventoryForm_json_txt);			
		
		var data_jsonPre = '{"marketplaceEntries":[';
		var data_jsonMid ="";
		var data_jsonPost = ']}';		
		for(var i=1 ; i<=marketplaceCount ; i=i+1)
		{					
			var pMarketplace_name = $("#span-form-inventory-mplaceName"+i).text();
			var pMarketplace_id = $("#span-form-inventory-mplaceName"+i).attr("data-form-mplace"+i);			
			var pMarketplace_url = $("#span-form-inventory-mplaceUrl"+i).text();			
			var sellPrice = $("#input-form-inventory-sellPrice"+i).val();
			var stock = $("#input-text-form-invenotry-create-stock"+i).val();
			var status = $("#input-form-inventory-status"+i).val();				
			if(i<marketplaceCount)
			{
				data_jsonMid = data_jsonMid+'{"pMarketplace_id":"'+pMarketplace_id+'","pMarketplace_name":"'+pMarketplace_name+'","pMarketplace_url":"'+pMarketplace_url+'","sellPrice": "'+sellPrice+'","stockPrice": "'+stock+'","status": "'+status+'"},';
			}			
			else // for last line without ','
			{
				data_jsonMid = data_jsonMid+'{"pMarketplace_id":"'+pMarketplace_id+'","pMarketplace_name":"'+pMarketplace_name+'","pMarketplace_url":"'+pMarketplace_url+'","sellPrice": "'+sellPrice+'","stockPrice": "'+stock+'","status": "'+status+'"}';
			}				
		}		 
		var marketplaceEntry_json_txt = data_jsonPre+data_jsonMid+data_jsonPost;		
		var marketplaceEntry_json_obj = JSON.parse(marketplaceEntry_json_txt);							
		 
//		$.ajax({
//			type: "POST",
//			url: "InventoryAjaxInsert",			
//			dataType: "json",
//			data: {"requestType": "makeFinalInventory",
//					"inventoryForm_json_obj": JSON.stringify(inventoryForm_json_obj),
//					"marketplaceEntry_json_obj": JSON.stringify(marketplaceEntry_json_obj),
//					"marketplaceCount" : marketplaceCount
//				 },
//			success: function(responseText){			
//					 var $btn = $("#input-btn-submit-form-inventory-create").button('reset');
//					 //check if category is available there 
//					 var error_code = responseText["error_code"];
//					 if(error_code=="")
//					 {
//						 $("#div-inventory-page").load('inventory.jsp');
//						alert('success');						
//					 }
//					 else
//					 {
//						 var error_message=getErrorMessage(error_code);
//						 alert(error_message);
//					 }
//			},
//			error: function(request, error, data){				
//				alert(error);				
//			}  						
//		});	
	}

}

function inventoryFormValid()
{		
	/*......check inventory form fields are not empty.........*/
	$("#input-text-form-inventory-create-base-sku, #input-text-form-inventory-create-name,#input-txt-form-inventory-create-category,#input-text-form-invenotry-create-stock, #input-text-form-inventory-create-maxprice, #input-text-form-invenotry-create-minprice,#input-text-form-invenotry-create-weight,#input-text-form-invenotry-create-procurement-time, #input-text-form-invenotry-create-stock, #input-text-form-inventory-create-tags, #input-form-pMarketplace-name, #input-form-pMarketplace-url, #input-modal-inventory-category-create-name, #input-form-inventory-category-create-tax-percent").on('input', function() {
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
	
	/*......check inventory form fields are empty.........*/	
	$("#input-text-form-inventory-create-base-sku, #input-text-form-inventory-create-name,#input-txt-form-inventory-create-category,#input-text-form-invenotry-create-stock, #input-text-form-inventory-create-maxprice, #input-text-form-invenotry-create-minprice,#input-text-form-invenotry-create-weight,#input-text-form-invenotry-create-procurement-time, #input-text-form-invenotry-create-stock, #input-text-form-inventory-create-tags, #input-form-pMarketplace-name, #input-form-pMarketplace-url, #input-modal-inventory-category-create-name, #input-form-inventory-category-create-tax-percent").blur(function(){		
		if(!$(this).val())
		{
			$(this).parent().addClass("has-error");
		}	  		  
	});	
	
	/*......validation on inve field select category......*/
	$("#input-select-form-invenotry-create-brand,#input-select-form-invenotry-create-tax,#input-select-form-inventory-create-supplier,#input-select-form-invenotry-create-status,#input-select-form-invenotry-create-warehouse,#input-select-form-invenotry-create-aisle,#input-select-form-invenotry-create-location,#input-select-form-invenotry-create-shelf,#input-select-form-invenotry-create-box").blur(function(){		 
		if($(this).val()=="Select Brand" || $(this).val()=="Select Tax" || $(this).val()=="Select Supplier" || $(this).val()=="Select Status"|| $(this).val()=="Select Warehouse"|| $(this).val()=="Select Aisle"|| $(this).val()=="Select Location"|| $(this).val()=="Select Shelf"|| $(this).val()=="Select Box")
		{
			$(this).parent().addClass("has-error");
		}
		else
		{
			$(this).parent().removeClass("has-error").addClass("has-success");
		}
	});
}

/*..........................Invoice Script OPEN...........................*/
function invoicePageScript(domainName)
{
	/*.......launch the invoice form.......*/
	$("#btn-invoice-create").click(function(){			
		$("#div-form-invoice-create").toggle();
	});	                	
	
}

function invoiceCreateFormVal(domainName)
{
	/*......check fields are not empty.........*/
	$("#input-text-form-user-create-order-id, #input-text-form-user-create-marketplace, #input-text-form-user-create-marketplace-order-id, #input-text-form-user-create-customer-name, #input-text-form-user-create-order-total, #input-text-form-user-create-amount-recieved, #input-text-form-user-create-commission, #input-text-form-user-create-record-date").on('input', function() {
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
	$("#input-text-form-user-create-order-id, #input-text-form-user-create-marketplace, #input-text-form-user-create-marketplace-order-id, #input-text-form-user-create-customer-name, #input-text-form-user-create-order-total, #input-text-form-user-create-amount-recieved, #input-text-form-user-create-commission, #input-text-form-user-create-record-date").blur(function(){		
		if(!$(this).val())
		{
			$(this).parent().addClass("has-error");
		}	  		  
	});
	
/*...............user-create Form Submission.................*/
var submitInvoiceFormDetails;

submitInvoiceFormDetails = function(){
	var $btn = $("#btn-form-invoice-create-pay-invoice").button('loading');
	var selector = ["#input-text-form-user-create-order-id",
	                "#input-text-form-user-create-marketplace",
	                "#input-text-form-user-create-marketplace-order-id", 
	                "#input-text-form-user-create-customer-name", 
	                "#input-text-form-user-create-order-total", 	  
	                "#input-text-form-user-create-amount-recieved", 
	                "#input-text-form-user-create-commission", 
	                "#input-text-form-user-create-record-date"];
	var invoiceFormSubmitState="false";
	for(var i=0 ; i<selector.length ; i=i+1)
	{		
		if($(selector[i]).parent().hasClass("has-error") || $(selector[i]).val()=="")
		{
			invoiceFormSubmitState= "false";						  
			break;
		}
		else
		{				 
			invoiceFormSubmitState="true";			 
		}
	}
	 		
	if(invoiceFormSubmitState=="true")
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

$("#btn-form-user-create-submit").click(function(){
	submitInvoiceFormDetails();
});
}

function orderPageScript(domainName)
{	
	var orderLineCount = 0;
	/*.......launch the order form.......*/
	$("#btn-order-create").click(function(){			
		$("#div-form-order-create").toggle();
	});
	
	$('#input-date-form-order-create-order-date').datepicker({
		format: "dd/mm/yyyy"
	
	}); 
	$("#btn-form-order-line-create-add-line").click(function(){	
		orderLineCount= orderLineCount+1;
		$("#tbody-table-order-line").append("<tr><td id='td-form-order-create-order-line-sno-'"+orderLineCount+">"+orderLineCount+"</td>" +
												"<td id='td-form-order-create-order-line-title-'"+orderLineCount+"><input type='text' id='input-text-form-order-create-order-line-title-'"+orderLineCount+" class='form-control'/></td>" +
												"<td id='td-form-order-create-order-line-qty-'"+orderLineCount+"><input type='text' id='input-text-form-order-create-order-line-qty-'"+orderLineCount+" class='form-control'/></td>" +
												"<td id='td-form-order-create-order-line-unit-price-'"+orderLineCount+"><input type='text' id='input-text-form-order-create-order-line-unit-price-'"+orderLineCount+" class='form-control'/></td>" +
												"<td id='td-form-order-create-order-line-taxable-amount-'"+orderLineCount+"><input type='text' id='input-text-form-order-create-order-line-amount-'"+orderLineCount+" class='form-control'/></td>" +
												"<td id='td-form-order-create-order-line-tax-'"+orderLineCount+"><input type='text' id='input-text-form-order-create-order-line-tax-'"+orderLineCount+" class='form-control'/></td>" +
												"<td id='td-form-order-create-order-line-subtotal-'"+orderLineCount+"><input type='text' id='input-text-form-order-create-order-line-subtotal-'"+orderLineCount+" class='form-control'/></td></tr>");				
	});	
	$("#btn-form-order-create-order-line-total").click(function(){
		alert('now count is '+orderLineCount);		
	});
	
	/*...........Demo Table script OPEN...........*/
	var orderTableDemoData="<tr><td><input type='checkbox' id='td-orders-temp-1' value=''></input></td><td>1245855685522</td><td>Amit Sharma</td><td>Amazon.in</td><td>poi314577455</td><td>10/05/2012</td><td>pending</td></tr>";
	ordersTableDemoData = orderTableDemoData+"<tr><td id='td-orders-temp-1-next' colspan='7'></td></tr>";	
	$("#tbody-table-orders").html(ordersTableDemoData);	
	
	
	$("#td-orders-temp-1").click(function(){			
		
		ordersTableRowEdit();
		$("#td-orders-temp-1-next").toggle();
	});
	
	var ordersTableRowEdit;
	ordersTableRowEdit = function(){			
		$("#td-orders-temp-1-next").load('form_order_create.jsp',function(){
			
			$("#td-orders-temp-1-next #div-form-order-create-heading").css("display","none");
			$("#td-orders-temp-1-next #div-create-order-sub-form #div-form-order-create-line-1 #div-form-order-create-marketplace-order-id #input-text-form-order-create-marketplace-order-id").val("1245855685522");			
			$("#td-orders-temp-1-next #div-create-order-sub-form #div-form-order-create-line-1 #div-form-order-create-marketplace-order-id #input-text-form-order-create-marketplace-order-id").val("Sharma");
			$("#td-orders-temp-1-next #div-create-order-sub-form #div-form-order-create-line-1 #div-form-order-create-marketplace-order-id #input-text-form-order-create-marketplace-order-id").val("demo-category");
			$("#td-orders-temp-1-next #div-create-order-sub-form #div-form-order-create-line-1 #div-form-order-create-marketplace-order-id #input-text-form-order-create-marketplace-order-id").val("9549554645");
			$("#td-orders-temp-1-next #div-create-order-sub-form #div-form-order-create-line-1 #div-form-order-create-marketplace-order-id #input-text-form-order-create-marketplace-order-id").val("amit@demo.com");

			
			$("#td-orders-temp-1-next #div-create-order-sub-form #div-form-order-create-line-1 #div-form-order-create-order-date #input-date-form-order-create-order-date").datepicker({
				format: "dd/mm/yyyy"
		    }); 			
			//$("#td-orders-temp-1-next #div-create-order-sub-form #div-form-order-create-line-1 #div-form-order-create-marketplace-order-id #input-text-form-order-create-marketplace-order-id").val("hello ji");
			
			/* $("#td-user-temp-1-next #div-form-user-create-line-5 #div-form-user-create-reset #btn-form-user-create-reset").click(function(){
				resetOrderFun();
			}); */
			$('.selectpicker').selectpicker();	
			
			$('.selectpicker').selectpicker({
				style: 'btn-info',
				size: 4
			});
		});	
		
	};

	var resetOrderFun = function(){
		$("#td-user-temp-1-next").load('form_order_create.jsp',function(){
			$("#td-orders-temp-1-next #div-form-order-create-heading").css("display","none");
			orderFormValid(domainName);
//			$("#td-orders-temp-1-next #div-form-user-create-line-5 #div-form-user-create-reset #btn-form-user-create-reset").click(function(){
//				resetOrderFun();
//			});
		});
	};
	/*.......Demo table row edit script CLOSE......*/
}
function orderFormValid(domainName)
{

}
