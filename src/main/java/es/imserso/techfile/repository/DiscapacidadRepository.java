package es.imserso.techfile.repository;

import es.imserso.techfile.domain.Discapacidad;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Discapacidad entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiscapacidadRepository extends JpaRepository<Discapacidad, Long> {

}
