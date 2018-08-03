package es.imserso.techfile.service;

import es.imserso.techfile.service.dto.FicheroByteDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing FicheroByte.
 */
public interface FicheroByteService {

    /**
     * Save a ficheroByte.
     *
     * @param ficheroByteDTO the entity to save
     * @return the persisted entity
     */
    FicheroByteDTO save(FicheroByteDTO ficheroByteDTO);

    /**
     * Get all the ficheroBytes.
     *
     * @return the list of entities
     */
    List<FicheroByteDTO> findAll();


    /**
     * Get the "id" ficheroByte.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<FicheroByteDTO> findOne(Long id);

    /**
     * Delete the "id" ficheroByte.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
