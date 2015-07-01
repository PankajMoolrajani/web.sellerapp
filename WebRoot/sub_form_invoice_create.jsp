<div class="row">
	<div id="div-form-invoice-create-tab" class="col-md-12 col-sm-12 ">
	    <ul id="tabs" class="nav nav-tabs" data-tabs="tabs">
	        <li class="active"><a href="#div-form-invoice-create-lines" data-toggle="tab">Invoice Lines</a></li>
	        <li><a href="#div-form-invoice-create-info" data-toggle="tab">Marketplace Info</a></li>
	        <li><a href="#div-form-invoice-create-payment" data-toggle="tab">Payment</a></li>	        
	    </ul>											
	</div>
</div>
<div id="row">	
	<div id="div-form-invoice-create-tab-pages" class="tab-content col-md-12 col-sm-12">
        <div class="tab-pane active" id="div-form-invoice-create-lines">
            <jsp:include page="form_invoice_create_lines.jsp"></jsp:include>
        </div>
        <div class="tab-pane" id="div-form-invoice-create-info">
			<jsp:include page="form_invoice_create_info.jsp"></jsp:include>
        </div>
        <div class="tab-pane" id="div-form-invoice-create-payment">
        	<jsp:include page="form_invoice_create_payment.jsp"></jsp:include>
        </div>
    </div>	
</div>