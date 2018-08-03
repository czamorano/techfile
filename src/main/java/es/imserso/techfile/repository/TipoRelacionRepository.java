package es.imserso.techfile.repository;

import es.imserso.techfile.domain.TipoRelacion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoRelacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoRelacionRepository extends JpaRepository<TipoRelacion, Long> {

}
