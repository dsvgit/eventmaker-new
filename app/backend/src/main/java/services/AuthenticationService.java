package services;

import api.models.auth.VAuthAccessElement;
import api.models.auth.VAuthLoginElement;
import core.models.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import java.util.Date;
import java.util.UUID;

@Stateless
public class AuthenticationService implements AuthenticationServiceRemote {

    private UsersServiceRemote usersService;

    private static final Logger logger = LogManager.getLogger(AuthenticationService.class);

    public AuthenticationService() throws NamingException {
        InitialContext ic = new InitialContext();
        usersService = (UsersServiceRemote) ic.lookup("services.UsersServiceRemote");
    }

    public VAuthAccessElement login(VAuthLoginElement loginElement) {
        User user = usersService.getByCredentials(loginElement.getLogin(), loginElement.getPassword());
        if (user != null) {
            user.setAuthToken(UUID.randomUUID().toString());
            user.setLastVisitDate(new Date());
            usersService.save(user);
            return new VAuthAccessElement(loginElement.getLogin(), user.getAuthToken());
        }
        return null;
    }

    public boolean isAuthTokenValid(String token) {
        if (token == null) return false;

        User user = usersService.getUserByToken(token);
        if (user != null) {
            logger.info("authorized user: ", user.getFirstName());
            return true;
        }
        return false;
    }

    public User getUserByToken(String token) {
        return usersService.getUserByToken(token);
    }

    @Override
    public void logout(Integer uid) {
        User user = usersService.getUser(uid);
        if (user != null) {
            user.setAuthToken(null);
            user.setLastVisitDate(null);
            usersService.save(user);
        }
    }
}
