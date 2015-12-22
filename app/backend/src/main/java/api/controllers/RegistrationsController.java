package api.controllers;

import core.models.Registration;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import services.AuthenticationServiceRemote;
import services.RegistrationsServiceRemote;

import javax.inject.Inject;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.List;

@Path("/registrations")
public class RegistrationsController {

    private RegistrationsServiceRemote registrationsService;
    private static final Logger logger = LogManager.getLogger();

    public RegistrationsController() throws NamingException {
        InitialContext ic = new InitialContext();
        registrationsService = (RegistrationsServiceRemote) ic.lookup("services.RegistrationsServiceRemote");
    }

    @GET
    @Produces("application/json")
    public List<Registration> getUsers() {
        return registrationsService.getAll();
    }
}
