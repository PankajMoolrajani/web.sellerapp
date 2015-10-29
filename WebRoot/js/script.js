$(document).ready(function(){		
	var domain_name = "localhost";
	//var domain_name = "45.79.129.71";
	//var domainName = "dev.monoxor.com";
		
	/*................... Javascript for Index page ......................*/

	$("#a-home-page-nav-bar-login").click(function(){			
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
				url: "http://"+domain_name+":8080/rest.sellerapp/auth/access-token-url",
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
				url: "http://"+domain_name+":8080/rest.sellerapp/auth/access-token-check-url",
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
		window.location.assign("dashboard.jsp");
		//submitLoginForm(login_username,login_password);		
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
	
	userCreatePageScript(domain_name); //calling of user-management page script
	userCreateFormVal(domain_name); //calling of user-mgmt validation page script
	
	userCatCreatePageScript(domain_name); //calling of user-category page script
	userCatCreateFormVal(domain_name); //calling of user-mgmt validation page script	
	inventoryPageScript(domain_name);
	orderPageScript(domain_name); 
	
	
	invoicePageScript(domain_name);
	invoiceCreateFormVal(domain_name);
	
	saveButtonScript(domain_name);	
	resetButtonScript(domain_name);
	searchBarScript(domain_name);
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

function editButtonScript(domain_name)
{		
	$(".btn-page-state-edit-main").click(function(){				
		var parentId = $(this).parent().parent().attr("id");		
		switch(parentId){
	    case "div-form-user-create-state-buttons":
	    	editUserFormDetails(domain_name);
	        break;
	    case "div-form-user-category-create-state-buttons":
	        editUserCatFormDetails(domain_name);
	        break;
	    case "div-form-inventory-create-state-buttons":
	        editInventoryFormDetails(domain_name);
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

function editUserFormDetails(domain_name){
	
	var checked_form_elements_id = JSON.parse(localStorage["checked_form_elements_id"]);	
	for(var i=0 ; i<checked_form_elements_id.length ; i=i+1)
	{
		$(checked_form_elements_id[i]).prop("disabled",false);				
	}	
	var checkedFormEditSaveBtnId = JSON.parse(localStorage["checked_form_edit_save_btn_id"]);	
	
	$(checkedFormEditSaveBtnId[1]).prop('disabled', false);
	$(checked_form_elements_id[2]).selectpicker('refresh');		
}

function editUserCatFormDetails(domain_name){	
	var checked_form_elements_id = JSON.parse(localStorage["checked_form_elements_id_user_category"]);	
	for(var i=0 ; i<checked_form_elements_id.length ; i=i+1)
	{
		$(checked_form_elements_id[i]).prop("disabled",false);				
	}	
	var checkedFormEditSaveBtnId = JSON.parse(localStorage["checked_form_edit_save_btn_id_user_category"]);	
	
	$(checkedFormEditSaveBtnId[1]).prop('disabled', false);
	$(checked_form_elements_id[2]).selectpicker('refresh');	
}
function editInventoryFormDetails(domain_name){		
	var checked_form_elements_id = JSON.parse(localStorage["checked_inventory_form_elements_id"]);	
	for(var i=0 ; i<checked_form_elements_id.length ; i=i+1)
	{
		$(checked_form_elements_id[i]).prop("disabled",false);				
	}	
	var checkedFormEditSaveBtnId = JSON.parse(localStorage["checked_form_inventory_edit_save_btn_id"]);	
	
	$(checkedFormEditSaveBtnId[1]).prop('disabled', false);
	$(checked_form_elements_id[2]).selectpicker('refresh');		
}
function editOrderFormDetails(domain_name){	
}
function editInvoiceFormDetails(domain_name){	
}

function saveButtonScript(domain_name){	
	$(".btn-page-state-save-main").click(function(){			
		var parentId = $(this).parent().parent().attr("id");					
		switch(parentId) {
	    case "div-form-user-create-state-buttons":
	    	submitUserFormDetails(domain_name);
	        break;
	    case "div-form-user-category-create-state-buttons":
	        submitUserCatFormDetails(domain_name);
	        break;
	    case "div-form-inventory-create-state-buttons":
	        submitInventoryFormDetails(domain_name);
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

function submitUserFormDetails(domain_name){			
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
		jsonData.zip = $(selector[8]).val();		
		
		var jsonText = JSON.stringify(jsonData);			
		$.ajax({
			type: "POST",
			url: "http://"+domain_name+":8080/rest.sellerapp/user/create",
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
	var user_form_submit_state="false";
	for(var i=0 ; i<selector.length ; i=i+1)
	{		
		if($(selector[i]).parent().hasClass("has-error") || $(selector[i]).val()=="")
		{				
			user_form_submit_state = "false";
			alert("First Fill all the fields Properly");		
			$btn.button('reset');
			break;
		}
		else
		{
			user_form_submit_state="true";			 
		}
	}
	if(user_form_submit_state=="true")
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

function submitInventoryFormDetails(domain_name){
	
	//var $btn = $("#div-form-inventory-create-state-buttons div .btn-page-state-save-main").button('loading');
	uploadInventoryImages();
	
	function uploadInventoryImages(){		
		var files = $('input[name="name_inventory_create_images"]').get(0).files;			
		var formData = new FormData();				
		for (var i = 0; i < files.length; i++)
		{			
			formData.append('file', files[i]);
		}
		$.ajax({
			type: "POST",
			url: "http://"+domain_name+":8080/rest.sellerapp/inventory/upload_images",								
			data: formData,
			cache : false,
			async : false,
			contentType: false,
	        processData: false,
	        dataType:"json",
			success: function(response){
				var uploaded_images_dir = response["image_dir_path"];
				sendInventoryFormData(uploaded_images_dir)				
				
			},
			error: function(request, error, data){				
				alert(JSON.stringify(request) +" "+error+" "+data);					
			}  						
		});	
	}
	
	
	function sendInventoryFormData(uploaded_images_dir){		
		var selector = ["#input-text-form-inventory-create-base-sku",
		                "#input-text-form-inventory-create-name",
		                "#input-select-form-invenotry-create-brand",
		                "#input-text-form-inventory-create-weight",
		                "#input-text-form-inventory-create-maxprice", 
		                "#input-text-form-invenotry-create-minprice", 
		                "#input-text-form-invenotry-create-stock", 	  
		                "#input-select-modal-form-inventory-category-create", 
		                "#input-text-form-inventory-create-stock-in-hand",
		                "#input-text-form-inventory-create-stock-outgoing",
		                "#input-text-form-inventory-create-stock-incoming",
		                "#input-text-form-inventory-create-warehouse",
		                "#input-text-form-inventory-create-aisle",
		                "#input-text-form-inventory-create-rack",
		                "#input-text-form-inventory-create-row",
		                "#input-text-form-inventory-create-case",
		                "#input-select-form-invenotry-create-procurement-type",
		                "#input-select-form-invenotry-create-procurement-supplier",
		                "#input-text-form-inventory-create-procurement-time",
		                "#input-text-form-inventory-create-min-price",
		                "#input-text-form-inventory-create-max-price",
		                "#input-text-form-inventory-create-cost-price",
		                "#input-text-form-inventory-create-tax",
		                uploaded_images_dir];		
		var temprory_market_place = 0;
		//$btn.button('reset');
		//,temprory_market_place
		submitInventoryForm(selector);	
	}
	
	//passing selector and marketplaceCount to the function
	//$.fn.inventoryEntryFormValid(selector,marketplaceCount);		
	
	//validation of fields
	$.fn.inventoryEntryFormValid = function(selector,marketplaceCount){						
		var inventoryFullSubmitState="false";
		for(var i=0 ; i<selector.length ; i=i+1)
		{		
			if($(selector[i]).parent().hasClass("has-error") || $(selector[i]).val()==""){				
				inventoryFullSubmitState= "false";						  
				break;
			}
			else{				 				
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
	
	function submitInventoryForm(selector){			
		var jsonData = new Object();		
		jsonData.available =$(selector[8]).val();			
		jsonData.incoming = $(selector[10]).val();
		jsonData.outgoing = $(selector[9]).val();
		jsonData.price_sell = $(selector[19]).val();		
		jsonData.price_mrp = $(selector[20]).val();		
		alert($(selector[7]).attr('name'));
		jsonData.id_category = $(selector[7]).attr('name');		
		jsonData.sku = $(selector[0]).val();
		jsonData.image_dir = selector[23];
		//jsonData.sku_replica = selector[0];
		jsonData.name = $(selector[1]).val();
		//jsonData.status_listing = selector[0];
		var jsonText = JSON.stringify(jsonData);
				
		$.ajax({
			type: "POST",
			url: "http://"+domain_name+":8080/rest.sellerapp/inventory/create",
			data: jsonText,
			async : false,
			contentType : "application/json",			
			dataType: "html",			
			success: function(responseText){			
				alert(responseText);
			},
			error: function(request, error, data){				
				alert(error);				
			}  						
		});	
		
//		var inventory_sku = $(selector[0]).val();
//		var inventory_name = $(selector[1]).val();
//		var inventory_maxPrice = $(selector[2]).val();
//		var inventory_minPrice = $(selector[3]).val();
//		var inventory_stock = $(selector[4]).val();
//		var inventory_status = $(selector[5]).val();
//		var category_search = $(selector[6]).val();
//		var inventory_tagId = $(selector[7]).val();
					
//		var inventoryForm_json_txt = '{"inventory_sku":"'+inventory_sku+'","inventory_name":"'+inventory_name+'","inventory_maxPrice":"'+inventory_maxPrice+'","inventory_minPrice":"'+inventory_minPrice+'","inventory_stock":"'+inventory_stock+'","inventory_status":"'+inventory_status+'","category_search":"'+category_search+'","inventory_tagId":"'+inventory_tagId+'","selected_cat_id":"'+inventory_cat_id+'"}';		
//		var inventoryForm_json_obj = JSON.parse(inventoryForm_json_txt);			
//		
//		var data_jsonPre = '{"marketplaceEntries":[';
//		var data_jsonMid ="";
//		var data_jsonPost = ']}';		
//		for(var i=1 ; i<=marketplaceCount ; i=i+1)
//		{					
//			var product_marketplace_name = $("#span-form-inventory-mplaceName"+i).text();
//			var product_marketplace_id = $("#span-form-inventory-mplaceName"+i).attr("data-form-mplace"+i);			
//			var product_marketplace_url = $("#span-form-inventory-mplaceUrl"+i).text();			
//			var sell_price = $("#input-form-inventory-sellPrice"+i).val();
//			var stock = $("#input-text-form-invenotry-create-stock"+i).val();
//			var status = $("#input-form-inventory-status"+i).val();				
//			if(i<marketplaceCount)
//			{
//				data_jsonMid = data_jsonMid+'{"product_marketplace_id":"'+product_marketplace_id+'","product_marketplace_name":"'+product_marketplace_name+'","product_marketplace_url":"'+product_marketplace_url+'","sellPrice": "'+sell_price+'","stockPrice": "'+stock+'","status": "'+status+'"},';
//			}			
//			else // for last line without ','
//			{
//				data_jsonMid = data_jsonMid+'{"product_marketplace_id":"'+product_marketplace_id+'","product_marketplace_name":"'+product_marketplace_name+'","product_marketplace_url":"'+product_marketplace_url+'","sellPrice": "'+sell_price+'","stockPrice": "'+stock+'","status": "'+status+'"}';
//			}				
//		}		 
//		var marketplaceEntry_json_txt = data_jsonPre+data_jsonMid+data_jsonPost;		
//		var marketplaceEntry_json_obj = JSON.parse(marketplaceEntry_json_txt);							
		 
		$.ajax({
			type: "POST",
			url: "InventoryAjaxInsert",			
			dataType: "json",
			data: {"requestType": "makeFinalInventory",
					"inventoryForm_json_obj": JSON.stringify(inventoryForm_json_obj),
					"marketplaceEntry_json_obj": JSON.stringify(marketplaceEntry_json_obj),
					"marketplaceCount" : marketplaceCount
				 },
			success: function(responseText){			
					 var $btn = $("#input-btn-submit-form-inventory-create").button('reset');
					 //check if category is available there 
					 var error_code = responseText["error_code"];
					 if(error_code=="")
					 {
						 $("#div-inventory-page").load('inventory.jsp');
						alert('success');						
					 }
					 else
					 {
						 var error_message=getErrorMessage(error_code);
						 alert(error_message);
					 }
			},
			error: function(request, error, data){				
				alert(error);				
			}  						
		});	
		
	}
}

function resetButtonScript(domain_name)
{
	$(".btn-page-state-reset-main").click(function(){					
		var parentId = $(this).parent().parent().attr("id");		
		switch(parentId) {
	    case "div-form-user-create-state-buttons":
	    	resetUserFormDetails(domain_name);
	        break;
	    case "div-form-user-category-create-state-buttons":
	        resetUserCatFormDetails(domain_name);
	        break;
	    case "div-form-inventory-create-state-buttons":
	        resetInventoryFormDetails(domain_name);
	        break;
	    case "div-form-order-create-state-buttons":
	        resetOrderFormDetails(domain_name);
	        break;
	    case "div-form-invoice-create-pay-invoice":
	        resetInvoiceFormDetails(domain_name);
	        break;
	    default:
	    	
		}
	});
}
function resetUserFormDetails(domain_name)
{	
	$("#div-create-user-sub-form").load('sub_form_user_create.jsp',function(){
		userCreatePageScript(domain_name);
		userCreateFormVal(domain_name);
		selectPickerScript();		
		/*.......launch the user form.......*/
		$("#btn-user-create").click(function(){			
			$("#div-form-user-create").toggle();
		});
	});
}
function resetUserCatFormDetails(domain_name)
{
	$("#div-create-user-category-sub-form").load('sub_form_user_category_create.jsp',function(){
	
		userCatCreatePageScript(domain_name);
		userCatCreateFormVal(domain_name);			
		/*.......launch the user form.......*/
		$("#btn-user-category-create").click(function(){			
			$("#div-form-user-category-create").toggle();
		});
	});			
}
function resetInventoryFormDetails()
{}
function resetOrderFormDetails()
{}
function resetInvoiceFormDetails()
{}

function searchBarScript(domain_name)
{	
	$(".input-text-search-box-main").keyup(function(){		
		var search_text_value = $(this).val();				
		var parent_id = $(this).parent().parent().attr("id");		
		switch(parent_id) {
	    case "div-user-search":
	    	searchUserFormDetails(domain_name, search_text_value);
	        break;
	    case "div-user-category-search":
	    	searchUserCategoryFormDetails(domain_name, search_text_value);
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
function searchUserFormDetails(domain_name, user_search_text)
{	
	/*........first it Loads table according to the screen-size.......*/		
	if(($(window).width())>=750) /*......screen width greater than 750px.....*/
	{	
		if(!(user_search_text==""))  //if a character typed in search-bar
		{	 	
			var jsonData = new Object();					
			jsonData.name_user = user_search_text;			
			var jsonText = JSON.stringify(jsonData);			
			$.ajax({ 						
				type: "POST",
				url: "http://"+domain_name+":8080/rest.sellerapp/user/get/search",	
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
					userCreateSubScript(domain_name);
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
				url: "http://"+domain_name+":8080/rest.sellerapp/user/get/all",		
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
					userCreateSubScript(domain_name);
				},
				error: function(request, error, data){
					alert(error);				
				}  						
			});
		}
	}
	else	  /*......screen width less than 750px.....*/
	{	
		if(!(user_search_text==""))  //if a character typed in search-bar
		{	 	 						
			$.ajax({ 						
				type: "POST",
				url: "http://"+domain_name+":8080/rest.sellerapp/user/get/search/"+user_search_text,
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
					userCreateSubScript(domain_name);
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
				url: "http://"+domain_name+":8080/rest.sellerapp/user/get/all",		
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
					userCreateSubScript(domain_name);
				},
				error: function(request, error, data){
					alert(error);				
				}  						
			});
		}
	}
}

function searchUserCategoryFormDetails(domain_name, user_category_search_text)
{				
	if(!(user_category_search_text==""))
	{		
		var json_search_object = new Object();		
		json_search_object.name = user_category_search_text;					
		var json_search_text = JSON.stringify(json_search_object);			
		$.ajax({ 									
			type: "POST",
			url: "http://"+domain_name+":8080/rest.sellerapp/user/category/get/search",	
			async: false,
			contentType :"application/json; charSet=UTF-8",
			data: json_search_text,			
			dataType: "json",			
			success: function(responseText){						
				var user_category_rows="";							
				for(var i=0 ; i<responseText["user_category_search_row"].length ; i=i+1){				        		
					user_category_rows = user_category_rows+"<tr><td id='td-user-category-form-create-table-"+responseText["user_category_search_row"][i].id+"'><input class='user-category-table-row-checkbox' type='checkbox' value="+responseText["user_category_search_row"][i].id+"></input>"+
		    		"</td><td>"+responseText["user_category_search_row"][i].id+
					"</td><td>"+responseText["user_category_search_row"][i].name+    			
	    			"</td></tr><tr><td id='td-user-category-form-create-table-"+responseText["user_category_search_row"][i].id+"-form' class='user-category-table-row-attech-form' colspan='5'></td></tr>";		    		
				}		    						
				$("#tbody-table-user-category").html(user_category_rows);						
			},
			error: function(request, error, data){
				alert(data);				
			}  						
		});
	}

	else
	{
		$.ajax({
			type: "GET",
			url: "http://"+domain_name+":8080/rest.sellerapp/user/category/get/all",		
			async: false,
			dataType: "json",			
			success: function(responseText){				
				var user_category_table="";				
		    	for(var i=0 ; i<responseText["user_category_table"].length ; i=i+1){				        		
		    		user_category_table =	user_category_table+"<tr><td id='td-user-category-form-create-table-"+responseText["user_category_table"][i].id+"'><input class='user-category-table-row-checkbox' type='checkbox' value="+responseText["user_category_table"][i].id+"></input>"+
		    		"</td><td>"+responseText["user_category_table"][i].id+
					"</td><td>"+responseText["user_category_table"][i].name+    			
	    			"</td></tr><tr><td id='td-user-category-form-create-table-"+responseText["user_category_table"][i].id+"-form' class='user-category-table-row-attech-form' colspan='5'></td></tr>";		    		
				}		    			    
				$("#tbody-table-user-category").html(user_category_table);				
				userCreateSubScript(domain_name);
			},
			error: function(request, error, data){
				alert(error+" in user table data");				
			}  						
		});
	}	
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
function userCreatePageScript(domain_name)
{					
	localStorage.setItem("current_checkbox_value", JSON.stringify(""));					

	//fetch user Categories for user create form	
	$.ajax({
		type: "GET",
		url: "http://"+domain_name+":8080/rest.sellerapp/user/category/get/all",		
		async: false,
		dataType: "json",			
		success: function(responseText){										    	
	    	var category_list = ""; 
	    	for(var i=0 ; i<responseText["user_category_table"].length ; i=i+1)
	    	{
	    		category_list = category_list+"<option value='"+responseText["user_category_table"][i].id+"'>"+responseText["user_category_table"][i].name+"</option>";
	    	}	    	 
	    	$("#input-select-form-user-create-category").append(category_list);
	    	
		},
		error: function(request, error, data){
				alert(error+" in user_cat fech list");				
		}  						
	});
	
//	$( "#input-select-form-user-create-category" ).change(function () {	
//		var text = $("#input-select-form-user-create-category option:selected").text();
//		if(text=="CreateCategory")
//		{
//			$("#div-modal-form-user-create-category").modal('show');
//		}
//	});	
	
	/*...........Demo Table script OPEN...........*/
	if(($(window).width())>=750)
	{
		$.ajax({
			type: "GET",
			url: "http://"+domain_name+":8080/rest.sellerapp/user/get/all",		
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
				userCreateSubScript(domain_name);
				},
				error: function(request, error, data){
					alert(error+" in user table data "+data);				
				}  						
			});
	}
	else
	{
		$.ajax({
			type: "GET",
			url: "http://"+domain_name+":8080/rest.sellerapp/user/get/all",		
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
			userCreateSubScript(domain_name);
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

///*......load form each time when clicking on nav user......*/
//	$("#li-tab-user-browse").click(function(){  
//		$("#div-form-user-create").css("display","none");
//		$("#div-form-user-create").load('form_user_create.jsp');
//	}); 
}

function userCreateSubScript(domain_name)
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
			userCreateFormVal(domain_name);
			editButtonScript(domain_name);
			$("#"+form_id+" #div-form-user-create-heading").css("display","none");
			var checked_form_elements_id =[
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
			
			localStorage["checked_form_elements_id"] = JSON.stringify(checked_form_elements_id);
			
			var checked_form_edit_save_btn_id = ["#"+form_id+" #div-form-user-create-state-buttons div .btn-page-state-edit-main",
			                                "#"+form_id+" #div-form-user-create-state-buttons div .btn-page-state-save-main"];
			localStorage["checked_form_edit_save_btn_id"] = JSON.stringify(checked_form_edit_save_btn_id);
			
			var checked_user_id = JSON.parse(localStorage.getItem("current_checkbox_value"));
			
			//filling category-list of toggle form 
			$.ajax({
				type: "GET",
				url: "http://"+domain_name+":8080/rest.sellerapp/user/category/get/all",		
				async: false,
				dataType: "json",			
				success: function(responseText){										    	
			    	var category_list = ""; 
			    	for(var i=0 ; i<responseText["user_category_table"].length ; i=i+1)
			    	{
			    		category_list = category_list+"<option value='"+responseText["user_category_table"][i].id+"'>"+responseText["user_category_table"][i].name+"</option>";
			    	}	    	 
			    	$(checked_form_elements_id[2]).append(category_list);			    	
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
				url: "http://"+domain_name+":8080/rest.sellerapp/user/get/id",		
				async: false,
				contentType: "application/json; charset=utf-8",
				data:json_user_text,
				dataType: "json",						
				success: function(responseText){					
					$(checked_form_elements_id[0]).prop("disabled",true).val(responseText["userDetails"].name_first);
					$(checked_form_elements_id[1]).prop("disabled",true).val(responseText["userDetails"].name_last);
					
					//need to make title attribut blank to set a value to select menu
					$(checked_form_elements_id[2]).attr("title","");										
					$(checked_form_elements_id[2]).prop("disabled",true).val(responseText["userCategoryDetails"].id);
					$(checked_form_elements_id[3]).prop("disabled",true).val(responseText["userDetails"].phone);
					$(checked_form_elements_id[4]).prop("disabled",true).val(responseText["userDetails"].emailid);
					$(checked_form_elements_id[5]).prop("disabled",true).val(responseText["userDetails"].address_line_one);
					$(checked_form_elements_id[6]).prop("disabled",true).val(responseText["userDetails"].address_line_two);
					$(checked_form_elements_id[7]).prop("disabled",true).val(responseText["userDetails"].city);
					$(checked_form_elements_id[8]).prop("disabled",true).val(responseText["userDetails"].state);
					$(checked_form_elements_id[9]).prop("disabled",true).val(responseText["userDetails"].zip);
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
			json_user_data.name_first = $(checked_form_elements_id[0]).val();					
			json_user_data.name_last = $(checked_form_elements_id[1]).val();
			json_user_data.id_user_category = $(checked_form_elements_id[2]).val();
			json_user_data.phone = $(checked_form_elements_id[3]).val();
			json_user_data.emailid = $(checked_form_elements_id[4]).val();
			json_user_data.address_line_one = $(checked_form_elements_id[5]).val();
			json_user_data.address_line_two = $(checked_form_elements_id[6]).val();
			json_user_data.city = $(checked_form_elements_id[7]).val();
			json_user_data.state = $(checked_form_elements_id[8]).val();
			json_user_data.zip = $(checked_form_elements_id[9]).val();				
			json_user_data.id = JSON.parse(localStorage.getItem("current_checkbox_value"));
			
			var json_user_text = JSON.stringify(json_user_data);			
			
		//user_form update script
			$("#"+form_id+" #div-form-user-create-state-buttons div .btn-page-state-save-main").click(function(){				
				var $btn = $("#"+form_id+" #div-form-user-create-state-buttons div .btn-page-state-save-main").button('loading');																
				
				var json_user_updated_data = new Object();
				json_user_updated_data.name_first = $(checked_form_elements_id[0]).val();					
				json_user_updated_data.name_last = $(checked_form_elements_id[1]).val();
				json_user_updated_data.id_user_category = $(checked_form_elements_id[2]).val();
				json_user_updated_data.phone = $(checked_form_elements_id[3]).val();
				json_user_updated_data.emailid = $(checked_form_elements_id[4]).val();
				json_user_updated_data.address_line_one = $(checked_form_elements_id[5]).val();
				json_user_updated_data.address_line_two = $(checked_form_elements_id[6]).val();
				json_user_updated_data.city = $(checked_form_elements_id[7]).val();
				json_user_updated_data.state = $(checked_form_elements_id[8]).val();
				json_user_updated_data.zip = $(checked_form_elements_id[9]).val();				
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
					url: "http://"+domain_name+":8080/rest.sellerapp/user/update",
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
function userCreateFormVal(domain_name)
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

function userCatCreatePageScript(domain_name)
{		
	localStorage.setItem("current_checkbox_value_user_category", JSON.stringify(""));
	/*............fetch user category table.............*/
	$.ajax({
		type: "GET",
		url: "http://"+domain_name+":8080/rest.sellerapp/user/category/get/all",		
		async: false,
		dataType: "json",			
		success: function(responseText){				
			var user_category_table="";				
	    	for(var i=0 ; i<responseText["user_category_table"].length ; i=i+1){				        		
	    		user_category_table = user_category_table+"<tr><td id='td-user-category-form-create-table-"+responseText["user_category_table"][i].id+"'><input class='user-category-table-row-checkbox' type='checkbox' value="+responseText["user_category_table"][i].id+"></input>"+
	    		"</td><td>"+responseText["user_category_table"][i].id+
				"</td><td>"+responseText["user_category_table"][i].name+    			
    			"</td></tr><tr><td id='td-user-category-form-create-table-"+responseText["user_category_table"][i].id+"-form' class='user-category-table-row-attech-form' colspan='5'></td></tr>";		    		
			}		    			    
			$("#tbody-table-user-category").html(user_category_table);				
			userCatCreateSubScript(domain_name);
		},
		error: function(request, error, data){
			alert(error+" in user table data");				
		}  						
	});
	
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
	
	$("#td-user-cat-temp-1").click(function(){			
		userCatTableRowEdit();
		$("#td-user-cat-temp-1-next").toggle();
	});
	
	/*.......launch the user-category form.......*/
	$("#btn-user-category-create").click(function(){		
		$("#div-form-user-category-create").toggle();
	});
}

function userCatCreateSubScript(domain_name)
{				
	var row_attech_form_id;
	$(".user-category-table-row-checkbox").click(function(){		
		if($(this).is(':checked')){
			$("body").fadeTo("fast", 0.4);
			$("#spinner").show();		
			
			//id of user						
			var	current_checkbox_value = $(this).attr("value");			

			//check if another checkbox already checked
			var checked_user_id = JSON.parse(localStorage.getItem("current_checkbox_value_user_category"));			
			if(checked_user_id != "")
			{												
				$("#td-user-category-form-create-table-"+checked_user_id+" .user-category-table-row-checkbox").prop('checked',false);
				$("#td-user-category-form-create-table-"+checked_user_id+"-form").toggle();
			}
			var current_checked_row_id = $(this).parent().attr("id");				
			localStorage.setItem("current_checkbox_value_user_category", JSON.stringify(current_checkbox_value));					
			row_attech_form_id = current_checked_row_id+"-form";			
			userCatTableRowEdit(row_attech_form_id);					
		}
		else{						
			localStorage.setItem("current_checkbox_value_user_category", JSON.stringify(""));				
			$("#"+row_attech_form_id).toggle();	
		}								
	});	
	
	function userCatTableRowEdit(form_id){						
		$("#"+form_id).load('form_user_category_create.jsp',function(){			
			userCatCreateFormVal(domain_name);
			editButtonScript(domain_name);
			$("#"+form_id+" #div-form-user-category-create-heading").css("display","none");
			var checked_form_elements_id =[
			                            "#"+form_id+" #div-create-user-category-sub-form #div-form-user-category-create-name #input-text-form-user-category-create-name",
			                            "#"+form_id+" #div-create-user-category-sub-form #div-form-user-category-create-description #input-text-form-user-category-create-description"			                            
			                            ]; 
			
			localStorage["checked_form_elements_id_user_category"] = JSON.stringify(checked_form_elements_id);
			
			var checked_form_edit_save_btn_id = ["#"+form_id+" #div-form-user-category-create-state-buttons div .btn-page-state-edit-main",
			                                "#"+form_id+" #div-form-user-category-create-state-buttons div .btn-page-state-save-main"];
			localStorage["checked_form_edit_save_btn_id_user_category"] = JSON.stringify(checked_form_edit_save_btn_id);
			
			var checked_user_id = JSON.parse(localStorage.getItem("current_checkbox_value_user_category"));
						
			
		//filling toggle form details
			var json_user_object = new Object();
			json_user_object.id = checked_user_id;						
			var json_user_text = JSON.stringify(json_user_object);			
			$.ajax({
				type: "POST",
				url: "http://"+domain_name+":8080/rest.sellerapp/user/category/get/id",		
				async: false,
				contentType: "application/json; charset=utf-8",
				data:json_user_text,
				dataType: "json",						
				success: function(responseText){					
					$(checked_form_elements_id[0]).prop("disabled",true).val(responseText["user_category_form_detail"].name);
					$(checked_form_elements_id[1]).prop("disabled",true).val(responseText["user_category_form_detail"].description);									
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
			$("#"+form_id+" #div-form-user-category-create-state-buttons div .btn-page-state-reset-main").css("display","none");
			$("#"+form_id+" #div-form-user-category-create-state-buttons div .btn-page-state-save-main").prop('disabled', true);
			
			var json_user_category_data = new Object();
			json_user_category_data.name = $(checked_form_elements_id[0]).val();					
			json_user_category_data.description = $(checked_form_elements_id[1]).val();				
			json_user_category_data.id = JSON.parse(localStorage.getItem("current_checkbox_value_user_category"));
			
			var json_user_text = JSON.stringify(json_user_category_data);			
			
		//user_form update script
			$("#"+form_id+" #div-form-user-category-create-state-buttons div .btn-page-state-save-main").click(function(){				
				var $btn = $("#"+form_id+" #div-form-user-category-create-state-buttons div .btn-page-state-save-main").button('loading');																
				
				var json_user_category_updated_data = new Object();
				json_user_category_updated_data.name = $(checked_form_elements_id[0]).val();					
				json_user_category_updated_data.description = $(checked_form_elements_id[1]).val();				
				json_user_category_updated_data.id = JSON.parse(localStorage.getItem("current_checkbox_value_user_category"));
				
				var json_user_category_updated_text = JSON.stringify(json_user_category_updated_data);				
				
				var user_category_final_data = new Object();				
				for(var key in json_user_category_data){					
					if(json_user_category_data[key] != json_user_category_updated_data[key]){
						user_category_final_data[key] = json_user_category_updated_data[key];
					}
				}
				user_category_final_data["id"] = JSON.parse(localStorage.getItem("current_checkbox_value_user_category"));
				var user_category_final_text = JSON.stringify(user_category_final_data);		
				
				$.ajax({
					type: "POST",
					url: "http://"+domain_name+":8080/rest.sellerapp/user/category/update",
					async: false,	
					contentType :"application/json; charSet=UTF-8",
					data: user_category_final_text,			
					dataType: "json",			
					success: function(responseText){	
						alert('done');
						userCatTableRowEdit(form_id);
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

/*.......user category form validation and submission........*/
function userCatCreateFormVal(domain_name)
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
function inventoryPageScript(domain_name){
	//used for inventory_table toggle form
	localStorage.setItem("current_checkbox_value_inventory", JSON.stringify(""));
	/*............inventory browse work open...............*/
	getInventoryBrowseDetails();
	createIventoryImageUpload();
	createInventoryCategoryModal();
	inventoryUploadScript();
	
	function getInventoryBrowseDetails(){		
		$.ajax({
			type: "GET",
			url: "http://"+domain_name+":8080/rest.sellerapp/inventory/get/all",
			async: false,	
			contentType :"application/json; charSet=UTF-8",					
			dataType: "json",			
			success: function(response){				
			var inventory = response["data"];				
			var size = inventory.length;					
			var lines = size/5;
			var remain = size - (lines*5);			
			if(remain != 0 ){
				lines = lines+1;
			}
			var html = "";				
			for(var i=0,k=0 ; i<lines ; i=i+1){
				html = html + "<div class='row'>";				
				for(var j=1 ; j<5 ; j=j+1, k=k+1){					
					if(k<size){						
						html = html + "<div class='portfolio-item col-md-3'><div class='row'><div class='col-md-10 col-md-offset-1'><a data-toggle='modal' id='"+inventory[k].id+"' class='cursorPointer inventory-browse-items' data-target='#div-modal-form-inventory-browse-update'><img class='img-responsive' src='http://placehold.it/400x300' alt=''></a></div></div><br/>" +								
							"<div class='row'>" +
								"<div class='col-md-11 col-md-offset-1'><p>Title : "+inventory[k].name+"</p></div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-md-11 col-md-offset-1'><p>MRP : "+inventory[k].price_mrp+"</p></div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-md-11 col-md-offset-1'><p>Selling Price : "+inventory[k].price_sell+"</p></div>" +
							"</div>" +
							"<div class='row'>" +
								"<div class='col-md-11 col-md-offset-1'><p>Stock-in-hand : "+inventory[k].available+"</p></div>" +
							"</div>" +			
						"</div>";
					}
				}								
				html = html + "</div>";							
				$("#div-inventory-browse-images").html(html);
				
				$(".inventory-browse-items").click(function(){
					var id_inventory = $(this).attr('id');					
					$("#div-modal-form-inventory-browse-update-body").load('sub_form_inventory_create.jsp',function(){						
						inventoryBrowseModalFill(id_inventory);
						createInventoryCategoryModal();
						
					});
				});
			}						
		},
		error: function(request, error, data){						
			alert(request+" "+error+" "+data+" in getInventoryBrowseDetails");										
		} 
		});				
	}
	function inventoryBrowseModalFill(id_inventory){
		var browse_modal_fields_ids = ["#div-modal-form-inventory-browse-update-body div div #div-form-inventory-create-line-1 #div-form-inventory-create-name #input-text-form-inventory-create-name",
		                               "#div-modal-form-inventory-browse-update-body div div #div-form-inventory-create-line-1 #div-form-inventory-brand #input-select-form-invenotry-create-brand",
		                               "#div-modal-form-inventory-browse-update-body div div #div-form-inventory-create-line-2 #div-form-inventory-create-base-sku #input-text-form-inventory-create-base-sku",
		                               "#div-modal-form-inventory-browse-update-body div div #div-form-inventory-create-line-2 #div-form-inventory-create-category #input-text-form-inventory-choose-category",
		                               "#div-modal-form-inventory-browse-update-body div div #div-form-inventory-create-line-2 #div-form-inventory-create-weight #input-text-form-inventory-create-weight",
		                               "#div-modal-form-inventory-browse-update-body div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock div #div-form-inventory-create-stock-in-hand #input-text-form-inventory-create-stock-in-hand",
		                               "#div-modal-form-inventory-browse-update-body div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock div #div-form-inventory-create-stock-outgoing #input-text-form-inventory-create-stock-outgoing",
		                               "#div-modal-form-inventory-browse-update-body div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock div #div-form-inventory-create-stock-incoming #input-text-form-inventory-create-stock-incoming",
		                               "#div-modal-form-inventory-browse-update-body div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock div #div-form-inventory-create-warehouse #input-text-form-inventory-create-warehouse",
		                               "#div-modal-form-inventory-browse-update-body div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock div #div-form-inventory-create-aisle #input-text-form-inventory-create-aisle",
		                               "#div-modal-form-inventory-browse-update-body div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock div #div-form-inventory-create-rack #input-text-form-inventory-create-rack",
		                               "#div-modal-form-inventory-browse-update-body div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock div #div-form-inventory-create-row #input-text-form-inventory-create-row",
		                               "#div-modal-form-inventory-browse-update-body div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock div #div-form-inventory-create-case #input-text-form-inventory-create-case",
		                               "#div-modal-form-inventory-browse-update-body div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-procurement div div #div-form-inventory-create-procurement-type div #input-select-form-invenotry-create-procurement-type",
		                               "#div-modal-form-inventory-browse-update-body div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-procurement div div #div-form-inventory-create-procurement-supplier div #input-select-form-invenotry-create-procurement-supplier",
		                               "#div-modal-form-inventory-browse-update-body div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-procurement div div div #div-form-inventory-create-procurement-time #input-text-form-inventory-create-procurement-time",		                              		                              
		                               "#div-modal-form-inventory-browse-update-body div div div #div-form-inventory-create-tab-pages #div-tab-form-inventory-create-accounting div #div-form-inventory-create-min-price #input-text-form-inventory-create-min-price",
		                               "#div-modal-form-inventory-browse-update-body div div div #div-form-inventory-create-tab-pages #div-tab-form-inventory-create-accounting div #div-form-inventory-create-max-price #input-text-form-inventory-create-max-price",
		                               "#div-modal-form-inventory-browse-update-body div div div #div-form-inventory-create-tab-pages #div-tab-form-inventory-create-accounting div #div-form-inventory-create-cost-price #input-text-form-inventory-create-cost-price",
		                               "#div-modal-form-inventory-browse-update-body div div div #div-form-inventory-create-tab-pages #div-tab-form-inventory-create-accounting div #div-form-inventory-create-tax #input-text-form-inventory-create-tax",
		                               "#div-modal-form-inventory-browse-update-body div #div-img-form-inventory-create-image div #div-img-form-inventory-create-image-main",
		                               "#div-modal-form-inventory-browse-update-body div #div-img-form-inventory-create-image div #div-img-form-inventory-create-image-thumbnail-1",
		                               "#div-modal-form-inventory-browse-update-body div #div-img-form-inventory-create-image div #div-img-form-inventory-create-image-thumbnail-2",
		                               "#div-modal-form-inventory-browse-update-body div #div-img-form-inventory-create-image div #div-img-form-inventory-create-image-thumbnail-3",
		                               "#div-modal-form-inventory-browse-update div div div #div-modal-form-inventory-browse-update-save"
		                              ];
		var json_user_object = new Object();
		json_user_object.id = id_inventory;						
		var json_inventory_text = JSON.stringify(json_user_object);			
		$.ajax({
			type: "POST",
			url: "http://"+domain_name+":8080/rest.sellerapp/inventory/get/id",		
			async: false,
			contentType: "application/json; charset=utf-8",
			data:json_inventory_text,
			dataType: "json",						
			success: function(response){			
			var inventory = response["data"];		
			$(browse_modal_fields_ids[0]).val(inventory.name);
			$(browse_modal_fields_ids[2]).val(inventory.sku);	
			$(browse_modal_fields_ids[17]).val(inventory.price_mrp);
			$(browse_modal_fields_ids[16]).val(inventory.price_sell);
			$(browse_modal_fields_ids[6]).val(inventory.outgoing);
			$(browse_modal_fields_ids[7]).val(inventory.incoming);
			$(browse_modal_fields_ids[20]).html("<img src='pictures/"+inventory.sku+"/"+inventory.sku+"-1.jpg' height='100%' width='100%' />");
			$(browse_modal_fields_ids[21]).html("<img src='pictures/"+inventory.sku+"/"+inventory.sku+"-2.jpg' height='100%' width='100%' />");
			$(browse_modal_fields_ids[22]).html("<img src='pictures/"+inventory.sku+"/"+inventory.sku+"-3.jpg' height='100%' width='100%' />");
			$(browse_modal_fields_ids[23]).html("<img src='pictures/"+inventory.sku+"/"+inventory.sku+"-4.jpg' height='100%' width='100%' />");
			$(browse_modal_fields_ids[24]).click(function(){
				alert('ready to update');
			});
			},
			error: function(request, error, data){
				alert(error);				
			}  						
		});							
	}
	
	function createIventoryImageUpload(){		
		/*............inventory browse work close...............*/
		
		var uploaded_image_names;
		var uploaded_pic_folder_name;		
	
		/*.......launch the inventory form.......*/
		$("#btn-inventory-create").click(function(){			
			$("#div-form-inventory-create").toggle();			 	
			$( "#div-form-inventory-create-save" ).removeClass("col-md-offset-4 col-sm-offset-4").addClass( "col-md-offset-5 col-sm-offset-5" );
			$("#input-btn-edit-form-inventory-create").css("display","none");		
		});
		//ajax file upload
		var options = {
				beforeSend : function() {		                
					// clear everything		                
		            $("#span-img-form-inevntory-create-upload-message").empty();		                
		        },
		        uploadProgress : function(event, position, total, percentComplete) {		                		                	
		        	// change message text to red after 50%
		            if (percentComplete > 50) {
		            	$("#span-img-form-inevntory-create-upload-message").html("<font color='red'>Uploading in progress</font>");
		            }
		        },
		        success : function() {
		        	$("#div-img-form-inventory-create-image-main").html("<img src='pictures/"+uploaded_pic_folder_name+"/"+uploaded_image_names[0].name+"' height='100%' width='100%' />");
		        	$("#div-img-form-inventory-create-image-thumbnail-1").html("<img src='pictures/"+uploaded_pic_folder_name+"/"+uploaded_image_names[1].name+"' height='100%' width='100%' />");
		        	$("#div-img-form-inventory-create-image-thumbnail-2").html("<img src='pictures/"+uploaded_pic_folder_name+"/"+uploaded_image_names[2].name+"' height='100%' width='100%' />");
		        	$("#div-img-form-inventory-create-image-thumbnail-3").html("<img src='pictures/"+uploaded_pic_folder_name+"/"+uploaded_image_names[3].name+"' height='100%' width='100%' />");
		        },	        
		        complete : function(response) {	        	
		        	$("#span-img-form-inevntory-create-upload-message").html("<font color='blue'>uploaded Sccessfully!</font>");0	        		        
		        },	        
		        error : function() {
		        	$("#span-img-form-inevntory-create-upload-message").html("<font color='red'> ERROR: unable to upload</font>");
		        }
		};
		$("#form-inventory-create-image-main").ajaxForm(options);
		$("#div-img-form-inventory-create-image-main").click(function(){
			$("#btn-form-inventory-create-image-submit-show").addClass("to-display");
			$("#span-img-form-inevntory-create-upload-message").addClass("to-display");
			$("#input-file-form-inventory-create-image-main").click();
		});	
		
		$("#btn-form-inventory-create-image-submit-show").click(function(){				
			uploaded_image_names = $("#input-file-form-inventory-create-image-main")[0].files;
		    var n = uploaded_image_names[0].name.indexOf("-");	    
		    uploaded_pic_folder_name = uploaded_image_names[0].name.substring(0,n);	  		    
			$("#btn-form-inventory-create-image-submit").click();
		});
		// upload complete
	}
	

	function createInventoryCategoryModal(){		
	//select and create inventory_category using modal
		
		$(".inventory-category-create-modal-close-btn").click(function(){				
			$(".inventory-category-create-modal").modal('hide');	
		});
		
		$("#input-btn-form-inventory-create-category").click(function(){				
			$(".inventory-category-create-modal").modal('show');
			$("#btn-modal-form-inventory-category-create-close").click(function(){				
				$("#div-modal-form-inventory-create-category").modal('hide');	
			});
			
			//inventory-category-search 
			$("#input-select-modal-form-inventory-category-create").keyup(function(){					
				var identifier = $(this).val();	
				if(!(identifier == "")){
					$.ajax({
						type: "GET",
						url: "http://"+domain_name+":8080/rest.sellerapp/inventory/category/get/search/"+identifier,		
						async: false,	
						contentType :"text/json",					
						dataType: "json",			
						success: function(response){
						response_length = response.data.length;
						var html = "";
						for(var i = 0 ; i<response_length ; i++){
							html = html + "<div class='row'>" +
							"<div class='col-md-4 col-md-offset-2'><p>"+response.data[i].name+"</p></div><div class='col-md-4'><button id='"+response.data[i].name+"' name='"+response.data[i].id+"' class='btn-inventory-cateogry-select btn btn-default btn-xs'>Select</button></div>" +
							"</div> ";
						}
						
						$("#div-modal-form-inventory-create-category-search-content").html("<br/>"+html);
						$(".btn-inventory-cateogry-select").click(function(){
							var root_category_name = $(this).attr("id");
							var root_category_id = $(this).attr("name");							
							$("#input-select-modal-form-inventory-category-create").val(root_category_name);
							$("#input-select-modal-form-inventory-category-create").prop('name',root_category_id);
						});
						$("#btn-modal-form-inventory-category-create-close").click(function(){						
							var selected_category = $("#input-select-modal-form-inventory-category-create").val();
							$("#input-text-form-inventory-choose-category").val(selected_category);										
						});
						
					},
					error: function(request, error, data){						
						alert(request+" "+error+" "+data+" in user update");										
					} 
					});		
				}
				else{
					$("#div-modal-form-inventory-create-category-search-content").html("");
				}
			});
		});	
		
		//fill parent inventory category in create inventory form	
		
		$.ajax({
			type: "POST",
			url: "http://"+domain_name+":8080/rest.sellerapp/inventory/category/get/all",
			async: false,	
			contentType :"application/json; charSet=UTF-8",					
			dataType: "json",			
			success: function(responseText){					
				for(var i=0 ; i<responseText["data"].length ; i=i+1){
					var inventory_category = inventory_category+"<option value='"+responseText["data"][i].id+"'>"+responseText["data"][i].name+"</option>";						
				}		
				$("#input-select-inventory-category-create-parent-category").attr("title","");				
				
				$("#input-select-inventory-category-create-parent-category").append(inventory_category);
				selectPickerScript();
			},
			error: function(request, error, data){						
				alert(request+" "+error+" "+data+" in user update");										
			} 
		});					
		$("#input-btn-inventory-category-create-submit").click(function(){
			var inventory_name = $("#input-modal-inventory-category-create-name").val();
			var inventory_tax_percent = $("#input-form-inventory-category-create-tax-percent").val();
			var inventory_parent_id = $("#input-select-inventory-category-create-parent-category").attr("id");
			
			var tax_object = new object();
			
			var inventory_object = new Object();		
			inventory_object.name = inventory_name;	
			inventory_object.percent = inventory_tax_percent;	
			inventory_object.id_parent_category = inventory_parent_id;
			var inventory_txt = JSON.stringify(inventory_object);				
	
			$.ajax({
				type: "POST",
				url: "http://"+domain_name+":8080/rest.sellerapp/inventory/category/create",
				async: false,	
				data: inventory_txt,
				contentType :"application/json; charSet=UTF-8",					
				dataType: "json",			
				success: function(responseText){					
					for(var i=0 ; i<responseText["data"].length ; i=i+1){
						var inventory_category = inventory_category+"<option value='"+responseText["data"][i].id+"'>"+responseText["data"][i].name+"</option>";						
					}		
					$("#input-select-inventory-category-create-parent-category").attr("title","");				
					
					$("#input-select-inventory-category-create-parent-category").append(inventory_category);
					selectPickerScript();
				},
				error: function(request, error, data){						
					alert(request+" "+error+" "+data+" in user update");										
				} 
			});		
			
		});	
	}
	
//	$("#td-inventory-temp-1").click(function(){						
//		inventoryTableRowEdit();
//		$("#td-inventory-temp-1-next").toggle();
//	});
//	
/*.............inventory table script open ...........*/
	
	if(($(window).width())>=750)
	{
		$.ajax({
			type: "GET",
			url: "http://"+domain_name+":8080/rest.sellerapp/inventory/get/all",		
			async: false,
			dataType: "json",			
			success: function(response){
				var inventory = response["data"];
				var inventoryTable="";				
		    	for(var i=0 ; i<inventory.length ; i=i+1){				        		
		    		inventoryTable = inventoryTable+"<tr><td id='td-inventory-form-create-table-"+inventory[i].id+"'><input class='inventory-table-row-checkbox' type='checkbox' value="+inventory[i].id+"></input>"+
		    		"</td><td>"+inventory[i].sku+    			
	    			"</td><td>"+inventory[i].name+
	    			"</td><td>"+inventory[i].available+
	    			"</td><td>"+inventory[i].price_sell+
	    			"</td><td>"+inventory[i].price_sell+
	    			"</td></tr><tr><td id='td-inventory-form-create-table-"+inventory[i].id+"-form' class='inventory-table-row-attech-form' colspan='5'></td></tr>";		    		
				}		    			    
				$("#tbody-table-inventory").html(inventoryTable);				
				inventoryPageSubScript(domain_name);
				},
				error: function(request, error, data){
					alert(error+" in user table data "+data);				
				}  						
			});
	}
	else
	{
		$.ajax({
			type: "GET",
			url: "http://"+domain_name+":8080/rest.sellerapp/inventory/get/all",		
			async: false,
			dataType: "json",			
			success: function(response){
			var inventory = response["data"];
			var inventoryTable="";
			
			for(var i=0 ; i<inventory.length ; i=i+1){	
	    		inventoryTable = inventoryTable+"<tr><td id='td-inventory-form-create-table-"+inventory[i].id+"'><input class='inventory-table-row-checkbox' type='checkbox' value="+inventory[i].id+"></input>"+	    		
				"</td><td>"+inventory[i].sku+    			
    			"</td><td>"+inventory[i].name+
    			"</td><td>"+inventory[i].available+
    			"</td><td>"+inventory[i].price_sell+
    			"</td><td>"+inventory[i].price_sell+
    			"</td></tr><tr><td id='td-user-form-create-table-"+inventory[i].id+"-form' class='inventory-table-row-attech-form' colspan='5'></td></tr>";		    		
			}		 		    	
			$("#tbody-table-inventory").html(inventoryTable);		
			inventoryPageSubScript(domain_name);
		},
		error: function(request, error, data){
			alert(error);				
		}  						
		});
	}	
	
/*.............inventory table script close ...........*/
	function inventoryPageSubScript(domain_name){		
		var row_attech_form_id;
		$(".inventory-table-row-checkbox").click(function(){	
			if($(this).is(':checked')){
				//$("body").fadeTo("fast", 0.4);
				//$("#spinner").show();		
				
				//id of inventory						
				var	current_checkbox_value = $(this).attr("value");							
				//check if another checkbox already checked
				var checked_inventory_id = JSON.parse(localStorage.getItem("current_checkbox_value_inventory"));
				
				if(checked_inventory_id != "")
				{												
					$("#td-inventory-form-create-table-"+checked_inventory_id+" .inventory-table-row-checkbox").prop('checked',false);
					$("#td-inventory-form-create-table-"+checked_inventory_id+"-form").toggle();
				}
				var current_checked_row_id = $(this).parent().attr("id");				
				localStorage.setItem("current_checkbox_value_inventory", JSON.stringify(current_checkbox_value));					
				row_attech_form_id = current_checked_row_id+"-form";
					
				inventoryTableRowEdit(row_attech_form_id);					
			}
			else{						
				localStorage.setItem("current_checkbox_value_inventory", JSON.stringify(""));		
				$("#"+row_attech_form_id).empty();
				$("#"+row_attech_form_id).toggle();	
			}								
		});	
		
		function inventoryTableRowEdit(form_id){			
			$("#"+form_id).load('form_inventory_create.jsp',function(){											
				//inventoryCreateFormVal(domain_name);
				/*..........testing start.............*/
				
				//$("#"+form_id+" #div-sub-form-inventory-create div div #div-form-inventory-create-line-2 #div-form-inventory-create-category div #input-btn-form-inventory-create-category").attr("data-target","#div-modal-form-inventory-create-category-edit");				
				//$("#"+form_id+" #div-sub-form-inventory-create #div-modal-form-inventory-create-category").attr("id","div-modal-form-inventory-create-category-edit");
				/*..........testing stop.............*/
				createInventoryCategoryModal();
				editButtonScript(domain_name);
				
				//change tab href and associated div id's 
				$("#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab ul li #a-tab-form-inventory-create-stock").attr("href","#div-form-inventory-create-stock-edit");				
				$("#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock").attr("id","div-form-inventory-create-stock-edit");
				
				$("#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab ul li #a-tab-form-inventory-create-procurement").attr("href","#div-form-inventory-create-procurement-edit");				
				$("#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-procurement").attr("id","div-form-inventory-create-procurement-edit");

				$("#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab ul li #a-tab-form-inventory-create-sales").attr("href","#div-tab-form-inventory-create-sales-edit");				
				$("#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-tab-form-inventory-create-sales").attr("id","div-tab-form-inventory-create-sales-edit");

				$("#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab ul li #a-tab-form-inventory-create-variants").attr("href","#div-tab-form-inventory-create-variants-edit");				
				$("#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-tab-form-inventory-create-variants").attr("id","div-tab-form-inventory-create-variants-edit");

				$("#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab ul li #a-tab-form-inventory-create-accounting").attr("href","#div-tab-form-inventory-create-accounting-edit");				
				$("#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-tab-form-inventory-create-accounting").attr("id","div-tab-form-inventory-create-accounting-edit");
				
				$("#"+form_id+" #div-form-inventory-create-heading").css("display","none");
				var checked_form_elements_id =[
				                            "#"+form_id+" #div-sub-form-inventory-create div div #div-form-inventory-create-line-1 #div-form-inventory-create-name #input-text-form-inventory-create-name",
				                            "#"+form_id+" #div-sub-form-inventory-create div div #div-form-inventory-create-line-1 #div-form-inventory-brand #input-select-form-invenotry-create-brand",
				                            "#"+form_id+" #div-sub-form-inventory-create div div #div-form-inventory-create-line-2 #div-form-inventory-create-base-sku #input-text-form-inventory-create-base-sku",
				                            "#"+form_id+" #div-sub-form-inventory-create div div #div-form-inventory-create-line-2 #div-form-inventory-create-category #input-text-form-inventory-choose-category",
				                            "#"+form_id+" #div-sub-form-inventory-create div div #div-form-inventory-create-line-2 #div-form-inventory-create-weight #input-text-form-inventory-create-weight",
				                            "#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock-edit div #div-form-inventory-create-stock-in-hand #input-text-form-inventory-create-stock-in-hand",
				                            "#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock-edit div #div-form-inventory-create-stock-outgoing #input-text-form-inventory-create-stock-outgoing",
				                            "#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock-edit div #div-form-inventory-create-stock-incoming #input-text-form-inventory-create-stock-incoming",
				                            "#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock-edit div #div-form-inventory-create-warehouse #input-text-form-inventory-create-warehouse",
				                            "#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock-edit div #div-form-inventory-create-aisle #input-text-form-inventory-create-aisle",
				                            "#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock-edit div #div-form-inventory-create-rack #input-text-form-inventory-create-rack",
				                            "#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock-edit div #div-form-inventory-create-row #input-text-form-inventory-create-row",
				                            "#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-form-inventory-create-stock-edit div #div-form-inventory-create-case #input-text-form-inventory-create-case",
				                            "#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-tab-form-inventory-create-accounting-edit div #div-form-inventory-create-min-price #input-text-form-inventory-create-min-price",
				                            "#"+form_id+" #div-sub-form-inventory-create div div div #div-form-inventory-create-tab-pages #div-tab-form-inventory-create-accounting-edit div #div-form-inventory-create-max-price #input-text-form-inventory-create-max-price",				                            
				                            "#"+form_id+" #div-sub-form-inventory-create div #div-img-form-inventory-create-image div #div-img-form-inventory-create-image-main",
				                            "#"+form_id+" #div-sub-form-inventory-create div #div-img-form-inventory-create-image div #div-img-form-inventory-create-image-thumbnail-1",
				                            "#"+form_id+" #div-sub-form-inventory-create div #div-img-form-inventory-create-image div #div-img-form-inventory-create-image-thumbnail-2",
				                            "#"+form_id+" #div-sub-form-inventory-create div #div-img-form-inventory-create-image div #div-img-form-inventory-create-image-thumbnail-3"				                            
				                            ]; 
				
				localStorage["checked_inventory_form_elements_id"] = JSON.stringify(checked_form_elements_id);
				
				var checked_form_edit_save_btn_id = ["#"+form_id+" #div-form-inventory-create-state-buttons div .btn-page-state-edit-main",
				                                     "#"+form_id+" #div-form-inventory-create-state-buttons div .btn-page-state-save-main"];
				
				localStorage["checked_form_inventory_edit_save_btn_id"] = JSON.stringify(checked_form_edit_save_btn_id);
				
				var checked_inventory_id = JSON.parse(localStorage.getItem("current_checkbox_value_inventory"));
				selectPickerScript();
				//getInventoryBrowseDetails();
				//createIventoryImageUpload();
				//createInventoryCategoryModal();
										
			//filling toggle form details
				var json_user_object = new Object();
				json_user_object.id = checked_inventory_id;						
				var json_inventory_text = JSON.stringify(json_user_object);			
				$.ajax({
					type: "POST",
					url: "http://"+domain_name+":8080/rest.sellerapp/inventory/get/id",		
					async: false,
					contentType: "application/json; charset=utf-8",
					data:json_inventory_text,
					dataType: "json",						
					success: function(response){
					var inventory = response["data"];							
						fillInventoryTableToggleForm(response);											
					},
					error: function(request, error, data){
						alert(error);				
					}  						
				});						
//
				function fillInventoryTableToggleForm(response){					
					var inventory = response["data"];	
					
					var json_inventory_cat_object = new Object();
					alert(inventory.id_category);
					json_inventory_cat_object.id = inventory.id_category;						
					var json_inventory_text = JSON.stringify(json_inventory_cat_object);							
					$.ajax({
						type: "POST",
						url: "http://"+domain_name+":8080/rest.sellerapp/inventory/category/get/id",		
						async: false,
						contentType: "application/json; charset=utf-8",
						data:json_inventory_text,
						dataType: "json",						
						success: function(response){						
						var inventory_cat_detail = response["data"];								
						$(checked_form_elements_id[3]).val(inventory_cat_detail.name);							
						},
						error: function(request, error, data){
							alert(error);				
						}  						
					});			
					//$(checked_form_elements_id[3]).attr("name",'name_cat');
					//alert($(checked_form_elements_id[3]).attr("name"));
					//alert(inventory.id_category);
					//$(checked_form_elements_id[3]).val("testing_inv_category");
					$(checked_form_elements_id[0]).prop("disabled",true).val(inventory.name);					
					//$(checked_form_elements_id[1]).prop("disabled",true).val(inventory.name_last);
					
					//need to make title attribut blank to set a value to select menu
					//$(checked_form_elements_id[2]).attr("title","");										
					//$(checked_form_elements_id[2]).prop("disabled",true).val(responseText["userCategoryDetails"].id);
					$(checked_form_elements_id[2]).prop("disabled",true).val(inventory.sku);
					$(checked_form_elements_id[5]).prop("disabled",true).val(inventory.available);
					$(checked_form_elements_id[6]).prop("disabled",true).val(inventory.outgoing);
					$(checked_form_elements_id[7]).prop("disabled",true).val(inventory.outgoing);
					$(checked_form_elements_id[13]).prop("disabled",true).val(inventory.price_sell);
					$(checked_form_elements_id[14]).prop("disabled",true).val(inventory.price_mrp);
					$(checked_form_elements_id[15]).html("<img src='pictures/"+inventory.sku+"/"+inventory.sku+"-1.jpg' height='100%' width='100%' />");
					$(checked_form_elements_id[16]).html("<img src='pictures/"+inventory.sku+"/"+inventory.sku+"-2.jpg' height='100%' width='100%' />");
					$(checked_form_elements_id[17]).html("<img src='pictures/"+inventory.sku+"/"+inventory.sku+"-3.jpg' height='100%' width='100%' />");
					$(checked_form_elements_id[18]).html("<img src='pictures/"+inventory.sku+"/"+inventory.sku+"-4.jpg' height='100%' width='100%' />");					
					
					
					var parent_id_inventory_form = "#"+form_id+" #div-sub-form-inventory-create div div #div-form-inventory-create-line-2 #div-form-inventory-create-category div ";
					var parent_id_inventory_modal = "#"+form_id+" #div-sub-form-inventory-create #div-modal-form-inventory-create-category ";
					var parent_id_inventory_modal_content = "#"+form_id+" #div-sub-form-inventory-create #div-modal-form-inventory-create-category div div #div-modal-form-inventory-create-category-content ";					
					$(parent_id_inventory_form+"span #input-btn-form-inventory-create-category").click(function(){							
						$(parent_id_inventory_modal).modal('show');
					});					
//					alert($(parent_id_inventory_modal_content+"div #div-modal-form-inventory-create-category-content div #div-modal-form-inventory-create-category-search").html());
					
					//inventory-category-search 
					$(parent_id_inventory_modal_content+"div #div-modal-form-inventory-create-category-search div #input-select-modal-form-inventory-category-create").keyup(function(){						
						var identifier = $(this).val();													
						if(!(identifier == "")){
							$.ajax({
								type: "GET",
								url: "http://"+domain_name+":8080/rest.sellerapp/inventory/category/get/search/"+identifier,		
								async: false,	
								contentType :"text/json",					
								dataType: "json",			
								success: function(response){
								response_length = response.data.length;
								var html = "";
								for(var i = 0 ; i<response_length ; i++){
									html = html + "<div class='row'>" +
									"<div class='col-md-4 col-md-offset-2'><p>"+response.data[i].name+"</p></div><div class='col-md-4'><button id='"+response.data[i].name+"' name='"+response.data[i].id+"' class='btn-inventory-cateogry-select btn btn-default btn-xs'>Select</button></div>" +
									"</div> ";
								}
								
								$(parent_id_inventory_modal_content+"div #div-modal-form-inventory-create-category-search-content").html("<br/>"+html);
								$(parent_id_inventory_modal_content+"div #div-modal-form-inventory-create-category-search-content div div .btn-inventory-cateogry-select").click(function(){
									var root_category_name = $(this).attr("id");
									var root_category_id = $(this).attr("name");										
									$(parent_id_inventory_modal_content+"div #div-modal-form-inventory-create-category-search div #input-select-modal-form-inventory-category-create").val(root_category_name);
									$(parent_id_inventory_modal_content+"div #div-modal-form-inventory-create-category-search div #input-select-modal-form-inventory-category-create").prop('name',root_category_id);									
								});								
								$(parent_id_inventory_modal+"div div #div-modal-form-inventory-category-create-footer #btn-modal-form-inventory-category-create-close").click(function(){											
									var selected_category = $(parent_id_inventory_modal_content+"div #div-modal-form-inventory-create-category-search div #input-select-modal-form-inventory-category-create").val();									
									$(parent_id_inventory_form+"#input-text-form-inventory-choose-category").val(selected_category);
									var id_category = $(parent_id_inventory_modal_content+"div #div-modal-form-inventory-create-category-search-content div div .btn-inventory-cateogry-select").attr('name');									
									$(parent_id_inventory_form+"#input-text-form-inventory-choose-category").attr('name',id_category);
								});								
							},
							error: function(request, error, data){						
								alert(request+" "+error+" "+data+" in user update");										
							} 
							});		
						}
						else{
							$(parent_id_inventory_modal_content+"div #div-modal-form-inventory-create-category-search-content").html("");
						}
					});
					
					
					///$("body").fadeTo("fast", 1);
					//$("#spinner").hide();
					
					$("#"+form_id).toggle();					
					$("#"+form_id+" #div-form-inventory-create-state-buttons div .btn-page-state-reset-main").css("display","none");
					$("#"+form_id+" #div-form-inventory-create-state-buttons div .btn-page-state-save-main").prop('disabled', true);
					
					var json_inventory_updatable_data = new Object();
					json_inventory_updatable_data.name = $(checked_form_elements_id[0]).val();					
					json_inventory_updatable_data.sku = $(checked_form_elements_id[2]).val();
					json_inventory_updatable_data.id_category = $(checked_form_elements_id[3]).attr('name');					
//					json_inventory_updatable_data.available= $(checked_form_elements_id[5]).val();
//					json_inventory_updatable_data.incoming= $(checked_form_elements_id[7]).val();
//					json_inventory_updatable_data.outgoing = $(checked_form_elements_id[6]).val();
//					json_inventory_updatable_data.price_sell = $(checked_form_elements_id[13]).val();
//					json_inventory_updatable_data.price_mrp = $(checked_form_elements_id[14]).val();										
					var json_inventory_updatable_text = JSON.stringify(json_inventory_updatable_data);								
					
					//inventory_form update script
					$("#"+form_id+" #div-form-inventory-create-state-buttons div .btn-page-state-save-main").click(function(){					
						//var $btn = $("#"+form_id+" #div-form-inventory-create-state-buttons div .btn-page-state-save-main").button('loading');																						
						var json_inventory_updated_data = new Object();
						json_inventory_updated_data.name = $(checked_form_elements_id[0]).val();					
						json_inventory_updated_data.sku = $(checked_form_elements_id[2]).val();
//						json_inventory_updated_data.available= $(checked_form_elements_id[5]).val();
//						json_inventory_updated_data.incoming= $(checked_form_elements_id[7]).val();
//						json_inventory_updated_data.outgoing = $(checked_form_elements_id[6]).val();
//						json_inventory_updated_data.price_sell = $(checked_form_elements_id[13]).val();
//						json_inventory_updated_data.price_mrp = $(checked_form_elements_id[14]).val();
						json_inventory_updated_data.id_category = $(checked_form_elements_id[3]).attr('name');
						
						//json_user_updated_data.id_user = JSON.parse(localStorage.getItem("current_checkbox_value"));
						
						var json_inventory_updated_text = JSON.stringify(json_inventory_updated_data);										
						
						var inventory_final_data = new Object();				
						for(var key in json_inventory_updatable_data){									
							if(json_inventory_updatable_data[key] != json_inventory_updated_data[key]){
								inventory_final_data[key] = json_inventory_updated_data[key];
							}
						}						
						inventory_final_data.price_sell = $(checked_form_elements_id[13]).val();
						inventory_final_data.price_mrp = $(checked_form_elements_id[14]).val();						
						inventory_final_data.available = $(checked_form_elements_id[5]).val();
						inventory_final_data.incoming= $(checked_form_elements_id[7]).val();
						inventory_final_data.outgoing = $(checked_form_elements_id[6]).val();
						
						inventory_final_data["id"] = JSON.parse(localStorage.getItem("current_checkbox_value_inventory"));
						var inventory_final_text = JSON.stringify(inventory_final_data);	
						alert(inventory_final_text);
						$.ajax({
							type: "POST",
							url: "http://"+domain_name+":8080/rest.sellerapp/inventory_other/update",
							async: false,	
							contentType :"application/json; charSet=UTF-8",
							data: inventory_final_text,			
							dataType: "json",			
							success: function(responseText){	
//								alert('done');
//								userTableRowEdit(form_id);
//								$("#"+form_id).toggle();
//								$btn.button('reset');						
							},
							error: function(request, error, data){						
								alert(request+" "+error+" "+data+" in user update");						
								$btn.button('reset');
							} 
						});

					});	
				}
			
			});										
		}		
	}
	
	function inventoryUploadScript(){		
		//ajax file upload
		var options = {
				beforeSend : function() {		                
			// clear everything		                
			$("#span-bulk-inventory-file-status").empty();		                
		},
		uploadProgress : function(event, position, total, percentComplete) {	
			// change message text to red after 50%
			if (percentComplete > 50) {
				$("#span-bulk-inventory-file-status").html("<font color='red'>File Upload is in progress</font>");				
			}	
			
			var file = $('input[name="inventory-upload-file"]').get(0).files[0];

		    var formData = new FormData();		    
		    formData.append('file', file);		
			$.ajax({
				type: "POST",
				url: "http://"+domain_name+":8080/rest.sellerapp/inventory/upload_file",								
				data: formData,
				cache : false,
				async : false,
				contentType: false,
		        processData: false,
		        dataType:"json",
				success: function(response){
					var uploaded_images_dir = response["image_dir_path"];
					sendInventoryFormData(uploaded_images_dir)				
					
				},
				error: function(request, error, data){				
					alert(JSON.stringify(request) +" "+error+" "+data);					
				}  						
			});					
		},
		success : function() {		                		                
		},
		complete : function(response) {
			$("#span-bulk-inventory-file-status").html("<font color='blue'>Order file has been uploaded!</font>");
			showPacketTable();
		},
		error : function() {
			$("#span-bulk-inventory-file-status").html("<font color='red'> ERROR: unable to upload files</font>");
		}
		};
		
		$("#form-bulk-inventory-upload").ajaxForm(options);
	}

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
function invoicePageScript(domain_name)
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

function invoiceCreateFormVal(domain_name)
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

function orderPageScript(domain_name)
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
			orderPageScript(domain_name);
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
			orderFormValid(domain_name);
//			$("#td-orders-temp-1-next #div-form-user-create-line-5 #div-form-user-create-reset #btn-form-user-create-reset").click(function(){
//				resetOrderFun();
//			});
		});
	};
	
	orderFileUpload();
	/*.......Demo table row edit script CLOSE......*/
	function orderFileUpload(){
		//ajax file upload
		var options = {
		        beforeSend : function() {		                
		                // clear everything		                
		                $("#span-bulk-order-file-status").empty();		                
		        },
		        uploadProgress : function(event, position, total, percentComplete) {		                		                
		
		                // change message text to red after 50%
		                if (percentComplete > 50) {
		                $("#span-bulk-order-file-status").html("<font color='red'>File Upload is in progress</font>");
		                }
		        },
		        success : function() {		                		                
		        },
		        complete : function(response) {
		        $("#span-bulk-order-file-status").html("<font color='blue'>Order file has been uploaded!</font>");
		        	showPacketTable();
		        },
		        error : function() {
		        $("#span-bulk-order-file-status").html("<font color='red'> ERROR: unable to upload files</font>");
		        }
		};
		$("#form-bulk-order-upload").ajaxForm(options);
		
		$("#btn-form-order-upload-file").click(function(){			
			var file = $('input[name="order-upload-file"]').get(0).files[0];

		    var formData = new FormData();		    
		    formData.append('file', file);		    		
			alert(JSON.stringify(formData));
			
			var upload_file_type = $('#select-upload-file-type-order option:selected').text();
//			var orderFile = $("#input-file-bulk-order-upload").val();		
//			var $btn = $("#btn-form-order-upload-file").button('loading');			
			alert(JSON.stringify(formData));
			if(upload_file_type == "Amazon")
			{
				$.ajax({
					type: "POST",
					url: "http://"+domain_name+":8080/rest.sellerapp/uniware/upload",								
					data: formData,
					cache : false,
	                contentType : 'multipart/form-data',
	                dataType : 'json',
	                processData : false,
					success: function(responseText){
						alert('success');
						//$btn.button('reset'); 
							 var error_code = responseText["error_code"];
							 
							 if(error_code=="")
							 {
								alert('success');
							 }
							 else
							 {
								 var error_message=getErrorMessage(error_code);
								 alert(error_message);
							 }
					},
					error: function(request, error, data){				
						alert(JSON.stringify(request) +" "+error+" "+data);				
					}  						
				});
			}
			else
			{
				$.ajax({
					type: "POST",
					url: "http://"+domain_name+":8080/rest.sellerapp/uniware/upload",								
					data: formData,
					cache : false,
					contentType: false,
			        processData: false,
					success: function(responseText){		
					alert('success');
							 var error_code = responseText["error_code"];
							 
							 if(error_code=="")
							 {
								 $btn.button('reset'); 
							 }
							 else
							 {
								 var error_message=getErrorMessage(error_code);
								 alert(error_message);
							 }
					},
					error: function(request, error, data){				
						alert(JSON.stringify(request) +" "+error+" "+data);					
					}  						
				});				
			}
		});
	}
}
function orderFormValid(domain_name)
{
	
}
