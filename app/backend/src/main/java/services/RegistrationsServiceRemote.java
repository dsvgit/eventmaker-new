package services;

import core.models.Registration;

import javax.ejb.Remote;
import java.util.List;

/**
 * Created by dsvma_000 on 12/15/2015.
 */
@Remote
public interface RegistrationsServiceRemote {
    List<Registration> getAll();
}
