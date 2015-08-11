$(document).ready(function(){	
		
	var domainName = "localhost";
	//var domainName = "dev.monoxor.com"
		
	/*................... Javascript for Index page ......................*/

	$(".login-link").click(function(){	
		
		window.location.assign("login.jsp");
	});

/*................... Javascript for login page ......................*/
	function submitLoginForm(login_username , login_password){		 		
		var $btn = $("#btn-submit-login-form").button('loading');				
		var access_token_url = 	getAccessTokenUrl();				
		var access_token = getAccessToken(access_token_url,login_username,login_password);		
		var access_token_check_url = getAccessTokenCheckURL();
		var authentication_state = checkAccessToken(access_token_check_url,access_token);
		
		$btn.button('reset');
		if(authentication_state == 'True'){
			window.location.assign("dashboard.jsp");					
		}		
	}
	
	function getAccessTokenUrl(){
		var access_token_url;
		$.ajax({
				type: "GET",
				url: "http://"+domainName+":8080/rest.sellerapp/auth/access-token-url",
				async: false,			
				dataType: "json",				
				success: function(responseText){
				access_token_url = responseText.access_token_url;											
					
				//return login_token_url;				
			},
			error: function(request,error,data)
			{
				alert(request);
				alert(error);
				alert(data);
			}			
		});
		return access_token_url;
	};
	
	function getAccessToken(access_token_url, login_username , login_password){		
		var access_token;
		var jsonData = new Object();		
		jsonData.login_username = login_username;	
		jsonData.login_password = login_password;		
		var jsonText = JSON.stringify(jsonData);				
		
		$.ajax({
			type: "POST", //get request			
			url: access_token_url,
			async: false,
			data: jsonText,
			dataType: "json",					
			success: function(responseText){	
				access_token = responseText.access_token;											
			},
			error: function(request, error, data){
				alert(request+" "+error+" "+data);
			} 			
		});	
		return access_token;
	}
	
	function getAccessTokenCheckURL(){
		var access_token_check_url;
		$.ajax({
				type: "GET",
				url: "http://"+domainName+":8080/rest.sellerapp/auth/access-token-check-url",
				async: false,			
				dataType: "json",				
				success: function(responseText){				
				access_token_check_url = responseText.access_token_check_url;													
			},
			error: function(request,error,data)
			{
				alert(data);
			}
		});
		return access_token_check_url;
	}
	
	function checkAccessToken(token_check_url,access_token){
		var authentication_state;		
		$.ajax({
				type: "GET",
				url: token_check_url,
				async: false,			
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(responseText){
					authentication_state = responseText.check_access_token;								
				},
				error: function(request,error,data)
				{
					alert(request);				
				}
			});
		return authentication_state;
	}
	
	$("#btn-submit-login-form").click(function(){			
		var login_username = $("#input-text-login-username").val(); // changed variable name to login_username
		var login_password = $("#input-text-login-password").val(); 
		submitLoginForm(login_username,login_password);		
	});
	/*.....if enter pressed on password textbox..........*/
	$("#input-text-login-password").keypress(function(event){
		var login_username = $("#login-username").val(); // changed variable name to login_username
		var login_password = $("#login-password").val(); 
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			submitLoginForm(login_username,login_password);	
		}
	});
	$('.tooltip-dash').tooltip();   
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
				$("#div-page-content").css("padding-left","180px");
			}
			else
			{
				$("#div-page-content").css("padding-left","180px");
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
				$("#div-page-content").css("padding-left","30px");
			}
			else
			{
				$("#div-page-content").css("padding-left","30px");
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
	
	saveButtonScript(domainName);	
	resetButtonScript(domainName);
	searchBarScript(domainName);
	selectPickerScript();
});

function selectPickerScript()
{	
	$('.selectpicker').selectpicker();	
	
	$('.selectpicker').selectpicker({
		style: 'btn-info',
		size: 4
	});
}

function editButtonScript(domainName)
{		
	$(".btn-page-state-edit-main").click(function(){				
		var parentId = $(this).parent().parent().attr("id");		
		switch(parentId){
	    case "div-form-user-create-state-buttons":
	    	editUserFormDetails(domainName);
	        break;
	    case "div-form-user-category-create-state-buttons":
	        editUserCatFormDetails();
	        break;
	    case "div-form-inventory-create-state-buttons":
	        editInventoryFormDetails();
	        break;
	    case "div-form-order-create-state-buttons":
	        editOrderFormDetails();
	        break;
	    case "div-form-invoice-create-pay-invoice":
	    	editInvoiceFormDetails();
	        break;
	    default:
	    	
		}
	});
}

function editUserFormDetails(domainName){
	
	var checkedFormElementsId = JSON.parse(localStorage["checkedFormElementsId"]);	
	for(var i=0 ; i<checkedFormElementsId.length ; i=i+1)
	{
		$(checkedFormElementsId[i]).prop("disabled",false);				
	}	
	var checkedFormEditSaveBtnId = JSON.parse(localStorage["checkedFormEditSaveBtnId"]);	
	
	$(checkedFormEditSaveBtnId[1]).prop('disabled', false);
	$(checkedFormElementsId[2]).selectpicker('refresh');		
}
function editUserCatFormDetails(domainName){	
}
function editInventoryFormDetails(domainName){	
}
function editOrderFormDetails(domainName){	
}
function editInvoiceFormDetails(domainName){	
}

function saveButtonScript(domainName){	
	$(".btn-page-state-save-main").click(function(){			
		var parentId = $(this).parent().parent().attr("id");					
		switch(parentId) {
	    case "div-form-user-create-state-buttons":
	    	submitUserFormDetails(domainName);
	        break;
	    case "div-form-user-category-create-state-buttons":
	        submitUserCatFormDetails();
	        break;
	    case "div-form-inventory-create-state-buttons":
	        submitInventoryFormDetails();
	        break;
	    case "div-form-order-create-state-buttons":
	        submitOrderFormDetails();
	        break;
	    case "div-form-invoice-create-pay-invoice":
	    	submitInvoiceFormDetails();
	        break;
	    default:
	    	
		}
	});
}

/*...............user-create Form Submission.................*/

function submitUserFormDetails(domainName){			
	var $btn = $("#div-form-user-create-state-buttons div .btn-page-state-save-main").button('loading');
	var selector = ["#input-text-form-user-create-fname",
	                "#input-text-form-user-create-lname",
	                "#input-text-form-user-create-phone", 
	                "#input-text-form-user-create-email", 
	                "#input-text-form-user-create-add-1", 	  
	                "#input-text-form-user-create-add-2", 
	                "#input-text-form-user-create-city", 
	                "#input-text-form-user-state", 
	                "#input-text-form-user-create-zip",
	                "#input-select-form-user-create-category option:selected"];
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
		var jsonData = new Object();
		jsonData.name_first = $(selector[0]).val();
		jsonData.name_last = $(selector[1]).val();
		jsonData.id_user_category = $(selector[9]).val();
		jsonData.phone = $(selector[2]).val();
		jsonData.emailid = $(selector[3]).val();
		jsonData.address_line_one = $(selector[4]).val(); 			 
		jsonData.address_line_two = $(selector[5]).val();
		jsonData.city = $(selector[6]).val();
		jsonData.state = $(selector[7]).val();
		jsonData.zip = $(selector[8]).val()		
		
		var jsonText = JSON.stringify(jsonData);			
		$.ajax({
			type: "POST",
			url: "http://"+domainName+":8080/rest.sellerapp/user/create",
			async: false,	
			contentType :"application/json; charSet=UTF-8",
			data: jsonText,			
			dataType: "html",			
			success: function(responseText){	
				alert(responseText);
				$btn.button('reset');
				var error_code = responseText["error_code"];
				 if(error_code==""){
					 
				 }
				 else{
					 var error_message=getErrorMessage(error_code);
					 alert(error_message);
				 }
			},
			error: function(request, error, data){
				
				alert(request+" "+error+" "+data+" user form submit request");						
				$btn.button('reset');
			} 
		});
	}
	else{
		alert("First Fill all the fields Properly");		
		$btn.button('reset');
	}	
}

