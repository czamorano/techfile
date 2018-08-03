package es.imserso.techfile.repository;

import es.imserso.techfile.domain.Etiologia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Etiologia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtiologiaRepository extends JpaRepository<Etiologia, Long> {

}
