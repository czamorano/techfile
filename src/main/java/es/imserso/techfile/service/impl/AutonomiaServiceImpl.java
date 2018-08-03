package es.imserso.techfile.service.impl;

import es.imserso.techfile.service.AutonomiaService;
import es.imserso.techfile.domain.Autonomia;
import es.imserso.techfile.repository.AutonomiaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Autonomia.
 */
@Service
@Transactional
public class AutonomiaServiceImpl implements AutonomiaService {

    private final Logger log = LoggerFactory.getLogger(AutonomiaServiceImpl.class);

    private final AutonomiaRepository autonomiaRepository;

    public AutonomiaServiceImpl(AutonomiaRepository autonomiaRepository) {
        this.autonomiaRepository = autonomiaRepository;
    }

    /**
     * Save a autonomia.
     *
     * @param autonomia the entity to save
     * @return the persisted entity
     */
    @Override
    public Autonomia save(Autonomia autonomia) {
        log.debug("Request to save Autonomia : {}", autonomia);        return autonomiaRepository.save(autonomia);
    }

    /**
     * Get all the autonomias.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Autonomia> findAll(Pageable pageable) {
        log.debug("Request to get all Autonomias");
        return autonomiaRepository.findAll(pageable);
    }


    /**
     * Get one autonomia by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Autonomia> findOne(Long id) {
        log.debug("Request to get Autonomia : {}", id);
        return autonomiaRepository.findById(id);
    }

    /**
     * Delete the autonomia by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Autonomia : {}", id);
        autonomiaRepository.deleteById(id);
    }
}
