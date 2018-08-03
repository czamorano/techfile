package es.imserso.techfile.service;

import es.imserso.techfile.domain.Fichero;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Fichero.
 */
public interface FicheroService {

    /**
     * Save a fichero.
     *
     * @param fichero the entity to save
     * @return the persisted entity
     */
    Fichero save(Fichero fichero);

    /**
     * Get all the ficheroes.
     *
     * @return the list of entities
     */
    List<Fichero> findAll();


    /**
     * Get the "id" fichero.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Fichero> findOne(Long id);

    /**
     * Delete the "id" fichero.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
