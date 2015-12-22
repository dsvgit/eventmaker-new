package services;

import api.models.users.VUserProfile;
import core.models.User;

import javax.ejb.Remote;
import java.util.List;

/**
 * Created by dsvma_000 on 12/15/2015.
 */
@Remote
public interface UsersServiceRemote {
    List<User> getAll();

    void create(User user);

    void save(User user);

    User getUser(Integer id);

    void editUser(Integer id, VUserProfile profile);

    void delete(List<Integer> ids);

    User getByCredentials(String login, String password);

    User getUserByToken(String token);
}
