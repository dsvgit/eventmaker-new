package services;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class AdminService implements AdminServiceRemote {
    @PersistenceContext
    private EntityManager em;
}
