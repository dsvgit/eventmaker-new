package services;

import javax.ejb.Stateful;

@Stateful
public class Identity {

    private Integer uid;

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }
}
