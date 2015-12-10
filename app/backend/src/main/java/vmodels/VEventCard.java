package vmodels;

import java.util.Date;

public class VEventCard {
    private Integer id;
    private String name;
    private Date date;
    private String desc;

    public VEventCard() {
    }

    public VEventCard(Integer id, String name, Date date, String desc) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.desc = desc;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
