package vmodels;

public class VUserDelete {
    public VUserDelete() {
    }

    public VUserDelete(Integer id) {
        this.id = id;
    }

    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
