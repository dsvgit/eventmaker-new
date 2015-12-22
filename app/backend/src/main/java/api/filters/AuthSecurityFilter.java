package api.filters;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import services.AuthenticationServiceRemote;
import services.UsersServiceRemote;

import javax.annotation.Priority;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.security.Principal;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthSecurityFilter implements ContainerRequestFilter {

    private AuthenticationServiceRemote authenticationService;
    private static final Logger logger = LogManager.getLogger(AuthSecurityFilter.class);

    public AuthSecurityFilter() throws NamingException {
        super();
        InitialContext ic = new InitialContext();
        authenticationService = (AuthenticationServiceRemote) ic.lookup("services.AuthenticationServiceRemote");
    }

    @Override
    public void filter( ContainerRequestContext requestCtx ) throws IOException {

        String path = requestCtx.getUriInfo().getPath();
        logger.info( "Filtering request path: " + path );

        if ( requestCtx.getRequest().getMethod().equals( "OPTIONS" ) ) {
            requestCtx.abortWith( Response.status(Response.Status.OK).build() );

            return;
        }

        String authToken = requestCtx.getHeaderString("X-Auth-Token");

        if ( !path.startsWith( "/auth/login" ) ) {

            logger.info("authtoken " + authToken);

            boolean isTokenValid = authenticationService.isAuthTokenValid(authToken);
            logger.info("is toke valid " + isTokenValid);

            if ( !isTokenValid ) {
                requestCtx.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
                return;
            } else {
                requestCtx.setSecurityContext(new SecurityContext() {

                    @Override
                    public Principal getUserPrincipal() {

                        return new Principal() {

                            @Override
                            public String getName() {
                                return authenticationService.getUserByToken(authToken).getId().toString();
                            }
                        };
                    }

                    @Override
                    public boolean isUserInRole(String role) {
                        return true;
                    }

                    @Override
                    public boolean isSecure() {
                        return false;
                    }

                    @Override
                    public String getAuthenticationScheme() {
                        return null;
                    }
                });
            }

        }
    }
}