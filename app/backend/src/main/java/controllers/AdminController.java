package controllers;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import services.AdminService;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/admin")
public class AdminController {

    @Inject
    private AdminService adminService;

    private static final Logger logger = LogManager.getLogger();

    @GET
    @Path("/init-database")
    public void initDatebase() {
        logger.log(Level.INFO, "[ADMIN SERVICE] init database");
        adminService.initDatabase();
    }

}
