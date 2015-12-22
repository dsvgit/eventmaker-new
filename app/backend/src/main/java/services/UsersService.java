package services;

import api.models.users.VUserProfile;
import core.models.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.SecurityContext;
import java.util.List;

@Stateless
public class UsersService implements UsersServiceRemote {
    @PersistenceContext
    private EntityManager em;

    @Override
    public List<User> getAll() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<User> q = cb.createQuery(User.class);
        Root<User> c = q.from(User.class);
        q.select(c);
        return em.createQuery(q).getResultList();
    }

    @Override
    public void create(User user) {
        em.persist(user);
    }

    @Override
    public void save(User user) {
        em.merge(user);
    }

    @Override
    public User getUser(Integer id) {
        return em.find(User.class, id);
    }

    @Override
    public void editUser(Integer id, VUserProfile profile) {
        User user = getUser(id);

        user.setFirstName(profile.getName());
        user.setLogin(profile.getLogin());
        user.setEmail(profile.getEmail());

        em.merge(user);
    }

    @Override
    public void delete(List<Integer> ids) {
        int i=0;
        for(Integer id : ids) {
            if(++i%49==0) {
                em.flush();
            }
            em.remove((User) em.find(User.class, id));
        }
    }

    @Override
    public User getByCredentials(String login, String password) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<User> q = cb.createQuery(User.class);
        Root<User> c = q.from(User.class);
        q.select(c);
        q.where(cb.and(cb.equal(c.get("login"), login), cb.equal(c.get("password"), password)));

        List<User> eventsList = em.createQuery(q).getResultList();
        if (!eventsList.isEmpty())
            return eventsList.get(0);
        else
            return null;
    }

    @Override
    public User getUserByToken(String token) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<User> q = cb.createQuery(User.class);
        Root<User> c = q.from(User.class);
        q.select(c);
        q.where(cb.equal(c.get("authToken"), token));

        List<User> eventsList = em.createQuery(q).getResultList();
        if (!eventsList.isEmpty())
            return eventsList.get(0);
        else
            return null;
    }
}
