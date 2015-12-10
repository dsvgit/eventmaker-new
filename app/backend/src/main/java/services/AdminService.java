package services;

import models.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class AdminService {
    @PersistenceContext
    private EntityManager em;

    public void initDatabase() {

    }
}
