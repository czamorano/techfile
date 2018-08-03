package es.imserso.techfile.service.impl;

import es.imserso.techfile.service.FicheroService;
import es.imserso.techfile.domain.Fichero;
import es.imserso.techfile.repository.FicheroRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Fichero.
 */
@Service
@Transactional
public class FicheroServiceImpl implements FicheroService {

    private final Logger log = LoggerFactory.getLogger(FicheroServiceImpl.class);

    private final FicheroRepository ficheroRepository;

    public FicheroServiceImpl(FicheroRepository ficheroRepository) {
        this.ficheroRepository = ficheroRepository;
    }

    /**
     * Save a fichero.
     *
     * @param fichero the entity to save
     * @return the persisted entity
     */
    @Override
    public Fichero save(Fichero fichero) {
        log.debug("Request to save Fichero : {}", fichero);        return ficheroRepository.save(fichero);
    }

    /**
     * Get all the ficheroes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Fichero> findAll() {
        log.debug("Request to get all Ficheroes");
        return ficheroRepository.findAll();
    }


    /**
     * Get one fichero by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Fichero> findOne(Long id) {
        log.debug("Request to get Fichero : {}", id);
        return ficheroRepository.findById(id);
    }

    /**
     * Delete the fichero by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Fichero : {}", id);
        ficheroRepository.deleteById(id);
    }
}
