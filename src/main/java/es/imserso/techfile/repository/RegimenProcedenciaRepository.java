package es.imserso.techfile.repository;

import es.imserso.techfile.domain.RegimenProcedencia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RegimenProcedencia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RegimenProcedenciaRepository extends JpaRepository<RegimenProcedencia, Long> {

}
