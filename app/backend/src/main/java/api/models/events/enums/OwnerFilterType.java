package api.models.events.enums;

/**
 * Created by dsvma_000 on 12/16/2015.
 */
public enum OwnerFilterType {
    ALL(0), USER_OWN(1), INVITES(2);
    private final int value;

    private OwnerFilterType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
