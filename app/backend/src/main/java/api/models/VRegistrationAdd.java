package api.models;

import java.io.Serializable;

/**
 * Created by dsvma_000 on 12/16/2015.
 */
public class VRegistrationAdd implements Serializable {
    private Integer eventId;
    private Integer userId;

    public VRegistrationAdd() {
    }

    public VRegistrationAdd(Integer eventId, Integer userId) {
        this.eventId = eventId;
        this.userId = userId;
    }

    public Integer getEventId() {
        return eventId;
    }

    public void setEventId(Integer eventId) {
        this.eventId = eventId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
