package es.imserso.techfile.repository;

import es.imserso.techfile.domain.Fichero;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Fichero entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FicheroRepository extends JpaRepository<Fichero, Long> {

}
