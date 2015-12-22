package api.controllers;

import api.models.common.VDelete;
import api.models.users.VUserProfile;
import core.models.User;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import services.UsersServiceRemote;

import javax.faces.bean.RequestScoped;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;
import java.util.List;

@Path("/users")
@Provider
@RequestScoped
public class UsersController {

    private UsersServiceRemote usersService;
    private static final Logger logger = LogManager.getLogger(UsersController.class);

    public UsersController() throws NamingException {
        InitialContext ic = new InitialContext();
        usersService = (UsersServiceRemote) ic.lookup("services.UsersServiceRemote");
    }

    @GET
    @Produces("application/json")
    public List<User> getUsers() {
        return usersService.getAll();
    }

    @GET @Path("/{id}")
    @Produces("application/json")
    public VUserProfile getUser(@PathParam("id") Integer id) {
        User user = usersService.getUser(id);
        return mapUser(user);
    }

    @PUT
    @Produces("application/json")
    public void editUser(@Context SecurityContext sc, VUserProfile vUserProfile) {
        logger.info("edit user profile: " + vUserProfile.getName());

        Integer uid = Integer.valueOf(sc.getUserPrincipal().getName());

        usersService.editUser(uid, vUserProfile);
    }

    @GET @Path("profile")
    @Produces("application/json")
    public Response getCurrentUser(@Context SecurityContext sc) {
        logger.info("[GET CURRENT USER]");

        Integer uid = Integer.valueOf(sc.getUserPrincipal().getName());

        logger.info("[GET CURRENT USER] uid: " + uid);

        User user = usersService.getUser(uid);

        logger.info("[GET CURRENT USER] username: " + user.getFirstName());

        VUserProfile profile = mapUser(user);

        logger.info("[GET CURRENT USER] username from pofile: " + profile.getName());

        return Response.ok(profile).build();
    }

    private VUserProfile mapUser(User user) {
        return new VUserProfile(
                user.getId(),
                user.getFirstName(),
                user.getLogin(),
                user.getEmail()
        );
    };

    @POST
    @Consumes("application/json")
    public void create(User user) {
        logger.log(Level.INFO, "[TRY CREATE USER] " + user);
        usersService.create(user);
    }

    @POST @Path("/delete")
    @Consumes("application/json")
    public void delete(VDelete vDelete) {
        logger.log(Level.INFO, "[TRY CREATE USER vDelete ] " + vDelete.getIds());

        usersService.delete(vDelete.getIds());
    }
}
