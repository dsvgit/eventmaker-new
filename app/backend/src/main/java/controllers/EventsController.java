package controllers;

import models.Event;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import services.EventsService;
import vmodels.VEventCard;
import vmodels.VEventCreate;
import vmodels.VEventOverview;
import vmodels.VEventsSearch;

import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.ArrayList;
import java.util.List;

@Path("/events")
public class EventsController {

    @Inject
    private EventsService eventsService;

    private static final Logger logger = LogManager.getLogger();

    @GET
    @Produces("application/json")
    public List<VEventOverview> getEvents() {

        List<Event> list = eventsService.getAll();

        List<VEventOverview> vlist = new ArrayList<VEventOverview>();
        for (Event e: list) {
            vlist.add(new VEventOverview(
                    e.getId(),
                    e.getName(),
                    e.getEventDate(),
                    e.getDescription()
            ));
        }

        return vlist;
    }

    @GET @Path("/{id}")
    @Produces("application/json")
    public VEventCard getEvents(@PathParam("id") Integer id) {
        logger.log(Level.INFO, "[TRY CREATE EVENT] " + id);

        Event event = eventsService.getEvent(id);

        VEventCard vEventCard = new VEventCard(
                event.getId(),
                event.getName(),
                event.getEventDate(),
                event.getDescription()
        );

        return vEventCard;
    }

    @GET @Path("/search")
    @Produces("application/json")
    public List<VEventOverview> getEventsSearch(@QueryParam("searchText") String searchText) {

        logger.log(Level.INFO, "[TRY SEARCH EVENTS] " + searchText);

        List<Event> list = eventsService.getSerchedList(searchText);

        List<VEventOverview> vlist = new ArrayList<VEventOverview>();
        for (Event e: list) {
            vlist.add(new VEventOverview(
                    e.getId(),
                    e.getName(),
                    e.getEventDate(),
                    e.getDescription()
            ));
        }

        return vlist;
    }

    @POST
    @Consumes("application/json")
    public void create(VEventCreate vEventCreate) {
        logger.log(Level.INFO, "[TRY CREATE EVENT] " + vEventCreate);

        eventsService.create(new Event(
                vEventCreate.getName(),
                vEventCreate.getDate(),
                vEventCreate.getDesc(),
                null
        ));
    }
}
