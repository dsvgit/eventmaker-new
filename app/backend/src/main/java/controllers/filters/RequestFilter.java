package controllers.filters;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Provider
@PreMatching
public class RequestFilter implements ContainerRequestFilter {

    private static final Logger logger = LogManager.getLogger();


    @Override
    public void filter( ContainerRequestContext requestCtx ) throws IOException {

        String path = requestCtx.getUriInfo().getPath();
        logger.info( "Filtering request path: " + path );

        // IMPORTANT!!! First, Acknowledge any pre-flight test from browsers for this case before validating the headers (CORS stuff)
        if ( requestCtx.getRequest().getMethod().equals( "OPTIONS" ) ) {
            requestCtx.abortWith( Response.status( Response.Status.OK ).build() );

            return;
        }

        // Then check is the service key exists and is valid.
        Authenticator authenticator = new Authenticator();
        String serviceKey = requestCtx.getHeaderString("X-Auth-Token");

//        if ( !authenticator.isServiceKeyValid( serviceKey ) ) {
//            // Kick anyone without a valid service key
//            requestCtx.abortWith( Response.status( Response.Status.UNAUTHORIZED ).build() );
//
//            return;
//        }

        // For any pther methods besides login, the authToken must be verified
        if ( !path.startsWith( "/auth/login" ) ) {
            String authToken = requestCtx.getHeaderString("X-Auth-Token");

            // if it isn't valid, just kick them out.
            try {
                if ( !authenticator.isAuthTokenValid( authToken ) ) {
                    requestCtx.abortWith( Response.status( Response.Status.UNAUTHORIZED ).build() );
                }
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            } catch (InvalidKeySpecException e) {
                e.printStackTrace();
            }
        }
    }
}