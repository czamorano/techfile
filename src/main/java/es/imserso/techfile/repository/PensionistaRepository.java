package es.imserso.techfile.repository;

import es.imserso.techfile.domain.Pensionista;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Pensionista entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PensionistaRepository extends JpaRepository<Pensionista, Long> {

    @Query(value = "select distinct pensionista from Pensionista pensionista left join fetch pensionista.discapacidads left join fetch pensionista.diagnosticos left join fetch pensionista.etiologias",
        countQuery = "select count(distinct pensionista) from Pensionista pensionista")
    Page<Pensionista> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct pensionista from Pensionista pensionista left join fetch pensionista.discapacidads left join fetch pensionista.diagnosticos left join fetch pensionista.etiologias")
    List<Pensionista> findAllWithEagerRelationships();

    @Query("select pensionista from Pensionista pensionista left join fetch pensionista.discapacidads left join fetch pensionista.diagnosticos left join fetch pensionista.etiologias where pensionista.id =:id")
    Optional<Pensionista> findOneWithEagerRelationships(@Param("id") Long id);

}
