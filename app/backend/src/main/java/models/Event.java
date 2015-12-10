package models;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@javax.persistence.Entity
@Table(name = "event")
public class Event {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Integer id;

    @Column(name="name")
    private String name;

    @Column(name="event_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date eventDate;

    @Column(name="description")
    private String description;

    @OneToMany
    private Collection<Registration> registrations;

    public Event() {
    }

    public Event(String name, Date eventDate, String description, List<Registration> registrations) {
        this.name = name;
        this.eventDate = eventDate;
        this.description = description;
        this.registrations = registrations;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getEventDate() {
        return eventDate;
    }

    public void setEventDate(Date eventDate) {
        this.eventDate = eventDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Collection<Registration> getRegistrations() {
        return registrations;
    }

    public void setRegistrations(Collection<Registration> registrations) {
        this.registrations = registrations;
    }
}
