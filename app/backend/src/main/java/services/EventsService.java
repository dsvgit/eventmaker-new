package services;

import api.models.VRegistrationAdd;
import api.models.events.VEventCard;
import api.models.events.enums.OwnerFilterType;
import core.models.Event;
import core.models.Registration;
import core.models.User;
import core.models.enums.RegistrationStatus;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.ejb.Stateless;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Stateless
public class EventsService implements EventsServiceRemote {
    @PersistenceContext
    private EntityManager em;

    private UsersServiceRemote usersService;

    private static final Logger logger = LogManager.getLogger();

    public EventsService() throws NamingException {
        InitialContext ic = new InitialContext();
        usersService = (UsersServiceRemote) ic.lookup("services.UsersServiceRemote");
    }

    @Override
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

    @Override
    public List<Event> getSerchedList(String searchText) {
        logger.log(Level.INFO, "[EVENTS SERVICE] get all before query" + searchText);

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

    @Override
    public List<Event> getFilteredList(OwnerFilterType filter, Integer uid) {
        logger.log(Level.INFO, "[EVENTS SERVICE] get filtered before query" + filter);

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Event> q = cb.createQuery(Event.class);
        Root<Event> c = q.from(Event.class);
        q.select(c);

        if (filter == OwnerFilterType.USER_OWN) {
            q.where(cb.equal(c.get("ownerId"), uid));
        }

        logger.log(Level.INFO, "[EVENTS SERVICE] get filtered after query");

        List<Event> eventsList = em.createQuery(q).getResultList();
        List<Event> newEventsList = new ArrayList<>();
        if (filter == OwnerFilterType.INVITES) {
            for (Event event : eventsList) {
                for (Registration reg : event.getRegistrations()) {
                    if (reg.getUser().getId().equals(uid)) {
                        newEventsList.add(event);
                    }
                }
            }
        } else {
            newEventsList = eventsList;
        }

        return newEventsList;
    }

    @Override
    public void create(Event event) {
        em.persist(event);
    }

    @Override
    public void edit(VEventCard eventCard) {

        Event event = getEvent(eventCard.getId());

        event.setName(eventCard.getName());
        event.setEventDate(eventCard.getDate());
        event.setDescription(eventCard.getDesc());


        em.merge(event);
    }

    @Override
    public Event getEvent(Integer id) {
        return em.find(Event.class, id);
    }

    @Override
    public void addRegistration(VRegistrationAdd registration) {
        Event event = getEvent(registration.getEventId());
        User user = usersService.getUser(registration.getUserId());

        boolean flag = true;
        for (Registration reg : event.getRegistrations()) {
            if (reg.getUser().getId().equals(user.getId())) {
                reg.setStatus(RegistrationStatus.CONFIRMED);
                flag = false;
            }
        }

        if (flag) {
            Registration reg = new Registration(user, RegistrationStatus.CONFIRMED);
            em.persist(reg);
            event.addRegistration(reg);
        }

        em.merge(event);
    }

    @Override
    public void deleteRegistration(VRegistrationAdd registration) {
        Event event = getEvent(registration.getEventId());
        User user = usersService.getUser(registration.getUserId());

        ArrayList<Registration> rlist = new ArrayList<>();
        for(Registration reg : event.getRegistrations()) {
            if(!reg.getUser().getId().equals(user.getId())) {
                rlist.add(reg);
            }
        }
        event.setRegistrations(rlist);

        em.merge(event);
    }

    @Override
    public void inviteUser(VRegistrationAdd registration) {
        Event event = getEvent(registration.getEventId());
        User user = usersService.getUser(registration.getUserId());

        for (Registration reg : event.getRegistrations()) {
            if (reg.getUser().getId().equals(user.getId())) return;
        }

        Registration reg = new Registration(user, RegistrationStatus.INVITED);
        em.persist(reg);
        event.addRegistration(reg);

        em.merge(event);
    }
}
