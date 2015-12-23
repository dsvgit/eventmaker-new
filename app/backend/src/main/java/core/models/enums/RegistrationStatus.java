package core.models.enums;

public enum RegistrationStatus {
    INVITED(0), CONFIRMED(1);
    private final int value;

    private RegistrationStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
