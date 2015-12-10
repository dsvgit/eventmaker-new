package vmodels;

import java.util.List;

public class VDelete {
    private List<Integer> ids;

    public VDelete() {
    }

    public VDelete(List<Integer> ids) {
        this.ids = ids;
    }

    public List<Integer> getIds() {
        return ids;
    }

    public void setIds(List<Integer> ids) {
        this.ids = ids;
    }
}
