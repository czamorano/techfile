package es.imserso.techfile.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.imserso.techfile.domain.RegimenProcedencia;
import es.imserso.techfile.repository.RegimenProcedenciaRepository;
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
 * REST controller for managing RegimenProcedencia.
 */
@RestController
@RequestMapping("/api")
public class RegimenProcedenciaResource {

    private final Logger log = LoggerFactory.getLogger(RegimenProcedenciaResource.class);

    private static final String ENTITY_NAME = "regimenProcedencia";

    private final RegimenProcedenciaRepository regimenProcedenciaRepository;

    public RegimenProcedenciaResource(RegimenProcedenciaRepository regimenProcedenciaRepository) {
        this.regimenProcedenciaRepository = regimenProcedenciaRepository;
    }

    /**
     * POST  /regimen-procedencias : Create a new regimenProcedencia.
     *
     * @param regimenProcedencia the regimenProcedencia to create
     * @return the ResponseEntity with status 201 (Created) and with body the new regimenProcedencia, or with status 400 (Bad Request) if the regimenProcedencia has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/regimen-procedencias")
    @Timed
    public ResponseEntity<RegimenProcedencia> createRegimenProcedencia(@Valid @RequestBody RegimenProcedencia regimenProcedencia) throws URISyntaxException {
        log.debug("REST request to save RegimenProcedencia : {}", regimenProcedencia);
        if (regimenProcedencia.getId() != null) {
            throw new BadRequestAlertException("A new regimenProcedencia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RegimenProcedencia result = regimenProcedenciaRepository.save(regimenProcedencia);
        return ResponseEntity.created(new URI("/api/regimen-procedencias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /regimen-procedencias : Updates an existing regimenProcedencia.
     *
     * @param regimenProcedencia the regimenProcedencia to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated regimenProcedencia,
     * or with status 400 (Bad Request) if the regimenProcedencia is not valid,
     * or with status 500 (Internal Server Error) if the regimenProcedencia couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/regimen-procedencias")
    @Timed
    public ResponseEntity<RegimenProcedencia> updateRegimenProcedencia(@Valid @RequestBody RegimenProcedencia regimenProcedencia) throws URISyntaxException {
        log.debug("REST request to update RegimenProcedencia : {}", regimenProcedencia);
        if (regimenProcedencia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RegimenProcedencia result = regimenProcedenciaRepository.save(regimenProcedencia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, regimenProcedencia.getId().toString()))
            .body(result);
    }

    /**
     * GET  /regimen-procedencias : get all the regimenProcedencias.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of regimenProcedencias in body
     */
    @GetMapping("/regimen-procedencias")
    @Timed
    public List<RegimenProcedencia> getAllRegimenProcedencias() {
        log.debug("REST request to get all RegimenProcedencias");
        return regimenProcedenciaRepository.findAll();
    }

    /**
     * GET  /regimen-procedencias/:id : get the "id" regimenProcedencia.
     *
     * @param id the id of the regimenProcedencia to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the regimenProcedencia, or with status 404 (Not Found)
     */
    @GetMapping("/regimen-procedencias/{id}")
    @Timed
    public ResponseEntity<RegimenProcedencia> getRegimenProcedencia(@PathVariable Long id) {
        log.debug("REST request to get RegimenProcedencia : {}", id);
        Optional<RegimenProcedencia> regimenProcedencia = regimenProcedenciaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(regimenProcedencia);
    }

    /**
     * DELETE  /regimen-procedencias/:id : delete the "id" regimenProcedencia.
     *
     * @param id the id of the regimenProcedencia to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/regimen-procedencias/{id}")
    @Timed
    public ResponseEntity<Void> deleteRegimenProcedencia(@PathVariable Long id) {
        log.debug("REST request to delete RegimenProcedencia : {}", id);

        regimenProcedenciaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
