package api.models.events;

import core.models.Registration;

import java.util.Collection;
import java.util.Date;
import java.util.List;

public class VEventCard {
    private Integer id;
    private String name;
    private Date date;
    private String desc;
    private boolean editable;
    private Collection<Registration> regs;

    public VEventCard() {
    }

    public VEventCard(Integer id, String name, Date date, String desc, Collection<Registration> regs) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.desc = desc;
        this.regs = regs;

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

    public boolean isEditable() {
        return editable;
    }

    public void setEditable(boolean editable) {
        this.editable = editable;
    }

    public Collection<Registration> getRegs() {
        return regs;
    }

    public void setRegs(Collection<Registration> regs) {
        this.regs = regs;
    }
}
