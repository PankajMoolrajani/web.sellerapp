package pkg_upload;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class UploadImageServlet extends HttpServlet {


	   private static final long serialVersionUID = 1L;
	    private String UPLOAD_DIRECTORY = null;

		public void init( ){
		      // Get the file location where it would be stored.
			UPLOAD_DIRECTORY = (this.getServletContext().getRealPath("/")).toString()+"/pictures/";	            
		   }

	    protected void doPost(HttpServletRequest request,
	            HttpServletResponse response) throws ServletException, IOException {
	    boolean isMultipart = ServletFileUpload.isMultipartContent(request);	    
	    // process only if its multipart content
	    if (isMultipart) {
	            // Create a factory for disk-based file items
	            FileItemFactory factory = new DiskFileItemFactory();

	            // Create a new file upload handler
	            ServletFileUpload upload = new ServletFileUpload(factory);
	            try {
	                    // Parse the request
	                    List<FileItem> multiparts = upload.parseRequest(request);
	                    String fileName = multiparts.get(0).getName();
	                    int index_number = fileName.indexOf("-");
	                    fileName = fileName.substring(0,index_number);
	                    
	                    File finalDirectoryName = new File(UPLOAD_DIRECTORY+fileName);
	                    
	                    // if the directory does not exist, create it
	                    if (!finalDirectoryName.exists()) {	                        
	                        boolean result = false;

	                        try{
	                        	finalDirectoryName.mkdir();
	                            result = true;
	                        } 
	                        catch(SecurityException se){
	                            //handle it
	                        }        
	                        if(result) {    
	                            System.out.println("DIR created");  
	                        }
	                    }

	                    for (FileItem item : multiparts) {	                    	
	                      if (!item.isFormField()) {	                    
	                    	  
	                         String name = new File(item.getName()).getName();
	                         item.write(new File(finalDirectoryName + File.separator + name));
	                      }
	                 }
	            } 
	            catch (Exception e) 
	            {
	              System.out.println("File upload failed");
	            }
	    }
	}	    
}
