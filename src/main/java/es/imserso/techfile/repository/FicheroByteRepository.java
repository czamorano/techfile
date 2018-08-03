package es.imserso.techfile.repository;

import es.imserso.techfile.domain.FicheroByte;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FicheroByte entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FicheroByteRepository extends JpaRepository<FicheroByte, Long> {

}
