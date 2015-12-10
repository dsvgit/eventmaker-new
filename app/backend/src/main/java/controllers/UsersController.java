package controllers;

import models.User;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import services.UsersService;
import vmodels.VDelete;

import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.List;

@Path("/users")
public class UsersController  {

    @Inject
    private UsersService usersService;

    private static final Logger logger = LogManager.getLogger();

    @GET
    @Produces("application/json")
    public List<User> getUsers() {
        return usersService.getAll();
    }

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
