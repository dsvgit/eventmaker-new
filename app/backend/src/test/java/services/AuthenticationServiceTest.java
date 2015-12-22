package services;

import api.models.auth.VAuthLoginElement;
import core.models.User;
import org.jboss.arquillian.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.Archive;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.ejb.EJB;

@RunWith(Arquillian.class)
public class AuthenticationServiceTest {

    @EJB
    private AuthenticationService authenticationService;

    @Deployment
    public static Archive<?> createDeployment() {
        return ShrinkWrap.create(WebArchive.class, "foo.jar")
                .addClasses(AuthenticationService.class,
                        UsersService.class);
    }


    @Test
    public void testLogin() throws Exception {
        VAuthLoginElement loginElement = new VAuthLoginElement("alexey", "alexey");

        authenticationService.login(loginElement);
    }
}