function submitUserCatFormDetails(){
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
//		$.ajax({
//			type: "POST",
//			url: "UserCatFormSubmitServlet",
//			dataType: "html",
//			data: {"usercat_cname_text": $(selector[0]).val(),
//					"usercat_cdesc_text": $(selector[1]).val()},				
//			success: function(responseText){
//				$("#div-form-user-category-create").toggle();
//				$("#div-form-user-category-create").load('form_user_category_create.jsp');
//				$btn.button('reset')				
//				},
//			error: function(request, error, data){
//				alert(error);
//				$btn.button('reset')
//				} 
//			});
	 }
}

function submitInventoryFormDetails()
{						
	var $btn = $("#input-btn-submit-form-inventory-create").button('loading');
	
	var selector = ["#input-text-form-inventory-create-base-sku",
	                "#input-text-form-inventory-create-name",
	                "#input-text-form-inventory-create-weight",
	                "#input-text-form-inventory-create-maxprice", 
	                "#input-text-form-invenotry-create-minprice", 
	                "#input-text-form-invenotry-create-stock", 	  
	                "#input-select-form-inventory-create-category", 
	                "#input-select-form-inventory-create-category", 
	                "#input-text-form-inventory-create-tags"];
		
	//passing selector and marketplaceCount to the function
	$.fn.inventoryEntryFormValid(selector,marketplaceCount);		
	
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

function resetButtonScript(domainName)
{
	$(".btn-page-state-reset-main").click(function(){					
		var parentId = $(this).parent().parent().attr("id");		
		switch(parentId) {
	    case "div-form-user-create-state-buttons":
	    	resetUserFormDetails(domainName);
	        break;
	    case "div-form-user-category-create-state-buttons":
	        resetUserCatFormDetails(domainName);
	        break;
	    case "div-form-inventory-create-state-buttons":
	        resetInventoryFormDetails(domainName);
	        break;
	    case "div-form-order-create-state-buttons":
	        resetOrderFormDetails(domainName);
	        break;
	    case "div-form-invoice-create-pay-invoice":
	        resetInvoiceFormDetails(domainName);
	        break;
	    default:
	    	
		}
	});
}
function resetUserFormDetails(domainName)
{	
	$("#div-create-user-sub-form").load('sub_form_user_create.jsp',function(){
		userCreatePageScript(domainName);
		userCreateFormVal(domainName);
		selectPickerScript();		
		/*.......launch the user form.......*/
		$("#btn-user-create").click(function(){			
			$("#div-form-user-create").toggle();
		});
	});
}
function resetUserCatFormDetails(domainName)
{
	$("#div-create-user-category-sub-form").load('sub_form_user_category_create.jsp',function(){
		userCatCreateFormVal(domainName);		
	});			
}
function resetInventoryFormDetails()
{}
function resetOrderFormDetails()
{}
function resetInvoiceFormDetails()
{}

function searchBarScript(domainName)
{	
	$(".input-text-search-box-main").keyup(function(){			
		var parentId = $(this).parent().parent().attr("id");		
		switch(parentId) {
	    case "div-user-search":
	    	searchUserFormDetails(domainName);
	        break;
	    case "div-user-category-search":
	        //searchUserCatFormDetails();
	        break;
	    case "div-inventory-search":
	    	//searchInventoryFormDetails();
	        break;
	    case "div-order-search":
	    	//searchOrderFormDetails();
	        break;
	    case "div-invoice-search":
	    	//searchInvoiceFormDetails();
	        break;
	    default:
	    	
		}
	});
}
function searchUserFormDetails(domainName)
{
	/*........first it Loads table according to the screen-size.......*/	
	var userTextChar = $(".input-text-search-box-main").val();	
	if(($(window).width())>=750) /*......screen width greater than 750px.....*/
	{	
		if(!(userTextChar==""))  //if a character typed in search-bar
		{	 	
			var jsonData = new Object();		
			jsonData.name_user = userTextChar;					
			var jsonText = JSON.stringify(jsonData);
						
			$.ajax({ 						
				type: "POST",
				url: "http://"+domainName+":8080/rest.sellerapp/user/get/search",	
				async: false,
				contentType :"application/json; charSet=UTF-8",
				data: jsonText,			
				dataType: "json",			
				success: function(responseText){								
					var userTable="";
					for(var i=0 ; i<responseText["userTable"].length ; i=i+1)
		    		{				        		
			    		userTable =	userTable+"<tr><td id='td-user-form-create-table-"+responseText["userTable"][i].id+"'><input class='user-table-row-checkbox' type='checkbox' value="+responseText["userTable"][i].id+"></input>"+
			    		"</td><td>"+responseText["userTable"][i].id+
						"</td><td>"+responseText["userTable"][i].name_user+
		    			"</td><td>"+responseText["userTable"][i].emailid+
		    			"</td><td>"+responseText["userTable"][i].phone+
		    			"</td></tr><tr><td id='td-user-form-create-table-"+responseText["userTable"][i].id+"-form' class='user-table-row-attech-form' colspan='5'></td></tr>";		    		
					}		  						
					$("#tbody-table-user").html(userTable);		
					userCreateSubScript(domainName);
				},
				error: function(request, error, data){
					alert(error);
					alert(data);
				}  						
			});			
		}
		else
		{
			$.ajax({
				type: "GET",
				url: "http://"+domainName+":8080/rest.sellerapp/user/get/all",		
				async: false,
				dataType: "json",			
				success: function(responseText){				
					var userTable="";					
			    	for(var i=0 ; i<responseText["userTable"].length ; i=i+1)
		    		{				        		
			    		userTable =	userTable+"<tr><td id='td-user-form-create-table-"+responseText["userTable"][i].id+"'><input class='user-table-row-checkbox' type='checkbox' value="+responseText["userTable"][i].id+"></input>"+
			    		"</td><td>"+responseText["userTable"][i].id+
						"</td><td>"+responseText["userTable"][i].name_user+
		    			"</td><td>"+responseText["userTable"][i].emailid+
		    			"</td><td>"+responseText["userTable"][i].phone+
		    			"</td></tr><tr><td id='td-user-form-create-table-"+responseText["userTable"][i].id+"-form' class='user-table-row-attech-form' colspan='5'></td></tr>";		    		
					}		    			    
					$("#tbody-table-user").html(userTable);					
					userCreateSubScript(domainName);
				},
				error: function(request, error, data){
					alert(error);				
				}  						
			});
		}
	}
	else	  /*......screen width less than 750px.....*/
	{	
		if(!(userTextChar==""))  //if a character typed in search-bar
		{	 	 						
			$.ajax({ 						
				type: "POST",
				url: "http://"+domainName+":8080/rest.sellerapp/user/get/search/"+userTextChar,
				async: false,
				contentType :"application/json; charSet=UTF-8",
				data: user_final_text,			
				dataType: "json",			
				success: function(responseText){							
					var userTable="";
					for(var i=0 ; i<responseText["userTable"].length ; i=i+1)
		    		{				        		
			    		userTable =	userTable+"<tr><td id='td-user-form-create-table-"+responseText["userTable"][i].id+"'><input class='user-table-row-checkbox' type='checkbox' value="+responseText["userTable"][i].id+"></input>"+			    		
						"</td><td>"+responseText["userTable"][i].name_user+		    
						"</td><td>"+responseText["userTable"][i].phone+
		    			"</td></tr><tr><td id='td-user-form-create-table-"+responseText["userTable"][i].id+"-form' class='user-table-row-attech-form' colspan='5'></td></tr>";		    		
					}		  						
					$("#tbody-table-user").html(userTable);		
					userCreateSubScript(domainName);
				},
				error: function(request, error, data){
					alert(error);
					alert(data);
				}  						
			});			
		}
		else
		{
			$.ajax({
				type: "GET",
				url: "http://"+domainName+":8080/rest.sellerapp/user/get/all",		
				async: false,
				dataType: "json",			
				success: function(responseText){				
					var userTable="";					
			    	for(var i=0 ; i<responseText["userTable"].length ; i=i+1)
		    		{				        		
			    		userTable =	userTable+"<tr><td id='td-user-form-create-table-"+responseText["userTable"][i].id+"'><input class='user-table-row-checkbox' type='checkbox' value="+responseText["userTable"][i].id+"></input>"+			    		
						"</td><td>"+responseText["userTable"][i].name_user+		    	
		    			"</td><td>"+responseText["userTable"][i].phone+
		    			"</td></tr><tr><td id='td-user-form-create-table-"+responseText["userTable"][i].id+"-form' class='user-table-row-attech-form' colspan='5'></td></tr>";		    		
					}		    			    
					$("#tbody-table-user").html(userTable);					
					userCreateSubScript(domainName);
				},
				error: function(request, error, data){
					alert(error);				
				}  						
			});
		}
	}
}

function searchUserCatFormDetails()
{			 				
	var userTextChar1 = $(".input-text-search-box-main").val();			
//	if(!(userTextChar1==""))
//	{
//		$.ajax({ 						
//			type: "GET",
//			url: "UserTableDataServlet",			
//			dataType: "json",							
//			data: {"var": "filled","pageName": "user-category", "textChar": userTextChar1},
//			success: function(responseText){	
//				
//				var userCatTable="";				
//				for(var i=0 ; i<responseText["usercatTable"].length ; i=i+1)
//				{				        		
//					userCatTable =	userCatTable+"<tr><td><input type='checkbox' value="+responseText["usercatTable"][i].id+"></input>"+
//					"</td><td>"+responseText["usercatTable"][i].id+
//					"</td><td>"+responseText["usercatTable"][i].name+
//					"</td></tr>";
//				}		        		    	
//				$("#tbody-usercat-table-data").html(userCatTable);						
//			},
//			error: function(request, error, data){
//				alert(error);				
//			}  						
//		});
//	}
//	else
//	{
//		$.ajax({
//			type: "GET",
//			url: "UserTableDataServlet",			
//			dataType: "json",
//			data: {"var": "empty", "pageName": "user-category"},
//			success: function(responseText){				
//				var userCatTable="";				
//				for(var i=0 ; i<responseText["usercatTable"].length ; i=i+1)
//				{				        		
//					userCatTable =	userCatTable+"<tr><td><input type='checkbox' value="+responseText["usercatTable"][i].id+"></input>"+
//					"</td><td>"+responseText["usercatTable"][i].id+
//					"</td><td>"+responseText["usercatTable"][i].name+
//					"</td></tr>";
//				}		        		    	
//				$("#tbody-usercat-table-data").html(userCatTable);						
//			},
//			error: function(request, error, data){
//				alert(error);				
//			}  						
//		});
//	}	
}
function searchInventoryFormDetails()
{}
function searchOrderFormDetails()
{}
function searchInvoiceFormDetails()
{}

/* error handling for whole script page*/
function getErrorMessage(error_code){		
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
	localStorage.setItem("current_checkbox_value", JSON.stringify(""));					

	//fetch user Categories for user create form	
	$.ajax({
		type: "GET",
		url: "http://"+domainName+":8080/rest.sellerapp/user-category/get-user-category/all",		
		async: false,
		dataType: "json",			
		success: function(responseText){										    	
	    	var cateogryList = ""; 
	    	for(var i=0 ; i<responseText["userCategories"].length ; i=i+1)
	    	{
	    		cateogryList = cateogryList+"<option value='"+responseText["userCategories"][i].id+"'>"+responseText["userCategories"][i].name+"</option>";
	    	}	    	 
	    	$("#input-select-form-user-create-category").append(cateogryList);
		},
		error: function(request, error, data){
				alert(error+" in user_cat fech list");				
		}  						
	});
	
	$( "#input-select-form-user-create-category" ).change(function () {	
		var text = $("#input-select-form-user-create-category option:selected").text();
		if(text=="CreateCategory")
		{
			$("#div-modal-form-user-create-category").modal('show');
		}
	});	
	
	/*...........Demo Table script OPEN...........*/
	if(($(window).width())>=750)
	{
		$.ajax({
			type: "GET",
			url: "http://"+domainName+":8080/rest.sellerapp/user/get/all",		
			async: false,
			dataType: "json",			
			success: function(responseText){						
				var userTable="";				
		    	for(var i=0 ; i<responseText["userTable"].length ; i=i+1){				        		
		    		userTable =	userTable+"<tr><td id='td-user-form-create-table-"+responseText["userTable"][i].id+"'><input class='user-table-row-checkbox' type='checkbox' value="+responseText["userTable"][i].id+"></input>"+
		    		"</td><td>"+responseText["userTable"][i].id+
					"</td><td>"+responseText["userTable"][i].name_user+
	    			"</td><td>"+responseText["userTable"][i].emailid+
	    			"</td><td>"+responseText["userTable"][i].phone+
	    			"</td></tr><tr><td id='td-user-form-create-table-"+responseText["userTable"][i].id+"-form' class='user-table-row-attech-form' colspan='5'></td></tr>";		    		
				}		    			    
				$("#tbody-table-user").html(userTable);				
				userCreateSubScript(domainName);
				},
				error: function(request, error, data){
					alert(error+" in user table data");				
				}  						
			});
	}
	else
	{
		$.ajax({
			type: "GET",
			url: "http://"+domainName+":8080/rest.sellerapp/user/get/all",		
			async: false,
			dataType: "json",			
			success: function(responseText){				
			var userTable="";
			
			for(var i=0 ; i<responseText["userTable"].length ; i=i+1){				        		
	    		userTable =	userTable+"<tr><td id='td-user-form-create-table-"+responseText["userTable"][i].id+"'><input class='user-table-row-checkbox' type='checkbox' value="+responseText["userTable"][i].id+"></input>"+	    		
				"</td><td>"+responseText["userTable"][i].name_user+    			
    			"</td><td>"+responseText["userTable"][i].phone+
    			"</td></tr><tr><td id='td-user-form-create-table-"+responseText["userTable"][i].id+"-form' class='user-table-row-attech-form' colspan='5'></td></tr>";		    		
			}		 		    	
			$("#tbody-table-user").html(userTable);		
			userCreateSubScript(domainName);
		},
		error: function(request, error, data){
			alert(error);				
		}  						
		});
	}	
		
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
		$("#thead-table-user").html(header);
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

function userCreateSubScript(domainName)
{		
	var row_attech_form_id;
	$(".user-table-row-checkbox").click(function(){		
		if($(this).is(':checked')){
			$("body").fadeTo("fast", 0.4);
			$("#spinner").show();		
			
			//id of user						
			var	current_checkbox_value = $(this).attr("value");			

			//check if another checkbox already checked
			var checked_user_id = JSON.parse(localStorage.getItem("current_checkbox_value"));			
			if(checked_user_id != "")
			{												
				$("#td-user-form-create-table-"+checked_user_id+" .user-table-row-checkbox").prop('checked',false);
				$("#td-user-form-create-table-"+checked_user_id+"-form").toggle();
			}
			var current_checked_row_id = $(this).parent().attr("id");				
			localStorage.setItem("current_checkbox_value", JSON.stringify(current_checkbox_value));					
			row_attech_form_id = current_checked_row_id+"-form";			
			userTableRowEdit(row_attech_form_id);					
		}
		else{						
			localStorage.setItem("current_checkbox_value", JSON.stringify(""));				
			$("#"+row_attech_form_id).toggle();	
		}								
	});	
	
	function userTableRowEdit(form_id){				
		$("#"+form_id).load('form_user_create.jsp',function(){			
			userCreateFormVal(domainName);
			editButtonScript(domainName);
			$("#"+form_id+" #div-form-user-create-heading").css("display","none");
			var checkedFormElementsId =[
			                            "#"+form_id+" #div-create-user-sub-form #div-form-user-create-line-1 #div-form-user-create-fname #input-text-form-user-create-fname",
			                            "#"+form_id+" #div-create-user-sub-form #div-form-user-create-line-1 #div-form-user-create-lname #input-text-form-user-create-lname",
			                            "#"+form_id+" #div-create-user-sub-form #div-form-user-create-line-1 #div-form-user-create-category #input-select-form-user-create-category",
			                            "#"+form_id+" #div-create-user-sub-form #div-form-user-create-line-2 #div-form-user-create-phone #input-text-form-user-create-phone",
			                            "#"+form_id+" #div-create-user-sub-form #div-form-user-create-line-2 #div-form-user-create-email #input-text-form-user-create-email",
			                            "#"+form_id+" #div-create-user-sub-form #div-form-user-create-line-3 #div-form-user-create-add-1 #input-text-form-user-create-add-1",
			                            "#"+form_id+" #div-create-user-sub-form #div-form-user-create-line-3 #div-form-user-create-add-2 #input-text-form-user-create-add-2",
			                            "#"+form_id+" #div-create-user-sub-form #div-form-user-create-line-4 #div-form-user-create-city #input-text-form-user-create-city",
			                            "#"+form_id+" #div-create-user-sub-form #div-form-user-create-line-4 #div-form-user-create-state #input-text-form-user-state",
			                            "#"+form_id+" #div-create-user-sub-form #div-form-user-create-line-4 #div-form-user-create-zip #input-text-form-user-create-zip"
			                            ]; 
			
			localStorage["checkedFormElementsId"] = JSON.stringify(checkedFormElementsId);
			
			var checkedFormEditSaveBtnId = ["#"+form_id+" #div-form-user-create-state-buttons div .btn-page-state-save-main",
			                                "#"+form_id+" #div-form-user-create-state-buttons div .btn-page-state-save-main"];
			localStorage["checkedFormEditSaveBtnId"] = JSON.stringify(checkedFormEditSaveBtnId);
			
			var checked_user_id = JSON.parse(localStorage.getItem("current_checkbox_value"));
			
			//filling category-list of toggle form 
			$.ajax({
				type: "GET",
				url: "http://"+domainName+":8080/rest.sellerapp/user-category/get-user-category/all",		
				async: false,
				dataType: "json",			
				success: function(responseText){										    	
			    	var cateogryList = ""; 
			    	for(var i=0 ; i<responseText["userCategories"].length ; i=i+1)
			    	{
			    		cateogryList = cateogryList+"<option value='"+responseText["userCategories"][i].id+"'>"+responseText["userCategories"][i].name+"</option>";
			    	}	    	 
			    	$(checkedFormElementsId[2]).append(cateogryList);			    	
				},
				error: function(request, error, data){
						alert(error+" in user_cat fech list");				
				}  						
			});
			
		//filling toggle form details
			var json_user_object = new Object();
			json_user_object.id = checked_user_id;						
			var json_user_text = JSON.stringify(json_user_object);			
			$.ajax({
				type: "POST",
				url: "http://"+domainName+":8080/rest.sellerapp/user/get/id",		
				async: false,
				contentType: "application/json; charset=utf-8",
				data:json_user_text,
				dataType: "json",						
				success: function(responseText){					
					$(checkedFormElementsId[0]).prop("disabled",true).val(responseText["userDetails"].name_first);
					$(checkedFormElementsId[1]).prop("disabled",true).val(responseText["userDetails"].name_last);
					
					//need to make title attribut blank to set a value to select menu
					$(checkedFormElementsId[2]).attr("title","");										
					$(checkedFormElementsId[2]).prop("disabled",true).val(responseText["userCategoryDetails"].id);
					$(checkedFormElementsId[3]).prop("disabled",true).val(responseText["userDetails"].phone);
					$(checkedFormElementsId[4]).prop("disabled",true).val(responseText["userDetails"].emailid);
					$(checkedFormElementsId[5]).prop("disabled",true).val(responseText["userDetails"].address_line_one);
					$(checkedFormElementsId[6]).prop("disabled",true).val(responseText["userDetails"].address_line_two);
					$(checkedFormElementsId[7]).prop("disabled",true).val(responseText["userDetails"].city);
					$(checkedFormElementsId[8]).prop("disabled",true).val(responseText["userDetails"].state);
					$(checkedFormElementsId[9]).prop("disabled",true).val(responseText["userDetails"].zip);
				},
				error: function(request, error, data){
					alert(error);				
				}  						
			});						

			$('.selectpicker').selectpicker();	
			
			$('.selectpicker').selectpicker({
				style: 'btn-info',
				size: 4
			});			
			$("body").fadeTo("fast", 1);
			$("#spinner").hide();
			
			$("#"+form_id).toggle();	
			$("#"+form_id+" #div-form-user-create-state-buttons div .btn-page-state-reset-main").css("display","none");
			$("#"+form_id+" #div-form-user-create-state-buttons div .btn-page-state-save-main").prop('disabled', true);
			
			var json_user_data = new Object();
			json_user_data.name_first = $(checkedFormElementsId[0]).val();					
			json_user_data.name_last = $(checkedFormElementsId[1]).val();
			json_user_data.id_user_category = $(checkedFormElementsId[2]).val();
			json_user_data.phone = $(checkedFormElementsId[3]).val();
			json_user_data.emailid = $(checkedFormElementsId[4]).val();
			json_user_data.address_line_one = $(checkedFormElementsId[5]).val();
			json_user_data.address_line_two = $(checkedFormElementsId[6]).val();
			json_user_data.city = $(checkedFormElementsId[7]).val();
			json_user_data.state = $(checkedFormElementsId[8]).val();
			json_user_data.zip = $(checkedFormElementsId[9]).val();				
			json_user_data.id = JSON.parse(localStorage.getItem("current_checkbox_value"));
			
			var json_user_text = JSON.stringify(json_user_data);			
			
		//user_form update script
			$("#"+form_id+" #div-form-user-create-state-buttons div .btn-page-state-save-main").click(function(){				
				var $btn = $("#"+form_id+" #div-form-user-create-state-buttons div .btn-page-state-save-main").button('loading');																
				
				var json_user_updated_data = new Object();
				json_user_updated_data.name_first = $(checkedFormElementsId[0]).val();					
				json_user_updated_data.name_last = $(checkedFormElementsId[1]).val();
				json_user_updated_data.id_user_category = $(checkedFormElementsId[2]).val();
				json_user_updated_data.phone = $(checkedFormElementsId[3]).val();
				json_user_updated_data.emailid = $(checkedFormElementsId[4]).val();
				json_user_updated_data.address_line_one = $(checkedFormElementsId[5]).val();
				json_user_updated_data.address_line_two = $(checkedFormElementsId[6]).val();
				json_user_updated_data.city = $(checkedFormElementsId[7]).val();
				json_user_updated_data.state = $(checkedFormElementsId[8]).val();
				json_user_updated_data.zip = $(checkedFormElementsId[9]).val();				
				json_user_updated_data.id_user = JSON.parse(localStorage.getItem("current_checkbox_value"));
				
				var json_user_updated_text = JSON.stringify(json_user_updated_data);				
				
				var user_final_data = new Object();				
				for(var key in json_user_data){					
					if(json_user_data[key] != json_user_updated_data[key]){
						user_final_data[key] = json_user_updated_data[key];
					}
				}
				user_final_data["id"] = JSON.parse(localStorage.getItem("current_checkbox_value"));
				var user_final_text = JSON.stringify(user_final_data);									
				$.ajax({
					type: "POST",
					url: "http://"+domainName+":8080/rest.sellerapp/user/update",
					async: false,	
					contentType :"application/json; charSet=UTF-8",
					data: user_final_text,			
					dataType: "json",			
					success: function(responseText){	
						alert('done');
						userTableRowEdit(form_id);
						$("#"+form_id).toggle();
						$btn.button('reset');						
					},
					error: function(request, error, data){						
						alert(request+" "+error+" "+data+" in user update");						
						$btn.button('reset');
					} 
				});

			});				
		});										
	}
}

/*......user form validation.........*/
function userCreateFormVal(domainName)
{	
	/*......check fields are not empty.........*/
	$("#input-text-form-user-create-fname, #input-text-form-user-create-lname, #input-text-form-user-create-phone, #input-text-form-user-create-add-1, #input-text-form-user-create-add-2, #input-text-form-user-create-city, #input-text-form-user-state, #input-text-form-user-create-zip").on('input', function() {
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
	$("#input-text-form-user-create-fname,#input-text-form-user-create-lname, #input-text-form-user-create-phone, #input-text-form-user-create-email, #input-text-form-user-create-add-1, #input-text-form-user-create-add-2, #input-text-form-user-create-city, #input-text-form-user-state, #input-text-form-user-create-zip").blur(function(){		
		if(!$(this).val())
		{
			$(this).parent().addClass("has-error");
		}	  		  
	});

	/*........check for html injection......*/
	$("#input-text-form-user-create-fname, #input-text-form-user-create-lname, #input-text-form-user-create-phone, #input-text-form-user-create-add-1, #input-text-form-user-create-add-2, #input-text-form-user-create-email, #input-text-form-user-create-city, #input-text-form-user-state, #input-text-form-user-create-zip").on('input', function() {
		var input = $(this);
		var re = /(<([^>]+)>)/gi;
		var has_html_characters = re.test(input.val());
		if(has_html_characters){input.parent().addClass("has-error");}	
		else{input.parent().removeClass("has-error").addClass("has-success");}
	});
	
	/*.......first-name,last-name,city,state field validation........*/
	$("#input-text-form-user-create-fname, #input-text-form-user-create-lname, #input-text-form-user-create-city, #input-text-form-user-state").on('input', function() {
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
}

/*............................user category-create OPEN......................... */

function userCatCreatePageScript(domainName)
{		
	if($(window).width()<=380)
	{				
		$("#div-form-user-category-create-submit").removeClass("col-xs-5");
	}
	
	/*...apply table headers of user-cat according to the screen-size....*/
	if($(window).width()>=750)
	{		
		var header="<tr><th>Select</th><th>Category Id</th><th>CatName</th></tr>";			
		$("#thead-table-user-category").html(header);
	}
	else
	{
		var header="<tr><th>Select</th><th>Cat Id</th><th>CatName</th></tr>";							      
		$("#thead-table-user-category").html(header);
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

			$("#td-user-cat-temp-1-next #div-form-user-category-create-footer #div-form-user-category-create-reset #btn-form-user-category-create-reset").css("display","none");
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

		
}
/*............................usercat-create2 CLOSE......................... */	 

/*............................user-create script OPEN......................... */	
function inventoryPageScript(domainName)
{	
	$("#tbody-table-inventory").html("<tr><td><input id='td-inventory-temp-1' type='checkbox' value=''></input></td><td>10010458</td><td>A Black And Silver Case Watch</td><td>10</td><td>745</td><td>Jaipur</td></tr>" +
									"<tr><td id='td-inventory-temp-1-next' colspan='6'></td></tr>");
	
	/*.......launch the inventory form.......*/
	$("#btn-inventory-create").click(function(){			
		$("#div-form-inventory-create").toggle();			 	
		$( "#div-form-inventory-create-save" ).removeClass("col-md-offset-4 col-sm-offset-4").addClass( "col-md-offset-5 col-sm-offset-5" );
		$("#input-btn-edit-form-inventory-create").css("display","none");
		
	});
	$("#td-inventory-temp-1").click(function(){			
			
			inventoryTableRowEdit();
			$("#td-inventory-temp-1-next").toggle();
		});
		
		var inventoryTableRowEdit;
		inventoryTableRowEdit = function(){			
			$("#td-inventory-temp-1-next").load('form_inventory_create.jsp',function(){
				
				$('.selectpicker').selectpicker();	
				
				$('.selectpicker').selectpicker({
					style: 'btn-info',
					size: 4
				});
				
				//change tab href and associated div id's 
				$("#td-inventory-temp-1-next #div-sub-form-inventory-create div div div #div-form-inventory-create-tab #tabs li #a-tab-form-inventory-create-stock").attr("href","#div-form-inventory-create-stock-edit");				
				$("#td-inventory-temp-1-next #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock").attr("id","div-form-inventory-create-stock-edit");
				
				$("#td-inventory-temp-1-next #div-sub-form-inventory-create div div div #div-form-inventory-create-tab #tabs li #a-tab-form-inventory-create-procurement").attr("href","#div-form-inventory-create-procurement-edit");				
				$("#td-inventory-temp-1-next #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-procurement").attr("id","div-form-inventory-create-procurement-edit");

				$("#td-inventory-temp-1-next #div-sub-form-inventory-create div div div #div-form-inventory-create-tab #tabs li #a-tab-form-inventory-create-sales").attr("href","#div-tab-form-inventory-create-sales-edit");				
				$("#td-inventory-temp-1-next #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-tab-form-inventory-create-sales").attr("id","div-tab-form-inventory-create-sales-edit");

				$("#td-inventory-temp-1-next #div-sub-form-inventory-create div div div #div-form-inventory-create-tab #tabs li #a-tab-form-inventory-create-variants").attr("href","#div-tab-form-inventory-create-variants-edit");				
				$("#td-inventory-temp-1-next #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-tab-form-inventory-create-variants").attr("id","div-tab-form-inventory-create-variants-edit");

				$("#td-inventory-temp-1-next #div-sub-form-inventory-create div div div #div-form-inventory-create-tab #tabs li #a-tab-form-inventory-create-accounting").attr("href","#div-tab-form-inventory-create-accounting-edit");				
				$("#td-inventory-temp-1-next #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-tab-form-inventory-create-accounting").attr("id","div-tab-form-inventory-create-accounting-edit");

			});				
		};
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
	 $("#btn-form-marketplace-create-submit").click(function(){				
		var selector = ["#input-select-form-marketplace-create-marketplace-name",
		                "#input-text-form-marketplace-create-marketplace-url"];
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
//							"<td>"+mplaceName+"</td>" +
//							"<td>"+mplaceUrl+"</td>" +							
//							"<td><input type='text' id='input-form-inventory-sellPrice"+marketplaceCount+"' class='form-control val-empty'/></td>" +
//							"<td><input type='text' id='input-text-form-invenotry-create-stock"+marketplaceCount+"' class='form-control val-empty'/></td>" +
//							"<td><td><select id='input-form-inventory-status"+marketplaceCount+"' class='form-control val-empty'><option>Active</option><option>Inactive</option></td>" +
//							"<td></td>" +
//						"</tr>";
			
			var RowEdit = "<tr class='active to-diplay'>" +
								"<td id='td-form-invenotry-create-table-marketplace"+marketplaceCount+"'><select id='input-select-form-invenotry-create-table-marketplace"+marketplaceCount+"' class='form-control selectpicker'><option selected>"+mplaceName+"</option></select></td>" +
								"<td id='td-form-invenotry-create-table-link"+marketplaceCount+"'><input type='text' id='input-text-form-invenotry-create-table-link"+marketplaceCount+"' class='form-control' value='"+mplaceUrl+"'/></td>" +
								"<td id='td-form-invenotry-create-table-sellprice"+marketplaceCount+"'><input type='text' id='input-text-form-invenotry-create-table-sellprice"+marketplaceCount+"' class='form-control val-empty'/></td>" +
								"<td id='td-form-invenotry-create-table-stock"+marketplaceCount+"'><input type='text' id='input-text-form-invenotry-create-table-stock"+marketplaceCount+"' class='form-control val-empty'/></td>" +
								"<td id='td-form-invenotry-create-table-status"+marketplaceCount+"'><select id='input-select-form-invenotry-create-table-status"+marketplaceCount+"' class='form-control selectpicker' ><option>Active</option><option>InActive</option></select></td>" +
								"<td id='td-form-invenotry-create-table-health"+marketplaceCount+"'><div class='progress'><div class='progress-bar progress-bar-success progress-bar-striped"+marketplaceCount+"' role='progressbar'aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width:40%'>40% Complete (success)</div></div></td>" +
								"<td id='td-form-invenotry-create-table-submit-edit"+marketplaceCount+"'>" +
										"<div class='form-group col-md-6 col-sm-6 col-xs-6'><button type='button' id='input-btn-edit-form-inventory-create"+marketplaceCount+"' class='form-control btn btn-primary'>Edit</button></div>" +
										"<div class='form-group col-md-6 col-sm-6 col-xs-6'><button type='button' id='input-btn-save-form-inventory-create"+marketplaceCount+"' class='form-control btn btn-primary'>Save</button></div></td>" +								
						   "</tr>";			
			$('.marketplace-create-modal').modal('hide');
			
			//refresh modal content after successfully submission
			$("#div-form-invMarketplace-fields").load('sub_form_create_marketplace.jsp');
			
			//assign scirpt again to refreshed elements  
			inventoryFormValid();						
			
			$("#tbody-table-form-inventory-create").append(RowEdit);
			selectPickerScript();						 								
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
}

function inventoryFormValid()
{		
	/*......check inventory form fields are not empty.........*/
	$("#input-text-form-inventory-create-base-sku, #input-text-form-inventory-create-name,#input-text-form-inventory-create-weight, #input-txt-form-inventory-create-category,#input-text-form-invenotry-create-stock, #input-text-form-inventory-create-maxprice, #input-text-form-invenotry-create-minprice,#input-text-form-invenotry-create-weight,#input-text-form-invenotry-create-procurement-time, #input-text-form-invenotry-create-stock, #input-text-form-inventory-create-tags, #input-text-form-marketplace-create-marketplace-url, #input-select-form-marketplace-create-marketplace-name, #input-modal-inventory-category-create-name, #input-form-inventory-category-create-tax-percent").on('input', function() {
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
	$("#input-text-form-inventory-create-base-sku, #input-text-form-inventory-create-name, #input-text-form-inventory-create-weight, #input-txt-form-inventory-create-category,#input-text-form-invenotry-create-stock, #input-text-form-inventory-create-maxprice, #input-text-form-invenotry-create-minprice,#input-text-form-invenotry-create-weight,#input-text-form-invenotry-create-procurement-time, #input-text-form-invenotry-create-stock, #input-text-form-inventory-create-tags, #input-text-form-marketplace-create-marketplace-url, #input-select-form-marketplace-create-marketplace-name, #input-modal-inventory-category-create-name, #input-form-inventory-category-create-tax-percent").blur(function(){						
		if(!$(this).val())
		{
			$(this).parent().addClass("has-error");
		}	  		  
	});	
	
	/*......validation on inve field select category......*/
	$("#input-select-form-invenotry-create-brand,#input-select-form-invenotry-create-tax, #input-select-form-inventory-create-supplier,#input-select-form-invenotry-create-status,#input-select-form-invenotry-create-warehouse,#input-select-form-invenotry-create-aisle,#input-select-form-invenotry-create-location,#input-select-form-invenotry-create-shelf,#input-select-form-invenotry-create-box").blur(function(){		 
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
	var invoiceLineCount = 0;
	var invoiceLineArray =[];
	
	var paymentLineCount = 0;
	var paymentLineArray =[];
	
	var invoiceLineEditCount = 0;
	var invoiceLineEditArray =[];
	
	var paymentLineEditCount = 0;
	var paymentLineEditArray =[];
	
	/*.......launch the invoice form.......*/
	$("#btn-invoice-create").click(function(){			
		$("#div-form-invoice-create").toggle();
	});	   
	$('#input-date-form-invoice-create-invoice-date').datepicker({
		format: "dd/mm/yyyy"
	}); 	
	$('#input-text-forminvoice-create-record-date').datepicker({
		format: "dd/mm/yyyy"
	});
	

	$('#input-text-form-invoice-create-order-date').datepicker({
		format: "dd/mm/yyyy"
	}); 
	
	// add-line main form script starts from here
	$("#btn-form-invoice-create-add-line").click(function(){
		$.fn.invoiceLineFormScript();
	});	
	
	$.fn.invoiceLineFormScript = function(){
		invoiceLineArray.push("btn-form-invoice-create-invoice-line-remove-"+invoiceLineCount);
		$("#tbody-table-invoice-line").append("<tr><td id='td-form-invoice-create-invoice-line-product-name-'"+invoiceLineCount+"><input type='text' id='input-text-form-invoice-create-invoice-line-product-name-'"+invoiceLineCount+" class='form-control'/></td>" +
													"<td id='td-form-invoice-create-invoice-line-unit-price-'"+invoiceLineCount+"><input type='text' id='input-text-form-invoice-create-invoice-line-unit-price'"+invoiceLineCount+" class='form-control'/></td>" +
													"<td id='td-form-invoice-create-invoice-line-qty-'"+invoiceLineCount+"><input type='text' id='input-text-form-invoice-create-invoice-line-qty'"+invoiceLineCount+" class='form-control'/></td>" +
													"<td id='td-form-invoice-create-invoice-line-tax-'"+invoiceLineCount+"><input type='text' id='input-text-form-invoice-create-invoice-line-tax-'"+invoiceLineCount+" class='form-control'/></td>" +
													"<td id='td-form-invoice-create-invoice-line-amount-'"+invoiceLineCount+"><input type='text' id='input-text-form-invoice-create-invoice-line-amount-'"+invoiceLineCount+" class='form-control'/></td>" +
													"<td id='td-form-invoice-create-invoice-line-remove-'"+invoiceLineCount+"><button type='button' id='btn-form-invoice-create-invoice-line-remove-"+invoiceLineCount+"' class='invoice-line-remove-button form-control btn btn-primary btn-sm '><span class='glyphicon glyphicon-remove'></span></button></td>" +
												"</tr>");				
		invoiceLineCount= invoiceLineCount+1;			
		removeLineScript();
		
	};
	function removeLineScript()
	{
		$(".invoice-line-remove-button").click(function(){			
			var currentItemId = $(this).attr("id");
			for(var i=0 ; i< invoiceLineArray.length ; i=i+1){				
				if(invoiceLineArray[i] == currentItemId)
				{
					delete invoiceLineArray[i];
				}	
			}
			$(this).parent().parent().hide();			
		});
	}
		
	
	$.fn.invoicePaymentLineScript = function(){		
		paymentLineArray.push("btn-form-invoice-create-payment-line-remove-"+paymentLineCount);
		$("#tbody-table-invoice-payment-line").append("<tr><td id='td-form-invoice-create-payment-line-date-'"+paymentLineCount+"><input type='text' id='input-text-form-invoice-create-payment-line-date-'"+paymentLineCount+" class='form-control'/></td>" +
													"<td id='td-form-invoice-create-payment-line-transaction-id'"+paymentLineCount+"><input type='text' id='input-text-form-invoice-create-payment-line-transaction-id'"+paymentLineCount+" class='form-control'/></td>" +
													"<td id='td-form-invoice-create-payment-line-amount-'"+paymentLineCount+"><input type='text' id='input-text-form-invoice-create-payment-line-amount'"+paymentLineCount+" class='form-control'/></td>" +
													"<td id='td-form-invoice-create-payment-line-remove-'"+paymentLineCount+"><button type='button' id='btn-form-invoice-create-payment-line-remove-"+paymentLineCount+"' class='invoice-line-remove-button form-control btn btn-primary btn-sm '><span class='glyphicon glyphicon-remove'></span></button></td>" +
												"</tr>");				
		paymentLineCount= paymentLineCount+1;
		
		removePaymentLineScript();
		
	};
	function removePaymentLineScript()
	{
		$(".invoice-line-remove-button").click(function(){			
			var currentItemId = $(this).attr("id");
			for(var i=0 ; i< paymentLineArray.length ; i=i+1){				
				if(paymentLineArray[i] == currentItemId)
				{
					delete paymentLineArray[i];
				}	
			}
			$(this).parent().parent().hide();			
		});
	}
	// add-line main form script ends from here
	
	
	$("#tbody-table-invoice").html("<tr><td><input type='checkbox' id='input-check-invoice-temp-1' value=''></input></td><td>inv_12345</td><td>Amit Sharma</td><td>ord_12345</td><td>745</td><td>50</td><td>25</td><td>delivered</td></tr>" +
	   							   "<tr><td id='td-invoice-temp-1-next' colspan='8'></td></tr>");
	$("#input-check-invoice-temp-1").click(function(){	
		invoiceTableRowEdit();
		$("#td-invoice-temp-1-next").toggle();
	});
	
	var invoiceTableRowEdit;
	invoiceTableRowEdit = function(){			
		$("#td-invoice-temp-1-next").load('form_invoice_create.jsp',function(){
		//add-line edit form script starts from here
			$("#tbody-table-invoice tr #td-invoice-temp-1-next #div-create-invoice-sub-form div div #div-form-invoice-create-tab #tabs li #a-tab-form-invoice-create-line").attr("href","#div-form-invoice-create-lines-edit");			
			$("#tbody-table-invoice tr #td-invoice-temp-1-next #div-create-invoice-sub-form div div #div-form-invoice-create-tab-pages #div-form-invoice-create-lines").attr("id","div-form-invoice-create-lines-edit");
			
			$("#tbody-table-invoice tr #td-invoice-temp-1-next #div-create-invoice-sub-form div div #div-form-invoice-create-tab #tabs li #a-tab-form-invoice-create-info").attr("href","#div-form-invoice-create-info-edit");			
			$("#tbody-table-invoice tr #td-invoice-temp-1-next #div-create-invoice-sub-form div div #div-form-invoice-create-tab-pages #div-form-invoice-create-info").attr("id","div-form-invoice-create-info-edit");

			$("#tbody-table-invoice tr #td-invoice-temp-1-next #div-create-invoice-sub-form div div #div-form-invoice-create-tab #tabs li #a-tab-form-invoice-create-payment").attr("href","#div-form-invoice-create-payment-edit");			
			$("#tbody-table-invoice tr #td-invoice-temp-1-next #div-create-invoice-sub-form div div #div-form-invoice-create-tab-pages #div-form-invoice-create-payment").attr("id","div-form-invoice-create-payment-edit");

			$("#td-invoice-temp-1-next #div-create-invoice-sub-form div div #div-form-invoice-create-tab-pages #div-form-invoice-create-lines-edit div div #btn-form-invoice-create-add-line").click(function(){		
				$.fn.invoiceLineEditFormScript();
			});
			
			$.fn.invoiceLineEditFormScript = function(){				
				invoiceLineEditArray.push("btn-form-invoice-create-invoice-line-remove-"+invoiceLineEditCount);
				$("#td-invoice-temp-1-next #div-create-invoice-sub-form div div #div-form-invoice-create-tab-pages #div-form-invoice-create-lines-edit div div #table-invoice-line #tbody-table-invoice-line").append("<tr><td id='td-form-invoice-create-invoice-line-product-name-'"+invoiceLineEditCount+"><input type='text' id='input-text-form-invoice-create-invoice-line-product-name-'"+invoiceLineEditCount+" class='form-control'/></td>" +
															"<td id='td-form-invoice-create-invoice-line-unit-price-'"+invoiceLineEditCount+"><input type='text' id='input-text-form-invoice-create-invoice-line-unit-price'"+invoiceLineEditCount+" class='form-control'/></td>" +
															"<td id='td-form-invoice-create-invoice-line-qty-'"+invoiceLineEditCount+"><input type='text' id='input-text-form-invoice-create-invoice-line-qty'"+invoiceLineEditCount+" class='form-control'/></td>" +
															"<td id='td-form-invoice-create-invoice-line-tax-'"+invoiceLineEditCount+"><input type='text' id='input-text-form-invoice-create-invoice-line-tax-'"+invoiceLineEditCount+" class='form-control'/></td>" +
															"<td id='td-form-invoice-create-invoice-line-amount-'"+invoiceLineEditCount+"><input type='text' id='input-text-form-invoice-create-invoice-line-amount-'"+invoiceLineEditCount+" class='form-control'/></td>" +
															"<td id='td-form-invoice-create-invoice-line-remove-'"+invoiceLineEditCount+"><button type='button' id='btn-form-invoice-create-invoice-line-remove-"+invoiceLineEditCount+"' class='invoice-line-remove-button form-control btn btn-primary btn-sm '><span class='glyphicon glyphicon-remove'></span></button></td>" +
														"</tr>");				
				invoiceLineEditCount= invoiceLineEditCount+1;			
				$.fn.removeLineEditScript();
				
			};
			
			$.fn.removeLineEditScript = function(){
				$(".invoice-line-remove-button").click(function(){			
					var currentItemId = $(this).attr("id");
					for(var i=0 ; i< invoiceLineEditArray.length ; i=i+1){				
						if(invoiceLineEditArray[i] == currentItemId)
						{
							delete invoiceLineEditArray[i];
						}	
					}
					$(this).parent().parent().hide();			
				});
			};
			
			$("#td-invoice-temp-1-next #div-create-invoice-sub-form div div #div-form-invoice-create-tab-pages #div-form-invoice-create-payment-edit div div #btn-form-invoice-create-add-payment-line").click(function(){
				$.fn.invoicePaymentLineEditScript();
			});
			
			$.fn.invoicePaymentLineEditScript = function(){		
				paymentLineEditArray.push("btn-form-invoice-create-payment-line-remove-"+paymentLineEditCount);
				$("#td-invoice-temp-1-next #div-create-invoice-sub-form div div #div-form-invoice-create-tab-pages #div-form-invoice-create-payment-edit div div #table-invoice-line #tbody-table-invoice-payment-line").append("<tr><td id='td-form-invoice-create-payment-line-date-'"+paymentLineEditCount+"><input type='text' id='input-text-form-invoice-create-payment-line-date-'"+paymentLineEditCount+" class='form-control'/></td>" +
															"<td id='td-form-invoice-create-payment-line-transaction-id'"+paymentLineEditCount+"><input type='text' id='input-text-form-invoice-create-payment-line-transaction-id'"+paymentLineEditCount+" class='form-control'/></td>" +
															"<td id='td-form-invoice-create-payment-line-amount-'"+paymentLineEditCount+"><input type='text' id='input-text-form-invoice-create-payment-line-amount'"+paymentLineEditCount+" class='form-control'/></td>" +
															"<td id='td-form-invoice-create-payment-line-remove-'"+paymentLineEditCount+"><button type='button' id='btn-form-invoice-create-payment-line-remove-"+paymentLineEditCount+"' class='invoice-line-remove-button form-control btn btn-primary btn-sm '><span class='glyphicon glyphicon-remove'></span></button></td>" +
														"</tr>");				
				paymentLineEditCount= paymentLineEditCount+1;
				
//				$("#input-text-form-invoice-create-payment-line-date-"+paymentLineCount).datepicker({
//					format: "dd/mm/yyyy"
//				});
				
				removePaymentLineScript();
				
			};
			function removePaymentLineScript()
			{
				$(".invoice-line-remove-button").click(function(){			
					var currentItemId = $(this).attr("id");
					for(var i=0 ; i< paymentLineEditArray.length ; i=i+1){				
						if(paymentLineEditArray[i] == currentItemId)
						{
							delete paymentLineEditArray[i];
						}	
					}
					$(this).parent().parent().hide();			
				});
			}
			//add-line main form script ends from here	
		});			
	};	
	
	
	$("#btn-form-invoice-create-add-payment-line").click(function(){		
		$.fn.invoicePaymentLineScript();
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
	var orderLineArray = [];
	var orderLineCountEdit = 0;
	var orderLineEditArray= [];
	/*.......launch the order form.......*/
	$("#btn-order-create").click(function(){			
		$("#div-form-order-create").toggle();
	});
	$('.selectpicker').selectpicker();	
	
	$('.selectpicker').selectpicker({
		style: 'btn-info',
		size: 4
	});
	$('#input-date-form-order-create-order-date').datepicker({
		format: "dd/mm/yyyy"
	}); 
	$.fn.orderLineFormScript = function(){					
		$("#tbody-table-order-line").append("<tr><td id='td-form-order-create-order-line-title-'"+orderLineCount+"><input type='text' id='input-text-form-order-create-order-line-title-'"+orderLineCount+" class='form-control'/></td>" +
												"<td id='td-form-order-create-order-line-qty-'"+orderLineCount+"><input type='text' id='input-text-form-order-create-order-line-qty-'"+orderLineCount+" class='form-control'/></td>" +
												"<td id='td-form-order-create-order-line-unit-price-'"+orderLineCount+"><input type='text' id='input-text-form-order-create-order-line-unit-price-'"+orderLineCount+" class='form-control'/></td>" +
												"<td id='td-form-order-create-order-line-taxable-amount-'"+orderLineCount+"><input type='text' id='input-text-form-order-create-order-line-amount-'"+orderLineCount+" class='form-control'/></td>" +
												"<td id='td-form-order-create-order-line-tax-'"+orderLineCount+"><input type='text' id='input-text-form-order-create-order-line-tax-'"+orderLineCount+" class='form-control'/></td>" +
												"<td id='td-form-order-create-order-line-subtotal-'"+orderLineCount+"><input type='text' id='input-text-form-order-create-order-line-subtotal-'"+orderLineCount+" class='form-control'/></td>" +
												"<td id='td-form-order-create-order-line-remove-line-'"+orderLineCount+"><button type='button' id='btn-form-order-create-order-line-remove-"+orderLineCount+"' class='order-line-remove-button form-control btn btn-primary btn-sm '><span class='glyphicon glyphicon-remove'></span></button></td></tr>");				
		orderLineArray.push("btn-form-order-create-order-line-remove-"+orderLineCount);
		orderLineCount= orderLineCount+1;
		removeOrderLineScript();
	};
	
	function removeOrderLineScript()
	{
		$(".order-line-remove-button").click(function(){			
			var currentItemId = $(this).attr("id");
			for(var i=0 ; i< orderLineArray.length ; i=i+1){				
				if(orderLineArray[i] == currentItemId)
				{
					delete orderLineArray[i];
				}	
			}
			$(this).parent().parent().hide();			
		});
	}
	
	$.fn.orderLineFormTableEditScript = function(){			
		orderLineCountEdit= orderLineCountEdit+1;
		$("#div-order-line-table-inner #table-order-line #tbody-table-order-line").append("<tr><td id='td-form-order-create-order-line-title-'"+orderLineCountEdit+"><input type='text' id='input-text-form-order-create-order-line-title-'"+orderLineCountEdit+" class='form-control'/></td>" +
												"<td id='td-form-order-create-order-line-qty-'"+orderLineCountEdit+"><input type='text' id='input-text-form-order-create-order-line-qty-'"+orderLineCountEdit+" class='form-control'/></td>" +
												"<td id='td-form-order-create-order-line-unit-price-'"+orderLineCountEdit+"><input type='text' id='input-text-form-order-create-order-line-unit-price-'"+orderLineCountEdit+" class='form-control'/></td>" +
												"<td id='td-form-order-create-order-line-taxable-amount-'"+orderLineCountEdit+"><input type='text' id='input-text-form-order-create-order-line-amount-'"+orderLineCountEdit+" class='form-control'/></td>" +
												"<td id='td-form-order-create-order-line-tax-'"+orderLineCountEdit+"><input type='text' id='input-text-form-order-create-order-line-tax-'"+orderLineCountEdit+" class='form-control'/></td>" +
												"<td id='td-form-order-create-order-line-subtotal-'"+orderLineCountEdit+"><input type='text' id='input-text-form-order-create-order-line-subtotal-'"+orderLineCountEdit+" class='form-control'/></td>" +
												"<td id='td-form-order-create-order-line-remove-'"+orderLineCountEdit+"><button type='button' id='btn-form-order-create-order-line-remove-"+orderLineCount+"' class='order-line-remove-button form-control btn btn-primary btn-sm '><span class='glyphicon glyphicon-remove'></span></button></tr>");				
		orderLineEditArray.push("btn-form-order-create-order-line-remove-"+orderLineCount);
		orderLineCount= orderLineCount+1;
		removeOrderLineEditScript();
	};
	function removeOrderLineEditScript()
	{
		$("#div-order-line-table-inner div div #table-order-line #tbody-table-order-line tr td .order-line-remove-button").click(function(){			
			var currentItemId = $(this).attr("id");
			for(var i=0 ; i< orderLineEditArray.length ; i=i+1){				
				if(orderLineEditArray[i] == currentItemId)
				{
					delete orderLineEditArray[i];
				}	
			}
			$(this).parent().parent().hide();			
		});
	}
	
	$("#btn-form-order-line-create-add-line").click(function(){
		$.fn.orderLineFormScript();
	});	
	$("#btn-form-order-create-order-line-total").click(function(){
		alert('now count is '+orderLineCount);		
	});
	
	$("#btn-form-order-create-reset").click(function(){
		$("#div-create-order-sub-form").load('sub_form_order_create.jsp',function(){
			orderPageScript(domainName);
		});
		
	});
	
	/*...........Demo Table script OPEN...........*/
	var orderTableDemoData="<tr><td><input type='checkbox' id='input-check-orders-temp-1' value=''></input></td><td>1245855685522</td><td>Amit Sharma</td><td>Amazon.in</td><td>poi314577455</td><td>10/05/2012</td><td>pending</td></tr>";
	ordersTableDemoData = orderTableDemoData+"<tr><td id='input-check-orders-temp-1-next' colspan='7'></td></tr>";	
	$("#tbody-table-orders").html(ordersTableDemoData);	
	
	
	$("#input-check-orders-temp-1").click(function(){			
		
		ordersTableRowEdit();
		$("#input-check-orders-temp-1-next").toggle();
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
						
			$("#td-orders-temp-1-next #div-form-order-create-line-4 #div-form-order-create-reset #btn-form-order-create-reset").css("display","none");
			
			$('.selectpicker').selectpicker();	
			
			$('.selectpicker').selectpicker({
				style: 'btn-info',
				size: 4
			});
			
			$("#div-create-order-sub-form #div-form-order-create-line-2 #div-order-line-table #btn-form-order-line-create-add-line").click(function(){
				$.fn.orderLineFormTableEditScript();
			});
			$("#div-create-order-sub-form #div-form-order-create-line-2 #div-order-line-table #btn-form-order-create-order-line-total").click(function(){
				alert('now count is '+orderLineCountEdit);		
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
