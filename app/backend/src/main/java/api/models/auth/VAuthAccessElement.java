package api.models.auth;

public class VAuthAccessElement {
    public static final String PARAM_AUTH_ID = "auth-id";
    public static final String PARAM_AUTH_TOKEN = "auth-token";

    private String authId;
    private String authToken;

    public VAuthAccessElement() {
    }

    public VAuthAccessElement(String authId, String authToken) {
        this.authId = authId;
        this.authToken = authToken;
    }

    public String getAuthId() {
        return authId;
    }

    public void setAuthId(String authId) {
        this.authId = authId;
    }

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }

}
