package core.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "registration")
public class Registration implements Serializable {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Registration() {
    }

    public Registration(User user) {
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
}
