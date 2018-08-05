package es.imserso.techfile.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.imserso.techfile.domain.Autonomia;
import es.imserso.techfile.repository.AutonomiaRepository;
import es.imserso.techfile.web.rest.errors.BadRequestAlertException;
import es.imserso.techfile.web.rest.util.HeaderUtil;
import es.imserso.techfile.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Autonomia.
 */
@RestController
@RequestMapping("/api")
public class AutonomiaResource {

    private final Logger log = LoggerFactory.getLogger(AutonomiaResource.class);

    private static final String ENTITY_NAME = "autonomia";

    private final AutonomiaRepository autonomiaRepository;

    public AutonomiaResource(AutonomiaRepository autonomiaRepository) {
        this.autonomiaRepository = autonomiaRepository;
    }

    /**
     * POST  /autonomias : Create a new autonomia.
     *
     * @param autonomia the autonomia to create
     * @return the ResponseEntity with status 201 (Created) and with body the new autonomia, or with status 400 (Bad Request) if the autonomia has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/autonomias")
    @Timed
    public ResponseEntity<Autonomia> createAutonomia(@Valid @RequestBody Autonomia autonomia) throws URISyntaxException {
        log.debug("REST request to save Autonomia : {}", autonomia);
        if (autonomia.getId() != null) {
            throw new BadRequestAlertException("A new autonomia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Autonomia result = autonomiaRepository.save(autonomia);
        return ResponseEntity.created(new URI("/api/autonomias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /autonomias : Updates an existing autonomia.
     *
     * @param autonomia the autonomia to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated autonomia,
     * or with status 400 (Bad Request) if the autonomia is not valid,
     * or with status 500 (Internal Server Error) if the autonomia couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/autonomias")
    @Timed
    public ResponseEntity<Autonomia> updateAutonomia(@Valid @RequestBody Autonomia autonomia) throws URISyntaxException {
        log.debug("REST request to update Autonomia : {}", autonomia);
        if (autonomia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Autonomia result = autonomiaRepository.save(autonomia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, autonomia.getId().toString()))
            .body(result);
    }

    /**
     * GET  /autonomias : get all the autonomias.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of autonomias in body
     */
    @GetMapping("/autonomias")
    @Timed
    public ResponseEntity<List<Autonomia>> getAllAutonomias(Pageable pageable) {
        log.debug("REST request to get a page of Autonomias");
        Page<Autonomia> page = autonomiaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/autonomias");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /autonomias/:id : get the "id" autonomia.
     *
     * @param id the id of the autonomia to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the autonomia, or with status 404 (Not Found)
     */
    @GetMapping("/autonomias/{id}")
    @Timed
    public ResponseEntity<Autonomia> getAutonomia(@PathVariable Long id) {
        log.debug("REST request to get Autonomia : {}", id);
        Optional<Autonomia> autonomia = autonomiaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(autonomia);
    }

    /**
     * DELETE  /autonomias/:id : delete the "id" autonomia.
     *
     * @param id the id of the autonomia to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/autonomias/{id}")
    @Timed
    public ResponseEntity<Void> deleteAutonomia(@PathVariable Long id) {
        log.debug("REST request to delete Autonomia : {}", id);

        autonomiaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
