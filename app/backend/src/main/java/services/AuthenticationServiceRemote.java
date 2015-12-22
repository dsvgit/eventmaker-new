package services;

import api.models.auth.VAuthAccessElement;
import api.models.auth.VAuthLoginElement;
import core.models.User;

import javax.ejb.Remote;

@Remote
public interface AuthenticationServiceRemote {
    VAuthAccessElement login(VAuthLoginElement loginElement);
    boolean isAuthTokenValid(String token);
    void logout(Integer uid);
    User getUserByToken(String token);
}
