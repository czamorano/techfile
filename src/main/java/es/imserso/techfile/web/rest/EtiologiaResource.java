package es.imserso.techfile.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.imserso.techfile.domain.Etiologia;
import es.imserso.techfile.repository.EtiologiaRepository;
import es.imserso.techfile.web.rest.errors.BadRequestAlertException;
import es.imserso.techfile.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Etiologia.
 */
@RestController
@RequestMapping("/api")
public class EtiologiaResource {

    private final Logger log = LoggerFactory.getLogger(EtiologiaResource.class);

    private static final String ENTITY_NAME = "etiologia";

    private final EtiologiaRepository etiologiaRepository;

    public EtiologiaResource(EtiologiaRepository etiologiaRepository) {
        this.etiologiaRepository = etiologiaRepository;
    }

    /**
     * POST  /etiologias : Create a new etiologia.
     *
     * @param etiologia the etiologia to create
     * @return the ResponseEntity with status 201 (Created) and with body the new etiologia, or with status 400 (Bad Request) if the etiologia has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/etiologias")
    @Timed
    public ResponseEntity<Etiologia> createEtiologia(@Valid @RequestBody Etiologia etiologia) throws URISyntaxException {
        log.debug("REST request to save Etiologia : {}", etiologia);
        if (etiologia.getId() != null) {
            throw new BadRequestAlertException("A new etiologia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Etiologia result = etiologiaRepository.save(etiologia);
        return ResponseEntity.created(new URI("/api/etiologias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /etiologias : Updates an existing etiologia.
     *
     * @param etiologia the etiologia to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated etiologia,
     * or with status 400 (Bad Request) if the etiologia is not valid,
     * or with status 500 (Internal Server Error) if the etiologia couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/etiologias")
    @Timed
    public ResponseEntity<Etiologia> updateEtiologia(@Valid @RequestBody Etiologia etiologia) throws URISyntaxException {
        log.debug("REST request to update Etiologia : {}", etiologia);
        if (etiologia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Etiologia result = etiologiaRepository.save(etiologia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, etiologia.getId().toString()))
            .body(result);
    }

    /**
     * GET  /etiologias : get all the etiologias.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of etiologias in body
     */
    @GetMapping("/etiologias")
    @Timed
    public List<Etiologia> getAllEtiologias() {
        log.debug("REST request to get all Etiologias");
        return etiologiaRepository.findAll();
    }

    /**
     * GET  /etiologias/:id : get the "id" etiologia.
     *
     * @param id the id of the etiologia to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the etiologia, or with status 404 (Not Found)
     */
    @GetMapping("/etiologias/{id}")
    @Timed
    public ResponseEntity<Etiologia> getEtiologia(@PathVariable Long id) {
        log.debug("REST request to get Etiologia : {}", id);
        Optional<Etiologia> etiologia = etiologiaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(etiologia);
    }

    /**
     * DELETE  /etiologias/:id : delete the "id" etiologia.
     *
     * @param id the id of the etiologia to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/etiologias/{id}")
    @Timed
    public ResponseEntity<Void> deleteEtiologia(@PathVariable Long id) {
        log.debug("REST request to delete Etiologia : {}", id);

        etiologiaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
