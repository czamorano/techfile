package es.imserso.techfile.repository;

import es.imserso.techfile.domain.Perceptor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Perceptor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerceptorRepository extends JpaRepository<Perceptor, Long> {

}
