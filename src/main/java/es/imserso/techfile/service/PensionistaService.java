package es.imserso.techfile.service;

import es.imserso.techfile.domain.Pensionista;
import es.imserso.techfile.repository.PensionistaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Pensionista.
 */
@Service
@Transactional
public class PensionistaService {

    private final Logger log = LoggerFactory.getLogger(PensionistaService.class);

    private final PensionistaRepository pensionistaRepository;

    public PensionistaService(PensionistaRepository pensionistaRepository) {
        this.pensionistaRepository = pensionistaRepository;
    }

    /**
     * Save a pensionista.
     *
     * @param pensionista the entity to save
     * @return the persisted entity
     */
    public Pensionista save(Pensionista pensionista) {
        log.debug("Request to save Pensionista : {}", pensionista);        return pensionistaRepository.save(pensionista);
    }

    /**
     * Get all the pensionistas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Pensionista> findAll(Pageable pageable) {
        log.debug("Request to get all Pensionistas");
        return pensionistaRepository.findAll(pageable);
    }

    /**
     * Get all the Pensionista with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<Pensionista> findAllWithEagerRelationships(Pageable pageable) {
        return pensionistaRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one pensionista by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Pensionista> findOne(Long id) {
        log.debug("Request to get Pensionista : {}", id);
        return pensionistaRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the pensionista by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Pensionista : {}", id);
        pensionistaRepository.deleteById(id);
    }
}
