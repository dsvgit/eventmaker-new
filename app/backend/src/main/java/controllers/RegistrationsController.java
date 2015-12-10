package controllers;

import models.Registration;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import services.RegistrationsService;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.List;

@Path("/registrations")
public class RegistrationsController {

    @Inject
    private RegistrationsService registrationsService;

    private static final Logger logger = LogManager.getLogger();

    @GET
    @Produces("application/json")
    public List<Registration> getUsers() {
        return registrationsService.getAll();
    }
}
