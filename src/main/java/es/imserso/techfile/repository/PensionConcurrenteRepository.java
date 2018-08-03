package es.imserso.techfile.repository;

import es.imserso.techfile.domain.PensionConcurrente;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PensionConcurrente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PensionConcurrenteRepository extends JpaRepository<PensionConcurrente, Long> {

}
