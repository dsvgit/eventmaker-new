package core.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@javax.persistence.Entity
@Table(name = "user")
public class User implements Serializable {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Integer id;

    @Column(name="name")
    private String firstName;

    @Column(name="login")
    private String login;

    @Column(name="email")
    private String email;

    @Column(name= "password")
    private String password;

    @Column(name= "auth_token")
    private String authToken;

    @Column(name= "last_visit")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastVisitDate;

    public User() {
    }

    public User(String firstName, String login, String email, String password) {
        this.firstName = firstName;
        this.login = login;
        this.email = email;
        this.password = password;
    }

    public User(String firstName, String login, String email) {
        this.firstName = firstName;
        this.login = login;
        this.email = email;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    @Override
    public String toString() {
        return "User: " + getId() + " " + getLogin() + " " + getFirstName();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }

    public Date getLastVisitDate() {
        return lastVisitDate;
    }

    public void setLastVisitDate(Date lastVisitDate) {
        this.lastVisitDate = lastVisitDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}