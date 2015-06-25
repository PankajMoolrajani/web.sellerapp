
<div id="div-form-pMarketplace-name" class="row">
	<div class="col-sm-12 col-md-12 col-xs-12">
		<label class="control-label" for="inputInventorySku">Name</label>
		<select id="select-form-pMarketplace-name" class=" selectpicker form-control val-empty" >					
		<%
			//Connection con = DbConnection.getConnection();
			//PreparedStatement ps = con.prepareStatement("select id,name from marketplace");
			//ResultSet rs = ps.executeQuery();						
			//while(rs.next())
			//{																						
		%>
				<option value="<%="(rs.getInt(1))"%>"><%="(rs.getString(2))"%></option>
		<%
			//}
		%>	        						        
		</select>		
	</div>
</div>
<br/>
<div id="div-form-pMarketplace-url" class="row">
	<div class="col-sm-12 col-md-12 col-xs-12">
		<label class="control-label" for="inputInventorySku">Url</label>
		<input type="text" id="input-form-pMarketplace-url" class="form-control val-empty"/>
	</div>
</div>