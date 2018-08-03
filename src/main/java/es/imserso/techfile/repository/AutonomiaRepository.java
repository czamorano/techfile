package es.imserso.techfile.repository;

import es.imserso.techfile.domain.Autonomia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Autonomia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AutonomiaRepository extends JpaRepository<Autonomia, Long> {

}
