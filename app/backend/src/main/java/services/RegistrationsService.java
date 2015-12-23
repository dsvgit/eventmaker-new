package services;

import core.models.Registration;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

@Stateless
public class RegistrationsService implements RegistrationsServiceRemote {
    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Registration> getAll() {
        TypedQuery<Registration> query = em.createQuery("select r from Registration r", Registration.class);

        return query.getResultList();
    }
}
