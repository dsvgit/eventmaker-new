package services;

import models.Registration;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Stateless
public class RegistrationsService {
    @PersistenceContext
    private EntityManager em;

    public List<Registration> getAll() {
        TypedQuery<Registration> query = em.createQuery("select r from Registration r", Registration.class);

        return query.getResultList();
    }
}
