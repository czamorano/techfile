package es.imserso.techfile.repository;

import es.imserso.techfile.domain.Conviviente;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Conviviente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConvivienteRepository extends JpaRepository<Conviviente, Long> {

}
