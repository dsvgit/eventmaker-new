package services;

import core.models.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

@Stateless
public class UsersService {
    @PersistenceContext
    private EntityManager em;

    public List<User> getAll() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<User> q = cb.createQuery(User.class);
        Root<User> c = q.from(User.class);
        q.select(c);
        return em.createQuery(q).getResultList();
    }

    public void create(User user) {
        em.persist(user);
    }

    public User getUser(Integer id) {
        return em.find(User.class, id);
    }

    public void delete(List<Integer> ids) {
        int i=0;
        for(Integer id : ids) {
            if(++i%49==0) {
                em.flush();
            }
            em.remove((User) em.find(User.class, id));
        }
    }

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
}
