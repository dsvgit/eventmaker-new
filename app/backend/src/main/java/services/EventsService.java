package services;

import models.Event;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.ParameterExpression;
import javax.persistence.criteria.Root;
import java.util.List;

@Stateless
public class EventsService {
    @PersistenceContext
    private EntityManager em;

    private static final Logger logger = LogManager.getLogger();

    public List<Event> getAll() {
        logger.log(Level.INFO, "[EVENTS SERVICE] get all before query");

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Event> q = cb.createQuery(Event.class);
        Root<Event> c = q.from(Event.class);
        q.select(c);

        logger.log(Level.INFO, "[EVENTS SERVICE] get all after query");

        List<Event> eventsList = em.createQuery(q).getResultList();
        return eventsList;
    }

    public List<Event> getSerchedList(String searchText) {
        logger.log(Level.INFO, "[EVENTS SERVICE] get all before query");

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Event> q = cb.createQuery(Event.class);
        Root<Event> c = q.from(Event.class);
        q.select(c);

        if (!(searchText == null) || !(searchText.isEmpty())) {
            q.where(cb.like(c.get("name"), "%" + searchText + "%"));
        }

        logger.log(Level.INFO, "[EVENTS SERVICE] get all after query");

        List<Event> eventsList = em.createQuery(q).getResultList();
        return eventsList;
    }

    public void create(Event event) {
        em.persist(event);
    }

    public Event getEvent(Integer id) {
        return em.find(Event.class, id);
    }
}
