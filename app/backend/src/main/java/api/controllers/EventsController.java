package api.controllers;

import api.models.VRegistrationAdd;
import api.models.events.enums.OwnerFilterType;
import core.models.Event;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import api.models.events.VEventCard;
import api.models.events.VEventCreate;
import api.models.events.VEventOverview;
import services.EventsServiceRemote;
import services.UsersServiceRemote;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.SecurityContext;
import java.util.ArrayList;
import java.util.List;

@Path("/events")
public class EventsController {

    private EventsServiceRemote eventsService;
    private UsersServiceRemote usersService;
    private static final Logger logger = LogManager.getLogger();

    public EventsController() throws NamingException {
        InitialContext ic = new InitialContext();
        eventsService = (EventsServiceRemote) ic.lookup("services.EventsServiceRemote");
        usersService = (UsersServiceRemote) ic.lookup("services.UsersServiceRemote");
    }

    @GET
    @Produces("application/json")
    public List<VEventOverview> getEvents() {

        List<Event> list = eventsService.getAll();

        List<VEventOverview> vlist = new ArrayList<VEventOverview>();
        for (Event e: list) {
            vlist.add(mapEvent(e));
        }

        return vlist;
    }

    @GET @Path("/{id}")
    @Produces("application/json")
    public VEventCard getEvent(@PathParam("id") Integer id, @Context SecurityContext sc) {
        logger.log(Level.INFO, "[TRY GET EVENT] " + id);

        Integer uid = Integer.valueOf(sc.getUserPrincipal().getName());

        Event event = eventsService.getEvent(id);

        logger.log(Level.INFO, "[TRY GET EVENT] regs" + event.getRegistrations());

        VEventCard vEventCard = new VEventCard(
                event.getId(),
                event.getName(),
                event.getEventDate(),
                event.getDescription(),
                event.getRegistrations());

        if (event.getOwnerId().equals(uid))
            vEventCard.setEditable(true);
        else
            vEventCard.setEditable(false);

        return vEventCard;
    }

    @GET
    @Path("/search")
    @Produces("application/json")
    public List<VEventOverview> getEventsSearch(@QueryParam("searchText") String searchText) {

        logger.log(Level.INFO, "[TRY SEARCH EVENTS] " + searchText);

        List<Event> list = eventsService.getSerchedList(searchText);

        List<VEventOverview> vlist = new ArrayList<VEventOverview>();
        for (Event e: list) {
            vlist.add(mapEvent(e));
        }

        return vlist;
    }

    @GET
    @Path("/filter-owner")
    @Produces("application/json")
    public List<VEventOverview> getEventsSearch(@QueryParam("filter") Integer filterParam, @Context SecurityContext sc) {

        logger.log(Level.INFO, "[TRY FILTER EVENTS] not parsed " + filterParam);
        OwnerFilterType filter = OwnerFilterType.values()[filterParam];
        logger.log(Level.INFO, "[TRY FILTER EVENTS] parsed " + filter);

        Integer uid = Integer.valueOf(sc.getUserPrincipal().getName());

        List<Event> list = eventsService.getFilteredList(filter, uid);

        List<VEventOverview> vlist = new ArrayList<VEventOverview>();
        for (Event e: list) {
            vlist.add(mapEvent(e));
        }

        return vlist;
    }

    private VEventOverview mapEvent(Event event) {
        return new VEventOverview(
                event.getId(),
                event.getName(),
                event.getEventDate(),
                event.getDescription()
        );
    }

    @POST
    @Consumes("application/json")
    public void create(VEventCreate vEventCreate, @Context SecurityContext sc) {
        logger.log(Level.INFO, "[TRY CREATE EVENT] " + vEventCreate);

        Integer uid = Integer.valueOf(sc.getUserPrincipal().getName());

        eventsService.create(new Event(
                vEventCreate.getName(),
                vEventCreate.getDate(),
                vEventCreate.getDesc(),
                uid, null
        ));
    }

    @PUT
    @Consumes("application/json")
    public void edit(VEventCard vEventCard) {
        logger.log(Level.INFO, "[TRY EDIT EVENT] " + vEventCard.getName());

        eventsService.edit(vEventCard);

    }

    @PUT @Path("add-registration")
    @Consumes("application/json")
    public void addRegistration(VRegistrationAdd registration, @Context SecurityContext sc) {
        logger.log(Level.INFO, "[TRY ADD REGISTRATION] " + registration);

        Integer uid = Integer.valueOf(sc.getUserPrincipal().getName());
        registration.setUserId(uid);

        eventsService.addRegistration(registration);
    }

    @PUT @Path("delete-registration")
    @Consumes("application/json")
    public void deleteRegistration(VRegistrationAdd registration, @Context SecurityContext sc) {
        logger.log(Level.INFO, "[TRY DELETE REGISTRATION] " + registration);

        Integer uid = Integer.valueOf(sc.getUserPrincipal().getName());
        registration.setUserId(uid);

        eventsService.deleteRegistration(registration);
    }

    @PUT @Path("invite-user")
    @Consumes("application/json")
    public void inviteUser(VRegistrationAdd registration, @Context SecurityContext sc) {
        logger.log(Level.INFO, "[TRY ADD REGISTRATION] " + registration);
        eventsService.inviteUser(registration);
    }
}
