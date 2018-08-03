package es.imserso.techfile.service.impl;

import es.imserso.techfile.service.FicheroByteService;
import es.imserso.techfile.domain.FicheroByte;
import es.imserso.techfile.repository.FicheroByteRepository;
import es.imserso.techfile.service.dto.FicheroByteDTO;
import es.imserso.techfile.service.mapper.FicheroByteMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing FicheroByte.
 */
@Service
@Transactional
public class FicheroByteServiceImpl implements FicheroByteService {

    private final Logger log = LoggerFactory.getLogger(FicheroByteServiceImpl.class);

    private final FicheroByteRepository ficheroByteRepository;

    private final FicheroByteMapper ficheroByteMapper;

    public FicheroByteServiceImpl(FicheroByteRepository ficheroByteRepository, FicheroByteMapper ficheroByteMapper) {
        this.ficheroByteRepository = ficheroByteRepository;
        this.ficheroByteMapper = ficheroByteMapper;
    }

    /**
     * Save a ficheroByte.
     *
     * @param ficheroByteDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FicheroByteDTO save(FicheroByteDTO ficheroByteDTO) {
        log.debug("Request to save FicheroByte : {}", ficheroByteDTO);
        FicheroByte ficheroByte = ficheroByteMapper.toEntity(ficheroByteDTO);
        ficheroByte = ficheroByteRepository.save(ficheroByte);
        return ficheroByteMapper.toDto(ficheroByte);
    }

    /**
     * Get all the ficheroBytes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FicheroByteDTO> findAll() {
        log.debug("Request to get all FicheroBytes");
        return ficheroByteRepository.findAll().stream()
            .map(ficheroByteMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one ficheroByte by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FicheroByteDTO> findOne(Long id) {
        log.debug("Request to get FicheroByte : {}", id);
        return ficheroByteRepository.findById(id)
            .map(ficheroByteMapper::toDto);
    }

    /**
     * Delete the ficheroByte by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FicheroByte : {}", id);
        ficheroByteRepository.deleteById(id);
    }
}
