package api.controllers;

import api.models.auth.VAuthAccessElement;
import api.models.auth.VAuthLoginElement;
import core.models.User;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import services.AuthenticationService;
import services.AuthenticationServiceRemote;
import services.EventsServiceRemote;
import services.UsersService;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.print.DocFlavor;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Path("/auth")
public class AuthenticationController {

    AuthenticationServiceRemote authService;
    private static final Logger logger = LogManager.getLogger();

    public AuthenticationController() throws NamingException {
        InitialContext ic = new InitialContext();
        authService = (AuthenticationServiceRemote) ic.lookup("services.AuthenticationServiceRemote");
    }

    @POST
    @Path("login")
    @PermitAll
    @Produces("application/json")
    public Response login(VAuthLoginElement loginElement) {
        VAuthAccessElement accessElement = authService.login(loginElement);
        if (accessElement == null ) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }

        return Response.ok(accessElement).build();
    }

    @POST
    @Path("logout")
    @PermitAll
    @Produces("application/json")
    public void logout(@Context SecurityContext sc) {
        Integer uid = Integer.valueOf(sc.getUserPrincipal().getName());

        authService.logout(uid);
    }

    @GET
    @Path("test")
    @PermitAll
    public Response test() {
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}
