package es.imserso.techfile.service;

import es.imserso.techfile.domain.Autonomia;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Autonomia.
 */
public interface AutonomiaService {

    /**
     * Save a autonomia.
     *
     * @param autonomia the entity to save
     * @return the persisted entity
     */
    Autonomia save(Autonomia autonomia);

    /**
     * Get all the autonomias.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Autonomia> findAll(Pageable pageable);


    /**
     * Get the "id" autonomia.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Autonomia> findOne(Long id);

    /**
     * Delete the "id" autonomia.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
