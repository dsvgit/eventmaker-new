package vmodels;

import java.util.Date;

public class VEventCreate {
    private String name;
    private Date date;
    private String desc;

    public VEventCreate() {
    }

    public VEventCreate(String name, Date date, String description) {
        this.name = name;
        this.date = date;
        this.desc = description;
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
