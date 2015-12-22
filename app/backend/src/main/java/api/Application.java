package api;

import api.controllers.*;
import api.filters.AuthSecurityFilter;
import api.filters.CorsResponseFilter;

import javax.ws.rs.ApplicationPath;
import java.util.Set;

@ApplicationPath("/api")
public class Application extends javax.ws.rs.core.Application {
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();

        // REST resources
        resources.add(AdminController.class);
        resources.add(EventsController.class);
        resources.add(RegistrationsController.class);
        resources.add(UsersController.class);
        resources.add(AuthenticationController.class);

        // Filters (Auth)
        resources.add(AuthSecurityFilter.class);
        resources.add(CorsResponseFilter.class);

        return resources;
    }
}
