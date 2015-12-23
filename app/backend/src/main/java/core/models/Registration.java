package core.models;

import core.models.enums.RegistrationStatus;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "registration")
public class Registration implements Serializable {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Integer id;

    @Enumerated(EnumType.ORDINAL)
    @Column(name="status")
    private RegistrationStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Registration() {
    }

    public Registration(User user, RegistrationStatus status) {
        this.status = status;
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public RegistrationStatus getStatus() {
        return status;
    }

    public void setStatus(RegistrationStatus status) {
        this.status = status;
    }
}
