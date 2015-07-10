<div id="div-form-invoice-create-tab" class="row">
	<div class="col-md-12 col-sm-12">
	    <ul id="tabs" class="nav nav-tabs" data-tabs="tabs">
	        <li id="li-tab-form-invoice-create-line" class="active"><a href="#div-form-invoice-create-lines" id="a-tab-form-invoice-create-line" data-toggle="tab">Invoice Lines</a></li>
	        <li id="li-tab-form-invoice-create-info"><a href="#div-form-invoice-create-info" id="a-tab-form-invoice-create-info" data-toggle="tab">Marketplace Info</a></li>
	        <li id="li-tab-form-invoice-create-payment"><a href="#div-form-invoice-create-payment" id="a-tab-form-invoice-create-payment" data-toggle="tab">Payment</a></li>	        
	    </ul>											
	</div>
</div>
<div id="div-form-invoice-create-tab-pages" class="row">	
	<div class="tab-content col-md-12 col-sm-12">
        <div id="div-form-invoice-create-lines" class="tab-pane active">
            <jsp:include page="form_invoice_create_lines.jsp"></jsp:include>
        </div>
        <div id="div-form-invoice-create-info" class="tab-pane">
			<jsp:include page="form_invoice_create_marketplace_info.jsp"></jsp:include>
        </div>
        <div id="div-form-invoice-create-payment" class="tab-pane">
        	<jsp:include page="form_invoice_create_payment.jsp"></jsp:include>
        </div>
    </div>	
</div>