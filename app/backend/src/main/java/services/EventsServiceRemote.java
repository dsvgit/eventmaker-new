package services;

import api.models.VRegistrationAdd;
import api.models.events.VEventCard;
import api.models.events.enums.OwnerFilterType;
import core.models.Event;

import javax.ejb.Remote;
import java.util.List;

/**
 * Created by dsvma_000 on 12/15/2015.
 */
@Remote
public interface EventsServiceRemote {
    List<Event> getAll();

    List<Event> getSerchedList(String searchText);

    List<Event> getFilteredList(OwnerFilterType filter, Integer uid);

    void create(Event event);

    void edit(VEventCard event);

    Event getEvent(Integer id);

    void addRegistration(VRegistrationAdd registration);

    void deleteRegistration(VRegistrationAdd registration);

    void inviteUser(VRegistrationAdd registration);
}
